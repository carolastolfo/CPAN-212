import { useState } from "react";
import "./App.css";

const App = () => {
  // what do we need to track
  const [singleFile, setSingleFile] = useState(null);
  const [multipleFiles, setMultipleFiles] = useState([]);
  const [displayImage, setDisplayImage] = useState(null);
  const [displayImages, setDisplayImages] = useState([]);
  const [displayDogImage, setDisplayDogImage] = useState(null);
  const [message, setMessage] = useState("");

  // Handlers
  const handleSingleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setSingleFile(e.target.files[0]);
    }
  };

  // fetch functions -> fetch a random single image
  const fetchSingleFile = async () => {
    try {
      const response = await fetch(`http://localhost:8000/fetch/single`);

      const blob = await response.blob(); // we made a blob - Binary Large Object
      // but thats not an image, so we need to make an image element

      // using createObjectURL
      const imageUrl = URL.createObjectURL(blob);
      setDisplayImage(imageUrl);
    } catch (error) {
      console.error("Error fetching single file:", error);
    }
  };

  // fetch functions -> save single
  const handleSubmitSingleFile = async (e) => {
    e.preventDefault();
    if (!singleFile) {
      setMessage("Please select a file before uploading.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", singleFile);

      const response = await fetch(`http://localhost:8000/save/single`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Image upload failed");
      }
      setMessage("File uploaded successfully!");
    } catch (error) {
      console.log("Error:", error);
    }
  };

  // fetch functions -> save multiple [TODO]
  const handleSubmitMultipleFiles = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();

      multipleFiles.forEach((file) => {
        formData.append("files", file);
      });
      const response = await fetch(`http:localhost:8000/save/multiple`, {
        method: "POST",
        body: formData,
      });
      const data = response.json();
      setMessage("Files have been uploaded");
    } catch (error) {
      console.log(error);
    }
  };

  // fetch functions -> fetch multiple [TODO]
  const fetchMultipleFiles = async () => {
    try {
      //fetch the fetch/multiple - that gets the list of names
      // fetch  -/fetch/multiple => [01, 02, 03]
      const response = await fetch(`http://localhost:8000/fetch/multiple`);
      const data = await response.json();
      console.log(data);

      // fetch -/fetch/file/filename variable
      //run map on data
      const filePromises = data.map(async (filename) => {
        const fileResponse = await fetch(
          `http://localhost:8000/fetch/file/${filename}`
        );
        const fileBlob = await fileResponse.blob();
        const imageUrl = URL.createObjectURL(fileBlob);
        return imageUrl;
      });

      const imageUrls = await Promise.all(filePromises);
      setDisplayImages(imageUrls);
    } catch (error) {
      console.log(error);
    }
  };

  // fetch functions -> fetch dog image
  const fetchDogImage = async () => {
    try {
      const response = await fetch(`https://dog.ceo/api/breeds/image/random`);
      const data = await response.json();
      setDisplayDogImage(data.message);
      setMessage("Here is your dog image");
    } catch (error) {
      console.log(error);
      setMessage("Failed to get your dog image");
    }
  };

  // fetch functions -> save dog image
  const saveDogImage = async () => {
    try {
      const fileResponse = await fetch(displayDogImage);
      const blob = await fileResponse.blob();

      const formData = new FormData(); //we set this up so we can append new info
      formData.append("file", blob, "dog-image.jpg");

      const response = await fetch(`http://localhost:8000/save/single`, {
        method: "POST",
        body: formData,
      });

      const data = response.json();
      console.log(data);
    } catch (error) {}
  };

  return (
    <div className="file-upload-container">
      <p className="message">{message}</p>
      <div className="upload-section">
        <h2>Fetch Single Random Image</h2>
        <button onClick={fetchSingleFile}>Fetch Single File</button>
        {displayImage && (
          <div>
            <h3>Single File</h3>
            <div className="image-item">
              <img
                src={displayImage}
                alt="Display Image"
                style={{ width: "200px", marginTop: "10px" }}
              />
            </div>
          </div>
        )}
      </div>

      <div className="upload-section">
        <form onSubmit={handleSubmitSingleFile}>
          <h2>Upload Single File</h2>
          <input type="file" onChange={handleSingleFileChange} />
          <button type="submit">Upload Single File</button>
        </form>
      </div>
      <div className="upload-section">
        <h2>Multiple Images</h2>
        <button onClick={fetchMultipleFiles}>Fetch Multiple Files</button>
        {displayImages.length > 0 ? (
          <div className="image-gallery">
            {displayImages.map((imageUrl, index) => (
              <div key={index} className="image-item">
                <img src={imageUrl} />
              </div>
            ))}
          </div>
        ) : (
          <p>No images to display</p>
        )}
      </div>

      <div className="upload-section dog-image-section">
        <h2>Dog Images</h2>
        <button onClick={fetchDogImage}>Fetch Dog Image</button>
        {displayDogImage && (
          <div className="dog-image-container">
            <img src={displayDogImage}  />
          </div>
        )}
        <button onClick={saveDogImage}>Save it!</button>
      </div>
    </div>
  );
};



export default App;
