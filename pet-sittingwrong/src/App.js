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
import { Profile } from "./pages/Profile";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import {AddPost} from "./pages/AddPost";

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
            <Route path="post/:current_ad_id" element={<PostDetail />} />
            <Route path="username/:username" element={<Profile />} />
            <Route
              path="add-post"
              element={
                <ProtectedRoute>
                  <AddPost />
                </ProtectedRoute>
              } />

         
          

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
