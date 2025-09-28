import { Router } from "express";
import { analyzeCattleDisease, analyzePlantDisease, askGemini, getCropLifeCycle, productLinks, signup, getLocation, getGraph, getFieldsByFarmer, recommendSongs } from "../controllers/FarmerControllers/farmer.controller.js";
import {  extractPincodeFromAadhar, farmerSignup, farmerSignup2 ,musictester} from "../controllers/FarmerControllers/farmer.controller.js";
import { login } from "../controllers/FarmerControllers/farmer.controller.js";
import { upload } from "../middleware/multer.middleware.js";
const router = Router()

router.route("/signup").post(upload.fields([
    {
        name: "photo",
        maxCount:1
    }
]),farmerSignup)
router.route("/login").post(login)
router.route("/askGemini").post(askGemini)
router.route("/plantDisease").post(upload.fields([
    {
        name: "photo",
        maxCount:1
    }
]),analyzePlantDisease)
router.route("/croplifecycle/:farmerId").post(getCropLifeCycle);
//router.route("/get-weather/:pincode").get(getWeatherByPincode);
router.route("/cattleDisease").post(upload.fields([
    {
        name: "photo",
        maxCount:1
    }
]),analyzeCattleDisease)
router.route("/product").post(productLinks)
router.route("/getLocation").post(getLocation)
router.route("/getGraph").post(getGraph)
router.route("/aadharpincode").post(upload.fields([
    {
        maxCount:1
    }
]),extractPincodeFromAadhar)
router.route("/getFields/:farmerId").get(getFieldsByFarmer)
router.route("/api/search/songs").get(musictester)
router.route("/emotion").post(upload.fields([
    {
        name: "photo",
        maxCount:1
    }
]),recommendSongs)
export default router