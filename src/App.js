import { Fragment } from "react";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

import NavBar from "./templates/NavBar/NavBar";
import Adventure from "../src/pages/Adventure";
import Classics from "../src/pages/Classics";
import Fantasy from "../src/pages/Fantasy";
import ScienceFiction from "../src/pages/ScienceFiction";
import BookCard from "./templates/BookCard/BookCard";
import BooksAPI from "./templates/BooksAPI/BooksAPI";

const App = () => {
  const location = useLocation();

  const displayingBooks = BooksAPI.map((obj) => (
    <BookCard
      key={obj.id}
      url={obj.url}
      title={obj.title}
      text={obj.text}
      price={obj.price}
    />
  ));

  const exactPath = location.pathname;

  return (
    <Fragment>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route
          path="/home"
          element={
            <>
              <NavBar />
              <Container>
                <Row style={{ justifyContent: "center" }}>
                  {exactPath === "/home" && displayingBooks}
                </Row>
              </Container>
            </>
          }
        >
          <Route path="fantasy" element={<Fantasy />} />
          <Route path="adventure" element={<Adventure />} />
          <Route path="classics" element={<Classics />} />
          <Route path="science-fiction" element={<ScienceFiction />} />
        </Route>
      </Routes>
    </Fragment>
  );
};

export default App;
