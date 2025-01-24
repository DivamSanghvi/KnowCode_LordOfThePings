import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaSearch, FaExternalLinkAlt } from 'react-icons/fa'
import HeroAndComparison from '../components/other/ProductHero'

const ProductSearchAndResults = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [searchResults, setSearchResults] = useState(null)

  const handleSearch = async (e) => {
    e.preventDefault();
    setIsLoading(true);
  
    try {
      // Make a POST request with productName in the body
      const response = await fetch('http://localhost:8000/api/v1/user/product', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Ensure the server knows you're sending JSON
        },
        body: JSON.stringify({
          productName: searchTerm, // Send the product name in the request body
        }),
      });
  
      // Handle non-OK responses
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
  
      if (data.success) {
        setSearchResults(data.data); // Set products from the API response
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      console.error('Error fetching data:', error.message);
      setSearchResults([]); // In case of error, set an empty result
    }
  
    setIsLoading(false);
  };
  

  return (
    <div className="min-h-screen bg-black text-white">
      <HeroAndComparison />
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold mb-8 text-center text-orange-500"
          >
            Find Your Perfect Seeds
          </motion.h1>
          <motion.form
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            onSubmit={handleSearch}
            className="flex justify-center mb-12"
          >
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Enter product type..."
              className="px-4 py-2 w-full max-w-md text-black rounded-l-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <button
              type="submit"
              className="bg-orange-500 text-white px-6 py-2 rounded-r-md hover:bg-orange-600 transition-colors duration-300 flex items-center"
            >
              <FaSearch className="mr-2" />
              Search
            </button>
          </motion.form>

          <AnimatePresence>
            {isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  className="w-16 h-16 border-t-4 border-orange-500 border-solid rounded-full inline-block mb-4"
                />
                <p className="text-xl">We are getting the best product list for you...</p>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {searchResults && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-2xl font-semibold mb-6 text-orange-500">Search Results:</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {searchResults.length > 0 ? (
                    searchResults.map((product, index) => (
                      <motion.div
                        key={product.name}
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="bg-gray-900 rounded-lg overflow-hidden shadow-lg hover:shadow-orange-500/20 transition-shadow duration-300"
                      >
                        <div className="relative h-48">
                          <img
                            src={`https://api.microlink.io?url=${encodeURIComponent(product.link)}&screenshot=true&meta=false&embed=screenshot.url`}
                            alt={product.name}
                            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                          />
                        </div>
                        <div className="p-6">
                          <h3 className="text-xl font-semibold mb-2 text-orange-500">{product.name}</h3>
                          <p className="text-gray-300 mb-4">{product.description}</p>
                          <a
                            href={product.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-orange-500 hover:text-orange-400 transition-colors duration-300"
                          >
                            Visit Website
                            <FaExternalLinkAlt className="ml-2" />
                          </a>
                        </div>
                      </motion.div>
                    ))
                  ) : (
                    <p className="text-center text-white">No products found for your search.</p>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  )
}

export default ProductSearchAndResults
