import { Route, Routes } from 'react-router-dom'
import Navbar from './components/other/Navbar'
import Project from './pages/Project'
import TeacherVacancy from './pages/TeacherVacancy'
import Consultation from './pages/Consultation'
import Books from './pages/Books'
import Academic from './pages/Academic'
import ArtCraft from './pages/ArtCraft'
import Imo from './pages/Imo'
import JeeNeetClasses from './pages/JeeNeetClasses'
import LogicalReasoning from './pages/LogicalReasoning'
import JeeMainPreparation from './pages/JeeMainPreparation'
import EnglishAdvanced from './pages/EnglishAdvanced'
import GkVideos from './pages/GkVideos'
import Ieo from './pages/Ieo'
import IgcseIbClasses from './pages/IgcseIbClasses'
import Fitness from './pages/Fitness'
import Teachers from './pages/Teachers'
import Testimonials from './pages/Testimonials'
import Faq from './pages/Faq'
import Blogs from './pages/Blogs'
import Resources from './pages/Resources'
import Team from './pages/Team'
import Hero from './pages/Hero'
import GK from './pages/GK'
import Footer from './components/other/Footer'
import Olympiads from './pages/Olympiads'
import Home from './pages/Home'
import TestFarmer from './pages/TestFarmer'

import EnhancedCropLifecycleTimeline from './pages/LifeCycle'
import { useEffect } from 'react'
import SpeechWidget from './pages/textToSpeech'
import CattleDiseaseAnalyzer from './pages/CattleDoc'
import ProductSearchAndResults from './pages/Product'
import AadhaarSignup from './pages/SignUp'
import FarmerLogin from './pages/Login'
import FarmerDetailsForm from './pages/NextStep'
import FarmerSignupV2 from './pages/SignUp'


function App() {
  useEffect(() => {
    // Load Google Translate Script dynamically (if not added in index.html)
    const script = document.createElement('script');
    script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script); // Clean up script after component unmounts
    };
  }, [])
  return (
    <section className='overflow-y-hidden'>
      <div className='flex mt-10'><div><SpeechWidget /></div>
      <div id="google_translate_element" className="mt-1"></div></div>
      <Navbar />
      <main className=' mx-auto container min-h-screen'>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/gk" element={<GK />} />
          <Route path="/project" element={<Project />} />
          <Route path="/teacher-vacancy" element={<TeacherVacancy />} />
          <Route path="/consultation" element={<Consultation />} />
          <Route path="/books" element={<Books />} />
          <Route path="/olympiads" element={<Olympiads />} />
          <Route path="/academic" element={<Academic />} />

          <Route path="/art-craft" element={<ArtCraft />} />
          <Route path="/imo" element={<Imo />} />
          <Route path="/jee-neet-classes" element={<JeeNeetClasses />} />
          <Route path="/logical-reasoning" element={<LogicalReasoning />} />
          <Route path="/jee-main-preparation" element={<JeeMainPreparation />} />
          <Route path="/english-advanced" element={<EnglishAdvanced />} />
          <Route path="/gk-videos" element={<GkVideos />} />
          <Route path="/ieo" element={<Ieo />} />
          <Route path="/igcse-ib-classes" element={<IgcseIbClasses />} />
          <Route path="/fitness" element={<Fitness />} />
          <Route path="/teachers" element={<Teachers />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/team" element={<Team />} />
          <Route path="/test" element={<TestFarmer />} />
          <Route path="/lifecycle" element={<EnhancedCropLifecycleTimeline/>} />
          <Route path="/cattle" element={<CattleDiseaseAnalyzer/>} />
          <Route path="/product" element={<ProductSearchAndResults/>} />
          
          <Route path="/aadhar" element={<FarmerSignupV2/>} />
          <Route path="/login" element={<FarmerLogin/>} />
          <Route path="/details" element={<FarmerDetailsForm/>} />
        </Routes>
      </main>
      <Footer />
    </section>
  )
}

export default App
