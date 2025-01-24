import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, Linkedin, Twitter, Mail, X } from 'lucide-react'
import geetanjaliSingh from "../../Temp/GeetanjaliSingh.png"
const MeetOurTeamPage = () => {
  const [selectedMember, setSelectedMember] = useState(null)

  const colors = {
    primary: '#FF6B35', // Vibrant Orange
    secondary: '#2B2D42', // Dark Blue-Gray
    background: '#FFFFFF', // White
    text: '#2B2D42', // Dark Blue-Gray
    lightGray: '#F3F4F6',
  }

  const teamMembers = [
    {
      name: "geetanjali Singh",
      role: "Mathematics Professor",
      image: geetanjaliSingh,
      bio: "Dr. Sarah Johnson is a renowned mathematics professor with over 15 years of experience in teaching and research. She specializes in number theory and has published numerous papers in prestigious mathematical journals.",
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
      email: "sarah.johnson@example.com"
    },
    {
      name: "Michael Chen",
      role: "Olympiad Coach",
      image: "/placeholder.svg?height=300&width=300",
      bio: "Michael Chen is a former IMO gold medalist and now dedicates his time to coaching aspiring mathematicians. His students have consistently performed well in national and international competitions.",
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
      email: "michael.chen@example.com"
    },
    {
      name: "Emily Rodriguez",
      role: "Curriculum Developer",
      image: "/placeholder.svg?height=300&width=300",
      bio: "Emily Rodriguez brings her expertise in educational psychology to develop engaging and effective mathematics curricula. She focuses on creating materials that challenge students while fostering a love for mathematics.",
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
      email: "emily.rodriguez@example.com"
    },
    {
      name: "Dr. Alex Patel",
      role: "Research Coordinator",
      image: "/placeholder.svg?height=300&width=300",
      bio: "Dr. Alex Patel coordinates research initiatives and collaborations with universities worldwide. His work ensures that our programs stay at the cutting edge of mathematical education and research.",
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
      email: "alex.patel@example.com"
    }
  ]

  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden bg-gradient-to-r from-orange-50 to-orange-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6" style={{ color: colors.secondary }}>
              Meet Our <span style={{ color: colors.primary }}>Team</span>
            </h1>
            <p className="text-xl mb-8" style={{ color: colors.text }}>
              Dedicated professionals committed to nurturing mathematical talent and inspiring the next generation of problem solvers.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Team Members Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-md overflow-hidden"
                whileHover={{ y: -5, boxShadow: "0 4px 6px rgba(0,0,0,0.1)" }}
              >
                <img src={member.image} alt={member.name} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-1" style={{ color: colors.secondary }}>{member.name}</h3>
                  <p className="text-sm mb-3" style={{ color: colors.primary }}>{member.role}</p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 rounded-full text-white font-semibold text-sm"
                    style={{ backgroundColor: colors.primary }}
                    onClick={() => setSelectedMember(member)}
                  >
                    Learn More <ChevronRight className="inline-block ml-1 w-4 h-4" />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Member Modal */}
      <AnimatePresence>
        {selectedMember && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedMember(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-lg shadow-xl max-w-2xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative p-6">
                <button
                  className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                  onClick={() => setSelectedMember(null)}
                >
                  <X className="w-6 h-6" />
                </button>
                <div className="flex flex-col md:flex-row">
                  <img src={selectedMember.image} alt={selectedMember.name} className="w-32 h-32 rounded-full object-cover mb-4 md:mb-0 md:mr-6" />
                  <div>
                    <h3 className="text-2xl font-semibold mb-1" style={{ color: colors.secondary }}>{selectedMember.name}</h3>
                    <p className="text-lg mb-3" style={{ color: colors.primary }}>{selectedMember.role}</p>
                    <p className="text-gray-600 mb-4">{selectedMember.bio}</p>
                    <div className="flex space-x-4">
                      <a href={selectedMember.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-600">
                        <Linkedin className="w-6 h-6" />
                      </a>
                      <a href={selectedMember.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-400">
                        <Twitter className="w-6 h-6" />
                      </a>
                      <a href={`mailto:${selectedMember.email}`} className="text-gray-500 hover:text-red-500">
                        <Mail className="w-6 h-6" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default MeetOurTeamPage