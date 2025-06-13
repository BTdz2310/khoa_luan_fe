import React from 'react'

import Bullshit from '@components/Home/UI/Bullshit'
import Hero from '@components/Home/UI/Hero'
import PopularCourse from '@components/Home/UI/PopularCourse'
import Prize from '@components/Home/UI/Prize'
import Testimonals from '@components/Home/UI/Testimonals'
import TopCategories from '@components/Home/UI/TopCategories'
import TopInstructors from '@components/Home/UI/TopInstructors'

const Home = () => {
  return (
    <>
      <Hero />
      <Bullshit />
      <PopularCourse />
      <Prize />
      <TopCategories />
      <TopInstructors />
      <Testimonals />
    </>
  )
}

export default Home