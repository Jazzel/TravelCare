import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { setAlert } from "../actions/alert";
import { editBusiness, getBusiness } from "../actions/business";
import Alert from "../Components/Alert";
import DashboardHeader from "../Components/DashboardHeader";
import Footer from "../Components/Footer";

import { getDiscounts } from "../actions/discounts";

const UpdateBusiness = ({
  editBusiness,
  getBusiness,
  setAlert,
  discount: { loading, discounts },
  getDiscounts,
  auth: { user },
}) => {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [discount, setDiscount] = React.useState("None");
  const [googleMapLink, setGoogleMapLink] = React.useState("None");

  const { id } = useParams();

  useEffect(() => {
    const fetchBusiness = async () => {
      const business = await getBusiness(id);
      setName(business.name);
      setDescription(business.description);
      setPrice(business.price);
      setDiscount(business.discount || "None");
      setGoogleMapLink(business.googleMapLink || "None");
    };

    getDiscounts();

    fetchBusiness();
  }, [getBusiness, id, getDiscounts]);

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name !== "" && description !== "") {
      const formData = {
        name,
        description,
        addedBy: user?.name,
        price,
        discount,
        googleMapLink,
      };

      const response = await editBusiness(formData, id);
      if (response.status === 200) {
        navigate("/dashboard");
      }
    } else {
      setAlert("Name, price and description all are required", "danger");
    }
  };

  return (
    <div>
      <DashboardHeader />

      <div className="container p-5">
        <form onSubmit={handleSubmit}>
          <h1>Update Business</h1>
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
              type="text"
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
              Brief description of your business.
            </small>
          </div>
          <div class="form-group w-50 mt-4">
            <label for="">Google Map Link:</label>
            <input
              type="text"
              class="form-control"
              aria-describedby="helpId"
              placeholder=""
              value={googleMapLink}
              onChange={(e) => setGoogleMapLink(e.target.value)}
            />
            <small id="helpId" class="form-text text-muted">
              Google Map Link of your business.
            </small>
          </div>
          <div class="form-group w-50 mt-4">
            <label for="">Discount:</label>
            <select
              className="form-control"
              onChange={(e) => setDiscount(e.target.value)}
            >
              <option value={null}>No Discount</option>
              {discounts.map((dis) => (
                <option value={dis._id} selected={discount === dis._id}>
                  {dis.name}
                </option>
              ))}
            </select>
            <small id="helpId" class="form-text text-muted">
              Discounts to add on this service.
            </small>
          </div>
          <div class="form-group w-50 mt-4">
            <button className="btn btn-primary w-100" type="submit">
              Update Business
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
  editBusiness,
  setAlert,
  getBusiness,
  getDiscounts,
})(UpdateBusiness);
