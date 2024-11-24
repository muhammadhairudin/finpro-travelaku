import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Container from './Container'
import { useState, useEffect } from 'react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { getProfile, clearAuth } from '../../store/slices/authSlice'

export default function Navbar() {
  const dispatch = useDispatch()
  const [isOpen, setIsOpen] = useState(false)
  const { token, user, isLoading, lastFetched } = useSelector((state) => state.auth)
  const { items: cartItems = [] } = useSelector((state) => state.cart)
  const isAdmin = user?.role === 'admin'

  useEffect(() => {
    const shouldFetchProfile = !user || !lastFetched || Date.now() - lastFetched > 5 * 60 * 1000

    if (token && shouldFetchProfile && !isLoading) {
      dispatch(getProfile())
        .unwrap()
        .catch(err => {
          console.error('Failed to fetch profile:', err)
          dispatch(clearAuth())
        })
    }
  }, [dispatch, token, user, lastFetched, isLoading])

  const handleLogout = () => {
    dispatch(clearAuth())
  }

  // Jika user adalah admin, tampilkan navbar sederhana
  if (isAdmin) {
    return (
      <nav className="bg-white shadow">
        <Container>
          <div className="flex justify-between items-center h-16">
            {/* Logo & Links */}
            <div className="flex gap-8 items-center">
              <Link 
                to="/" 
                className="flex gap-2 items-center group"
              >
                <img 
                  src="/logo-travelaku.png" 
                  alt="TravelAku Logo" 
                  className="w-auto h-8 transition-transform duration-300 group-hover:scale-110"
                />
              </Link>
              <div className="hidden gap-6 items-center md:flex">
                <Link 
                  to="/" 
                  className="text-gray-600 transition-all duration-300 hover:text-primary hover:scale-105"
                >
                  Home
                </Link>
                <Link 
                  to="/admin" 
                  className="text-gray-600 transition-all duration-300 hover:text-primary hover:scale-105"
                >
                  Dashboard
                </Link>
              </div>
            </div>

            {/* User Info & Logout */}
            <div className="flex gap-4 items-center">
              <span className="text-gray-600">
                {user?.name}
              </span>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-red-600 rounded-lg transition-all duration-300 hover:bg-red-50 hover:scale-105"
              >
                Logout
              </button>
            </div>
          </div>
        </Container>
      </nav>
    )
  }

  // Navbar untuk user biasa
  return (
    <nav className="fixed top-0 right-0 left-0 z-50 bg-white shadow-sm">
      <Container>
        <div className="flex justify-between items-center px-2 h-16 md:px-4">
          {/* Logo */}
          <Link to="/" className="flex gap-3 items-center group">
            <img 
              src="/logo-travelaku.png"
              alt="TravelAku Logo" 
              className="w-auto h-8 transition-transform duration-300 group-hover:scale-110"
            />
            <span className="hidden font-serif text-lg font-bold md:block text-primary">
              TravelAku
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden items-center md:flex lg:gap-8 md:gap-4">
            <Link 
              to="/" 
              className="font-medium text-gray-600 transition-all duration-300 hover:text-primary"
            >
              Beranda
            </Link>
            <Link 
              to="/activities" 
              className="font-medium text-gray-600 transition-all duration-300 hover:text-primary"
            >
              Aktivitas
            </Link>
            <Link 
              to="/about" 
              className="font-medium text-gray-600 transition-all duration-300 hover:text-primary"
            >
              Tentang
            </Link>

            {user ? (
              <div className="flex gap-8 items-center pl-4 border-l border-gray-200">
                {/* Cart */}
                <Link 
                  to="/cart" 
                  className="flex gap-1 items-center font-medium text-gray-600 transition-all duration-300 hover:text-primary"
                >
                  Keranjang {cartItems.length > 0 && (
                    <span className="px-2 py-0.5 text-xs text-white rounded-full bg-primary">
                      {cartItems.length}
                    </span>
                  )}
                </Link>

                {/* User Menu */}
                <div className="flex gap-8 items-center">
                  <Link 
                    to="/transactions" 
                    className="font-medium text-gray-600 transition-all duration-300 hover:text-primary"
                  >
                    Transaksi
                  </Link>
                  <Link 
                    to="/profile" 
                    className="font-medium text-gray-600 transition-all duration-300 hover:text-primary"
                  >
                    Profil
                  </Link>
                  <button
                    onClick={() => dispatch(clearAuth())}
                    className="px-4 py-2 font-medium text-red-600 rounded-lg transition-all duration-300 hover:bg-red-50"
                  >
                    Keluar
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex gap-4 items-center pl-4 border-l border-gray-200">
                <Link 
                  to="/login" 
                  className="px-4 py-2 font-medium rounded-lg transition-all duration-300 text-primary hover:bg-primary/5"
                >
                  Masuk
                </Link>
                <Link 
                  to="/register" 
                  className="px-4 py-2 font-medium text-white rounded-lg transition-all duration-300 bg-primary hover:bg-primary/90"
                >
                  Daftar
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-gray-600 rounded-lg md:hidden hover:bg-gray-100"
          >
            {isOpen ? (
              <XMarkIcon className="w-6 h-6" />
            ) : (
              <Bars3Icon className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="border-t border-gray-200 md:hidden">
            <div className="py-2 space-y-1">
              <Link 
                to="/"
                className="block px-4 py-2 text-gray-600 hover:bg-gray-50"
                onClick={() => setIsOpen(false)}
              >
                Beranda
              </Link>
              <Link 
                to="/activities"
                className="block px-4 py-2 text-gray-600 hover:bg-gray-50"
                onClick={() => setIsOpen(false)}
              >
                Aktivitas
              </Link>
              <Link 
                to="/about"
                className="block px-4 py-2 text-gray-600 hover:bg-gray-50"
                onClick={() => setIsOpen(false)}
              >
                Tentang
              </Link>

              {user ? (
                <>
                  <Link 
                    to="/cart" 
                    className="block px-4 py-2 text-gray-600 hover:bg-gray-50"
                    onClick={() => setIsOpen(false)}
                  >
                    Keranjang {cartItems.length > 0 && `(${cartItems.length})`}
                  </Link>
                  <div className="pt-2 mt-2 border-t border-gray-200">
                    <Link 
                      to="/transactions" 
                      className="block px-4 py-2 text-gray-600 hover:bg-gray-50"
                      onClick={() => setIsOpen(false)}
                    >
                      Transaksi
                    </Link>
                    <Link 
                      to="/profile" 
                      className="block px-4 py-2 text-gray-600 hover:bg-gray-50"
                      onClick={() => setIsOpen(false)}
                    >
                      Profil
                    </Link>
                    <button
                      onClick={() => {
                        dispatch(clearAuth())
                        setIsOpen(false)
                      }}
                      className="block px-4 py-2 w-full text-left text-red-600 hover:bg-red-50"
                    >
                      Keluar
                    </button>
                  </div>
                </>
              ) : (
                <div className="flex flex-col gap-2 p-4 mt-2 border-t border-gray-200">
                  <Link 
                    to="/login" 
                    className="px-4 py-2 w-full font-medium text-center rounded-lg border text-primary border-primary"
                    onClick={() => setIsOpen(false)}
                  >
                    Masuk
                  </Link>
                  <Link 
                    to="/register" 
                    className="px-4 py-2 w-full font-medium text-center text-white rounded-lg bg-primary"
                    onClick={() => setIsOpen(false)}
                  >
                    Daftar
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </Container>
    </nav>
  )
} 