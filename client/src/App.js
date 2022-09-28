import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

import setAuthToken from "./utils/setAuthToken";
import store from "./store";
import { Provider } from "react-redux";
import { loadUser } from "./actions/auth";
import { useEffect, useLayoutEffect } from "react";
import PrivateRoute from "./routing/PrivateRoute";
import Dashboard from "./pages/Dashboard";
import ForgotPassword from "./pages/ForgotPassword";
import EmailCode from "./pages/EmailCode";
import ChangePassword from "./pages/ChangePassword";
import EmailSent from "./pages/EmailSent";
import ConfirmAccount from "./pages/ConfirmAccount";
import AddBusiness from "./pages/AddBusiness";
import UpdateBusiness from "./pages/UpdateBusiness";
import BusinessDetail from "./pages/BusinessDetail";
import Business from "./pages/Business";
import AdminRoute from "./routing/AdminRoute";
import UserDashboard from "./pages/UserDashboard";

export const HOST = "http://localhost:5000";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}
const Wrapper = ({ children }) => {
  const location = useLocation();
  useLayoutEffect(() => {
    document.documentElement.scrollTo(0, 0);
  }, [location.pathname]);
  return children;
};
const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <Wrapper>
          <Routes>
            <Route path="/*">
              <Route index element={<Home />} />
              <Route path="about" element={<About />} />
              <Route path="business" element={<Business />} />
              <Route path="contact" element={<Contact />} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="forgot-password" element={<ForgotPassword />} />
              <Route path="confirm/:email/:code" element={<ConfirmAccount />} />
              <Route path="reset/:email/:code" element={<EmailCode />} />
              <Route path="email-sent/:email" element={<EmailSent />} />
              <Route
                path="change-password/:email/:code"
                element={<ChangePassword />}
              />
              <Route
                path="dashboard"
                element={
                  <AdminRoute>
                    <Dashboard />
                  </AdminRoute>
                }
              />
              <Route
                path="user-dashboard"
                element={
                  <AdminRoute>
                    <UserDashboard />
                  </AdminRoute>
                }
              />
              <Route
                path="add-business"
                element={
                  <PrivateRoute>
                    <AddBusiness />
                  </PrivateRoute>
                }
              />
              <Route
                path="update-business/:id"
                element={
                  <PrivateRoute>
                    <UpdateBusiness />
                  </PrivateRoute>
                }
              />
              <Route
                path="business/:id"
                element={
                  <PrivateRoute>
                    <BusinessDetail />
                  </PrivateRoute>
                }
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
        </Wrapper>
      </Router>
    </Provider>
  );
};

export default App;
