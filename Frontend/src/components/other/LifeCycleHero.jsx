import React from 'react';
import { motion } from 'framer-motion';
import photo from "../../../Temp/farmer.jpg"
const AnimatedHeroSection = () => {
  return (
    <div className="bg-white min-h-screen flex items-center overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          {/* Left side - Text content */}
          <motion.div 
            className="w-full md:w-1/2 text-left mb-8 md:mb-0"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.h1 
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-orange-500 mb-4"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Empowering Farmers
            </motion.h1>
            <motion.h2 
              className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-black mb-6"
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              With Smart Agriculture
            </motion.h2>
            <motion.p 
              className="text-lg sm:text-xl text-gray-700 mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              Unlock the potential of your land with our AI-powered crop lifecycle management. Maximize yields and minimize risks with data-driven insights.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <motion.button 
                className="bg-orange-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-orange-600 transition-colors duration-300 mr-4 mb-4 sm:mb-0"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get Started
              </motion.button>
              <motion.button 
                className="bg-white text-orange-500 border-2 border-orange-500 px-8 py-3 rounded-full text-lg font-semibold hover:bg-orange-50 transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Learn More
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Right side - Image */}
          <motion.div 
            className="w-full md:w-1/2"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div
              className="relative"
              initial={{ rotate: -5 }}
              animate={{ rotate: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            >
              <motion.img
                src={photo}
                alt="Farmer in a wheat field"
                className="rounded-lg shadow-2xl"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              />
              <motion.div
                className="absolute -bottom-4 -left-4 bg-orange-500 text-white p-4 rounded-lg shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1 }}
              >
                <p className="text-2xl font-bold">25-30%</p>
                <p className="text-sm">Expected Profit Margin</p>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Animated background elements */}
      <motion.div
        className="absolute top-0 left-0 w-64 h-64 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl opacity-70"
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 50, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-80 h-80 bg-orange-100 rounded-full mix-blend-multiply filter blur-xl opacity-70"
        animate={{
          scale: [1, 1.3, 1],
          x: [0, -30, 0],
          y: [0, 50, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
    </div>
  );
};

export default AnimatedHeroSection;

