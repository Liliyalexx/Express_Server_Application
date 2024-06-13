const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3003;
const userRouter = require('./routes/users.js');
const bookRouter = require('./routes/books.js');


// Body parser middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// New logging middleware to help us keep track of
// requests during testing!
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

// // Valid API Keys.
// const apiKeys = [
//   'Hunger Games',
//   'Three Body Problem',
//   'Fahrenheit 451',
//   'The Little Lady of the Big House',
//   'Dark Matter',
//   'Tomorrow, and Tomorrow, and Tomorrow',
//   'Dunes',
//   'Project Hail Mary',
//   'Alyce Network',
// ];

// // New middleware to check for API keys!
// // Note that if the key is not verified,
// // we do not call next(); this is the end.
// // This is why we attached the /api/ prefix
// // to our routing at the beginning!
// app.use('/api', function (req, res, next) {
//   var key = req.query['api-key'];

//   // Check for the absence of a key.
//   if (!key) {
//     res.status(400);
//     return res.json({ error: 'API Key Required' });
//   }

//   // Check for key validity.
//   if (apiKeys.indexOf(key) === -1) {
//     res.status(401);
//     return res.json({ error: 'Invalid API Key' });
//   }

//   // Valid key! Store it in req.key for route access.
//   req.key = key;
//   next();
// });

// Serve static files
app.use(express.static(path.join(__dirname, 'views')));

// API Routes
app.use('/api/users', userRouter);
app.use('/api/books', bookRouter);

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

app.get('/books/new',(req,res) => {
  res.sendFile(path.join(__dirname, 'views/new-book.html'));
});

// The only way this middlware runs is if a route handler function runs the "next()" function
app.use((req, res) => {
  res.status(404);
  res.json({ error: 'Resource Not Found' });
});

app.listen(PORT, () => {
  console.log('Server running on port: ' + PORT);
});
