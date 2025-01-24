'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Star, Quote, Users, GraduationCap, Book } from 'lucide-react'

const allStudentTestimonials = [
  {
    name: "Aisha Patel",
    grade: "12th Grade",
    text: "URJA Talents transformed my approach to learning. The personalized attention helped me excel in my exams!",
    rating: 5,
    image: "/placeholder.svg?height=100&width=100"
  },
  {
    name: "Michael Chen",
    grade: "10th Grade",
    text: "The tutors at URJA made complex subjects easy to understand. My grades improved significantly!",
    rating: 5,
    image: "/placeholder.svg?height=100&width=100"
  },
  {
    name: "Sophia Rodriguez",
    grade: "11th Grade",
    text: "I love how URJA tailors the learning experience. It's not just about grades, but understanding concepts deeply.",
    rating: 4,
    image: "/placeholder.svg?height=100&width=100"
  },
  {
    name: "Alex Johnson",
    grade: "9th Grade",
    text: "URJA's interactive learning methods made studying fun and engaging. I've seen a big improvement in my grades!",
    rating: 5,
    image: "/placeholder.svg?height=100&width=100"
  },
  {
    name: "Priya Sharma",
    grade: "12th Grade",
    text: "The personalized study plans at URJA helped me balance my academics and extracurriculars effectively.",
    rating: 4,
    image: "/placeholder.svg?height=100&width=100"
  },
  {
    name: "Tom Wilson",
    grade: "11th Grade",
    text: "URJA's tutors are exceptional. They not only teach the subject but also inspire a love for learning.",
    rating: 5,
    image: "/placeholder.svg?height=100&width=100"
  },
  {
    name: "Jane Doe",
    grade: "10th Grade",
    text: "I struggled with math until I joined URJA.  Their tutoring made all the difference!",
    rating: 4,
    image: "/placeholder.svg?height=100&width=100"
  },
  {
    name: "John Smith",
    grade: "12th Grade",
    text: "URJA helped me prepare for my college applications, and I got into my dream school!",
    rating: 5,
    image: "/placeholder.svg?height=100&width=100"
  },
  {
    name: "Alice Brown",
    grade: "9th Grade",
    text: "I love the supportive community at URJA. It's made learning so much easier.",
    rating: 5,
    image: "/placeholder.svg?height=100&width=100"
  }
]

const allTeacherTestimonials = [
  {
    name: "Dr. Rajesh Kumar",
    subject: "Physics",
    text: "Teaching at URJA Talents has been incredibly rewarding. The platform allows me to truly connect with students and make a difference.",
    years: 10,
    image: "/placeholder.svg?height=100&width=100"
  },
  {
    name: "Emma Thompson",
    subject: "Literature",
    text: "URJA's approach to education is refreshing. It allows me to be creative in my teaching methods and really engage the students.",
    years: 8,
    image: "/placeholder.svg?height=100&width=100"
  },
  {
    name: "Dr. Yuki Tanaka",
    subject: "Mathematics",
    text: "The resources and support provided by URJA are unparalleled. It's a joy to see students' eyes light up when they grasp a difficult concept.",
    years: 15,
    image: "/placeholder.svg?height=100&width=100"
  },
  {
    name: "Sarah Johnson",
    subject: "Biology",
    text: "URJA's innovative teaching tools allow me to bring complex biological concepts to life for my students.",
    years: 12,
    image: "/placeholder.svg?height=100&width=100"
  },
  {
    name: "Dr. Ahmed Hassan",
    subject: "Chemistry",
    text: "The collaborative environment at URJA fosters a great sense of community among educators and students alike.",
    years: 20,
    image: "/placeholder.svg?height=100&width=100"
  },
  {
    name: "Maria Garcia",
    subject: "Spanish",
    text: "URJA's platform allows me to create immersive language learning experiences that truly engage students.",
    years: 9,
    image: "/placeholder.svg?height=100&width=100"
  },
  {
    name: "David Lee",
    subject: "History",
    text: "I appreciate the flexibility URJA offers. It allows me to focus on what matters most: my students.",
    years: 5,
    image: "/placeholder.svg?height=100&width=100"
  },
  {
    name: "Linda Williams",
    subject: "English",
    text: "URJA provides excellent resources and support for teachers. It's a fantastic platform.",
    years: 10,
    image: "/placeholder.svg?height=100&width=100"
  },
  {
    name: "Robert Brown",
    subject: "Computer Science",
    text: "Teaching at URJA is a rewarding experience. I see my students grow and succeed every day.",
    years: 7,
    image: "/placeholder.svg?height=100&width=100"
  }
]

export default function TestimonialsPage() {
  const [studentTestimonials, setStudentTestimonials] = useState(allStudentTestimonials.slice(0, 3))
  const [teacherTestimonials, setTeacherTestimonials] = useState(allTeacherTestimonials.slice(0, 3))

  const loadMoreStudents = () => {
    setStudentTestimonials(allStudentTestimonials.slice(0, studentTestimonials.length + 3))
  }

  const loadMoreTeachers = () => {
    setTeacherTestimonials(allTeacherTestimonials.slice(0, teacherTestimonials.length + 3))
  }

  return (
    <div className="min-h-screen bg-white text-black">
      <HeroSection />
      <TestimonialSection 
        title="Student Experiences" 
        testimonials={studentTestimonials} 
        type="student" 
        onLoadMore={loadMoreStudents}
        hasMore={studentTestimonials.length < allStudentTestimonials.length}
      />
      <TestimonialSection 
        title="Teacher Experiences" 
        testimonials={teacherTestimonials} 
        type="teacher" 
        onLoadMore={loadMoreTeachers}
        hasMore={teacherTestimonials.length < allTeacherTestimonials.length}
      />
      <CTASection />
    </div>
  )
}

