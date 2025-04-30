# Ceylon Harvest Backend API

This is the backend API for the Ceylon Harvest application.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory with the following variables:
```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
NODE_ENV=development
```

3. Run the development server:
```bash
npm run dev
```

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
  - Body: `{ "name": "string", "email": "string", "password": "string" }`

- `POST /api/auth/login` - Login user
  - Body: `{ "email": "string", "password": "string" }`

- `GET /api/auth/me` - Get current user
  - Headers: `Authorization: Bearer <token>`

### Users

- `GET /api/users` - Get all users (Admin only)
  - Headers: `Authorization: Bearer <token>`

- `GET /api/users/:id` - Get single user
  - Headers: `Authorization: Bearer <token>`

- `PUT /api/users/:id` - Update user
  - Headers: `Authorization: Bearer <token>`
  - Body: `{ "name": "string", "email": "string" }`

- `DELETE /api/users/:id` - Delete user
  - Headers: `Authorization: Bearer <token>`

## Error Handling

The API uses a consistent error response format:

```json
{
  "success": false,
  "error": "Error message"
}
```

## Authentication

All protected routes require a JWT token in the Authorization header:
```
Authorization: Bearer <token>
``` 