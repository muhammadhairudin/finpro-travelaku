import React from 'react'
import { Link } from 'react-router-dom'
import Container from '../../../../components/common/Container'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Keyboard, Mousewheel, A11y } from 'swiper/modules'
import PropTypes from 'prop-types'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

export default function PromoSection({ promos = [] }) {
  if (promos.length === 0) return null

  return (
    <section className="py-16 bg-secondary/10">
      <Container>
        <div className="mb-12 text-center">
          <h2 className="mb-4 font-serif text-3xl font-bold text-primary">
            Promo Spesial
          </h2>
          <p className="mx-auto max-w-2xl text-gray-600">
            Dapatkan penawaran terbaik untuk perjalanan wisatamu. Gunakan kode promo untuk mendapatkan diskon menarik.
          </p>
        </div>

        {/* Promo Carousel */}
        <div className="relative px-4">
          <Swiper
            modules={[Navigation, Pagination, Keyboard, Mousewheel, A11y]}
            spaceBetween={24}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            keyboard={{ enabled: true }}
            mousewheel={true}
            grabCursor={true}
            breakpoints={{
              640: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
            className="!pb-12"
          >
            {promos.map((promo) => (
              <SwiperSlide key={promo.id}>
                <div className="flex flex-col h-full bg-white rounded-lg shadow-sm transition-shadow group hover:shadow-md">
                  {/* Image Container - Fixed Height */}
                  <div className="relative h-48">
                    <img 
                      src={promo.imageUrl} 
                      alt={promo.title}
                      className="object-cover w-full h-full rounded-t-lg transition-transform duration-300 group-hover:scale-105"
                    />
                    {/* Discount Badge */}
                    <div className="absolute top-4 right-4 px-3 py-1 text-sm font-semibold text-white bg-red-500 rounded-full">
                      Hemat Rp {promo.promo_discount_price.toLocaleString('id-ID')}
                    </div>
                  </div>

                  {/* Content - Flex Grow untuk Tinggi yang Sama */}
                  <div className="flex flex-col flex-grow p-6">
                    {/* Title & Code - Fixed Height */}
                    <div className="flex justify-between items-start mb-4 min-h-[3rem]">
                      <h3 className="text-lg font-medium text-gray-900 line-clamp-2">
                        {promo.title}
                      </h3>
                      <span className="flex-shrink-0 px-2 py-1 ml-2 font-mono text-sm rounded bg-primary/5 text-primary">
                        {promo.promo_code}
                      </span>
                    </div>

                    {/* Description - Fixed Height */}
                    <p className="mb-6 text-sm text-gray-600 line-clamp-2">
                      {promo.description}
                    </p>

                    {/* Info Section - Auto Height */}
                    <div className="mt-auto space-y-4">
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <div className="flex justify-between text-sm text-gray-600 mb-2">
                          <span>Minimum Pembelian:</span>
                          <span className="font-medium">
                            Rp {promo.minimum_claim_price.toLocaleString('id-ID')}
                          </span>
                        </div>
                        
                        <div className="text-xs text-gray-500">
                          Berlaku hingga: {new Date(promo.updatedAt).toLocaleDateString('id-ID', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </div>
                      </div>

                      {/* CTA Button */}
                      <Link 
                        to="/activities" 
                        className="block w-full px-4 py-2 text-center text-white rounded-lg transition-colors bg-primary hover:bg-primary/90"
                      >
                        Gunakan Sekarang
                      </Link>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </Container>
    </section>
  )
}

PromoSection.propTypes = {
  promos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string,
      imageUrl: PropTypes.string,
      promo_code: PropTypes.string.isRequired,
      promo_discount_price: PropTypes.number.isRequired,
      minimum_claim_price: PropTypes.number.isRequired,
      updatedAt: PropTypes.string.isRequired
    })
  )
} 