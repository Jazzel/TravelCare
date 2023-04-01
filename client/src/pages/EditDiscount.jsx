import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { setAlert } from "../actions/alert";
import { editDiscount, getDiscount } from "../actions/discounts";
import Alert from "../Components/Alert";
import DashboardHeader from "../Components/DashboardHeader";
import Footer from "../Components/Footer";

const EditDiscount = ({
  editDiscount,
  getDiscount,
  setAlert,
  discount: { loading, discount },
  auth: { user },
}) => {
  const [name, setName] = React.useState("");
  const [percentage, setPercentage] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [startsFrom, setStartsFrom] = React.useState("");
  const [endsAt, setEndsAt] = React.useState("");

  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    const getDiscountData = async () => {
      const response = await getDiscount(id);

      if (response) {
        setName(response[0].name);
        setPercentage(response[0].percentage);
        setDescription(response[0].description);

        const startDate = new Date(response[0].startsFrom);

        // converting date to yyyy-MM-dd format
        const startDateString = `${startDate.getFullYear()}-${(
          startDate.getMonth() + 1
        )
          .toString()
          .padStart(2, "0")}-${startDate
          .getDate()
          .toString()
          .padStart(2, "0")}`;

        const endDate = new Date(response[0].endsAt);

        // converting date to yyyy-MM-dd format
        const endDateString = `${endDate.getFullYear()}-${(
          endDate.getMonth() + 1
        )
          .toString()
          .padStart(2, "0")}-${endDate.getDate().toString().padStart(2, "0")}`;

        console.log(startDateString, endDateString);

        setStartsFrom(startDateString);
        setEndsAt(endDateString);
      }
    };
    getDiscountData();
  }, [id, getDiscount]);

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

      const response = await editDiscount(formData, id);
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
          <h1>Edit Discount</h1>
          <br />

          <Alert />
          <div className="form-group w-50">
            <label>Name:</label>
            <input
              type="text"
              className="form-control"
              aria-describedby="helpId"
              placeholder=""
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <small id="helpId" className="form-text text-muted">
              Name of the discount.
            </small>
          </div>
          <div className="form-group w-50 mt-4">
            <label>Percentage:</label>
            <input
              type="number"
              className="form-control"
              aria-describedby="helpId"
              placeholder=""
              value={percentage}
              onChange={(e) => setPercentage(e.target.value)}
            />
            <small id="helpId" className="form-text text-muted">
              Percentage for the discount.
            </small>
          </div>
          <div className="form-group w-50 mt-4">
            <label>Description:</label>
            <textarea
              type="text"
              className="form-control"
              rows={5}
              aria-describedby="helpId"
              placeholder=""
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            <small id="helpId" className="form-text text-muted">
              Brief description of your service.
            </small>
          </div>
          <div className="form-group w-50 mt-4">
            <label>Starts From:</label>
            <input
              type="date"
              className="form-control"
              rows={5}
              aria-describedby="helpId"
              placeholder=""
              value={startsFrom}
              onChange={(e) => setStartsFrom(e.target.value)}
            />
            <small id="helpId" className="form-text text-muted">
              When will the discount start.
            </small>
          </div>
          <div className="form-group w-50 mt-4">
            <label>Ends At:</label>
            <input
              type="date"
              className="form-control"
              rows={5}
              aria-describedby="helpId"
              placeholder=""
              value={endsAt}
              onChange={(e) => setEndsAt(e.target.value)}
            />
            <small id="helpId" className="form-text text-muted">
              When will the discount end.
            </small>
          </div>
          <div className="form-group w-50 mt-4">
            <button className="btn btn-primary w-100" type="submit">
              Update Discount
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
  editDiscount,
  getDiscount,
  setAlert,
})(EditDiscount);
