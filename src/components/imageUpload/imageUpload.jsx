import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";

export default function ImageUpload() {
  const { holidayId } = useParams();
  const [files, setFiles] = useState([]);
  const [images, setImages] = useState([]);
  const token = localStorage.getItem("token");
  const fileInputRef = useRef(null);

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
      setFiles([]);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
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
    <div className="flex flex-col items-center gap-2">
      <div className="flex justify-center">
        <Link to="/profile">
          <button className="py-2 px-4 bg-black text-white font-bold rounded-full hover:bg-red-600 mt-5 mb-10">
            Go back to your profile
          </button>
        </Link>
      </div>
      <div className="bg-gray-100 rounded-lg p-5 shadow-md">
        <input
          type="file"
          multiple
          onChange={(e) => setFiles(Array.from(e.target.files))}
          className="file-input mb-4"
          ref={fileInputRef}
        />
        <button
          onClick={handleUpload}
          className="bg-blue-700 text-white py-2 px-4 rounded-lg"
        >
          Upload memories
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-5">
        {images.map((image, index) => (
          <div
            key={index}
            className="relative p-2 bg-gray-300 rounded-lg shadow-md group"
          >
            <img
              src={image.url}
              alt={`Uploaded ${index}`}
              className="max-w-lg max-h-lg object-cover rounded-lg"
            />
            <div className="absolute top-2 right-2 opacity-0 transition-opacity duration-300 transform group-hover:opacity-100 group-hover:translate-y-0">
              <button
                onClick={() => handleDeleteImage(image._id)}
                className="bg-red-500 text-white py-1 px-2 rounded-lg"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
  
}  
