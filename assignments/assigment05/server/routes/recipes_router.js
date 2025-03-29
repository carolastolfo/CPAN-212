import express from "express"
import Recipe from "../models/recipe.js" // db.books.function()

const router = express.Router()

// fetch all recipes
router.get("/", (req, res) => {
    Recipe.find().then((results) => {
        res.json(results)
    })
})

// add new recipe
router.post("/", (req, res) => {
    const {name, description, difficulty, ingredients, steps} = req.body

    let newRecipe = new Recipe({
        name, 
        description, 
        difficulty, 
        ingredients, 
        steps
    })

    newRecipe.save().then(() => {
        res.json({message: "data saved"})
    })
})

// fetch single recipe by id
router.get("/:id", (req, res) => {
    Recipe.findById(req.params.id).then((results) => {
        res.json(results)
    })
})

// find and edit recipe by id
router.put("/:id", (req, res) => {
    Recipe.findByIdAndUpdate(req.params.id, req.body)
    .then(() => {
        res.json({message: "update succesful"})
    })
})

// delete recipe by id
router.delete("/:id", (req, res) => {
    Recipe.findByIdAndDelete(req.params.id)
    .then(() => {
        res.json({message: "delete succesful"})
    })
})


export default router