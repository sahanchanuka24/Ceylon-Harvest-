# Vegetable Shop Inventory Management System

This is a full-stack application for managing a vegetable shop's inventory. It allows administrators to add, edit, delete, and view products with their images and prices.

## Features

- Add new products with images
- Edit existing products
- Delete products
- View all products in a grid layout
- Responsive design
- Image upload functionality

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create an 'uploads' directory in the backend folder:
   ```bash
   mkdir uploads
   ```

4. Start the backend server:
   ```bash
   npm run dev
   ```

The backend server will run on http://localhost:5000

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the frontend development server:
   ```bash
   npm start
   ```

The frontend application will run on http://localhost:3000

## Usage

1. Open your browser and navigate to http://localhost:3000
2. Click the "Add Product" button to add a new product
3. Fill in the product details:
   - Product name
   - Price (in LKR per 100g)
   - Upload an image
4. Click "Add" to save the product
5. Use the edit and delete icons to modify or remove existing products

## Technologies Used

- Backend:
  - Node.js
  - Express.js
  - MongoDB
  - Multer (for file uploads)

- Frontend:
  - React
  - Material-UI
  - Axios 