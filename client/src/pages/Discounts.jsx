import React, { useEffect } from "react";
import DashboardHeader from "../Components/DashboardHeader";
import Footer from "../Components/Footer";
import Alert from "../Components/Alert";
import { connect } from "react-redux";

import { getDiscounts, deleteDiscount } from "../actions/discounts";
import { Link, useNavigate } from "react-router-dom";

const Discounts = ({
  discount: { loading, discounts },
  getDiscounts,
  deleteDiscount,
}) => {
  useEffect(() => {
    getDiscounts();
  }, [getDiscounts]);

  const navigate = useNavigate();
  return (
    <div>
      <DashboardHeader />
      <div className="container p-5">
        <Alert />

        <section className="container pl-5 pt-5 pr-5">
          <div className="row">
            <div className="col-9">
              <h1> Discounts</h1>
            </div>
            <div className="col-3">
              <button
                className="btn mt-2 btn-primary w-100"
                onClick={() => navigate("/add-discount")}
              >
                + Add Discount
              </button>
            </div>
          </div>
          <br />
          <div className="row">
            <div className="col-12">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">Business</th>
                    <th scope="col">Discount</th>
                    <th scope="col">Description</th>
                    <th scope="col">Start Date</th>

                    <th scope="col">End Date</th>

                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {discounts && discounts.length > 0 ? (
                    discounts.map((discount) => (
                      <tr key={discount._id}>
                        <td>{discount.name}</td>
                        <td>{discount.percentage}</td>
                        <td>{discount.description}</td>
                        <td>{new Date(discount.startsFrom).toDateString()}</td>
                        <td>{new Date(discount.endsAt).toDateString()}</td>
                        <td>
                          <Link
                            className="btn btn-primary mr-2"
                            to={"/edit-discount/" + discount._id}
                          >
                            Edit
                          </Link>
                          <button
                            className="btn btn-danger"
                            onClick={() => deleteDiscount(discount._id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6}>
                        <center>No discounts found</center>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <div className="row"></div>
      </div>
      <Footer />
    </div>
  );
};

const mapStateToProps = (state) => ({
  discount: state.discount,
});

export default connect(mapStateToProps, { getDiscounts, deleteDiscount })(
  Discounts
);