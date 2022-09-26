import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { getBusiness } from "../actions/business";
import DashboardHeader from "../Components/DashboardHeader";
import Footer from "../Components/Footer";

const BusinessDetail = ({ business: { loading, business }, getBusiness }) => {
  const { id } = useParams();

  useEffect(() => {
    const fetchBusiness = async () => {
      const business = await getBusiness(id);
    };

    fetchBusiness();
  }, [getBusiness, id]);
  return (
    <div>
      <DashboardHeader />

      <div className="container p-5">
        <h1>Business Detail</h1>
        <hr />
        {!loading && business && (
          <div className="card shadow">
            <div className="card-body">
              <h3>Name: {business?.name}</h3>
              <br />
              <p>{business?.description}</p>
              <p>
                Added By: {business?.addedBy} <br />
                Last updated:{" "}
                {new Date(`${business?.updatedAt}`).toLocaleString()}
              </p>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

const mapStateToProps = (state) => ({
  business: state.business,
});

export default connect(mapStateToProps, { getBusiness })(BusinessDetail);
