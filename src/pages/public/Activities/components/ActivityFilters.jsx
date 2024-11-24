import React from 'react'
import PropTypes from 'prop-types'
import { useSearchParams } from 'react-router-dom'
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline'

export default function ActivityFilters({ categories = [] }) {
  const [searchParams, setSearchParams] = useSearchParams()

  const handleSearch = (e) => {
    const value = e.target.value
    if (value) {
      searchParams.set('search', value)
    } else {
      searchParams.delete('search')
    }
    setSearchParams(searchParams)
  }

  const handleCategoryChange = (e) => {
    const value = e.target.value
    if (value !== 'all') {
      searchParams.set('category', value)
    } else {
      searchParams.delete('category')
    }
    setSearchParams(searchParams)
  }

  const handleSortChange = (e) => {
    const value = e.target.value
    if (value !== 'default') {
      searchParams.set('sort', value)
    } else {
      searchParams.delete('sort')
    }
    setSearchParams(searchParams)
  }

  return (
    <div className="mb-8 space-y-4">
      {/* Search */}
      <div className="relative">
        <input
          type="text"
          placeholder="Cari aktivitas..."
          defaultValue={searchParams.get('search') || ''}
          onChange={handleSearch}
          className="w-full px-4 py-3 pl-12 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/20 focus:border-primary"
        />
        <MagnifyingGlassIcon className="absolute top-1/2 left-4 -translate-y-1/2 w-5 h-5 text-gray-400" />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {/* Category Filter */}
        <select
          value={searchParams.get('category') || 'all'}
          onChange={handleCategoryChange}
          className="px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/20 focus:border-primary"
        >
          <option value="all">Semua Kategori</option>
          {categories.map(category => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>

        {/* Price Range */}
        <select
          value={searchParams.get('priceRange') || 'all'}
          onChange={(e) => {
            const value = e.target.value
            if (value !== 'all') {
              searchParams.set('priceRange', value)
            } else {
              searchParams.delete('priceRange')
            }
            setSearchParams(searchParams)
          }}
          className="px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/20 focus:border-primary"
        >
          <option value="all">Semua Harga</option>
          <option value="0-500000">Dibawah Rp 500.000</option>
          <option value="500000-1000000">Rp 500.000 - Rp 1.000.000</option>
          <option value="1000000-up">Diatas Rp 1.000.000</option>
        </select>

        {/* Sort */}
        <select
          value={searchParams.get('sort') || 'default'}
          onChange={handleSortChange}
          className="px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/20 focus:border-primary"
        >
          <option value="default">Urutan Default</option>
          <option value="price_asc">Harga Terendah</option>
          <option value="price_desc">Harga Tertinggi</option>
          <option value="rating_desc">Rating Tertinggi</option>
        </select>
      </div>

      {/* Active Filters */}
      <div className="flex flex-wrap gap-2">
        {Array.from(searchParams.entries()).map(([key, value]) => (
          <div
            key={key}
            className="flex items-center gap-2 px-3 py-1 text-sm rounded-full bg-primary/10 text-primary"
          >
            <span>
              {key === 'search' ? 'Pencarian' : 
               key === 'category' ? 'Kategori' :
               key === 'priceRange' ? 'Harga' : 'Urutan'}: {value}
            </span>
            <button
              onClick={() => {
                searchParams.delete(key)
                setSearchParams(searchParams)
              }}
              className="p-1 hover:bg-primary/10 rounded-full"
            >
              <XMarkIcon className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

ActivityFilters.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    })
  )
} 