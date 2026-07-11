# WTWR Backend

This project is the backend for the WTWR (What to Wear?) application. It handles storing and managing users and clothing items through a REST API connected to MongoDB.

The server allows users to:

- create and view user profiles
- add clothing items
- delete clothing items
- like and unlike items
- retrieve users and clothing data from the database

## Main Routes

### Users

- `GET /users` — returns all users
- `GET /users/:userId` — returns a user by ID
- `POST /users` — creates a new user

### Clothing Items

- `GET /items` — returns all clothing items
- `GET /items/:itemId` — returns a clothing item by ID
- `POST /items` — creates a new clothing item
- `DELETE /items/:itemId` — deletes a clothing item
- `PUT /items/:itemId/likes` — likes an item
- `DELETE /items/:itemId/likes` — removes a like from an item

## Technologies Used

This project was built using:

- Node.js
- Express.js
- MongoDB
- Mongoose
- ESLint
- Nodemon
- Validator.js

## link to project pitch video

- https://www.loom.com/share/81cd567f2baf4d589565032c03b729b5

## Running the Project

```bash
npm install
npm run dev
```

The routes and error handling were tested using Postman.
