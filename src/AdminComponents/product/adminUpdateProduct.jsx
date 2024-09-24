import "../../adminCss/adminUpdateProduct.css";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { makeApi } from "../../api/callApi";
import Loader from "../../components/loader/loader";
import uploadToCloudinary from "../../utils/cloudinaryUpload";

function UpdateProduct() {
  const navigate = useNavigate();
  const { productId } = useParams();
  const [loading, setLoading] = useState(false);
  const [updateloader, setUpdateLoader] = useState(false);
  const [product, setProduct] = useState(null);
  const [sizes, setSizes] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [showConfirm, setShowConfirm] = useState({ show: false, sizeId: null });
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
    Tax: "",
    PriceAfterDiscount: "",
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await makeApi(`/api/get-single-product/${productId}`, "GET");

        const productData = response.data.product;
        setProduct(productData);
        setSizes(response.data.sizes);

        // Set form data with the product details
        setFormData({
          name: productData.name,
          description: productData.description,
          price: productData.price,
          quantity: productData.quantity,
          category: productData.category._id,
          brand: productData.brand,
          image: productData.image,
          thumbnail: productData.thumbnail,
          discountPercentage: productData.discountPercentage,
          productType: productData.productType,
          Tax: productData.Tax,
          PriceAfterDiscount: productData.PriceAfterDiscount,
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

  const handleSizeChange = (e, index, field) => {
    const updatedSizes = [...sizes];
    updatedSizes[index][field] = e.target.value;
    setSizes(updatedSizes);
  };

  const handleAddMoreSizes = () => {
    setSizes([...sizes, { size: "", sizetype: "", quantity: "" }]);
  };

  const handleDeleteSize = async (sizeId) => {
    try {
      await makeApi(`/api/delete-productsize/${sizeId}`, "DELETE");
      setSizes(sizes.filter((size) => size._id !== sizeId));
      setShowConfirm({ show: false, sizeId: null });
    } catch (error) {
      console.error("Error deleting size:", error);
    }
  };

  const handleImageUpload = async (e, type) => {
    const file = e.target.files[0];
    try {
      const url = await uploadToCloudinary(file, setUploadProgress);
      if (type === "thumbnail") {
        setFormData({ ...formData, thumbnail: url });
      } else {
        setFormData({ ...formData, image: [...formData.image, url] });
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleImageRemove = (index) => {
    const updatedImages = formData.image.filter((_, i) => i !== index);
    setFormData({ ...formData, image: updatedImages });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setUpdateLoader(true);
      await makeApi(`/api/update-product/${productId}`, "PUT", formData);
      for (const size of sizes) {
        if (size._id) {
          await makeApi(`/api/update-productsize/${size._id}`, "PUT", size);
        } else {
          await makeApi(`/api/add-productsize`, "POST", {
            productId,
            ...size,
          });
        }
      }
      console.log("Product updated successfully!");
      navigate("/admin/allproducts");
    } catch (error) {
      console.error("Error updating product:", error);
    } finally {
      setUpdateLoader(false);
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
              {/* General Information Section */}
              <div className="form-section">
                <h3>General Information</h3>
                <div className="form-group">
                  <label>Name:</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Description:</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Pricing Section */}
              {/* <div className="form-section">
                <h3>Pricing</h3>
                <div className="form-group">
                  <label>Price:</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Price After Discount:</label>
                  <input
                    type="number"
                    name="PriceAfterDiscount"
                    value={formData.PriceAfterDiscount}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Tax:</label>
                  <input
                    type="number"
                    name="Tax"
                    value={formData.Tax}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Discount Percentage:</label>
                  <input
                    type="number"
                    name="discountPercentage"
                    value={formData.discountPercentage}
                    onChange={handleChange}
                  />
                </div>
              </div> */}

              {/* Stock & Quantity Section */}
              <div className="form-section">
                <h3>Stock & Quantity</h3>
                {/* <div className="form-group">
                  <label>Quantity:</label>
                  <input
                    type="number"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                  />
                </div> */}
                <div className="form-group">
                  <label>Category:</label>
                  <input
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    disabled
                  />
                </div>
                <div className="form-group">
                  <label>Brand:</label>
                  <input
                    type="text"
                    name="brand"
                    value={formData.brand}
                    onChange={handleChange}
                  />
                </div>
                {/* <div className="form-group">
                  <label>Product Type:</label>
                  <input
                    type="text"
                    name="productType"
                    value={formData.productType}
                    onChange={handleChange}
                  />
                </div> */}
              </div>

              {/* Sizes Section */}
              <div className="form-section">
                <h3>Sizes</h3>
                <div className="size-section">
                  {sizes.map((size, index) => (
                    <div key={index} className="size-row">
                      <input
                        type="text"
                        name={`size_${index}`}
                        value={size.size}
                        placeholder="Size"
                        onChange={(e) => handleSizeChange(e, index, "size")}
                      />
                      <input
                        type="text"
                        name={`sizetype_${index}`}
                        value={size.sizetype}
                        placeholder="Size Type"
                        onChange={(e) => handleSizeChange(e, index, "sizetype")}
                      />
                      <input
                        type="number"
                        name={`quantity_${index}`}
                        value={size.quantity}
                        placeholder="Quantity"
                        onChange={(e) => handleSizeChange(e, index, "quantity")}
                      />
                      {size._id && (
                        <button
                          type="button"
                          onClick={() =>
                            setShowConfirm({ show: true, sizeId: size._id })
                          }
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    className="add-more-sizes-button"
                    onClick={handleAddMoreSizes}
                  >
                    Add More Sizes
                  </button>
                </div>
              </div>

              {/* Images Section */}
              <div className="form-section">
                <h3>Images</h3>
                <div className="update_product_Image_section">
                  <label>Thumbnail:</label>
                  <input
                    type="file"
                    onChange={(e) => handleImageUpload(e, "thumbnail")}
                  />
                  {formData.thumbnail && (
                    <img
                      src={formData.thumbnail}
                      alt="Thumbnail"
                      className="update_product_image_thumbnail"
                    />
                  )}
                </div>

                <div className="update_product_Image_section">
                  <label>Product Images:</label>
                  {formData.image.map((img, index) => (
                    <div key={index} className="image_wrapper">
                      <img src={img} alt={`Product ${index}`} />
                      <button
                        type="button"
                        className="remove_image_button"
                        onClick={() => handleImageRemove(index)}
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <input
                    type="file"
                    onChange={(e) => handleImageUpload(e, "image")}
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="form-section">
                <button
                  type="submit"
                  className="admin_panel_button"
                  disabled={updateloader}
                >
                  {updateloader ? <Loader /> : "Update Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Confirm Delete Size Popup */}
      {showConfirm.show && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "#fff",
            padding: "20px",
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
            zIndex: 1000,
          }}
        >
          <p>Are you sure you want to delete this size?</p>
          <button
            onClick={() => handleDeleteSize(showConfirm.sizeId)}
            style={{ marginRight: "10px" }}
          >
            Yes
          </button>
          <button onClick={() => setShowConfirm({ show: false, sizeId: null })}>
            No
          </button>
        </div>
      )}
    </>
  );
}

export default UpdateProduct;
