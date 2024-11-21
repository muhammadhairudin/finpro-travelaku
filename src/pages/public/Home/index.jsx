import React from 'react'
import Banner from './components/Banner'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import LoadingSpinner from '../../../components/common/LoadingSpinner'
import { fetchCategories } from '../../../store/slices/categorySlice'
import { fetchAllBanners } from '../../../store/slices/adminSlice'
import { fetchPromos } from '../../../store/slices/promoSlice'
import { fetchActivities } from '../../../store/slices/activitySlice'
import Features from './components/Features'
import CategorySection from './components/CategorySection'
import PromoSection from './components/PromoSection'
import TrustBanner from './components/TrustBanner'
import PopularActivities from './components/PopularActivities'
import Newsletter from './components/Newsletter'
import InfoSection from './components/InfoSection'

export default function Home() {
  const dispatch = useDispatch()
  const { items: activities } = useSelector((state) => state.activities)
  const { items: categories, isLoading: isCategoriesLoading } = useSelector((state) => state.categories)
  const { items: promos, isLoading: isPromosLoading } = useSelector((state) => state.promos)

  // Get popular activities (sort by rating)
  const popularActivities = [...activities]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 6)

  useEffect(() => {
    dispatch(fetchActivities())
    dispatch(fetchCategories())
    dispatch(fetchAllBanners())
    dispatch(fetchPromos())
  }, [dispatch])

  if (isCategoriesLoading || isPromosLoading) {
    return <LoadingSpinner />
  }

  return (
    <main>
      <Banner />
      <div className="pb-24 space-y-24">
        <Features />
        <CategorySection categories={categories} />
        <PopularActivities activities={popularActivities} />
        <PromoSection promos={promos} />
        <TrustBanner />
        <Newsletter />
      </div>
      <InfoSection />
    </main>
  )
} 