import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import DeliveryDiningIcon from "@mui/icons-material/DeliveryDining";
import AuthService from "../Services/Auth_Service";
import authService from "../Services/auth";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import { store } from "../App";

const Homepage = ({details, setDetails}) => {
  const URL = "https://food-delivery150.herokuapp.com";
  // const [email, setEmail] = useState("")
  // const [password, setPassword] = useState("")
  const navigate = useNavigate();
  // const [details, setDetails] = useContext(store);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      try {
        if(values.email=='admin@gmail.com'){
          // navigate(`/getItems`)
          setDetails({
            email: values.email
          })
        }
        await authService.login(values.email, values.password).then(
          () => {
            navigate(`/getItems`);
            // window.location.reload();
          },
          (error) => {
            console.log(error);
          }
        );
      } catch (err) {
        console.log(err);
      }
    },
    validate: (values) => {
      let errors = {};
      if (!values.email) {
        errors.email = "Email is Required";
      }
      if (!values.password) {
        errors.password = "Password is Required";
      }
      return errors;
    },
  });

  // useEffect(() => {
  //   try{
  //     axios.get(`${URL}/auth/users`).then((res) => {
  //       console.log(res.data[1].password)
  //     })
  //   } catch(err) {
  //     console.log(err)
  //   }
  // })

  return (
    <div className="container">
      <div
        className="d-flex flex-column justify-content-start align-items-center"
        style={{ paddingTop: 40 }}
      >
        <div
          className="card mt-4"
          style={{ borderRadius: 5, backgroundColor: "#f2f3e8" }}
        >
          <div
            className="card-header d-flex justify-content-between align-items-center"
            style={{ backgroundColor: "purple", color: "white" }}
          >
            <h3>Login</h3>
            <VpnKeyIcon style={{ fontSize: 35 }} />
          </div>
          <div
            className="card-body d-flex flex-row justify-content-center align-items-start my-4"
            style={{ paddingLeft: 40, paddingTop: 40, paddingRight: 40 }}
          >
            <form
              // style={{ paddingBottom: 20 }}
              onSubmit={formik.handleSubmit}
            >
              <div className="d-flex flex-column justify-content-between align-items-start">
                <div className="d-flex justify-content-between align-items-start">
                  <div className="d-flex flex-column">
                    <label htmlFor="email" style={{ fontSize: 20 }}>
                      <b>Email <span className="text-danger">*</span></b>
                    </label>
                    <input
                      autoComplete="off"
                      style={{ width: 270, border: "1px solid purple" }}
                      // onChange={(e)=> setEmail(e.target.value)}
                      onChange={formik.handleChange}
                      className="form-control"
                      type="text"
                      id="email"
                      name="email"
                      value={formik.values.email}
                      placeholder="Enter your Email"
                    />
                    {formik.errors.email ? (
                      <div style={{ color: "red" }}>{formik.errors.email}</div>
                    ) : null}
                  </div>
                  <div
                    className="d-flex flex-column"
                    style={{ marginLeft: 30 }}
                  >
                    <label htmlFor="password" style={{ fontSize: 20 }}>
                      <b>Password <span className="text-danger">*</span></b>
                    </label>
                    <input
                      autoComplete="off"
                      style={{ width: 270, border: "1px solid purple" }}
                      // onChange={(e)=> setPassword(e.target.value)}
                      onChange={formik.handleChange}
                      className="form-control"
                      type="password"
                      id="password"
                      name="password"
                      value={formik.values.password}
                      placeholder="Enter your Password"
                    />
                    {formik.errors.password ? (
                      <div style={{ color: "red" }}>
                        {formik.errors.password}
                      </div>
                    ) : null}
                  </div>
                </div>
                <div>
                  <div
                    className="d-flex justify-content-between align-items-center"
                    style={{ marginTop: 50 }}
                  >
                    <Link
                      className="btn btn-light"
                      to="/signUp"
                      style={{
                        width: 120,
                        height: 40,
                        backgroundColor: "purple",
                        color: "white",
                        borderRadius: 8,
                      }}
                    >
                      Sign Up
                    </Link>
                    <button
                      className="btn btn-light"
                      // type="button"
                      // onClick={(e)=>handleLogin(e)}
                      style={{
                        width: 120,
                        height: 40,
                        backgroundColor: "purple",
                        color: "white",
                        borderRadius: 8,
                        marginLeft: 333,
                      }}
                    >
                      Login
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
