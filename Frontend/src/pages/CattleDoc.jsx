import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, AlertCircle, Check, ChevronDown, ChevronUp } from 'lucide-react';
import CattleDiseaseHero from '../components/other/cattleHero';
import photo1 from "../../Temp/cattlecare1.jpg"
import photo2 from "../../Temp/cattlecare2.jpg"
const CattleDiseaseAnalyzer = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showUpload, setShowUpload] = useState(false);
  const [result, setResult] = useState(null);
  const [expandedSolution, setExpandedSolution] = useState(null);
  const [showBlogs, setShowBlogs] = useState(false);

  const handleAnalyze = () => {
    setShowUpload(true);
  };

  const handleFileUpload = async (e) => {
    e.preventDefault();
    setIsAnalyzing(true);
    setShowUpload(false);
  
    const formData = new FormData();
    formData.append('photo', e.target.files[0]);
  
    try {
      // Make the API request to analyze the cattle disease
      const response = await fetch('http://localhost:8000/api/v1/user/cattleDisease', {
        method: 'POST',
        body: formData,
      });
  
      const data = await response.json();
  
      if (response.ok && data.success) {
        // Extract the JSON string from the response
        const jsonString = data.data
          .replace('```json\n', '')  // Remove opening markdown
          .replace('\n```', '')      // Remove closing markdown
          .trim();                   // Remove any extra whitespace
  
        // Parse the cleaned JSON string into an object
        const analysisResult = JSON.parse(jsonString);
  
        // Set the result with the parsed data
        setResult(analysisResult);
      } else {
        // Handle error from the backend
        console.error('API returned failure:', data.message);
        alert(data.message || 'Error analyzing disease. Please try again.');
      }
    } catch (error) {
      // Handle network or parsing errors
      console.error('Error uploading the file:', error);
      alert('Error uploading the file. Please check your network and try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };
  
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-100 to-white text-black font-sans">
        <CattleDiseaseHero/>
      <header className="bg-black text-white py-16">
        <div className="container mx-auto px-4">
          <motion.h1 
            className="text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Protect Your Herd, Secure Your Future
          </motion.h1>
          <motion.p 
            className="text-xl mb-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Early detection saves lives. Our AI-powered tool is here to help.
          </motion.p>
          <motion.button
            className="bg-orange-500 text-white px-8 py-4 rounded-full text-xl font-semibold hover:bg-orange-600 transition-colors duration-300"
            onClick={handleAnalyze}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Analyze Now
          </motion.button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <AnimatePresence>
          {showUpload && (
            <motion.div
              className="bg-white p-8 rounded-lg shadow-lg mb-8"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
            >
              <h2 className="text-3xl font-bold mb-4 text-orange-600">Upload a Photo</h2>
              <p className="mb-4 text-gray-700">Help us analyze your cattle's health. Upload a clear photo of the affected area.</p>
              <form className="flex items-center space-x-4">
  <input
    type="file"
    accept="image/*"
    className="hidden"
    id="file-upload"
    onChange={handleFileUpload} // Add the onChange handler here
  />
  <label
    htmlFor="file-upload"
    className="bg-orange-500 text-white px-6 py-3 rounded-full cursor-pointer hover:bg-orange-600 transition-colors duration-300 flex items-center"
  >
    <Upload className="mr-2" />
    Choose File
  </label>
</form>

            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isAnalyzing && (
            <motion.div
              className="bg-white p-8 rounded-lg shadow-lg text-center"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
            >
              <motion.div
                className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full mx-auto mb-4"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
              <h2 className="text-2xl font-bold text-orange-600 mb-2">Analyzing Your Photo</h2>
              <p className="text-gray-700">Our AI is working hard to identify any potential issues. This may take a moment.</p>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {result && (
            <motion.div
              className="bg-white p-8 rounded-lg shadow-lg"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
            >
              <h2 className="text-3xl font-bold mb-4 text-orange-600">{result.disease}</h2>
              <div className="flex items-center mb-4">
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-orange-500 h-2.5 rounded-full" style={{ width: `${result.confidence}%` }}></div>
                </div>
                <span className="ml-2 text-sm font-medium text-gray-700">{result.confidence}% Confidence</span>
              </div>
              <p className="mb-4 text-gray-700">{result.description}</p>
              <p className="mb-4 text-gray-700"><strong>Cause:</strong> {result.cause}</p>
              
              <h3 className="text-2xl font-bold mb-4 text-orange-600">Solutions</h3>
              {result.solutions.map((solution, index) => (
                <div key={index} className="mb-4 border-b border-gray-200 pb-4">
                  <button
                    className="flex justify-between items-center w-full text-left"
                    onClick={() => setExpandedSolution(expandedSolution === index ? null : index)}
                  >
                    <span className="text-lg font-semibold text-gray-800">{solution.title}</span>
                    {expandedSolution === index ? <ChevronUp /> : <ChevronDown />}
                  </button>
                  <AnimatePresence>
                    {expandedSolution === index && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-2 text-gray-700"
                      >
                        {solution.description}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              ))}

              <h3 className="text-2xl font-bold mb-4 text-orange-600">Precautions</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                {result.precautions.map((precaution, index) => (
                  <li key={index}>{precaution}</li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          className="mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-bold mb-6 text-orange-600">Additional Information</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <img src={photo1} alt="Cattle care" className="w-full h-48 object-cover rounded-lg mb-4" />
              <h3 className="text-xl font-bold mb-2 text-gray-800">Understanding Cattle Diseases</h3>
              <p className="text-gray-700 mb-4">Learn about common cattle diseases, their symptoms, and how to prevent them.</p>
              <a href="#" className="text-orange-500 hover:underline">Read More</a>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <img src={photo2} alt="Healthy herd" className="w-full h-48 object-cover rounded-lg mb-4" />
              <h3 className="text-xl font-bold mb-2 text-gray-800">Maintaining a Healthy Herd</h3>
              <p className="text-gray-700 mb-4">Discover best practices for keeping your cattle healthy and productive.</p>
              <a href="#" className="text-orange-500 hover:underline">Read More</a>
            </div>
          </div>
          <button
            className="mt-8 bg-orange-500 text-white px-6 py-3 rounded-full hover:bg-orange-600 transition-colors duration-300"
            onClick={() => setShowBlogs(!showBlogs)}
          >
            {showBlogs ? 'Hide Blogs' : 'Show More Blogs'}
          </button>
          <AnimatePresence>
            {showBlogs && (
              <motion.div
                className="grid md:grid-cols-3 gap-8 mt-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <img src="/placeholder.svg?height=150&width=300" alt="Vaccination" className="w-full h-40 object-cover rounded-lg mb-4" />
                  <h3 className="text-lg font-bold mb-2 text-gray-800">Importance of Vaccination</h3>
                  <p className="text-gray-700 mb-4">Explore the critical role of vaccinations in preventing cattle diseases.</p>
                  <a href="#" className="text-orange-500 hover:underline">Read More</a>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <img src="/placeholder.svg?height=150&width=300" alt="Nutrition" className="w-full h-40 object-cover rounded-lg mb-4" />
                  <h3 className="text-lg font-bold mb-2 text-gray-800">Proper Nutrition for Cattle</h3>
                  <p className="text-gray-700 mb-4">Learn about balanced diets and nutritional needs for healthy cattle.</p>
                  <a href="#" className="text-orange-500 hover:underline">Read More</a>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <img src="/placeholder.svg?height=150&width=300" alt="Technology" className="w-full h-40 object-cover rounded-lg mb-4" />
                  <h3 className="text-lg font-bold mb-2 text-gray-800">Technology in Cattle Farming</h3>
                  <p className="text-gray-700 mb-4">Discover how modern technology is revolutionizing cattle health management.</p>
                  <a href="#" className="text-orange-500 hover:underline">Read More</a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </main>
    </div>
  );
};

export default CattleDiseaseAnalyzer;

