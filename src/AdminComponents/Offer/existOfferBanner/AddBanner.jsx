import React, { useState } from 'react';
import { makeApi } from '../../../api/callApi';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { LazyLoadImage } from 'react-lazy-load-image-component';


function AddExistOfferBanner() {
  const navigate = useNavigate();
  const [offerBanner, setOfferBanner] = useState("");
  const [bannerFor, setBannerFor] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleSubmitBanner = async (e) => {
    e.preventDefault();
    const banner = {
      bannerImage: offerBanner,
      BannerFor: bannerFor
    };
    try {
      setLoading(true);
      await makeApi("/api/create-existing-banner", "POST", banner);
    } catch (error) {
      console.error("Error creating banner:", error);
    } finally {
      setLoading(false);
      navigate("/admin/exist-offer-banner");
    }
  };

  const handleImageUpload = async (event) => {
    try {
      const file = event.target.files[0];
      if (file) {
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "wnsxe2pa");

        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/dzvsrft15/image/upload'`,
          data,
          {
            onUploadProgress: (progressEvent) => {
              const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
              setUploadProgress(percentCompleted);
            }
          }
        );

        if (response.status === 200) {
          setOfferBanner(response.data.url);
        }
      }
    } catch (error) {
      console.error("Image upload error:", error);
    }
  };

  return (
    <div className='container my-4'>
      <div className="row">
        <div className="col-12 mb-3">
          <h2>Add Exist Banner</h2>
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
                  <LazyLoadImage effect="blur" loading="lazy"
                    src={offerBanner}
                    alt="Banner"
                    className="img-thumbnail"
                    width={150}
                    height={150}
                  />
                ) : (
                  <LazyLoadImage effect="blur" load="lazy"
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

export default AddExistOfferBanner;
