import { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Info from "./Talents/pages/Info/Info";
import HomePage from "./Talents/pages/HomePage";
import Login from "./Talents/pages/Login";
import ProtectedRoute from "./generalFunctions/ProtectedRoute";
import Loader from "./common/Loader";
import RoutePage from "./Talents/pages/Route/RoutePage";
import Signup from "./Talents/pages/Signup";
import CreateRoute from "./Talents/pages/Route/CreateRoute";
import PageTitle from "./components/PageTitle";
import ErrorPage from "./GeneralPages/ErrorPage";
import { Toaster } from "react-hot-toast";

function App() {
  const [loading, setLoading] = useState(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Toaster position="top-right" />

      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route
            path="/create-route"
            element={
              <>
                <PageTitle title="Create-Route | Vibes" />
                <CreateRoute />
              </>
            }
          />

          <Route
            path="/route/:route_id/"
            element={
              <>
                <PageTitle title="Route Preview | Vibes" />
                <RoutePage />
              </>
            }
          />

          <Route
            path="/"
            element={
              <>
                <PageTitle title="Vibes" />
                <HomePage />
              </>
            }
          />
        </Route>

        {/* General */}

        <Route
          path="/info"
          element={
            <>
              <PageTitle title="Vibes" />
              <Info />
            </>
          }
        />

        <Route
          path="/signup"
          element={
            <>
              <PageTitle title="Signup | Vibes" />
              <Signup />
            </>
          }
        />

        <Route
          path="/login"
          element={
            <>
              <PageTitle title="Login | Vibes" />
              <Login />
            </>
          }
        />

        <Route
          path="*"
          element={
            <>
              <PageTitle title="Info | Vibes" />
              <ErrorPage />
            </>
          }
        />
      </Routes>
    </>
  );
}

export default App;
