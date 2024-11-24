import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Container from '../../../../components/common/Container'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

export default function PromoSection({ promos = [] }) {
  // Filter promo yang memiliki imageUrl
  const validPromos = promos.filter(promo => promo.imageUrl)

  return (
    <section className="py-16 bg-gray-50">
      <Container>
        {/* Section Header */}
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold">Promo Spesial</h2>
          <p className="text-gray-600">
            Dapatkan penawaran terbaik untuk liburan Anda
          </p>
        </div>

        {/* Promo Carousel */}
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={24}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          className="!pb-12" // Untuk pagination dots
        >
          {validPromos.map((promo) => (
            <SwiperSlide key={promo.id}>
              <div className="flex overflow-hidden flex-col h-full bg-white rounded-xl border border-gray-100 shadow-sm transition-transform duration-300 hover:-translate-y-1">
                {/* Image Container dengan fixed aspect ratio */}
                <div className="relative aspect-[16/9]">
                  <img
                    src={promo.imageUrl}
                    alt={promo.title}
                    className="object-cover absolute inset-0 w-full h-full"
                    onError={(e) => {
                      e.target.onerror = null
                      e.target.src = '/placeholder-image.jpg'
                    }}
                  />
                  {/* Discount Badge */}
                  <div className="absolute top-4 right-4 px-3 py-1 text-sm font-semibold text-white bg-red-500 rounded-full">
                    Hemat Rp {promo.promo_discount_price?.toLocaleString('id-ID')}
                  </div>
                </div>

                {/* Content - Flex grow untuk mengisi sisa ruang */}
                <div className="flex flex-col flex-grow p-6">
                  {/* Title & Description */}
                  <div className="flex-grow">
                    <h3 className="mb-2 text-xl font-bold text-gray-900">
                      {promo.title}
                    </h3>
                    <p className="mb-4 text-gray-600 line-clamp-2">
                      {promo.description}
                    </p>
                  </div>

                  {/* Info & CTA - Selalu di bawah */}
                  <div className="mt-auto">
                    {/* Promo Info */}
                    <div className="mb-4 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Kode Promo:</span>
                        <span className="font-mono font-medium text-primary">
                          {promo.promo_code}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Min. Transaksi:</span>
                        <span className="font-medium">
                          Rp {promo.minimum_claim_price?.toLocaleString('id-ID')}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Berlaku hingga:</span>
                        <span className="font-medium">
                          {new Date(promo.updatedAt).toLocaleDateString('id-ID')}
                        </span>
                      </div>
                    </div>

                    {/* CTA Button */}
                    <Link
                      to={`/activities?promo=${promo.promo_code}`}
                      className="block px-6 py-3 w-full text-center text-white rounded-lg transition-colors bg-primary hover:bg-primary/90"
                    >
                      Gunakan Sekarang
                    </Link>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
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
      terms_condition: PropTypes.string,
      promo_code: PropTypes.string.isRequired,
      promo_discount_price: PropTypes.number,
      minimum_claim_price: PropTypes.number,
      createdAt: PropTypes.string,
      updatedAt: PropTypes.string
    })
  )
} 