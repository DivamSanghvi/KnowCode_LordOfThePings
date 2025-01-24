import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { Button } from "../components/ui/button"
import { Calendar, Clock, Globe2, BookOpen, Building2, Phone, Users, ArrowRight, Landmark, HeartPulse, Binary, Mountain, Lightbulb, ExternalLink, Award, GraduationCap, Brain } from 'lucide-react'
import { Link } from 'react-router-dom'
import ReactPlayer from 'react-player';

export default function GK() {
  return (
    <div className="pt-0 pb-4">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <section className="relative overflow-hidden py-10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative z-10 max-w-4xl mx-auto text-center">
              <h1 className="text-2xl lg:text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl mb-2">
                Urja GK Classes
              </h1>
              <blockquote className="text-xl lg:text-2xl italic font-semibold text-gray-600 mb-4 relative py-4">
                <span className="absolute top-0 left-0  transform -translate-x-4 -translate-y-4 text-blue-200 text-6xl">"</span>
                Mom/Dad, I wanna know everything about everything. It would also give me a lot of confidence during conversations with my friends. Please help!
                <span className="absolute bottom-0 right-0 transform translate-x-4 translate-y-4 text-blue-200 text-6xl">"</span>
              </blockquote>
              <p className="text-lg lg:text-xl text-gray-600 leading-relaxed mb-4">
                Well, we can help you here. Get your child join our GK classes and give her/him a sound understanding of the things in and out of the world! General Knowledge is not so general these days. With Google being always there, kids know quite less on GK than we used to. Its very important for them to know things so they can be an active participant in any talks and walks of life, be it academic or even ice-breakers.
              </p>
            </div>
          </div>
        </section>


        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <Card className="w-full max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle className="text-lg lg:text-2xl text-orange-500">Current Batches</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-8 md:grid-cols-2">
              <div className="space-y-6">
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-md lg:text-xl font-semibold text-orange-500 flex items-center gap-2">
                      <Users className="h-6 w-6" />
                      Age 9-12
                    </h3>
                    <div className="space-y-3 pl-8">
                      <div className="flex items-center gap-3">
                        <Calendar className="h-5 w-5 text-gray-500" />
                        <p className="text-gray-700">Batch 1 - Saturdays 10:30AM</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Calendar className="h-5 w-5 text-gray-500" />
                        <p className="text-gray-700">Batch 2 - Sundays 10:30AM</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-md lg:text-xl font-semibold text-orange-500 flex items-center gap-2">
                      <Users className="h-6 w-6" />
                      Age 6-9
                    </h3>
                    <div className="space-y-3 pl-8">
                      <div className="flex items-center gap-3">
                        <Calendar className="h-5 w-5 text-gray-500" />
                        <p className="text-gray-700">Batch 1 - Saturdays 11:30AM</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Calendar className="h-5 w-5 text-gray-500" />
                        <p className="text-gray-700">Batch 2 - Sundays 11:30AM</p>
                      </div>
                    </div>
                  </div>
                </div>


                <div className="flex items-center gap-3">
                  <Clock className="h-6 w-6  text-orange-500" />
                  <div className="space-y-1">
                    <p className="text-md text-gray-600">Monthly Fees</p>
                    <p className="text-md lg:text-xl font-bold text-gray-900">Rs 1200/Month</p>
                  </div>
                </div>
              </div>

              {/* Call to Action */}
              <div className="space-y-6 md:border-l md:pl-8">
                <div className="space-y-4">
                  <h3 className="text-md lg:text-xl font-semibold text-gray-900">Start Your Journey</h3>
                  <p className="text-md lg:text-lg text-gray-600">Experience our teaching methodology with a FREE trial class</p>
                </div>

                <div className="space-y-4">
                  <Button size="lg" className="w-full group">
                    <Phone className="mr-2 h-5 w-5" />
                    Call Us
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-white px-2 text-muted-foreground">Or</span>
                    </div>
                  </div>
                  <Button variant="outline" size="lg" className="w-full group">
                    <Users className="mr-2 h-5 w-5" />
                    Join Inquiry Group
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>

                <div className="rounded-lg bg-orange-50 p-4">
                  <p className="text-md text-orange-600">
                    Join our inquiry group to get updates about new batches and special offers!
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className=" text-lg lg:text-2xl font-bold mb-4 text-orange-500">What do we cover?</h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="lg:text-xl flex items-start gap-2">
                  <Globe2 className="lg:h-7 lg:w-7 h-10 w-10 text-blue-500 mt-1" />
                  <div className="text-md">
                    <p className="font-medium">Universe</p>
                    <p className="text-gray-600">Space, Gravity, Stars, Planets</p>
                  </div>
                </div>
                <div className="lg:text-xl flex items-start gap-2">
                  <Building2 className="lg:h-7 lg:w-7 h-10 w-10 text-green-500 mt-1" />
                  <div className="text-md">
                    <p className="font-medium">World</p>
                    <p className=" text-gray-600">Countries, Capitals, Rivers</p>
                  </div>
                </div>
                <div className="lg:text-xl flex items-start gap-2">
                  <Landmark className="lg:h-7 lg:w-7 h-10 w-10 text-purple-500 mt-1" />
                  <div className="text-md">
                    <p className="font-medium">Current Affairs</p>
                    <p className="text-gray-600">Politics, Economy, World News</p>
                  </div>
                </div>
                <div className="lg:text-xl flex items-start gap-2">
                  <Binary className="lg:h-7 lg:w-7 h-10 w-10 text-red-500 mt-1" />
                  <div className="text-md">
                    <p className="font-medium">Science & Technology</p>
                    <p className=" text-gray-600">Inventions, Discoveries</p>
                  </div>
                </div>
                <div className="lg:text-xl flex items-start gap-2">
                  <Mountain className="lg:h-7 lg:w-7 h-10 w-10 text-indigo-500 mt-1" />
                  <div className="text-md">
                    <p className="font-medium">Geography</p>
                    <p className=" text-gray-600">Terrains, Climate, Natural phenomena</p>
                  </div>
                </div>
                <div className="lg:text-xl flex items-start gap-2">
                  <HeartPulse className="lg:h-7 lg:w-7 h-10 w-10 text-pink-500 mt-1" />
                  <div className="text-md">
                    <p className="font-medium">Health & Food</p>
                    <p className=" text-gray-600">Nutrition, Wellness</p>
                  </div>
                </div>
                <div className="lg:text-xl flex items-start gap-2">
                  <BookOpen className="h-7 lgw-7 h-10 w-10 text-yellow-500 mt-1" />
                  <div className="text-md">
                    <p className="font-medium">Entertainment</p>
                    <p className=" text-gray-600">Drama, Movies, Music, Awards</p>
                  </div>
                </div>
              </div>
              <p className="text-md lg:text-xl text-gray-500 italic mt-4">And lot more...</p>
            </CardContent>
          </Card>
        </div>


        {/* teacher Section */}
        <section className="py-6">
          <div className="mx-auto container">
            <h2 className="text-2xl lg:text-3xl font-bold text-center mb-4">Meet Our Expert Teachers</h2>
            <div className="grid-cols-1 grid lg:grid-cols-3 gap-8">

              {/* Nikhil's Card */}
              <Card className="group hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="relative overflow-hidden pb-0">
                  <div className="absolute top-4 right-4 bg-yellow-400 rounded-full p-2">
                    <Lightbulb className="w-6 h-6 text-white" />
                  </div>
                  <img
                    src="/placeholder.svg?height=300&width=400"
                    alt="Nikhil"
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0" />
                  <div className="absolute bottom-4 left-4">
                    <h3 className="text-2xl font-bold text-white">Nikhil</h3>
                    <Badge variant="secondary" className="mt-1 text-sm lg:text-md">IIT Bombay Graduate</Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <Award className="w-5 h-5 text-yellow-500 mt-1 flex-shrink-0" />
                      <span className="text-md lg:text-lg">Gold medalist in National Science Talent Search Exam</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <GraduationCap className="w-5 h-5 text-blue-500 mt-1 flex-shrink-0" />
                      <span className="text-md lg:text-lg">Expert in CET, JEE Coaching</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Brain className="w-5 h-5 text-purple-500 mt-1 flex-shrink-0" />
                      <span className="text-md lg:text-lg">Passionate about General Knowledge</span>
                    </li>
                  </ul>
                  <div className="mt-6 pt-6 border-t flex justify-center items-center ">
                    <Link
                      to="https://static.wixstatic.com/media/86e837_5ab95d0a3cdc4954b616909b93038ee8~mv2.jpg/v1/fill/w_308,h_438,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/86e837_5ab95d0a3cdc4954b616909b93038ee8~mv2.jpg"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button variant="ghost" size="sm" className="text-blue-600 text-lg">
                        <ExternalLink className="w-8 h-8" />
                        Profile
                      </Button>
                    </Link>

                  </div>
                </CardContent>
              </Card>

              {/* Meena's Card */}
              <Card className="group hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="relative overflow-hidden pb-0">
                  <div className="absolute top-4 right-4 bg-yellow-400 rounded-full p-2">
                    <Lightbulb className="w-6 h-6 text-white" />
                  </div>
                  <img
                    src="/placeholder.svg?height=300&width=400"
                    alt="Meena"
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0" />
                  <div className="absolute bottom-4 left-4">
                    <h3 className="text-2xl font-bold text-white">Meena</h3>
                    <Badge variant="secondary" className="mt-1 text-sm lg:text-md">BE & MBA Finance</Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <Award className="w-5 h-5 text-yellow-500 mt-1 flex-shrink-0" />
                      <span className="text-md lg:text-lg">Awarded Sayaji Gold Award by Kiran Bedi</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <GraduationCap className="w-5 h-5 text-blue-500 mt-1 flex-shrink-0" />
                      <span className="text-md lg:text-lg">Certified trainer for Abacus & Vedic Maths</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Brain className="w-5 h-5 text-purple-500 mt-1 flex-shrink-0" />
                      <span className="text-md lg:text-lg">Expert in History, Geography, Current affairs</span>
                    </li>
                  </ul>
                  <div className="mt-6 pt-6 border-t flex justify-center items-center ">
                    <Link
                      to="https://static.wixstatic.com/media/86e837_56ef6d3f0282498cac47a388b9e3bd6e~mv2.jpg/v1/fill/w_311,h_438,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/86e837_56ef6d3f0282498cac47a388b9e3bd6e~mv2.jpg"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button variant="ghost" size="sm" className="text-blue-600 text-lg">
                        <ExternalLink className="w-8 h-8" />
                        Profile
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>

              {/* Dr. Raina's Card */}
              <Card className="group hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="relative overflow-hidden pb-0">
                  <div className="absolute top-4 right-4 bg-yellow-400 rounded-full p-2">
                    <Lightbulb className="w-6 h-6 text-white" />
                  </div>
                  <img
                    src="/placeholder.svg?height=300&width=400"
                    alt="Dr. Raina"
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0" />
                  <div className="absolute bottom-4 left-4">
                    <h3 className="text-2xl font-bold text-white">Dr. Raina</h3>
                    <Badge variant="secondary" className="mt-1 text-sm lg:text-md">Ph.D. in History</Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <Award className="w-5 h-5 text-yellow-500 mt-1 flex-shrink-0" />
                      <span className="text-md lg:text-lg">Gold medalist in Rajasthan Police Service</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <GraduationCap className="w-5 h-5 text-blue-500 mt-1 flex-shrink-0" />
                      <span className="text-md lg:text-lg">Expert in History, Geography, English</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Brain className="w-5 h-5 text-purple-500 mt-1 flex-shrink-0" />
                      <span className="text-md lg:text-lg">Certified trainer of NSDC (BFSI Sector)</span>
                    </li>
                  </ul>
                  <div className="mt-6 pt-6 border-t flex justify-center items-center ">
                    <Link
                      to="https://static.wixstatic.com/media/86e837_dcb89adc5368400c8868b30fc55905fa~mv2.jpg/v1/fill/w_303,h_429,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/86e837_dcb89adc5368400c8868b30fc55905fa~mv2.jpg"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button variant="ghost" size="sm" className="text-blue-600 text-lg">
                        <ExternalLink className="w-8 h-8" />
                        Profile
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </div>

      {/* <ReactPlayer
        url="https://static.wixstatic.com/media/86e837_3fd16721513948d39c2adef08a4a4096f000.jpg/v1/fill/w_449,h_268,al_c,q_80,usm_0.33_1.00_0.00,enc_avif,quality_auto/86e837_3fd16721513948d39c2adef08a4a4096f000.jpg"
        controls
        width="100%"
        height="100%"
      /> */}
    </div>
  )
}
