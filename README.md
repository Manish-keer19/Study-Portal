# Study Portal

## Overview
Study Portal is an online platform developed by **Manish Keer** where users can register as **Admin**, **Instructor**, or **Student**. The platform allows instructors to create courses, students to enroll in them, and admins to manage users and courses.

## Features
- **Admin Panel:** Manage users, courses, and platform settings.
- **Instructor Dashboard:** Create and manage courses, view enrolled students.
- **Student Dashboard:** Browse courses, enroll in courses, and track progress.
- **Authentication:** Secure login system (JWT-based authentication).
- **Course Management:** Add, edit, and delete courses.
- **Enrollment System:** Students can enroll in courses.
- **Responsive UI:** Works on desktop and mobile.

## Tech Stack
- **Frontend:** React / React Native
- **Backend:** Node.js (Express) / Spring Boot
- **Database:** MongoDB / MySQL
- **Authentication:** JWT / OAuth

## Installation

### Backend Setup (Node.js with Express.js)
```sh
# Clone the repository
git clone https://github.com/your-repo/study-portal.git
cd study-portal/backend

# Install dependencies
npm install

# Setup environment variables (create .env file)
PORT=5000
DB_URI=mongodb://localhost:27017/study-portal
JWT_SECRET=your_jwt_secret

# Run the backend server
npm start
```

### Frontend Setup (React)
```sh
cd ../frontend

# Install dependencies
npm install

# Run the frontend app
npm start
```

## API Endpoints
### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login
- `POST /api/auth/logout` - Logout

### Admin Routes
- `GET /api/admin/users` - Get all users
- `DELETE /api/admin/user/:id` - Delete a user

### Instructor Routes
- `POST /api/instructor/course` - Create a course
- `GET /api/instructor/courses` - Get instructor's courses

### Student Routes
- `GET /api/courses` - Get all courses
- `POST /api/course/enroll/:id` - Enroll in a course
- `GET /api/student/courses` - Get enrolled courses

## License
This project is licensed under the MIT License.

---
Developed by **Manish Keer**. Feel free to contribute and improve this project!