function HeroSection() {
  return (
    <motion.section 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="relative h-screen flex items-center justify-center overflow-hidden bg-white"
    >
      <div className="absolute inset-0 z-0">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse"
          }}
          className="w-full h-full bg-gradient-to-br from-[#FF6B00] via-white to-[#FF6B00] opacity-20"
        />
      </div>
      <div className="relative z-10 text-center px-4">
        <motion.h1
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-5xl md:text-7xl font-bold mb-6 text-black"
        >
          Voices of <span className="text-[#FF6B00]">Success</span>
        </motion.h1>
        <motion.p
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="text-xl md:text-2xl mb-8 text-gray-700"
        >
          Hear from our students and teachers about their URJA experience
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="flex justify-center space-x-4 mb-12"
        >
          <AnimatedButton href="#student-testimonials" text="Student Stories" Icon={GraduationCap} />
          <AnimatedButton href="#teacher-testimonials" text="Teacher Insights" Icon={Book} />
        </motion.div>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="inline-block bg-white p-4 rounded-full shadow-lg"
        >
          <Users className="w-16 h-16 text-[#FF6B00]" />
        </motion.div>
      </div>
      <motion.div
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          repeatType: "reverse"
        }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
      >
        <ChevronDown className="w-8 h-8 text-[#FF6B00]" />
      </motion.div>
    </motion.section>
  )
}

function AnimatedButton({ href, text, Icon }) {
  return (
    <motion.a
      href={href}
      className="inline-flex items-center bg-[#FF6B00] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#FF8533] transition-colors duration-300"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Icon className="w-5 h-5 mr-2" />
      {text}
    </motion.a>
  )
}

function TestimonialSection({ title, testimonials, type, onLoadMore, hasMore }) {
  return (
    <section id={`${type}-testimonials`} className="py-20 px-4">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl font-bold text-center mb-12 text-black"
      >
        {title}
      </motion.h2>
      <div className="max-w-6xl mx-auto grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((testimonial, index) => (
          <TestimonialCard key={index} testimonial={testimonial} type={type} index={index} />
        ))}
      </div>
      {hasMore && (
        <div className="text-center mt-12">
          <motion.button
            onClick={onLoadMore}
            className="bg-[#FF6B00] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#FF8533] transition-colors duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Load More
          </motion.button>
        </div>
      )}
    </section>
  )
}

function TestimonialCard({ testimonial, type, index }) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-[#FF6B00]/20 transition-shadow duration-300 border border-gray-200"
    >
      <motion.div
        whileHover={{ scale: 1.03 }}
        transition={{ duration: 0.3 }}
        className="p-6"
      >
        <div className="flex items-center mb-4">
          <img src={testimonial.image || "/placeholder.svg"} alt={testimonial.name} className="w-12 h-12 rounded-full mr-4" />
          <div>
            <h3 className="font-semibold text-black">{testimonial.name}</h3>
            <p className="text-sm text-gray-600">
              {type === 'student' ? testimonial.grade : `${testimonial.subject} Teacher`}
            </p>
          </div>
        </div>
        <Quote className="w-8 h-8 text-[#FF6B00] mb-2" />
        <p className="text-gray-700 mb-4">
          {isExpanded ? testimonial.text : `${testimonial.text.slice(0, 100)}...`}
        </p>
        <motion.button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-[#FF6B00] hover:text-[#FF8533] transition-colors duration-200 flex items-center"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isExpanded ? "Read less" : "Read more"}
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChevronDown className="ml-1" />
          </motion.div>
        </motion.button>
        {type === 'student' && (
          <div className="mt-4 flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-5 h-5 ${i < testimonial.rating ? 'text-[#FF6B00]' : 'text-gray-300'}`}
                fill={i < testimonial.rating ? '#FF6B00' : 'none'}
              />
            ))}
          </div>
        )}
        {type === 'teacher' && (
          <p className="mt-4 text-sm text-gray-600">{testimonial.years} years of teaching experience</p>
        )}
      </motion.div>
    </motion.div>
  )
}

function CTASection() {
  return (
    <section className="py-20 px-4 bg-gradient-to-r from-white via-gray-100 to-white">
      <div className="max-w-4xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl font-bold mb-6 text-black"
        >
          Ready to Start Your <span className="text-[#FF6B00]">URJA</span> Journey?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl mb-8 text-gray-700"
        >
          Join the community of successful learners and passionate educators today!
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex justify-center space-x-4"
        >
          <motion.a
            href="#"
            className="bg-[#FF6B00] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#FF8533] transition-colors duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Enroll Now
          </motion.a>
          <motion.a
            href="#"
            className="border border-[#FF6B00] text-[#FF6B00] px-8 py-3 rounded-full font-semibold hover:bg-[#FF6B00] hover:text-white transition-colors duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Learn More
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}

