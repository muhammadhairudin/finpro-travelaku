import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { StarIcon } from '@heroicons/react/24/solid'
import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline'

export default function ActivityCard({ 
  id,
  title, 
  description, 
  imageUrl, 
  price, 
  rating,
  location,
  totalReviews 
}) {
  const [quantity, setQuantity] = useState(1)

  // Hitung subtotal
  const subtotal = price * quantity
  // Hitung biaya layanan (5%)
  const serviceCharge = Math.round(subtotal * 0.05)
  // Hitung total akhir
  const totalPrice = subtotal + serviceCharge

  const handleQuantityChange = (type) => {
    if (type === 'increment') {
      setQuantity(prev => prev + 1)
    } else if (type === 'decrement' && quantity > 1) {
      setQuantity(prev => prev - 1)
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 transition-transform hover:-translate-y-1 duration-300">
      {/* Activity Image */}
      <div className="aspect-[4/3] relative">
        <img
          src={imageUrl}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover"
          onError={(e) => {
            e.target.onerror = null
            e.target.src = '/placeholder-image.jpg'
          }}
        />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold">
          Rp {price?.toLocaleString('id-ID')}
        </div>
      </div>

      {/* Activity Info */}
      <div className="p-4">
        <h3 className="font-medium text-lg mb-2 line-clamp-1">
          {title}
        </h3>
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {description}
        </p>
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm text-gray-500">
            {location}
          </span>
          <div className="flex items-center gap-1">
            <StarIcon className="w-4 h-4 text-yellow-500" />
            <span className="text-sm font-medium">
              {rating || '0'}
            </span>
            <span className="text-xs text-gray-500">
              ({totalReviews || '0'})
            </span>
          </div>
        </div>

        {/* Price Breakdown */}
        <div className="mb-4 space-y-2">
          {/* Subtotal */}
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Subtotal ({quantity} item):</span>
            <span>Rp {subtotal.toLocaleString('id-ID')}</span>
          </div>
          {/* Biaya Layanan */}
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Biaya Layanan (5%):</span>
            <span>+ Rp {serviceCharge.toLocaleString('id-ID')}</span>
          </div>
        </div>

        {/* Quantity Controls */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-gray-600">Jumlah:</span>
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleQuantityChange('decrement')}
              disabled={quantity === 1}
              className="p-1 rounded-full hover:bg-gray-100 disabled:opacity-50"
            >
              <MinusIcon className="w-4 h-4" />
            </button>
            <span className="w-8 text-center font-medium">{quantity}</span>
            <button
              onClick={() => handleQuantityChange('increment')}
              className="p-1 rounded-full hover:bg-gray-100"
            >
              <PlusIcon className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Total */}
        <div className="flex justify-between items-center mb-4 pt-2 border-t">
          <span className="text-sm font-medium">Total:</span>
          <span className="font-bold text-primary text-lg">
            Rp {totalPrice.toLocaleString('id-ID')}
          </span>
        </div>

        {/* CTA Button */}
        <Link
          to={`/activities/${id}`}
          state={{ 
            quantity,
            subtotal,
            serviceCharge,
            totalPrice
          }}
          className="block w-full text-center px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
        >
          Pesan Sekarang
        </Link>
      </div>
    </div>
  )
}

ActivityCard.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  imageUrl: PropTypes.string,
  price: PropTypes.number.isRequired,
  rating: PropTypes.number,
  location: PropTypes.string,
  totalReviews: PropTypes.number
} 