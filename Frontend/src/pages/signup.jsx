import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const FarmerSignupV2 = () => {
  const navigate =  useNavigate()
  const [step, setStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    "landDetails.landSize": "",
    "landDetails.irrigationType": "",
    "landDetails.soilType": "",
    preferredCrops: "",
    farmingExperience: "",
    equipmentOwned: "",
    photo: null,
  })
  const [previewUrl, setPreviewUrl] = useState(null)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    setFormData((prev) => ({ ...prev, photo: file }))
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewUrl(reader.result)
      }
      reader.readAsDataURL(file)
    } else {
      setPreviewUrl(null)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    setSuccess("")

    const data = new FormData()
    for (const key in formData) {
      if (key === "photo") {
        data.append("photo", formData.photo)
      } else {
        data.append(key, formData[key])
      }
    }

    try {
      const response = await axios.post("http://localhost:8000/api/v1/user/signup", data, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      setSuccess("Farmer registered successfully!")
      console.log(response.data)
      navigate("/login")
    } catch (error) {
      setError(error.response?.data?.message || "An error occurred during signup.")
      console.error("Signup error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const irrigationTypes = ["Rainfed", "Irrigated", "Partially Irrigated"]
  const soilTypes = ["Sandy", "Clayey", "Loamy", "Silty", "Peaty", "Chalky", "Saline"]

  return (
    <div className="min-h-xl bg-gradient-to-b from-orange-100 to-white p-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden my-32">
        <div className="p-8">
          <h1 className="text-3xl font-bold text-center text-orange-600 mb-6">Farmer Signup</h1>

          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.3 }}
              >
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    setStep(2)
                  }}
                  className="space-y-4"
                >
                  <div>
                    <label htmlFor="photo" className="block text-sm font-medium text-gray-700 mb-2">
                      Upload Aadhaar Card Image
                    </label>
                    <input
                      type="file"
                      id="photo"
                      name="photo"
                      onChange={handleFileChange}
                      className="block w-full text-sm text-gray-500
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-full file:border-0
                        file:text-sm file:font-semibold
                        file:bg-orange-50 file:text-orange-700
                        hover:file:bg-orange-100"
                      required
                    />
                  </div>
                  {previewUrl && (
                    <div className="mt-4">
                      <img
                        src={previewUrl || "/placeholder.svg"}
                        alt="Aadhaar Card Preview"
                        className="max-w-full h-auto rounded-lg shadow-md"
                      />
                    </div>
                  )}
                  <button
                    type="submit"
                    className="w-full bg-orange-600 text-white py-2 px-4 rounded-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50 transition-colors duration-300"
                  >
                    Next
                  </button>
                </form>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.3 }}
              >
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="block w-full px-4 py-2 mt-1 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="landSize" className="block text-sm font-medium text-gray-700 mb-1">
                      Land Size (in acres)
                    </label>
                    <input
                      type="number"
                      id="landSize"
                      name="landDetails.landSize"
                      value={formData["landDetails.landSize"]}
                      onChange={handleInputChange}
                      className="block w-full px-4 py-2 mt-1 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label htmlFor="irrigationType" className="block text-sm font-medium text-gray-700 mb-1">
                      Irrigation Type
                    </label>
                    <select
                      id="irrigationType"
                      name="landDetails.irrigationType"
                      value={formData["landDetails.irrigationType"]}
                      onChange={handleInputChange}
                      className="block w-full px-4 py-2 mt-1 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    >
                      <option value="">Select Irrigation Type</option>
                      {irrigationTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="soilType" className="block text-sm font-medium text-gray-700 mb-1">
                      Soil Type
                    </label>
                    <select
                      id="soilType"
                      name="landDetails.soilType"
                      value={formData["landDetails.soilType"]}
                      onChange={handleInputChange}
                      className="block w-full px-4 py-2 mt-1 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      required
                    >
                      <option value="">Select Soil Type</option>
                      {soilTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="preferredCrops" className="block text-sm font-medium text-gray-700 mb-1">
                      Preferred Crops
                    </label>
                    <input
                      type="text"
                      id="preferredCrops"
                      name="preferredCrops"
                      value={formData.preferredCrops}
                      onChange={handleInputChange}
                      className="block w-full px-4 py-2 mt-1 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="Enter crops separated by commas"
                    />
                  </div>
                  <div>
                    <label htmlFor="farmingExperience" className="block text-sm font-medium text-gray-700 mb-1">
                      Farming Experience (in years)
                    </label>
                    <input
                      type="number"
                      id="farmingExperience"
                      name="farmingExperience"
                      value={formData.farmingExperience}
                      onChange={handleInputChange}
                      className="block w-full px-4 py-2 mt-1 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="equipmentOwned" className="block text-sm font-medium text-gray-700 mb-1">
                      Equipment Owned
                    </label>
                    <input
                      type="text"
                      id="equipmentOwned"
                      name="equipmentOwned"
                      value={formData.equipmentOwned}
                      onChange={handleInputChange}
                      className="block w-full px-4 py-2 mt-1 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="Enter equipment separated by commas"
                    />
                  </div>
                  <div className="flex justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-transparent rounded-md hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-500"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 text-sm font-medium text-white bg-orange-600 border border-transparent rounded-md hover:bg-orange-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-orange-500"
                      disabled={isLoading}
                    >
                      {isLoading ? "Submitting..." : "Submit"}
                    </button>
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>

          {error && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 text-red-600 text-center">
              {error}
            </motion.p>
          )}

          {success && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 text-green-600 text-center">
              {success}
            </motion.p>
          )}
        </div>
      </div>
    </div>
  )
}

export default FarmerSignupV2

