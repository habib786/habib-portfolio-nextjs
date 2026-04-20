
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkSettings() {
  const { data, error } = await supabase
    .from('settings')
    .select('*');

  if (error) {
    console.error('Error fetching settings:', error);
    return;
  }

  console.log('Settings Data:');
  console.log(JSON.stringify(data, null, 2));
  
  const { data: languages } = await supabase.from('languages').select('*');
  console.log('\nLanguages:');
  console.log(JSON.stringify(languages, null, 2));
}

checkSettings();
