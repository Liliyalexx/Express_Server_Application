# Express Server Application

This is an Express.js server application that provides a simple library system. It includes routes for managing books, users, and comments.

## Project Structure
Express_Server_Application/
├── data/
│ ├── books.js
│ ├── comments.js
│ └── users.js
├── public/
│ ├── images/
│ └── styles/
│ └── style.css
├── routes/
│ ├── books.js
│ ├── comments.js
│ ├── login.js
│ └── users.js
├── utilities/
│ └── errors.js
├── views/
│ ├── index.html
│ ├── login.html
│ ├── new-book.html
│ └── new-user.html
├── server.js
└── README.md

## Getting Started

### Prerequisites

- Node.js
- npm

### Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/your-repo/express-server-application.git
    cd express-server-application
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

### Running the Server

Start the server with the following command:
```sh
node server.js

The server will start on http://localhost:3000.

Endpoints
Books
GET /books: Retrieve all books.
GET /books/
: Retrieve a book by its ID.
POST /books: Create a new book.
PATCH /books/
: Update a book by its ID.
DELETE /books/
: Delete a book by its ID.
GET /books/
/comments: Get comments for a book by its ID.
Users
GET /users: Retrieve all users.
GET /users/
: Retrieve a user by its ID.
POST /users: Create a new user.
Comments
GET /comments: Retrieve comments, filtered by userId and/or postId if provided.
POST /comments: Create a new comment.
GET /comments/
: Retrieve a comment by its ID.
PATCH /comments/
: Update a comment by its ID.
DELETE /comments/
: Delete a comment by its ID.
Login
GET /login: Serve the login form.
POST /login: Handle login form submission.


Data Structure


books.js (data/books.js)
const books = [
  {
    id: 1,
    title: "Hunger Games",
    author: "Suzanne Marie Collins",
    content: "similique esse doloribus nihil accusamus...",
    url: "https://www.amazon.com/Hunger-Games-Book/dp/0439023483"
  },
  // more book objects...
];
module.exports = books;

comments.js (data/comments.js)
const comments = [
  {
    id: 1,
    userId: 1,
    postId: 1,
    body: "Great book!"
  },
];
module.exports = comments;

users.js (data/users.js)
const users = [
  {
    id: 1,
    name: "Carey",
    username: "cyare23",
    email: "cy23@example.com"
  },
  // more user objects...
];
module.exports = users;

Views
index.html: Home page with a list of books and a login form.
login.html: Login form.
new-book.html: Form to create a new book.
new-user.html: Form to create a new user.

Styling
style.css: Styles for the HTML pages.