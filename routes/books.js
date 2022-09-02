const express = require("express");

// Importing books (JSON data)
const { books } = require("../data/books.json");
const { users } = require("../data/users.json");

const router = express.Router();

/**
 * Route: /books
 * Method: GET
 * Description: Get all books
 * Access: Public
 * Parameters: none
 */

router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    data: books,
  });
});

/**
 * Route: /books/:id
 * Method: GET
 * Description: Get book by id
 * Access: Public
 * Parameters: id
 */

router.get("/:id", (req, res) => {
  const { id } = req.params;

  const book = books.find((each) => each.id === id);

  if (!book)
    return res.status(404).json({ success: false, message: "Book not found" });

  return res.status(200).json({
    success: true,
    data: book,
  });
});

/**
 * Route: /books/issued/by-user
 * Method: GET
 * Description: Get all issued books
 * Access: Public
 * Parameters: none
 */

router.get("/issued/by-user", (req, res) => {
  const usersWithIssuedBooks = users.filter((each) => {
    if (each.issuedBook) return each;
  });

  const issuedBooks = [];

  usersWithIssuedBooks.forEach((each) => {
    const book = books.find((book) => book.id === each.issuedBook);

    book.issuedBy = each.name;
    book.issuedDate = each.issuedDate;
    book.returnDate = each.returnDate;

    issuedBooks.push(book);
  });

  if (issuedBooks.length === 0)
    return res.status(404).json({
      success: false,
      message: "No books issued yet !!",
    });

  return res.status(200).json({
    success: true,
    data: issuedBooks,
  });
});

/**
 * Route: /books
 * Method: POST
 * Description: Create a new book
 * Access: Public
 * Parameters: none
 * Data : author, name, genre, price, publisher, id
 */

router.post("/", (req, res) => {
  // const { data } = req.body;
  const { id, author, name, genre, price, publisher } = req.body;

  // if (!data) {
  //   return res.status(404).json({
  //     success: false,
  //     message: "No data provided",
  //   });
  // }

  const book = books.find((each) => each.id === id);

  if (book) {
    return res.status(404).json({
      success: false,
      message: "Book already exists with this id",
    });
  }

  // const allBooks = [...books, data];

  books.push({
    id,
    author,
    name,
    genre,
    price,
    publisher,
  });

  return res.status(201).json({
    success: true,
    // data: allBooks,
    data: books,
  });
});

/**
 * Route: /books/:id
 * Method: PUT
 * Description: Update a book
 * Access: Public
 * Parameters: id
 * Data : author, name, genre, price, publisher, id
 */

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { data } = req.body;

  const book = books.find((each) => each.id === id);

  if (!book)
    return res.status(404).json({
      success: false,
      message: "Book not found with this particular id ",
    });

  const updateData = books.map((each) => {
    if (each.id === id) {
      return { ...each, ...data };
    }
    return each;
  });

  return res.status(200).json({
    success: true,
    data: updateData,
  });
});

/**
 * Route: /books/issued/withFine
 * Method: GET
 * Description: Gell all issued books with fine
 * Access: Public
 * Parameters: none
 */

router.get("/issued/withFine", (req, res) => {
  const usersWithIssuedBooksWithFine = users.filter((each) => {
    if (each.issuedBook) return each;
  });

  const issuedBookswithFine = [];

  usersWithIssuedBooksWithFine.forEach((each) => {
    const book = books.find((book) => book.id === each.issuedBook);

    const getDateInDays = (data = "") => {
      let date;
      if (data === "") {
        // current date
        date = new Date();
      } else {
        // getting date on basis of data variable
        date = new Date(data);
      }

      let days = Math.floor(date / (1000 * 60 * 60 * 24));
      return days;
    };

    let returnDate = getDateInDays(each.returnDate);
    let currentDate = getDateInDays();
    if (returnDate < currentDate) {
      issuedBookswithFine.push(book);
    }
  });

  if (issuedBookswithFine.length === 0) {
    return res.status(404).json({
      success: false,
      message: "No issued books with fine were found!!",
    });
  }

  return res.status(200).json({
    success: true,
    data: issuedBookswithFine,
  });
});

// default export
module.exports = router;
