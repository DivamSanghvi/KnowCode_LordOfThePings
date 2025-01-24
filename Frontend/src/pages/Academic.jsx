import React, { useState } from 'react'
import { BookOpen, Users, Home, Globe, Award, GraduationCap, ChevronDown, ChevronUp } from 'lucide-react'
import { Card, CardContent } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from "framer-motion";
import { Button } from '../components/ui/button'
export default function Academic() {
  const [expandedOffering, setExpandedOffering] = useState(null)
  const offerings = [
    {
      title: "JEE Mains & Advanced and NEET Prep",
      description: "We have some genius, experienced IITians who conduct these classes for us. Its liking coming directly from those who themselves have excelled in these Exams. These are mostly one-on-one classes as we believe this is too critical of an exam in life to be learnt in big groups.",
    },
    {
      title: "Homi Bhabha and Olympiads",
      description: "Every Competitive exam has a specific pattern and way of learning to excel. We also have some Top ranker of these exams as our Tutors. Click here to see our detailed Olympiad training page. We have similar relevant approach for Homi Bhabha exam.",
      link: "/olympiads",
    },
    {
      title: "X-XII Board Exam Prep",
      description: "We have veteran teachers from Delhi working with us on this. With a collective experience of teaching 300 Kids every year.",
    },
    {
      title: "SOS Sessions",
      description: "For any adhoc urgent needs like prep for a test, exam, GD, we help provide our amazing tutors to help you out.",
      badge: "Batch : On-Demand",
    },
    {
      title: "Marathi and Hindi Language Classes",
      description: "Learning a new language is challenging to most of the students and even to to parents. We have specialized teachers with decade plus experience in teaching these languages. These are our small-group classes as languages are best learnt in groups, unlike other subjects.",
      badge: "Group Batch on Weekends",
    },
  ]

  return (
    <>
      <div className="relative overflow-hidden">
        {/* <div className="container mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-6xl lg:text-6xl font-bold tracking-tight text-gray-900 sm:text-6xl mb-4">
                Our Academic Services
              </h1>
              <motion.p
                className="text-lg lg:text-2xl mb-2 font-semibold text-orange-600"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
              >
                A Get-it-all Academic Coaching Experience
              </motion.p>
              <motion.p
                className="text-lg lg:text-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
              >
                We conduct tuition classes for All Boards, All Subjects and for All
                Standards. We have expertise in grooming students for JEE Mains &
                Advanced, Olympiads and Homi Bhabha exams. Proudly the exam top
                rankers are working with us. We have dynamic & experienced IITian
                tutors as well as very well experienced ex & current school
                teachers for your customized need of tutoring. We have At-home as
                well as Online tuition options. Unlike most classes, we prefer
                one-on-one or small group tuition (on request basis).
              </motion.p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <img
                src="https://static.wixstatic.com/media/214ec6_66392d9d5a674e37c475dc759f7faff3.jpg/v1/crop/x_0,y_17,w_600,h_519/fill/w_585,h_380,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/214ec6_66392d9d5a674e37c475dc759f7faff3.jpg"
                alt="Interactive classroom session"
                className="rounded-lg object-cover w-full h-full"
              />
            </motion.div>
          </div>
        </div> */}
        <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <motion.div
            className="grid lg:grid-cols-2 gap-12 items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="space-y-8">
              <motion.h1
                className="text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 mb-4"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Our Academic Services
              </motion.h1>
              <motion.p
                className="text-xl lg:text-2xl mb-2 font-semibold text-orange-600"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                A Get-it-all Academic Coaching Experience
              </motion.p>
              <motion.p
                className="text-lg lg:text-xl text-gray-700"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                We conduct tuition classes for All Boards, All Subjects and for All
                Standards. We have expertise in grooming students for JEE Mains &
                Advanced, Olympiads and Homi Bhabha exams. Proudly the exam top
                rankers are working with us. We have dynamic & experienced IITian
                tutors as well as very well experienced ex & current school
                teachers for your customized need of tutoring. We have At-home as
                well as Online tuition options. Unlike most classes, we prefer
                one-on-one or small group tuition (on request basis).
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <Button size="lg" className="bg-orange-600 hover:bg-orange-700 text-white">
                  Get Started
                </Button>
              </motion.div>
            </div>
            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <img
                src="https://static.wixstatic.com/media/214ec6_66392d9d5a674e37c475dc759f7faff3.jpg/v1/crop/x_0,y_17,w_600,h_519/fill/w_585,h_380,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/214ec6_66392d9d5a674e37c475dc759f7faff3.jpg"
                alt="Interactive classroom session"
                className="rounded-lg object-cover w-full h-full shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-orange-600/20 to-transparent rounded-lg" />
            </motion.div>
          </motion.div>
        </div>

        <div className="container mx-auto px-4 py-4 sm:px-6 lg:px-8 mb-2">
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 text-xl md:text-lg text-md"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.2 },
              },
            }}
          >
            {[
              { icon: <GraduationCap className="h-6 w-6 text-orange-600" />, title: "JEE Preparation", desc: "Comprehensive coaching for JEE Mains & Advanced examinations with proven results", color: "bg-orange-100" },
              { icon: <Award className="h-6 w-6 text-purple-600" />, title: "Olympiads", desc: "Specialized training for various Olympiads and Homi Bhabha exams", color: "bg-purple-100" },
              { icon: <Users className="h-6 w-6 text-green-600" />, title: "Expert Tutors", desc: "Learn from IITian tutors and experienced school teachers", color: "bg-green-100" },
              { icon: <Home className="h-6 w-6 text-yellow-600" />, title: "At-home Tutoring", desc: "Personalized one-on-one tutoring in the comfort of your home", color: "bg-yellow-100" },
              { icon: <Globe className="h-6 w-6 text-red-600" />, title: "Online Classes", desc: "Flexible online tutoring options with the same quality education", color: "bg-red-100" },
              { icon: <BookOpen className="h-6 w-6 text-indigo-600" />, title: "Customized Learning", desc: "Small group tuition available on request for collaborative learning", color: "bg-indigo-100" },
            ].map((service, index) => (
              <motion.div
                key={index}
                className="transform transition-all hover:scale-105"
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0 }}
              >
                <Card>
                  <CardContent className="p-6 space-y-4">
                    <div className="flex justify-start gap-2 items-center">
                      <div className={`h-12 w-12 ${service.color} rounded-lg flex items-center justify-center`}>
                        {service.icon}
                      </div>
                      <h3 className="text-xl lg:text-2xl md:text-lg font-semibold">{service.title}</h3>
                    </div>
                    <p className="text-gray-600 text-md lg:text-lg">{service.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <h2 className="text-xl lg:text-2xl md:text-lg text-md font-bold text-gray-900 mb-4">
          Why opt for One-On-One or small group Tuitions?
        </h2>
        <div className="bg-orange-50/50 rounded-2xl p-8">
          <div className="space-y-6 text-md lg:text-xl">
            <div className="flex gap-4 items-start">
              <div className="h-6 w-6 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0 mt-1">
                <div className="h-2 w-2 rounded-full bg-orange-500" />
              </div>
              <p className="text-gray-700">
                <span className="text-orange-500 font-medium">Every child is different</span> with different strengths & weaknesses and needs own time to learn.
              </p>
            </div>

            <div className="flex gap-4 items-start">
              <div className="h-6 w-6 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0 mt-1">
                <div className="h-2 w-2 rounded-full bg-orange-500" />
              </div>
              <p className="text-gray-700">
                Each child has different <span className="text-orange-500 font-medium">grasps & likings for different subjects</span>.
              </p>
            </div>

            <div className="flex gap-4 items-start">
              <div className="h-6 w-6 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0 mt-1">
                <div className="h-2 w-2 rounded-full bg-orange-500" />
              </div>
              <p className="text-gray-700">
                Children face a lot of <span className="text-orange-500 font-medium">competition at School</span> daily from their peers. Making them compete again in group tuitions, we believe is not appropriate. Tuition classes should be used for learning and understanding and <span className="text-orange-500 font-medium">forming a sound base</span>.
              </p>
            </div>

            <div className="flex gap-4 items-start">
              <div className="h-6 w-6 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0 mt-1">
                <div className="h-2 w-2 rounded-full bg-orange-500" />
              </div>
              <p className="text-gray-700">
                In large group academic classes, the child normally <span className="text-orange-500 font-medium">do not raise doubts</span> due to peer pressure, thus staying week in that topic and becoming introvert.
              </p>
            </div>

            <div className="flex gap-4 items-start">
              <div className="h-6 w-6 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0 mt-1">
                <div className="h-2 w-2 rounded-full bg-orange-500" />
              </div>
              <p className="text-gray-700">
                In most large group classes, even a very capable teacher is not always able to give <span className="text-orange-500 font-medium">attention to each and every child</span> to cater to their specific needs.
              </p>
            </div>

            <div className="flex gap-4 items-start">
              <div className="h-6 w-6 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0 mt-1">
                <div className="h-2 w-2 rounded-full bg-orange-500" />
              </div>
              <p className="text-gray-700">
                We do believe some classes like GK, Creative Writing, Public Speaking, Drawing, etc are better in large groups, but not the Academic classes.
              </p>
            </div>
          </div>
        </div>
      </div>


      <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <motion.h2
          className="text-xl lg:text-2xl font-bold text-gray-900 mb-8 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          More Educational Offerings
        </motion.h2>
        <motion.div
          className="space-y-4"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.1 },
            },
          }}
        >
          {offerings.map((offering, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.5 }}
            >
              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  <button
                    className="w-full text-left p-6 focus:outline-none"
                    onClick={() => setExpandedOffering(expandedOffering === index ? null : index)}
                  >
                    <div className="flex justify-between items-center">
                      <h3 className="text-xl font-semibold text-orange-600">{offering.title}</h3>
                      {expandedOffering === index ? (
                        <ChevronUp className="h-5 w-5 text-orange-600" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-orange-600" />
                      )}
                    </div>
                  </button>
                  <AnimatePresence>
                    {expandedOffering === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="px-6 pb-6">
                          <p className="text-gray-700 mb-4">{offering.description}</p>
                          {offering.link && (
                            <Link href={offering.link} className="text-orange-600 hover:text-orange-700 underline">
                              Learn more
                            </Link>
                          )}
                          {offering.badge && (
                            <Badge variant="secondary" className="mt-2">
                              {offering.badge}
                            </Badge>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </>
  )
}