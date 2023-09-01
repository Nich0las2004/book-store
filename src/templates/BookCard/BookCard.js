import { useState, Fragment } from "react";
import { useDispatch } from "react-redux";

import classes from "./BookCard.module.css";

import { buttonActions } from "../../store";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import Badge from "react-bootstrap/Badge";
import { BsBagPlusFill } from "react-icons/bs";

const BookCard = (props) => {
  const dispatch = useDispatch();

  const [isClicked, setIsClicked] = useState(false);
  const [addedToModal, setAddedToModal] = useState([]);

  const [showDetails, setShowDetails] = useState(false);

  const handleCloseDetails = () => setShowDetails(false);
  const handleShowDetails = () => setShowDetails(true);

  const wrapTitle =
    props.title.length > 20 ? `${props.title.slice(0, 21)}...` : props.title;

  const handleAddButton = () => {
    if (!addedToModal.includes(props.title)) {
      dispatch(buttonActions.increment());
      dispatch(
        buttonActions.addBookDetails({
          title: props.title,
          price: props.price,
          repeat: 1,
        })
      );
      setAddedToModal((prevAdded) => [...prevAdded, props.title]);
    } else {
      setIsClicked(true);
    }
  };

  return (
    <Fragment>
      {/* a book card */}

      <Card className={classes.cardTemplate}>
        <Card.Img className={classes.bookImage} variant="top" src={props.url} />
        <Card.Body className={classes.cardTextAndButtons}>
          {/* <Card.Title>{props.title}</Card.Title> */}
          <Card.Title>{wrapTitle}</Card.Title>
          <div className={classes.buttons}>
            <Button onClick={handleShowDetails} variant="primary">
              View Details
            </Button>
            {isClicked &&
              alert(`You can't click "Add" button the second time!`)}
            <Button
              type="button"
              onClick={handleAddButton}
              className={classes.cartButton}
              variant="primary"
            >
              Add{" "}
              <Badge>
                <BsBagPlusFill />
              </Badge>
            </Button>
          </div>
        </Card.Body>
      </Card>

      {/* modal(info about a book) */}

      <Modal show={showDetails} onHide={handleCloseDetails}>
        <Modal.Header closeButton>
          <Modal.Title>{props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{props.text}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDetails}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
};

export default BookCard;
