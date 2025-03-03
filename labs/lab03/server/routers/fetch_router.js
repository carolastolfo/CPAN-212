import express from "express";
import fs from "fs";
import path from "path";
import _ from "lodash";
import { fileURLToPath } from "url"; // for file path

const router = express.Router();

// grab the current directory to this file
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename); // this will link us to the router folder
// we need to move from /server/routers to /server/uploads
const upload_directory = path.join(__dirname, "../uploads");

router.get("/single", (req, res) => {
  // 1 - find the directory/read the directory
  // 2 - error check
  // 3 - run lodash to find a random filename, not the file
  // 4 - send file


  // we read the directory items synchronously to not trip the async speed
  let files_array = fs.readdirSync(upload_directory);
  // error checking
  if (files_array.length == 0) {
    // adding return will stop the rest of the operations
    return res.status(503).send({
      message: "No images",
    });
  }

  let filename = _.sample(files_array);
  res.sendFile(path.join(upload_directory, filename)); //this can only send one file at once

});



// helper function for multiple 
router.get("/file/:filename", (req, res) => {
  res.sendFile(path.join(__dirname, "../uploads", req.params.filename));
});

// TO DO, send array of filenames [TODO]
router.get("/multiple", (req, res) => {

  // 1 - find the directory/read the directory
  let files_array = fs.readdirSync(upload_directory);

  // 2 - error check
  if (files_array.length == 0) {
    // adding return will stop the rest of the operations
    return res.status(503).send({
      message: "No images",
    });
  }
  // 3 - run lodash to find an array of filenames, not the file
  let filenames = _.sampleSize(files_array, 3);
  // filenames = [01, 02, 03] --> list of what you need, now individual request for these

  // 4 - send multiple files --> later create a helper function to send each one indiv
  res.json(filenames)

});

//react asks for files / gets an array of [01, 02, 03]
//react makes a separate request for each file in separate requests [01], [02], [03]
export default router;
