import React, { useEffect } from "react";
import Header from "../Components/Header";
import { getBusinesses } from "../actions/business";
import { connect } from "react-redux";
import Footer from "../Components/Footer";

const Business = ({ business: { loading, businesses }, getBusinesses }) => {
  useEffect(() => {
    getBusinesses();
  }, [getBusinesses]);
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
          {!loading && businesses && businesses.length > 0 ? (
            businesses.slice(0, 4).map(({ name, description }) => (
              <div className="col-12 col-md-6 p-2">
                <div class="card shadow text-left">
                  <div class="card-body">
                    <h4 class="card-title">{name}</h4>
                    <p class="card-text">{description}</p>
                  </div>
                </div>
              </div>
            ))
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

export default connect(mapStateToProps, { getBusinesses })(Business);
