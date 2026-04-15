import React from 'react'
import { createClient } from '@/lib/supabase/server'
import ClientsMarquee from './ClientsMarquee'

export default async function ClientsSection() {
  const supabase = await createClient()

  let dbClients = []
  try {
    if (supabase) {
      const { data } = await supabase.from('portfolio_clients').select('*').order('order_index', { ascending: true })
      if (data && data.length > 0) dbClients = data
    }
  } catch (error) {
    console.error('Error fetching clients:', error)
  }

  const defaultClients = [
    { name: 'nawazon', icon: 'N', logo_type: 'text', color_class: 'text-gray-600' },
    { name: 'ARKAN', icon: '▲', logo_type: 'text', color_class: 'text-gray-700' },
    { name: 'BEACH YOU', icon: 'grid', logo_type: 'text', color_class: 'text-emerald-700' },
    { name: 'PILATUS VIP', icon: 'P', logo_type: 'text', color_class: 'text-blue-900' }
  ]

  const displayClients = dbClients.length > 0 ? dbClients.map(c => ({
    name: c.name,
    icon: c.logo_content,
    logo_type: c.logo_type || 'text',
    color_class: c.color_class || 'text-gray-600'
  })) : defaultClients

  return (
    <section className="py-12 bg-white border-y border-gray-100 overflow-hidden">
      <div className="container mx-auto px-4 max-w-7xl">
        <ClientsMarquee clients={displayClients} />
      </div>
    </section>
  )
}

