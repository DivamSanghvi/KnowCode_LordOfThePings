// import React, { useMemo } from "react"
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
// import { motion } from "framer-motion"

// const WeatherChart = ({ data, field }) => {
//   const chartData = useMemo(() => {
//     return data.list.map((item) => ({
//       time: new Date(item.dt * 1000).toLocaleString(),
//       [field]: item.main[field] || item.wind[field] || item[field],
//     }))
//   }, [data, field])

//   const getColor = (field) => {
//     const colors = {
//       humidity: "#3498db",
//       temp: "#e74c3c",
//       pressure: "#2ecc71",
//       speed: "#f39c12",
//       default: "#9b59b6",
//     }
//     return colors[field] || colors.default
//   }

//   const color = getColor(field)

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 50 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//       className="bg-white rounded-lg shadow-lg p-6 mb-8"
//     >
//       <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
//         {field.charAt(0).toUpperCase() + field.slice(1)} Chart
//       </h2>
//       <ResponsiveContainer width="100%" height={400}>
//         <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
//           <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
//           <XAxis
//             dataKey="time"
//             stroke="#333"
//             tick={{ fill: "#333", fontSize: 12 }}
//             tickFormatter={(time) => new Date(time).toLocaleDateString()}
//           />
//           <YAxis stroke="#333" tick={{ fill: "#333", fontSize: 12 }} />
//           <Tooltip
//             contentStyle={{ backgroundColor: "#fff", border: "1px solid #ccc", borderRadius: "4px" }}
//             labelStyle={{ color: "#333", fontWeight: "bold" }}
//           />
//           <Legend />
//           <defs>
//             <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
//               <stop offset="5%" stopColor={color} stopOpacity={0.8} />
//               <stop offset="95%" stopColor={color} stopOpacity={0} />
//             </linearGradient>
//           </defs>
//           <Line
//             type="monotone"
//             dataKey={field}
//             stroke={color}
//             strokeWidth={3}
//             dot={{ r: 4, fill: color }}
//             activeDot={{ r: 8 }}
//           />
//           <motion.rect
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 0.1 }}
//             transition={{ duration: 1, delay: 0.5 }}
//             x="0%"
//             y="0"
//             width="100%"
//             height="100%"
//             fill="url(#colorGradient)"
//           />
//         </LineChart>
//       </ResponsiveContainer>
//     </motion.div>
//   )
// }

// export default WeatherChart



import React, { useMemo } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { motion } from "framer-motion"

const WeatherChart = ({ data, field }) => {
  if (!data || !data.list) return null

  const chartData = data.list.map((item) => {
    const date = new Date(item.dt * 1000)
    return {
      fullDate: date,
      date: date.toLocaleDateString(),
      time: date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      [field]: item.main[field] || item.wind[field] || item[field],
    }
  })

  // Calculate min and max values with useMemo for performance
  const { minValue, maxValue } = useMemo(() => {
    const values = chartData.map((item) => item[field])
    const min = Math.min(...values)
    const max = Math.max(...values)
    return { minValue: min, maxValue: max }
  }, [chartData, field])

  // Calculate the domain padding (5% of the data range)
  const range = maxValue - minValue
  const padding = range * 0.05
  const yDomain = [Math.floor(minValue - padding), Math.ceil(maxValue + padding)]

  const getColor = (field) => {
    const colors = {
      humidity: "#3498db",
      temp: "#e74c3c",
      pressure: "#2ecc71",
      speed: "#f39c12",
    }
    return colors[field] || "#9b59b6"
  }

  const color = getColor(field)

  // Format Y-axis ticks based on the value range
  const formatYAxis = (value) => {
    const absValue = Math.abs(value)
    if (absValue >= 1000) {
      // For large numbers like pressure
      return value.toLocaleString()
    } else if (range < 1) {
      // For decimal values
      return value.toFixed(2)
    } else if (range < 10) {
      // For small ranges
      return value.toFixed(1)
    } else {
      // For normal ranges
      return value.toFixed(0)
    }
  }

  // Format tooltip values
  const formatTooltipValue = (value) => {
    if (typeof value !== "number") return value
    const absValue = Math.abs(value)
    if (absValue >= 1000) {
      return value.toLocaleString()
    } else if (range < 1) {
      return value.toFixed(2)
    } else if (range < 10) {
      return value.toFixed(1)
    } else {
      return value.toFixed(0)
    }
  }

  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const date = new Date(label)
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="text-sm font-medium text-gray-600">
            {date.toLocaleDateString([], { month: "short", day: "numeric", year: "numeric" })}
          </p>
          <p className="text-sm font-medium text-gray-600">
            {date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </p>
          <p className="text-sm font-bold text-gray-800">
            {`${field.charAt(0).toUpperCase() + field.slice(1)}: ${formatTooltipValue(payload[0].value)}`}
          </p>
        </div>
      )
    }
    return null
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-lg shadow-lg p-6 mb-8"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
        {field.charAt(0).toUpperCase() + field.slice(1)} Chart
      </h2>
      <div className="text-sm text-gray-500 text-center mb-4">
        Range: {formatTooltipValue(minValue)} - {formatTooltipValue(maxValue)}
      </div>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#ccc" opacity={0.5} />
          <XAxis
            dataKey="fullDate"
            stroke="#333"
            tick={{ fill: "#333", fontSize: 12 }}
            tickFormatter={(time) =>
              new Date(time).toLocaleString([], {
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })
            }
            interval="preserveStartEnd"
          />
          <YAxis
            stroke="#333"
            tick={{ fill: "#333", fontSize: 12 }}
            domain={yDomain}
            tickFormatter={formatYAxis}
            width={60}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <defs>
            <linearGradient id={`colorGradient-${field}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.8} />
              <stop offset="95%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          <Line
            type="monotone"
            dataKey={field}
            stroke={color}
            strokeWidth={3}
            dot={{ r: 4, fill: color }}
            activeDot={{ r: 8 }}
            isAnimationActive={true}
            animationDuration={1000}
            animationBegin={200}
          />
          <motion.rect
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.1 }}
            transition={{ duration: 1, delay: 0.5 }}
            x="0%"
            y="0"
            width="100%"
            height="100%"
            fill={`url(#colorGradient-${field})`}
          />
        </LineChart>
      </ResponsiveContainer>
    </motion.div>
  )
}

export default WeatherChart





