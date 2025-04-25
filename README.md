# Indigitall Test API

This is a RESTful API built with Node.js and Express for user management. It includes functions such as creating, updating, deleting and listing users, along with Swagger documentation for easy API exploration.

## 📑 Table of Contents
- [Features](#features)  
- [Prerequisites](#prerequisites)  
- [Getting Started](#getting-started)  
- [Running the Application](#running-the-application)  
- [API Documentation](#api-documentation)  
- [Project Structure](#project-structure)  
- [Scripts](#scripts)  
- [Dependencies](#dependencies)  
  - [Main Dependencies](#main-dependencies) 
  - [Dev Dependencies](#dev-dependencies)  
- [Logging](#logging)  
- [License](#license)  
- [Contact](#contact)  

---

## 🚀 Features

- **User Management**: Create, update, delete, and retrieve users  
- **SQLite Database**: Lightweight database for persistent storage  
- **GeoIP Integration**: Extracts user location based on IP address  
- **Swagger Documentation**: Interactive API docs at `/api-docs`  
- **Environment Configuration**: Uses `.env` for environment-specific variables  
- **Logging**: Winston for structured logging  

---

## 🛠️ Prerequisites

Before you begin, ensure you have:

- Node.js (v18 or higher)  
- npm (comes with Node.js)  
- Git  

---

## 🏁 Getting Started

```bash
# 1. Clone the repository
git clone https://github.com/miangelortiz/indigitall_test.git
cd indigitall_test

# 2. Install dependencies
npm install

# 3. Configure environment
cp .env.example .env
# then edit `.env`:
# NODE_ENV="development"
# LOG_LEVEL="debug"
# PORT="3000"
# DATABASE_PATH="./data/database.db"

# 4. Initialize the database
npm run create-db
```

---

## ⏯️ Running the Application

```bash
# Development with auto-reload
npm run dev

# Production
npm start
```

---

## 📚 API Documentation

Once the application is running, access Swagger UI at:

```
http://localhost:3000/api-docs
```

---

## 🗂️ Project Structure

```text
├── bin
│   └── www                  # Server entrypoint
├── data
│   └── database.db          # SQLite database file
├── logs
│   ├── combined.log         # All application logs
│   └── error.log            # Error-specific logs
├── node_modules             # npm dependencies
├── src
│   ├── app.js               # Express app setup
│   ├── config               # Config files (swagger, logger, etc.)
│   ├── controllers          # Route handlers / business logic
│   ├── dao                  # Data access layer
│   ├── docs                 # Swagger docs definitions
│   ├── lib                  # Database connection & utilities
│   ├── middlewares          # Express middleware functions
│   ├── routes               # API route definitions
│   ├── services             # External service integrations
│   ├── sql                  # SQL scripts (schema, migrations)
│   └── utils                # Helper functions & utilities
├── .env                     # Environment variables (ignored)
├── .env.example             # Template for environment variables—copy to `.env`
├── .gitignore               # Files/folders to ignore in Git
├── package.json             # Project metadata & npm scripts
└── README.md                # Project overview & instructions
```

---

## 📜 Scripts

| Script              | Description                                |
| ------------------- | ------------------------------------------ |
| `npm start`         | Run in production mode                     |
| `npm run dev`       | Run in development mode with file watching |
| `npm run create-db` | Initialize the database schema             |

---

## 📦 Dependencies

### Main Dependencies

- **bcrypt**: Library for hashing passwords (~5.1.1)  
- **debug**: Debugging utility (~4.4.0)  
- **dotenv**: Loads environment variables from `.env` files (~16.5.0)  
- **express**: Web framework for building APIs (~5.1.0)  
- **geoip-lite**: IP-based geolocation library (~1.4.10)  
- **http-errors**: Create HTTP errors (~2.0.0)  
- **morgan**: HTTP request logger middleware (~1.10.0)  
- **sqlite**: SQLite library for database operations (~5.1.1)  
- **sqlite3**: SQLite database driver (~5.1.7)  
- **swagger-jsdoc**: Generate Swagger documentation from JSDoc (~6.2.8)  
- **swagger-ui-express**: Serve Swagger UI for API documentation (~5.0.1)  
- **winston**: Logging library (~3.17.0)  

### Dev Dependencies

- **standard**: JavaScript linter (~17.1.2)  

---

## 📝 Logging

Uses Winston. Logs output to console and `logs/` directory.  

---

## ⚖️ License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.  

---

## 📬 Contact

- **Email**: maortizolid@gmail.com  
- **GitHub**: [miangelortiz](https://github.com/miangelortiz)  