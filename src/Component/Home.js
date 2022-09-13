import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useNavigate } from "react-router-dom";
import "../Css/home.css";
import Img_map from "../img/google-maps.png";
import Img_math from "../img/math-book.png";

const Home = () => {
  const history = useNavigate();

  /////
  const [data, setdata] = useState([]);

  const calculate = () => {
    let X, Y, Z;
    let result = [];
    let question_array = [X, 5, 9, 15, 23, Y, Z];
    //               สูตร  +2 +4 +6 +8 +10 +12
    question_array.map((data, i) => {
      if (data === undefined) {
        // หาว่าควรลบหรือบวก
        if (i === 0) {
          question_array[i] = question_array[i + 1] - 2 * (i + 1);
        } else {
          question_array[i] = question_array[i - 1] + 2 * i;
        }
        result.push(question_array[i]);
      }
    });
    //  setdata(result);
    //  console.log(result);

    return history(
      {
        pathname: "/Result",
      },
      { state: { data: result } }
    );
    // history("/Result");
  };

  return (
    <>
      <Container className="Container_Home" style={{ textAlign: "center" }}>
        <Row>
          <Col lg={6} md={6} sm={12} xs={12}>
            <a href="/Map">
              {" "}
              <img src={Img_map} alt="" className="IconMap" />
            </a>
            <Row>
              <Col>
                <h1>Assignment 2 </h1>
              </Col>
            </Row>
          </Col>

          <Col lg={6} md={6} sm={12} xs={12} style={{ textAlign: "center" }}>
            <img
              src={Img_math}
              alt=""
              className="IconMap"
              onClick={calculate}
            />
            <Row>
              <Col>
                <h1>Assignment 3 </h1>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Home;
