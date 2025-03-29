import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import dotevn from "dotenv"
import recipe_router from "./routes/recipes_router.js"

// variables
dotevn.config()
const app = express()
const PORT = process.env.PORT || 6000

// middleware
app.use(cors())
app.use(express.json()) 
app.use(express.urlencoded({extended: true})) 

// start up
mongoose.connect(process.env.MONGODB_URL)
.then(() => {
    console.log("DB is connected")
    app.listen(PORT, () => {
        console.log(`http://localhost:${PORT}`)
    })
})

// routes
app.use("/recipe", recipe_router)
