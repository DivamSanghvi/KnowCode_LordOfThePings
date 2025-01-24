import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Farmer from "../../models/Farmer.model.js";
import axios from 'axios';
import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from 'fs/promises'; 

const gemini_api_key = process.env.GEMINI_API_KEY;
const googleAI = new GoogleGenerativeAI(gemini_api_key);

const geminiConfig = {
    temperature: 0.9,
    topP: 1,
    topK: 1,
    maxOutputTokens: 4096,
  };
  
  const geminiModel = googleAI.getGenerativeModel({
    model: "gemini-pro", // Model to use (can be 'gemini-pro' or other available models)
    geminiConfig,
});

export const signup = async (req, res) => {
  try {
    const {
      fullname,
      phoneNumber,
      aadharCard,
      email,
      address,
      landDetails,
      preferredCrops,
      farmingExperience,
      equipmentOwned,
      climaticDetails,
      password,
    } = req.body;

    // Check if the farmer already exists by phone number
    const existingFarmer = await Farmer.findOne({ phoneNumber });
    if (existingFarmer) {
      return res
        .status(400)
        .json({ message: "Farmer already exists with this phone number." });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save new farmer
    const newFarmer = new Farmer({
      fullname,
      phoneNumber,
      aadharCard,
      email,
      address,
      landDetails,
      preferredCrops,
      farmingExperience,
      equipmentOwned,
      climaticDetails,
      password: hashedPassword,
    });

    await newFarmer.save();

    res.status(201).json({ message: "Farmer registered successfully!" });
  } catch (error) {
    console.error("Error during signup:", error.message);
    res.status(500).json({ message: "Error during signup", error: error.message });
  }
};

export const login = async (req, res) => {
    try {
      const { phoneNumber, password } = req.body;
  
      // Find the farmer by phone number
      const farmer = await Farmer.findOne({ phoneNumber });
      if (!farmer) {
        return res.status(404).json({ message: "Farmer not found." });
      }
  
      // Compare the password
      const isPasswordValid = await bcrypt.compare(password, farmer.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid credentials." });
      }
  
      // Generate tokens
      const accessToken = jwt.sign(
        { id: farmer._id, phoneNumber: farmer.phoneNumber },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
      );
  
      const refreshToken = jwt.sign(
        { id: farmer._id, phoneNumber: farmer.phoneNumber },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
      );
  
      // Store the tokens in cookies
      res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000, // 1 day
      });
  
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 10 * 24 * 60 * 60 * 1000, // 10 days
      });
  
      res.status(200).json({ message: "Logged in successfully!" });
    } catch (error) {
      res.status(500).json({ message: "Error during login", error: error.message });
    }
  };


  export const askGemini = async (req, res) => {
    const { question } = req.body;
  
    if (!question) {
      return res.status(400).json({ message: 'Question is required' });
    }
  
    try {
      // Generate content from the Gemini model
      const result = await geminiModel.generateContent(question);
      const response = result.response;
  
      // Send back the response to the client
      return res.json({
        success: true,
        data: response.text(), // Assuming the response contains text
      });
    } catch (error) {
      console.error('Error with Gemini API:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to get a response from Gemini API',
      });
    }
  };


  const geminiModelVision = googleAI.getGenerativeModel({
    model: "gemini-1.5-flash", // Model to use (can be 'gemini-pro' or other available models)
    geminiConfig,
});

export const analyzePlantDisease = async (req, res) => {
    console.log(req.files);  // Log the entire req.files object to inspect

    // Check if the image file exists in req.files
    const imageLocalPath = req.files?.photo && req.files.photo.length > 0 
        ? req.files.photo[0].path 
        : null;

    if (!imageLocalPath) {
        return res.status(400).json({ message: 'No image file uploaded' });
    }

    try {
        // Read the uploaded image file and convert it to base64 using fs.promises.readFile
        const imageFile = await fs.readFile(imageLocalPath);  // Using fs.promises.readFile
        const imageBase64 = imageFile.toString("base64");

        // Prepare the prompt for the Gemini model
        const promptConfig = [
          {
            text: `Analyze the plant disease in this image and describe the following details in the exact JSON format:
            {
              disease: "<Disease Name>",
              confidence: <Confidence Percentage>,
              description: "<Brief description of the disease, its symptoms, and affected areas>",
              cause: "<Cause of the disease (e.g., fungal pathogen, environmental factors)>",
              solutions: [
                { title: "<Solution Title>", description: "<Detailed description of the solution>" },
                ...
              ],
              precautions: [
                "<Precaution 1>",
                "<Precaution 2>",
                ...
              ]
            }
            Note: Provide the response exactly as shown in the JSON format above. The first words should mention the disease directly without any line breaks. Be sure to include the cause, possible solutions with their descriptions, and precautions for managing or preventing the disease. Avoid any extra formatting or text.`
          },
          {
            inlineData: {
              mimeType: "image/jpeg",  // Assuming the image is in JPEG format
              data: imageBase64, // Base64 encoded image data
            },
          },
        ];
        

        // Send the image to Gemini for analysis
        const result = await geminiModelVision.generateContent({
            contents: [{ role: "user", parts: promptConfig }],
        });

        // Get the response from Gemini
        const response = await result.response;

        // Send back the analysis response
        return res.json({
            success: true,
            data: response.text(), // Assuming the response contains text
        });
    } catch (error) {
        console.error('Error analyzing plant disease:', error);
        return res.status(500).json({
            success: false,
            message: 'Failed to analyze the plant disease',
        });
    }
};

