'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { GraduationCap, Users, Calendar, Clock, CheckCircle, ArrowRight } from 'lucide-react'
import { useState } from 'react'
import picture from "../../../Temp/portrait-cheerful-young-girl-holding-books.jpg"
export default function WhyUrja() {
  const [hoveredBenefit, setHoveredBenefit] = useState(null)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  }

  const heroImageVariants = {
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-black py-20 sm:py-32">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          <div className="absolute inset-0 bg-[#FF6B00] opacity-5 mix-blend-multiply" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        >
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-8">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="max-w-2xl"
            >
              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
                Why Choose{' '}
                <motion.span
                  initial={{ color: '#FFFFFF' }}
                  animate={{ color: '#FF6B00' }}
                  transition={{ duration: 0.5, delay: 1 }}
                >
                  KURSHI
                </motion.span>{' '}
                KARNTI
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-300">
              Farming is more than just a job—it's a science. With varying climates, soil conditions, and crop types, expert guidance has become essential for farmers to thrive. Our platform provides the knowledge and tools needed to make informed decisions and optimize crop production
              </p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="mt-10 flex items-center gap-x-6"
              >
                <motion.a
                  href="#benefits"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="rounded-full bg-[#FF6B00] px-8 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-[#FF8533] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF6B00] transition-all duration-200"
                >
                  Explore Benefits
                </motion.a>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative mt-4 lg:mt-0"
            >
              <motion.img
                variants={heroImageVariants}
                whileHover="hover"
                src={picture}
                alt="Education Illustration"
                className="relative z-10 rounded-xl bg-gray-900 shadow-xl"
              />
              <motion.div
                animate={{
                  scale: [1, 1.02, 1],
                  opacity: [0.2, 0.3, 0.2]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
                className="absolute -top-4 -right-4 h-full w-full rounded-xl bg-[#FF6B00]"
              />
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-14 sm:py-32">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mx-auto max-w-7xl px-6 lg:px-8"
        >
          <motion.div
            variants={itemVariants}
            className="mx-auto max-w-2xl text-center"
          >
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Our HIGH-lights
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
            Discover what makes our platform the perfect choice for enhancing your farming journey, from crop price predictions to expert disease management and sustainable farming solutions</p>
          </motion.div>

          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                variants={itemVariants}
                whileHover={{
                  scale: 1.03,
                  transition: { duration: 0.2 }
                }}
                onHoverStart={() => setHoveredBenefit(index)}
                onHoverEnd={() => setHoveredBenefit(null)}
                className="flex flex-col bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-200"
              >
                <div className="relative flex-1 px-6 pt-16 pb-8">
                  <motion.div
                    animate={{
                      rotate: hoveredBenefit === index ? 360 : 0
                    }}
                    transition={{ duration: 0.5 }}
                    className="absolute top-0 inline-block -translate-y-1/2 transform rounded-xl bg-[#FF6B00] p-5 shadow-lg"
                  >
                    <benefit.icon className="h-6 w-6 text-white" />
                  </motion.div>
                  <h3 className="text-xl font-semibold leading-7 text-gray-900">
                    {benefit.title}
                  </h3>
                  <p className="mt-6 text-base leading-7 text-gray-600">
                    {benefit.description}
                  </p>
                </div>
                <div className="mt-auto flex border-t border-gray-200">
                  <motion.a
                    href={benefit.href}
                    whileHover={{ x: 5 }}
                    className="flex items-center space-x-2 px-6 py-4 text-sm font-medium text-[#FF6B00] hover:text-[#FF8533] transition-colors duration-200"
                  >
                    <span>Learn more</span>
                    <ArrowRight className="h-4 w-4" />
                  </motion.a>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section className="bg-gray-50 py-24 sm:py-32">
  <motion.div
    variants={containerVariants}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    className="mx-auto max-w-7xl px-6 lg:px-8"
  >
    <motion.div
      variants={itemVariants}
      className="mx-auto max-w-2xl lg:text-center"
    >
      <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        Everything You Need for a Thriving Farm
      </h2>
      <p className="mt-6 text-lg leading-8 text-gray-600">
        At our platform, we provide all the tools, knowledge, and expert guidance to help you manage your crops, optimize yields, and navigate the challenges of modern farming.
      </p>
    </motion.div>

    <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
      <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
        {features.map((feature, index) => (
          <motion.div
            key={feature.name}
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            className="flex flex-col"
          >
            <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <feature.icon className="h-5 w-5 flex-none text-[#FF6B00]" />
              </motion.div>
              {feature.name}
            </dt>
            <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
              <p className="flex-auto">{feature.description}</p>
            </dd>
          </motion.div>
        ))}
      </dl>
    </div>
  </motion.div>
</section>


      
    </div>
  )
}

const benefits = [
  {
    title: 'Comprehensive Farming Support',
    description: 'We provide expert guidance on crop management, disease prediction, and farming solutions to ensure a thriving farm.',
    icon: GraduationCap,
    href: '#',
  },
  {
    title: 'Tailored Solutions for Your Farm',
    description: 'Each farm is unique. Our personalized solutions are crafted to meet the specific needs of your crops and farm management.',
    icon: Users,
    href: '#',
  },
  {
    title: 'Expert Advisory Services',
    description: 'Our team of experts offers advice on crop cycles, pricing strategies, and sustainable farming practices to boost productivity.',
    icon: CheckCircle,
    href: '#',
  },
]


const features = [
  {
    name: 'Regular Farm Advisory Meetings',
    description: 'We conduct regular advisory meets to discuss crop progress, disease management, and improvement suggestions tailored to your farm.',
    icon: Calendar,
  },
  {
    name: 'Pay-Per-Consultation System',
    description: 'We offer consultation services on a per-session basis, ensuring transparent and affordable pricing for every farming need.',
    icon: Clock,
  },
  {
    name: 'Comprehensive Farming Support',
    description: 'From crop price prediction to disease management and sustainable practices, we provide full-spectrum farming support under one roof.',
    icon: CheckCircle,
  },
]



