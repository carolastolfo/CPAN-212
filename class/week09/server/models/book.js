import mongoose from "mongoose";

const bookSchema = mongoose.Schema(
    {
        title: {
            type: String,
            require: true
        },
        author: {
            type: String,
            require: true
        },
        publisher: {
            type: String,
            require: true
        },
        pages: {
            type: Number,
            require: true
        },
        releaseDate: {
            type: String,
        },
        ISBN: {
            type: String,
        },
    }
)

const Book = mongoose.model("books", bookSchema) // mongoose will always pluralize the table name

export default Book;
