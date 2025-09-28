import React, { useEffect, useState } from "react";
import axios from "axios";



// const FieldDashboard = () => {
//     const farmerID = "67938155990ec09219d061a5"; 

//     useEffect(() => {
//       const fetchFields = async () => {
//         try {
//           const response = await axios.get(
//             `http://localhost:8000/api/v1/user/getFields/${farmerID}`
//           );
//           console.log("Fields Data:", response.data);
//         } catch (error) {
//           console.error("Error fetching fields:", error);
//         }
//       };
  
//       fetchFields();
//     }, []);
//   return (
//     <div>fieldDashboard</div>
//   )
// }

// export default FieldDashboard


import { motion } from "framer-motion"
import WeatherDashboard from "./weather_dashboard";


const FieldDashboard = () => {
  const [fields, setFields] = useState([])
  const [selectedField, setSelectedField] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const farmerID = "67938155990ec09219d061a5"

  useEffect(() => {
    const fetchFields = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/v1/user/getFields/${farmerID}`)
        setFields(response.data)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching fields:", error)
        setError("Failed to fetch fields data")
        setLoading(false)
      }
    }

    fetchFields()
  }, [])

  const handleFieldChange = (event) => {
    const field = fields.find((f) => f.field_name === event.target.value)
    setSelectedField(field)
  }

  if (loading)
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex justify-center items-center h-screen bg-black"
      >
        <div className="text-3xl text-orange-500 font-bold">Loading...</div>
      </motion.div>
    )

  if (error)
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex justify-center items-center h-screen bg-black"
      >
        <div className="text-3xl text-red-500 font-bold">{error}</div>
      </motion.div>
    )

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold text-center mb-8 text-orange-500"
      >
        Field Weather Dashboard
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mb-8"
      >
        <label htmlFor="field-select" className="block text-lg font-medium text-orange-500 mb-2">
          Select a Field:
        </label>
        <select
          id="field-select"
          onChange={handleFieldChange}
          className="w-full p-2 bg-white text-black border border-orange-500 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
        >
          <option value="">Choose a field</option>
          {fields.map((field) => (
            <option key={field._id} value={field.field_name}>
              {field.field_name}
            </option>
          ))}
        </select>
      </motion.div>

      {selectedField && (
        <motion.div
          key={selectedField._id}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-lg shadow-lg p-6"
        >
          <h2 className="text-2xl font-bold text-orange-500 mb-4">
            {selectedField.field_name} - {selectedField.crop}
          </h2>
          <p className="text-black mb-4">Area: {selectedField.area.toFixed(2)} sq units</p>
          <WeatherDashboard latitude={selectedField.path[0][0]} longitude={selectedField.path[0][1]} />
        </motion.div>
      )}

      {!selectedField && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center text-xl text-orange-500"
        >
          Please select a field to view its weather data.
        </motion.div>
      )}
    </div>
  )
}

export default FieldDashboard

