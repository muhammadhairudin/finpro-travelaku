import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import Container from '../../../components/common/Container'
import ActivityFilters from './components/ActivityFilters'
import LoadingSpinner from '../../../components/common/LoadingSpinner'
import Pagination from '../../../components/common/Pagination'
import api from '../../../lib/axios'

export default function Activities() {
  const [searchParams] = useSearchParams()
  const [activities, setActivities] = useState([])
  const [categories, setCategories] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    fetchData()
  }, [searchParams, currentPage])

  const fetchData = async () => {
    try {
      setIsLoading(true)
      const [activitiesRes, categoriesRes] = await Promise.all([
        api.get('/api/v1/activities', {
          params: {
            search: searchParams.get('search'),
            category: searchParams.get('category'),
            priceRange: searchParams.get('priceRange'),
            sort: searchParams.get('sort'),
            page: currentPage,
            limit: 12
          }
        }),
        api.get('/api/v1/categories')
      ])

      let filteredActivities = activitiesRes.data.data || []

      if (searchParams.get('search')) {
        const searchTerm = searchParams.get('search').toLowerCase()
        filteredActivities = filteredActivities.filter(activity => 
          activity.title?.toLowerCase().includes(searchTerm) ||
          activity.description?.toLowerCase().includes(searchTerm)
        )
      }

      if (searchParams.get('category') && searchParams.get('category') !== 'all') {
        filteredActivities = filteredActivities.filter(activity => 
          activity.categoryId === searchParams.get('category')
        )
      }

      if (searchParams.get('priceRange') && searchParams.get('priceRange') !== 'all') {
        const [min, max] = searchParams.get('priceRange').split('-').map(Number)
        filteredActivities = filteredActivities.filter(activity => {
          if (max) {
            return activity.price >= min && activity.price <= max
          }
          return activity.price >= min
        })
      }

      if (searchParams.get('sort')) {
        switch (searchParams.get('sort')) {
          case 'price_asc':
            filteredActivities.sort((a, b) => a.price - b.price)
            break
          case 'price_desc':
            filteredActivities.sort((a, b) => b.price - a.price)
            break
          case 'rating_desc':
            filteredActivities.sort((a, b) => (b.rating || 0) - (a.rating || 0))
            break
          default:
            break
        }
      }

      setActivities(filteredActivities)
      setCategories(categoriesRes.data.data || [])
      setTotalPages(Math.ceil(filteredActivities.length / 12))
    } catch (err) {
      console.error('Failed to fetch activities:', err)
      setError('Gagal memuat data aktivitas')
    } finally {
      setIsLoading(false)
    }
  }

  const handlePageChange = (page) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (error) {
    return (
      <div className="min-h-screen pt-20">
        <Container>
          <div className="flex justify-center items-center min-h-[60vh]">
            <div className="text-center text-red-500">{error}</div>
          </div>
        </Container>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-20">
      <Container>
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Jelajahi Aktivitas
          </h1>
          <p className="text-gray-600">
            Temukan berbagai aktivitas menarik untuk liburan Anda
          </p>
        </div>

        {/* Filters */}
        <ActivityFilters categories={categories} />

        {/* Loading State */}
        {isLoading ? (
          <div className="flex justify-center items-center min-h-[40vh]">
            <LoadingSpinner />
          </div>
        ) : (
          <>
            {/* Activities Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {activities
                .slice((currentPage - 1) * 12, currentPage * 12)
                .map((activity) => (
                  <div 
                    key={activity.id}
                    className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 transition-transform hover:-translate-y-1 duration-300"
                  >
                    {/* Activity Image */}
                    <div className="aspect-[4/3] relative">
                      <img
                        src={activity.imageUrls?.[0] || '/placeholder-image.jpg'}
                        alt={activity.title}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold">
                        Rp {activity.price?.toLocaleString('id-ID')}
                      </div>
                    </div>

                    {/* Activity Info */}
                    <div className="p-4">
                      <h3 className="font-medium text-lg mb-2 line-clamp-1">
                        {activity.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                        {activity.description}
                      </p>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">
                          {activity.location}
                        </span>
                        <div className="flex items-center gap-1">
                          <span className="text-sm font-medium text-yellow-500">
                            ★ {activity.rating || '0'}
                          </span>
                          <span className="text-xs text-gray-500">
                            ({activity.total_reviews || '0'})
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>

            {/* Empty State */}
            {activities.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">Tidak ada aktivitas yang ditemukan</p>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </>
        )}
      </Container>
    </div>
  )
} 