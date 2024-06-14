const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3003;
const userRouter = require('./routes/users.js');
const bookRouter = require('./routes/books.js');
const loginRouter = require('./routes/login.js')


// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Body parser middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Route to serve the homepage
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});


// New logging middleware to help us keep track of requests during testing!
app.use((req, res, next) => {
  const time = new Date();

  console.log(
    `-----
${time.toLocaleTimeString()}: Received a ${req.method} request to ${req.url}.`
  );
  if (Object.keys(req.body).length > 0) {
    console.log('Containing the data:');
    console.log(`${JSON.stringify(req.body)}`);
  }
  next();
});

// Serve static files
app.use(express.static(path.join(__dirname, 'views/index.html')));

// API Routes
app.use('/api/users', userRouter);
app.use('/api/books', bookRouter);
app.use('/api/login', loginRouter);

app.get('/', (req, res) => {
  res.json({
    links: [
      {
        href: '/api',
        rel: 'api',
        type: 'GET',
      },
    ],
  });
});

// Adding some HATEOAS links.
app.get('/api', (req, res) => {
  res.json({
    links: [
      {
        href: 'api/users',
        rel: 'users',
        type: 'GET',
      },
      {
        href: 'api/users',
        rel: 'users',
        type: 'POST',
      },
      {
        href: 'api/books',
        rel: 'books',
        type: 'GET',
      },
      {
        href: 'api/books',
        rel: 'books',
        type: 'POST',
      },
    ],
  });
});

// Route for creating a new book
app.get('/books/new', (req, res) => {
  res.sendFile(path.join(__dirname, 'views/new-book.html'));
});

// Route for creating a new user
app.get('/users/new', (req, res) => {
  res.sendFile(path.join(__dirname, 'views/new-user.html'));
});

// 404 middleware must be the last middleware
app.use((req, res) => {
  res.status(404).json({ error: 'Resource Not Found' });
});

app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});
app.listen(PORT, () => {
  console.log('Server running on port: ' + PORT);
});

// app.get('/books/new', (req, res) => {
//   res.send(`
//       <div>
//         <h1>Create Book</h1>
//         <form action="/api/users?api-key=Hunger Games"  method="POST">
//           Title: <input type="text" title="title" /> <br />
//           Author: <input type="text" author="author" /> <br />
//           Content: <input type="description=" description="description" /> <br />
//           <input type="submit" value="Create User" />
//         </form>
//       </div>
//     `);
// });

