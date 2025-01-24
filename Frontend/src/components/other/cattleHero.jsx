import React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import picture from "../../../Temp/cows.jpg"

const HeroSection = styled.section`
  background-color: #FFFFFF;
  color: #2B2D42;
  padding: 4rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 80vh;
  overflow: hidden;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`

const HeroContent = styled.div`
  flex: 1;
  max-width: 600px;
`

const HeroTitle = styled(motion.h1)`
  font-size: 3.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: #2B2D42;
`

const HeroSubtitle = styled(motion.p)`
  font-size: 1.2rem;
  margin-bottom: 2rem;
  color: #555;
`

const SentimentalText = styled(motion.p)`
  font-size: 1.1rem;
  font-style: italic;
  color: #FF6B35;
  margin-bottom: 2rem;
`

const CtaButton = styled(motion.button)`
  background-color: #FF6B35;
  color: #FFFFFF;
  border: none;
  padding: 1rem 2rem;
  font-size: 1.2rem;
  border-radius: 50px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #E85A2A;
  }
`

const HeroImageContainer = styled(motion.div)`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`

const HeroImage = styled(motion.img)`
  max-width: 100%;
  height: auto;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
`

const PlantLeaf = styled(motion.div)`
  position: absolute;
  width: 50px;
  height: 50px;
  background-color: #4CAF50;
  clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
`

const CattleDiseaseHero = () => {
  return (
    <HeroSection>
      <HeroContent>
        <HeroTitle
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          Heal Your Cattle's Heart
        </HeroTitle>
        <HeroSubtitle
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          Instantly diagnose Cattle diseases with a simple photo
        </HeroSubtitle>
        <SentimentalText
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
        >
          "Every cattle has a story. Let's make sure yours has a happy ending."
        </SentimentalText>
        <CtaButton
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
        >
          Diagnose Now
        </CtaButton>
      </HeroContent>
      <HeroImageContainer
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
      >
        <HeroImage 
          src={picture} 
          alt="Healthy and diseased plant comparison"
        />
        {[...Array(5)].map((_, index) => (
          <PlantLeaf
            key={index}
            initial={{ 
              opacity: 0, 
              x: Math.random() * 200 - 100,
              y: Math.random() * 200 - 100,
              rotate: Math.random() * 360
            }}
            animate={{ 
              opacity: 1,
              x: Math.random() * 400 - 200,
              y: Math.random() * 400 - 200,
              rotate: Math.random() * 720 - 360
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
              delay: index * 0.2
            }}
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </HeroImageContainer>
    </HeroSection>
  )
}

export default CattleDiseaseHero