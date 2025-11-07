# Course Management System Backend API

![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)

A robust and secure RESTful API backend for a Course Management System. This project was built as an assignment to demonstrate proficiency in Node.js, Express.js, MongoDB, and secure authentication practices using JSON Web Tokens (JWT).

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Prerequisites](#prerequisites)
- [Installation & Setup](#installation--setup)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Testing](#testing)
- [Project Structure](#project-structure)
- [Future Enhancements](#future-enhancements)
- [Author](#author)

---

## 🚀 Project Overview

This API provides the backend functionality for managing online courses. It allows users to register, authenticate, and securely manage course content. The system implements role-based access control to ensure that only authenticated users can perform CRUD (Create, Read, Update, Delete) operations on courses they have created.

---

## ✨ Features

- **User Authentication**: Secure registration and login system.
- **JWT-Based Authorization**: Protected routes that require a valid token for access.
- **User Profile Management**: Users can retrieve and update their profile information.
- **Course CRUD Operations**: Full functionality to create, view, update, and delete courses.
- **Data Validation**: Input validation on both the client and server side to ensure data integrity.
- **Secure Password Hashing**: Passwords are hashed using `bcryptjs` before being stored in the database.
- **Error Handling**: Centralized error handling for consistent and clear error responses.

---

## 🛠 Technology Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JSON Web Tokens (JWT)
- **Security**: bcryptjs for password hashing
- **Testing**: Jest & Supertest for automated API testing
- **Environment**: dotenv for managing environment variables

---

## 📦 Prerequisites

Before you begin, ensure you have the following installed on your machine:
- [Node.js and npm](https://nodejs.org/en/) (v18 or higher recommended)
- A running MongoDB instance (either locally or a cloud service like MongoDB Atlas)

---

## ⚙️ Installation & Setup

Follow these steps to get a copy of the project up and running on your local machine.

1.  **Clone the repository**
    ```bash
    git clone https://github.com/your-username/course-management-api.git
    cd course-management-api
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Create a `.env` file** in the root directory and add the following variables. You can use the provided `.env.example` as a template.

    ```env
    PORT=5000
    MONGODB_URI=mongodb+srv://<user>:<password>@cluster0.xxxxx.mongodb.net/course-management?retryWrites=true&w=majority
    JWT_SECRET=your_generated_jwt_secret_key_here
    JWT_EXPIRE=24h
    NODE_ENV=development
    ```

4.  **Generate a JWT Secret**
    Run the following command in your terminal to generate a secure secret key and paste it into your `.env` file.
    ```bash
    node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
    ```

---

## 🌐 Running the Application

1.  **Start the server in development mode**
    ```bash
    npm run dev
    ```
    The server will start on `http://localhost:5000`.

2.  **Start the server in production mode**
    ```bash
    npm start
    ```

---

## 🔗 API Endpoints

The base URL for all endpoints is `http://localhost:5000`.

### Authentication

| Method | Endpoint          | Description                     | Auth Required | Request Body Example                                                                 |
|--------|-------------------|---------------------------------|---------------|--------------------------------------------------------------------------------------|
| `POST` | `/api/auth/register` | Register a new user             | No            | `{ "name": "John Doe", "email": "john@example.com", "password": "password123", "phoneNumber": "+1234567890" }` |
| `POST` | `/api/auth/login`    | Log in an existing user         | No            | `{ "email": "john@example.com", "password": "password123" }`                          |

### User Profile

| Method | Endpoint          | Description                     | Auth Required | Request Body Example                                                                 |
|--------|-------------------|---------------------------------|---------------|--------------------------------------------------------------------------------------|
| `GET`  | `/api/user/profile`  | Get the logged-in user's profile| Yes           | None                                                                                 |
| `PUT`  | `/api/user/profile`  | Update the user's profile       | Yes           | `{ "name": "John Smith", "phoneNumber": "+0987654321" }`                             |

### Course Management

| Method | Endpoint                 | Description                       | Auth Required | Request Body Example                                                                 |
|--------|--------------------------|-----------------------------------|---------------|--------------------------------------------------------------------------------------|
| `POST` | `/api/courses`           | Create a new course               | Yes           | `{ "title": "Node.js Basics", "description": "Learn Node.js from scratch", "price": 49.99, "duration": "20h", "category": "Backend", "instructorName": "John Doe" }` |
| `GET`  | `/api/courses`           | Get all courses                    | Yes           | None                                                                                 |
| `GET`  | `/api/courses/:id`       | Get a single course by ID          | Yes           | None                                                                                 |
| `PUT`  | `/api/courses/:id`       | Update a course by ID              | Yes           | `{ "price": 39.99 }`                                                                 |
| `DELETE`| `/api/courses/:id`      | Delete a course by ID              | Yes           | None                                                                                 |

**To access protected endpoints, include the following header in your request:**
`Authorization: Bearer <your_jwt_token>`

## 📁 Project Structure

```
course-management-api/
├── src/
│   ├── config/
│   │   ├── database.js           # MongoDB connection
│   │   └── jwt.js                # Centralized config loader (env, ports, secrets)
│   ├── controllers/
│   │   ├── authController.js    # Request handling for auth endpoints
│   │   ├── userController.js    # Request handling for user endpoints
│   │   └── courseController.js  # Request handling for course endpoints
│   ├── middlewares/
│   │   ├── auth.js    # JWT verification & role checks
│   │   ├── validate.js# Request validation handler
│   │   └── error.js   # Centralized error formatting
│   ├── models/
│   │   ├── user.model.js         # Mongoose schema & model for User
│   │   └── course.model.js       # Mongoose schema & model for Course
│   ├── routes/
│   │   ├── auth.routes.js        # /api/auth
│   │   ├── user.routes.js        # /api/user
│   │   └── course.routes.js      # /api/courses
│   ├── utils/
│   │   ├── generateToken.js      # Token Generator utility
│   │   └── responseHandler.js    # Standardized API response utility
├── .env                          # Environment variables (DO NOT COMMIT)
├── .env.example                  # Example environment variables
├── .gitignore                    # Files and directories to ignore
├── package-lock.json             # JSON Package lock file
├── package.json                  # Project dependencies and scripts
├── README.md                     # This file
└── server.js                     # Server entry point and Express app setup
```

---

## 🔮 Future Enhancements

- Implement user roles (Admin, Instructor, Student)
- Add course enrollment functionality
- Integrate a payment gateway (e.g., Stripe)
- Implement a course review and rating system
- Add file upload for course images
- Implement pagination for course listings
- Add API documentation with Swagger/OpenAPI

---

## 👨‍💻 Author

**Pankaj Bepari**
- [GitHub Profile](https://github.com/pankaj72885)
- [LinkedIn Profile](https://www.linkedin.com/in/pankaj-bepari-8aa69013a/)

---