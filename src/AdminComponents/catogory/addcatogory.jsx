import React, { useState } from "react";
import "../../adminCss/catogory/AddCategory.css"; 
import { makeApi } from "../../api/callApi";
import { Link } from "react-router-dom";
import uploadToCloudinary from "../../utils/cloudinaryUpload";

const Addcatogory = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [thumbnailUploadProgress, setThumbnailUploadProgress] = useState(0);
  const [thumbnail, setThumbnail] = useState("");
  const handleSubmit = async (e) => { 
    e.preventDefault();
    try {
      //   const response = await axios.post('/api/add-category', { name, description });
      const response = await makeApi("/api/create-category", "POST", {
        name,
        description, 
        thumbnail,
      });
      if (response.status === 201) {
        alert("Category added successfully");
        setName("");
        setDescription("");
      }
    } catch (error) {
      console.error("Error adding category:", error);
      setErrorMessage("Error adding category. Please try again.");
    }
  };

  
  const handleThumbnailUpload = async (event) => {
    try {
      const file = event.target.files[0];
      if (file) {
        console.log(file);
        const uploadedImageUrl = await uploadToCloudinary(file, setUploadProgress);

        // if (response.status === 200) {
          const imageURL = uploadedImageUrl;
          setThumbnail(imageURL);
          setThumbnailUploadProgress(100);
        // }
      }
    } catch (error) {
      console.log("Thumbnail upload error", error);
    }
  };

  return (
    <>
      <div>
        <Link to={"/admin/all-categories"}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="26"
            height="36"
            fill="currentColor"
            className="bi bi-arrow-left back_arrow_icon back_button_add_catogory"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"
            />
          </svg>
        </Link>
      </div>
      <div className="add-category">
        <div className="add_category_div">Add Category</div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="description"> Catogory Image:</label>
            <input
              type="file"
              name="file"
              id="file"
              onChange={handleThumbnailUpload}
            />
          </div>
          <div>
            <img src={thumbnail} alt="Thumbnail" style={{ maxWidth: "100px" }} />
          </div>
          <button
            type="submit"
            className="admin_add_product_button add_category_button"
          >
            Add Category
          </button>
        </form>
      </div>
    </>
  );
};

export default Addcatogory;
