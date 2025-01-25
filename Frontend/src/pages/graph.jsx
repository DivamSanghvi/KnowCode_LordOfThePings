import React, { useState, useEffect } from "react"
import axios from "axios"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { motion } from "framer-motion"

const WeatherGraphs = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [activeGraph, setActiveGraph] = useState("humidity")

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post("http://localhost:8000/api/v1/user/getGraph", {
            latitude: 17.0101,
            longitude: 8.09,
          });

        const processedData = response.data.data.list.map((item) => ({
          time: new Date(item.dt * 1000).toLocaleTimeString(),
          humidity: item.main.humidity,
          windSpeed: item.wind.speed,
          temperature: item.main.temp - 273.15, // Convert Kelvin to Celsius
        }))
        setData(processedData)
        setLoading(false)
      } catch (err) {
        setError("Failed to fetch weather data")
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const graphConfig = {
    humidity: { key: "humidity", color: "#FFA500", unit: "%" },
    windSpeed: { key: "windSpeed", color: "#FF4500", unit: "m/s" },
    temperature: { key: "temperature", color: "#FF8C00", unit: "°C" },
  }

  const buttonVariants = {
    hover: { scale: 1.05, transition: { duration: 0.2 } },
    tap: { scale: 0.95, transition: { duration: 0.2 } },
  }

  const graphVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  if (loading) return <div className="text-center text-2xl text-orange-500">Loading...</div>
  if (error) return <div className="text-center text-2xl text-red-500">{error}</div>

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-4xl font-bold text-center mb-8 text-orange-500">Weather Graphs</h1>
      <div className="flex justify-center space-x-4 mb-8">
        {Object.keys(graphConfig).map((type) => (
          <motion.button
            key={type}
            className={`px-4 py-2 rounded-full text-lg font-semibold ${
              activeGraph === type ? "bg-orange-500 text-white" : "bg-white text-black"
            }`}
            onClick={() => setActiveGraph(type)}
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </motion.button>
        ))}
      </div>
      <motion.div
        className="bg-white rounded-lg shadow-lg p-4"
        variants={graphVariants}
        initial="hidden"
        animate="visible"
      >
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis dataKey="time" stroke="#333" />
            <YAxis stroke="#333" />
            <Tooltip contentStyle={{ backgroundColor: "#333", border: "none" }} labelStyle={{ color: "#FFA500" }} />
            <Line
              type="monotone"
              dataKey={graphConfig[activeGraph].key}
              stroke={graphConfig[activeGraph].color}
              strokeWidth={3}
              dot={false}
              animationDuration={1500}
            />
          </LineChart>
        </ResponsiveContainer>
        <motion.p
          className="text-center text-lg font-semibold mt-4 text-black"
          key={activeGraph}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {activeGraph.charAt(0).toUpperCase() + activeGraph.slice(1)} ({graphConfig[activeGraph].unit})
        </motion.p>
      </motion.div>
    </div>
  )
}

export default WeatherGraphs

