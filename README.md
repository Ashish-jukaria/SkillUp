# Course Selling Platform

A full-stack web application that enables instructors to create and sell courses while allowing students to browse and purchase them.

## Features

### For Administrators
- Admin authentication (signup/signin)
- Create new courses
- Edit existing courses
- View all published courses
- Manage course visibility (published/unpublished)

### For Users
- User authentication (signup/signin)
- Browse available courses
- Purchase courses
- Access purchased courses
- View course details (title, description, price, images)

## Tech Stack

### Frontend
- HTML/CSS
- JavaScript
- Axios for API calls

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- bcrypt for password hashing
- CORS for cross-origin requests

## API Endpoints

### Admin Routes
- POST `/admin/signup` - Register new admin
- POST `/admin/signin` - Admin login
- POST `/admin/courses` - Create new course
- PUT `/admin/courses/:courseId` - Update course
- GET `/admin/courses` - Get all courses

### User Routes
- POST `/user/signup` - Register new user
- POST `/user/signin` - User login
- GET `/user/courses` - Get available courses
- POST `/user/courses/:courseId` - Purchase course

## Installation

1. Clone the repository
2. git clone <repository-url>
2. Install dependencies
3. cd CourseSelling
npm install
3. Set up environment variables
Create a `.env` file in the root directory with:
env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

4. Start the server
5. npm start
## Project Structure
CourseSelling/
├── public/
│ ├── admin.js
│ ├── adminform.js
│ ├── sell.js
│ ├── user.js
│ ├── dashboard.css
│ ├── sell.css
│ └── userdashboard.css
├── index.js
├── db.js
├── auth.js
└── package.json


## Database Schema

### Admin Schema

{
name: String (unique),
password: String
}


### User Schema
{
name: String (unique),
password: String
}

### Course Schema
{
admin_id: String,
title: String,
description: String,
price: Number,
imageLink: String,
published: Boolean
}

## Security Features
- Password hashing using bcrypt
- JWT-based authentication
- Protected routes using middleware
- Input validation
- CORS enabled

## Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License
This project is licensed under the ISC License.

## Contact
Your Name - ashishjukaria2001@gmail.com
Project Link: [https://github.com/Ashish-jukaria/SkillUp]

