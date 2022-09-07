import React from "react";
import { connect } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setAlert } from "../actions/alert";
import Alert from "../Components/Alert";

import PropTypes from "prop-types";

const ForgotPassword = ({ setAlert }) => {
  const [email, setEmail] = React.useState("");

  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      navigate(`/auth-code/${email}`);
    } else {
      setAlert("Please enter your email", "danger");
      // alert("Please enter a valid email");
    }
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
              request !
            </h6>
            <br />
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
                <button type="submit" className="btn btn-dark w-100">
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
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({});

ForgotPassword.propTypes = {
  setAlert: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { setAlert })(ForgotPassword);
