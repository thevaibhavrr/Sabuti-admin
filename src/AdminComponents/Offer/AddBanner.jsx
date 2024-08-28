import React, { useEffect, useState } from 'react';
import { makeApi } from '../../api/callApi';
import { useNavigate } from "react-router-dom";
import uploadToCloudinary from '../../utils/cloudinaryUpload';
import { fetchCategory } from '../../utils/CFunctions';

function AddBanner() {
  const navigate = useNavigate();
  const [offerBanner, setOfferBanner] = useState("");
  const [bannerFor, setBannerFor] = useState("");
  const [selectcategory, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [categories, setCategories] = useState([]);

  const handleSubmitBanner = async (e) => {
    e.preventDefault();
    const banner = {
      bannerImage: offerBanner,
      BannerFor: bannerFor,
      BannerCategory: selectcategory,
    };
    try {
      setLoading(true);
      await makeApi("/api/create-banner", "POST", banner);
    } catch (error) {
      console.error("Error creating banner:", error);
    } finally {
      setLoading(false);
      navigate("/admin/offer-banner");
    }
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        const uploadedImageUrl = await uploadToCloudinary(file, setUploadProgress);
        setOfferBanner(uploadedImageUrl);
      } catch (error) {
        console.error("Image upload error:", error);
      }
    }
  };
  useEffect(() => {
    setLoading(true);
    try {
    fetchCategory().then((data) => setCategories(data.categories));
    } catch (error) {
      console.log("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  }, []); 

  

  return (
    <div className='container my-4'>
      <div className="row">
        <div className="col-12 mb-3">
          <h2>Add Banner</h2>
        </div>

        <div className="col-12">
          <div className="mb-3">
            <label className="form-label">Banner For</label>
            <input
              type="text"
              className="form-control"
              value={bannerFor}
              onChange={(e) => setBannerFor(e.target.value)}
            />
          </div>

          <div>
            <h5>Upload Banner</h5>
            <form className="file-upload-form d-flex justify-content-between align-items-center">
              <label htmlFor="file" className="file-upload-label btn btn-outline-primary">
                <div className="file-upload-design text-center p-3">
                  <input
                    id="file"
                    type="file"
                    className="form-control"
                    onChange={handleImageUpload}
                  />
                </div>
              </label>
              <div>
                {offerBanner ? (
                  <img
                    src={offerBanner}
                    alt="Banner"
                    className="img-thumbnail"
                    width={150}
                    height={150}
                  />
                ) : (
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWRhb8uI0vKINdZJCfOmdIWu0uMBsKNCzlAk2myawr1rr3xFE-5g_B575p5H9V5S5nH3E&usqp=CAU"
                    alt="no image"
                    className="img-thumbnail"
                    width={150}
                    height={150}
                  />
                )}
              </div>
            </form>
            {uploadProgress > 0 && uploadProgress < 100 && (
              <progress value={uploadProgress} max="100" />
            )}
          </div>
        </div>
        <div>
          <h5>Categories</h5>
          <select
            className="form-select"
            aria-label="Default select example"
            value={selectcategory}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option>Select Category</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="col-12 mt-3">
          <button className='btn btn-success' onClick={handleSubmitBanner}>
            {loading ? (
              <div className="spinner-border text-light" style={{ height: "20px", width: "20px" }} role="status" />
            ) : (
              "Save"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddBanner;
