const express = require('express');
const router = express.Router();
const books = require('../data/books.js');

//GET route to get all book data
router.get('/', (req, res) => {
  const links = [
    {
      href: 'books/:id',
      rel: ':id',
      type: 'GET',
    },
  ];

  res.json({ books, links });
});

// GET route to get a book by ID
router.get('/:id', (req, res, next) => {
  // Using the Array.find method to find the user with the same id as the one sent with the request
  const book = books.find((p) => p.id == req.params.id);

  const links = [
    {
      href: `/${req.params.id}`,
      rel: '',
      type: 'PATCH',
    },
    {
      href: `/${req.params.id}`,
      rel: '',
      type: 'DELETE',
    },
  ];

  if (book) res.json({ book, links });
  else next();
});

//comments

router.get('/:id/comments', (req, res) => {
  const bookId = parseInt(req.params.id);
  const bookComments = comments.filter(comment => comment.bookId === bookId);
  res.json(bookComments);
});

router.get('/:id/comments?userId=<VALUE>', (req, res) => {
  const bookId = parseInt(req.params.id);
  const userId = req.query.userId;
  const bookComments = comments.filter(comment => comment.bookId === bookId && comment.userId === parseInt(userId));
  res.json(bookComments);
});
// book Create a book
router.post('/', (req, res) => {
  // Within the book request we will create a new book.
  // The client will pass us data and we'll push that data into our psots array.
  // the book data that we want to create is inside the req.body
  if (req.body.userId && req.body.title && req.body.content) {
    // If the code gets to this point, we are good to create the book
    const book = {
      id: books.length + 1,
      userId: req.body.userId,
      title: req.body.title,
      content: req.body.content,
    };

    books.push(book);
    res.json(book);
  } else {
    res.status(400).json({ error: 'Insufficient Data' });
  }
});

//PATCH Update a Book
router.patch('/:id', (req, res, next) => {
  // Within the PATCH request route, we allow the client
  // to make changes to an existing user in the database.
  const book = books.find((p, i) => {
    if (p.id == req.params.id) {
      for (const key in req.body) {
        // Applying the updates within the req.body to the in-memory book
        books[i][key] = req.body[key];
      }
      return true;
    }
  });

  if (book) {
    res.json(book);
  } else {
    next();
  }
});

// DELETE Delete a book
router.delete('/:id', (req, res) => {
  // The DELETE request route simply removes a resource.
  const book = books.find((p, i) => {
    if (p.id == req.params.id) {
      books.splice(i, 1);
      return true;
    }
  });

  if (book) res.json(book);
  else next();
});

module.exports = router;