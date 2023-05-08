import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getBusinesses, deleteBusiness } from "../actions/business";
import DashboardHeader from "../Components/DashboardHeader";

import PropTypes from "prop-types";
import { Navigate, useNavigate } from "react-router-dom";
import Alert from "../Components/Alert";
import Footer from "../Components/Footer";
import {
  getUsers,
  deactivateUser,
  logout,
  updateProfile,
  deleteAccountAndProfile,
} from "../actions/auth";
import { setAlert } from "../actions/alert";

const MyProfile = ({
  auth: { user, role },
  isAuthenticated,
  logout,
  updateProfile,
  setAlert,
  deleteAccountAndProfile,
}) => {
  const navigate = useNavigate();

  //   useEffect(() => {
  //     getUsers();
  //   }, [getUsers]);

  const [businessName, setBusinessName] = useState(
    user?.businessname || "Not provided"
  );
  const [address, setAddress] = useState(user?.address || "Not provided");
  const [phonenumber, setPhonenumber] = useState(user?.phone || "Not provided");

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = { id: user?._id, businessName, address, phonenumber };
    console.log(formData);

    const updatedUser = updateProfile(formData);
    if (updatedUser) {
      setAlert("Profile updated successfully", "success");
    }
  };

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
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
                <div className="row">
                  <div className="col-10">
                    <h1>MyProfile</h1>
                  </div>
                  <div className="col-2">
                    <button
                      className="btn btn-danger"
                      onClick={() => deleteAccountAndProfile()}
                    >
                      Delete my account
                    </button>
                  </div>
                </div>
                <hr />

                <form onSubmit={handleSubmit}>
                  <div className="form-group mt-2">
                    <label htmlFor="username">User ID</label>
                    <input
                      type="text"
                      className="form-control"
                      id="username"
                      name="username"
                      value={user?._id}
                      readOnly
                    />
                  </div>
                  <div className="form-group mt-2">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      value={user?.email}
                      readOnly
                    />
                  </div>
                  <div className="form-group mt-2">
                    <label htmlFor="role">Role</label>
                    <input
                      type="text"
                      className="form-control"
                      id="role"
                      name="role"
                      value={user?.role}
                      readOnly
                    />
                  </div>
                  <div className="form-group mt-2">
                    <label htmlFor="status">Status</label>
                    <input
                      type="text"
                      className="form-control"
                      id="status"
                      name="status"
                      value={user?.status}
                      readOnly
                    />
                  </div>
                  {role === "business" && (
                    <>
                      <div className="form-group mt-2">
                        <label htmlFor="createdAt">Business name</label>
                        <input
                          type="text"
                          className="form-control"
                          id="businessname"
                          name="businessname"
                          value={businessName}
                          onChange={(e) => setBusinessName(e.target.value)}
                        />
                      </div>
                    </>
                  )}
                  <div className="form-group mt-2">
                    <label htmlFor="createdAt">Address</label>
                    <input
                      type="text"
                      className="form-control"
                      id="address"
                      name="address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>
                  <div className="form-group mt-2">
                    <label htmlFor="createdAt">Phone number</label>
                    <input
                      type="number"
                      className="form-control"
                      id="phonenumber"
                      name="phonenumber"
                      value={phonenumber}
                      onChange={(e) => setPhonenumber(e.target.value)}
                    />
                  </div>

                  <input type="submit" className="btn btn-dark w-100 mt-3" />
                </form>
              </div>
            </div>
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
  setAlert,
  logout,
  updateProfile,
  deleteAccountAndProfile,
})(MyProfile);
