import { BsCart } from "react-icons/bs";
import { useSelector } from "react-redux";

import classes from "./NavBarButton.module.css";
import NavBarButtonModal from "./NavBarButtonModal";

import Badge from "react-bootstrap/Badge";
import { useState, Fragment, useEffect, useRef } from "react";

const NavBarButton = () => {
  const [booksStateChanged, setBooksStateChanged] = useState(classes.button);
  const [modalShow, setModalShow] = useState(false);
  const booksCount = useSelector((state) => state.books.books);

  const initialRender = useRef(true);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
    } else {
      setTimeout(() => setBooksStateChanged(classes.buttonShake), 200);
      setTimeout(() => setBooksStateChanged(classes.button), 800);
    }
  }, [booksCount]);

  const cartClickHandler = () => {
    setModalShow(true);
  };

  return (
    <Fragment>
      <button onClick={cartClickHandler} className={booksStateChanged}>
        <BsCart /> <Badge className={classes.allBooks}>{booksCount}</Badge>
      </button>
      <NavBarButtonModal show={modalShow} onHide={() => {setModalShow(false)}} />
    </Fragment>
  );
};

export default NavBarButton;
