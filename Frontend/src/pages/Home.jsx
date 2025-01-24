import React from 'react'
import Hero from './Hero'
import AnimatedServiceCards from '../components/other/FloatingCards'
import TestimonialCarousel from '../components/other/ReviewCarrousal'
import WhyUrja from '../components/other/WhyUrjaPage'
import useTextToSpeech from './textToSpeech'
import { useSelector } from 'react-redux'

const Home = () => {
  const { speakText } = useTextToSpeech(); 
  const user = useSelector((state) => state.user);
  console.log(user)
  return (
    <div>
        <Hero/>
        <AnimatedServiceCards/>
        <TestimonialCarousel/>
        <WhyUrja/>
    </div>
  )
}

export default Home