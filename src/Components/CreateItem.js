import React, { useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import Popup from "./Popup";
import "./Popup.css";
import {Link} from 'react-router-dom';
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import FastfoodIcon from '@mui/icons-material/Fastfood';

const CreateItem = () => {
  const URL = "https://food-delivery150.herokuapp.com";
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      price: "",
      image: "",
      category: "",
    },
    onSubmit: (values) => {
      try {
        axios.post(`${URL}/createItem`, values).then((res) => {
          console.log(res.data);
        });
        togglePopup();
      } catch (e) {
        console.log(e);
      }
      values.name = "";
      values.price = "";
      values.image = "";
      values.category = "";
    },
    validate: (values) => {
      let errors = {};
      if (!values.name) {
        errors.name = "Name is Required";
      }
      if (!values.price) {
        errors.price = "Price is Required";
      }
      if (!values.image) {
        errors.image = "Image text is Required";
      }
      if (!values.category) {
        errors.category = "Category is Required";
      }
      return errors;
    },
  });

  return (
    <div className="container">
      <h1 style={{textAlign: 'center'}}><b>Create an Item</b> <FastfoodIcon style={{fontSize: 40, color: 'red'}}/></h1>
      <div className="row">
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Item Name
            </label>
            <input
              type="text"
              className="form-control"
              style={{ border: "1px purple solid" }}
              id="name"
              name="name"
              placeholder="Enter the name of the item"
              value={formik.values.name}
              onChange={formik.handleChange}
            />
            {formik.errors.name ? (
              <div style={{ color: "red" }}>{formik.errors.name}</div>
            ) : null}
          </div>
          <div className="mb-3">
            <label htmlFor="price" className="form-label">
              Price
            </label>
            <input
              type="number"
              className="form-control"
              style={{ border: "1px purple solid" }}
              id="price"
              name="price"
              placeholder="Enter the price of the item"
              value={formik.values.price}
              onChange={formik.handleChange}
            />
            {formik.errors.price ? (
              <div style={{ color: "red" }}>{formik.errors.price}</div>
            ) : null}
          </div>
          <div className="mb-3">
            <label htmlFor="image" className="form-label">
              Image
            </label>
            <input
              type="text"
              className="form-control"
              style={{ border: "1px purple solid" }}
              id="image"
              name="image"
              placeholder="Enter the image address of the item from google"
              value={formik.values.image}
              onChange={formik.handleChange}
            />
            {formik.errors.image ? (
              <div style={{ color: "red" }}>{formik.errors.image}</div>
            ) : null}
          </div>
          <div className="mb-3">
            <label htmlFor="category" className="form-label">
              Category
            </label>
            <input
              type="text"
              className="form-control"
              style={{ border: "1px purple solid" }}
              id="category"
              name="category"
              placeholder="Enter the category of the item (vegetarian Or non-vegetarian)"
              value={formik.values.category}
              onChange={formik.handleChange}
            />
            {formik.errors.category ? (
              <div style={{ color: "red" }}>{formik.errors.category}</div>
            ) : null}
          </div>
            <div className="my-4">
          <button
            type="submit"
            className="btn btn-light text-white"
            style={{ backgroundColor: "purple" }}
          >
            Create
          </button>
          <Link to="/getItems" className="btn btn-light mx-2" style={{backgroundColor: "purple", color: 'white'}}>Dashboard</Link>
          </div>
          {isOpen && (
            <Popup
              style={{ width: 50, height: 30 }}
              content={
                <div className="d-flex flex-column justify-content-start align-items-start">
                  <h1>
                    Item has been created Successfully{" "}
                    <DoneOutlineIcon style={{ fontSize: 60, color: "green" }} />
                  </h1>
                  
                  <h4 className="mt-3">Click on <span style={{color:'purple'}}>DASHBOARD</span> button below to see the created item</h4>
                  <div className="mt-3">
                    <button
                      className="btn btn-success mt-4"
                      onClick={() => setIsOpen(!isOpen)}
                    >
                      Close
                    </button>
                    <Link to="/getItems" className="btn btn-light mt-4 mx-2" style={{backgroundColor: 'purple', color: 'white'}}>Dashboard</Link>
                  </div>
                </div>
              }
            />
          )}
        </form>
      </div>
    </div>
  );
};

export default CreateItem;
