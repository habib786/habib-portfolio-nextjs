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

const tables = [
  'portfolio_projects',
  'portfolio_skills',
  'portfolio_experience',
  'portfolio_education',
  'portfolio_testimonials',
  'portfolio_hero',
  'portfolio_about',
  'portfolio_services',
  'portfolio_contact',
];

const results = [];
let done = 0;

tables.forEach(t => {
  const opts = {
    hostname,
    path: `/rest/v1/${t}?limit=1&select=language`,
    headers: { apikey: key, Authorization: `Bearer ${key}` },
  };
  https.get(opts, res => {
    let d = '';
    res.on('data', c => (d += c));
    res.on('end', () => {
      // 400 with "column does not exist" = missing; 200 or empty array = present
      const missing =
        res.statusCode === 400 && d.includes('does not exist');
      const tableNotFound =
        res.statusCode === 404 || (res.statusCode === 400 && d.includes('relation') && d.includes('does not exist') && !d.includes('language'));
      results.push({
        table: t,
        status: res.statusCode,
        hasLanguage: !missing && res.statusCode !== 404,
        missing,
        detail: d.slice(0, 120),
      });
      done++;
      if (done === tables.length) {
        console.log('\n=== Language Column Audit ===');
        results.sort((a, b) => a.table.localeCompare(b.table)).forEach(r => {
          const icon = r.hasLanguage ? '✅' : (r.status === 404 ? '⚠️ (table missing)' : '❌ MISSING');
          console.log(`${icon}  ${r.table}`);
          if (!r.hasLanguage) console.log(`     → ${r.detail}`);
        });
      }
    });
  }).on('error', e => {
    done++;
    results.push({ table: t, error: e.message });
    if (done === tables.length) console.log(JSON.stringify(results, null, 2));
  });
});
