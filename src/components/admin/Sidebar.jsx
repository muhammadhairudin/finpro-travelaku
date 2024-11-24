import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  HomeIcon,
  UsersIcon,
  TicketIcon,
  TagIcon,
  PhotoIcon,
  CreditCardIcon,
  GiftIcon,
  Bars3Icon,
  XMarkIcon
} from '@heroicons/react/24/outline'

export default function Sidebar() {
  const location = useLocation()
  const [isOpen, setIsOpen] = useState(false)
  
  const menuItems = [
    {
      path: '/admin',
      icon: <HomeIcon className="w-5 h-5" />,
      label: 'Dashboard'
    },
    {
      path: '/admin/transactions',
      icon: <CreditCardIcon className="w-5 h-5" />,
      label: 'Transaksi'
    },
    {
      path: '/admin/users',
      icon: <UsersIcon className="w-5 h-5" />,
      label: 'Pengguna'
    },
    {
      path: '/admin/activities',
      icon: <TicketIcon className="w-5 h-5" />,
      label: 'Aktivitas'
    },
    {
      path: '/admin/categories',
      icon: <TagIcon className="w-5 h-5" />,
      label: 'Kategori'
    },
    {
      path: '/admin/banners',
      icon: <PhotoIcon className="w-5 h-5" />,
      label: 'Banner'
    },
    {
      path: '/admin/promos',
      icon: <GiftIcon className="w-5 h-5" />,
      label: 'Promo'
    }
  ]

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 p-2.5 bg-white rounded-lg shadow-lg md:hidden hover:bg-gray-50"
        aria-label="Toggle Menu"
      >
        {isOpen ? (
          <XMarkIcon className="w-6 h-6 text-gray-600" />
        ) : (
          <Bars3Icon className="w-6 h-6 text-gray-600" />
        )}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 backdrop-blur-sm bg-black/20 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Container - Fixed Position */}
      <div className={`
        fixed inset-y-0 left-0 z-40 w-72
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0
        flex flex-col
        bg-white border-r
      `}>
        {/* Header - Sesuaikan tinggi dengan header main */}
        <div className="flex-shrink-0 border-b h-[73px]">
          <div className="flex items-center h-full px-4">
            <div className="flex items-center gap-3">
              <img 
                src="/logo-travelaku.png" 
                alt="TravelAku Logo"
                className="w-8 h-8"
              />
              <div>
                <h2 className="font-bold text-gray-900">Admin Panel</h2>
                <p className="text-xs text-gray-500">Manage your application</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Navigation Menu - dengan scroll */}
        <nav className="flex-1 overflow-y-auto p-3 space-y-1">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path
            
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`
                  flex items-center gap-3 px-3 py-2.5 rounded-lg
                  transition-all duration-200
                  ${isActive 
                    ? 'bg-primary/10 text-primary font-medium' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }
                `}
              >
                <span className={`
                  flex-shrink-0 
                  ${isActive ? 'text-primary' : 'text-gray-400'}
                `}>
                  {item.icon}
                </span>
                <span className="text-sm">{item.label}</span>
              </Link>
            )
          })}
        </nav>

        {/* Footer dengan tinggi yang sama */}
        <div className="flex-shrink-0 border-t bg-white h-[60px]"> {/* Sesuaikan tinggi */}
          <div className="flex items-center justify-center h-full px-4">
            <div className="text-xs text-gray-500">
              <p>TravelAku Admin v1.0.0</p>
            </div>
          </div>
        </div>
      </div>

      {/* Spacer untuk layout di desktop */}
      <div className="hidden md:block w-72 flex-shrink-0" />
    </>
  )
} 