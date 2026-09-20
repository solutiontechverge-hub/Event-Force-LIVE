'use client';

import React from 'react'
import dynamic from 'next/dynamic'
import Header from '@/components/Header'
import HeroSection from '@/components/HeroSection'
import MissionVision from '@/components/MissionVision'
import DownloadProfile from '@/components/DownloadProfile'
import { 
  SuspenseBenefitsSection, 
  SuspenseTestimonialsSection, 
  SuspenseFleetSection, 
  SuspenseContactSection 
} from '@/components/LazyComponents'
import { Divider } from '@mui/material';

const RamadanPopup = dynamic(() => import('@/components/RamadanPopup'), {
  ssr: false,
});

const Footer = dynamic(() => import('@/components/Footer'), {
  loading: () => null,
});

const HomePage = () => {
  return (
    <>
      <RamadanPopup />
      <Header />
      <HeroSection />
      <MissionVision />
      <Divider sx={{ my: 8 }} />
      <SuspenseBenefitsSection />
      <Divider sx={{ my: 8 }} />
      <DownloadProfile />
      <Divider sx={{ my: 8 }} />
      <SuspenseTestimonialsSection />
      <Divider sx={{ my: 8 }} />
      <SuspenseFleetSection />
      <Divider sx={{ my: 8 }} />
      <SuspenseContactSection />
      <Footer />
    </>
  )
}

export default HomePage
