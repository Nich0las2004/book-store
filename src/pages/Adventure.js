import BookCard from "../templates/BookCard/BookCard";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

import BooksAPI from "../templates/BooksAPI/BooksAPI";
import { useEffect } from "react";

const Adventure = () => {
  useEffect(() => {
    window.scrollTo(0,0)
  }, [])

  return (
    <Container>
      <Row style={{ justifyContent: "center" }}>
        {BooksAPI.filter((obj) => obj.genre === "adventure").map((book) => (
          <BookCard
            key={book.id}
            url={book.url}
            title={book.title}
            text={book.text}
            price={book.price}
          />
        ))}
      </Row>
    </Container>
  );
};

export default Adventure;
