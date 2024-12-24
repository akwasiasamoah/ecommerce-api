# E-commerce API Documentation

This application provides functionality for user authentication, product management, category management, and order processing. It allows users to register, log in, and manage products, categories, and orders. The application is built using Node.js with Express and MongoDB.

## Features

- **User Authentication:**

  - Register a new user.
  - Log in to an existing account.
  - JWT-based authentication for secure access.

- **Product Management:**

  - Add new products.
  - View all products.
  - View, update, and delete specific products.

- **Category Management:**

  - Add new categories.
  - View all categories.
  - Update and delete specific categories.

- **Order Management:**
  - Place new orders.
  - View all orders by a user.
  - Admin functionality to update order status.

## Requirements

- **Node.js** (v14 or higher)
- **MongoDB** (or a cloud MongoDB service like MongoDB Atlas)
- **Postman** (for API testing)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/akwasiasamoah/ecommerce-api.git
   ```

2. Navigate to the project directory and install dependencies:

   ```bash
   cd ecommerce-api
   npm install
   ```

3. Set up environment variables:

   Create a `.env` file in the root directory and add the following variables:

   ```env
   PORT=6000
   MONGO_URI=<your_mongo_uri>
   JWT_SECRET=<your_jwt_secret>
   JWT_LIFETIME=<jwt_lifetime>
   NODE_ENV=development
   ```

4. Start the application:

   ```bash
   npm start
   ```

## API Endpoints

### Authentication

- **POST /api/v1/auth/register** - Register a new user

  **Request:**

  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }
  ```

  **Response:**

  ```json
  {
    "user": {
      "name": "John Doe",
      "userId": "6126ad3424d2bd09165a68c4",
      "role": "user"
    }
  }
  ```

- **POST /api/v1/auth/login** - Log in an existing user

  **Request:**

  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```

  **Response:**

  ```json
  {
    "user": {
      "name": "John Doe",
      "userId": "6126ad3424d2bd09165a68c4",
      "role": "user"
    }
  }
  ```

### Users

- **GET /api/v1/users** - Get all users (admin only)

  **Response:**

  ```json
  {
    "users": [
      {
        "name": "John Doe",
        "email": "john@example.com",
        "role": "user"
      },
      {
        "name": "Jane Doe",
        "email": "jane@example.com",
        "role": "admin"
      }
    ]
  }
  ```

- **GET /api/v1/users/:id** - Get a specific user (admin only)

  **Response:**

  ```json
  {
    "user": {
      "name": "John Doe",
      "email": "john@example.com",
      "role": "user"
    }
  }
  ```

### Products

- **POST /api/v1/products** - Add a new product

  **Request:**

  ```json
  {
    "name": "Accent Chair",
    "price": 25999,
    "description": "Comfortable chair",
    "image": "https://example.com/image.jpg",
    "category": "office",
    "company": "marcos",
    "colors": ["#ff0000", "#00ff00", "#0000ff"]
  }
  ```

  **Response:**

  ```json
  {
    "product": {
      "name": "Accent Chair",
      "price": 25999,
      "description": "Comfortable chair",
      "image": "https://example.com/image.jpg",
      "category": "office",
      "company": "marcos",
      "colors": ["#ff0000", "#00ff00", "#0000ff"],
      "user": "6126ad3424d2bd09165a68c4"
    }
  }
  ```

- **GET /api/v1/products** - Get all products

  **Response:**

  ```json
  {
    "products": [
      {
        "name": "Accent Chair",
        "price": 25999,
        "description": "Comfortable chair",
        "image": "https://example.com/image.jpg",
        "category": "office",
        "company": "marcos",
        "colors": ["#ff0000", "#00ff00", "#0000ff"]
      },
      {
        "name": "Albany Sectional",
        "price": 109999,
        "description": "Spacious sectional",
        "image": "https://example.com/image2.jpg",
        "category": "living room",
        "company": "ikea",
        "colors": ["#0000ff", "#000"]
      }
    ],
    "count": 2
  }
  ```

### Categories

- **POST /api/v1/categories** - Add a new category

  **Request:**

  ```json
  {
    "name": "Office"
  }
  ```

  **Response:**

  ```json
  {
    "category": {
      "name": "Office"
    }
  }
  ```

- **GET /api/v1/categories** - Get all categories

  **Response:**

  ```json
  {
    "categories": [
      {
        "name": "Office"
      },
      {
        "name": "Kitchen"
      }
    ]
  }
  ```

### Orders

- **POST /api/v1/orders** - Place a new order

  **Request:**

  ```json
  {
    "items": [
      {
        "product": "6126ad3424d2bd09165a68c4",
        "amount": 2
      }
    ],
    "tax": 399,
    "shippingFee": 499
  }
  ```

  **Response:**

  ```json
  {
    "order": {
      "orderItems": [
        {
          "name": "Accent Chair",
          "price": 2599,
          "image": "https://example.com/image.jpg",
          "amount": 2,
          "product": "6126ad3424d2bd09165a68c4"
        }
      ],
      "total": 3197,
      "subtotal": 2598,
      "tax": 399,
      "shippingFee": 499,
      "clientSecret": "someRandomValue",
      "user": "6126ad3424d2bd09165a68c4"
    }
  }
  ```

- **GET /api/v1/orders** - Get all orders by a user

  **Response:**

  ```json
  {
    "orders": [
      {
        "orderItems": [
          {
            "name": "Accent Chair",
            "price": 2599,
            "image": "https://example.com/image.jpg",
            "amount": 2,
            "product": "6126ad3424d2bd09165a68c4"
          }
        ],
        "total": 3197,
        "subtotal": 2598,
        "tax": 399,
        "shippingFee": 499,
        "clientSecret": "someRandomValue",
        "user": "6126ad3424d2bd09165a68c4"
      }
    ],
    "count": 1
  }
  ```

## Middleware

- **Authentication Middleware** - [middleware/authentication.js](middleware/authentication.js)
- **Error Handler Middleware** - [middleware/error-handler.js](middleware/error-handler.js)
- **Not Found Middleware** - [middleware/not-found.js](middleware/not-found.js)

## Utilities

- **JWT Utilities** - [utils/jwt.js](utils/jwt.js)

## Database Connection

The application uses MongoDB as its database. The connection to the MongoDB database is handled in the `db/connect.js` file. The connection string is stored in the `.env` file as `MONGO_URI`.

**Example of `db/connect.js`:**

```javascript
const mongoose = require("mongoose");

