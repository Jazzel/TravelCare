import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getBusinesses, deleteBusiness } from "../actions/business";
import DashboardHeader from "../Components/DashboardHeader";

import PropTypes from "prop-types";
import { Navigate, useNavigate } from "react-router-dom";
import Alert from "../Components/Alert";
import Footer from "../Components/Footer";
import { getUsers, deactivateUser, logout } from "../actions/auth";

const History = ({
  auth: { role, username, users, status },
  isAuthenticated,
  logout,
}) => {
  const navigate = useNavigate();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (status === "Blocked") {
    navigate("/login");
    logout();
  }

  const history = localStorage.getItem("history")
    ? JSON.parse(localStorage.getItem("history"))
    : [];

  console.log(history);
  return (
    <div>
      <DashboardHeader />

      <div className="container p-5">
        <Alert />
        <div className="row">
          <div className="col-12">
            <h1>History</h1>
          </div>

          <div className="col-12">
            <table className="table table-striped">
              <thead className="thead-dark ">
                <tr>
                  <th>Service</th>
                  <th>Business Name</th>
                  <th>Description</th>
                  <th>Phone</th>
                  <th>Quantity</th>
                </tr>
              </thead>
              <tbody>
                {history && history.length > 0 ? (
                  history.map((history) => (
                    <tr key={history._id}>
                      <td>{history?.service?.name}</td>
                      <td>{history?.service?.businessname}</td>
                      <td>{history?.service?.description}</td>
                      <td>{history?.service?.phone}</td>
                      <td>{history?.quantity}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3}>No history found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <br />
      <br />
      <br />

      <Footer />
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {
  getBusinesses,
  deleteBusiness,
  getUsers,
  deactivateUser,
  logout,
})(History);
