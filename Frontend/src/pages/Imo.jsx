import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, Brain, TrendingUp, Award, Users, ChevronDown } from 'lucide-react'
import pic from "../../Temp/rb_2667.png"
const IMOPage = () => {
  const [activeLevel, setActiveLevel] = useState(null)

  const colors = {
    primary: '#FF6B35',
    secondary: '#2B2D42',
    background: '#FFFFFF',
  }

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  }

  const levelData = {
    level1: {
      title: "Level 1",
      details: [
        "Held at participants' respective schools",
        "35 MCQs for classes 1-4, 50 MCQs for classes 5-12",
        "60 minutes duration",
        "Four sections: Logical Reasoning, Mathematical Reasoning, Everyday Mathematics, Achievers Section",
        "Distinct question papers for each exam date",
        "Conducted in English",
        "Follows CBSE, ICSE/ISC syllabi, and State Boards",
        "Administered during school hours"
      ]
    },
    level2: {
      title: "Level 2",
      details: [
        "For students from Class 3 to Class 12",
        "Qualifiers include top 5% internationally, top 25 rank holders from each zone/state, and class toppers",
        "Designed to further challenge top-performing students",
        "Focus on higher-order thinking skills and complex problem-solving",
        "Typically held at designated centers"
      ]
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
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
            alt="Mathematics background" 
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
              <motion.span
                {...fadeIn}
                style={{ color: colors.primary }}
                className="inline-block text-lg font-semibold mb-4"
              >
                Challenging Minds, Inspiring Excellence
              </motion.span>
              <motion.h1
                {...fadeIn}
                style={{ color: colors.secondary }}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6"
              >
                International Mathematics
                <span 
                  style={{ color: colors.primary }}
                  className="block"
                >
                  Olympiad (IMO)
                </span>
              </motion.h1>
              <motion.p
                {...fadeIn}
                className="text-lg text-gray-600 mb-8"
              >
                Discover the world's premier mathematics competition for high school students. 
                Challenge yourself, showcase your skills, and compete on a global stage.
              </motion.p>
              <motion.div
                {...fadeIn}
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 rounded-full text-white font-semibold shadow-lg"
                  style={{ backgroundColor: colors.primary }}
                >
                  Learn More <ChevronRight className="inline-block ml-2" />
                </motion.button>
              </motion.div>
            </motion.div>
            <motion.div 
              className="md:w-1/2"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
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
                  src={pic}
                  alt="IMO illustration" 
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
      </section>

      {/* Main Content */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="prose prose-lg max-w-none"
          >
            <h2 className="text-3xl font-bold mb-6" style={{ color: colors.secondary }}>
              The Comprehensive Guide to National and International Olympiad Exams
            </h2>
            <p>
              The Olympiads, held both nationally and internationally, are competitive exams that challenge students from similar academic backgrounds. Known as some of the toughest exams, Olympiads help students develop a competitive mindset and measure their knowledge and skills against their peers.
            </p>
            <p>
              Participating in Olympiad exams not only improves academic performance but also allows students to assess their knowledge and exam readiness compared to others nationwide. The benefits of taking these exams include enhanced problem-solving skills, better understanding of concepts, and increased confidence in tackling challenging questions. Additionally, students gain exposure to national and international competition standards.
            </p>
            <p>
              Our goal is to inspire each participant to achieve excellence in their academic fields. This article will provide an in-depth look at the Olympiad exams.
            </p>

            <h3 className="text-2xl font-bold mt-8 mb-4" style={{ color: colors.secondary }}>
              International Mathematics Olympiad (IMO)
            </h3>
            <p>
              The International Mathematics Olympiad (IMO), organized by the Science Olympiad Foundation, is a premier mathematics competition. The IMO evaluates students' mathematical skills and potential, allowing participants to gauge their understanding and problem-solving abilities at school, local, zonal, and international levels. This prestigious competition provides an excellent platform for self-assessment and offers numerous rewards and scholarships to high achievers.
            </p>
            <p>
              Participating in the IMO and other Olympiads offers several advantages, such as improving analytical thinking, boosting performance in school exams, and providing opportunities for scholarships and recognition at various levels. These benefits make the Olympiad exams an invaluable experience for students aiming for academic excellence.
            </p>

            <h3 className="text-2xl font-bold mt-8 mb-4" style={{ color: colors.secondary }}>
              IMO 2022 Exam Pattern
            </h3>
            <p>
              The SOF International Mathematics Olympiad is structured in two levels:
            </p>

            {/* Interactive Level 1 and Level 2 sections */}
            {Object.entries(levelData).map(([level, data]) => (
              <motion.div
                key={level}
                className="mb-6"
                initial={false}
                animate={{ backgroundColor: activeLevel === level ? '#f0f0f0' : 'transparent' }}
                transition={{ duration: 0.3 }}
              >
                <motion.button
                  className="w-full text-left p-4 rounded-lg shadow-md flex justify-between items-center"
                  onClick={() => setActiveLevel(activeLevel === level ? null : level)}
                  style={{ backgroundColor: colors.primary, color: colors.background }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <h4 className="text-xl font-bold">{data.title}</h4>
                  <motion.div
                    animate={{ rotate: activeLevel === level ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown />
                  </motion.div>
                </motion.button>
                <AnimatePresence>
                  {activeLevel === level && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ul className="list-disc pl-6 mt-4 space-y-2">
                        {data.details.map((detail, index) => (
                          <motion.li
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                          >
                            {detail}
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}

            <h3 className="text-2xl font-bold mt-8 mb-4" style={{ color: colors.secondary }}>
              Benefits of the IMO:
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              {[
                { icon: Brain, title: "Skill Enhancement", description: "The IMO helps students develop critical thinking and problem-solving skills." },
                { icon: TrendingUp, title: "Academic Improvement", description: "Regular practice and preparation for the Olympiad enhance overall academic performance." },
                { icon: Award, title: "Recognition and Scholarships", description: "High achievers in the IMO receive certificates, medals, and scholarships, providing recognition at national and international levels." },
                { icon: Users, title: "Competitive Edge", description: "Participation in the IMO offers students an edge in future academic and competitive endeavors." }
              ].map((benefit, index) => (
                <motion.div 
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-md"
                  whileHover={{ scale: 1.05, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <benefit.icon className="w-12 h-12 mb-4" style={{ color: colors.primary }} />
                  </motion.div>
                  <h4 className="text-xl font-semibold mb-2" style={{ color: colors.secondary }}>{benefit.title}</h4>
                  <p>{benefit.description}</p>
                </motion.div>
              ))}
            </div>
            <motion.p 
              className="mt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              By taking part in the IMO, students not only sharpen their mathematical abilities but also build confidence and gain valuable experience in handling competitive exams.
            </motion.p>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default IMOPage