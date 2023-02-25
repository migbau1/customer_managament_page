import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "../pages/init";
import Login from "../pages/login";
import PrivateRoute from "./private.route";
import PublicRoute from "./public.route";

function AppRoutes(): JSX.Element {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
        </Route>

        <Route path="/" element={<PrivateRoute />}>
          <Route path="/" element={<Dashboard />}>
          </Route>
        </Route>

      </Routes>
    </Router>
  );
}

export default AppRoutes;
