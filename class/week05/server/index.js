import express from "express"
import cors from "cors"
import multer from "multer"

//get this from disk storage on the multer website
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      //cb(null, './uploads/')  //changed the folder and created said folder
      cb(null, '/uploads/')
    },
    filename: function (req, file, cb) {
      const uniquePrefix = Date.now() + '-' + Math.round(Math.random() * 1E9) //changed to a prefix
      cb(null, uniquePrefix + '-' + file.originalname)
    }
  })
  
  const upload = multer({ storage: storage })

const app = express()
const PORT = process.env.PORT || 8000

//middleware
app.use(cors())
app.use(express.urlencoded({extended: true})) //for html forms
app.use(express.json()) //extracts application/json data

//routes
app.get("/", (req, res) => {
    res.send("Welcome to the server")
})

//send data
app.get("/data", (req, res) => {
    const data = {
        fname: "Carolina",
        lname: "Astolfo"
    }
    res.send(data)
})

app.post("/login", (req, res) => {
    console.log(req.body)
    //process with db in future
    res.send("I stole your data")
})

// upload stuff
app.post("/fileform", upload.single("file"), (req, res) => {
    console.log(req.file)
    console.log(req.body)
    res.json("I received your information")
})

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`)
})

app.use("", (req, res) => {
    res.status(404).send("Page not found")
})