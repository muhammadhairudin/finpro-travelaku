import { Component } from 'react'
import PropTypes from 'prop-types'

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex justify-center items-center p-4 min-h-screen">
          <div className="text-center">
            <h2 className="mb-4 text-2xl font-bold text-gray-900">
              Oops! Terjadi Kesalahan
            </h2>
            <p className="mb-6 text-gray-600">
              {this.state.error?.message || 'Silakan coba lagi nanti'}
            </p>
            <button 
              onClick={() => window.location.reload()} 
              className="px-6 py-2 text-white rounded-lg transition-colors bg-primary hover:bg-primary/90"
            >
              Muat Ulang
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
} 