import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";

const AdminRoute = ({ auth: { isAuthenticated, loading, role }, children }) => {
  if (!isAuthenticated && !loading && role !== "admin") {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

AdminRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {})(AdminRoute);
