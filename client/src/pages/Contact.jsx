import React from "react";
import Footer from "../Components/Footer";
import Header from "../Components/Header";

const Contact = () => {
  return (
    <div>
      <div className="bg-dark">
        <Header />

        <div
          className="container  mt-5"
          style={{ paddingLeft: "8%", paddingTop: "2%" }}
        >
          <h1 className="text-light">Contact Us</h1>
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
      <section>
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <h1 className="text-dark pt-5">Contact Us</h1>
              <p className="text-dark pt-3">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque
                saepe sapiente architecto, et blanditiis aut facere repudiandae
                esse! Illo ex voluptates laborum magnam voluptatibus libero
                autem. Vitae, enim placeat. Molestias.
              </p>
              <div className="row">
                <div className="col-md-6">
                  <h6 className="text-dark pt-3">
                    <i className="fas fa-map-marker-alt"></i> Address
                  </h6>
                  <p className="text-dark pt-3">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Atque saepe sapiente architecto, et blanditiis aut facere
                    repudiandae esse! Illo ex voluptates laborum magnam
                    voluptatibus libero autem. Vitae, enim placeat. Molestias.
                  </p>
                </div>
                <div className="col-md-6">
                  <h6 className="text-dark pt-3">
                    <i className="fas fa-phone-alt"></i> Phone
                  </h6>
                  <p className="text-dark pt-3">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Atque saepe sapiente architecto, et blanditiis aut facere
                    repudiandae esse! Illo ex voluptates laborum magnam
                    voluptatibus libero autem. Vitae, enim placeat. Molestias.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <form
                className="pt-5"
                onSubmit={() =>
                  alert(
                    "Thankyou for submitting the contact form. Our marketing team will reach out to you soon !"
                  )
                }
              >
                <div className="form-group mt-5">
                  <label for="email">Email address</label>
                  <input
                    type="email"
                    required
                    className="form-control mt-2"
                    id="email"
                    aria-describedby="email"
                    placeholder="Enter email"
                  />
                  <small id="email" className="form-text text-muted">
                    We'll never share your email with anyone else.
                  </small>
                </div>
                <div className="form-group mt-2">
                  <label for="name">Name</label>
                  <input
                    type="text"
                    required
                    className="form-control"
                    id="name"
                    placeholder="Enter Name"
                  />
                </div>
                <div className="form-group mt-2">
                  <label for="message">Message</label>
                  <textarea
                    className="form-control"
                    required
                    id="message"
                    rows="3"
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-dark mt-3 w-100">
                  Submit
                </button>
              </form>
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

export default Contact;
