import React from "react";
import { connect } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setAlert } from "../actions/alert";
import Alert from "../Components/Alert";
import { sendEmailForVerification } from "../actions/auth";

import PropTypes from "prop-types";

const ForgotPassword = ({ setAlert, sendEmailForVerification }) => {
  const [email, setEmail] = React.useState("");

  const [showForm, setShowForm] = React.useState(true);

  const [buttonStatus, setButtonStatus] = React.useState(false);

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    setButtonStatus(true);
    e.preventDefault();
    if (email) {
      const res = await sendEmailForVerification({ email });
      if (res) {
        setShowForm(false);
      } else {
        setAlert("Account not found", "danger");
      }
      // navigate(`/reset/${email}`);
    } else {
      setAlert("Please enter your email", "danger");
      // alert("Please enter a valid email");
    }
    setButtonStatus(false);
  };

  return (
    <div className="login-container">
      <div className="inner-container shadow-lg">
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
            <h1 className="text-center">Forgot Password</h1>
            <br />
            <h6 className="text-center">
              No worries ! <br /> Enter your email to send a password reset
              request.
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
                    @
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    aria-label="email"
                  />
                </div>

                <div className="text-center">
                  <button
                    type="submit"
                    disabled={buttonStatus}
                    className="btn btn-dark w-100"
                  >
                    Send email
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
                    Email Sent Successfully !
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

const mapStateToProps = (state) => ({});

ForgotPassword.propTypes = {
  setAlert: PropTypes.func.isRequired,
  sendEmailForVerification: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { setAlert, sendEmailForVerification })(
  ForgotPassword
);