export const getCropLifeCycle = async (req, res) => {
  const { farmerId } = req.params; // Assuming the farmer's ID is provided in the request params

  try {
    // Fetch farmer details from the database
    const farmer = await Farmer.findById(farmerId);
    if (!farmer) {
      return res.status(404).json({
        success: false,
        message: "Farmer not found",
      });
    }

    // Extract necessary information for crop life cycle prediction
    const { fullname, landDetails, climaticDetails, preferredCrops, farmingExperience, equipmentOwned } = farmer;

    // Prepare the prompt for the Gemini model
    const promptConfig = [
      {
        text: `Generate the crop life cycle for a farmer based on the following information .The response should be structured as follows:
          Farmer Details:
            Name: ${fullname.firstname} ${fullname.lastname}
            Farming Experience: ${farmingExperience} years
            Equipment Owned: ${equipmentOwned.join(", ")}
          Land Details:
            Size: ${landDetails.landSize} acres
            Soil Type: ${landDetails.soilType}
            Irrigation Type: ${landDetails.irrigationType}
          Climatic Details:
            Average Rainfall: ${climaticDetails.averageRainfall} mm
            Temperature Range: ${climaticDetails.temperatureRange.min}°C - ${climaticDetails.temperatureRange.max}°C
          Preferred Crops: ${preferredCrops.join(", ")}
        
          The response should contain the following details:
          {
            "farmer": {
              "name": "<Farmer's Name>",
              "landDetails": {
                "size": "<Land Size>",
                "irrigationType": "<Irrigation Type>",
                "soilType": "<Soil Type>",
                "preferredCrops": ["<Preferred Crop 1>", "<Preferred Crop 2>"],
                "farmingExperience": "<Years>",
                "equipmentOwned": ["<Equipment 1>", "<Equipment 2>"]
              },
              "climaticDetails": {
                "averageRainfall": "<Average Rainfall>",
                "temperatureRange": {
                  "min": "<Min Temperature>",
                  "max": "<Max Temperature>"
                }
              }
            },
            "cropLifecycle": [
              {
                "phase": "January-March",
                "time": "<Month Range>",
                "actions": ["<Action 1 minimum 50 words>", "<Action 2>"],
                "resources": ["<Resource 1 minimum 10 words>", "<Resource 2>"]
              },
              {
                "phase": "April-June",
                "time": "<Month Range>",
                "actions": ["<Action 1 minimum 50 words>", "<Action 2>"],
                "resources": ["<Resource 1 minimum 10 words>", "<Resource 2>"]
              },
              {
                "phase": "July-August",
                "time": "<Month Range>",
                "actions": ["<Action 1 minimum 50 words>", "<Action 2>"],
                "resources": ["<Resource 1 minimum 10 words>", "<Resource 2>"]
              },
              {
                "phase": "September-October",
                "time": "<Month Range>",
                "actions": ["<Action 1 minimum 50 words>", "<Action 2>"],
                "resources": ["<Resource 1 minimum 10 words>", "<Resource 2>"]
              },
              {
                "phase": "November-December",
                "time": "<Month Range>",
                "actions": ["<Action 1 minimum 50 words>", "<Action 2>"],
                "resources": ["<Resource 1 minimum 10 words>", "<Resource 2>"]
              }
            ],
            "challenges": ["<Challenge 1>", "<Challenge 2>", "<Challenge 3>", "<Challenge 4>", "<Challenge 5>"],
            "expectedProfitMargin": "<Profit Margin>"
          }`
      }
    ];
    

    // Assuming geminiModelVision is correctly initialized
    const result = await geminiModelVision.generateContent({
      contents: [{ role: "user", parts: promptConfig }],
    });

    // Assuming the result has a `text` property directly
    const response = result.response ? result.response.text() : "No response from model";

    // Send the response back as JSON
    return res.json({
      success: true,
      data: response, // Directly use the text or content you want
    });
  } catch (error) {
    console.error("Error fetching crop life cycle:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to retrieve crop life cycle data",
    });
  }
};



