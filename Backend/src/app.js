import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import farmerRouter from "../src/routes/farmer.routes.js"
const app = express()

app.use(cors({
    origin: "*",
    credentials: true
}))


app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())


//routes declaration

app.use("/api/v1/user", farmerRouter);
// http://localhost:8000/api/v1/users/register

export { app }