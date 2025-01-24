import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Textarea } from "../components/ui/textarea"
import { Label } from "../components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { CheckCircle2, Send, ChevronRight } from 'lucide-react'
import pic from "../../Temp/rb_5471.png"
import emailjs from "emailjs-com"

const TeacherVacancyPage = () => {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const email = "divamsanghvi@gmail.com"
  const colors = {
    primary: '#FF6B35',
    secondary: '#2B2D42',
    background: '#FFFFFF',
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Here you would typically send the form data to your backend
    const form = e.target; // Get the form element
    const formData = {
    name: form.name.value,
    email: form.email.value,
    phone: form.phone.value,
    subject: form.subject.value,
    experience: form.experience.value,
    message: form.message.value,
  };

  emailjs
    .send(
      'service_zl012cd', // Replace with your EmailJS Service ID
      'template_9jev7un', // Replace with your EmailJS Template ID
      {
        ...formData,
      },
      'FEGZEKnnEgTn9cNQe' // Replace with your EmailJS Public User ID
    )
    .then(
      (result) => {
        console.log('Email successfully sent!', result.text);
        setIsSubmitted(true);
        setTimeout(() => setIsSubmitted(false), 5000); // Reset after 5 seconds
      },
      (error) => {
        console.error('Error sending email:', error.text);
        alert('Failed to send email. Please try again.');
      }
    );
    setIsSubmitted(true)

    setTimeout(() => setIsSubmitted(false), 5000) // Reset after 5 seconds
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
            alt="Teachers background" 
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
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                style={{ color: colors.primary }}
                className="inline-block text-lg font-semibold mb-4"
              >
                Join Our Teaching Team
              </motion.span>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                style={{ color: colors.secondary }}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6"
              >
                Shape the Future of Education
                <span 
                  style={{ color: colors.primary }}
                  className="block"
                >
                  With Your Expertise
                </span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="text-lg text-gray-600 mb-8"
              >
                We're looking for passionate educators to inspire the next generation. 
                If you have a love for teaching and want to make a difference, we want to hear from you!
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <Button
                  size="lg"
                  style={{ backgroundColor: colors.primary }}
                  onClick={() => {
                    const form = document.getElementById('application-form')
                    form?.scrollIntoView({ behavior: 'smooth' })
                  }}
                >
                  Apply Now <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
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
                  alt="Teacher illustration" 
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

      {/* Application Form Section */}
      <section id="application-form" className="py-16 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto"
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-center" style={{ color: colors.secondary }}>
                Teacher Application Form
              </CardTitle>
              <CardDescription className="text-center mt-2">
                Fill out the form below to apply for a teaching position
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-6"
                  >
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" type="text" required className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input id="email" type="email" required className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" type="tel" required className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="subject">Subject Expertise</Label>
                      <Input id="subject" type="text" required className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="experience">Years of Teaching Experience</Label>
                      <Input id="experience" type="number" required className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="message">Why do you want to join our team?</Label>
                      <Textarea id="message" required className="mt-1" />
                    </div>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button type="submit" className="w-full" style={{ backgroundColor: colors.primary }}>
                        <Send className="mr-2 h-4 w-4" /> Submit Application
                      </Button>
                    </motion.div>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="text-center py-12"
                  >
                    <motion.div
                      animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 360, 360],
                      }}
                      transition={{
                        duration: 1,
                        ease: "easeInOut",
                        times: [0, 0.5, 1],
                        repeat: Infinity,
                        repeatDelay: 1
                      }}
                    >
                      <CheckCircle2 className="mx-auto h-16 w-16 text-green-500" />
                    </motion.div>
                    <h3 className="mt-4 text-xl font-semibold" style={{ color: colors.secondary }}>
                      Application Submitted Successfully!
                    </h3>
                    <p className="mt-2 text-gray-600">
                      Thank you for your interest. Our team will contact you soon.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>
        </motion.div>
      </section>
      
      {/* Animated background elements */}
      <motion.div
        className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 1 }}
      >
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              backgroundColor: i % 2 === 0 ? colors.primary : colors.secondary,
              width: Math.random() * 100 + 50,
              height: Math.random() * 100 + 50,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, Math.random() * 100 - 50],
              x: [0, Math.random() * 100 - 50],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        ))}
      </motion.div>
    </div>
  )
}

export default TeacherVacancyPage