const API_KEY = 'fc32fda44f3ca783a9f051b2ef9b9877';
const BASE_URL = 'http://api.openweathermap.org/data/2.5/weather';

export const getWeatherByPincode = async (req, res) => {
  const pincode = req.params.pincode;
  const countryCode = 'IN'; // India

  // Construct the API URL
  const url = `${BASE_URL}?zip=${pincode},${countryCode}&appid=${API_KEY}&units=metric`;

  try {
    const response = await axios.get(url);
    const weatherData = response.data;

    // Structure the response
    const weatherInfo = {
      location: weatherData.name,
      temperature: weatherData.main.temp,
      weather: weatherData.weather[0].description,
      humidity: weatherData.main.humidity,
      windSpeed: weatherData.wind.speed,
    };

    res.json({
      success: true,
      data: weatherInfo,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch weather data.',
    });
  }
};

export const analyzeCattleDisease = async (req, res) => {
  console.log(req.files); // Log the entire req.files object to inspect

  // Check if the image file exists in req.files
  const imageLocalPath = req.files?.photo && req.files.photo.length > 0 
      ? req.files.photo[0].path 
      : null;

  if (!imageLocalPath) {
      return res.status(400).json({ message: 'No image file uploaded' });
  }

  try {
      // Read the uploaded image file and convert it to base64 using fs.promises.readFile
      const imageFile = await fs.readFile(imageLocalPath); // Using fs.promises.readFile
      const imageBase64 = imageFile.toString("base64");

      // Prepare the prompt for the Gemini model
      const promptConfig = [
        {
          text: `Analyze the cattle disease shown in this image and provide the following details in the exact JSON format:
          {
            disease: "<Disease Name>",
            confidence: <Confidence Percentage>,
            description: "<Brief description of the disease, its symptoms, and affected areas atleast 50 words>",
            cause: "<Cause of the disease (e.g., bacterial infection, viral infection, environmental factors)>",
            solutions: [
              { title: "<Solution Title> ", description: "<Detailed description of the solution atleast 50 words>" },
              ...
            ],
            precautions: [
              "<Precaution 1 atleast 50 words>",
              "<Precaution 2 atleast 50 words>",
              ...
            ]
          }
          Note: Provide the response exactly as shown in the JSON format above. Begin with the disease name directly without any line breaks. Include details such as cause, potential solutions, and precautions for managing or preventing the disease. Avoid adding extra formatting or text.`
        },
        {
          inlineData: {
            mimeType: "image/jpeg", // Assuming the image is in JPEG format
            data: imageBase64, // Base64 encoded image data
          },
        },
      ];

      // Send the image to Gemini for analysis
      const result = await geminiModelVision.generateContent({
          contents: [{ role: "user", parts: promptConfig }],
      });

      // Get the response from Gemini
      const response = await result.response;

      // Send back the analysis response
      return res.json({
          success: true,
          data: response.text(), // Assuming the response contains text
      });
  } catch (error) {
      console.error('Error analyzing cattle disease:', error);
      return res.status(500).json({
          success: false,
          message: 'Failed to analyze the cattle disease',
      });
  }
};

export const productLinks = async (req, res) => {
  const { productName } = req.body; // Get the product name from the request body

  if (!productName) {
    return res.status(400).json({ message: 'Product name is required' });
  }

  try {
    // Prepare the prompt for Gemini model to return 10 products with company landing page links
    const promptConfig = [
      {
        text: `Given the product name "${productName}", please return a JSON response with 10 products in the following format:
        [
          {
            "name": "<Product Name>",
            "link": "<URL link to the company landing page, not the product page (e.g., https://www.companyname.com)>",
            "description": "<Short description of the product, at least 50 words>",
          },
          ...
        ]
        Note: The response should strictly follow the format above. Provide the name, company landing page link (not the product page), and a short description for 10 products. Each product should have its own entry. Do not include any extra information or formatting.`
      }
    ];

    // Generate content from Gemini model using the prepared prompt
    const result = await geminiModel.generateContent({
      contents: [{ role: "user", parts: promptConfig }],
    });

    // Get the response from Gemini
    const response = await result.response;

    // Parse and send back the JSON response with 10 product details
    const products = JSON.parse(response.text());
    
    if (products.length !== 10) {
      return res.status(500).json({
        success: false,
        message: 'Gemini API returned less than 10 products.',
      });
    }

    // Map the URLs to the landing page only (removing product-specific paths if needed)
    const updatedProducts = products.map(product => {
      const landingPageLink = product.link.split('/')[0] + '//' + product.link.split('/')[2]; // Extract company landing page
      return {
        ...product,
        link: landingPageLink,
      };
    });

    return res.json({
      success: true,
      data: updatedProducts, // Array of 10 products with company landing page links
    });
  } catch (error) {
    console.error('Error with Gemini API:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to get a response from Gemini API',
    });
  }
};



  