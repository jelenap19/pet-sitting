import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider, AuthContext } from "./authorization/AuthContext";
import { useContext } from "react";
import { Navigate } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { PostDetail } from "./pages/PostDetail";
import { MyProfile } from "./pages/MyProfile";
import { UserProfile } from "./pages/UserProfile";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";

const ProtectedRoute = ({ children }) => {
  const { authUser, loading } = useContext(AuthContext);
  if (loading) {
    return <p className="text-center mt-5">Loading auth…</p>;
  }
  if (!authUser) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />

            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="post/:current_post_id" element={<PostDetail />} />
            <Route path="profile/:username" element={<UserProfile />} />

            <Route
              path="myprofile"
              element={
                <ProtectedRoute>
                  <MyProfile />
                </ProtectedRoute>
              }
            />

            <Route
              path="*"
              element={<p className="text-center mt-5">Page not found</p>}
            />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
