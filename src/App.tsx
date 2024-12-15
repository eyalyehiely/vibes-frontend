import { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Info from "./pages/Info/Info";
import HomePage from "./pages/Home/HomePage";
import Login from "./pages/Login";
import ProtectedRoute from "./utils/ProtectedRoute";
import Loader from "./common/Loader";
import RoutePage from "./pages/Route/RoutePage";
import Signup from "./pages/Signup";
import CreateRoute from "./pages/Route/CreateRoute";
import PageTitle from "./components/PageTitle";
import ErrorPage from "./GeneralPages/ErrorPage";
import Profile from "./pages/Profile.jsx";
import Favorites from "./pages/favorites.jsx" ;
import Faqs from "./pages/faqs";
import SearchFriends from "./pages/Home/SearchFriends";
import Messages from "./pages/Messages";
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
            path="/profile"
            element={
              <>
                <PageTitle title="Profile | Vibes" />
                <Profile />
              </>
            }
          />

          <Route
            path="/"
            element={
              <>
                <PageTitle title="Home | Vibes" />
                <HomePage />
              </>
            }
          />

          <Route
            path="/friends"
            element={
              <>
                <PageTitle title="Search Friends | Vibes" />
                <SearchFriends />
              </>
            }
          />

          <Route
            path="/favorites"
            element={
              <>
                <PageTitle title="favorites | Vibes" />
                <Favorites />
              </>
            }
          />

          <Route
            path="/messages"
            element={
              <>
                <PageTitle title="Messages | Vibes" />
                <Messages />
              </>
            }
          />

          <Route
            path="/faqs"
            element={
              <>
                <PageTitle title="faqs | Vibes" />
                <Faqs />
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
