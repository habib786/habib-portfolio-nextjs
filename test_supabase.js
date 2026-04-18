const fs = require('fs');
const env = fs.readFileSync('.env.local', 'utf8').split('\n').reduce((acc, line) => { 
  const [k, ...v] = line.split('='); 
  if(k && v.length) acc[k.trim()] = v.join('=').trim().replace(/^"|"$/g, ''); 
  return acc; 
}, {}); 
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY);
async function test() {
  const edu = await supabase.from('portfolio_education').select('*');
  console.log('EDU ERROR:', edu.error);
  console.log('EDU DATA:', edu.data);
  
  const exp = await supabase.from('portfolio_experience').select('*');
  console.log('EXP ERROR:', exp.error);
  console.log('EXP DATA:', exp.data);
}
test();
