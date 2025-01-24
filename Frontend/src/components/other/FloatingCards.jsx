import React from 'react'
import { motion } from 'framer-motion'
import { BookOpen, User, Star, Award, MessageCircle, Code, Brush } from 'lucide-react';
import { Link } from 'react-router-dom'

const AnimatedServiceCards = () => {
  const colors = {
    primary: '#FF6B35', // Orange
    secondary: '#2B2D42', // Black
    background: '#FFFFFF', // White
  }

  
  const services = [
    {
      icon: BookOpen,
      title: 'Crop Price Prediction',
      description: 'Get real-time crop price insights to help farmers make informed decisions on when and where to sell their produce.',
      delay: 0,
      navigationlink: '/crop-price',
    },
    {
      icon: User,
      title: 'Disease Prediction and Management',
      description: 'Utilize advanced disease prediction tools to diagnose plant diseases and access expert solutions for effective management.',
      delay: 0.2,
      navigationlink: '/disease-prediction',
    },
    {
      icon: MessageCircle,
      title: 'Farming Solutions and Advice',
      description: 'Access practical farming advice on pest control, soil health, and irrigation methods tailored to your needs.',
      delay: 0.4,
      navigationlink: '/farming-solutions',
    },
    {
      icon: Star,
      title: 'Crop Lifecycle Guidance',
      description: 'Learn about the stages of crop growth, from planting to harvesting, with expert advice on how to maximize yield at each phase.',
      delay: 0.6,
      navigationlink: '/crop-lifecycle',
    },
    {
      icon: Brush,
      title: 'Sustainable Farming Practices',
      description: 'Discover eco-friendly farming techniques that promote sustainability while ensuring higher productivity and healthier crops.',
      delay: 0.8,
      navigationlink: '/sustainable-farming',
    },
    {
      icon: Code,
      title: 'Farm Management Tools',
      description: 'Explore digital tools and software solutions for efficient farm management, including inventory tracking, scheduling, and budgeting.',
      delay: 1,
      navigationlink: '/farm-management',
    },
];



  return (
    <div className="w-full py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
          {services.map((service, index) => (
            <Link to={service.navigationlink}>
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.8,
                delay: service.delay,
                ease: "easeOut"
              }}
            >
              <motion.div
                whileHover={{ 
                  scale: 1.03,
                  boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
                }}
                className="bg-white rounded-2xl p-8 h-full border border-gray-100 shadow-2xl"
              >
                {/* Icon Container */}
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className="w-16 h-16 rounded-2xl bg-orange-50 flex items-center justify-center mb-6"
                >
                  <service.icon 
                    size={32}
                    style={{ color: colors.primary }}
                  />
                </motion.div>

                {/* Content */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: service.delay + 0.3 }}
                >
                  <h3 
                    className="text-2xl font-bold mb-4"
                    style={{ color: colors.secondary }}
                  >
                    {service.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    {service.description}
                  </p>

                  {/* Learn More Link */}
                  <motion.a
                    href="#"
                    className="inline-flex items-center font-semibold"
                    style={{ color: colors.primary }}
                    whileHover={{ x: 5 }}
                  >
                    Learn More
                    <motion.span
                      initial={{ x: 0 }}
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      →
                    </motion.span>
                  </motion.a>
                </motion.div>

                {/* Background Decoration */}
                <motion.div
                  className="absolute top-0 right-0 w-24 h-24 rounded-full opacity-5"
                  style={{ background: colors.primary }}
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 90, 0]
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </motion.div>
            </motion.div>
            
          </Link>
          ))}

        </div>
      </div>
    </div>
  )
}

export default AnimatedServiceCards