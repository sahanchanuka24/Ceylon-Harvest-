# Plant Disease Diagnosis Application

This is a full-stack application for diagnosing plant diseases using image recognition. The application consists of a React frontend and Node.js/Express backend.

## Project Structure

```
plant-disease-app/
├── backend/
│   ├── models/
│   │   └── Plant.js
│   ├── routes/
│   │   └── plantRoutes.js
│   ├── middleware/
│   │   └── upload.js
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── PlantDiagnosis.js
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
└── README.md
```

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Setup Instructions

1. Clone the repository
2. Install backend dependencies:
   ```bash
   cd backend
   npm install
   ```
3. Install frontend dependencies:
   ```bash
   cd frontend
   npm install
   ```

## Running the Application

1. Start the backend server:
   ```bash
   cd backend
   npm run dev
   ```

2. Start the frontend development server:
   ```bash
   cd frontend
   npm start
   ```

The application will be available at http://localhost:3000

## Features

- Upload plant images for disease diagnosis
- View diagnosis results
- Store diagnosis history
- RESTful API endpoints for plant disease data

## Technologies Used

- Frontend: React, Axios
- Backend: Node.js, Express, MongoDB
- Image Upload: Multer
- Database: MongoDB with Mongoose 