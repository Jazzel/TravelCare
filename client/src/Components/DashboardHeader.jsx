import React from "react";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import PropTypes from "prop-types";

import { logout } from "../actions/auth";

const DashboardHeader = ({ auth: { user, role }, logout }) => {
  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow">
        <div className="container">
          <Link className="navbar-brand styled-font" to="/dashboard">
            Dashboard
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {(role === "business" || role === "admin") && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/discounts">
                      Discounts
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/tourists">
                      Tourists
                    </Link>
                  </li>
                </>
              )}
              <li className="nav-item">
                <Link className="nav-link" aria-current="page" to="/">
                  Go back to site
                </Link>
              </li>
              {user && user.name && (
                <li className="nav-item">
                  <a className="nav-link" href="#!">
                    LoggedIn User: <b>{user.name}</b>
                  </a>
                </li>
              )}
              {role && (
                <>
                  <li className="nav-item">
                    <a className="nav-link" href="#!">
                      Role: <b>{role}</b>
                    </a>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/myprofile">
                      My Profile
                    </Link>
                  </li>
                </>
              )}
              {role === "user" && (
                <li className="nav-item">
                  <Link className="nav-link" to="/history">
                    History
                  </Link>
                </li>
              )}
            </ul>
            <span className="navbar-text">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <a className="nav-link" onClick={logout} href="#!">
                    Logout
                  </a>
                </li>
              </ul>
            </span>
          </div>
        </div>
      </nav>
    </header>
  );
};

DashboardHeader.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(DashboardHeader);
