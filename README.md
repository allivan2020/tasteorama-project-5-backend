# tasteorama-project-5

# Tasteorama Backend

Backend API for Tasteorama — a web application for discovering, creating, and managing recipes.

## About the Project

Tasteorama Backend provides a REST API for the Tasteorama platform. It handles user authentication, recipe management, favorites, personal recipes, image uploads, and other application functionality.

## Features

* User registration and authentication
* JWT-based authorization
* Recipe management
* Favorite recipes
* User-created recipes
* Recipe filtering and searching
* Image uploads via Cloudinary
* API validation with Joi and Celebrate
* API documentation with Swagger
* MongoDB database integration

## Technologies

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose

### Authentication & Security

* JWT (jsonwebtoken)
* bcrypt
* Helmet
* CORS
* Cookie Parser

### Validation

* Joi
* Celebrate

### File Storage

* Multer
* Cloudinary

### Documentation

* Swagger UI
* Swagger Autogen

### Development Tools

* Nodemon
* ESLint
* Prettier

---

## Installation

### Clone the repository

```bash
git clone https://github.com/allivan2020/tasteorama-project-5-backend.git

cd tasteorama-project-5-backend
```

### Install dependencies

```bash
npm install
```

---

## Environment Variables

Create a `.env` file in the root directory and add the required variables:

```env
PORT=3000

DB_USER=your_db_user
DB_PASS=your_db_password
DB_URL=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

SMTP_HOST=your_smtp_host
SMTP_PORT=your_smtp_port
SMTP_USER=your_smtp_user
SMTP_PASSWORD=your_smtp_password

APP_DOMAIN=http://localhost:3000
```

---

## Running the Project

### Development mode

```bash
npm run dev
```

### Production mode

```bash
npm start
```

---

## Available Scripts

| Command          | Description                    |
| ---------------- | ------------------------------ |
| npm run dev      | Start development server       |
| npm start        | Start production server        |
| npm run lint     | Check code style               |
| npm run lint:fix | Fix linting issues             |
| npm run swagger  | Generate Swagger documentation |

---

## API Documentation

After starting the server, Swagger documentation is available at:

```text
http://localhost:3000/api-docs
https://tasteorama-project-5-backend.onrender.com/api-docs

```

---

## Project Structure

```text
src/
├── controllers/
├── db/
├── middleware/
├── models/
├── routes/
├── services/
├── validations/
├── swagger/
├── utils/
└── server.js
```

---

## Requirements

* Node.js >= 20.6.0
* MongoDB Atlas or local MongoDB instance

---

## Repository

Backend Repository:

https://github.com/allivan2020/tasteorama-project-5-backend

---

## Team

### Backend Team

1. Oleksandr Sizov
2. Snizhana Pertushka
3. Ivan Yuschuk
4. Viktoria Babyuk
5. Ihor Yaremkevych
6. Eugene Mukhin
7. Valeriia Kravchuk
8. Viacheslav Butrim
9. Oksana Bochkor
10. Roman Yakubovskyi
11. Maksym Yaropovets
12. Anatolii Honchar

## Team  QA 

13. Marta Vitiaz
14. Olena Ihnatiuk
15. Iryna Ielkina
---

## License

This project was created for educational purposes.
