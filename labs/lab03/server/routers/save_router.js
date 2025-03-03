import express from "express";
import upload from "../middleware/multer.js"

const router = express.Router();

router.post("/single", upload.single("file"), (req, res) => {
  console.log("Uploaded File:", req.file);

  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  res.json({
    message: "Image uploaded successfully",
    filePath: `/uploads/${req.file.filename}`,
  });
});

router.post("/multiple", upload.array("files", 10), (req, res) => {
  console.log("Uploaded Files:", req.file);
  //error check
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }
  //here is the list of files that we are uploading
  const filePaths = req.file.map(File => `/uploads/${req.file.filename}`)
  res.json({
    message: "Image uploaded successfully",
    filePaths: filePaths
  })
})

export default router;
