import React from "react";
import { connect } from "react-redux";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import {
  removeFromCart,
  decrementQuantity,
  emptyCart,
  incrementQuantity,
} from "../actions/cart";

import PropTypes from "prop-types";
import { cartTotal } from "../reducers/cart";

const Cart = ({
  cart: { items },
  removeFromCart,
  decrementQuantity,
  incrementQuantity,
  emptyCart,
}) => {
  console.log(items);
  const checkout = () => {
    console.log("checkout");

    let data = localStorage.getItem("history")
      ? JSON.parse(localStorage.getItem("history"))
      : [];

    data = [...data, ...items];

    console.log(data);

    localStorage.setItem("history", JSON.stringify(data));

    alert("Checkout successful");
    localStorage.removeItem("cart");
    emptyCart();
  };

  return (
    <div>
      <div className="bg-dark">
        <Header />

        <div
          className="container  mt-5"
          style={{ paddingLeft: "8%", paddingTop: "2%" }}
        >
          <h1 className="text-light">Cart</h1>
          <h6 className="text-light pt-3">
            <i>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque
              saepe sapiente architecto, et blanditiis aut facere repudiandae
              esse! Illo ex voluptates laborum magnam voluptatibus libero autem.
              Vitae, enim placeat. Molestias.
            </i>
          </h6>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#fff"
            fillOpacity="1"
            d="M0,160L30,170.7C60,181,120,203,180,197.3C240,192,300,160,360,165.3C420,171,480,213,540,218.7C600,224,660,192,720,160C780,128,840,96,900,85.3C960,75,1020,85,1080,112C1140,139,1200,181,1260,181.3C1320,181,1380,139,1410,117.3L1440,96L1440,320L1410,320C1380,320,1320,320,1260,320C1200,320,1140,320,1080,320C1020,320,960,320,900,320C840,320,780,320,720,320C660,320,600,320,540,320C480,320,420,320,360,320C300,320,240,320,180,320C120,320,60,320,30,320L0,320Z"
          ></path>
        </svg>
      </div>
      <section className="container pl-5 pt-5 pr-5">
        <h2
          style={{
            textAlign: "center",
            textTransform: "uppercase",
            letterSpacing: "5px",
            fontWeight: "600",
          }}
        >
          Shopping cart
        </h2>
        <hr />

        <div className="row mt-5 mb-3 text-center">
          <div className="col-2">
            <h4>Service</h4>
          </div>
          <div className="col-4">
            <h4>Business</h4>
          </div>
          <div className="col-2">
            <h4>Price</h4>
          </div>
          <div className="col-2">
            <h4>Quanity</h4>
          </div>
          <div className="col-1"></div>
        </div>

        <div className="card-columns">
          {items && items.length > 0 ? (
            items.map(({ _id, service, quantity }) => (
              <div className="card mt-3 w-100 shadow" key={_id}>
                <div className="card-body w-100">
                  <div className="row text-center">
                    <div
                      className="col-2"
                      style={{
                        height: "50px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      {service?.name}
                    </div>
                    <div
                      className="col-4"
                      style={{
                        height: "50px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      {service?.businessname}@{service?.username}
                    </div>
                    <div
                      className="col-2"
                      style={{
                        height: "50px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      {service?.discountPecentage > 0 ? (
                        <div>
                          {service?.price *
                            (1 - service?.discountPecentage / 100).toFixed(
                              2
                            )}{" "}
                          $
                        </div>
                      ) : (
                        <div>{service?.price} $</div>
                      )}
                    </div>
                    <div
                      className="col-2"
                      style={{
                        height: "50px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <button
                        className="btn btn-dark"
                        onClick={() => incrementQuantity(_id)}
                      >
                        +
                      </button>
                      <span className="p-3">{quantity}</span>
                      <button
                        className="btn btn-dark"
                        onClick={() => decrementQuantity(_id)}
                      >
                        -
                      </button>
                    </div>
                    <div
                      className="col-1"
                      style={{
                        height: "50px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <button
                        className="btn btn-danger"
                        onClick={() => removeFromCart(_id)}
                      >
                        x
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <center>No items added in cart a the moment </center>
          )}

          <div className="card mt-3 w-100 shadow">
            <div className="card-body w-100">
              <div className="row text-center">
                <div
                  className="col-2"
                  style={{
                    height: "50px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <h4>Total</h4>
                </div>
                <div
                  className="col"
                  style={{
                    height: "50px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <h5>Items: {items.length}</h5>
                </div>
                <div
                  className="col"
                  style={{
                    height: "50px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <h5>
                    Price:{" "}
                    {cartTotal(items).items ? cartTotal(items).total + " $" : 0}
                  </h5>
                </div>
              </div>
            </div>
          </div>
          <div className="p-3 mt-3 w-100 ">
            <div className=" w-100">
              {items.length > 0 ? (
                <div className="row shadow text-center">
                  <button
                    className="btn btn-large btn-success"
                    onClick={checkout}
                  >
                    Checkout
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </section>
      <br />
      <br />
      <br />
      <br />
      <Footer />
    </div>
  );
};

const mapStateToProps = (state) => ({
  cart: state.cart,
});

Cart.propTypes = {
  cart: PropTypes.object.isRequired,
  removeFromCart: PropTypes.func.isRequired,
  decrementQuantity: PropTypes.func.isRequired,
  incrementQuantity: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, {
  removeFromCart,
  decrementQuantity,
  incrementQuantity,
  emptyCart,
})(Cart);
