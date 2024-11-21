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
                  src="/Logo.svg" 
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
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex gap-2 items-center group">
            <img 
              src="/Logo.svg" 
              alt="TravelAku Logo" 
              className="w-auto h-8 transition-transform duration-300 group-hover:scale-110"
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden gap-6 items-center md:flex">
            <Link 
              to="/" 
              className="text-gray-600 transition-all duration-300 hover:text-primary hover:scale-105"
            >
              Home
            </Link>
            <Link 
              to="/activities" 
              className="text-gray-600 transition-all duration-300 hover:text-primary hover:scale-105"
            >
              Activities
            </Link>

            {user ? (
              <div className="flex gap-6 items-center">
                {/* Cart */}
                <Link 
                  to="/cart" 
                  className="flex gap-1 items-center text-gray-600 transition-all duration-300 hover:text-primary hover:scale-105"
                >
                  Cart {cartItems.length > 0 && (
                    <span className="px-2 py-1 text-xs text-white rounded-full bg-primary">
                      {cartItems.length}
                    </span>
                  )}
                </Link>

                {/* User Menu */}
                <div className="flex gap-6 items-center">
                  <Link 
                    to="/transactions" 
                    className="text-gray-600 transition-all duration-300 hover:text-primary hover:scale-105"
                  >
                    Transactions
                  </Link>
                  <Link 
                    to="/profile" 
                    className="text-gray-600 transition-all duration-300 hover:text-primary hover:scale-105"
                  >
                    My Profile
                  </Link>
                  <Link 
                    to="/about" 
                    className="text-gray-600 transition-all duration-300 hover:text-primary hover:scale-105"
                  >
                    About
                  </Link>
                  <button
                    onClick={() => dispatch(clearAuth())}
                    className="px-4 py-2 text-red-600 rounded-lg transition-all duration-300 hover:bg-red-50 hover:scale-105"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex gap-4">
                <Link 
                  to="/about" 
                  className="text-gray-600 transition-all duration-300 hover:text-primary hover:scale-105"
                >
                  About
                </Link>
                <Link 
                  to="/login" 
                  className="px-6 py-2 text-white rounded-lg transition-all duration-300 bg-primary hover:bg-primary/90 hover:scale-105"
                >
                  Sign In
                </Link>
                <Link 
                  to="/register" 
                  className="px-6 py-2 rounded-lg border-2 transition-all duration-300 text-primary border-primary hover:bg-primary hover:text-white hover:scale-105"
                >
                  Sign Up
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
          <div className="md:hidden">
            <div className="px-4 pt-2 pb-3 space-y-1">
              <Link 
                to="/"
                className="block py-2 text-gray-600 hover:text-primary"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/activities"
                className="block py-2 text-gray-600 hover:text-primary"
                onClick={() => setIsOpen(false)}
              >
                Activities
              </Link>

              {user ? (
                <>
                  <Link 
                    to="/cart" 
                    className="block py-2 text-gray-600 hover:text-primary"
                    onClick={() => setIsOpen(false)}
                  >
                    Cart {cartItems.length > 0 && `(${cartItems.length})`}
                  </Link>
                  <div className="pt-4 mt-4 space-y-2 border-t border-gray-200">
                    <Link 
                      to="/transactions" 
                      className="block py-2 text-gray-600 hover:text-primary"
                      onClick={() => setIsOpen(false)}
                    >
                      Transactions
                    </Link>
                    <Link 
                      to="/profile" 
                      className="block py-2 text-gray-600 hover:text-primary"
                      onClick={() => setIsOpen(false)}
                    >
                      My Profile
                    </Link>
                    <Link 
                      to="/about" 
                      className="block py-2 text-gray-600 hover:text-primary"
                      onClick={() => setIsOpen(false)}
                    >
                      About
                    </Link>
                    <button
                      onClick={() => {
                        dispatch(clearAuth())
                        setIsOpen(false)
                      }}
                      className="py-2 w-full text-left text-red-600 hover:text-red-700"
                    >
                      Logout
                    </button>
                  </div>
                </>
              ) : (
                <div className="flex flex-col gap-4 pt-4 mt-4 border-t border-gray-200">
                  <Link 
                    to="/about" 
                    className="block py-2 text-gray-600 hover:text-primary"
                    onClick={() => setIsOpen(false)}
                  >
                    About
                  </Link>
                  <Link 
                    to="/login" 
                    className="btn btn-primary"
                    onClick={() => setIsOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link 
                    to="/register" 
                    className="btn btn-outline"
                    onClick={() => setIsOpen(false)}
                  >
                    Sign Up
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