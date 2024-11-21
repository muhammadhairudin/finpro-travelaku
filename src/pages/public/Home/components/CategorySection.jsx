import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Container from '../../../../components/common/Container'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Keyboard, Mousewheel, A11y } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

export default function CategorySection({ categories = [] }) {
  return (
    <section className="py-16 bg-gray-50">
      <Container>
        <div className="mb-12 text-center">
          <h2 className="mb-4 font-serif text-3xl font-bold text-primary">
            Kategori Wisata
          </h2>
          <p className="mx-auto max-w-2xl text-gray-600">
            Temukan berbagai aktivitas wisata yang sesuai dengan preferensimu. Dari wisata alam hingga wisata budaya, semua ada di sini.
          </p>
        </div>

        {/* Category Carousel */}
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
                slidesPerView: 4,
              },
            }}
            className="!pb-12"
          >
            {categories.map((category) => (
              <SwiperSlide key={category.id}>
                <Link 
                  to={`/activities?category=${category.id}`}
                  className="group block relative overflow-hidden rounded-xl bg-white shadow-sm hover:shadow-md transition-all duration-300 aspect-[4/3]"
                >
                  {/* Image Background */}
                  <div className="absolute inset-0">
                    <img 
                      src={category.imageUrl} 
                      alt={category.name}
                      className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
                    />
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t to-transparent from-black/80 via-black/30" />
                  </div>

                  {/* Content */}
                  <div className="absolute right-0 bottom-0 left-0 p-6 text-white">
                    <h3 className="mb-2 font-serif text-xl font-bold transition-colors group-hover:text-secondary">
                      {category.name}
                    </h3>
                    <p className="text-sm text-gray-200 transition-colors line-clamp-2 group-hover:text-white/90">
                      {category.description}
                    </p>

                    {/* Activity Count Badge */}
                    <div className="inline-flex gap-1 items-center px-3 py-1 mt-4 text-sm rounded-full backdrop-blur-sm bg-white/20">
                      <span className="font-medium">{category.totalActivities}</span>
                      <span>Aktivitas</span>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Quick Links */}
        <div className="flex flex-wrap gap-4 justify-center mt-12">
          <Link 
            to="/activities?category=nature"
            className="px-4 py-2 text-sm text-gray-700 bg-white rounded-full shadow-sm transition-shadow hover:shadow-md hover:text-primary"
          >
            🏞️ Wisata Alam
          </Link>
          <Link 
            to="/activities?category=culture"
            className="px-4 py-2 text-sm text-gray-700 bg-white rounded-full shadow-sm transition-shadow hover:shadow-md hover:text-primary"
          >
            🏛️ Wisata Budaya
          </Link>
          <Link 
            to="/activities?category=culinary"
            className="px-4 py-2 text-sm text-gray-700 bg-white rounded-full shadow-sm transition-shadow hover:shadow-md hover:text-primary"
          >
            🍜 Wisata Kuliner
          </Link>
          <Link 
            to="/activities?category=adventure"
            className="px-4 py-2 text-sm text-gray-700 bg-white rounded-full shadow-sm transition-shadow hover:shadow-md hover:text-primary"
          >
            🏃 Petualangan
          </Link>
        </div>
      </Container>
    </section>
  )
}

CategorySection.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string,
      imageUrl: PropTypes.string,
      totalActivities: PropTypes.number
    })
  )
} 