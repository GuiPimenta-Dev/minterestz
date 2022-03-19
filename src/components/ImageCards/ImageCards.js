import React, { Component } from "react";
import { Card, Button } from "react-bootstrap";

const ImageCards = (props) => {
  return (
    <section className="mt-5">
      <div className="row">
        <div className="col-3">
          {props.data.map((row, i) => (
            <Card style={{ width: "18rem" }}>
              <Card.Img
                // variant="top"
                src={row.url}
                className="card-img-top img-fluid"
              />
              <Card.Body>
                <Card.Title className="card-title font-poppins">
                  {row.title}
                </Card.Title>
                <Card.Text className="text-secondary font-size-09">
                  {row.description}
                </Card.Text>
              </Card.Body>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImageCards;
