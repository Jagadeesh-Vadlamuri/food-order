import axios from "axios";
import React, { useEffect, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { store } from "../App";
import Popup from "./Popup";
import "./Popup.css";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import { borderRadius } from "@mui/system";
import StripeCheckout from "react-stripe-checkout";
import { toast } from "react-toastify";
import GooglePayButton from "@google-pay/button-react";

const CartItems = ({ fdata, counter, setCounter, details, setDetails }) => {
  const URL = "https://food-delivery150.herokuapp.com";
  const [isOpen, setIsOpen] = useState(false);
  const [cartData, setCartData] = useContext(store);
  // const [details, setDetails] = useContext(store);

  const handleRemove = (id) => {
    setCartData((prev) => prev.filter((item) => item._id !== id));
  };
  setCounter(cartData.length);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const handlePlaceOrder = () => {
    togglePopup();
  };
  var sum = 0;
  for (let i = 0; i < cartData.length; i++) {
    sum += cartData[i].price;
  }
  console.log(sum);

  // const handleToken = async(token, addresses) => {
  //   const response = await axios.post(`${URL}/checkout`, {
  //     token,
  //     cartData
  //   });
  //   const {status} = response.data
  //   if(status == 'success') {
  //     // togglePopup();
  //     toast('Success !', {type: 'success'});
  //   } else{
  //     toast('Something went wrong !', {type: 'error'})
  //   }
  // }

  return (
    <div className="container">
      <div className="mb-2 d-flex justify-content-end align-items-center">
        <Link
          to="/getItems"
          className="btn btn-light text-light"
          style={{ backgroundColor: "purple" }}
        >
          Dashboard
        </Link>
      </div>

      {counter == 0 ? (
        <div className="d-flex flex-column justify-content-center align-items-center">
          <h1>No Items added to the Cart</h1>
          <h2 className="mt-4">
            Click on the <span style={{ color: "purple" }}>DASHBOARD</span>{" "}
            button above and add the items into your cart
          </h2>
        </div>
      ) : (
        cartData.map((item) => {
          return (
            <>
              <div
                className="card mb-3"
                style={{ height: 250, border: "1px solid purple" }}
              >
                <div className="row g-0">
                  <div className="col-md-4">
                    <img
                      src={item.image}
                      className="img-fluid rounded-start"
                      alt="Chicken"
                      style={{ width: 360, height: 248 }}
                    />
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <h5 className="card-title">
                        <b>{item.name}</b>
                      </h5>
                      <p className="card-text">({item.category})</p>
                      <p className="card-text" style={{ fontSize: 30 }}>
                        <strong>{item.price}</strong>/-
                      </p>
                      <p className="card-text">
                        Tasty and Yummy food items on the way. Enjoy the food
                      </p>
                      <div className="d-flex align-content-end ">
                        <button
                          className="btn btn-danger"
                          onClick={() => handleRemove(item._id)}
                        >
                          Remove from Cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          );
        })
      )}
      {cartData.length != 0 ? (
        <div className="mb-2 d-flex justify-content-end align-items-center">
          <GooglePayButton
            environment="TEST"
            paymentRequest={{
              apiVersion: 2,
              apiVersionMinor: 0,
              allowedPaymentMethods: [
                {
                  type: "CARD",
                  parameters: {
                    allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
                    allowedCardNetworks: ["MASTERCARD", "VISA"],
                  },
                  tokenizationSpecification: {
                    type: "PAYMENT_GATEWAY",
                    parameters: {
                      gateway: "example",
                      gatewayMerchantId: "exampleGatewayMerchantId",
                    },
                  },
                },
              ],
              merchantInfo: {
                merchantId: "BCR2DN4TUCHK2TA",
                merchantName: "Jagadeesh Foods",
              },
              transactionInfo: {
                totalPriceStatus: "FINAL",
                totalPriceLabel: "Total",
                totalPrice: `${sum}`,
                currencyCode: "INR",
                countryCode: "IN",
              },
              shippingAddressRequired: true,
              callbackIntents: ["SHIPPING_ADDRESS", "PAYMENT_AUTHORIZATION"],
            }}
            onLoadPaymentData={(paymentRequest) => {
              console.log("success", paymentRequest);
            }}
            onPaymentAuthorized={(paymentData) => {
              console.log("Payment Authorized Data:", paymentData);
              return { transactionState: "SUCCESS" };
            }}
            onPaymentDataChanged={(paymentData) => {
              console.log("On Payment Data Changed:", paymentData);
              return {};
            }}
            existingPaymentMethodRequired="false"
            buttonColor="black"
            buttonType="order"
          />
        </div>
      ) : null}

      {isOpen && (
        <Popup
          content={
            <div className="d-flex flex-column justify-content-around align-items-start">
              <h2>
                <b>Congratulations...Your Order has been placed</b>{" "}
                <CheckCircleIcon style={{ fontSize: 50, color: "green" }} />
              </h2>

              <h4 className="card-text mt-2">
                Food is being prepared for <b>{cartData.length}</b> item(s){" "}
                <FastfoodIcon style={{ fontSize: 40, color: "red" }} />
              </h4>
              <h4 className="card-text mt-2">
                Total Bill for your Order is -{" "}
                <b
                  style={{
                    backgroundColor: "purple",
                    color: "white",
                    padding: 7,
                    borderRadius: "20px",
                  }}
                >
                  {sum}/-
                </b>
              </h4>
              <div className="mt-3">
                <button
                  className="btn btn-success mt-4"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  Close
                </button>
              </div>
            </div>
          }
        />
      )}
    </div>
  );
};

export default CartItems;
