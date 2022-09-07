import React from "react";

import { connect } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { changePassword } from "../actions/auth";
import Alert from "../Components/Alert";
import PropTypes from "prop-types";

const ChangePassword = ({ changePassword }) => {
  const [password, setPassword] = React.useState("");
  const [password2, setPassword2] = React.useState("");

  const { code, email } = useParams();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== password2) {
      alert("Passwords do not match");
    } else {
      const res = await changePassword({ code, email, password });

      //   console.log(data);
      if (res.status === 200) {
        alert("Password changed successfully");
        navigate("/login");
      } else {
        alert("Something went wrong");
      }
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
            <Alert style={{ width: "80%" }} />
            <br />
            <form
              className="form m-auto "
              onSubmit={handleSubmit}
              style={{ width: "80%" }}
            >
              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">
                  **
                </span>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  aria-label="email"
                />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">
                  **
                </span>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter password again"
                  value={password2}
                  onChange={(e) => setPassword2(e.target.value)}
                  aria-label="password"
                />
              </div>

              <div className="text-center">
                <button type="submit" className="btn btn-dark w-100">
                  Change password
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

ChangePassword.propTypes = {
  changePassword: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { changePassword })(ChangePassword);
