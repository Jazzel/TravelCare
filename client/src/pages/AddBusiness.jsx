import React from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setAlert } from "../actions/alert";
import { addBusiness } from "../actions/business";
import Alert from "../Components/Alert";
import DashboardHeader from "../Components/DashboardHeader";
import Footer from "../Components/Footer";

const AddBusiness = ({ addBusiness, setAlert, auth: { user } }) => {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name !== "" && description !== "") {
      const formData = { name, description, addedBy: user?._id };

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
          <h1>Add Business</h1>
          <br />

          <div class="form-group w-50">
            <Alert />

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
              Name of the business.
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
            <button className="btn btn-primary w-100" type="submit">
              Add Business
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

export default connect(mapStateToProps, { addBusiness, setAlert })(AddBusiness);
