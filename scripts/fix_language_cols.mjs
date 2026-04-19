import { readFileSync } from 'fs';
import https from 'https';

const env = readFileSync('.env.local', 'utf8').split('\n').reduce((a, l) => {
  const [k, ...v] = l.split('=');
  if (k && !k.startsWith('#')) a[k.trim()] = v.join('=').trim();
  return a;
}, {});

const url = env['NEXT_PUBLIC_SUPABASE_URL'];
const key = env['SUPABASE_SERVICE_ROLE_KEY'];
const hostname = new URL(url).hostname;

// Use Supabase SQL via the db endpoint isn't available without pg-meta.
// Instead, call the REST API to ALTER TABLE via a migration RPC if it exists,
// or we patch using a known workaround: POST to /rest/v1/rpc if one is defined.
// Best approach: write a Node script that uses @supabase/supabase-js admin.

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(url, key);

// We'll add language column via the Supabase Management API SQL endpoint
// Available at: https://api.supabase.com/v1/projects/{ref}/database/query
// OR we can use pg-meta if supabase project has it on: /pg-meta/v1/query

const projectRef = hostname.split('.')[0]; // xvwxwrrqopcyzsnrwxbf
const sql = `
  ALTER TABLE portfolio_projects 
  ADD COLUMN IF NOT EXISTS language TEXT NOT NULL DEFAULT 'en';
  
  -- Update existing rows to default language
  UPDATE portfolio_projects SET language = 'en' WHERE language IS NULL OR language = '';
`;

const body = JSON.stringify({ query: sql });

const options = {
  hostname: 'api.supabase.com',
  path: `/v1/projects/${projectRef}/database/query`,
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${key}`,
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(body),
  },
};

console.log(`Running SQL on project: ${projectRef}`);
const req = https.request(options, res => {
  let d = '';
  res.on('data', c => (d += c));
  res.on('end', () => {
    if (res.statusCode === 200 || res.statusCode === 201) {
      console.log('✅ language column added to portfolio_projects');
      console.log(d);
    } else {
      console.log(`❌ Failed: HTTP ${res.statusCode}`);
      console.log(d);
    }
  });
});
req.on('error', e => console.error('Error:', e.message));
req.write(body);
req.end();
