const express = require('express');
const router = express.Router();
const books = require('../data/books.js');
const comments = require('../data/comments.js');

//GET route to get all post data
router.get('/', (req, res) => {
  // const links = [
  //   {
  //     href: 'books/:id',
  //     rel: ':id',
  //     type: 'GET',
  //   },
  // ];

  res.json({ books, links });
});

// GET a book by ID
router.get('/:id', (req, res, next) => {
  // Using the Array.find method to find the user with the same id as the one sent with the request
  const book = books.find((b) => b.id === parseInt(req.params.id));
  if (book) {
    res.json(book);
  } else {
    res.status(404).send('Book not found');
  }
});

//GET comments for a book

router.get('/:id/comments', (req, res) => {
  const bookId = parseInt(req.params.id);
  const bookComments = comments.filter(comment => comment.bookId === bookId);
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
  const {title, author, content, url } = req.body;
  if (title, author, content) {
    // If the code gets to this point, we are good to create the post
    const newBook = {
      id: books.length + 1,
      title,
      author,
      content,
      url: url || '',
    };

    books.push(newBook);
    res.json(newBook);
  } else {
    res.status(400).json({ error: 'Insufficient Data' });
  }
});

//PATCH Update a Post
router.post('/:id/comments', (req, res) => {
  const bookId = parseInt(req.param.id);
  const {userId, content } = req.params.body;
  if(userId && content) {
    const newComment = {
      id: comments.length +1, 
      bookId, 
      userId, 
      content
    };
    comments.push(newComment);
    res.json(newComment);
  }else{
    res.status(400).json({error: "Insufficient Data" });
  }
  });



// DELETE Delete a post
router.delete('/:id', (req, res) => {
  // The DELETE request route simply removes a resource.
  const post = books.find((p, i) => {
    if (p.id == req.params.id) {
      books.splice(i, 1);
      return true;
    }
  });

  if (post) res.json(post);
  else next();
});

module.exports = router;