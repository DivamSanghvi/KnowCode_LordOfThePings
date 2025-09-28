import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedHeroSection from '../components/other/LifeCycleHero';
import { useSelector } from "react-redux";
import axios from 'axios';
import { Link } from 'react-router-dom';
const EnhancedCropLifecycleTimeline = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [selectedPhase, setSelectedPhase] = useState(null);
  const [error, setError] = useState(null);
  const user = useSelector((state) => state.user);

  const fetchLifecycleData = async () => {
    setLoading(true);
    setError(false);
  
    // Get the user data from Redux state
    
    // console.log(user)
    // // Ensure user exists before making the API call
    // if (!user || !user.user || !user.user._id) {
    //   console.error("User ID is missing.");
    //   setError("User ID not found.");
    //   setLoading(false);
    //   return;
    // }
  
    try {
      const response = await axios.post(
        `http://localhost:8000/api/v1/user/croplifecycle/67938155990ec09219d061a5`
      );
  
      console.log("Raw response data:", response.data);
  
      const rawData = response.data.data;
      const jsonString = rawData.replace(/```json\n|\n```/g, "").trim();
  
      try {
        const apiResponse = JSON.parse(jsonString);
        console.log("Parsed API response:", apiResponse);
        setData(apiResponse);
      } catch (parseError) {
        console.error("Error parsing JSON:", parseError.message);
        setError("Failed to parse lifecycle data.");
      }
  
    } catch (error) {
      console.error("Error fetching lifecycle data:", error.message);
      setError("Failed to fetch data. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  

  const handleDotClick = (phase) => {
    setSelectedPhase(phase);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-100 to-white text-black font-sans">
        <AnimatedHeroSection/>
      <motion.header 
        className="bg-orange-500 text-white py-16"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-4">
          <motion.h1 
            className="text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Smart Agriculture for Modern Farmers
          </motion.h1>
          <motion.p 
            className="text-xl mb-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Optimize your crop lifecycle with AI-powered insights
          </motion.p>
        </div>
      </motion.header>

      <main className="container mx-auto px-4 py-12">
        <motion.button
          className="block mx-auto px-8 py-4 bg-orange-500 text-white text-xl rounded-full shadow-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50 transition-all duration-300"
          onClick={fetchLifecycleData}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Get Crop Lifecycle
        </motion.button>

        <AnimatePresence>
          {loading && (
            <motion.div
              className="mt-12 p-8 bg-white rounded-lg shadow-lg text-center"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
            >
              <motion.div
                className="inline-block"
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <svg className="w-16 h-16 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </motion.div>
              <p className="mt-4 text-xl font-semibold text-orange-600">Please wait, our AI is analyzing your crop lifecycle...</p>
            </motion.div>
          )}
        </AnimatePresence>

        {error && (
  <motion.div
    className="mt-12 p-8 bg-white rounded-2xl shadow-xl text-center max-w-md mx-auto border border-red-300"
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -50 }}
  >
    {/* Illustration */}
    <div className="flex justify-center">
      <img 
        src="https://cdn-icons-png.flaticon.com/512/6171/6171361.png" 
        alt="User not logged in"
        className="w-32 h-32 mb-4"
      />
    </div>

    {/* Error Message */}
    <h2 className="text-2xl font-bold text-red-600">User Not Logged In</h2>
    <p className="text-gray-600 mt-2 text-lg">
      Please log in to access this feature.
    </p>

    {/* Login Button */}
    <Link to={"/login"}>
    <motion.button
      onClick={() => {
        setError(null);
        fetchLifecycleData();
      }}
      className="mt-6 px-6 py-3 text-white font-semibold rounded-full bg-gradient-to-r from-red-500 to-red-700 shadow-lg hover:from-red-600 hover:to-red-800 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-red-400"
      whileHover={{ scale: 1.07 }}
      whileTap={{ scale: 0.95 }}
    >
      Login
    </motion.button>
    </Link>
  </motion.div>
)}


        {data && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div
              className="mt-16"
              variants={itemVariants}
            >
              <h2 className="text-3xl font-bold text-center mb-8 text-orange-600">Crop Lifecycle Timeline</h2>
              <div className="relative">
                <div className="absolute top-1/2 left-0 right-0 h-1 bg-orange-300 transform -translate-y-1/2"></div>
                <div className="flex justify-between">
                  {data.cropLifecycle.map((phase, index) => (
                    <motion.div
                      key={index}
                      className="relative"
                      variants={itemVariants}
                    >
                      <motion.div
                        className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center cursor-pointer z-10 relative"
                        whileHover={{ scale: 1.2 }}
                        onClick={() => handleDotClick(phase)}
                      >
                        <span className="text-white font-bold">{index + 1}</span>
                      </motion.div>
                      <div className="absolute top-16 left-1/2 transform -translate-x-1/2 text-center w-32">
                        <h3 className="font-semibold text-orange-600">{phase.phase}</h3>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            <AnimatePresence>
              {selectedPhase && (
                <motion.div
                  className="mt-16 p-8 bg-white rounded-lg shadow-lg"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -50 }}
                >
                  <h2 className="text-3xl font-bold text-orange-600 mb-4">{selectedPhase.phase}</h2>
                  <p className="text-xl font-semibold mb-4 text-gray-700">Time: {selectedPhase.time}</p>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-2xl font-semibold text-orange-500 mb-4">Actions:</h3>
                      <ul className="list-disc list-inside space-y-2">
                        {selectedPhase.actions.map((action, index) => (
                          <motion.li 
                            key={index}
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                          >
                            {action}
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-2xl font-semibold text-orange-500 mb-4">Resources:</h3>
                      <ul className="list-disc list-inside space-y-2">
                        {selectedPhase.resources.map((resource, index) => (
                          <motion.li 
                            key={index}
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                          >
                            {resource}
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <motion.button
                    className="mt-8 px-6 py-3 bg-orange-500 text-white rounded-full hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50 transition-all duration-300"
                    onClick={() => setSelectedPhase(null)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Close
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.div
              className="mt-16 p-8 bg-white rounded-lg shadow-lg"
              variants={itemVariants}
            >
              <h2 className="text-3xl font-bold text-orange-600 mb-6">Farmer Details</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <motion.div variants={itemVariants}>
                  <h3 className="text-2xl font-semibold text-orange-500 mb-4">Land Information</h3>
                  <ul className="space-y-2">
                    <li><span className="font-semibold">Size:</span> {data.farmer.landDetails.size}</li>
                    <li><span className="font-semibold">Irrigation Type:</span> {data.farmer.landDetails.irrigationType}</li>
                    <li><span className="font-semibold">Soil Type:</span> {data.farmer.landDetails.soilType}</li>
                    <li><span className="font-semibold">Preferred Crops:</span> {data.farmer.landDetails.preferredCrops.join(", ")}</li>
                    <li><span className="font-semibold">Farming Experience:</span> {data.farmer.landDetails.farmingExperience}</li>
                    <li><span className="font-semibold">Equipment Owned:</span> {data.farmer.landDetails.equipmentOwned.join(", ")}</li>
                  </ul>
                </motion.div>
                <motion.div variants={itemVariants}>
                  <h3 className="text-2xl font-semibold text-orange-500 mb-4">Climate Information</h3>
                  <ul className="space-y-2">
                    <li><span className="font-semibold">Average Rainfall:</span> {data.farmer.climaticDetails.averageRainfall}</li>
                    <li><span className="font-semibold">Temperature Range:</span> {data.farmer.climaticDetails.temperatureRange.min} - {data.farmer.climaticDetails.temperatureRange.max}</li>
                  </ul>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              className="mt-16 p-8 bg-white rounded-lg shadow-lg"
              variants={itemVariants}
            >
              <h2 className="text-3xl font-bold text-orange-600 mb-6">Challenges Faced</h2>
              <ul className="space-y-4">
                {data.challenges.map((challenge, index) => (
                  <motion.li
                    key={index}
                    className="bg-orange-50 p-4 rounded-lg"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    {challenge}
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              className="mt-16 p-8 bg-white rounded-lg shadow-lg text-center"
              variants={itemVariants}
            >
              <h2 className="text-3xl font-bold text-orange-600 mb-4">Expected Profit Margin</h2>
              <p className="text-xl font-semibold text-green-600 mb-4">{data.expectedProfitMargin}</p>
              <p className="text-gray-600">
                Note: This is an estimated profit margin. Actual profits may vary depending on various factors such as weather conditions, market prices, and farming practices.
              </p>
            </motion.div>
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default EnhancedCropLifecycleTimeline;

