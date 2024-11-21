import React from 'react'
import Container from '../../../../components/common/Container'
import { MapPinIcon, CalendarDaysIcon, UserGroupIcon } from '@heroicons/react/24/outline'

const features = [
  {
    icon: <MapPinIcon className="w-8 h-8" />,
    title: 'Destinasi Terbaik',
    description: 'Lokasi wisata pilihan yang telah diverifikasi',
  },
  {
    icon: <CalendarDaysIcon className="w-8 h-8" />,
    title: 'Fleksibel',
    description: 'Jadwal yang bisa disesuaikan dengan kebutuhanmu',
  },
  {
    icon: <UserGroupIcon className="w-8 h-8" />,
    title: 'Guide Profesional',
    description: 'Dipandu oleh guide lokal berpengalaman',
  },
]

export default function Features() {
  return (
    <section className="py-16 bg-white">
      <Container>
        <div className="grid gap-8 md:grid-cols-3">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="p-6 text-center bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="inline-flex p-3 mb-4 rounded-lg bg-primary/5 text-primary">
                {feature.icon}
              </div>
              <h3 className="mb-2 text-lg font-semibold">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
} 