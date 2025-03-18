import express from "express"
import Book from "../models/book.js" // db.books.function()

const router = express.Router()

// 1 fetch all
router.get("/", (req, res) => {
    // 1 fetch from DB
    // 2 send to client
    Book.find().then((results) => {
        res.json(results)
    })
})

// 2 fetch single item by id
router.get("/:id", (req, res) => {
    Book.findById(req.params.id).then((results) => {
        res.json(results)
    })
})

// 3 search
router.get("/search", (req, res) => {
    const filters = {} // add whatever filter here

    // query 
    if(req.query.title) {
        filters.title = req.query.title
    }

    if(req.query.pages) {
        let pages = parseInt(req.query.pages)
        if(req.query.logicalOperators) {
            switch (req.query.logicalOperators) {
                case gte:
                    filters.pages = {$gte: {pages}}                    
                    break;
            
                default:
                    break;
            }
        }
    }

    Book.find(filters).then((results) => {
        res.json(results)
    })
})

// 4 update item
router.put("/:id", (req, res) => {
    // can they do this
    Book.findByIdAndUpdate(req.params.id)
    .then(() => {
        res.json({message: "update succesful"})
    })
})

// 5 delete
router.delete("/:id", (req, res) => {
    Book.findByIdAndDelete(req.params.id)
    .then(() => {
        res.json({message: "delete succesful"})
    })
})

// 6 create
router.post("/save", (req, res) => {
    const {title, author, publisher} = req.body

    let newBook = new Book({
        title,
        author,
        publisher,
        pages: 500
    })

    newBook.save().then(() => {
        res.json({message: "data saved"})
    })
})

export default router