
# Authentication API

## Description
This is a Authentication API built with Node.js and Express.js. It allows users to sign up, log in, and access a protected profile using a JWT token.

## Technologies Used
- Node.js
- Express.js
- bcryptjs
- jsonwebtoken
- Postman

## Features
- User registration
- Hashing of Password
- User login
- JWT token generation
- Protected profile route

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | `/signup` | Register a new user |
| POST | `/login` | Log in and receive a token |
| GET | `/profile` | Access a protected profile |

## How to Run the Project

1. Install dependencies:

   ```
   npm install
   ```

2. Start the server:

   ```
   node app.js
   ```

3. Test the endpoints using Postman.

## What I Learned
- Creating API endpoints with Express.js.
- Hashing passwords using bcryptjs.
- Generating and verifying JWT tokens.
- Protecting routes with authentication middleware.
- Testing APIs with Postman.