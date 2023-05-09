import React from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setAlert } from "../actions/alert";
import { addBusiness } from "../actions/business";
import Alert from "../Components/Alert";
import DashboardHeader from "../Components/DashboardHeader";
import Footer from "../Components/Footer";

import { getDiscounts } from "../actions/discounts";

const AddBusiness = ({
  addBusiness,
  setAlert,
  auth: { user },
  discount: { loading, discounts },
  getDiscounts,
}) => {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [discount, setDiscount] = React.useState("None");
  const [googleMapLink, setGoogleMapLink] = React.useState("None");

  React.useEffect(() => {
    getDiscounts();
  }, [getDiscounts]);

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name !== "" && description !== "" && price > 0) {
      const formData = {
        name,
        description,
        addedBy: user?._id,
        price,
        discount,
        googleMapLink,
      };

      console.log(formData);

      const response = await addBusiness(formData);
      if (response.status === 200) {
        navigate("/dashboard");
      }
    } else {
      setAlert("Name and description both are required", "danger");
    }
  };

  return (
    <div>
      <DashboardHeader />

      <div className="container p-5">
        <form onSubmit={handleSubmit}>
          <h1>Add Service</h1>
          <br />

          <Alert />
          <div class="form-group w-50">
            <label for="">Name:</label>
            <input
              type="text"
              class="form-control"
              aria-describedby="helpId"
              placeholder=""
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <small id="helpId" class="form-text text-muted">
              Name of the service.
            </small>
          </div>
          <div class="form-group w-50 mt-4">
            <label for="">Price:</label>
            <input
              type="number"
              class="form-control"
              aria-describedby="helpId"
              placeholder=""
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <small id="helpId" class="form-text text-muted">
              Price for the service.
            </small>
          </div>
          <div class="form-group w-50 mt-4">
            <label for="">Description:</label>
            <textarea
              type="text"
              class="form-control"
              rows={5}
              aria-describedby="helpId"
              placeholder=""
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            <small id="helpId" class="form-text text-muted">
              Brief description of your service.
            </small>
          </div>
          <div class="form-group w-50 mt-4">
            <label for="">Google Map Link:</label>
            <input
              type="number"
              class="form-control"
              aria-describedby="helpId"
              placeholder=""
              value={googleMapLink}
              onChange={(e) => setGoogleMapLink(e.target.value)}
            />
            <small id="helpId" class="form-text text-muted">
              Link for the location.
            </small>
          </div>
          <div class="form-group w-50 mt-4">
            <label for="">Discount:</label>
            <select
              className="form-control"
              onChange={(e) => setDiscount(e.target.value)}
            >
              <option value={"None"}>No Discount</option>
              {!loading &&
                discounts &&
                discounts.map((discount) => (
                  <option value={discount._id}>{discount.name}</option>
                ))}
            </select>
            <small id="helpId" class="form-text text-muted">
              Discounts to add on this service.
            </small>
          </div>
          <div class="form-group w-50 mt-4">
            <button className="btn btn-primary w-100" type="submit">
              Add Service
            </button>
          </div>
        </form>
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
  discount: state.discount,
});

export default connect(mapStateToProps, {
  addBusiness,
  getDiscounts,
  setAlert,
})(AddBusiness);
