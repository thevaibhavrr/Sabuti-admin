
import React, { useState } from "react";
import "../../adminCss/sidebar/adminsidebar.css";
import { Link } from "react-router-dom";
import Logo from "../../images/SK Foods Logo 3.png";

function Adminsidebar() {
  const [selectedItem, setSelectedItem] = useState("");
  const [isOpen, setIsOpen] = useState(true); // State to track sidebar open/close

  const handleMenuItemClick = (itemName) => {
    setSelectedItem(itemName);
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`main_admin_sidebar ${isOpen ? 'open' : 'closed'}`}>
      <button className="toggleButton" onClick={toggleSidebar}>
        {isOpen ? 'Close' : 'Open'}
      </button>
      <div className="admin_sidebar">
        <div className="admin_sidebar_header">
          <div className="admin_sidebar_header_logo">
            <img loading="lazy"
              alt="logo"
              src="https://res.cloudinary.com/dunzldpvc/image/upload/v1724845466/S-logo.2bd09d912f48dc27084b_hcprcw.png"
              className="admin_sidebar_header_logo_img"
            />
          </div>
        </div>
        <div className="admin_sidebar_menu">
          <div className="admin_sidebar_menu_list">
            <Link className="Link_tag" to={"/admin/admin-dashboard"}>
              <div
                className={`admin_sidebar_menu_items ${selectedItem === "Dashboard" && "selected"
                  }`}
                onClick={() => handleMenuItemClick("Dashboard")}
              >
                Dashboard
              </div>
            </Link>
            <Link className="Link_tag" to={"/admin/allproducts"}>
              <div
                className={`admin_sidebar_menu_items ${selectedItem === "All Products" && "selected"
                  }`}
                onClick={() => handleMenuItemClick("All Products")}
              >
                Products
              </div>
            </Link>
            <Link className="Link_tag" to={"/admin/all-orders"}>
              <div
                className={`admin_sidebar_menu_items ${selectedItem === "All Orders" && "selected"
                  }`}
                onClick={() => handleMenuItemClick("All Orders")}
              >
                Orders
              </div>
            </Link>
            <Link className="Link_tag" to={"/admin/all-categories"}>
              <div
                className={`admin_sidebar_menu_items ${selectedItem === "All catogory" && "selected"
                  }`}
                onClick={() => handleMenuItemClick("All catogory")}
              >
                Category
              </div>
            </Link>
            <Link className="Link_tag" to={"/admin/all-user"}>
              <div className={`admin_sidebar_menu_items ${selectedItem === "All Users" && "selected"}`} onClick={() => handleMenuItemClick("All Users")} >Users</div ></Link>
            <Link className="Link_tag" to={"/admin/subscribe-user"}>
              <div className={`admin_sidebar_menu_items ${selectedItem === "Subscribe Users" && "selected"}`} onClick={() => handleMenuItemClick("Subscribe Users")} >Subscribe Users</div ></Link>

                  <Link className="Link_tag" to={"/admin/offer-banner"}>
              <div className={`admin_sidebar_menu_items ${selectedItem === "Banner" && "selected"}`} onClick={() => handleMenuItemClick("Banner")} >Banner</div >
              </Link>
                  <Link className="Link_tag" to={"/admin/exist-offer-banner"}>
              <div className={`admin_sidebar_menu_items ${selectedItem === " Exist offer Banner " && "selected"}`} onClick={() => handleMenuItemClick(" Exist offer Banner ")} >Exist offer Banner</div >
              </Link>


          </div>
        </div>
      </div>
    </div>
  );
}

export default Adminsidebar;
