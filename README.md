# Library App

This is a small Library app built with Node.js, Express, and TypeScript. It provides a set of APIs secured by JWT authentication and protected by roles. Users with different roles can create and view books based on their permissions.

## Features

- User registration and login
- Role-based access control
- Create books (role: CREATOR)
- View books created by the user (role: VIEWER)
- View all books (role: VIEW_ALL)
- Filter books by creation time

## Installation

1. Clone the repository:
   git clone https://github.com/your-username/library-app.git
   
# Pre - requisites
Before running the application, make sure you have the following installed:

* Node.js
* Mongoose
* Typescript
* Express
* Mongodb database

# Install the dependencies:
```
npm install
```

     "dependencies": {
    "bcrypt": "^5.1.0",
    "cookie-parser": "^1.4.6",
    "dotenv": "^16.3.1",
    "express": "^4.18.2",
    "jsonwebtoken": "^9.0.1",
    "mongoose": "^7.3.2",
    "nodemon": "^2.0.22",
    "ts-node": "^10.9.1",
    "typescript": "^5.1.6"
  },

# Set up environment variables:
 * Create a .env file in the root directory of the project and add the following variables:


        port=8000 // for running server
        mongoUrl=mongodb+srv://chandan:chandan@cluster0.3cpky3a.mongodb.net/library_app // for connecting to mongodb database

        key=process.env.key  // for generating jwt token
       

# Start the server:

     npm start
The server will start running on the specified port.

# API Endpoint

1. User Endpoints 

   `Register`
    * method : POST
    * Endpoint : /register
    * Request body:

        {
    "name": "John Doe",
    "email": "john.doe@example.com",
    "password": "password",
    "role": "VIEWER"
                 }

    * Response : If user is not register before then it will register successfully other wise throw an error user already exist.

    `Login`
    
   Logs in an existing user.
   * method : POST
   * Endpoint : /login
   * Request body :
     
            {
         "email": "john.doe@example.com",
          "password": "password123"
         }

3. Book Endpoints

   `Create Book (CREATOR Role)`
    
    * method : POST
    * Endpoint : /books
     * Authentication : User need to login first then they can add book.
    * Request body : 
      {
        "title": "The Book Title",
        "author": "Author Name"
        }
      
    * Response:

      200 OK: Book created successfully.
      401 Unauthorized: User does not have the required role.
      500 Internal Server Error: An error occurred while creating the book.
 
   `Create Book (VIEWER Role)`
   * method : POST
    * Endpoint : /view
     * Authentication : User need to login first then they can add book.
    * Request body : 
      {
        "title": "The Book Title",
        "author": "Author Name"
        }
      
    * Response:

      200 OK: Book created successfully.
      401 Unauthorized: User does not have the required role.
      500 Internal Server Error: An error occurred while creating the book.
    
    `Get Books (VIEWER Role)`
   * Get all the books created by VIEWER Requires the user to have the "VIEWER" role.
 * method : GET
    * Endpoint : /books/:id
     * Authentication : User need to login first then they can get book.
    * Response:

      200 OK: Books retrieved successfully.
      401 Unauthorized: User does not have the required role.
      500 Internal Server Error: An error occurred while creating the book.


   `Get All Books (VIEW_ALL Role)`
   * Get all the books. Requires the user to have the "VIEW_ALL" role.
    * method : GET
    * Endpoint : /books
     * Authentication : User need to login first then they can get book
*Request Headers
Authorization: Bearer JWT token
*Query Parameters
old (optional): Set to "1" to filter books created 10 minutes ago and more.
new (optional): Set to "1" to filter books created less than 10 minutes ago.
   
    * Response:
      200 OK: Books retrieved successfully.
      401 Unauthorized: User does not have the required role.
      500 Internal Server Error: An error occurred while creating the book

# Middleware

 ## authentication

Middleware function to authenticate requests. It checks for a valid JWT token in the Authorization header.

## authorization

Middleware function to authorise requests as per userrole.

## logger

Middleware function to to log all requests in log.txt file.


## Database Connection
The application uses MongoDB as the database. The connection to the database is established in the config/db.ts file. Make sure to provide the correct MongoDB connection URL in the .env file.

# Additional Notes

* The application uses the bcrypt library for password hashing and the jsonwebtoken library for JWT token generation.
* The API follows RESTful principles and returns JSON responses.
* Error handling is implemented for various scenarios, including validation errors and server errors.
