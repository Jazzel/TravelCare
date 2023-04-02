import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getBusinesses } from "../actions/business";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import { getDiscounts } from "../actions/discounts";

const Home = ({
  business: { loading, businesses },
  getDiscounts,
  getBusinesses,
  discount: { discounts },
}) => {
  const navigate = useNavigate();

  const testimonials = [
    {
      name: "User Dave",
      msg: "Loved the service, got my insurance in 5 minutes",
      rating: 4,
    },
    {
      name: "User Dennis",
      msg: "Loved the service, got my insurance in 5 minutes",
      rating: 5,
    },
    {
      name: "User Sara",
      msg: "Loved the service, got my insurance in 5 minutes",
      rating: 2,
    },
    {
      name: "User Jake",
      msg: "Loved the service, got my insurance in 5 minutes",
      rating: 3,
    },
    {
      name: "User Paul",
      msg: "Loved the service, got my insurance in 5 minutes",
      rating: 4,
    },
  ];

  useEffect(() => {
    getBusinesses();
    getDiscounts();
  }, [getBusinesses, getDiscounts]);

  return (
    <>
      <div className="bg-dark">
        <Header />
        <div
          className="container  mt-5"
          style={{ paddingLeft: "8%", paddingTop: "2%" }}
        >
          <h1 className="text-light">About Us</h1>
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
          What we do
        </h2>
        <p
          className="pt-4"
          style={{
            textAlign: "center",
          }}
        >
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rerum nulla
          numquam sunt. Aliquam quam voluptatem enim ex expedita quaerat quis
          est id unde autem asperiores ratione, nulla eos itaque perspiciatis.
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rerum nulla
          numquam sunt. Aliquam quam voluptatem enim ex expedita quaerat quis
          est id unde autem asperiores ratione, nulla eos itaque perspiciatis.
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rerum nulla
          numquam sunt. Aliquam quam voluptatem enim ex expedita quaerat quis
          est id unde autem asperiores ratione, nulla eos itaque perspiciatis.
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rerum nulla
          numquam sunt. Aliquam quam voluptatem enim ex expedita quaerat quis
          est id unde autem asperiores ratione, nulla eos itaque perspiciatis.
        </p>
      </section>
      <section className="container pl-5 pt-5 pr-5">
        <h2
          style={{
            textAlign: "center",
            textTransform: "uppercase",
            letterSpacing: "5px",
            fontWeight: "600",
          }}
        >
          Discounts
        </h2>
        <br />
        <div className="row">
          {/* {discounts &&
            discounts.length > 0 &&
            discounts.map((discount) => (
              <div className="col-4">
                <div className="card text-left">
                  <div className="card-body p-5">
                    <div className="styled-back">@</div>

                    <h4 className="card-title">{discount?.name}</h4>
                    <p className="card-text">
                      Percentage: {discount?.percentage} %
                    </p>
                    <p className="card-text">{discount?.description}</p>
                    <p className="card-text">
                      Description: {discount?.description}
                    </p>
                    <p className="card-text">
                      Ends at: {new Date(discount?.endsAt).toDateString()}
                    </p>
                  </div>
                </div>
              </div>
            ))} */}
          {!loading && businesses && businesses.length > 0 ? (
            businesses
              .slice(0, 4)
              .filter((business) => business.discountPecentage > 0)
              .map(
                ({
                  name,
                  description,
                  businessname,
                  username,
                  phone,
                  address,
                  price,
                  discountPecentage,
                  discount,
                  email,
                  updatedAt,
                }) => (
                  <div className="col-12 col-md-6">
                    <div className="card mt-3 shadow">
                      <div className="card-body p-5">
                        <div className="styled-back">@</div>
                        <h3>
                          {name} by @{businessname}
                        </h3>
                        <br />
                        <p>
                          Price:{" "}
                          <span
                            style={{
                              textDecoration:
                                discountPecentage > 0 && "line-through",
                            }}
                          >
                            {price} $
                          </span>{" "}
                          <span style={{ color: "red", fontWeight: "bold" }}>
                            {discountPecentage > 0 &&
                              price - (discountPecentage * price) / 100 + " $"}
                          </span>
                        </p>
                        <p>{description}</p>
                        <p>
                          Added By: {username} <br />
                          Contact Number: {phone} <br />
                          Contact Email: {email} <br />
                          Address: {address} <br />
                          Last updated:{" "}
                          {new Date(`${updatedAt}`).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                )
              )
          ) : (
            <div className="card col text-left shadow">
              <div className="card-body">
                <p className="card-text text-center">
                  No discounts are currently active !
                </p>
              </div>
            </div>
          )}
        </div>
      </section>
      <div>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#212529"
            fillOpacity="1"
            d="M0,192L80,208C160,224,320,256,480,256C640,256,800,224,960,224C1120,224,1280,256,1360,272L1440,288L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
          ></path>
        </svg>
        <section className="container-fluid p-5 text-light bg-dark shadow">
          <div className="container">
            <div className="row p-5">
              <div className="col-12 col-lg-6">
                <h2>Heading 1</h2>
                <br />
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque
                  saepe sapiente architecto, et blanditiis aut facere
                  repudiandae esse! Illo ex voluptates laborum magnam
                  voluptatibus libero autem. Vitae, enim placeat. Molestias.
                </p>
              </div>
              <div
                className="col-12 col-lg-6 "
                style={{ borderLeft: "#fff solid 2px" }}
              >
                <h2>Headding 2</h2>
                <br />
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque
                  saepe sapiente architecto, et blanditiis aut facere
                  repudiandae esse! Illo ex voluptates laborum magnam
                  voluptatibus libero autem. Vitae, enim placeat. Molestias.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
      <section className="container mb-5" style={{ marginTop: "100px" }}>
        <h2
          style={{
            textAlign: "center",
            textTransform: "uppercase",
            letterSpacing: "5px",
            fontWeight: "600",
          }}
        >
          Trending Services
        </h2>
        <br />
        <br />
        <div className="row">
          {!loading && businesses && businesses.length > 0 ? (
            businesses
              .slice(0, 4)
              .map(
                ({
                  name,
                  description,
                  businessname,
                  username,
                  phone,
                  address,
                  email,
                  updatedAt,
                }) => (
                  <div className="col-12 col-md-6">
                    <div className="card mt-3 shadow">
                      <div className="card-body p-5">
                        <div className="styled-back">@</div>
                        <h3>
                          {name} by @{businessname}
                        </h3>
                        <br />
                        <p>{description}</p>
                        <p>
                          Added By: {username} <br />
                          Contact Number: {phone} <br />
                          Contact Email: {email} <br />
                          Address: {address} <br />
                          Last updated:{" "}
                          {new Date(`${updatedAt}`).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                )
              )
          ) : (
            <div className="card col text-left shadow">
              <div className="card-body">
                <p className="card-text text-center">
                  No services available right now !
                </p>
              </div>
            </div>
          )}
        </div>
        <br />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {!loading && businesses && businesses.length > 0 && (
            <button
              className="btn btn-dark text-center m-auto"
              onClick={() => navigate("/business")}
            >
              View More {">"}
            </button>
          )}
        </div>
      </section>
      <section className="container mb-5" style={{ marginTop: "100px" }}>
        <h2
          style={{
            textAlign: "center",
            textTransform: "uppercase",
            letterSpacing: "5px",
            fontWeight: "600",
          }}
        >
          Testimonials
        </h2>
        <br />
        <br />
        <div className="row">
          {testimonials.map(({ name, rating, msg }) => (
            <div className="col-12 col-lg-4" key={name}>
              <div className="card mt-3 shadow">
                <div className="card-body">
                  <div className="row">
                    <div
                      className="col-12 col-lg-2"
                      style={{
                        justifyContent: "center",
                        alignItems: "center",
                        display: "flex",
                      }}
                    >
                      <img
                        src={require("./../assets/user.png")}
                        width="100%"
                        alt="User"
                      />
                    </div>
                    <div className="col-12 col-lg-10">
                      <p>
                        <b>{name}</b>
                      </p>
                      <p>{msg}</p>
                      <p>
                        {rating &&
                          [...Array(rating)].map((x, i) => (
                            <img
                              key={i}
                              src={require("./../assets/star.png")}
                              width="25px"
                              alt="rating"
                            />
                          ))}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </>
  );
};

const mapStateToProps = (state) => ({
  business: state.business,
  discount: state.discount,
});

export default connect(mapStateToProps, { getBusinesses, getDiscounts })(Home);
