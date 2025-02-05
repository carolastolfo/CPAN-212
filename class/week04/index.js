/* Project setup: For the server
1 - new project folder
2 - open an integrated terminal
3 - run these commands:
    npm init -y
    npm i express nodemon
    (optional) -> go into package.json and add "type": "module" to enable import from 
*/
 
// [Please enable only ONE of these] 
import express from "express"; // if you are using type: module
// const express = require("express"); // if using common JS (Default)
 
import logger from "./middleware/logger.js"
import auth from "./middleware/auth.js";

const app = express();
const PORT = process.env.PORT || 8000;
 
// middlelware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//app.use will make so the function is applied appwise
app.use(logger) //this is application wide, so it runs everywhere

// routes
app.get("/", logger, (req, res) => {    //this is also a good way to do this. eventually multiple function calls will be here
  res.send("Welcome to our server");
});

app.get("/about", (req, res) => {
    res.send("Welcome to our server");
});

app.get("/login", (req, res) => {
    res.send("We have received your request - login");
});
  
app.post("/login", (req, res) => {
    res.send("We stole your information");
});

app.get("/fetchData", auth, (req, res) => {
    res.send("Hi Carolina this is your profile data");
});
// url to auth = http://localhost:8000/fetchData?username=Carolina
  
  
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});

//all other routes should be above this (else statement)
app.use("", (req, res) => {
  res.status(404).send("Page not found");
});