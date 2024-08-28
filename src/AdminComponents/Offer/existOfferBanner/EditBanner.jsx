// src/pages/AddEditBanner.js
import React, { useEffect, useState } from 'react';
import { makeApi } from '../../../api/callApi';
import axios from 'axios';
import { useParams ,useNavigate } from 'react-router-dom';
import uploadToCloudinary from '../../../utils/cloudinaryUpload';

function EditExistOfferBanner() {
    const navigate = useNavigate();

  const { bannerId } = useParams();
  const [offerBanner, setOfferBanner] = useState('');
  const [BannerFor, setBannerFor] = useState('');
  const [loading, setLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  useEffect(() => {
    if (bannerId) {
      setIsEdit(true);
      fetchBannerDetails();
    }
  }, [bannerId]);

  const fetchBannerDetails = async () => {
    try {
      const response = await makeApi(`/api/get-single-existing-banner/${bannerId}`, 'GET');
      setOfferBanner(response.data.banner.bannerImage);
      setBannerFor(response.data.banner.BannerFor);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const banner = { bannerImage: offerBanner, BannerFor };

    try {
      setLoading(true);
        await makeApi(`/api/update-existing-banner/${bannerId}`, 'PUT', banner);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      navigate("/admin/exist-offer-banner")

    }
  };

  const handleImageUpload = async (event) => {
    try {
      const file = event.target.files[0];

      if (file) {
        // const data = new FormData();
        // data.append('file', file);
        // data.append('upload_preset', 'wnsxe2pa');

        // const response = await axios.post('https://api.cloudinary.com/v1_1/dzvsrft15/image/upload', data);

        // if (response.status === 200) {
        //   setOfferBanner(response.data.url);
        // }
        const uploadedImageUrl = await uploadToCloudinary(file, setUploadProgress);
        setOfferBanner(uploadedImageUrl);


      }
    } catch (error) {
      console.log('image upload error', error);
    }
  };

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
        <div>{uploadProgress}</div>
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
        <button type='submit' className='btn btn-success'>
          {loading ? 'Saving...' : 'Save'}
        </button>
      </form>
    </div>
  );
}

export default EditExistOfferBanner;
