const express = require('express');
const router = express.Router();
const books = require('../data/books.js');
const comments = require('../data/comments.js');

//GET route to get all post data
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

// GET a book by ID
router.get('/:id', (req, res, next) => {
  // Using the Array.find method to find the user with the same id as the one sent with the request
  const book = books.find((b) => b.id === parseInt(req.params.id));
  if (book) {
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
    res.json({ book, links });
  } else {
    next();
  }
});

//GET comments for a book

router.get('/:id/comments', (req, res) => {
  const bookId = parseInt(req.params.id);
  let bookComments = comments.filter((comment) => comment.bookId === bookId);

  // Optional query parameter for userId filtering
  const userId = req.query.userId;
  if (userId) {
    bookComments = bookComments.filter(
      (comment) => comment.userId === parseInt(userId)
    );
  }
  res.json(bookComments);
});

// router.get('/:id/comments?userId=<VALUE>', (req, res) => {
//   const bookId = parseInt(req.params.id);
//   const userId = req.query.userId;
//   const bookComments = comments.filter(comment => comment.bookId === bookId && comment.userId === parseInt(userId));
//   res.json(bookComments);
// });

// POST a new book
router.post('/', (req, res) => {
  if (req.body.title && req.body.author && req.body.content) {
    // If the code gets to this point, we are good to create the book
    const book = {
      id: books.length + 1,
      title: req.body.title,
      author: req.body.author,
      content: req.body.content,
      url: req.body.url || '',
    };

    books.push(book);
    res.json(book);
  } else {
    res.status(400).json({ error: 'Insufficient Data' });
  }
});


//PATCH Update a Post
router.patch('/:id', (req, res, next) => {
  // Within the PATCH request route, we allow the client to make changes to an existing book in the database.
  const book = books.find((b, i) => {
    if (b.id == req.params.id) {
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


// DELETE Delete a post
router.delete('/:id', (req, res) => {
  // The DELETE request route simply removes a resource.
  const book = books.find((b, i) => {
    if (b.id == req.params.id) {
      books.splice(i, 1);
      return true;
    }
  });

  if (book) res.json(book);
  else next();
});

module.exports = router;