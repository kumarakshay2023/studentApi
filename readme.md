Here’s a `README.md` file tailored to your project structure and features. It includes installation steps, usage, environment setup, and API routes description:

---

```markdown
# 📚 Student API

A Node.js RESTful API to manage student records and their marks, built using Express, Sequelize (PostgreSQL), and ES modules.

## 📦 Features

- Add, update, and retrieve student records
- Assign marks to a student
- Pagination support for listing students
- Centralized error handling and response structure
- Sequelize ORM for database interaction
- Uses `dotenv` for environment configuration
- Aliased paths using Node's `imports` field

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/studentapi.git
cd studentapi
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up the environment

Create a `.env` file in the root directory and configure it as follows:

```env
PORT=3003
DB_USER=postgres
DB_HOST=localhost
DB_NAME=student
DB_DIALECT=postgres
DB_PASSWORD=1234
NODE_ENV=development
```

### 4. Run the development server

```bash
npm run dev
```

---

## 📁 Project Structure

```
src/
├── configs/            # Environment and DB configs
├── controllers/        # Request handling logic
├── models/             # Sequelize models
├── routes/             # Express routers
├── utils/              # Utility functions (like sendResponse)
└── index.js            # Server entry point
```

---

## 📌 API Endpoints

### Students

| Method | Endpoint              | Description                    |
|--------|-----------------------|--------------------------------|
| POST   | `/api/students`       | Create a new student           |
| PUT    | `/api/students/:id`   | Update student by ID           |
| GET    | `/api/students/:id`   | Get student details by ID      |
| GET    | `/api/students`       | Get all students (paginated)   |
| POST   | `/api/students/mark/:id` | Add marks for a student    |

---

## 🛠 Tech Stack

- **Node.js** + **Express.js**
- **PostgreSQL** + **Sequelize**
- **ES Modules**
- **http-status**, **dotenv**, **chalk**, **nodemon**

---

## 🧪 Future Improvements

- Swagger API documentation
- Authentication & role-based access

---

## 👨‍💻 Author

Developed by Akshay kumar

---

