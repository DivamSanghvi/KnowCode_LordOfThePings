import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, Clock, Calendar, Users, DollarSign } from 'lucide-react'
import picture from "../../Temp/19791.jpg"
const MathOLogicPage = () => {
  const [hoveredCard, setHoveredCard] = useState(null)

  const colors = {
    primary: '#FF6B35', // Orange
    secondary: '#2B2D42', // Dark Blue-Gray
    background: '#FFFFFF', // White
  }

  const topics = [
    { title: 'Coding & Decoding', description: 'A cool spy-tool basics to code and decode the messages' },
    { title: 'Operations & Symbols fun', description: 'Play with operators and operands to solve simple math puzzles' },
    { title: 'Family Tree', description: 'Learn to understand the relation nomenclatures in a fun way' },
    { title: 'Directions', description: 'Learn various directions and solve problems based on those' },
    { title: 'Arrangements', description: 'Solve the sitting arrangement puzzles to enhance reasoning' },
    { title: 'Groups & Conditionality', description: 'Learn to form groups based on conditions' },
    { title: 'Logical Series & Analogy', description: 'Learn simple series to enhance math, reasoning with analogy' },
    { title: 'Selection Criteria', description: 'Learn with fun on how HR selects from thousands of applicants' },
    { title: 'Sequential Output Tracing', description: 'Compete with computer to come up with correct output to the given inputs' },
    { title: 'Logical Puzzles', description: 'Learn puzzles based on probability and combinations' },
    { title: 'Clocks & Calendar', description: 'Learn to solve time and date puzzles' },
    { title: 'Visual Reasoning', description: 'Fun with Mirror images, picture patterns, etc' },
    { title: 'Brainteasers/Riddles', description: 'Solve confusing brain numbing riddles' },
    { title: 'Sudoku', description: 'Enter the crazy addictive world of Sudoku' },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <motion.div 
          className="absolute inset-0 z-0"
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.1 }}
          transition={{ duration: 1.5 }}
        >
          <img 
            src="/placeholder.svg?height=800&width=1200" 
            alt="Math background" 
            className="w-full h-full object-cover"
          />
        </motion.div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row items-center">
            <motion.div 
              className="md:w-1/2 mb-10 md:mb-0"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: colors.secondary }}>
                Urja Logical Reasoning & Mental Maths Classes
              </h1>
              <motion.p 
                className="text-xl mb-8 italic"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                "Mom/Dad, I wanna be super cool & quick at Maths and Reasoning. Tell me how?"
              </motion.p>
              <p className="text-lg mb-8">
                Well, we have the answer for you with our Math-O-Logic classes. Logical Reasoning and Mental Maths are the most critical parts of most of the Competitive Exams - be it Olympiads, Banking, Civil Services, GATE, JEE, etc. Having a sound Logical reasoning acumen helps your child in all walks of life. It highly helps in making rational decisions.
              </p>
              <motion.button
                className="px-8 py-3 rounded-full text-white font-semibold shadow-lg"
                style={{ background: colors.primary }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Enroll Now
              </motion.button>
            </motion.div>
            <motion.div 
              className="md:w-1/2"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <img 
                src={picture} 
                alt="Students learning" 
                className="rounded-lg shadow-2xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Math-O-Logic Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-12 text-center"
            style={{ color: colors.secondary }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Math-O-Logic: Mental Math & Logical Reasoning
          </motion.h2>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ staggerChildren: 0.1 }}
          >
            {[
              { icon: Clock, text: 'Sundays 9:30 AM' },
              { icon: Users, text: 'Age 6-10' },
              { icon: Calendar, text: 'Monthly Classes' },
              { icon: DollarSign, text: 'Rs. 1000/month' },
            ].map((item, index) => (
              <motion.div 
                key={index}
                className="flex items-center justify-center p-4 bg-white rounded-lg shadow-md"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <item.icon size={24} className="mr-3" style={{ color: colors.primary }} />
                <span className="text-lg font-semibold">{item.text}</span>
              </motion.div>
            ))}
          </motion.div>

          <motion.p 
            className="text-lg mb-12 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Objective is to sharpen the ability of your children to solve problems rationally and analytically, develop their skills in logical reasoning, mental math and enhance their thinking ability through solving Puzzles, word Problems, Brain Teasers and Sudoku and lot more. Objective is also to make them think out of the box, which is the manta of the future in all walks of life.
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {topics.map((topic, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 rounded-lg shadow-lg cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.03 }}
                onHoverStart={() => setHoveredCard(index)}
                onHoverEnd={() => setHoveredCard(null)}
              >
                <h3 className="text-xl font-semibold mb-3" style={{ color: colors.secondary }}>
                  {topic.title}
                </h3>
                <AnimatePresence>
                  {hoveredCard === index && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="text-gray-600"
                    >
                      {topic.description}
                    </motion.p>
                  )}
                </AnimatePresence>
                <motion.div
                  className="mt-4 flex items-center text-sm font-semibold"
                  style={{ color: colors.primary }}
                  animate={{ x: hoveredCard === index ? 5 : 0 }}
                >
                  Learn More <ChevronRight size={16} className="ml-1" />
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default MathOLogicPage