// src/pages/Banner.js
import React, { useEffect, useState } from 'react';
import { makeApi } from '../../api/callApi';
import { Link } from 'react-router-dom';
import ConfirmationModal from '../product/admindeleteproduct';
import "../../style/banner.css";
function Banner() {
  const [offerBanner, setOfferBanner] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [bannerToDelete, setBannerToDelete] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const banner = await makeApi('/api/get-all-banners', 'GET');
        setOfferBanner(banner.data.banner);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDeleteBanner = async () => {
    try {
      await makeApi(`/api/delete-banner/${bannerToDelete._id}`, 'DELETE');
      setShowConfirmation(false);
      setOfferBanner(offerBanner.filter(banner => banner._id !== bannerToDelete._id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='p-5'>
      <div className='d-flex justify-content-between align-items-center mb-4'>
        <div>Banner</div>
        <Link to='/admin/add-banner' className='btn btn-primary'>Add Banner</Link>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {offerBanner.map((banner) => (
            <li className='d-flex gap-5 align-items-center' key={banner._id}>
              <img src={banner.bannerImage} alt='Banner' height={200} />
              <Link to={`/admin/edit-banner/${banner._id}`} className='btn btn-secondary'>Edit</Link>
              <button onClick={() => { setBannerToDelete(banner); setShowConfirmation(true); }} className='btn btn-danger'>Delete</button>
            </li>
          ))}
        </ul>
      )}
      {showConfirmation && (
        <ConfirmationModal
          isOpen={showConfirmation}
          onClose={() => setShowConfirmation(false)}
          onConfirm={handleDeleteBanner}
        />
      )}
    </div>
  );
}

export default Banner;
