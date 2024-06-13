const express = require('express');
const router = express.Router();
const users = require('../data/users.js');

//GET route to get all users
router.get('/', (req, res) => {
  // const links = [
  //   {
  //     href: 'books/:id',
  //     rel: ':id',
  //     type: 'GET',
  //   },
  // ];

  res.json(users);
});

// GET user by ID
router.get('/:id', (req, res, next) => {
 
  const user = users.find((u) => u.id == req.params.id);

  // const links = [
  //   {
  //     href: `/${req.params.id}`,
  //     rel: '',
  //     type: 'PATCH',
  //   },
  //   {
  //     href: `/${req.params.id}`,
  //     rel: '',
  //     type: 'DELETE',
  //   },
  // ];

  if (user) {
   res.json(user);
  }else {
   res.status(404).send('User not found');
  }
});

//comments

// router.get('/:id/comments', (req, res) => {
//   const bookId = parseInt(req.params.id);
//   const bookComments = comments.filter(comment => comment.bookId === bookId);
//   res.json(bookComments);
// });

// router.get('/:id/comments?userId=<VALUE>', (req, res) => {
//   const bookId = parseInt(req.params.id);
//   const userId = req.query.userId;
//   const bookComments = comments.filter(comment => comment.bookId === bookId && comment.userId === parseInt(userId));
//   res.json(bookComments);
// });
// Post a new user(for registration)
router.post('/', (req, res) => {
  const{name, username, email} = req.body;
  if (name && username && email) {
    const newUser = {
      id: users.length + 1,
      name,
      username,
      email
    };
    users.push(newUser);
    res.json(newUser);
  } else {
    res.status(400).json({ error: 'Insufficient Data' });
  }
});

// //PATCH Update a Book
// router.patch('/:id', (req, res, next) => {
//   // Within the PATCH request route, we allow the client
//   // to make changes to an existing user in the database.
//   const book = books.find((p, i) => {
//     if (p.id == req.params.id) {
//       for (const key in req.body) {
//         // Applying the updates within the req.body to the in-memory book
//         books[i][key] = req.body[key];
//       }
//       return true;
//     }
//   });

//   if (book) {
//     res.json(book);
//   } else {
//     next();
//   }
// });

// // DELETE Delete a book
// router.delete('/:id', (req, res) => {
//   // The DELETE request route simply removes a resource.
//   const book = books.find((p, i) => {
//     if (p.id == req.params.id) {
//       books.splice(i, 1);
//       return true;
//     }
//   });

//   if (book) res.json(book);
//   else next();
// });

module.exports = router;