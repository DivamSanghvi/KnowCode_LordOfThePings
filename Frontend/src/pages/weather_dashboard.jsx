// import React, { useState, useEffect } from "react"
// import axios from "axios"
// import { motion } from "framer-motion"
// import WeatherChart from "./chart"


// const WeatherDashboard = ({latitude,longitude}) => {
//   const [weatherData, setWeatherData] = useState(null)
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState(null)
//   const [selectedField, setSelectedField] = useState("humidity")

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.post("http://localhost:8000/api/v1/user/getGraph", {
//           latitude,
//           longitude,
//         })
//         setWeatherData(response.data.data)
//         setLoading(false)
//       } catch (err) {
//         setError("Failed to fetch weather data")
//         setLoading(false)
//       }
//     }

//     fetchData()
//   }, [])

//   if (loading) return <div className="text-center text-2xl text-orange-500">Loading...</div>
//   if (error) return <div className="text-center text-2xl text-red-500">{error}</div>

//   const fields = ["humidity", "temp", "pressure", "speed"]

//   return (
//     <div className="min-h-screen bg-gray-100 p-8">
//       <motion.h1
//         initial={{ opacity: 0, y: -50 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//         className="text-4xl font-bold text-center mb-8 text-orange-500"
//       >
//         Weather Dashboard
//       </motion.h1>

//       <div className="flex justify-center space-x-4 mb-8">
//         {fields.map((field) => (
//           <motion.button
//             key={field}
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             onClick={() => setSelectedField(field)}
//             className={`px-4 py-2 rounded-full text-lg font-semibold transition-colors duration-200 ${
//               selectedField === field ? "bg-orange-500 text-white" : "bg-white text-orange-500 hover:bg-orange-100"
//             }`}
//           >
//             {field.charAt(0).toUpperCase() + field.slice(1)}
//           </motion.button>
//         ))}
//       </div>

//       <motion.div
//         key={selectedField}
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//       >
//         <WeatherChart data={weatherData} field={selectedField} />
//       </motion.div>
//     </div>
//   )
// }

// export default WeatherDashboard



import React, { useState, useEffect, useMemo } from "react"
import axios from "axios"
import { motion, AnimatePresence } from "framer-motion"
import WeatherChart from "./chart"


const WeatherDashboard = ({ latitude, longitude }) => {
  const [weatherData, setWeatherData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedField, setSelectedField] = useState("humidity")
  const [timeframe, setTimeframe] = useState("3h")

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post("http://localhost:8000/api/v1/user/getGraph", {
          latitude,
          longitude,
        })
        setWeatherData(response.data.data)
        setLoading(false)
      } catch (err) {
        setError("Failed to fetch weather data")
        setLoading(false)
      }
    }

    fetchData()
  }, [latitude, longitude])

  const fields = ["humidity", "temp", "pressure", "speed"]
  const timeframes = [
    { value: "3h", label: "3 Hours" },
    { value: "6h", label: "6 Hours" },
    { value: "12h", label: "12 Hours" },
    { value: "1d", label: "1 Day" },
  ]

  const filteredData = useMemo(() => {
    if (!weatherData) return null

    const hourMap = {
      "3h": 1,
      "6h": 2,
      "12h": 4,
      "1d": 8,
    }

    return {
      ...weatherData,
      list: weatherData.list.filter((_, index) => index % hourMap[timeframe] === 0),
    }
  }, [weatherData, timeframe])

  if (loading) return <div className="text-center text-2xl text-orange-500">Loading...</div>
  if (error) return <div className="text-center text-2xl text-red-500">{error}</div>

  return (
    <div className="min-h-screen bg-black p-8">
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold text-center mb-8 text-orange-500"
      >
        Weather Dashboard
      </motion.h1>

      <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4 mb-8">
        <div className="flex justify-center space-x-2">
          {fields.map((field) => (
            <motion.button
              key={field}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedField(field)}
              className={`px-4 py-2 rounded-full text-lg font-semibold transition-colors duration-200 ${
                selectedField === field ? "bg-orange-500 text-white" : "bg-white text-orange-500 hover:bg-orange-100"
              }`}
            >
              {field.charAt(0).toUpperCase() + field.slice(1)}
            </motion.button>
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative"
        >
          <select
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value)}
            className="appearance-none bg-white text-orange-500 border border-orange-500 rounded-full px-4 py-2 pr-8 leading-tight focus:outline-none focus:border-orange-600"
          >
            {timeframes.map((tf) => (
              <option key={tf.value} value={tf.value}>
                {tf.label}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-orange-500">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </motion.div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={`${selectedField}-${timeframe}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
        >
          <WeatherChart data={filteredData} field={selectedField} />
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default WeatherDashboard

