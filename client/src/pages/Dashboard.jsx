import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getBusinesses, deleteBusiness } from "../actions/business";
import DashboardHeader from "../Components/DashboardHeader";

import PropTypes from "prop-types";
import { Navigate, useNavigate } from "react-router-dom";
import Alert from "../Components/Alert";
import Footer from "../Components/Footer";

const Dashboard = ({
  business: { loading, businesses },
  getBusinesses,
  deleteBusiness,
}) => {
  const navigate = useNavigate();
  useEffect(() => {
    getBusinesses();
  }, [getBusinesses]);

  return (
    <div>
      <DashboardHeader />

      <div className="container p-5">
        <div className="row">
          <div className="col-10">
            <h1>Businesses</h1>
          </div>
          <div className="col-2">
            <button
              className="btn btn-primary w-100"
              onClick={() => navigate("/add-business")}
            >
              + Add business
            </button>
          </div>
        </div>

        <Alert />
        <table className="table table-striped">
          <thead className="thead-dark ">
            <tr>
              <th>Business Title</th>
              <th>Added By</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {!loading && businesses && businesses.length > 0 ? (
              businesses.map(({ _id, name, addedBy }) => (
                <tr key={_id}>
                  <td scope="row">{name}</td>
                  <td>{addedBy}</td>
                  <td>
                    <button
                      className="btn btn-dark"
                      onClick={() => navigate(`/business/${_id}`)}
                    >
                      View
                    </button>{" "}
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
            ) : (
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
});

Dashboard.propTypes = {
  getBusinesses: PropTypes.func.isRequired,
  deleteBusiness: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { getBusinesses, deleteBusiness })(
  Dashboard
);
