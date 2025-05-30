import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { PostDetail } from "./pages/PostDetail";
import { MyProfile } from "./pages/MyProfile";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="profile" element={<MyProfile />} />
            <Route path="post/:id" element={<PostDetail />} />
            {/* <Route path="login"   element={<LoginPage />} /> */}
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
