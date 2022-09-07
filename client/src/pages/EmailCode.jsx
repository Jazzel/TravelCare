import { connect } from "react-redux";
import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Alert from "../Components/Alert";
import PropTypes from "prop-types";
import { verifyCode } from "../actions/auth";

const EmailCode = ({ verifyCode }) => {
  const { email } = useParams();
  const navigate = useNavigate();
  const [code, setCode] = React.useState("");

  const handleSubmit = () => {
    if (verifyCode({ code, email })) {
      navigate(`/change-password/${email}/${code}`);
    } else {
      alert("Given code is incorrect");
    }
  };

  return (
    <div className="login-container">
      <div className="inner-container shadow-lg">
        <div
          className="col-12"
          style={{
            justifyContent: "center",
            display: "flex",
            flexDirection: "column",
            borderRadius: "5px",
          }}
        >
          <div className="p-4">
            <h1 className="text-center">Verification Code</h1>
            <br />
            <h6 className="text-center">
              An email is sent to '{email}'. <br /> Please enter the
              verification code to continue the process.
            </h6>
            <Alert style={{ width: "80%" }} />
            <br />
            <form
              className="form m-auto "
              onSubmit={handleSubmit}
              style={{ width: "80%" }}
            >
              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">
                  **
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Code"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  aria-label="code"
                />
              </div>

              <div className="text-center">
                <button type="submit" className="btn btn-dark w-100">
                  Verify Code
                </button>
              </div>
              <div className="mt-2">
                <Link
                  className="text-dark"
                  style={{
                    textDecoration: "none",
                  }}
                  to="/login"
                >
                  Go back to Login page
                </Link>
              </div>
              <br />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {};

EmailCode.propTypes = {
  verifyCode: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { verifyCode })(EmailCode);
