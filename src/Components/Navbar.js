import React, { useContext } from "react";
import { store } from "../App";
import { Link, useNavigate } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import authService from "../Services/auth";
import axios from "axios";

const Navbar = ({ counter, setCounter, details, setDetails }) => {
  const URL = "https://food-delivery150.herokuapp.com";
  const [cartData, setCartData] = useContext(store);
  // const [details, setDetails] = useContext(store);
  const navigate = useNavigate();

  const handleLogout = () => {
    authService.logout();
    navigate("/");
    window.location.reload();
  };

  const currentUrl = window.location.href;
  let convertedUrl = currentUrl.split("/");
  console.log(currentUrl.split("/")[convertedUrl.length - 1]);

  console.log(details);
  return (
    <div>
      <nav
        className="navbar navbar-expand-lg navbar-light"
        style={{ backgroundColor: "purple" }}
      >
        <div className="container-fluid d-flex justify-content-around align-items-center">
          <Link
            className="btn btn-light mt-3"
            to="/createItem"
            style={
              currentUrl.split("/")[convertedUrl.length - 1] == "signUp" ||
              currentUrl.split("/")[convertedUrl.length - 1] == "" ||
              details.email !== "admin@gmail.com"
                ? { marginLeft: 70, marginBottom: 15, visibility: "hidden" }
                : { marginLeft: 70, marginBottom: 15 }
            }
          >
            Create Item
          </Link>

          <a className="navbar-brand ">
            <h1 className="text-light" style={{ marginLeft: 100 }}>
              <strong>JAGADEESH FOODS</strong>
            </h1>
          </a>
          {/* {
            details.email=='admin@gmail.com' ? <h4 className="text-light">Admin</h4> : null
          } */}
          <div style={{ marginRight: -60 }}>
            <h5
              className="text-light"
              style={
                details.email !== "admin@gmail.com" ||
                currentUrl.split("/")[convertedUrl.length - 1] == "signUp" ||
                currentUrl.split("/")[convertedUrl.length - 1] == ""
                  ? { visibility: "hidden" }
                  : {  }
              }
            >
              Admin
            </h5>
          </div>

          <Link
            className="btn btn-outline-light mt-auto d-flex flex-row"
            style={
              currentUrl.split("/")[convertedUrl.length - 1] == "signUp" ||
              currentUrl.split("/")[convertedUrl.length - 1] == ""
                ? // (details.email!='Admin' && details.password!='Admin')
                  { marginRight: -35, marginBottom: 15, visibility: "hidden" }
                : { marginRight: -35, marginBottom: 15 }
            }
            to="/cartItems"
          >
            <ShoppingCartIcon />
            Cart
            <span className="badge bg-dark text-light mx-1 mt-1 rounded-pill">
              {counter}
            </span>
          </Link>
          <button
            className="btn btn-light mt-3"
            onClick={handleLogout}
            style={
              currentUrl.split("/")[convertedUrl.length - 1] == "signUp" ||
              currentUrl.split("/")[convertedUrl.length - 1] == ""
                ? {
                    marginRight: 50,
                    marginBottom: 15,
                    marginLeft: -45,
                    visibility: "hidden",
                  }
                : { marginRight: 50, marginBottom: 15, marginLeft: -45 }
            }
          >
            Logout
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
