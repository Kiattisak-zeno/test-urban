import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../Css/result.css";
import { useLocation } from "react-router-dom";

let data = [];
export const setData = (data_arr) => {
  data = data_arr;
  console.log(data_arr);
};

const Result = () => {
  const location = useLocation();
  let data = location.state.data;

  let X = data[0];
  let Y = data[1];
  let Z = data[2];

  return (
    <div className="w3-container w3-center w3-animate-top ">
      <Container className="Container_Result">
        <div className="Subject">
          <Row>
            <Col md={4} sm={4} xs={4} style={{ textAlign: "right" }}>
              โจทย์
            </Col>
            <Col md={8} sm={8} xs={8} style={{ textAlign: "left" }}>
              X, 5, 9, 15, 23, Y, Z
            </Col>
          </Row>
          <br />
          <Row>
            <Col md={4} sm={4} xs={4} style={{ textAlign: "right" }}>
              ผลลัพธ์
            </Col>
            <Col md={8} sm={8} xs={8} style={{ textAlign: "left" }}>
              3, 5, 9, 15, 23, 33, 45
            </Col>
          </Row>
        </div>
      </Container>
      <Container className="Container_Result" style={{ marginTop: "20px" }}>
        <div className="Result">
          <Row>
            <Col md={4} sm={4} xs={4} style={{ textAlign: "right" }}>
              ดังนั้น
            </Col>
            <Col md={8} sm={8} xs={8} style={{ textAlign: "left" }}>
              <h6>
                X = {X} , Y = {Y} , Z = {Z}
              </h6>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
};

export default Result;
