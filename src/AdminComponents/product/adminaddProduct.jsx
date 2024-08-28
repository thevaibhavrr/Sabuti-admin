import React, { useState, useEffect } from "react";
import "../../adminCss/product/adminaddProduct.css";
import { makeApi } from "../../api/callApi";
import axios from "axios";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchCategory } from "../../utils/CFunctions";
import uploadToCloudinary from "../../utils/cloudinaryUpload";

function AdminaddProduct() {
  const [categories, setCategories] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState();
  const [discountPercentage, setDiscountPercentage] = useState("0");
  const [quantity, setQuantity] = useState("");
  const [images, setImages] = useState([{}]);
  const [thumbnail, setThumbnail] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [productType, setProductType] = useState("Domestic");
  const [uploadProgress, setUploadProgress] = useState({});
  const [thumbnailUploadProgress, setThumbnailUploadProgress] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const requiredFields = [];
    if (!name) requiredFields.push("Name");
    if (!price) requiredFields.push("Price");
    if (!quantity) requiredFields.push("Quantity");
    if (!category) requiredFields.push("Category");
    if (!thumbnail) requiredFields.push("Thumbnail");
    if (!productType) requiredFields.push("Product Type");
    if (images.length === 0 || images.includes("")) requiredFields.push("Product Images");

    if (requiredFields.length > 0) {
      const fieldNames = requiredFields.join(", ");
      toast.error(`Please fill all required fields: ${fieldNames}`);
      return;
    }

    try {
      const response = await makeApi("/api/create-product", "POST", {
        name,
        description,
        price,
        discountPercentage: discountPercentage || 0,
        quantity: quantity || 0,
        image: images,
        thumbnail,
        category,
        brand,
        size,
        productType,
      });
      setName("");
      setDescription("");
      setPrice("");
      setDiscountPercentage("");
      setQuantity("");
      setImages([""]);
      setThumbnail("");
      setCategory("");
      setBrand("");
      setSize("");
      setProductType("Domestic");
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const handleImageChange = (index, value) => {
    const updatedImages = [...images];
    updatedImages[index] = value;
    setImages(updatedImages);
  };

  const handleAddMoreImages = () => {
    setImages([...images, ""]);
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
     
    // async function fetchCategories() {
    //   try {
    //     setLoading(true);
    //     const response = await makeApi("/api/get-all-categories", "GET");
    //     if (response.status === 200) {
    //       setCategories(response.data.categories);
    //     }
    //   } catch (error) {
    //     console.log("Error fetching categories:", error);
    //   } finally {
    //     setLoading(false);
    //   }
    // }
    // fetchCategories();
  }, []);

  const handleImageUpload = async (event, index) => {
    try {
      const file = event.target.files[0];
      if (file) {

        const uploadedImageUrl = await uploadToCloudinary(file, setUploadProgress);


        // const data = new FormData();
        // data.append("file", file);
        // data.append("upload_preset", "wnsxe2pa");

        // const response = await axios.post(`https://api.cloudinary.com/v1_1/dzvsrft15/image/upload`, data, {
        //   onUploadProgress: (progressEvent) => {
        //     const { loaded, total } = progressEvent;
        //     const percentage = Math.floor((loaded * 100) / total);
        //     setUploadProgress((prev) => ({ ...prev, [index]: percentage }));
        //   },
        // }); 

        // if (response.status === 200) {
          const imageURL = uploadedImageUrl;
          handleImageChange(index, imageURL);
          // setUploadProgress((prev) => ({ ...prev, [index]: 100 }));
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
        console.log(file);
        const uploadedImageUrl = await uploadToCloudinary(file, setUploadProgress);

        // const data = new FormData();
        // data.append("file", file);
        // data.append("upload_preset", "wnsxe2pa");

        // const response = await axios.post(`https://api.cloudinary.com/v1_1/dzvsrft15/image/upload`, data, {
        //   onUploadProgress: (progressEvent) => {
        //     const { loaded, total } = progressEvent;
        //     const percentage = Math.floor((loaded * 100) / total);
        //     setThumbnailUploadProgress(percentage);
        //   },
        // });

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
    <div>
      <div className="add-product-container">
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
        <div className="add_product_text">Add Product</div>
        <div>
          <ToastContainer />
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="add_product_input_filed"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            className="add_product_input_filed"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            type="number"
            className="add_product_input_filed"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <input
            type="text"
            className="add_product_input_filed"
            placeholder="Discount Percentage"
            defaultValue={0}
            value={discountPercentage}
            onChange={(e) => setDiscountPercentage(e.target.value)}
          />
          <input
            type="number"
            className="add_product_input_filed"
            placeholder="Quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
          <select
            className="add_product_input_filed"
            value={productType}
            onChange={(e) => setProductType(e.target.value)}
          >
            <option value="Domestic">Domestic</option>
            <option value="International">International</option>
          </select>
          <h3>Add Images of Product</h3>
          {images.map((image, index) => (
            <div key={index}>
              <input
                type="file"
                className="add_product_input_filed add_product_input_filed_image"
                onChange={(event) => {
                  handleImageUpload(event, index);
                }}
              />
              {uploadProgress[index] !== undefined && (
                <div className="upload-progress">
                  {uploadProgress[index]}%
                  {uploadProgress[index] < 100 && <div className="loader"></div>}
                </div>
              )}
              {image && (
                <img
                  loading="lazy"
                  src={image}
                  alt={`Product ${index + 1}`}
                  width={150}
                  height={150}
                />
              )}
            </div>
          ))}
          <div className="add_product_page_add_more_div">
            <button
              type="button"
              className="admin_add_product_button add_product_page_button"
              onClick={handleAddMoreImages}
            >
              Add More
            </button>
          </div>
          <h3>Add Thumbnail of Product</h3>
          <form className="file-upload-form file_upload_form_upload_image d-flex justify-content-between">
            <div>
              <label htmlFor="file" className="file-upload-label">
                <div className="file-upload-design">
                  <svg viewBox="0 0 1024 1024" className="add_product_upload_image">
                    <path
                      className="path1"
                      d="M384 512m-42.666667 0a42.666667 42.666667 0 1 0 85.333334 0 42.666667 42.666667 0 1 0-85.333334 0Z"
                    ></path>
                    <path
                      className="path2"
                      d="M853.333333 725.333333v106.666667H170.666667v-106.666667H106.666667v106.666667c0 35.413333 28.586667 64 64 64h682.666666c35.413333 0 64-28.586667 64-64v-106.666667h-64z"
                    ></path>
                    <path
                      className="path3"
                      d="M469.333333 554.666667l85.333334-113.066667 128 170.666667H341.333333L213.333333 469.333333l170.666667-213.333333 85.333333 106.666667 149.333334-192h-448c-35.413333 0-64 28.586667-64 64v554.666666h64v-405.333333l128 149.333333 85.333333 106.666667z"
                    ></path>
                    <path
                      className="path4"
                      d="M725.333333 298.666667m-42.666666 0a42.666667 42.666667 0 1 0 85.333333 0 42.666667 42.666667 0 1 0-85.333333 0Z"
                    ></path>
                  </svg>
                </div>
              </label>
              <input
                type="file"
                name="file"
                id="file"
                className="file-upload-input"
                onChange={handleThumbnailUpload}
              />
            </div>
            <div>
              {thumbnailUploadProgress > 0 && (
                <div className="upload-progress">
                  {thumbnailUploadProgress}%
                  {thumbnailUploadProgress < 100 && <div className="loader"></div>}
                </div>
              )}
              {thumbnail && (
                <img
                  loading="lazy"
                  src={thumbnail}
                  alt="Thumbnail"
                  width={150}
                  height={150}
                />
              )}
            </div>
          </form>
          <select
            className="add_product_input_filed"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
          <input
            type="text"
            className="add_product_input_filed"
            placeholder="Brand"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
          />
          <input
            type="text"
            className="add_product_input_filed"
            placeholder="Size"
            value={size}
            onChange={(e) => setSize(e.target.value)}
          />
          <div className="add_product_page_submit_btn_div">
            <button type="submit" className="admin_add_product_button">
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminaddProduct;
