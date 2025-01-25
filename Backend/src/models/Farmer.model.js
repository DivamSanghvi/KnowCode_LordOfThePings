import mongoose from "mongoose";

const FarmerSchema = new mongoose.Schema({
  fullname: {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
  },
  phoneNumber: {
    type: Number,
    required: true,
    unique: true,
    validate: {
      validator: function (v) {
        return /^[6-9]\d{9}$/.test(v); // Validates Indian phone numbers
      },
      message: (props) => `${props.value} is not a valid phone number!`,
    },
  },
  password : {
    type : String,
    required: true,
  },
  aadharCard: {
    type: String,
    required: true,
    unique: true,
    
  },

  pincode: {
    type: Number,
    required: true,
    validate: {
      validator: function (v) {
        return /^\d{6}$/.test(v); // Validates Indian pincodes
      },
      message: (props) => `${props.value} is not a valid pincode!`,
    },
  },
  landDetails: {
    landSize: {
      type: Number, // in acres
    },
    irrigationType: {
      type: String,
      enum: ["Rainfed", "Irrigated", "Partially Irrigated"],
    },
    soilType: {
      type: String,
      enum: ["Sandy", "Clayey", "Loamy", "Silty", "Peaty", "Chalky", "Saline"],
      required: true,
    },
  },
  preferredCrops: [
    {
      type: String,
    },
  ],
  farmingExperience: {
    type: Number, // in years
    required: true,
  },
  equipmentOwned: [
    {
      type: String,
    },
  ],
  climaticDetails: {
    averageRainfall: {
      type: Number, // in mm
    },
    humidity: {
      type: Number
    },
    weather: {
      type: String
    },
    temperatureRange: {
      min: Number, // in degrees Celsius
      max: Number, // in degrees Celsius
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Farmer = mongoose.model("Farmer", FarmerSchema);

export default Farmer;
