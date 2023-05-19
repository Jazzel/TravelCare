import React from "react";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import { connect } from "react-redux";

import Alert from "../Components/Alert";

const Tourists = ({}) => {
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
  return (
    <div>
      <div className="bg-dark">
        <Header />

        <div
          className="container  mt-5"
          style={{ paddingLeft: "8%", paddingTop: "2%" }}
        >
          <h1 className="text-light">About Us</h1>
          <h6 className="text-light pt-3">
            <i>
              Our web application provides a comprehensive solution that maximizes marketing opportunities for local businesses, improves operational efficiency through valuable feedback, and fosters collaboration and growth within the industry. By removing barriers and promoting direct connections, we aim to bring the experience of tourism to new heights and contribute to the economic development of the entire state.
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
      <section></section>
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
        The SA Tourism Booster project aims to revolutionize the local tourism industry by providing a web application that connects business owners directly with tourists. By removing intermediaries, the project seeks to create a platform that empowers local businesses, maximizes their marketing efforts, improves operational efficiency through feedback, and facilitates valuable insights from competitors. This initiative not only benefits individual businesses but also contributes to the growth of the entire state's tourism sector.

        The project's objective is to develop a dynamic website with multiple web pages by June 2023. This website will serve as a comprehensive solution to address the challenges faced by the tourism industry, particularly due to the Covid-19 pandemic and the eruption of the Ukraine war. The web application will fulfill the client's requirements by facilitating direct connections between business owners and tourists, fostering collaboration and growth opportunities for local businesses, and enabling them to promote offers and deals on their services.

        To ensure the website's success, thorough testing will be conducted to confirm that it meets all client requirements and passes at least 90% of the test cases. Additionally, the project aims to optimize the website's performance by ensuring that the processing time to load web content and information is 4 seconds or less, providing visitors with a seamless and efficient user experience.

        By achieving these goals, the SA Tourism Booster project will contribute to the revitalization of the local tourism industry, empower businesses, and bring the experience of tourism to new heights, ultimately benefiting both business owners and tourists alike.





        </p>
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
      <br />
      <br />
      <br />
      <br />
      <Footer />
    </div>
  );
};

const mapStateToProps = () => ({});

export default connect(mapStateToProps, {})(Tourists);
