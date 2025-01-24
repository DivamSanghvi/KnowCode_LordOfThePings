import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { Button } from "../components/ui/button"
import { Link } from 'react-router-dom'
import { BookOpen, Mic, PenTool, GraduationCap, Clock, Calendar, Book, Lightbulb, ChevronRight, Globe2, MessageSquare, Pencil, ExternalLink, Award, Brain } from 'lucide-react'

export default function EnglishAdvanced() {
  return (
    <>
      <div className="min-h-screen">
        <section className="relative overflow-hidden py-4">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative z-10 max-w-4xl mx-auto text-center">
              <h1 className="text-2xl lg:text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl mb-6">
                Urja English++ Classes
              </h1>
              <blockquote className="text-xl lg:text-2xl italic font-semibold text-gray-600 mb-8 relative py-4">
                <span className="absolute top-0 left-0 transform -translate-x-4 -translate-y-4 text-blue-200 text-6xl">"</span>
                Mom/Dad, I wish express myself well using the most accurate grammar. I want to write stories, school newsletters, blogs, poems and lots of it. I also want to be confident on the stage and debate & put forth my thoughts in front of all in the best possible manner. Tell me how?
                <span className="absolute bottom-0 right-0 transform translate-x-4 translate-y-4 text-blue-200 text-6xl">"</span>
              </blockquote>
              <p className="text-lg lg:text-xl text-gray-600 leading-relaxed mb-4">
                Well, we have the answer for you. Get your child join our English Grammar, Creative Writing and Public Speaking Combo Classes. Apart from the School grammar, comprehensions, letter writing, passages, etc, we cover many more aspects of creative writing. We also teach how to speak the right English, with right grammar, using right diction & tone, depicting right body language. We work on their vocabulary, idioms, phrases to give them that extra edge.
              </p>
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 my-2">
                Join Our Classes
              </Button>
            </div>
          </div>
        </section>

        {/* Course Components Section */}
        <section className="py-10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-8">
              {/* English Grammar Card */}
              <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <BookOpen className="w-8 h-8 text-orange-600" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-orange-600">English Grammar</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-start gap-2">
                      <GraduationCap className="w-5 h-5 text-orange-500 mt-1 flex-shrink-0" />
                      <span>Comprehensive grammar fundamentals</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <GraduationCap className="w-5 h-5 text-orange-500 mt-1 flex-shrink-0" />
                      <span>Vocabulary enhancement</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <GraduationCap className="w-5 h-5 text-orange-500 mt-1 flex-shrink-0" />
                      <span>Practical usage and exercises</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Creative Writing Card */}
              <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <PenTool className="w-8 h-8 text-purple-600" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-purple-600">Creative Writing</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-start gap-2">
                      <GraduationCap className="w-5 h-5 text-purple-500 mt-1 flex-shrink-0" />
                      <span>Story writing techniques</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <GraduationCap className="w-5 h-5 text-purple-500 mt-1 flex-shrink-0" />
                      <span>Poetry and blog writing</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <GraduationCap className="w-5 h-5 text-purple-500 mt-1 flex-shrink-0" />
                      <span>Newsletter creation</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Public Speaking Card */}
              <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Mic className="w-8 h-8 text-green-600" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-green-600">Public Speaking</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-start gap-2">
                      <GraduationCap className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                      <span>Confidence building</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <GraduationCap className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                      <span>Debate skills</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <GraduationCap className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                      <span>Body language training</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Batch Details Section */}
        <section className="py-6 bg-gray-50 mb-6">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-xl lg:text-3xl font-bold text-center mb-8 text-orange-500">Current Batches</h2>
            <div className="max-w-3xl mx-auto grid gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                        <Calendar className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-lg">Age 10-12</p>
                        <p className="text-gray-600">Sat & Sun, 12:30 PM</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-gray-400" />
                      <span className="font-medium">Fees - Rs. 1600/month</span>
                    </div>
                    <Badge variant="secondary" className="ml-auto">Regular Batch</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                        <Calendar className="h-6 w-6 text-green-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-lg">Age 6-9</p>
                        <p className="text-gray-600">Sundays 5:30 PM</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-gray-400" />
                      <span className="font-medium">Fees - Rs. 1000/month</span>
                    </div>
                    <Badge variant="secondary" className="bg-green-100 text-green-700">New Batch</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </div>


      <section className="py-8 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl lg:text-3xl font-bold text-center mb-8 text-orange-500">Our Comprehensive Curriculum</h2>

          <Tabs defaultValue="grammar" className="max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 mb-8">
              <TabsTrigger value="grammar" className="flex items-center gap-2 ">
                <Book className="h-4 w-4" />
                Grammar
              </TabsTrigger>
              <TabsTrigger value="genres" className="flex items-center gap-2">
                <PenTool className="h-4 w-4" />
                Writing Genres
              </TabsTrigger>
              <TabsTrigger value="knowhow" className="flex items-center gap-2">
                <Lightbulb className="h-4 w-4" />
                Writing Know-How
              </TabsTrigger>
              <TabsTrigger value="speaking" className="flex items-center gap-2">
                <Mic className="h-4 w-4" />
                Public Speaking
              </TabsTrigger>
            </TabsList>

            <TabsContent value="grammar">
              <Card>
                <CardContent className="p-6">
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold flex items-center gap-2 text-purple-700">
                        <BookOpen className="h-5 w-5" />
                        Basic Elements
                      </h3>
                      <ul className="space-y-2">
                        {['Nouns', 'Gender', 'Pronouns', 'Verbs', 'Adjectives', 'Articles', 'Adverb'].map((item) => (
                          <li key={item} className="flex items-center gap-2 text-gray-600 text-md lg:text-lg">
                            <ChevronRight className="h-4 w-4 text-purple-400" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold flex items-center gap-2 text-purple-700">
                        <MessageSquare className="h-5 w-5" />
                        Sentence Structure
                      </h3>
                      <ul className="space-y-2">
                        {[
                          'Kind of sentences',
                          'Subject predicate',
                          'Active passive',
                          'Direct indirect speech',
                          'Conjunction',
                          'Preposition'
                        ].map((item) => (
                          <li key={item} className="flex items-center gap-2 text-gray-600 text-md lg:text-lg">
                            <ChevronRight className="h-4 w-4 text-purple-400" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold flex items-center gap-2 text-purple-700">
                        <Pencil className="h-5 w-5" />
                        Advanced Concepts
                      </h3>
                      <ul className="space-y-2">
                        {[
                          'Homonyms',
                          'Homophones',
                          'Synonyms',
                          'Antonyms',
                          'Metaphors',
                          'Simile',
                          'Sound words'
                        ].map((item) => (
                          <li key={item} className="flex items-center gap-2 text-gray-600 text-md lg:text-lg">
                            <ChevronRight className="h-4 w-4 text-purple-400" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="genres">
              <Card>
                <CardContent className="p-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold flex items-center gap-2 text-blue-700">
                        <BookOpen className="h-5 w-5" />
                        Writing Styles
                      </h3>
                      <ul className="space-y-2">
                        {[
                          'Descriptive',
                          'Narrative',
                          'Argumentative',
                          'Expository',
                          '...Many More'
                        ].map((item) => (
                          <li key={item} className="flex items-center gap-2 text-gray-600 text-md lg:text-lg">
                            <ChevronRight className="h-4 w-4 text-blue-400" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold flex items-center gap-2 text-blue-700">
                        <Lightbulb className="h-5 w-5" />
                        Techniques Used
                      </h3>
                      <ul className="space-y-2">
                        {[
                          'Setup exploration',
                          'Plot development',
                          'Character development',
                          'Underlying theme',
                          'Point of view',
                          'Dialogue',
                          'Anecdotes',
                          'Metaphors and similes',
                          'Figures of speech',
                          'Imaginative language',
                          'Emotional appeal'
                        ].map((item) => (
                          <li key={item} className="flex items-center gap-2 text-gray-600 text-md lg:text-lg">
                            <ChevronRight className="h-4 w-4 text-blue-400" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="knowhow">
              <Card>
                <CardContent className="p-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold flex items-center gap-2 text-green-700">
                        <BookOpen className="h-5 w-5" />
                        Writing Forms
                      </h3>
                      <ul className="space-y-2">
                        {[
                          'Comprehensions',
                          'Stories (Short & long)',
                          'Diaries',
                          'Poetry',
                          'Plays',
                          'Movie and television scripts',
                          'Fiction (novels, short stories)',
                          'Songs',
                          'Speeches',
                          'Memoirs'
                        ].map((item) => (
                          <li key={item} className="flex items-center gap-2 text-gray-600 text-md lg:text-lg">
                            <ChevronRight className="h-4 w-4 text-green-400" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold flex items-center gap-2 text-green-700">
                        <PenTool className="h-5 w-5" />
                        Professional Writing
                      </h3>
                      <ul className="space-y-2">
                        {[
                          'Personal essays',
                          'Autobiographies/Biographies',
                          'Formal and informal letters',
                          'News Articles',
                          'Essay',
                          'Composition',
                          'Comprehension'
                        ].map((item) => (
                          <li key={item} className="flex items-center gap-2 text-gray-600 text-md lg:text-lg">
                            <ChevronRight className="h-4 w-4 text-green-400" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="speaking">
              <Card>
                <CardContent className="p-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold flex items-center gap-2 text-orange-700">
                        <Mic className="h-5 w-5" />
                        Core Skills
                      </h3>
                      <ul className="space-y-2">
                        {[
                          'Imp Soft Skills',
                          'Word Dictions',
                          'Body Language',
                          'Vocabulary Building'
                        ].map((item) => (
                          <li key={item} className="flex items-center gap-2 text-gray-600 text-md lg:text-lg">
                            <ChevronRight className="h-4 w-4 text-orange-400" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold flex items-center gap-2 text-orange-700">
                        <MessageSquare className="h-5 w-5" />
                        Practical Applications
                      </h3>
                      <ul className="space-y-2">
                        {[
                          'Speeches, Role plays',
                          'Debates, Extempore',
                          'Story Making/Telling'
                        ].map((item) => (
                          <li key={item} className="flex items-center gap-2 text-gray-600 text-md lg:text-lg">
                            <ChevronRight className="h-4 w-4 text-orange-400" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <h2 className="text-xl lg:text-3xl font-bold text-center mb-12">Meet Our Expert English Teachers</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="group hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="relative overflow-hidden pb-0">
              <div className="absolute top-4 right-4 bg-yellow-400 rounded-full p-2">
                <Lightbulb className="w-6 h-6 text-white" />
              </div>
              <img
                src="/placeholder.svg?height=300&width=400"
                alt="Nikita Ma'am"
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0" />
              <div className="absolute bottom-4 left-4">
                <h3 className="text-2xl font-bold text-white">Nikita Ma'am</h3>
                <Badge variant="secondary" className="mt-1 text-sm lg:text-md">English Honors, Delhi University</Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <Globe2 className="w-5 h-5 text-blue-500 mt-1 flex-shrink-0" />
                  <span className="text-md lg:text-lg">3+ years of international teaching experience across various countries</span>
                </li>
                <li className="flex items-start gap-2">
                  <Award className="w-5 h-5 text-yellow-500 mt-1 flex-shrink-0" />
                  <span className="text-md lg:text-lg">Blogger, anchor, and accomplished public speaker</span>
                </li>
                <li className="flex items-start gap-2">
                  <BookOpen className="w-5 h-5 text-purple-500 mt-1 flex-shrink-0" />
                  <span className="text-md lg:text-lg">Expert in English Literature, Grammar, and Creative Writing</span>
                </li>
              </ul>
              <div className="mt-6 pt-6 border-t flex justify-center items-center">
                <Link
                  to="https://static.wixstatic.com/media/86e837_169ed9dccabc46ab8cb0dd3ec3b428cf~mv2.jpg/v1/fill/w_336,h_475,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/86e837_169ed9dccabc46ab8cb0dd3ec3b428cf~mv2.jpg"
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

          {/* Shikha's Card */}
          <Card className="group hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="relative overflow-hidden pb-0">
              <div className="absolute top-4 right-4 bg-yellow-400 rounded-full p-2">
                <Lightbulb className="w-6 h-6 text-white" />
              </div>
              <img
                src="/placeholder.svg?height=300&width=400"
                alt="Shikha Ma'am"
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0" />
              <div className="absolute bottom-4 left-4">
                <h3 className="text-2xl font-bold text-white">Shikha Ma'am</h3>
                <Badge variant="secondary" className="mt-1 text-sm lg:text-md">M.A. English, B.Ed.</Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <GraduationCap className="w-5 h-5 text-blue-500 mt-1 flex-shrink-0" />
                  <span className="text-md lg:text-lg">12+ years of teaching experience across multiple boards</span>
                </li>
                <li className="flex items-start gap-2">
                  <Brain className="w-5 h-5 text-yellow-500 mt-1 flex-shrink-0" />
                  <span className="text-md lg:text-lg">Expert in English language, literature & Speaking</span>
                </li>
                <li className="flex items-start gap-2">
                  <BookOpen className="w-5 h-5 text-purple-500 mt-1 flex-shrink-0" />
                  <span className="text-md lg:text-lg">Teaches across ICSE, CBSE, ICSE boards</span>
                </li>
              </ul>
              <div className="mt-6 pt-6 border-t flex justify-center items-center">
                <Link
                  to="https://static.wixstatic.com/media/86e837_118c50aaeb9d4b9ea1cd81ca9c429474~mv2.jpg/v1/fill/w_336,h_475,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/86e837_118c50aaeb9d4b9ea1cd81ca9c429474~mv2.jpg"
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
    </>
  )
}
