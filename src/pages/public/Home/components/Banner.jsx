import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules'
import { axiosInstance as api } from '../../../../lib/axios'
import LoadingSpinner from '../../../../components/common/LoadingSpinner'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/effect-fade'

const quotes = [
  {
    text: "Tak kenal maka tak sayang, tak jalan maka tak sampai",
    author: "Pepatah Indonesia"
  },
  {
    text: "Di mana bumi dipijak, di situ langit dijunjung",
    author: "Pepatah Melayu"
  },
  {
    text: "Jauh berjalan banyak yang dilihat, lama hidup banyak yang dirasa",
    author: "Pepatah Minang"
  },
  {
    text: "Bersakit-sakit dahulu, bersenang-senang kemudian",
    author: "Pepatah Melayu"
  },
  {
    text: "Dimana ada kemauan, di situ ada jalan",
    author: "Pepatah Indonesia"
  }
]

export default function Banner() {
  const [banners, setBanners] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await api.get('/api/v1/banners')
        setBanners(response.data.data || [])
      } catch (error) {
        console.error('Error fetching banners:', error)
        setError('Gagal memuat banner')
      } finally {
        setIsLoading(false)
      }
    }

    fetchBanners()
  }, [])

  if (isLoading) {
    return <LoadingSpinner />
  }

  if (error) {
    return (
      <div className="h-[600px] flex items-center justify-center bg-gray-50">
        <p className="text-gray-500">{error}</p>
      </div>
    )
  }

  if (banners.length === 0) {
    return (
      <div className="h-[600px] flex items-center justify-center bg-gray-50">
        <p className="text-gray-500">Tidak ada banner tersedia</p>
      </div>
    )
  }

  return (
    <section className="relative">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        navigation
        pagination={{ 
          clickable: true,
          dynamicBullets: true 
        }}
        autoplay={{ 
          delay: 10000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true
        }}
        effect="fade"
        speed={1000}
        loop={true}
        className="h-[600px] md:h-[700px]"
      >
        {banners.map((banner, index) => (
          <SwiperSlide key={banner.id}>
            <div className="relative h-full transition-all duration-1000">
              <img
                src={banner.imageUrl}
                alt={banner.name}
                className="object-cover absolute inset-0 w-full h-full"
                loading="lazy"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t to-transparent from-black/90 via-black/50" />

              <div className="flex relative z-10 flex-col justify-center items-center px-4 h-full text-center text-white">
                {/* Quote */}
                <div className="max-w-3xl mx-auto mb-8">
                  <p className="text-2xl md:text-4xl font-serif italic mb-4 animate-fade-in">
                    "{quotes[index % quotes.length].text}"
                  </p>
                  <p className="text-lg text-gray-300 animate-fade-in">
                    — {quotes[index % quotes.length].author}
                  </p>
                </div>

                <Link
                  to="/activities"
                  className="inline-flex gap-2 items-center px-8 py-3 text-white rounded-lg transition-all duration-300 transform bg-primary hover:bg-primary/90 hover:scale-105 animate-fade-in"
                >
                  <span>Mulai Petualangan</span>
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="w-5 h-5 transition-transform group-hover:translate-x-1" 
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
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="absolute right-0 bottom-0 left-0 z-10">
        <svg 
          viewBox="0 0 1440 200" 
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto"
        >
          <path 
            fill="#ffffff" 
            fillOpacity="1" 
            d="M0,160L48,144C96,128,192,96,288,90.7C384,85,480,107,576,112C672,117,768,107,864,101.3C960,96,1056,96,1152,101.3C1248,107,1344,117,1392,122.7L1440,128L1440,200L1392,200C1344,200,1248,200,1152,200C1056,200,960,200,864,200C768,200,672,200,576,200C480,200,384,200,288,200C192,200,96,200,48,200L0,200Z"
            className="transition-all duration-1000"
          ></path>
        </svg>
      </div>
    </section>
  )
} 