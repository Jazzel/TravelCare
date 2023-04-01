import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getBusinesses, deleteBusiness } from "../actions/business";
import DashboardHeader from "../Components/DashboardHeader";

import PropTypes from "prop-types";
import { Navigate, useNavigate } from "react-router-dom";
import Alert from "../Components/Alert";
import Footer from "../Components/Footer";
import { getUsers, deactivateUser, logout } from "../actions/auth";

const Tourists = ({
  auth: { role, username, users, status },
  deactivateUser,
  getUsers,
  isAuthenticated,
  logout,
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (role === "user") {
    return <Navigate to="/user-dashboard" />;
  }

  if (status === "Blocked") {
    navigate("/login");
    logout();
  }

  return (
    <div>
      <DashboardHeader />

      <div className="container p-5">
        <Alert />
        {
          <>
            <div className="row">
              <div className="col-12">
                <h1>Tourists</h1>
              </div>
            </div>

            <table className="table table-striped">
              <thead className="thead-dark ">
                <tr>
                  <th>Username</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                {users && users.length > 0 ? (
                  users
                    .filter((user) => user.role === "user")
                    .map(({ _id, name, role, email, status }) => (
                      <tr key={_id}>
                        <td scope="row">{name}</td>
                        <td>{email}</td>
                      </tr>
                    ))
                ) : (
                  //   .map(<></>)
                  // <></>
                  <tr>
                    <td colSpan={3} style={{ textAlign: "center" }}>
                      No users found !
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </>
        }
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
})(Tourists);
