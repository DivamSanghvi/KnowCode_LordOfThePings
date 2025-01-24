import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { TypeAnimation } from 'react-type-animation'
import picture from "../../Temp/farmer-holding-crops-field.jpg"

const HeroSection = () => {
  const colors = {
    primary: '#FF6B35', // Vibrant Orange
    secondary: '#2B2D42', // Dark Blue-Gray
    background: '#FFFFFF', // White
    text: '#2B2D42', // Dark Blue-Gray
  }

  const rotatingPhrases = [
    'For Accurate Crop Price Predictions',
    3000,
    'For Effective Disease Management',
    3000,
    'For Expert Farming Solutions',
    3000,
    'For Comprehensive Crop Lifecycle',
    3000,
];


  // Animation variants for staggered text
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  }

  return (
    <div className="w-full min-h-screen bg-white py-4 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            <motion.span
              variants={itemVariants}
              style={{ color: colors.primary }}
              className="inline-block text-lg font-semibold mb-4 text-3xl"
            >
              Welcome to <span className='font-bold mb-4 text-gray-600'>KRUSHI KARNTI</span>
            </motion.span>

            <motion.div variants={itemVariants}>
              <h1 
                style={{ color: colors.secondary }}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight"
              >
                Transform Your Farming Journey
                <span className="block h-[1.2em]"> {/* Fixed height container for typewriter */}
                  <TypeAnimation
                    sequence={rotatingPhrases}
                    wrapper="span"
                    speed={50}
                    style={{ color: colors.primary }}
                    repeat={Infinity}
                  />
                </span>
              </h1>
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="text-lg text-gray-600 max-w-xl py-8"
            >
              Explore a world of possibilities with our comprehensive farming platform. We offer real-time crop price insights, expert disease prediction, and actionable farming solutions to help you maximize your harvest and grow sustainably.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-4"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{ background: colors.primary }}
                className="px-8 py-3 rounded-full text-white font-semibold hover:shadow-lg transition-all"
              >
                Get Started
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{ borderColor: colors.secondary }}
                className="px-8 py-3 rounded-full border-2 font-semibold hover:shadow-lg transition-all"
              > 
                Learn More
              </motion.button>
            </motion.div>

            {/* Animated Stats */}
            <motion.div
              variants={containerVariants}
              className="grid grid-cols-3 gap-4 pt-8"
            >
              {[
                { number: '1000+', label: 'Farmer' },
                { number: '50+', label: 'Experts' },
                { number: '95%', label: 'Success Rate' }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="text-center"
                >
                  <motion.span
                    className="block text-2xl font-bold"
                    style={{ color: colors.primary }}
                  >
                    {stat.number}
                  </motion.span>
                  <span className="text-sm text-gray-600">{stat.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <motion.div
              animate={{ 
                y: [0, -20, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="relative z-10"
            >
              <img
                src={picture}
                alt="Educational Illustration"
                className="w-full h-auto rounded-2xl shadow-2xl"
              />
              
              {/* Decorative Elements */}
              <motion.div
                animate={{ 
                  rotate: 360,
                  scale: [1, 1.1, 1]
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear"
                }}
                style={{ background: colors.primary }}
                className="absolute -top-6 -right-6 w-24 h-24 rounded-full opacity-20"
              />
              <motion.div
                animate={{ 
                  rotate: -360,
                  scale: [1, 1.2, 1]
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "linear"
                }}
                style={{ background: colors.secondary }}
                className="absolute -bottom-4 -left-4 w-32 h-32 rounded-full opacity-10"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}


export default HeroSection