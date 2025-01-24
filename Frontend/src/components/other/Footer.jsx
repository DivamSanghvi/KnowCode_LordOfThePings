import { motion } from 'framer-motion'
import { Button } from '../ui/button'
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, ArrowRight, MessageCircle } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      {/* CTA Section */}


      <section className="bg-black text-white py-16">
  <div className="container mx-auto px-4 text-center">
    <h2 className="text-3xl font-bold mb-6">Ready to Enhance Your Farming Journey?</h2>
    <p className="mb-8 max-w-2xl mx-auto">
      Join our community of farmers and gain access to expert advice, crop management tools, and solutions that ensure a thriving farm.
    </p>
    <div className="flex flex-wrap justify-center gap-4">
      <Button size="lg" variant="secondary" className="group">
        <MessageCircle className="mr-2 h-5 w-5" />
        Get Free Consultation
        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
      </Button>
      <Button size="lg" variant="outline" className="bg-transparent border-white text-white group">
        View Farming Solutions
        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
      </Button>
    </div>
  </div>
</section>




      {/* <section className="relative isolate overflow-hidden px-6 py-24 sm:py-32 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Ready to start your journey?
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-300">
            Join URJA Talents today and experience the difference in your educational journey.
          </p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mt-10 flex items-center justify-center gap-x-6"
          >
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#"
              className="rounded-full bg-[#FF6B00] px-8 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-[#FF8533] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF6B00] transition-all duration-200"
            >
              Get Started
            </motion.a>
            <motion.a
              whileHover={{ x: 5 }}
              href="#"
              className="text-sm font-semibold leading-6 flex items-center gap-x-2"
            >
              Learn more
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                →
              </motion.span>
            </motion.a>
          </motion.div>
        </motion.div>
      </section> */}

      {/* Footer Content */}
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Company Info */}
          <div>
            <motion.img
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              src="/placeholder.svg?height=50&width=150"
              alt="URJA Talents Logo"
              className="h-12 w-auto"
            />
         <p className="mt-4 text-sm text-gray-400">
  Empowering farmers with personalized advice, expert tools, and comprehensive support for a more sustainable and prosperous farming future.
</p>
   <p className="mt-4 text-sm text-gray-400">
              Empowering students with personalized education and comprehensive support for a brighter future.
            </p>
            <div className="mt-6 flex space-x-4">
              <SocialIcon Icon={Facebook} href="#" />
              <SocialIcon Icon={Twitter} href="#" />
              <SocialIcon Icon={Instagram} href="#" />
              <SocialIcon Icon={Linkedin} href="#" />
            </div>
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-2 gap-8">
  <div>
    <h3 className="text-sm font-semibold text-white">Services</h3>
    <ul className="mt-4 space-y-2">
      <FooterLink href="#">Crop Price Prediction</FooterLink>
      <FooterLink href="#">Disease Management</FooterLink>
      <FooterLink href="#">Farming Solutions</FooterLink>
      <FooterLink href="#">Sustainable Practices</FooterLink>
    </ul>
  </div>
  <div>
    <h3 className="text-sm font-semibold text-white">Company</h3>
    <ul className="mt-4 space-y-2">
      <FooterLink href="#">About Us</FooterLink>
      <FooterLink href="#">Our Experts</FooterLink>
      <FooterLink href="#">Success Stories</FooterLink>
      <FooterLink href="#">Contact Us</FooterLink>
    </ul>
  </div>
</div>


          {/* Contact Info */}
          <div>
            <h3 className="text-sm font-semibold text-white">Contact Us</h3>
            <ul className="mt-4 space-y-4">
              <ContactItem Icon={Mail} text="info@.kurshiKarnticom" />
              <ContactItem Icon={Phone} text="+1 (555) 123-4567" />
              <ContactItem Icon={MapPin} text="12 Farming St, Gopal City, 12345" />
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-800 pt-8">
          <p className="text-sm text-gray-400 text-center">
            © {new Date().getFullYear()}Krushi kanti. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

function SocialIcon({ Icon, href }) {
  return (
    <motion.a
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      href={href}
      className="text-gray-400 hover:text-[#FF6B00] transition-colors"
    >
      <span className="sr-only">{Icon.name}</span>
      <Icon className="h-6 w-6" />
    </motion.a>
  )
}

function FooterLink({ href, children }) {
  return (
    <li>
      <motion.a
        whileHover={{ x: 5 }}
        href={href}
        className="text-sm text-gray-400 hover:text-white transition-colors"
      >
        {children}
      </motion.a>
    </li>
  )
}

function ContactItem({ Icon, text }) {
  return (
    <li className="flex items-start">
      <Icon className="h-6 w-6 text-[#FF6B00] flex-shrink-0" />
      <span className="ml-3 text-sm text-gray-400">{text}</span>
    </li>
  )
}

