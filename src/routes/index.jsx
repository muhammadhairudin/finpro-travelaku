import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import publicRoutes from './publicRoutes'
import privateRoutes from './privateRoutes'
import authRoutes from './authRoutes'
import adminRoutes from './adminRoutes'
import RootLayout from '../layouts/RootLayout'
import AdminLayout from '../layouts/AdminLayout'
import ActivityDetail from '../pages/public/ActivityDetail/index'
import Payment from '../pages/user/Payment/index'
import PaymentSuccess from '../pages/user/PaymentSuccess'
import AdminRoute from '../middleware/AdminRoute'
import About from '../pages/public/About'
import Documentation from '../pages/public/Documentation/index'
import Dashboard from '../pages/admin/Dashboard'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      ...publicRoutes,
      ...privateRoutes,
      ...authRoutes,
    ],
  },
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />
      },
      ...adminRoutes
    ]
  },
  {
    path: '/activities/:id',
    element: <ActivityDetail />
  },
  {
    path: '/payment/:id',
    element: <Payment />
  },
  {
    path: '/payment-success',
    element: <PaymentSuccess />
  },
  {
    path: '/about',
    element: <About />
  },
  {
    path: '/docs',
    element: <Documentation />
  },
]) 