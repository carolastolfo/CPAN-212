import express from "express"
import User from "../models/user.js"
import bcrypt from "bcryptjs"

const router = express.Router()

// register
router.post("/register", (req, res) => {
    const {email, password} = req.body

    bcrypt.hash(password, 10) // how hard it is to crack
    .then((hashedPassword) => {
        let newUser = new User({email, password: hashedPassword})

        newUser.save().then(() => {
            res.json({message: "you are registered"})
        })
    }) 
})

// login
router.post("/login", (req, res) => {
    const {email, password} = req.body

    User.findOne({email: email})
    .then((userAccount) => {
        if (!userAccount){
            return res.status(400).json({message: "no account found"})
        }
        bcrypt.compare(password, userAccount.password)
        .then((compareResults) => {
            if (compareResults) {
                return res.json({message: "you have logged in"})
            }
        })
    })
    .catch((err) => {
        console.log(err)
        res.json({message: "account not found"})
    })
})

export default router
/*
    1 register
        parse info
        hash the password
        save
    2 login
*/