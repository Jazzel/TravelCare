import React, { useEffect, useState } from "react";
import Header from "../Components/Header";
import { getBusinesses } from "../actions/business";
import { addToCart } from "../actions/cart";
import { connect } from "react-redux";
import Footer from "../Components/Footer";
import { getDiscount } from "../actions/discounts";

const Business = ({
  business: { loading, businesses },
  getBusinesses,
  addToCart,
  getDiscount,
}) => {
  useEffect(() => {
    getBusinesses();
  }, [getBusinesses]);

  const [sortBy, setSortBy] = useState("price:high-to-low");

  const [btnClasses, setBtnClasses] = useState([
    "btn-dark",
    "btn-outline-dark",
    "btn-outline-dark",
    "btn-outline-dark",
  ]);

  const onClickHandler = (filter) => {
    setSortBy(filter);

    if (filter === "price:high-to-low") {
      setBtnClasses([
        "btn-dark",
        "btn-outline-dark",
        "btn-outline-dark",
        "btn-outline-dark",
      ]);
    }
    if (filter === "price:low-to-high") {
      setBtnClasses([
        "btn-outline-dark",
        "btn-dark",
        "btn-outline-dark",
        "btn-outline-dark",
      ]);
    }
    if (filter === "alpha:a-to-z") {
      setBtnClasses([
        "btn-outline-dark",
        "btn-outline-dark",
        "btn-dark",
        "btn-outline-dark",
      ]);
    }
    if (filter === "alpha:z-to-a") {
      setBtnClasses([
        "btn-outline-dark",
        "btn-outline-dark",
        "btn-outline-dark",
        "btn-dark",
      ]);
    }
  };

  return (
    <>
      <div className="bg-dark">
        <Header />
        <div
          className="container  mt-5"
          style={{ paddingLeft: "8%", paddingTop: "2%" }}
        >
          <h1 className="text-light">All Business Services</h1>
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
        <div className="row">
          <button
            type="button"
            name=""
            id=""
            className={`btn w-25 ${btnClasses[0]} btn-lg btn-block`}
            style={{ borderRadius: "0px" }}
            onClick={() => onClickHandler("price:high-to-low")}
          >
            Price: High to Low
          </button>
          <button
            type="button"
            name=""
            id=""
            className={`btn w-25 ${btnClasses[1]} btn-lg btn-block`}
            style={{ borderRadius: "0px" }}
            onClick={() => onClickHandler("price:low-to-high")}
          >
            Price: Low to High
          </button>
          <button
            type="button"
            name=""
            id=""
            className={`btn w-25 ${btnClasses[2]} btn-lg btn-block`}
            style={{ borderRadius: "0px" }}
            onClick={() => onClickHandler("alpha:a-to-z")}
          >
            Alpha: A to Z
          </button>
          <button
            type="button"
            name=""
            id=""
            className={`btn w-25 ${btnClasses[3]} btn-lg btn-block`}
            style={{ borderRadius: "0px" }}
            onClick={() => onClickHandler("alpha:z-to-a")}
          >
            Alpha: Z to A
          </button>
        </div>
      </section>
      <section className="container pl-5 pt-5 pr-5">
        <div className="row">
          {!loading && businesses && businesses.length > 0 ? (
            (sortBy === "price:high-to-low"
              ? businesses.sort((a, b) => b.price - a.price)
              : sortBy === "price:low-to-high"
              ? businesses.sort((a, b) => a.price - b.price)
              : sortBy === "alpha:a-to-z"
              ? businesses.sort((a, b) => a.name.localeCompare(b.name))
              : sortBy === "alpha:z-to-a"
              ? businesses.sort((a, b) => b.name.localeCompare(a.name))
              : businesses
            ).map(
              ({
                _id,
                name,
                description,
                businessname,
                username,
                price,
                phone,
                address,
                updatedAt,
                email,
                discountPecentage,
                discount,
                googleMapLink,
              }) => (
                <div className="card mt-3 shadow">
                  <div className="card-body p-5">
                    <div className="styled-back">@</div>
                    <h3>
                      {name} by @{businessname}
                    </h3>
                    <br />
                    <p>{description}</p>
                    <p>
                      Price:{" "}
                      <span
                        style={{
                          textDecoration:
                            discount &&
                            discount !== "No Discount" &&
                            discountPecentage > 0 &&
                            "line-through",
                        }}
                      >
                        {price} $
                      </span>{" "}
                      {discount &&
                        discount !== "No Discount" &&
                        discountPecentage > 0 && (
                          <span style={{ color: "red", fontWeight: "bold" }}>
                            {discount &&
                              price - (discountPecentage * price) / 100 + " $"}
                          </span>
                        )}
                    </p>
                    <br />
                    <p>
                      Added By: {username} <br />
                      Contact Number: {phone} <br />
                      Contact Email: {email} <br />
                      Address: {address} <br />
                      Google Maps: {googleMapLink || "None"} <br />
                      Last updated: {new Date(`${updatedAt}`).toLocaleString()}
                    </p>
                    <button
                      className="btn btn-dark"
                      onClick={() => {
                        const product = {
                          _id,
                          name,
                          description,
                          businessname,
                          username,
                          phone,
                          address,
                          price,
                          updatedAt,
                          discount,
                          discountPecentage,
                        };

                        alert("Service added to cart !");

                        addToCart(product);
                      }}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              )
            )
          ) : (
            <div class="card col text-left shadow">
              <div class="card-body">
                <p class="card-text text-center">
                  No services available right now !
                </p>
              </div>
            </div>
          )}
        </div>
      </section>
      <Footer />
    </>
  );
};

const mapStateToProps = (state) => ({
  business: state.business,
});

export default connect(mapStateToProps, {
  getBusinesses,
  getDiscount,
  addToCart,
})(Business);
