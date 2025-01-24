'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Search, Book, GraduationCap, Users, Clock, DollarSign, HelpCircle } from 'lucide-react'

const faqCategories = [
  { name: 'Process', icon: Users },
  { name: 'Classes', icon: Book },
  { name: 'Payments', icon: DollarSign },
  { name: 'Policies', icon: Clock },
]

const faqItems = [
  {
    question: "How does the process go?",
    answer: "Once you request a tutor with the asked details, we do a best-match analysis to find you the right tutor. We then inform you of the tutor's profile and rates and request a trial class slot. We attend the trial along with our tutor and prefer you are present with your ward. Post-trial, we expect you to revert with your consent. After your consent, we finalize the time slots as per your and tutor's convenience. Once you make the payment, we create a WhatsApp group with the Tutor, student, and parents where we manage all communications, queries, and concerns regarding the classes, so you will always be in the loop.",
    category: "Process"
  },
  {
    question: "How does the trial class work? Can I take multiple?",
    answer: "At Urja, we do not charge for the first trial class. It's absolutely free. It's a great tool to gauge the possible bonding between the student and the tutor. This also helps us know the parents better and can be effectively used to clarify any doubts. We conduct it for 30-40 minutes. It's rare that our best match doesn't fit, but we can't compromise on the quality/bond you are seeking. We allow multiple trials, but those will be paid towards the efforts of our tutors.",
    category: "Classes"
  },
  {
    question: "What's the payment process?",
    answer: "We have kept things simple here. We don't charge for the whole year or even a semester; we charge quarterly. So post your consent on recruiting our tutor, we request you to pay the fees for a quarter (3 months) to our Bank account. We keep a correct count of classes and by the end of every month, calculate the balance. So while doing the next quarter payment, you may pay less or more depending on the classes cancelled. Of course, we have set rules on cancelling a class.",
    category: "Payments"
  },
  {
    question: "Are you running any offers?",
    answer: "As we enter our 3rd year, we are running some cool offers:\n\n1. Refer-a-friend: We offer 20% off on a month's fees if your referral converts into an Urja Parent (Joining Urja tuitions). [Applicable to Urja parents]\n\n2. Help us grow: If you refer anyone and they join the Urja tuitions, we offer you vouchers worth Rs 1000/- or Cash. This can't be clubbed with the above offer. [Open for all]",
    category: "Payments"
  },
  {
    question: "What if my tutor has to go on a sudden leave?",
    answer: "If our teacher has to go on sudden leave, we provide you with another teacher within 100 hours. The class timings during this period may have to be shuffled a bit, but we ensure the student's studies won't suffer. We do not charge for the days our tutor couldn't take the classes. The absence will be covered either by taking extra classes or by subtraction of these days' fees from the next quarter payment.",
    category: "Policies"
  },
  {
    question: "What if I need to cancel a class?",
    answer: "We allow cancellation of a class if we are informed 24 hours in advance. The student/parent must post this in the common WhatsApp group. We allow max 2 such cancellations in a month. We do not charge for these cancellations provided they are done as per the given rules. For planned family vacations, festivals, and summer vacations, we do not charge provided we are informed a week in advance. Any last-minute cancellations will be treated as leave of absence from the student and will be charged.",
    category: "Policies"
  },
  {
    question: "How do I change my Tutor?",
    answer: "This is an extremely rare case with us, but we allow you to request a change of teacher at the end of any month. We will have a new teacher ready for you within 10 days. Financials won't change, but the time slots may, as per the new teacher.",
    category: "Policies"
  },
  {
    question: "My Question isn't in this FAQ.",
    answer: "For any more questions or queries, please feel free to contact us using the form link given. You may also call us directly to address your concerns.",
    category: "Process"
  }
]

export default function FAQPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')

  const filteredFAQs = faqItems.filter(item => 
    (activeCategory === 'All' || item.category === activeCategory) &&
    (item.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
     item.answer.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  return (
    <div className="min-h-screen bg-white text-black">
      <HeroSection />
      <FAQSection 
        faqItems={filteredFAQs} 
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
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
      className="relative h-[50vh] flex items-center justify-center overflow-hidden bg-white"
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
          Frequently Asked <span className="text-[#FF6B00]">Questions</span>
        </motion.h1>
        <motion.p
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="text-xl md:text-2xl mb-8 text-gray-700"
        >
          Find answers to common questions about URJA Talents
        </motion.p>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="inline-block bg-white p-4 rounded-full shadow-lg"
        >
          <HelpCircle className="w-16 h-16 text-[#FF6B00]" />
        </motion.div>
      </div>
    </motion.section>
  )
}

function FAQSection({ faqItems, searchTerm, setSearchTerm, activeCategory, setActiveCategory }) {
  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <div className="relative">
            <input
              type="text"
              placeholder="Search FAQs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-4 pr-12 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent"
            />
            <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex justify-center space-x-4 mb-12"
        >
          <CategoryButton 
            category="All" 
            icon={Users} 
            activeCategory={activeCategory} 
            setActiveCategory={setActiveCategory} 
          />
          {faqCategories.map((category) => (
            <CategoryButton 
              key={category.name}
              category={category.name} 
              icon={category.icon}
              activeCategory={activeCategory} 
              setActiveCategory={setActiveCategory} 
            />
          ))}
        </motion.div>

        <AnimatePresence>
          {faqItems.map((item, index) => (
            <FAQItem key={index} item={item} index={index} />
          ))}
        </AnimatePresence>
      </div>
    </section>
  )
}

function CategoryButton({ category, icon: Icon, activeCategory, setActiveCategory }) {
  const isActive = category === activeCategory

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => setActiveCategory(category)}
      className={`px-4 py-2 rounded-full flex items-center ${
        isActive 
          ? 'bg-[#FF6B00] text-white' 
          : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100'
      }`}
    >
      <Icon className="w-5 h-5 mr-2" />
      {category}
    </motion.button>
  )
}

function FAQItem({ item, index }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="mb-4"
    >
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex justify-between items-center"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <span className="font-semibold">{item.question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className="w-5 h-5 text-[#FF6B00]" />
        </motion.div>
      </motion.button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-gray-50 p-4 rounded-b-lg mt-1"
          >
            <p>{item.answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
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
          Still have questions?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl mb-8 text-gray-700"
        >
          Our team is here to help. Reach out to us for personalized assistance.
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
            Contact Us
          </motion.a>
          <motion.a
            href="#"
            className="border border-[#FF6B00] text-[#FF6B00] px-8 py-3 rounded-full font-semibold hover:bg-[#FF6B00] hover:text-white transition-colors duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Schedule a Call
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}

