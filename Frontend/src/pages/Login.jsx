import React, { useState } from "react"
import { motion } from "framer-motion"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"  // ✅ Import useSelector
import { setUser } from "../redux/slices/user.slice.js" // ✅ Import setUser action

const FarmerLogin = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [formData, setFormData] = useState({
    phoneNumber: "",
    password: "",
  })

  // ✅ Get user from Redux store
  const user = useSelector((state) => state.user.user)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    setSuccess("")

    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/user/login",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,  // Required for session cookies
        }
      );

      // ✅ Store user in Redux state
      dispatch(setUser(response.data.farmer)); // Fix here
      console.log(user)
      setSuccess("Logged in successfully!")
      console.log("Login successful:", response.data)

      // ✅ Redirect to home after login
      navigate("/")
    } catch (error) {
      setError(error.response?.data?.message || "An error occurred during login.")
      console.error("Login error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-100 to-white p-8 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-xl shadow-md overflow-hidden p-8">
        <h1 className="text-3xl font-bold text-center text-orange-600 mb-6">Farmer Login</h1>
  
        <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Phone Number Input */}
            <div>
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                className="block w-full px-4 py-2 mt-1 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                required
              />
            </div>
  
            {/* Password Input */}
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
  
            {/* Login Button */}
            <div>
              <button
                type="submit"
                className="w-full px-4 py-2 text-sm font-medium text-white bg-orange-600 border border-transparent rounded-md hover:bg-orange-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-orange-500"
                disabled={isLoading}
              >
                {isLoading ? "Logging in..." : "Login"}
              </button>
            </div>
          </form>
        </motion.div>
  
        {/* Error Message */}
        {error && (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 text-red-600 text-center">
            {error}
          </motion.p>
        )}
  
        {/* Success Message */}
        {success && (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 text-green-600 text-center">
            {success}
          </motion.p>
        )}
  
        {/* User Info Section */}
        {user && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-6 p-4 bg-gray-100 rounded-md"
          >
            <h2 className="text-xl font-semibold mb-2">Welcome, {user.fullname.firstname}!</h2>
            <p className="text-sm text-gray-600">Phone: {user.phoneNumber}</p>
            <p className="text-sm text-gray-600">Email: {user.email}</p>
          </motion.div>
        )}
  
        {/* Sign Up Link */}
        <div className="mt-6 text-center">
          <p className="text-gray-600 text-sm">
            Not made an account?{" "}
            <button
              onClick={() => navigate("/aadhar")} // Replace with your sign-up navigation logic
              className="text-orange-600 font-semibold hover:underline"
            >
              Sign Up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
  
}

export default FarmerLogin
