import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer
      style={{ boxShadow: ".125rem 0 0 0 rgba(0,0,0,.075)!important" }}
      className="bg-dark text-white"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#fff"
            fillOpacity="1"
            d="M0,160L30,170.7C60,181,120,203,180,197.3C240,192,300,160,360,165.3C420,171,480,213,540,218.7C600,224,660,192,720,160C780,128,840,96,900,85.3C960,75,1020,85,1080,112C1140,139,1200,181,1260,181.3C1320,181,1380,139,1410,117.3L1440,96L1440,0L1410,0C1380,0,1320,0,1260,0C1200,0,1140,0,1080,0C1020,0,960,0,900,0C840,0,780,0,720,0C660,0,600,0,540,0C480,0,420,0,360,0C300,0,240,0,180,0C120,0,60,0,30,0L0,0Z"
          ></path>
        </svg>
      </svg>
      <div className="container-fluid text-center text-md-left shadow-sm">
        <div className="row">
          <div className="col-md-12 mt-md-0 mt-3 pb-5 mb-3">
            <h1 className="text styled-font">Travel Care</h1>
            <div className="row mt-3">
              <div className="col">
                <a href="#">
                  <img
                    src={require("./../assets/facebook.png")}
                    alt="social"
                    width="40px"
                    style={{
                      border: "3px solid #fff",
                      borderRadius: "50%",
                      padding: "4px",
                    }}
                  />
                </a>
                <a href="#">
                  <img
                    src={require("./../assets/twitter.png")}
                    alt="social"
                    width="40px"
                    style={{
                      marginLeft: "8px",
                      border: "3px solid #fff",
                      borderRadius: "50%",
                      padding: "4px",
                    }}
                  />
                </a>
                <a href="#">
                  <img
                    src={require("./../assets/whatsapp.png")}
                    alt="social"
                    width="40px"
                    style={{
                      marginLeft: "8px",
                      border: "3px solid #fff",
                      borderRadius: "50%",
                      padding: "4px",
                    }}
                  />
                </a>
                <a href="#">
                  <img
                    src={require("./../assets/linkedin.png")}
                    alt="social"
                    width="40px"
                    style={{
                      marginLeft: "8px",
                      border: "3px solid #fff",
                      borderRadius: "50%",
                      padding: "4px",
                    }}
                  />
                </a>
              </div>
            </div>
            <p className="pt-3">
              <i>We make you move</i>
            </p>
          </div>

          <hr className="clearfix w-100 d-md-none pb-3" />
        </div>
      </div>

      <div className="footer-copyright text-center py-3">
        © {new Date().getFullYear()} Copyright:{" "}
        <a href="/" className="text-light font-weight-bold">
          Travel Care
        </a>
      </div>
    </footer>
  );
};

export default Footer;
