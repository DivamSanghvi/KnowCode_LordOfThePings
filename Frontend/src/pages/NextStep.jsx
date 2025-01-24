import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ChevronDown, ChevronUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const FarmerDetailsForm = () => {
  const [formData, setFormData] = useState({
    landSize: '',
    irrigationType: '',
    soilType: '',
    preferredCrops: [],
    farmingExperience: '',
    equipmentOwned: [],
  });
  const navigate = useNavigate()
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const irrigationTypes = ["Rainfed", "Irrigated", "Partially Irrigated"];
  const soilTypes = ["Sandy", "Clayey", "Loamy", "Silty", "Peaty", "Chalky", "Saline"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleArrayChange = (e, field) => {
    const value = e.target.value;
    setFormData(prevState => ({
      ...prevState,
      [field]: prevState[field].includes(value)
        ? prevState[field].filter(item => item !== value)
        : [...prevState[field], value]
    }));
  };

  const validateForm = () => {
    let errors = {};
    if (!formData.landSize) errors.landSize = "Land size is required";
    if (!formData.irrigationType) errors.irrigationType = "Irrigation type is required";
    if (!formData.soilType) errors.soilType = "Soil type is required";
    if (formData.preferredCrops.length === 0) errors.preferredCrops = "At least one preferred crop is required";
    if (!formData.farmingExperience) errors.farmingExperience = "Farming experience is required";
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    setErrors(formErrors);

    if (Object.keys(formErrors).length === 0) {
      setIsSubmitting(true);
      // Simulating API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsSubmitting(false);
      setIsSubmitted(true);
    }
  };

  const inputVariants = {
    focus: { scale: 1.05, transition: { type: 'spring', stiffness: 300 } },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-100 to-white text-black font-sans py-12 px-4">
      <motion.div 
        className="max-w-2xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="p-8">
          <motion.h1 
            className="text-3xl font-bold text-center text-orange-600 mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Farmer Details
          </motion.h1>

          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                className="space-y-6"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <motion.div className="flex flex-col space-y-1" variants={inputVariants}>
                    <label htmlFor="landSize" className="text-sm font-medium text-gray-700">Land Size (acres)</label>
                    <input
                      type="number"
                      id="landSize"
                      name="landSize"
                      value={formData.landSize}
                      onChange={handleChange}
                      className={`px-3 py-2 border ${errors.landSize ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500`}
                    />
                    {errors.landSize && <p className="text-red-500 text-xs mt-1">{errors.landSize}</p>}
                  </motion.div>
                  <motion.div className="flex flex-col space-y-1" variants={inputVariants}>
                <label htmlFor="password" className="text-sm font-medium text-gray-700">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`px-3 py-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500`}
                  placeholder="Enter your password"
                />
                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
              </motion.div>

                  <motion.div className="flex flex-col space-y-1" variants={inputVariants}>
                    <label htmlFor="irrigationType" className="text-sm font-medium text-gray-700">Irrigation Type</label>
                    <select
                      id="irrigationType"
                      name="irrigationType"
                      value={formData.irrigationType}
                      onChange={handleChange}
                      className={`px-3 py-2 border ${errors.irrigationType ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500`}
                    >
                      <option value="">Select Irrigation Type</option>
                      {irrigationTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                    {errors.irrigationType && <p className="text-red-500 text-xs mt-1">{errors.irrigationType}</p>}
                  </motion.div>

                  <motion.div className="flex flex-col space-y-1" variants={inputVariants}>
                    <label htmlFor="soilType" className="text-sm font-medium text-gray-700">Soil Type</label>
                    <select
                      id="soilType"
                      name="soilType"
                      value={formData.soilType}
                      onChange={handleChange}
                      className={`px-3 py-2 border ${errors.soilType ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500`}
                    >
                      <option value="">Select Soil Type</option>
                      {soilTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                    {errors.soilType && <p className="text-red-500 text-xs mt-1">{errors.soilType}</p>}
                  </motion.div>

                  <motion.div className="flex flex-col space-y-1" variants={inputVariants}>
                    <label htmlFor="farmingExperience" className="text-sm font-medium text-gray-700">Farming Experience (years)</label>
                    <input
                      type="number"
                      id="farmingExperience"
                      name="farmingExperience"
                      value={formData.farmingExperience}
                      onChange={handleChange}
                      className={`px-3 py-2 border ${errors.farmingExperience ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500`}
                    />
                    {errors.farmingExperience && <p className="text-red-500 text-xs mt-1">{errors.farmingExperience}</p>}
                  </motion.div>
                </div>

                <motion.div className="flex flex-col space-y-1" variants={inputVariants}>
                  <label className="text-sm font-medium text-gray-700">Preferred Crops</label>
                  <div className="flex flex-wrap gap-2">
                    {['Rice', 'Wheat', 'Corn', 'Soybeans', 'Cotton'].map(crop => (
                      <motion.button
                        key={crop}
                        type="button"
                        onClick={(e) => handleArrayChange(e, 'preferredCrops')}
                        value={crop}
                        className={`px-3 py-1 rounded-full text-sm ${
                          formData.preferredCrops.includes(crop)
                            ? 'bg-orange-500 text-white'
                            : 'bg-gray-200 text-gray-700'
                        } transition-colors duration-200`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {crop}
                      </motion.button>
                    ))}
                  </div>
                  {errors.preferredCrops && <p className="text-red-500 text-xs mt-1">{errors.preferredCrops}</p>}
                </motion.div>

                <motion.div className="flex flex-col space-y-1" variants={inputVariants}>
                  <label className="text-sm font-medium text-gray-700">Equipment Owned</label>
                  <div className="flex flex-wrap gap-2">
                    {['Tractor', 'Plow', 'Harvester', 'Sprayer', 'Seeder'].map(equipment => (
                      <motion.button
                        key={equipment}
                        type="button"
                        onClick={(e) => handleArrayChange(e, 'equipmentOwned')}
                        value={equipment}
                        className={`px-3 py-1 rounded-full text-sm ${
                          formData.equipmentOwned.includes(equipment)
                            ? 'bg-orange-500 text-white'
                            : 'bg-gray-200 text-gray-700'
                        } transition-colors duration-200`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {equipment}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>

                <motion.button
                  type="submit"
                  className="w-full bg-orange-600 text-white py-2 px-4 rounded-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50 transition-colors duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                </motion.button>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                className="text-center"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.5 }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
                >
                  <Check className="w-8 h-8 text-green-500" />
                </motion.div>
                <h2 className="text-2xl font-bold text-green-600 mb-2">Details Submitted Successfully!</h2>
                <p className="text-gray-600 mb-6">Thank you for providing your farming details.</p>
                <motion.button
                  className="bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 transition-colors duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {navigate('/login');}}
                >
                  Login
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default FarmerDetailsForm;

