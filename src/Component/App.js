import React from "react";
import Topbar from "./Topbar";
import Footer from "./Footer";
import MapContainer from "./MapContainer";
import { BrowserRouter, Link, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Result from "./Result";
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Topbar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/Map" element={<MapContainer />}></Route>
          <Route path="/Result" element={<Result />}></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
};

export default App;
