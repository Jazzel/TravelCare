import React from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setAlert } from "../actions/alert";
import { addDiscount } from "../actions/discounts";
import Alert from "../Components/Alert";
import DashboardHeader from "../Components/DashboardHeader";
import Footer from "../Components/Footer";

const AddDiscount = ({ addDiscount, setAlert, auth: { user } }) => {
  const [name, setName] = React.useState("");
  const [percentage, setPercentage] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [startsFrom, setStartsFrom] = React.useState("");
  const [endsAt, setEndsAt] = React.useState("");

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      name !== "" &&
      description !== "" &&
      percentage > 0 &&
      startsFrom !== "" &&
      endsAt !== ""
    ) {
      const formData = {
        name,
        description,
        addedBy: user?._id,
        percentage,
        startsFrom,
        endsAt,
      };

      const response = await addDiscount(formData);
      if (response.status === 200) {
        navigate("/discounts");
      }
    } else {
      setAlert("Please fill in all the fields", "danger");
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
              Name of the discount.
            </small>
          </div>
          <div class="form-group w-50 mt-4">
            <label for="">Percentage:</label>
            <input
              type="number"
              class="form-control"
              aria-describedby="helpId"
              placeholder=""
              value={percentage}
              onChange={(e) => setPercentage(e.target.value)}
            />
            <small id="helpId" class="form-text text-muted">
              Percentage for the discount.
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
            <label for="">Starts From:</label>
            <input
              type="date"
              class="form-control"
              rows={5}
              aria-describedby="helpId"
              placeholder=""
              value={startsFrom}
              onChange={(e) => setStartsFrom(e.target.value)}
            />
            <small id="helpId" class="form-text text-muted">
              When will the discount start.
            </small>
          </div>
          <div class="form-group w-50 mt-4">
            <label for="">Ends At:</label>
            <input
              type="date"
              class="form-control"
              rows={5}
              aria-describedby="helpId"
              placeholder=""
              value={endsAt}
              onChange={(e) => setEndsAt(e.target.value)}
            />
            <small id="helpId" class="form-text text-muted">
              When will the discount end.
            </small>
          </div>
          <div class="form-group w-50 mt-4">
            <button className="btn btn-primary w-100" type="submit">
              Add Discount
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
});

export default connect(mapStateToProps, { addDiscount, setAlert })(AddDiscount);