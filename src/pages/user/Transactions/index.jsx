import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import Container from '../../../components/common/Container'
import { fetchTransactions } from '../../../store/slices/transactionSlice'
import LoadingSpinner from '../../../components/common/LoadingSpinner'
import TransactionCard from './components/TransactionCard'
import { MagnifyingGlassIcon, FunnelIcon, ClockIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline'

const ITEMS_PER_PAGE = 5

const statusOptions = [
  { value: '', label: 'Semua Status' },
  { value: 'pending', label: 'Menunggu Pembayaran' },
  { value: 'waiting_confirmation', label: 'Menunggu Konfirmasi' },
  { value: 'success', label: 'Pembayaran Dikonfirmasi' },
  { value: 'rejected', label: 'Pembayaran Ditolak' },
  { value: 'cancelled', label: 'Transaksi Dibatalkan' }
]

// Definisikan status mapping
const statusMap = {
  pending: {
    label: 'Menunggu Pembayaran',
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-50',
    icon: <ClockIcon className="w-5 h-5" />
  },
  waiting_confirmation: {
    label: 'Menunggu Konfirmasi',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    icon: <ClockIcon className="w-5 h-5" />
  },
  success: {
    label: 'Pembayaran Dikonfirmasi',
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    icon: <CheckCircleIcon className="w-5 h-5" />
  },
  failed: {
    label: 'Pembayaran Ditolak',
    color: 'text-red-600',
    bgColor: 'bg-red-50',
    icon: <XCircleIcon className="w-5 h-5" />
  },
  cancelled: {
    label: 'Transaksi Dibatalkan',
    color: 'text-gray-600',
    bgColor: 'bg-gray-50',
    icon: <XCircleIcon className="w-5 h-5" />
  }
}

export default function Transactions() {
  const dispatch = useDispatch()
  const location = useLocation()
  const { transactions, isLoading } = useSelector((state) => state.transaction)
  
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [showFilters, setShowFilters] = useState(false)
  const [sortBy, setSortBy] = useState('newest') // newest, oldest
  const [dateRange, setDateRange] = useState({
    start: '',
    end: ''
  })

  useEffect(() => {
    dispatch(fetchTransactions())
  }, [dispatch])

  // Fungsi untuk format tanggal ke ISO string
  const formatDateForFilter = (date) => {
    if (!date) return null
    const d = new Date(date)
    d.setHours(0, 0, 0, 0)
    return d.toISOString()
  }

  // Filter dan sort transactions
  const filteredTransactions = transactions.filter(transaction => {
    // Filter berdasarkan ID
    const matchesSearch = transaction.id?.toLowerCase().includes(searchTerm.toLowerCase())

    // Filter berdasarkan status dengan pengecekan proofPaymentUrl
    let matchesStatus = true
    if (selectedStatus) {
      if (selectedStatus === 'waiting_confirmation') {
        // Status menunggu konfirmasi jika sudah upload bukti
        matchesStatus = transaction.status === 'pending' && transaction.proofPaymentUrl
      } else if (selectedStatus === 'pending') {
        // Status pending jika belum upload bukti
        matchesStatus = transaction.status === 'pending' && !transaction.proofPaymentUrl
      } else {
        // Status lainnya (success, rejected, cancelled)
        matchesStatus = transaction.status === selectedStatus
      }
    }

    // Filter berdasarkan tanggal
    const transactionDate = new Date(transaction.createdAt)
    let matchesDate = true

    if (dateRange.start) {
      const startDate = new Date(dateRange.start)
      startDate.setHours(0, 0, 0, 0)
      matchesDate = matchesDate && transactionDate >= startDate
    }

    if (dateRange.end) {
      const endDate = new Date(dateRange.end)
      endDate.setHours(23, 59, 59, 999)
      matchesDate = matchesDate && transactionDate <= endDate
    }

    // Debug log untuk filter tanggal
    console.log('Filter Date Debug:', {
      transactionDate,
      startDate: dateRange.start ? new Date(dateRange.start) : null,
      endDate: dateRange.end ? new Date(dateRange.end) : null,
      matchesDate
    })
    
    return matchesSearch && matchesStatus && matchesDate
  }).sort((a, b) => {
    const dateA = new Date(a.createdAt)
    const dateB = new Date(b.createdAt)
    return sortBy === 'newest' ? dateB - dateA : dateA - dateB
  })

  // Handler untuk perubahan tanggal
  const handleDateChange = (type, value) => {
    setDateRange(prev => {
      const newRange = { ...prev, [type]: value }
      
      // Debug log
      console.log('Date Range Changed:', {
        type,
        value,
        newRange
      })
      
      return newRange
    })
    // Reset halaman ke 1 saat filter berubah
    setCurrentPage(1)
  }

  // Debug filtered results
  useEffect(() => {
    console.log('Selected Status:', selectedStatus)
    console.log('Available Statuses:', transactions.map(t => t.status))
    console.log('Filtered Results:', filteredTransactions)
  }, [selectedStatus, transactions, filteredTransactions])

  // Pagination
  const totalPages = Math.ceil(filteredTransactions.length / ITEMS_PER_PAGE)
  const paginatedTransactions = filteredTransactions.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  const handlePageChange = (page) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleReset = () => {
    setSearchTerm('')
    setSelectedStatus('')
    setDateRange({ start: '', end: '' })
    setSortBy('newest')
    setCurrentPage(1)
    setShowFilters(false)
  }

  // Update currentPage saat filter berubah
  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm, selectedStatus, dateRange, sortBy])

  // Debug log
  useEffect(() => {
    console.log('Current Filters:', {
      searchTerm,
      selectedStatus,
      dateRange,
      sortBy
    })
    console.log('Filtered Transactions:', filteredTransactions)
  }, [searchTerm, selectedStatus, dateRange, sortBy, filteredTransactions])

  // Fungsi untuk mendapatkan status yang benar
  const getTransactionStatus = (transaction) => {
    // Jika status pending tapi sudah ada bukti pembayaran
    if (transaction.status === 'pending' && transaction.proofPaymentUrl) {
      return statusMap.waiting_confirmation
    }
    return statusMap[transaction.status] || statusMap.pending
  }

  if (isLoading) return <LoadingSpinner />

  return (
    <Container className="py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="mb-2 text-2xl font-bold">Transaksi Saya</h1>
        <p className="text-gray-600">
          Kelola dan pantau status transaksi Anda
        </p>
      </div>

      {/* Success Message */}
      {location.state?.message && (
        <div className="p-4 mb-6 text-green-700 bg-green-50 rounded-lg">
          {location.state.message}
        </div>
      )}

      {/* Search and Filters */}
      <div className="mb-6 space-y-4">
        <div className="flex gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 w-5 h-5 text-gray-400 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari ID Transaksi atau Invoice..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="py-2 pr-4 pl-10 w-full rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>

          {/* Filter Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50 ${
              showFilters ? 'bg-primary/5 border-primary' : ''}`}
          >
            <FunnelIcon className="w-5 h-5" />
            Filter {showFilters ? 'Aktif' : ''}
          </button>
        </div>

        {/* Extended Filters */}
        {showFilters && (
          <div className="p-4 space-y-4 rounded-lg border">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {/* Status Filter */}
              <div>
                <label className="block mb-1 text-sm font-medium">Status</label>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="p-2 w-full rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                  {statusOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Date Range */}
              <div>
                <label className="block mb-1 text-sm font-medium">Dari Tanggal</label>
                <input
                  type="date"
                  value={dateRange.start}
                  onChange={(e) => handleDateChange('start', e.target.value)}
                  max={dateRange.end || undefined}
                  className="p-2 w-full rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium">Sampai Tanggal</label>
                <input
                  type="date"
                  value={dateRange.end}
                  onChange={(e) => handleDateChange('end', e.target.value)}
                  min={dateRange.start || undefined}
                  className="p-2 w-full rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>

            {/* Sort and Reset */}
            <div className="flex justify-between items-center pt-4 border-t">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="p-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                <option value="newest">Terbaru</option>
                <option value="oldest">Terlama</option>
              </select>

              <button
                onClick={handleReset}
                className="text-primary hover:text-primary/80"
              >
                Reset Filter
              </button>
            </div>
          </div>
        )}

        {/* Active Filters Summary */}
        {(searchTerm || selectedStatus || dateRange.start || dateRange.end) && (
          <div className="flex flex-wrap gap-2">
            {searchTerm && (
              <span className="px-3 py-1 text-sm rounded-full bg-primary/5">
                Pencarian: {searchTerm}
              </span>
            )}
            {selectedStatus && (
              <span className="px-3 py-1 text-sm rounded-full bg-primary/5">
                Status: {statusOptions.find(opt => opt.value === selectedStatus)?.label}
              </span>
            )}
            {(dateRange.start || dateRange.end) && (
              <span className="px-3 py-1 text-sm rounded-full bg-primary/5">
                Periode: {dateRange.start ? new Date(dateRange.start).toLocaleDateString('id-ID') : '...'} 
                s/d 
                {dateRange.end ? new Date(dateRange.end).toLocaleDateString('id-ID') : '...'}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Transactions List */}
      <div className="space-y-4">
        {paginatedTransactions.length > 0 ? (
          paginatedTransactions.map(transaction => {
            const status = getTransactionStatus(transaction)
            
            return (
              <TransactionCard 
                key={transaction.id} 
                transaction={transaction}
              />
            )
          })
        ) : (
          <div className="py-8 text-center text-gray-500">
            Tidak ada transaksi ditemukan
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex gap-2 justify-center mt-8">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-3 py-1 rounded ${
              currentPage === 1
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            Previous
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i + 1}
              onClick={() => handlePageChange(i + 1)}
              className={`px-3 py-1 rounded ${
                currentPage === i + 1
                  ? 'bg-primary text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 rounded ${
              currentPage === totalPages
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            Next
          </button>
        </div>
      )}
    </Container>
  )
} 