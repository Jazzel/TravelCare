import { connect } from "react-redux";
import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Alert from "../Components/Alert";
import PropTypes from "prop-types";
import { verifyCode } from "../actions/auth";
import { setAlert } from "../actions/alert";

const EmailCode = ({ setAlert, verifyCode }) => {
  const { email, code } = useParams();
  const navigate = useNavigate();
  const [authCode, setAuthCode] = React.useState(code.replace("}", ""));

  const [showForm, setShowForm] = React.useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await verifyCode({ code: authCode, email });
    if (res) {
      setShowForm(false);
    } else {
      setAlert("Given code is incorrect", "danger");
    }
  };

  return (
    <div className="login-container">
      <div className="inner-container shadow-lg">
        <div
          style={{
            // backgroundImage: `url(${require("./../assets/login-banner.webp")})`,
            height: "150px",
            width: "100%",
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderRadius: "5px",
          }}
        >
          <div className="overlay mt-4">
            <img
              src={require("./../assets/logo.png")}
              width="230px"
              alt="logo"
            />
          </div>
        </div>
        <div
          className="col-12"
          style={{
            justifyContent: "center",
            display: "flex",
            flexDirection: "column",
            borderRadius: "5px",
          }}
        >
          <div className="p-4">
            <h1 className="text-center">Email Confimation</h1>
            <br />
            <h6 className="text-center">
              An email is sent to '{email}'. <br /> Please enter the
              verification code to continue the process.
            </h6>
            <br />
            {showForm ? (
              <form
                className="form m-auto "
                onSubmit={handleSubmit}
                style={{ width: "80%" }}
              >
                <Alert style={{ width: "80%" }} />

                <div className="input-group mb-3">
                  <span className="input-group-text" id="basic-addon1">
                    **
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Code"
                    value={authCode}
                    onChange={(e) => setAuthCode(e.target.value)}
                    aria-label="code"
                  />
                </div>

                <div className="text-center">
                  <button type="submit" className="btn btn-dark w-100">
                    Verify Code
                  </button>
                </div>
                <div className="mt-2">
                  <Link
                    className="text-dark"
                    style={{
                      textDecoration: "none",
                    }}
                    to="/login"
                  >
                    Go back to Login page
                  </Link>
                </div>
                <br />
              </form>
            ) : (
              <>
                <div className="text-center">
                  <div className={`alert alert-success`}>
                    Account Verified Successfully !
                  </div>

                  <Link
                    className="text-dark"
                    style={{
                      textDecoration: "none",
                    }}
                    to="/login"
                  >
                    Go back to Login page
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {};

EmailCode.propTypes = {
  verifyCode: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { verifyCode, setAlert })(EmailCode);
