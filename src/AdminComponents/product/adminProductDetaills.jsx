import React, { useEffect, useState } from 'react';
import { Link, useParams } from "react-router-dom";
import { makeApi } from "../../api/callApi";
import "../../adminCss/adminProductDetaills.css";
import PrimaryLoader from "../../components/loader/loader";
import { LazyLoadImage } from 'react-lazy-load-image-component';



function ProductDetails() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState('');
  const [loading, setLoading] = useState(false);

  // Fetch product details from API
  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await makeApi(`/api/get-single-product/${productId}`, "GET");
      setProduct(response.data.product);
    } catch (error) {
      console.error("Error fetching product details:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle image click to set selected image
  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  // Fetch product details when component mounts or productId changes
  useEffect(() => {
    fetchProduct()
  }, []);

  return (
    <>
      {loading ? (
        <div className="All_Product_loader">
          <div className='d-flex justify-content-center align-items-center' style={{ height: "100vh" }}>
            <PrimaryLoader />
          </div>
        </div>
      ) : (
        <div>
          <div>
            <Link to={"/admin/allproducts"}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="26"
                height="36"
                fill="currentColor"
                className="bi bi-arrow-left back_arrow_icon"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"
                />
              </svg>
            </Link>
          </div>
          {product && (
            <div>
              <div className="productDisplay">
                <div className="product-display-left">
                  <div className="productdisplay-img-list">
                    {product.image.map((item, i) => (
                      <div className='d-flex justify-content-center align-items-center' key={i}>
                        <LazyLoadImage effect="blur" loading="lazy"
                          src={item}
                          alt=""
                          onClick={() => handleImageClick(item)}
                          style={{ cursor: "pointer" }}
                        />
                      </div>
                    ))}
                  </div>
                  <div className="productdisplay-img">
                    <LazyLoadImage effect="blur" loading="lazy"
                      src={selectedImage || product.thumbnail}
                      alt=""
                      className="productdisplay-main-img"
                    />
                  </div>
                </div>
                <div className="product-display-right">
                  <div>
                    <Link to={`/admin/product-update/${productId}`} target='_blank' >
                      <div className='btn btn-success' >Edit
                      </div>
                    </Link>
                  </div>
                  <h1>{product.name}</h1>
                  <h2>{product.subTitle}</h2>
                  <p>{product.description}</p>
                  <p><strong>Price:</strong> ₹{product.price}</p>
                  <p><strong>Price After Discount:</strong> ₹{product.PriceAfterDiscount}</p>
                  <p><strong>Discount Percentage:</strong> {product.discountPercentage}%</p>
                  <p><strong>Quantity:</strong> {product.quantity}</p>
                  <p><strong>Category:</strong> {product.category.name}</p>
                  <p><strong>Brand:</strong> {product.brand}</p>
                  <p><strong>Thumbnail:</strong> <LazyLoadImage effect="blur" loading="lazy" src={product.thumbnail} alt="Thumbnail" style={{ maxWidth: '100px' }} /></p>
                  <p><strong>Images:</strong></p>
                  <div className="product-images">
                    {product.image.map((img, index) => (
                      <LazyLoadImage effect="blur" loading="lazy" key={index} src={img} alt={`Product Image ${index + 1}`} style={{ maxWidth: '100px', marginRight: '10px' }} />
                    ))}
                  </div>
                  <p><strong>Sizes:</strong> {product.Size.join(", ")}</p>
                  <p><strong>Is Out Of Stock:</strong> {product.IsOutOfStock}</p>
                  <p><strong>Tax:</strong> {product.Tax * 100}%</p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default ProductDetails;
