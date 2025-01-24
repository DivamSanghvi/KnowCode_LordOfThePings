import React, { useState } from 'react'
import { Card, CardContent, CardTitle, CardHeader } from "../components/ui/card"
import { Input } from "../components/ui/input"
import { motion } from 'framer-motion'
import { Badge } from "../components/ui/badge"
import emailjs from "emailjs-com"
import {
  Select,
  SelectGroup,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator
} from "../components/ui/select"
import { Textarea } from "../components/ui/textarea"
import { Facebook, Instagram, Linkedin, Youtube, MessageCircle, Phone, Code, Globe, Users, ArrowRight, Code2, BookOpen, Laptop, BrainCircuit, Languages, Rocket, Timer, CheckCircle, Send, Book, GraduationCap, MessageSquare, Award, Star, Trophy, Target } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Link } from 'react-router-dom'
export default function Project() {
  const [formStep, setFormStep] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    grade: '',
    subject: '',
    additionalInfo: '',
  });

  // Step handlers
  const nextStep = () => {
    setFormStep(formStep + 1);
  };
  const prevStep = () => {
    setFormStep(formStep - 1);
  };

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission using EmailJS
  const handleSubmit = (e) => {
    e.preventDefault();

    // Prepare the email parameters (these should match the template keys in EmailJS)
    const templateParams = {
      from_name: formData.name,
      from_phone: formData.phone,
      from_grade: formData.grade,
      from_subject: formData.subject,
      from_additional_info: formData.additionalInfo,
    };

    // Send email using EmailJS
    emailjs
      .send('service_zl012cd', 'template_f49j8sv', templateParams, 'FEGZEKnnEgTn9cNQe')
      .then(
        (response) => {
          console.log('Email sent successfully!', response);
          alert('Your form has been submitted successfully!');
          // Optionally reset form or navigate to another page
        },
        (error) => {
          console.error('Error sending email:', error);
          alert('There was an error submitting the form.');
        }
      );
  };
  const [hoveredIndex, setHoveredIndex] = useState(null)
  const mentors = [
    { name: "Pradeep", role: "IIT Mathematics Expert", src: "https://static.wixstatic.com/media/86e837_5f233d79d7f04011bb504d726241da9b~mv2.png/v1/fill/w_185,h_268,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/86e837_5f233d79d7f04011bb504d726241da9b~mv2.png" },
    { name: "Jishnu", role: "Physics Specialist", src: "https://static.wixstatic.com/media/86e837_dc0d52bdf60c4d3ab290084fbf25d8cb~mv2.jpg/v1/fill/w_185,h_260,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/86e837_dc0d52bdf60c4d3ab290084fbf25d8cb~mv2.jpg" },
    { name: "Sahil", role: "Science & Math Expert", src: "https://static.wixstatic.com/media/86e837_e29f13a14c91472eb18471c90291e899~mv2.jpg/v1/fill/w_192,h_268,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/86e837_e29f13a14c91472eb18471c90291e899~mv2.jpg" },
    { name: "Prashant", role: "Art & Design Mentor", src: "https://static.wixstatic.com/media/86e837_a36324287ab3488894b609cf350297c0~mv2.jpg/v1/fill/w_192,h_273,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/86e837_a36324287ab3488894b609cf350297c0~mv2.jpg" },
    { name: "Meena", role: "Finance & Mathematics", src: "https://static.wixstatic.com/media/86e837_a032618988944c93adaae88b6cdc012b~mv2.jpg/v1/fill/w_192,h_273,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/86e837_a032618988944c93adaae88b6cdc012b~mv2.jpg" },
    { name: "Nikhil", role: "Science Olympiad Coach", src: "https://static.wixstatic.com/media/86e837_781b17b2fce14df9b6c62ac73fed70f2~mv2.png/v1/fill/w_185,h_260,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/86e837_781b17b2fce14df9b6c62ac73fed70f2~mv2.png" },
    { name: "Dr. Rahul", role: "Advanced Sciences", src: "https://static.wixstatic.com/media/86e837_45d1fb0f89a444939d3b82b0f658f742~mv2.jpg/v1/fill/w_185,h_254,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/86e837_45d1fb0f89a444939d3b82b0f658f742~mv2.jpg" },
    { name: "Chandni", role: "Biology Specialist", src: "https://static.wixstatic.com/media/86e837_ca12b9eb36894e8fa7dbcda6b5100207~mv2.png/v1/fill/w_185,h_254,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/86e837_ca12b9eb36894e8fa7dbcda6b5100207~mv2.png" }
  ];
  const features = [
    { icon: Trophy, title: "Proven Excellence", description: "Top rankers from premier institutions" },
    { icon: Target, title: "Focused Approach", description: "Personalized learning paths" },
    { icon: BookOpen, title: "Expert Guidance", description: "Comprehensive subject coverage" },
  ]

  return (
    <>
      <section className="relative py-10 overflow-hidden">
        <div className="absolute" />
        <div className="container px-4 mx-auto">
          <div className='flex justify-center items-center mx-auto'>
            <div className="grid lg:grid-cols-2 gap-8">
              <Card className="group relative overflow-hidden border-0 bg-gradient-to-br from-orange-500 to-orange-600 text-white hover:shadow-2xl transition-all duration-500">
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500" />
                <CardHeader className="space-y-1 pb-4">
                  <div className="flex flex-col gap-2 items-center justify-between">
                    <CardTitle className="text-2xl lg:text-3xl font-bold">Online 1-1 Classes</CardTitle>
                    <Badge variant="outline" className="border-white text-white">
                      ALL BOARDS & GRADES
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center">
                        <BookOpen className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Free Ebooks & Notes</h3>
                        <p className="text-sm text-white/80">Comprehensive study materials</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center">
                        <Users className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold">1-1 Interactive Teaching</h3>
                        <p className="text-sm text-white/80">Personalized attention</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center">
                        <Timer className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Flexible Timings</h3>
                        <p className="text-sm text-white/80">Study at your convenience</p>
                      </div>
                    </div>
                  </div>
                  <div className="pt-4">
                    <Button size="lg" variant="secondary" className="w-full group">
                      Register Now
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="group relative overflow-hidden border-0 bg-gradient-to-br from-gray-900 to-gray-800 text-white hover:shadow-2xl transition-all duration-500">
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500" />
                <CardHeader className="space-y-1 pb-4">
                  <div className="flex flex-col gap-2 items-center justify-between">
                    <CardTitle className="text-2xl lg:text-3xl font-bold">Coding Classes</CardTitle>
                    <Badge variant="outline" className="border-orange-500 text-orange-500">
                      Starting at ₹300/hr
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-orange-500/10 flex items-center justify-center">
                        <Code2 className="h-5 w-5 text-orange-500" />
                      </div>
                      <span>Python</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-orange-500/10 flex items-center justify-center">
                        <Code2 className="h-5 w-5 text-orange-500" />
                      </div>
                      <span>JavaScript</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-orange-500/10 flex items-center justify-center">
                        <Code2 className="h-5 w-5 text-orange-500" />
                      </div>
                      <span>HTML/CSS</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-orange-500/10 flex items-center justify-center">
                        <Code2 className="h-5 w-5 text-orange-500" />
                      </div>
                      <span>Java</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-orange-500/10 flex items-center justify-center">
                        <Code2 className="h-5 w-5 text-orange-500" />
                      </div>
                      <span>C++</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-orange-500/10 flex items-center justify-center">
                        <Code2 className="h-5 w-5 text-orange-500" />
                      </div>
                      <span>Web development</span>
                    </div>
                  </div>
                  <div className="pt-4">
                    <Button size="lg" className="w-full bg-orange-500 hover:bg-orange-600 group">
                      Start Learning
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="py-6">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge className="bg-orange-100 text-orange-600 text-sm lg:text-md mb-4">6+ Years of Excellence</Badge>
            <h2 className="text-2xl lg:text-3xl font-bold mb-4">Comprehensive Course Offerings</h2>
            <p className="text-gray-600 text-ellipsis text-md lg:text-lg">
              Serving 1000+ happy students from 14 different countries including America, Australia, Canada, UK, India, Singapore, Hong Kong, and Maldives.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Academic Programs */}
            <Card className="group hover:shadow-xl transition-all duration-300">
              <CardHeader className="pb-4">
                <div className="w-12 h-12 rounded-lg bg-orange-100 flex items-center justify-center mb-4">
                  <GraduationCap className="w-6 h-6 text-orange-600" />
                </div>
                <CardTitle>Academic Programs</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <p className="font-medium">Standards</p>
                  <p className="text-sm text-gray-600">UKG-12 STD/A/AS LEVEL</p>
                </div>
                <div className="space-y-2">
                  <p className="font-medium">Boards</p>
                  <p className="text-sm text-gray-600">CBSE/ICSE/IGCSE/IB/CIE</p>
                </div>
              </CardContent>
            </Card>

            {/* Competitive Exams */}
            <Card className="group hover:shadow-xl transition-all duration-300">
              <CardHeader className="pb-4">
                <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center mb-4">
                  <Rocket className="w-6 h-6 text-purple-600" />
                </div>
                <CardTitle>Competitive Exams</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-purple-500" />
                    IIT/JEE
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-purple-500" />
                    NEET
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-purple-500" />
                    SAT/UCAT
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-purple-500" />
                    Olympiads
                  </li>
                </ul>

              </CardContent>
            </Card>

            {/* Skill Development */}
            <Card className="group hover:shadow-xl transition-all duration-300">
              <CardHeader className="pb-4">
                <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center mb-4">
                  <BrainCircuit className="w-6 h-6 text-green-600" />
                </div>
                <CardTitle>Skill Development</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Vedic Maths
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Abacus
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Mental Maths
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Personality Development
                  </li>
                </ul>

              </CardContent>
            </Card>

            {/* Language Programs */}
            <Card className="group hover:shadow-xl transition-all duration-300">
              <CardHeader className="pb-4">
                <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mb-4">
                  <Languages className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle>Language Programs</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-blue-500" />
                    Spoken English
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-blue-500" />
                    German, French, Spanish
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-blue-500" />
                    Creative Writing
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-blue-500" />
                    Public Speaking
                  </li>
                </ul>

              </CardContent>
            </Card>

            {/* Coding & Technology */}
            <Card className="group hover:shadow-xl transition-all duration-300">
              <CardHeader className="pb-4">
                <div className="w-12 h-12 rounded-lg bg-red-100 flex items-center justify-center mb-4">
                  <Laptop className="w-6 h-6 text-red-600" />
                </div>
                <CardTitle>Coding & Technology</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-red-500" />
                    Web Development
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-red-500" />
                    Python Programming
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-red-500" />
                    App Development
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-red-500" />
                    WordPress & SQL
                  </li>
                </ul>

              </CardContent>
            </Card>

            {/* Global Reach */}
            <Card className="group hover:shadow-xl transition-all duration-300">
              <CardHeader className="pb-4">
                <div className="w-12 h-12 rounded-lg bg-indigo-100 flex items-center justify-center mb-4">
                  <Globe className="w-6 h-6 text-indigo-600" />
                </div>
                <CardTitle>Global Reach</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-indigo-500" />
                    America
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-indigo-500" />
                    Australia
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-indigo-500" />
                    UK
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-indigo-500" />
                    Singapore
                  </li>
                </ul>

              </CardContent>
            </Card>
          </div>
        </div>
      </section>


      <section className="bg-gray-50 py-8 my-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="ghost" className="bg-orange-500 hover:bg-orange-600 text-white"
              onClick={() => window.open("https://www.facebook.com/share/nBnwzDQawUK7uEzh/", "_blank")}
            >
              <Facebook className="mr-2 h-5 w-5" />
              FACEBOOK GROUP- FREE BOOKS
            </Button>
            <Button variant="ghost" className="bg-orange-500 hover:bg-orange-600 text-white"
              onClick={() => window.open("https://wa.link/914o0a", "_blank")}
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              GET FREE GUIDANCE
            </Button>
            <Button
              variant="ghost"
              className="bg-orange-500 hover:bg-orange-600 text-white"
              onClick={() => (window.location.href = "tel:8010704870")}
            >
              <Phone className="mr-2 h-5 w-5" />
              CALL US
            </Button>

          </div>

          <div className="flex justify-center gap-4 mt-6">
            <a
              href="https://www.instagram.com/urjatalents/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-500 hover:text-orange-600"
            >
              <Instagram className="h-8 w-8" />
            </a>
            <a
              href="https://www.facebook.com/urjatalents/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-500 hover:text-orange-600"
            >
              <Facebook className="h-8 w-8" />
            </a>
            <a
              href="https://www.linkedin.com/company/96384836/admin/dashboard/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-500 hover:text-orange-600"
            >
              <Linkedin className="h-8 w-8" />
            </a>
            <a
              href="https://www.youtube.com/channel/UCJfut2u8xFIWnPbW5PUEqww"
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-500 hover:text-orange-600"
            >
              <Youtube className="h-8 w-8" />
            </a>
          </div>
        </div>
      </section>

      <section className="py-12 bg-gradient-to-br from-orange-50 to-orange-100">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Get Personalized Learning</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Take the first step towards academic excellence. Fill out the form below, and we'll craft a tailored learning plan just for you.
          </p>
        </div>
        <Card className="overflow-hidden shadow-2xl">
          <CardContent className="p-0">
            <div className="grid md:grid-cols-5 gap-6">
              <div className="md:col-span-2 bg-orange-500 text-white p-8 flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-semibold mb-4">Why Choose Us?</h3>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <GraduationCap className="w-6 h-6 mr-2 flex-shrink-0" />
                      <span>Expert tutors from top institutions</span>
                    </li>
                    <li className="flex items-start">
                      <Book className="w-6 h-6 mr-2 flex-shrink-0" />
                      <span>Personalized curriculum for each student</span>
                    </li>
                    <li className="flex items-start">
                      <MessageSquare className="w-6 h-6 mr-2 flex-shrink-0" />
                      <span>24/7 support for students and parents</span>
                    </li>
                  </ul>
                </div>
                <div className="mt-8">
                  <p className="text-sm opacity-75">
                    "Urja Talents transformed my academic journey. I've never felt more confident in my studies!" - Sarah K., Grade 10
                  </p>
                </div>
              </div>
              <div className="md:col-span-3 p-8">
                <form className="space-y-6" onSubmit={handleSubmit}>
                  {formStep === 0 && (
                    <>
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                        <Input id="name" name="name" placeholder="Enter your full name" className="w-full" onChange={handleInputChange} />
                      </div>
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                        <Input id="phone" name="phone" placeholder="Enter your phone number" type="tel" className="w-full" onChange={handleInputChange} />
                      </div>
                      <Button onClick={nextStep} className="w-full bg-orange-500 hover:bg-orange-600 text-white">
                        Next
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </>
                  )}

                  {formStep === 1 && (
                    <>
                      <div>
                        <label htmlFor="grade" className="block text-sm font-medium text-gray-700 mb-1">Current Grade</label>
                        <Select name="grade" onChange={handleInputChange}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select your grade" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="grade-1">Grade 1</SelectItem>
                            <SelectItem value="grade-2">Grade 2</SelectItem>
                            <SelectItem value="grade-3">Grade 3</SelectItem>
                            <SelectItem value="grade-4">Grade 4</SelectItem>
                            <SelectItem value="grade-5">Grade 5</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject of Interest</label>
                        <Select name="subject" onChange={handleInputChange}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select subject" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="math">Mathematics</SelectItem>
                            <SelectItem value="science">Science</SelectItem>
                            <SelectItem value="english">English</SelectItem>
                            <SelectItem value="history">History</SelectItem>
                            <SelectItem value="coding">Coding</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex gap-4">
                        <Button onClick={prevStep} variant="outline" className="w-full">
                          Back
                        </Button>
                        <Button onClick={nextStep} className="w-full bg-orange-500 hover:bg-orange-600 text-white">
                          Next
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </>
                  )}

                  {formStep === 2 && (
                    <>
                      <div>
                        <label htmlFor="additionalInfo" className="block text-sm font-medium text-gray-700 mb-1">Additional Information</label>
                        <Textarea id="additionalInfo" name="additionalInfo" placeholder="Tell us about your learning goals..." rows={4} className="w-full" onChange={handleInputChange} />
                      </div>
                      <div className="flex gap-4">
                        <Button onClick={prevStep} variant="outline" className="w-full">
                          Back
                        </Button>
                        <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white">
                          Submit
                          <Send className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </>
                  )}
                </form>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>



      <section className="bg-gray-50 py-8 my-4">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl lg:text-3xl font-bold text-center mb-8">FREE EBOOKS LINKS- CLASS WISE</h2>
          <p className="text-center max-w-3xl mx-auto mb-8">
            EDUCATION IS A RIGHT FOR EVERYONE AND WE AT URJA TALENTS ARE CONTRIBUTING OUR
            SHARE BY PROVIDING FREE EBOOKS TO ALL IN NEED.
          </p>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 max-w-4xl mx-auto">
            {[
              { class: 1, link: "https://chat.whatsapp.com/CgGUWjWiUICDgNIpCazE7b" },
              { class: 2, link: "https://chat.whatsapp.com/FTeUyrtshhoCSe2H8p4KHK" },
              { class: 3, link: "https://chat.whatsapp.com/KI9HgE0LlGDFNGtX8iYEnw" },
              { class: 4, link: "https://chat.whatsapp.com/HwHCWbYQVgPD0QHcxiKIvB" },
              { class: 5, link: "https://chat.whatsapp.com/DX5eWI8POMyIs9t1QzwXcu" },
              { class: 6, link: "https://chat.whatsapp.com/JuQdhuiNEZVFxzwpXSkQ7a" },
              { class: 7, link: "https://chat.whatsapp.com/ImtpEy2meNLFoyl1zJ9zjB" },
              { class: 8, link: "https://chat.whatsapp.com/FBtGMP3iGrAGNA5vXayBuc" },
              { class: 9, link: "https://chat.whatsapp.com/BC7IXzzVqgqEAgmDmt7z7V" },
              { class: 10, link: "https://chat.whatsapp.com/FM0B8UjrIK82NVj0v4ESxa" },
              { class: 11, link: "https://chat.whatsapp.com/Lls9GzjKVD98KUVpNzdQRv" },
              { class: 12, link: "https://chat.whatsapp.com/FCTyVYf8fINBzjz5vcjo4H" },
              { class: "IITIAN", link: "https://chat.whatsapp.com/HS8UqQSwI7xA3ewKB2iUJT" },
              { class: "GK", link: "https://chat.whatsapp.com/GMn5riGy0Xq6HhlhNEEfcP" },
            ].map((grade) => (
              <Button
                key={grade.class}
                variant="outline"
                className="bg-black hover:bg-gray-800 hover:text-orange-500 text-white"
                onClick={() => window.open(grade.link, "_blank")}
              >
                {typeof grade.class === "number" ? `CLASS ${grade.class}` : grade.class}
              </Button>
            ))}
          </div>

        </div>
      </section>

      <section className="py-10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center p-2 bg-orange-100 rounded-full mb-4">
              <GraduationCap className="w-6 h-6 lg:w-10 lg:h-10 text-orange-600" />
            </div>
            <h2 className="text-2xl lg:text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Meet Our Expert Mentors
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Learn from India's finest educators with proven track records in academic excellence
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {mentors.map((mentor, index) => (
              <Link to={mentor.src} target='_blank'>
                <div key={mentor.name} className="group">
                  <div className="aspect-[4/3] overflow-hidden rounded-xl relative">
                    <img
                      src={mentor.src}
                      alt={`Mentor ${mentor.name}`}
                      className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>

                  <div className="mt-4 text-center">
                    <h3 className="text-xl font-bold text-gray-900">
                      {mentor.name}
                    </h3>
                    <p className="text-gray-600 ">
                      {mentor.role}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>


          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="relative overflow-hidden rounded-xl bg-white shadow-md hover:shadow-lg transition-all duration-300 ease-in-out"
              >
                <div className="p-6 z-10 relative">
                  <div className="bg-orange-100 p-3 rounded-full mb-4 inline-block">
                    {<feature.icon className="w-8 h-8 text-orange-600" />}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
                <div
                  className="absolute inset-0 bg-gradient-to-r from-orange-100 to-orange-200 transform scale-x-0 transition-transform duration-300 ease-in-out origin-left"
                  style={{ transform: hoveredIndex === index ? 'scaleX(1)' : 'scaleX(0)' }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
