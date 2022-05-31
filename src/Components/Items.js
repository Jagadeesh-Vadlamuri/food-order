import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useFormik } from "formik";
import { store } from "../App";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";
import LinesEllipsis from "react-lines-ellipsis";

const Items = ({ fdata, datum, counter, setCounter }) => {
  const URL = "https://food-delivery150.herokuapp.com";

  const [cartData, setCartData] = useContext(store);
  const [timer, setTimer] = useState(0);

  const formik = useFormik({
    initialValues: {
      name: "",
      price: "",
      image: "",
      category: "",
      buttonText: "",
    },
  });
  const [items, setItems] = useState([formik.values]);

  const getItems = async () => {
    await axios.get(`${URL}/getItems`).then((res) => {
      setItems(res.data);
    });
  };

  const handleDelete = async (id) => {
    try {
      axios.delete(`${URL}/deleteItem/${id}`).then((res) => {
        console.log(res.data);
        setTimer(timer + 1);
      });
      
    } catch (e) {
      console.log(e);
    }
  };

  const handleClick = (id) => {
    let sample = items.filter((item) => id == item._id);

    if (sample[0]._id == id) {
      sample[0].start += 1;
      setCounter(counter + 1);
      setCartData([...cartData, sample[0]]);
    }
  };
  console.log(cartData);
  useEffect(() => {
    getItems();
  }, [timer]);

  return (
    <div className="container d-flex flex-row flex-wrap ">
      {items.map((item) => {
        return (
          <div className="mx-3 my-3">
            <div
              className="card "
              style={{ width: 340, height: "auto", border: "1px purple solid" }}
              key={item._id}
            >
              <img
                src={item.image}
                className="card-img-top"
                alt="chicken"
                style={{ width: 338, height: 220 }}
              />
              <div className="card-body bg-light d-flex flex-row justify-content-between align-items-center">
                <h5 className="card-title mx-2">{item.name}</h5>
                {/* <h5><LinesEllipsis 
                text={item.name}
                maxLine='1'
                ellipsis='...'
                trimRight
                basedOn='letters'
                className="card-title mx-2">
              </LinesEllipsis></h5> */}
                <p muted className="card-text mt-1">
                  ({item.category})
                </p>
                <Link
                  to=""
                  onClick={() => handleDelete(item._id)}
                  style={{ color: "purple", marginLeft: 20 }}
                >
                  <DeleteIcon style={{ marginBottom: 10, fontSize: 30 }} />
                </Link>
              </div>
              <div className="d-flex bg-light flex-row ">
                <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                  <button
                    className={
                      item.buttonText == "Add to Cart"
                        ? "btn btn-outline-dark mt-auto"
                        : "btn btn-outline-dark mt-auto bg-dark text-light"
                    }
                    style={{ width: 110, height: "auto" }}
                    onClick={() => handleClick(item._id)}
                  >
                    {item.buttonText}
                  </button>
                  <span
                    className="badge  text-white mx-2 mt-1 rounded-pill"
                    style={{ backgroundColor: "purple" }}
                  >
                    {item.start}
                  </span>
                </div>
                <div className="float-right">
                  <p className="card-text" style={{ fontSize: 25 }}>
                    <b>{item.price}/-</b>
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Items;
