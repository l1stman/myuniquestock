import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/home";
import ProductDetails from "./pages/productdetails";
import Dashboard from "./pages/dashboard";

function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Home />} />;
        <Route path="/products/:slug" element={<ProductDetails />} />;
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </>
  );
}

export default App;
