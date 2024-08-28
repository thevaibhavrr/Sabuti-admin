
import "../../adminCss/adminUpdateProduct.css";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { makeApi } from "../../api/callApi";
import Loader from "../../components/loader/loader";
import axios from "axios";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import uploadToCloudinary from "../../utils/cloudinaryUpload";
function UpdateProduct() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const { productId } = useParams();
  const [loading, setLoading] = useState(false);
  const [updateloader, setUpdateLoader] = useState(false);
  const [product, setProduct] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  console.log("----",uploadProgress);

  const [thumbnailUploadProgress, setThumbnailUploadProgress] = useState(0);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    quantity: "", 
    category: "",
    brand: "",
    image: [],
    thumbnail: "",
    discountPercentage: "",
    productType: "",
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await makeApi(`/api/get-single-product/${productId}`, "GET");
        setProduct(response.data.product);
        setFormData({
          name: response.data.product.name,
          description: response.data.product.description,
          price: response.data.product.price,
          quantity: response.data.product.quantity,
          category: response.data.product.category,
          brand: response.data.product.brand,
          image: response.data.product.image,
          thumbnail: response.data.product.thumbnail,
          discountPercentage: response.data.product.discountPercentage,
          productType: response.data.product.productType,
        });
      } catch (error) {
        console.error("Error fetching product details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [productId]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setUpdateLoader(true);
      const updateProduct = await makeApi(`/api/update-product/${productId}`, "PUT", formData);
      console.log("Product updated successfully!", updateProduct);
      navigate("/admin/allproducts");
    } catch (error) {
      console.error("Error updating product:", error);
    } finally {
      setUpdateLoader(false);
    }
  };

  useEffect(() => {
    async function fetchCategories() {
      try {
        setLoading(true);
        const response = await makeApi("/api/get-all-categories", "GET");
        if (response.status === 200) {
          setCategories(response.data.categories);
        }
      } catch (error) {
        console.log("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchCategories();
  }, []);

  const removeImage = (indexToRemove) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      image: prevFormData.image.filter((_, index) => index !== indexToRemove),
    }));
  };

  const handleAddMoreImages = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      image: [...prevFormData.image, ""],
    }));
  };

  const handleImageUpload = async (event, index) => {
    try {
      const file = event.target.files[0];
      if (file) {

        const uploadedImageUrl = await uploadToCloudinary(file, setUploadProgress);

        // const compressedFile = await file;

        // const data = new FormData(); 
        // data.append("file", compressedFile);
        // data.append("upload_preset", "wnsxe2pa");
        // data.append("upload_preset", "wnsxe2pa");

        // const response = await axios.post(
          // `https://api.cloudinary.com/v1_1/dzvsrft15/image/upload`,
          // data,
          // {
          //   onUploadProgress: (progressEvent) => {
          //     const percentCompleted = Math.round(
          //       (progressEvent.loaded * 100) / progressEvent.total
          //     );
          //     setUploadProgress((prevProgress) => ({
          //       ...prevProgress,
          //       [index]: percentCompleted,
          //     }));
          //   },
          // }
        // );


        // if (response.status === 200) {
          // const imageUrl = response.data.url;
          const imageUrl = uploadedImageUrl;
    
          setFormData((prevFormData) => {
            const updatedImages = [...prevFormData.image];
            updatedImages[index] = imageUrl;
            return {
              ...prevFormData,
              image: updatedImages,
            };
          });
        // }
      }
    } catch (error) {
      console.log("Image upload error", error);
    }
  };

  const handleThumbnailUpload = async (event) => {
    try {
      const file = event.target.files[0];
      if (file) {
        

        // const compressedFile = await file;

        // const data = new FormData();
        // data.append("file", compressedFile);
        // data.append("upload_preset", "wnsxe2pa");

        // const response = await axios.post(
        //   `https://api.cloudinary.com/v1_1/dzvsrft15/image/upload`,
        //   data,
        //   {
        //     onUploadProgress: (progressEvent) => {
        //       const percentCompleted = Math.round(
        //         (progressEvent.loaded * 100) / progressEvent.total
        //       );
        //       setThumbnailUploadProgress(percentCompleted);
        //     },
        //   }
        // );
        const uploadedImageUrl = await uploadToCloudinary(file, setUploadProgress);

        // if (response.status === 200) {
          // const imageUrl = response.data.url;
          const imageUrl = uploadedImageUrl;
          setFormData((prevFormData) => ({
            ...prevFormData,
            thumbnail: imageUrl,
          }));
        // }
      }
    } catch (error) {
      console.log("Thumbnail upload error", error);
    }
  };


  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="main_update_product_page">
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

          <div className="update-product-container">
            <h2>Update Product</h2>
            <form onSubmit={handleSubmit}>
              <div>
                <label>Name:</label>
                <input
                  type="text"
                  name="name"
                  value={formData?.name}
                  onChange={handleChange}
                />
              </div>
              <div>
                <select
                  className="add_product_input_filed"
                  value={formData?.productType}
                  onChange={handleChange}
                  name="productType"
                  defaultValue={formData?.productType}
                >
                  <option value="Domestic">Domestic</option>
                  <option value="International">International</option>
                </select>
              </div>
              <div>
                <label>Description:</label>
                <textarea
                  name="description"
                  value={formData?.description}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label>Price:</label>
                <input
                  type="number"
                  name="price"
                  value={formData?.price}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label>Discount Percentage:</label>
                <input
                  type="number"
                  name="discountPercentage"
                  value={formData?.discountPercentage}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label>Quantity:</label>
                <input
                  type="number"
                  name="quantity"
                  value={formData?.quantity}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label>Category:</label>
            {/* <h1>{formData.category}</h1> */}

                <select
                  className="add_product_input_filed add_product_dropdown"
                  value={formData?.category.name}
                  defaultValue={formData?.category.name}
                  name="category"
                  onChange={handleChange}
                >
                  <option value={formData?.category._id}>{formData?.category.name}</option>
                  {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label>Brand:</label>
                <input
                  type="text"
                  name="brand"
                  value={formData?.brand}
                  onChange={handleChange}
                />
              </div>
              <div className="update_product_Image_section">
                <label>Images:</label>
                {formData?.image.map((imageUrl, index) => (
                  <div
                    key={index}
                    className="update_image_container_single_image"
                  >
                    {imageUrl && (
                      <LazyLoadImage
                        src={imageUrl}
                        alt={`Product ${index + 1}`}
                        width="100"
                      />
                    )}
                    <input
                      type="file"
                      name={`image_${index}`}
                      onChange={(event) => handleImageUpload(event, index)}
                    />
                    <h6>{uploadProgress}</h6>
                    {uploadProgress[index] && (
                      <progress value={uploadProgress[index]} max="100" />
                    )}
                    <button type="button" onClick={() => removeImage(index)}>
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  className="admin_panel_button add_more_image_button"
                  onClick={handleAddMoreImages}
                >
                  Add More Images
                </button>
              </div>
              <div>
                <label>Thumbnail:</label>
                <input
                  type="file"
                  name="thumbnail"
                  onChange={handleThumbnailUpload}
                />
                {formData?.thumbnail && (
                  <LazyLoadImage
                    src={formData?.thumbnail}
                    alt="Thumbnail"
                    width="100"
                  />
                )}
                {thumbnailUploadProgress > 0 && (
                  <progress value={thumbnailUploadProgress} max="100" />
                )}
              </div>
              <div>
                <button type="submit" className="admin_panel_button">
                  {updateloader ? (
                    <div
                      className="spinner-border text-light"
                      style={{ height: "20px", width: "20px" }}
                      role="status"
                    />
                  ) : (
                    "Update Product"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default UpdateProduct;
