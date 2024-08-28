// src/pages/AddEditBanner.js
import React, { useEffect, useState } from 'react';
import { makeApi } from '../../api/callApi';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import uploadToCloudinary from '../../utils/cloudinaryUpload';
import { fetchCategory } from '../../utils/CFunctions';

function AddEditBanner() {
  const navigate = useNavigate();

  const { bannerId } = useParams();
  const [offerBanner, setOfferBanner] = useState('');
  const [BannerFor, setBannerFor] = useState('');
  const [loading, setLoading] = useState(false); 
  const [isEdit, setIsEdit] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectcategory, setCategory] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);


  useEffect(() => {
    if (bannerId) {
      setIsEdit(true);
      fetchBannerDetails();
    }
  }, [bannerId]);

  const fetchBannerDetails = async () => {
    try {
      const response = await makeApi(`/api/get-single-banner/${bannerId}`, 'GET');
      setOfferBanner(response.data.banner.bannerImage);
      setBannerFor(response.data.banner.BannerFor);
      setCategory(response.data.banner.BannerCategory);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const banner = {
      bannerImage: offerBanner, BannerFor,

      BannerCategory: selectcategory,


    };

    try {
      setLoading(true);
      if (isEdit) {
        await makeApi(`/api/update-banner/${bannerId}`, 'PUT', banner);
      } else {
        await makeApi('/api/create-banner', 'POST', banner);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      navigate("/admin/offer-banner")

    }
  };

  const handleImageUpload = async (event) => {
    try {
      const file = event.target.files[0];
      if (file) {
        const uploadedImageUrl = await uploadToCloudinary(file, setUploadProgress);
        setOfferBanner(uploadedImageUrl);
      }
    } catch (error) {
      console.log('image upload error', error);
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
    <div className='p-5'>
      <h2>{isEdit ? 'Edit' : 'Add'} Banner</h2>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label>Banner For</label>
          <input
            type='text'
            className='form-control'
            value={BannerFor}
            onChange={(e) => setBannerFor(e.target.value)}
            required
          />
        </div>
          <h3>{uploadProgress}</h3>
        <div className='form-group'>
          <label>Upload Banner</label>
          <input
            type='file'
            className='form-control-file'
            onChange={handleImageUpload}
          />
          {offerBanner && (
            <img src={offerBanner} alt='Banner' width={150} height={150} />
          )}
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
        <button type='submit' className='btn btn-success'>
          {loading ? 'Saving...' : 'Save'}
        </button>
      </form>
    </div>
  );
}

export default AddEditBanner;
