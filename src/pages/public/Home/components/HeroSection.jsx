import React from 'react'
import Container from '../../../../components/common/Container'
import { Link } from 'react-router-dom'
import heroImage from '../../../../assets/images/hero-image.jpg'
import { keyframes } from '@emotion/react'

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`

export default function HeroSection() {
  return (
    <section className="relative min-h-[600px] md:min-h-[700px] bg-gradient-to-b from-primary/10 to-white">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-opacity-10 bg-pattern"></div>

      <Container>
        <div className="flex relative flex-col-reverse gap-8 items-center pt-24 md:flex-row md:gap-12 md:pt-32">
          {/* Text Content */}
          <div className="w-full text-center md:w-1/2 md:text-left">
            <h1 className="mb-6 font-serif text-3xl font-bold text-gray-900 md:text-5xl">
              Jelajahi Keindahan{' '}
              <span className="text-primary">Indonesia</span>
            </h1>

            {/* Pantun dengan styling yang lebih menarik */}
            <div className="mb-6 p-6 italic text-gray-700 bg-white/80 rounded-lg shadow-inner border border-gray-100">
              <p className="mb-2">Pergi ke Bali naik pesawat,</p>
              <p className="mb-2">Singgah sejenak di Tanah Lot.</p>
              <p className="mb-2">Mari berwisata sambil liburan hemat,</p>
              <p>TravelAku solusinya dapat semua spot.</p>
            </div>

            <p className="mx-auto mb-8 max-w-lg text-base text-gray-600 md:text-lg md:mx-0">
              Temukan pengalaman perjalanan tak terlupakan bersama TravelAku. Kami menyediakan berbagai pilihan aktivitas wisata terbaik untuk liburanmu.
            </p>

            {/* Single Button dengan animasi */}
            <div className="flex justify-center md:justify-start">
              <Link
                to="/activities"
                className="group inline-flex items-center gap-2 px-8 py-3 text-white transition-all duration-300 rounded-lg bg-primary hover:bg-primary/90 hover:gap-4"
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

            {/* Stats dengan animasi hover */}
            <div className="hidden gap-12 items-center mt-12 md:flex">
              <div className="transition-transform hover:scale-105">
                <p className="text-3xl font-bold text-primary">100+</p>
                <p className="text-sm text-gray-600">Destinasi</p>
              </div>
              <div className="transition-transform hover:scale-105">
                <p className="text-3xl font-bold text-primary">10K+</p>
                <p className="text-sm text-gray-600">Pelanggan</p>
              </div>
              <div className="transition-transform hover:scale-105">
                <p className="text-3xl font-bold text-primary">4.9</p>
                <p className="text-sm text-gray-600">Rating</p>
              </div>
            </div>
          </div>

          {/* Image dengan animasi fade-in */}
          <div className="w-full md:w-1/2">
            <div className="relative animate-fade-in">
              {/* Main Image */}
              <img
                src={heroImage}
                alt="Destinasi Wisata Indonesia"
                className="w-full h-auto rounded-lg shadow-xl"
              />
              
              {/* Floating Card dengan animasi */}
              <div className="hidden absolute -bottom-6 -left-6 p-4 bg-white rounded-lg shadow-lg md:block animate-float">
                <div className="flex gap-3 items-center">
                  <div className="flex justify-center items-center w-12 h-12 rounded-full bg-primary/10">
                    <svg 
                      className="w-6 h-6 text-primary"
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" 
                      />
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" 
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium">Destinasi Terbaik</p>
                    <p className="text-sm text-gray-500">Indonesia</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Stats dengan animasi */}
        <div className="grid grid-cols-3 gap-4 mt-12 mb-8 md:hidden">
          <div className="p-4 text-center bg-white rounded-lg shadow-sm transition-transform hover:scale-105">
            <p className="text-2xl font-bold text-primary">100+</p>
            <p className="text-xs text-gray-600">Destinasi</p>
          </div>
          <div className="p-4 text-center bg-white rounded-lg shadow-sm transition-transform hover:scale-105">
            <p className="text-2xl font-bold text-primary">10K+</p>
            <p className="text-xs text-gray-600">Pelanggan</p>
          </div>
          <div className="p-4 text-center bg-white rounded-lg shadow-sm transition-transform hover:scale-105">
            <p className="text-2xl font-bold text-primary">4.9</p>
            <p className="text-xs text-gray-600">Rating</p>
          </div>
        </div>
      </Container>

      {/* Wave Decoration */}
      <div className="absolute right-0 bottom-0 left-0">
        <svg 
          viewBox="0 0 1440 200" 
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto"
        >
          <path 
            fill="#ffffff" 
            fillOpacity="1" 
            d="M0,160L48,144C96,128,192,96,288,90.7C384,85,480,107,576,112C672,117,768,107,864,101.3C960,96,1056,96,1152,101.3C1248,107,1344,117,1392,122.7L1440,128L1440,200L1392,200C1344,200,1248,200,1152,200C1056,200,960,200,864,200C768,200,672,200,576,200C480,200,384,200,288,200C192,200,96,200,48,200L0,200Z"
          ></path>
        </svg>
      </div>
    </section>
  )
} 