import React from 'react'
import PropTypes from 'prop-types'

export default function Container({ children, className }) {
  return (
    <div className={`
      container mx-auto 
      px-4 sm:px-6 lg:px-8 
      max-w-7xl
      ${className || ''}
    `}>
      {children}
    </div>
  )
}

Container.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
} 