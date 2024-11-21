import React from 'react'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes'
import ErrorBoundary from './components/common/ErrorBoundary'
import { Toaster } from 'react-hot-toast'

function App() {
  return (
    <ErrorBoundary>
      <div data-theme="travelaku">
        <RouterProvider router={router} />
        <Toaster position="top-right" />
      </div>
    </ErrorBoundary>
  )
}

export default App
