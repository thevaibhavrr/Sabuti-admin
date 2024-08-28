import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { makeApi } from "../../api/callApi";
import Loader from "../../components/loader/loader";

function Editcategories() {
  const navigate = useNavigate();
  const { Id } = useParams();
  const [loading, setLoading] = useState(false);
  const [Updateloader, setUpdateLoader] = useState(false);
  const [product, setProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await makeApi(`/api/get-single-category/${Id}`, "GET");
        console.log(response.data);
        setProduct(response.data.category);
        setFormData({
          name: response.data.category.name,
          description: response.data.category.description,
          // Set more fields if needed
        });
      } catch (error) {
        console.error("Error fetching product details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [Id]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setUpdateLoader(true);

      const updateProduct = await makeApi(
        `/api/update-category/${Id}`,
        "PUT",
        formData
      );
      console.log("Product updated successfully!", updateProduct);
    } catch (error) {
      console.error("Error updating product:", error);
    } finally {
      setUpdateLoader(false);
      navigate("/admin/all-categories");
    }
  };
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
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
                  <label>Description:</label>
                  <textarea
                    name="description"
                    value={formData?.description}
                    onChange={handleChange}
                  />
                </div>

                <button type="submit" className="update_product_button">
                  {Updateloader ? <Loader /> : <div>Update Product</div>}
                </button>
              </form>
            </div>
          </div>
        )}
      </>
    </div>
  );
}

export default Editcategories;