const connectDB = (url) => {
  return mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

module.exports = connectDB;
```

To connect to the database, the `connectDB` function is called in the `server.js` file with the `MONGO_URI` from the environment variables.

**Example of `server.js` connection:**

```javascript
const connectDB = require("./db/connect");
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Server is listening on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
```

## Error Handling

The application has a centralized error handling mechanism to manage different types of errors. Custom error classes are defined in the `errors` directory, and middleware functions are used to handle errors globally.

**Custom Error Classes:**

- **Custom API Error** - [errors/custom-api.js](errors/custom-api.js)
- **Bad Request Error** - [errors/bad-request.js](errors/bad-request.js)
- **Not Found Error** - [errors/not-found.js](errors/not-found.js)
- **Unauthenticated Error** - [errors/unauthenticated.js](errors/unauthenticated.js)
- **Unauthorized Error** - [errors/unauthorized.js](errors/unauthorized.js)

**Example of a Custom Error Class:**

```javascript
class CustomAPIError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

module.exports = CustomAPIError;
```

**Error Handling Middleware:**

- **Error Handler Middleware** - [middleware/error-handler.js](middleware/error-handler.js)

  This middleware catches all errors and sends a structured response to the client.

  **Example of `error-handler.js`:**

  ```javascript
  const { CustomAPIError } = require("../errors/custom-api");
  const errorHandlerMiddleware = (err, req, res, next) => {
    if (err instanceof CustomAPIError) {
      return res.status(err.statusCode).json({ msg: err.message });
    }
    return res
      .status(500)
      .json({ msg: "Something went wrong, please try again" });
  };

  module.exports = errorHandlerMiddleware;
  ```

- **Not Found Middleware** - [middleware/not-found.js](middleware/not-found.js)

  This middleware handles requests to undefined routes.

  **Example of `not-found.js`:**

  ```javascript
  const notFound = (req, res) => res.status(404).send("Route does not exist");

  module.exports = notFound;
  ```

By using these custom error classes and middleware functions, the application ensures that errors are handled consistently and provides meaningful error messages to the client.

## Mock Data

- **Orders Mock Data** - [mockData/orders.json](mockData/orders.json)
- **Products Mock Data** - [mockData/products.json](mockData/products.json)

## License

This project is licensed under the MIT License.
