import React from 'react'
import PropTypes from 'prop-types'
import Container from '../../../../components/common/Container'
import { Link } from 'react-router-dom'
import { StarIcon } from '@heroicons/react/24/solid'

export default function PopularActivities({ activities = [] }) {
  return (
    <section className="py-16 bg-white">
      <Container>
        <div className="text-center mb-12">
          <h2 className="mb-4 font-serif text-3xl font-bold text-primary">
            Aktivitas Populer
          </h2>
          <p className="mx-auto max-w-2xl text-gray-600">
            Jelajahi aktivitas wisata yang paling diminati oleh traveler lainnya
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {activities.map((activity) => (
            <Link 
              key={activity.id}
              to={`/activities/${activity.id}`}
              className="group block overflow-hidden bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Image */}
              <div className="relative aspect-[4/3]">
                <img 
                  src={activity.imageUrls[0]} 
                  alt={activity.title}
                  className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                />
                {activity.price_discount && (
                  <div className="absolute top-4 right-4 px-3 py-1 text-sm font-semibold text-white bg-red-500 rounded-full">
                    Save {Math.round(((activity.price - activity.price_discount) / activity.price) * 100)}%
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="mb-2 text-lg font-medium text-gray-900 group-hover:text-primary">
                  {activity.title}
                </h3>
                <p className="mb-4 text-sm text-gray-600 line-clamp-2">
                  {activity.description}
                </p>

                {/* Rating & Price */}
                <div className="flex justify-between items-end">
                  <div className="flex items-center">
                    <StarIcon className="w-5 h-5 text-yellow-400" />
                    <span className="ml-1 text-sm font-medium">{activity.rating}</span>
                    <span className="mx-1 text-gray-400">•</span>
                    <span className="text-sm text-gray-600">{activity.total_reviews} reviews</span>
                  </div>
                  <div className="text-right">
                    {activity.price_discount ? (
                      <>
                        <p className="text-sm line-through text-gray-400">
                          Rp {activity.price.toLocaleString('id-ID')}
                        </p>
                        <p className="text-lg font-bold text-primary">
                          Rp {activity.price_discount.toLocaleString('id-ID')}
                        </p>
                      </>
                    ) : (
                      <p className="text-lg font-bold text-primary">
                        Rp {activity.price.toLocaleString('id-ID')}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/activities"
            className="inline-flex items-center gap-2 px-6 py-3 text-white rounded-lg bg-primary hover:bg-primary/90 transition-colors"
          >
            <span>Lihat Semua Aktivitas</span>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="w-5 h-5" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M17 8l4 4m0 0l-4 4m4-4H3" 
              />
            </svg>
          </Link>
        </div>
      </Container>
    </section>
  )
}

PopularActivities.propTypes = {
  activities: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string,
      imageUrls: PropTypes.arrayOf(PropTypes.string),
      price: PropTypes.number.isRequired,
      price_discount: PropTypes.number,
      rating: PropTypes.number,
      total_reviews: PropTypes.number
    })
  )
} 