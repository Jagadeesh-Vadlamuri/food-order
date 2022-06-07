import { useFormik } from "formik";
import React, { useState, createContext, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import CartItems from "./Components/CartItems";
import CreateItem from "./Components/CreateItem";
import Signup from './Components/Signup';
import Homepage from "./Components/Homepage";
import Items from "./Components/Items";
import Navbar from "./Components/Navbar";
import instance from './Services/API';
import authService from './Services/auth';
import postService from './Services/Post_Service';
import TokenService from './Services/Token_Service';

export const store = createContext();

const App = () => {
  const URL = "https://food-delivery150.herokuapp.com";
  const [counter, setCounter] = useState(0);
  var datum = [];
  const [cartData, setCartData] = useState([]);
  const [details, setDetails] = useState([
    {
      fname: "",
      lname: "",
      email: "",
      password: ""
    }
  ])
  const formik = useFormik({
    initialValues: {
      name: "",
      price: "",
      image: "",
      category: "",
    },
  });

  return (
    <store.Provider value={[cartData, setCartData]}>
      <Navbar counter={counter} setCounter={setCounter} details={details} setDetails={setDetails}/>
      <Routes>
        <Route
          path="/cartItems"
          element={
            <CartItems
              fdata={formik}
              counter={counter}
              setCounter={setCounter}
              details={details} 
              setDetails={setDetails}
            />
          }
        />
        <Route path="/" element={<Homepage details={details} setDetails={setDetails}/>} />
        <Route
          path="/getItems"
          element={
            <Items
              fdata={formik}
              datum={datum}
              counter={counter}
              setCounter={setCounter}
              details={details}
              setDetails={setDetails}
            />
          }
        />

        <Route path="/createItem" element={<CreateItem />} />
        <Route path="/signUp" element={<Signup />} />
      </Routes>
    </store.Provider>
  );
};

export default App;
