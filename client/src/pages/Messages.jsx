import React from "react";
import Alert from "../Components/Alert";
import DashboardHeader from "../Components/DashboardHeader";
import Footer from "../Components/Footer";

const Messages = () => {
  const [formData, setFormData] = React.useState({
    business: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData);
  };

  return (
    <div>
      <DashboardHeader />
      <div className="container p-5">
        <Alert />

        <div className="row">
          <div className="col-12 col-md-4"></div>
          <div className="col-12 col-md-8">
            <div className="card shadow">
              <div className="card-body p-5">
                <h3>New message</h3>
                <br />
                <form>
                  <div className="form-group">
                    <label htmlFor="name">To</label>
                    <input
                      type="text"
                      value={formData.business}
                      onChange={(e) =>
                        setFormData({ ...formData, business: e.target.value })
                      }
                      className="form-control"
                      id="name"
                      placeholder="Enter name"
                    />
                  </div>
                  <br />

                  <div className="form-group">
                    <label htmlFor="message">Message</label>
                    <textarea
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      className="form-control"
                      id="message"
                      rows="3"
                    ></textarea>
                  </div>
                  <br />

                  <button
                    type="submit"
                    className="btn btn-dark"
                    onClick={handleSubmit}
                  >
                    Send
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br />
      <br />
      <br />

      <Footer />
    </div>
  );
};

export default Messages;
