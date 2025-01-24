import React from 'react'
import { motion } from 'framer-motion'
import { FaCheck, FaTimes } from 'react-icons/fa'
import photo from "../../../Temp/4673.jpg"
const HeroAndComparison = () => {
  const comparisonData = [
    { feature: 'Specialized in Agricultural Products', us: true, competitor: false },
    { feature: 'Direct from Manufacturers', us: true, competitor: false },
    { feature: 'Farmer-Focused Customer Support', us: true, competitor: false },
    { feature: 'Competitive Pricing', us: true, competitor: true },
    { feature: 'Bulk Order Discounts', us: true, competitor: false },
    { feature: 'Expert Product Advice', us: true, competitor: false },
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="container mx-auto px-4 flex flex-col md:flex-row items-center"
        >
          {/* Left side - Text content */}
          <div className="md:w-1/2 mb-10 md:mb-0">
            <motion.h1
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl md:text-6xl font-bold mb-6 text-orange-500"
            >
              Empower Your Farm
            </motion.h1>
            <motion.p
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl mb-8"
            >
              Access premium farming equipment at competitive prices. Boost your productivity with our curated selection of agricultural tools and machinery.
            </motion.p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-orange-500 text-white px-8 py-3 rounded-md text-lg font-semibold hover:bg-orange-600 transition-colors duration-300"
            >
              Explore Catalogue
            </motion.button>
          </div>
          
          {/* Right side - Image */}
          <div className="md:w-1/2">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="relative w-full h-[400px]"
            >
              <img
                src={photo}
                alt="Modern Farming Equipment"
                className="w-full h-full object-cover rounded-lg"
              />
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Comparison Section */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-4xl font-bold mb-12 text-center text-orange-500"
          >
            Why Choose Us Over Competitors
          </motion.h2>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="py-4 px-6 text-left text-lg font-semibold">Feature</th>
                  <th className="py-4 px-6 text-center text-lg font-semibold">Our Platform</th>
                  <th className="py-4 px-6 text-center text-lg font-semibold">Flipkart</th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((item, index) => (
                  <motion.tr
                    key={item.feature}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="border-b border-gray-800 hover:bg-gray-800 transition-colors duration-300"
                  >
                    <td className="py-4 px-6 text-left">{item.feature}</td>
                    <td className="py-4 px-6 text-center">
                      {item.us ? (
                        <FaCheck className="inline-block text-green-500 text-xl" />
                      ) : (
                        <FaTimes className="inline-block text-red-500 text-xl" />
                      )}
                    </td>
                    <td className="py-4 px-6 text-center">
                      {item.competitor ? (
                        <FaCheck className="inline-block text-green-500 text-xl" />
                      ) : (
                        <FaTimes className="inline-block text-red-500 text-xl" />
                      )}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-12 text-center"
          >
            <p className="text-lg mb-6">
              Experience the difference with our farmer-focused approach and specialized agricultural expertise.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-orange-500 text-white px-8 py-3 rounded-md text-lg font-semibold hover:bg-orange-600 transition-colors duration-300"
            >
              Start Shopping Now
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default HeroAndComparison