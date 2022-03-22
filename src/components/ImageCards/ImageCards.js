import React, { useContext } from "react";
import { Card } from "react-bootstrap";
import "./ImageCards.css";
import { BiTrash } from "react-icons/bi";
import AppContext from "../../context/AppContext";

const ImageCards = (props) => {
  const appContext = useContext(AppContext);
  const { deletePost, login } = appContext;

  async function callApi(id) {
    props.setLoading(true);
    await deletePost(id);
    props.fetchData();
  }
  return (
    <div className="mainContainer">
      {props.data.map((row) => (
        <Card className="cardContainer" style={{ width: "15rem" }}>
          <Card.Img variant="top" src={row.url} className="cardImg" />

          <Card.Body className="cardBody">
            {row.email === login.email ? (
              <div className="icons">
                <BiTrash className="trash" onClick={() => callApi(row._id)} />
              </div>
            ) : null}
            <Card.Title className="cardTitle">{row.title}</Card.Title>
            <Card.Text className="cardDescription">{row.description}</Card.Text>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default ImageCards;
