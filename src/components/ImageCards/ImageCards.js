import React from "react";
import { Card } from "react-bootstrap";
import "./ImageCards.css";
const ImageCards = (props) => {
  return (
    <div className="mainContainer">
      {props.data.map((row) => (
        <Card className="cardPhoto" style={{ width: "18rem" }}>
          <div className="cardImgContainer">
            <Card.Img variant="top" src={row.url} className="cardImg" />
          </div>
          <Card.Body className="cardBody">
            <Card.Title className="cardTitle">{row.title}</Card.Title>
            <Card.Text className="cardDescription">{row.description}</Card.Text>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default ImageCards;
