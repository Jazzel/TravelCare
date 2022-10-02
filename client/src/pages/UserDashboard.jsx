import React from "react";
import { connect } from "react-redux";
import DashboardHeader from "../Components/DashboardHeader";
import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";

const UserDashboard = ({ isAuthenticated }) => {
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <DashboardHeader />
    </div>
  );
};

const mapStateToProps = (state) => ({
  business: state.business,
  auth: state.auth,
  isAuthenticated: state.auth.isAuthenticated,
});

UserDashboard.propTypes = {
  isAuthenticated: PropTypes.bool,
};

export default connect(mapStateToProps, {})(UserDashboard);
