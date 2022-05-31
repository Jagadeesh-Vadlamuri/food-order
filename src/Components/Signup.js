import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import DeliveryDiningIcon from "@mui/icons-material/DeliveryDining";
import { useFormik } from "formik";
import axios from "axios";
// import AuthService from "../Services/Auth_Service";
import authService from "../Services/auth";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { store } from "../App";
import Popup2 from "./Popup2";
import "./Popup2.css";
import Popup3 from "./Popup2";
import "./Popup3.css";
import * as Yup from "yup";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import HowToRegIcon from "@mui/icons-material/HowToReg";

const Signup = () => {
  const URL = "https://food-delivery150.herokuapp.com";
  const [users, setUsers] = useState([]);
  const [details, setDetails] = useContext(store);
  const [isOpen2, setIsOpen2] = useState(false);
  const [isOpen3, setIsOpen3] = useState(false);

  const formik = useFormik({
    initialValues: {
      fname: "",
      lname: "",
      email: "",
      password: "",
      cpassword: "",
    },
    onSubmit: async (values) => {
      try {
        await authService.signup(values.email, values.password).then(
          (res) => {
            console.log("Signed Up Successfully", res);
          },
          (error) => {
            console.log(error);
          }
        );
        setDetails([...details, [values.fname, values.lname]]);
        
        var userData = users.filter((user) => values.email == user.email);
        console.log(userData);
        if (userData.length>0) {
          togglePopup3();
        } else {
          togglePopup2();
        }
      } catch (err) {
        console.log(err);
      }
      values.fname = "";
      values.lname = "";
      values.email = "";
      values.password = "";
      values.cpassword = "";
    },
    validate: (values) => {
      let errors = {};
      if (!values.fname) {
        errors.fname = "Firstname is Required";
      }
      if (!values.lname) {
        errors.lname = "Lastname is Required";
      }
      if (!values.email) {
        errors.email = "Email is Required";
      }
      if (!values.password) {
        errors.password = "Password is Required";
      }
      if (values.password !== values.cpassword) {
        errors.password = "Passwords doesn't match";
      }
      return errors;
    },
    validationSchema: Yup.object({
      fname: Yup.string()
        .max(10, "Must be less than or equal to 10 characters")
        .min(4, "Enter atleast 4 characters")
        .required("This field is required"),
      lname: Yup.string()
        .max(10, "Must be less than or equal to 10 characters")
        .min(4, "Enter atleast 4 characters")
        .required("This field is required"),
      email: Yup.string()
        .email("Invalid Email address")
        .required("This field is required"),
      password: Yup.string()
        .min(8, "Password should have a min of 8 chars")
        .required("This field is required"),
    }),
  });

  const getUsersData = () => {
    try {
      axios.get(`${URL}/auth/users`).then((res) => {
        setUsers(res.data);
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUsersData();
  });

  const togglePopup2 = () => {
    setIsOpen2(!isOpen2);
  };

  const togglePopup3 = () => {
    setIsOpen3(!isOpen3);
  };

  const navigate = useNavigate();
  // console.log(details);

  return (
    <div className="container">
      <div
        className="d-flex flex-column justify-content-center align-items-center"
        style={{ paddingTop: 40 }}
      >
        <div
          className="card mt-2"
          style={{ borderRadius: 5, backgroundColor: "#f2f3e8" }}
        >
          <div
            className="card-header d-flex justify-content-between align-items-center"
            style={{ backgroundColor: "purple", color: "white" }}
          >
            <h3>Register</h3>
            <LockOpenIcon style={{ fontSize: 35 }} />
          </div>
          <div
            className="card-body d-flex flex-column justify-content-center align-items-start"
            style={{ padding: 20 }}
          >
            <form
              className="d-flex flex-column justify-content-start align-items-start"
              style={{ paddingBottom: 10 }}
              onSubmit={formik.handleSubmit}
            >
              <div className="d-flex flex-row my-2">
                <div className="d-flex flex-column">
                  <label htmlFor="fname" style={{ fontSize: 20 }}>
                    <b>
                      First Name <span className="text-danger">*</span>
                    </b>
                  </label>
                  <input
                    style={{ width: 270, border: "1px solid purple" }}
                    className="form-control"
                    onChange={formik.handleChange}
                    type="text"
                    id="fname"
                    name="fname"
                    value={formik.values.fname}
                    placeholder="Enter your Firstname"
                  />
                  {formik.touched.fname && formik.errors.fname ? (
                    <div style={{ color: "red" }}>{formik.errors.fname}</div>
                  ) : null}
                </div>
                <div className="d-flex flex-column" style={{ marginLeft: 10 }}>
                  <label htmlFor="lname" style={{ fontSize: 20 }}>
                    <b>
                      Last Name <span className="text-danger">*</span>
                    </b>
                  </label>
                  <input
                    style={{ width: 270, border: "1px solid purple" }}
                    onChange={formik.handleChange}
                    className="form-control"
                    type="text"
                    id="lname"
                    name="lname"
                    value={formik.values.lname}
                    placeholder="Enter your Lastname"
                  />
                  {formik.touched.lname && formik.errors.lname ? (
                    <div style={{ color: "red" }}>{formik.errors.lname}</div>
                  ) : null}
                </div>
              </div>
              <div className="d-flex flex-column justify-content-start align-items-start my-2">
                <div className="d-flex flex-column">
                  <label
                    htmlFor="email"
                    style={{ fontSize: 20, float: "left" }}
                  >
                    <b>
                      Email <span className="text-danger">*</span>
                    </b>
                  </label>
                  <input
                    style={{ width: 550, border: "1px solid purple" }}
                    onChange={formik.handleChange}
                    className="form-control"
                    type="text"
                    id="email"
                    name="email"
                    value={formik.values.email}
                    placeholder="Enter your Email (eg: John@gmail.com)"
                  />
                  {formik.touched.email && formik.errors.email ? (
                    <div style={{ color: "red" }}>{formik.errors.email}</div>
                  ) : null}
                </div>
              </div>

              <div className="d-flex flex-row my-2">
                <div className="d-flex flex-column">
                  <label htmlFor="password" style={{ fontSize: 20 }}>
                    <b>
                      Password <span className="text-danger">*</span>
                    </b>
                  </label>
                  <input
                    style={{ width: 270, border: "1px solid purple" }}
                    onChange={formik.handleChange}
                    className="form-control"
                    type="text"
                    id="password"
                    name="password"
                    value={formik.values.password}
                    placeholder="Enter your Password"
                  />
                  {formik.touched.password && formik.errors.password ? (
                    <div style={{ color: "red" }}>{formik.errors.password}</div>
                  ) : null}
                </div>
                <div className="d-flex flex-column" style={{ marginLeft: 10 }}>
                  <label htmlFor="confirmpassword" style={{ fontSize: 20 }}>
                    <b>
                      Confirm Password <span className="text-danger">*</span>
                    </b>
                  </label>
                  <input
                    style={{ width: 270, border: "1px solid purple" }}
                    onChange={formik.handleChange}
                    className="form-control"
                    type="text"
                    id="cpassword"
                    name="cpassword"
                    value={formik.values.cpassword}
                    placeholder="Re-Enter your Password"
                  />
                  {formik.errors.cpassword ? (
                    <div style={{ color: "red" }}>
                      {formik.errors.cpassword}
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="mt-3 d-flex justify-content-between align-items-center" style={{width: 550}}>
                <Link
                  className="btn btn-light"
                  to="/"
                  style={{
                    width: 120,
                    height: 40,
                    backgroundColor: "purple",
                    color: "white",
                    borderRadius: 8,
                  }}
                >
                  Cancel
                </Link> 
                <button
                  className="btn btn-light"
                  // onClick={(e) => handleSignup(e)}
                  style={{
                    width: 120,
                    height: 40,
                    backgroundColor: "purple",
                    color: "white",
                    borderRadius: 8,
                  }}
                >
                  Register
                </button>

                {isOpen2 && (
                  <Popup2
                    style={{ width: 50, height: 30 }}
                    content={
                      <div className="d-flex flex-column justify-content-start align-items-start">
                        <h2>
                          User created Successfully{" "}
                          <HowToRegIcon
                            style={{ fontSize: 40, marginBottom: 10 }}
                          />
                        </h2>
                        <div className="mt-1">
                          <Link
                            to="/"
                            className="btn btn-light mt-4 mx-2"
                            style={{
                              backgroundColor: "purple",
                              color: "white",
                            }}
                          >
                            Login
                          </Link>
                          <button
                            className="btn btn-success mt-4"
                            onClick={() => setIsOpen2(!isOpen2)}
                          >
                            Sign up
                          </button>
                        </div>
                      </div>
                    }
                  />
                )}
                {isOpen3 && (
                  <Popup3
                    style={{ width: 50, height: 30 }}
                    content={
                      <div className="d-flex flex-column justify-content-start align-items-start">
                        <h2>
                          User already exists with same Email{""}
                          <PriorityHighIcon
                            style={{
                              fontSize: 40,
                              marginBottom: 10,
                              color: "red",
                            }}
                          />
                          {/* <HowToRegIcon
                            style={{ fontSize: 40, marginBottom: 10 }}
                          /> */}
                        </h2>
                        <div className="mt-1">
                          <Link
                            to="/"
                            className="btn btn-light mt-4 mx-2"
                            style={{
                              backgroundColor: "purple",
                              color: "white",
                            }}
                          >
                            Login
                          </Link>
                          <button
                            className="btn btn-success mt-4"
                            onClick={() => setIsOpen3(!isOpen3)}
                          >
                            Sign up
                          </button>
                        </div>
                      </div>
                    }
                  />
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
