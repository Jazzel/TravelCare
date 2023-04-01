import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getBusinesses, deleteBusiness } from "../actions/business";
import DashboardHeader from "../Components/DashboardHeader";

import PropTypes from "prop-types";
import { Navigate, useNavigate } from "react-router-dom";
import Alert from "../Components/Alert";
import Footer from "../Components/Footer";
import { getUsers, deactivateUser, logout } from "../actions/auth";

const Dashboard = ({
  business: { loading, businesses },
  auth: { role, username, users, status },
  getBusinesses,
  deactivateUser,
  deleteBusiness,
  getUsers,
  isAuthenticated,
  logout,
}) => {
  const navigate = useNavigate();

  const [getAllServices, setGetAllServices] = useState(false);

  useEffect(() => {
    if (role === "admin") {
      getUsers();
    }
    getBusinesses();
  }, [getBusinesses, getUsers, role]);

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
        {role === "admin" && (
          <>
            <div className="row">
              <div className="col-12">
                <h1>Users</h1>
              </div>
            </div>

            <table className="table table-striped">
              <thead className="thead-dark ">
                <tr>
                  <th>Username</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Discount</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {!loading && users && role === "admin" && users.length > 0 ? (
                  users
                    .filter((user) => user.role !== "admin")
                    .map(({ _id, name, role, status }) => (
                      <tr key={_id}>
                        <td scope="row">{name}</td>
                        <td>{role}</td>
                        <td>{status}</td>
                        <td>
                          {status !== "Pending" && (
                            <button
                              className="btn btn-danger"
                              onClick={() => deactivateUser(_id)}
                            >
                              {status === "Active" ? "Deactivate" : "Activate"}
                            </button>
                          )}
                        </td>
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
        )}

        <div className="row">
          <div className="col-10">
            <h1> {role === "admin" ? "Services" : "My Services"}</h1>
          </div>
          <div className="col-2">
            <button
              className="btn btn-dark w-100"
              onClick={() => setGetAllServices(!getAllServices)}
            >
              {getAllServices ? "My Services" : "All Services"}
            </button>
            <button
              className="btn mt-2 btn-primary w-100"
              onClick={() => navigate("/add-business")}
            >
              + Add service
            </button>
          </div>
        </div>

        <table className="table table-striped">
          <thead className="thead-dark ">
            <tr>
              <th>Service Title</th>
              <th>Added By</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {!loading &&
            businesses &&
            role === "admin" &&
            businesses.length > 0 ? (
              businesses.map(({ _id, name, username, businessname }) => (
                <tr key={_id}>
                  <td scope="row">{name}</td>
                  <td>
                    {username} @{businessname}
                  </td>
                  <td>
                    <a className="btn btn-dark" href={`/business/${_id}`}>
                      View
                    </a>{" "}
                    |{" "}
                    <button
                      className="btn btn-primary"
                      onClick={() => navigate(`/update-business/${_id}`)}
                    >
                      Update
                    </button>{" "}
                    |{" "}
                    <button
                      className="btn btn-danger"
                      onClick={() => deleteBusiness(_id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : role !== "admin" && !getAllServices ? (
              businesses
                .filter((_business) => _business.username === username)
                .map(({ _id, name, addedBy, username, businessname }) => (
                  <tr key={_id}>
                    <td scope="row">{name}</td>
                    <td>
                      {username} @{businessname}
                    </td>

                    <td>
                      <a className="btn btn-dark" href={`/business/${_id}`}>
                        View
                      </a>{" "}
                      |{" "}
                      <button
                        className="btn btn-primary"
                        onClick={() => navigate(`/update-business/${_id}`)}
                      >
                        Update
                      </button>{" "}
                      |{" "}
                      <button
                        className="btn btn-danger"
                        onClick={() => deleteBusiness(_id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
            ) : role !== "admin" && getAllServices ? (
              businesses
                .filter((_business) => _business.username === username)
                .map(({ _id, name, addedBy, username, businessname }) => (
                  <tr key={_id}>
                    <td scope="row">{name}</td>
                    <td>
                      {username} @{businessname}{" "}
                    </td>
                    <td>
                      <a className="btn btn-dark" href={`/business/${_id}`}>
                        View
                      </a>{" "}
                    </td>
                  </tr>
                ))
            ) : (
              //   .map(<></>)
              // <></>
              <tr>
                <td colSpan={3} style={{ textAlign: "center" }}>
                  No businesses found !
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <br />
      <br />
      <br />

      <Footer />
    </div>
  );
};

const mapStateToProps = (state) => ({
  business: state.business,
  auth: state.auth,
  isAuthenticated: state.auth.isAuthenticated,
});

Dashboard.propTypes = {
  getBusinesses: PropTypes.func.isRequired,
  deleteBusiness: PropTypes.func.isRequired,
  getUsers: PropTypes.func.isRequired,
  deactivateUser: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

export default connect(mapStateToProps, {
  getBusinesses,
  deleteBusiness,
  getUsers,
  deactivateUser,
  logout,
})(Dashboard);
