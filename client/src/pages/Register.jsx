import React, { useRef } from "react";
import { Link, Navigate } from "react-router-dom";
import { register, login } from "../actions/auth";
import Alert from "../Components/Alert";

import PropTypes from "prop-types";
import { connect } from "react-redux";

const Register = ({ register, isAuthenticated }) => {
  const [name, setName] = React.useState("");
  const [role, setRole] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const dropdown = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    const role = dropdown.current.value || "user";

    register({ name, email, password, role });
  };
  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }
  return (
    <div className="login-container">
      <div className="inner-container shadow-lg">
        <div
          className="col-12 "
          style={{
            justifyContent: "center",
            display: "flex",
            borderRadius: "5px",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              backgroundImage: `url(${require("./../assets/login-banner.webp")})`,
              height: "200px",
              width: "100%",
              backgroundSize: "cover",
              backgroundPosition: "center",
              borderRadius: "5px",
            }}
          >
            <div className="overlay">
              <img
                src={require("./../assets/logo.png")}
                width="150px"
                alt="logo"
              />
            </div>
          </div>
          <div className="p-4">
            <h1 className="text-dark" style={{}}>
              Register
            </h1>

            <br />
            <Alert style={{ width: "80%" }} />
            <form
              autoComplete={false}
              className="form m-auto"
              onSubmit={handleSubmit}
              style={{ width: "80%" }}
            >
              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">
                  ab
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  aria-label="name"
                />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">
                  @
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  aria-label="Password"
                />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">
                  {"&"}
                </span>
                <select
                  className="form-control"
                  value={role}
                  ref={dropdown}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="user">User</option>
                  <option value="business">Business Owner</option>
                </select>
              </div>
              <div className="text-center">
                <button type="submit" className="btn btn-dark w-100">
                  Register
                </button>
              </div>
              <br />
              <div className="text-center">
                Already a user?{" "}
                <Link className="text-dark" to="/login">
                  Login here.
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

Register.propTypes = {
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { register })(Register);
