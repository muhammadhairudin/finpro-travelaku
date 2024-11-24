import React from 'react'
import PropTypes from 'prop-types'

export default function ActivityItem({ item, activity }) {
  if (!item || !activity) return null

  return (
    <div className="flex flex-col sm:flex-row gap-4 p-3 sm:p-4 border rounded-lg">
      {activity.imageUrl && (
        <div className="w-full sm:w-24 h-48 sm:h-24 flex-shrink-0">
          <img 
            src={activity.imageUrl} 
            alt={activity.title}
            className="w-full h-full object-cover rounded-lg"
            onError={(e) => {
              e.target.onerror = null
              e.target.src = '/placeholder-image.jpg'
            }}
          />
        </div>
      )}
      <div className="flex-1 min-w-0">
        <h4 className="font-medium mb-1 text-base sm:text-lg truncate">{activity.title}</h4>
        <p className="text-sm text-gray-600 mb-2 truncate">{activity.location}</p>
        <div className="flex flex-col sm:flex-row sm:justify-between gap-2 sm:gap-4">
          <div>
            <p className="text-sm text-gray-500">Jumlah</p>
            <p className="font-medium">{item.quantity}x</p>
          </div>
          <div className="sm:text-right">
            <p className="text-sm text-gray-500">Subtotal</p>
            <p className="font-medium">
              Rp {(item.quantity * activity.price).toLocaleString('id-ID')}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

ActivityItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired
  }),
  activity: PropTypes.shape({
    title: PropTypes.string.isRequired,
    location: PropTypes.string,
    price: PropTypes.number.isRequired,
    imageUrl: PropTypes.string
  })
} 