import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import dotevn from "dotenv"
import book_router from "./routes/book_router.js"
import user_router from "./routes/user_routes.js"

// variables
dotevn.config()
const app = express()
const PORT = process.env.PORT || 6000

// middleware
app.use(cors())
app.use(express.json()) // JSON
app.use(express.urlencoded({extended: true})) // HTML forms

// start up
// essentially a fetch call -- will treat it as a promise
// we only want the server to start if we connect sucessfully to the database
mongoose.connect(process.env.MONGODB_URL)
.then(() => {
    console.log("DB is connected")
    app.listen(PORT, () => {
        console.log(`http://localhost:${PORT}`)
    })
})

// routes
app.use("/book", book_router)
app.use("/user", user_router)
