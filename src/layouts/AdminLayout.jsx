import React from 'react'
import { Outlet, Navigate, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Sidebar from '../components/admin/Sidebar'
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline'
import ErrorBoundary from '../components/common/ErrorBoundary'
import ErrorPage from '../pages/ErrorPage'

export default function AdminLayout() {
  const { user, token } = useSelector((state) => state.auth)

  // Redirect jika tidak login atau bukan admin
  if (!token || user?.role !== 'admin') {
    return <Navigate to="/login" replace />
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header/Navbar Admin yang Diperbarui */}
        <header className="sticky top-0 z-10 bg-white border-b transition-shadow duration-300 hover:shadow-md h-[73px]">
          <div className="flex items-center h-full px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center w-full">
              {/* Selamat Datang & Nama User */}
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-medium text-gray-800">
                  Selamat datang,{' '}
                  <span className="font-semibold text-primary">
                    {user?.name}
                  </span>
                </h1>
              </div>

              {/* Quick Actions */}
              <div className="flex items-center gap-4">
                {/* Lihat Website Button */}
                <Link 
                  to="/"
                  className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 rounded-lg transition-all duration-300 hover:bg-gray-50 hover:text-primary group"
                >
                  <span>Lihat Website</span>
                  <ArrowTopRightOnSquareIcon className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>

                {/* Divider */}
                <div className="h-6 w-px bg-gray-200"></div>

                {/* User Info & Logout */}
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">{user?.role}</p>
                    <p className="text-xs text-gray-500">{user?.email}</p>
                  </div>
                  <img 
                    src={user?.profilePictureUrl || '/default-avatar.png'}
                    alt={user?.name}
                    className="w-8 h-8 rounded-full object-cover border border-gray-200"
                  />
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="overflow-x-hidden flex-1 p-4 sm:p-6 lg:p-8">
          <div className="mx-auto max-w-7xl">
            <ErrorBoundary fallback={<ErrorPage />}>
              <Outlet />
            </ErrorBoundary>
          </div>
        </main>

        {/* Footer dengan tinggi yang sama dengan sidebar footer */}
        <footer className="flex-shrink-0 bg-white border-t h-[60px]">
          <div className="flex justify-end items-center px-4 h-full sm:px-6 lg:px-8">
            <div className="text-sm text-gray-500">
              <p>Created with ❤️ by Muhammad Hairudin</p>
              <p>Final Project Bootcamp Frontend Dibimbing Batch 19</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
} 