import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Farmer from "../../models/Farmer.model.js";
import Field from "../../models/Field.js";
import axios from 'axios';
import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from 'fs/promises'; 
import { log } from "console";
import mongoose from "mongoose";

const gemini_api_key = process.env.GEMINI_API_KEY;
const googleAI = new GoogleGenerativeAI(gemini_api_key);

const geminiConfig = {
    temperature: 0.9,
    topP: 1,
    topK: 1,
    maxOutputTokens: 4096,
  };
  
  const geminiModel = googleAI.getGenerativeModel({
    model: "gemini-1.5-flash", // Model to use (can be 'gemini-pro' or other available models)
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
      console.log(req.body);
      const { phoneNumber, password } = req.body;

      // Find the farmer by phone number
      const farmer = await Farmer.findOne({ phoneNumber: phoneNumber.toString() });

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

      // Remove sensitive data before sending response
      const { password: _, ...farmerData } = farmer.toObject();

      res.status(200).json({ message: "Logged in successfully!", farmer: farmerData });
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



// const API_KEY = 'fc32fda44f3ca783a9f051b2ef9b9877';
const API_KEY = 'b8c863bb8e3ff5a9c148db1f34c78e66';
const BASE_URL = 'http://api.openweathermap.org/data/2.5/weather';

const getWeatherByPincode = async (pincode) => {
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
      minTemp: weatherData.main.temp_min,
      maxTemp: weatherData.main.temp_max
    };

    return weatherInfo;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch weather data.');
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

export const getLocation = async (req,res) => {
  const {latitude,longitude,area, path, crop, field_name, farmer_id} = req.body;
  if(!latitude || !longitude || !area){
    return res.status(400).json({message: "Error receiving latitude and longitude"});
  }

  // const url = `${BASE_URL}?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;
  
  // const url = `https://api.openweathermap.org/data/2.5/weather?lat=55.86515&lon=-4.25763&appid=${API_KEY}`
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`


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

    res.status(200).json({
      success: true,
      data: weatherData,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch weather data.',
    });
  }


  try {
    const newField = new Field({
      user_id: farmer_id, 
      field_name,
      crop,
      path,
      area,
    });

    const savedField = await newField.save();

    console.log('Field saved:', savedField);
  } catch (error) {
    console.error('Error saving field:', error);
  }

  console.log(latitude,longitude,area,field_name,crop,path,farmer_id);
  console.log("hello");
  
  // return res.status(200).json({message:"good job"});
}

export const getGraph = async (req, res) => {

  const {latitude,longitude} = req.body;

  if(!latitude || !longitude){
    return res.status(400).json({message: "Error receiving latitude and longitude"});
  }
  const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`

  try {
    const response = await axios.get(url);
    const weatherData = response.data;

      res.status(200).json({
      success: true,
      data: weatherData,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch 5 day weather data.',
    });
  }
  
}




export const getFieldsByFarmer = async (req, res) => {
  try {
    const { farmerId } = req.params; // Assume the farmer's ID is passed as a route parameter
    console.log("getFieldsByFarmer called with farmerId:", farmerId);

    const fields = await Field.aggregate([
      {
        $match: { user_id: new mongoose.Types.ObjectId(farmerId) }, // Use 'new' with mongoose.Types.ObjectId
      },
      {
        $lookup: {
          from: "farmers", // The collection name for farmers
          localField: "user_id",
          foreignField: "_id",
          as: "farmerDetails",
        },
      },
      {
        $unwind: "$farmerDetails", // Flatten the farmer details array
      },
      {
        $project: {
          _id: 1,
          field_id: 1,
          field_name: 1,
          crop: 1,
          path: 1,
          area: 1,
          farmerDetails: {
            name: 1, // Adjust the fields to include from the farmerDetails
            contact: 1, // Example fields from the Farmer model
          },
        },
      },
    ]);

    if (fields.length === 0) {
      return res.status(404).json({ message: "No fields found for this farmer" });
    }

    res.status(200).json(fields);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};
export const extractPincodeFromAadhar = async (req, res) => {
  console.log(req.files); // Log the uploaded files for debugging

  // Ensure an Aadhaar image is uploaded
  const imageLocalPath = req.files?.aadhar && req.files.aadhar.length > 0
      ? req.files.aadhar[0].path
      : null;

  if (!imageLocalPath) {
      return res.status(400).json({ message: 'No Aadhaar card image uploaded' });
  }

  try {
      // Read and convert the image to base64
      const imageFile = await fs.readFile(imageLocalPath);
      const imageBase64 = imageFile.toString("base64");

      // Prepare the prompt for Gemini Vision API
      const promptConfig = [
          {
              text: `Extract the pincode from this Aadhaar card image. 
              The response should contain ONLY the 6-digit pincode and nothing else.`
          },
          {
              inlineData: {
                  mimeType: "image/jpeg", // Adjust based on the image type
                  data: imageBase64,
              },
          },
      ];

      // Send the image to Gemini for OCR processing
      const result = await geminiModelVision.generateContent({
          contents: [{ role: "user", parts: promptConfig }],
      });

      // Get text response
      const responseText = await result.response.text();

      // Extract 6-digit pincode using regex
      const pincodeMatch = responseText.match(/\b\d{6}\b/);
      const pincode = pincodeMatch ? pincodeMatch[0] : null;

      if (!pincode) {
          return res.status(400).json({ success: false, message: 'Could not extract pincode from Aadhaar card' });
      }

      // Send extracted pincode
      return res.json({ success: true, pincode });

  } catch (error) {
      console.error('Error extracting pincode:', error);
      return res.status(500).json({
          success: false,
          message: 'Failed to extract pincode from Aadhaar card',
      });
  }
};


export const farmerSignup = async (req, res) => {
  try {
    const {
      password, // New password field
      "landDetails.landSize": landSize,
      "landDetails.irrigationType": irrigationType,
      "landDetails.soilType": soilType,
      preferredCrops,
      farmingExperience,
      equipmentOwned,
    } = req.body;

    // Validate required fields
    if ( !password || !soilType || !farmingExperience) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    // Check if Aadhaar card image is uploaded
    const imageLocalPath = req.files?.photo && req.files.photo.length > 0
      ? req.files.photo[0].path
      : null;

    if (!imageLocalPath) {
      return res.status(400).json({ message: "Aadhaar card image is required for signup." });
    }

    // Read and convert image to base64
    const imageFile = await fs.readFile(imageLocalPath);
    const imageBase64 = imageFile.toString("base64");

    // Prepare prompt for Gemini Vision
    const promptConfig = [
      {
        text: `Extract the following details from the Aadhaar card image:
        - First Name
        - Last Name
        - Phone Number (if available it will be below address)
        - Aadhaar Card Number
        - Pincode
    
        Return the extracted details in **only** a structured JSON format as shown below:
        
        {
          "firstname": "<First Name>",
          "lastname": "<Last Name>",
          "phoneNumber": "<Phone Number or null if not present>",
          "aadharCard": "<12-digit Aadhaar Number>",
          "pincode": "<6-digit Pincode>"
        }
    
        **Important:**
        - Ensure **only** the JSON output is returned, with no additional text.
        - If a field is missing, set its value to **null**.
        - Extract only the relevant text from the Aadhaar card.
        - Do **not** include any other information or explanations.`,
      },
      {
        inlineData: {
          mimeType: "image/jpeg", // Adjust based on the image type
          data: imageBase64,
        },
      },
    ];

    // Send request to Gemini Vision for Aadhaar details extraction
    const result = await geminiModelVision.generateContent({
      contents: [{ role: "user", parts: promptConfig }],
    });

    const responseText = await result.response.text();
    console.log("Raw Response from Gemini:", responseText);

    let extractedDetails;
    try {
      // Extract JSON content using regex
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        extractedDetails = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error("No valid JSON found in Gemini response.");
      }
    } catch (error) {
      return res.status(400).json({ message: "Failed to parse Aadhaar card details from Gemini response." });
    }

    const { firstname, lastname, phoneNumber, aadharCard, pincode } = extractedDetails;

    if (!firstname || !lastname || !phoneNumber || !aadharCard || !pincode) {
      return res.status(400).json({ message: "Incomplete Aadhaar card details extracted." });
    }

    // Get weather details based on extracted pincode
    const weatherDetails = await getWeatherByPincode(pincode);
    console.log(weatherDetails);

    // Convert preferredCrops & equipmentOwned to arrays (handles comma-separated values)
    const cropsArray = preferredCrops ? preferredCrops.split(",").map((item) => item.trim()) : [];
    const equipmentArray = equipmentOwned ? equipmentOwned.split(",").map((item) => item.trim()) : [];

    // Construct structured data
    const landDetails = {
      landSize: landSize ? Number(landSize) : null,
      irrigationType,
      soilType, // Required field
    };

    const climaticDetails = {
      averageRainfall: 20, // Using temperature for averageRainfall (adjust based on your requirement)
      weather: weatherDetails.weather,
      humidity: weatherDetails.humidity,
      temperatureRange: {
        min: weatherDetails.minTemp, // You can adjust this as needed
        max: weatherDetails.maxTemp, // Adjust based on requirements
      },
    };

    // **Hash Password using bcrypt**
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create new Farmer record
    const newFarmer = new Farmer({
      fullname: { firstname, lastname },
      phoneNumber,
      aadharCard,
      password: hashedPassword, // Store hashed password
      pincode, // Save extracted pincode
      landDetails,
      preferredCrops: cropsArray,
      farmingExperience: Number(farmingExperience),
      equipmentOwned: equipmentArray,
      climaticDetails,
    });

    await newFarmer.save();

    return res.status(201).json({ 
      success: true, 
      message: "Farmer registered successfully", 
      farmer: {
        id: newFarmer._id,
        fullname: newFarmer.fullname,
        
        phoneNumber: newFarmer.phoneNumber,
        pincode: newFarmer.pincode,
        landDetails: newFarmer.landDetails,
        preferredCrops: newFarmer.preferredCrops,
        farmingExperience: newFarmer.farmingExperience,
        equipmentOwned: newFarmer.equipmentOwned,
        climaticDetails: newFarmer.climaticDetails,
      } // Exclude password from response
    });
  } catch (error) {
    console.error("Error during farmer signup:", error);
    return res.status(500).json({ success: false, message: "Signup failed due to server error." });
  }
};


const WEATHER_API_KEY = 'fc32fda44f3ca783a9f051b2ef9b9877';
const WEATHER_BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';
const COUNTRY_CODE = 'IN';

export const farmerSignup2 = async (req, res) => {
  try {
    console.log("Received Request Body:", req.body);

    // Convert to plain object if necessary
    const parsedBody = JSON.parse(JSON.stringify(req.body));

    // Manually reconstruct nested objects (if keys are flattened)
    const landDetails = {
      landSize: parsedBody["landDetails.landSize"] || null,
      irrigationType: parsedBody["landDetails.irrigationType"] || null,
      soilType: parsedBody["landDetails.soilType"] || null,
    };

    const climaticDetails = {
      averageRainfall: parsedBody["climaticDetails.averageRainfall"] || null,
      temperatureRange: {
        min: parsedBody["climaticDetails.temperatureRange.min"] || null,
        max: parsedBody["climaticDetails.temperatureRange.max"] || null,
      },
    };

    const {
      firstname,
      lastname,
      phoneNumber,
      aadharCard,
      email,
      preferredCrops,
      farmingExperience,
      equipmentOwned,
    } = parsedBody;

    if (!firstname || !lastname || !phoneNumber || !aadharCard || !landDetails.soilType || !farmingExperience) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    // Check for Aadhaar card image
    const imageLocalPath = req.files?.photo?.[0]?.path || null;
    if (!imageLocalPath) {
      return res.status(400).json({ message: "Aadhaar card image is required for signup" });
    }

    // Read and convert image to base64
    const imageFile = await fs.readFile(imageLocalPath);
    const imageBase64 = imageFile.toString("base64");

    // Extract pincode using Gemini Vision
    const promptConfig = [
      {
          text: `Extract the pincode from this Aadhaar card image. 
          The response should contain ONLY the 6-digit pincode and nothing else.`
      },
      {
          inlineData: {
              mimeType: "image/jpeg", // Adjust based on the image type
              data: imageBase64,
          },
      },
  ];

    const result = await geminiModelVision.generateContent({
      contents: [{ role: "user", parts: promptConfig }],
    });

    const responseText = await result.response.text();
    const extractedPincode = responseText.match(/\d{6}/)?.[0]; // Extract first 6-digit number

    if (!extractedPincode) {
      return res.status(400).json({ message: "Failed to extract pincode from Aadhaar card." });
    }

    // Fetch weather details using OpenWeatherMap
    let location = null, temperature = null, weatherCondition = null, humidity = null, windSpeed = null, minTemp = null, maxTemp = null;

    try {
      const weatherResponse = await axios.get(
        `${WEATHER_BASE_URL}?zip=${extractedPincode},${COUNTRY_CODE}&appid=${WEATHER_API_KEY}&units=metric`
      );
      const weatherData = weatherResponse.data;
      console.log(weatherData)

      location = weatherData.name;
      temperature = weatherData.main.temp;
      weatherCondition = weatherData.weather[0].description;
      humidity = weatherData.main.humidity;
      windSpeed = weatherData.wind.speed;
      minTemp = weatherData.main.temp_min;
      maxTemp = weatherData.main.temp_max;
    } catch (error) {
      console.error("Failed to fetch weather data:", error.response?.data || error.message);
    }

    // Create and save farmer record
    const newFarmer = new Farmer({
      fullname: { firstname, lastname },
      phoneNumber,
      aadharCard,
      email,
      pincode: extractedPincode,
      landDetails,
      preferredCrops: preferredCrops ? preferredCrops.split(",").map(crop => crop.trim()) : [],
      farmingExperience,
      equipmentOwned: equipmentOwned ? equipmentOwned.split(",").map(equip => equip.trim()) : [],
      climaticDetails: {
        location,
        averageRainfall: climaticDetails.averageRainfall,
        humidity,
        weather: weatherCondition,
        windSpeed,
        temperatureRange: {
          min: minTemp,
          max: maxTemp,
        },
      },
    });

    await newFarmer.save();

    return res.status(201).json({ success: true, message: "Farmer registered successfully", farmer: newFarmer });
  } catch (error) {
    console.error("Error during farmer signup:", error);
    return res.status(500).json({ success: false, message: "Signup failed due to server error" });
  }
  }

  

export const musictester = async (req,res) => {
  const query = req.query.query;
  try{
    const response = await axios.get(`https://jiosaavan-api-2-harsh-patel.vercel.app/api/search/songs?query=${encodeURIComponent(query)}&page=1&limit=10`)
    res.json(response.data)
  }catch(error){
    console.log(error)
    res.status(500).json({ error: 'Error fetching data' });
  }
}

async function analyzeEmotionAndAge(imageLocalPath){ 



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
          text: `Analyze this image and detect the person's emotion and estimated age.
          The response format should be : Emotion: Happy , Age: 25`
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
      const responseText = result.response.candidates[0].content.parts[0].text;
        
        // Assuming the response format is: "Emotion: Happy, Age: 25"
        const match = responseText.match(/Emotion:\s*(\w+),\s*Age:\s*(\d+)/);
        return match ? { emotion: match[1], age: parseInt(match[2]) } : null;
  } catch (error) {
      console.error('Error analyzing plant disease:', error);
      return res.status(500).json({
          success: false,
          message: 'Failed to analyze the plant disease',
      });
  }
};

export const recommendSongs = async (req, res) => {
  if (!req.files) {
    return res.status(400).json({ error: "No image uploaded" });
  }

  try {
    const imageLocalPath =
      req.files?.photo && req.files.photo.length > 0
        ? req.files.photo[0].path
        : null;

    const analysis = await analyzeEmotionAndAge(imageLocalPath);

    console.log(analysis);
    if (!analysis)
      return res.status(500).json({ error: "Could not analyze emotion & age" });

    const songRecommendations = await getSongRecommendation(
      analysis.age,
      analysis.emotion
    );
    if (!songRecommendations.length)
      return res
        .status(500)
        .json({ error: "No song recommendations found" });

    const songDetailsPromises = songRecommendations.map(fetchFullSongDetails);
    const fullSongDetails = await Promise.all(songDetailsPromises);

    console.log(fullSongDetails);

    return res.json({
      success: true,
      emotion: analysis.emotion,
      age: analysis.age,
      songs: fullSongDetails,
    });
  } catch (error) {
    console.error("Error in recommendSongs:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};


async function getSongRecommendation(age,emotion){ 

  try {
      // Read the uploaded image file and convert it to base64 using fs.promises.readFile;
      // Prepare the prompt for the Gemini model
      const promptConfig = [
        {
          text: `Suggest 5 songs of Hindi and English for a person who is ${age} years old and is feeling ${emotion}. 
                        Provide only song names, separated by commas.`
        },
      ];
      

      // Send the image to Gemini for analysis
      const result = await geminiModelVision.generateContent({
          contents: [{ role: "user", parts: promptConfig }],
      });

      // Get the response from Gemini
      const responseText = result.response.candidates[0].content.parts[0].text;
      return responseText.split(",").map(song => song.trim()); // Convert to array
  } catch (error) {
    console.error("Error in song recommendations:", error);
    return [];
  }
};

async function fetchFullSongDetails(songName) {
  try {
      const response = await axios.get(`https://jiosaavan-api-2-harsh-patel.vercel.app/api/search/songs?query=${encodeURIComponent(songName)}&page=1&limit=3`);
      
      if (response.data.success && response.data.data.results.length > 0) {
          return response.data.data.results[0]; // Returning full song object
      }
      
      return null;
  } catch (error) {
      console.error(`Error fetching details for song: ${songName}`, error);
      return null;
  }
}