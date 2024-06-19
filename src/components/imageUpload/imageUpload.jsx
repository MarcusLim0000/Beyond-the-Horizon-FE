import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "./imageUpload.css";

export default function ImageUpload() {
  const { holidayId } = useParams();
  const [files, setFiles] = useState([]);
  const [images, setImages] = useState([]);
  const token = localStorage.getItem("token");

  const BACKEND_URL = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    fetchImages();
  }, []);

  async function fetchImages() {
    try {
      const response = await axios.get(
        `${BACKEND_URL}/api/upload/${holidayId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setImages(response.data);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  }

  async function handleUpload() {
    if (files.length === 0) {
      alert("Please select files first.");
      return;
    }

    const formData = new FormData();
    files.forEach((file) => {
      formData.append("images", file);
    });

    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/upload/${holidayId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Upload successful!");
      fetchImages();
    } catch (error) {
      console.error("Error uploading the files:", error);
      alert("Failed to upload the files. Please try again.");
    }
  }

  async function handleDeleteImage(imageId) {
    try {
      await axios.delete(`${BACKEND_URL}/api/upload/${imageId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Image deleted successfully!");
      fetchImages();
    } catch (error) {
      console.error("Error deleting the image:", error);
      alert("Failed to delete the image. Please try again.");
    }
  }

  return (
    <div className="image-upload-container">
      <div className="input-section">
        <Link to="/profile">
          <button className="back-button">Go back to your profile</button>
        </Link>
        <input
          type="file"
          multiple
          onChange={(e) => setFiles(Array.from(e.target.files))}
          className="file-input"
        />
        <button onClick={handleUpload} className="upload-button">
          Upload memories
        </button>
      </div>
      <div className="image-gallery">
        {images.map((image, index) => (
          <div key={index} className="image-container">
            <img
              src={image.url}
              alt={`Uploaded ${index}`}
              className="uploaded-image"
            />
            <div className="image-delete">
              <button onClick={() => handleDeleteImage(image._id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}