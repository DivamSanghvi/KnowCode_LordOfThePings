import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Clock, Calendar, Users, DollarSign, ChevronRight, Award } from 'lucide-react'
import image from "../../Temp/image.png"
import image2 from "../../Temp/15995.jpg"
const UrjaHobbyClassesPage = () => {
  const [activeSection, setActiveSection] = useState('techniques')

  const colors = {
    primary: '#FF6B35', // Orange
    secondary: '#2B2D42', // Dark Blue-Gray
    background: '#FFFFFF', // White
  }

  const batches = [
    { name: 'Junior (4-7)', time: 'Sat 10 AM', fee: '1000/m' },
    { name: 'Senior (8-13)', time: 'Sun 10 AM', fee: '1000/m' },
    { name: 'Advanced', time: 'Sun 11:15 AM', fee: '1600/m' },
  ]

  const techniques = [
    'Basic introduction with theory',
    'Free hand drawing',
    'Space divination with geometrical sketch',
    'Detailing and Shading',
    'Other Techniques',
    'Live Composition',
  ]

  const artTypes = [
    'Illustrating', 'Sketching', 'Calligraphy', 'Portrait', 'Graphic art',
    'Doodling', 'Mandala art', 'Zentangles', 'Origami crafts', 'Resin art',
    'Pulled string art', '3D art', 'Collage art', 'Paper weaving', 'Mosaic art',
    'Warli painting', 'Saura art', 'Bhil art', 'Madhubani art', 'Gond art',
    'Leaf art(leaf painting)', 'Abstract painting', 'Fluid art', 'Blowing art',
    'Scribble art', 'Shading and Hatching', 'Crumpled paper art', 'Bean art',
    'Marble painting', 'Bubble art', 'Dabbing', 'Canvas painting',
    'Balloon stamp painting', 'Yarn art', 'Block printing', 'Texture art',
    'Tie dye', 'Glow art', 'Puffy paint', 'Bottle painting', 'M-seal creativity',
    'Mondrian art', 'Pollock art', 'Glass painting', 'Kollam art',
    'Pattachitra painting', 'Quilling', 'Coffee painting', 'Macrame',
    'Stone painting', 'Diy Bookmarks', 'Felt paper art', 'Needle felting',
  ]

  const teacherInfo = {
    name: 'Prashant Sir',
    location: 'Mumbai, India',
    experience: '21+ years',
    education: [
      'Bachelor of Fine Arts - Sir J J School of Arts, Mumbai',
      'Diploma in Foundation Art - Model Art Institute, Mumbai',
      'Diploma in Multimedia - Profile Institute',
      'Diploma in Computer Art (3dsmax, Flash) - Arena Multimedia',
    ],
    experience: [
      'Art Faculty at NMIMS University & Sandip University',
      'Visiting faculty at Divatia School, Vidya Vikas College',
      'Prepares students for NIFT & NID',
      'Trains students appearing foreign universities & schools',
    ],
    artworkDisplayed: [
      'The Leela, Marol - Mumbai',
      'The Juhu Residency - Juhu, Mumbai',
      'J – 49 Club - Juhu, Mumbai',
      'Ajax Communications - Nariman Point, Mumbai',
      'Dholkia Group of companies - Fort, Mumbai',
      'Sir JJ School of Arts - Mumbai',
      'Some private collections',
    ],
  }

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
            alt="Art background" 
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
                Urja Hobby Classes (Drawing/Painting)
              </h1>
              <motion.p 
                className="text-xl mb-8 italic"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                "Mom/Dad, you know how much I love to draw, paint and make crafts..."
              </motion.p>
              <p className="text-lg mb-8">
                Well, we have the right next step for you. Get your child join our drawing & painting classes and give her/him a gift of Art. We have an amazing and well-known art expert PRASHANT working with us. Below is his profile for your awe & wow. Please connect with us to join.
              </p>
              <motion.button
                className="px-8 py-3 rounded-full text-white font-semibold shadow-lg"
                style={{ background: colors.primary }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Join Now
              </motion.button>
            </motion.div>
            <motion.div 
              className="md:w-1/2"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <img 
                src={image2}
                alt="Children painting" 
                className="rounded-lg shadow-2xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Batches Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-12 text-center"
            style={{ color: colors.secondary }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Our Batches
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {batches.map((batch, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 rounded-lg shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                transition={{ delay: index * 0.1 }}
              >
                <h3 className="text-xl font-semibold mb-4" style={{ color: colors.secondary }}>
                  {batch.name}
                </h3>
                <div className="flex items-center mb-2">
                  <Clock size={20} className="mr-2" style={{ color: colors.primary }} />
                  <span>{batch.time}</span>
                </div>
                <div className="flex items-center">
                  <DollarSign size={20} className="mr-2" style={{ color: colors.primary }} />
                  <span>{batch.fee}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Techniques and Art Types Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center mb-12">
            <motion.button
              className={`px-6 py-2 rounded-full mr-4 ${activeSection === 'techniques' ? 'bg-primary text-white' : 'bg-gray-200'}`}
              onClick={() => setActiveSection('techniques')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={activeSection === 'techniques' ? { background: colors.primary } : {}}
            >
              Techniques
            </motion.button>
            <motion.button
              className={`px-6 py-2 rounded-full ${activeSection === 'artTypes' ? 'bg-primary text-white' : 'bg-gray-200'}`}
              onClick={() => setActiveSection('artTypes')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={activeSection === 'artTypes' ? { background: colors.primary } : {}}
            >
              Art & Craft Types
            </motion.button>
          </div>

          <AnimatePresence mode="wait">
            {activeSection === 'techniques' && (
              <motion.div
                key="techniques"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {techniques.map((technique, index) => (
                  <motion.div
                    key={index}
                    className="bg-white p-6 rounded-lg shadow-md"
                    whileHover={{ scale: 1.05 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <h3 className="text-lg font-semibold mb-2" style={{ color: colors.secondary }}>
                      {technique}
                    </h3>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {activeSection === 'artTypes' && (
              <motion.div
                key="artTypes"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
              >
                {artTypes.map((artType, index) => (
                  <motion.div
                    key={index}
                    className="bg-white p-4 rounded-lg shadow-md text-center"
                    whileHover={{ scale: 1.05, backgroundColor: colors.primary, color: colors.background }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.02 }}
                  >
                    {artType}
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Teacher Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-12 text-center"
            style={{ color: colors.secondary }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Meet Our Expert Teacher
          </motion.h2>

          <div className="flex flex-col md:flex-row items-center md:items-start">
            <motion.div
              className="md:w-1/3 mb-8 md:mb-0 md:mr-8"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <img 
                src={image} 
                alt="Prashant Sir" 
                className="rounded-lg shadow-xl"
              />
            </motion.div>
            <motion.div
              className="md:w-2/3"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-semibold mb-4" style={{ color: colors.secondary }}>
                {teacherInfo.name}
              </h3>
              <p className="mb-4">
                <strong>Location:</strong> {teacherInfo.location}<br />
                <strong>Experience:</strong> {teacherInfo.experience} in the Indian and International animation/production industry
              </p>
              <motion.div
                initial="collapsed"
                whileInView="open"
                viewport={{ once: true }}
                variants={{
                  open: { opacity: 1, height: "auto" },
                  collapsed: { opacity: 0, height: 0 }
                }}
                transition={{ duration: 0.8 }}
              >
                <h4 className="font-semibold mb-2">Education:</h4>
                <ul className="list-disc list-inside mb-4">
                  {teacherInfo.education.map((edu, index) => (
                    <li key={index}>{edu}</li>
                  ))}
                </ul>
                <h4 className="font-semibold mb-2">Professional Experience:</h4>
                <ul className="list-disc list-inside mb-4">
                  {teacherInfo.experience.map((exp, index) => (
                    <li key={index}>{exp}</li>
                  ))}
                </ul>
                <h4 className="font-semibold mb-2">Artwork Displayed at:</h4>
                <ul className="list-disc list-inside">
                  {teacherInfo.artworkDisplayed.map((place, index) => (
                    <li key={index}>{place}</li>
                  ))}
                </ul>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default UrjaHobbyClassesPage
