import React from 'react'
import Container from '../../../../components/common/Container'
import { StarIcon, UserGroupIcon, MapPinIcon } from '@heroicons/react/24/solid'

const stats = [
  {
    icon: <UserGroupIcon className="w-8 h-8 text-primary" />,
    value: '10K+',
    label: 'Pengguna Aktif',
    description: 'Traveler yang telah bergabung'
  },
  {
    icon: <MapPinIcon className="w-8 h-8 text-primary" />,
    value: '500+',
    label: 'Destinasi',
    description: 'Lokasi wisata tersedia'
  },
  {
    icon: <StarIcon className="w-8 h-8 text-primary" />,
    value: '4.8/5',
    label: 'Rating',
    description: 'Dari ulasan pengguna'
  }
]

const testimonials = [
  {
    name: 'Rindu',
    role: 'Travel Enthusiast',
    image: 'https://i.pravatar.cc/150?img=1',
    quote: 'TravelAku membantu saya menemukan destinasi wisata yang luar biasa dengan harga terjangkau.'
  },
  {
    name: 'Siti Rahayu',
    role: 'Food Blogger',
    image: 'https://i.pravatar.cc/150?img=2',
    quote: 'Proses booking yang mudah dan customer service yang sangat membantu.'
  },
  {
    name: 'Ahmad Wijaya',
    role: 'Photographer',
    image: 'https://i.pravatar.cc/150?img=3',
    quote: 'Pilihan aktivitas yang beragam dan informasi yang lengkap memudahkan perencanaan liburan.'
  }
]

export default function TrustBanner() {
  return (
    <section className="py-16 bg-gray-50">
      <Container>
        <div className="text-center">
          <h2 className="mb-6 font-serif text-3xl font-bold text-primary">
            Dipercaya oleh Ribuan Traveler
          </h2>
          <p className="mx-auto mb-12 max-w-2xl text-gray-600">
            TravelAku telah membantu lebih dari 10,000 traveler menemukan pengalaman wisata terbaik mereka. Bergabunglah bersama kami dan mulai petualanganmu!
          </p>

          {/* Stats */}
          <div className="grid gap-8 mb-16 md:grid-cols-3">
            {stats.map((stat, index) => (
              <div 
                key={index}
                className="p-6 bg-white rounded-lg shadow-sm transition-transform hover:scale-105"
              >
                <div className="flex justify-center mb-4">
                  {stat.icon}
                </div>
                <div className="mb-2 text-3xl font-bold text-primary">
                  {stat.value}
                </div>
                <div className="mb-1 font-medium text-gray-900">
                  {stat.label}
                </div>
                <div className="text-sm text-gray-600">
                  {stat.description}
                </div>
              </div>
            ))}
          </div>

          {/* Testimonials */}
          <div className="grid gap-8 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className="p-6 bg-white rounded-lg shadow-sm"
              >
                <div className="flex justify-center mb-4">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="object-cover w-16 h-16 rounded-full"
                  />
                </div>
                <blockquote className="mb-4 italic text-gray-600">
                  "{testimonial.quote}"
                </blockquote>
                <div className="font-medium text-gray-900">
                  {testimonial.name}
                </div>
                <div className="text-sm text-gray-500">
                  {testimonial.role}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
} 