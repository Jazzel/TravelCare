import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { getBusiness } from "../actions/business";
import DashboardHeader from "../Components/DashboardHeader";
import Footer from "../Components/Footer";
import { getDiscount } from "../actions/discounts";

const BusinessDetail = ({
  business: { loading, business },
  getBusiness,
  getDiscount,
  discount: { discount },
}) => {
  const { id } = useParams();

  let discountPercentage = 0;

  useEffect(() => {
    const fetchBusiness = async () => {
      const business = await getBusiness(id);

      if (business && business.discount !== "No Discount") {
        const discount = await getDiscount(business.discount);
        console.log(business.discount, discount);
      }
    };

    fetchBusiness();
  }, [getBusiness, id, getDiscount]);

  if (business && business.discount) {
    discountPercentage = discount?.percentage;
  }
  return (
    <div>
      <DashboardHeader />

      <div className="container p-5">
        <h1>Business Detail</h1>
        <hr />
        {!loading && business && (
          <div className="card shadow">
            <div className="card-body p-5">
              <div className="styled-back">@</div>
              <h3>
                {business?.name} by @{business?.businessname}
              </h3>
              <br />
              <p>{business?.description}</p>
              <p>
                Price:{" "}
                <span
                  style={{
                    textDecoration:
                      business?.discountPecentage > 0 && "line-through",
                  }}
                >
                  {business?.price} $
                </span>{" "}
                <span style={{ color: "red", fontWeight: "bold" }}>
                  {business?.discountPecentage > 0 &&
                    business.price -
                      (business?.discountPecentage * business?.price) / 100 +
                      " $"}
                </span>
              </p>
              <p>
                Added By: {business?.username} <br />
                Contact Number: {business?.phone} <br />
                Address: {business?.address} <br />
                Google Maps: {business?.googleMapLink} <br />
                Last updated:{" "}
                {new Date(`${business?.updatedAt}`).toLocaleString()}
              </p>
            </div>
          </div>
        )}
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
  discount: state.discount,
});

export default connect(mapStateToProps, { getBusiness, getDiscount })(
  BusinessDetail
);
