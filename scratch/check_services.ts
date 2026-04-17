
import { createClient } from './lib/supabase/server'

async function checkServices() {
  const supabase = await createClient()
  if (!supabase) {
    console.log('No supabase client')
    return
  }

  const { data, error } = await supabase.from('portfolio_services').select('*')
  if (error) {
    console.error('Error fetching services:', error)
    return
  }

  console.log('Services in DB:')
  console.table(data.map(s => ({
    id: s.id,
    number_id: s.number_id,
    title: s.title,
    language: s.language
  })))
}

checkServices()
