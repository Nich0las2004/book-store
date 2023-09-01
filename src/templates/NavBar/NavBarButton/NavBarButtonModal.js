import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";
import { useDispatch, useSelector } from "react-redux";
import { Fragment, useState } from "react";
import LoadingSpinner from "./LoadingSpinner";

import classes from "./NavBarButtonModal.module.css";
import { buttonActions } from "../../../store";

const NavBarButtonModal = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [ordered, setOrdered] = useState(false);

  const dispatch = useDispatch();

  const bookDetails = useSelector((state) => state.books.bookDetails);

  const incrementBookQuantityHandler = (book) => {
    const updatedRepeat = book.repeat + 1;
    dispatch(buttonActions.increment());
    dispatch(
      buttonActions.updateRepeat({ title: book.title, repeat: updatedRepeat })
    );
  };
  const decrementBookQuantityHandler = (book) => {
    const updatedRepeat = book.repeat - 1;
    dispatch(buttonActions.decrement());
    dispatch(
      buttonActions.updateRepeat({ title: book.title, repeat: updatedRepeat })
    );
  };

  const removeBookHandler = (book) => {
    dispatch(buttonActions.updateRepeat({ title: book.title, repeat: 0 }));
    dispatch(buttonActions.removeBook(book.repeat));
  };

  const uniqueBookDetails = bookDetails.filter(
    (book, index, self) =>
      index === self.findIndex((b) => b.title === book.title)
  );

  const chosenBooks = uniqueBookDetails.map((obj) => {
    const fullPrice = (obj.price * obj.repeat).toFixed(2);

    return (
      <tr key={Math.random()} style={{}}>
        {obj.repeat > 0 && (
          <Fragment>
            <td>{obj.title}</td>
            <td
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <button
                className={classes.buttons}
                type="button"
                onClick={() => decrementBookQuantityHandler(obj)}
              >
                &minus;
              </button>
              {obj.repeat}

              <button
                className={classes.buttons}
                type="button"
                onClick={() => incrementBookQuantityHandler(obj)}
              >
                &#43;
              </button>
            </td>
            <td>${fullPrice}</td>

            <td>
              <Button onClick={() => removeBookHandler(obj)} variant="danger">
                Remove
              </Button>{" "}
            </td>
          </Fragment>
        )}
      </tr>
    );
  });

  const totalSelectedPrice = bookDetails.reduce(
    (total, book) => total + book.price * book.repeat,
    0
  );

  const orderHandler = () => {
    setIsLoading(true);
    setOrdered(false);


    fetch(
      "https://react-http-21b19-default-rtdb.europe-west1.firebasedatabase.app/prices.json",
      {
        method: "POST",
        body: JSON.stringify({ price: `$${totalSelectedPrice.toFixed(2)}` }),
        headers: { "Content-Type": "application/json" },
      }
    )
      .then(() => {
        setIsLoading(false);
        setOrdered(true);
      })
      .catch((error) => alert(`Error: ${error}`));
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Fragment>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Selected Books
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {isLoading && <LoadingSpinner />}

          {!isLoading && (
            <Fragment>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Title</th>
                    <th
                      style={{
                        textAlign: "center",
                      }}
                    >
                      Quantity
                    </th>
                    <th>Price</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>{chosenBooks}</tbody>
              </Table>
              <h4>Total Price: ${totalSelectedPrice.toFixed(2)}</h4>
            </Fragment>
          )}
          {ordered && (
            <h5 style={{ textAlign: "center" }}>Books Have Been Ordered :)</h5>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => { dispatch(buttonActions.clearData()); setOrdered(false) ;props.onHide() }}>Close</Button>
          <Button
            variant="warning"
            className={classes.orderBtn}
            onClick={orderHandler}
          >
            Order
          </Button>{" "}
        </Modal.Footer>
      </Fragment>
    </Modal>
  );
};

export default NavBarButtonModal;
