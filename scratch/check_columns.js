const fs = require('fs');
const env = fs.readFileSync('.env.local', 'utf8').split('\n').reduce((acc, line) => { 
  const [k, ...v] = line.split('='); 
  if(k && v.length) acc[k.trim()] = v.join('=').trim().replace(/^"|"$/g, ''); 
  return acc; 
}, {}); 
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY);
async function check() {
  const { data: edu, error: eduErr } = await supabase.from('portfolio_education').select('*').limit(1);
  console.log('EDU Row:', edu ? edu[0] : 'None');
  if (eduErr) console.error('EDU Error:', eduErr);

  const { data: exp, error: expErr } = await supabase.from('portfolio_experience').select('*').limit(1);
  console.log('EXP Row:', exp ? exp[0] : 'None');
  if (expErr) console.error('EXP Error:', expErr);
}
check();
