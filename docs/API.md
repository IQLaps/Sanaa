# Sanaa E-commerce Platform

## Backend API Documentation

### Base URL
```
http://localhost:5000/api/v1
```

## Endpoints

### Authentication
- `POST /auth/register` - Register a new user
- `POST /auth/login` - Login user
- `POST /auth/logout` - Logout user
- `POST /auth/refresh` - Refresh access token

### Products
- `GET /products` - Get all products
- `GET /products/:id` - Get product details
- `POST /products` - Create product (Admin only)
- `PUT /products/:id` - Update product (Admin only)
- `DELETE /products/:id` - Delete product (Admin only)

### Categories
- `GET /categories` - Get all categories
- `GET /categories/:id` - Get category details
- `POST /categories` - Create category (Admin only)
- `PUT /categories/:id` - Update category (Admin only)
- `DELETE /categories/:id` - Delete category (Admin only)

### Cart
- `GET /cart` - Get user's cart
- `POST /cart` - Add item to cart
- `PUT /cart/:itemId` - Update cart item
- `DELETE /cart/:itemId` - Remove item from cart

### Orders
- `GET /orders` - Get user's orders
- `GET /orders/:id` - Get order details
- `POST /orders` - Create order
- `PUT /orders/:id/cancel` - Cancel order

### Users
- `GET /users/profile` - Get user profile
- `PUT /users/profile` - Update user profile
- `GET /users` - Get all users (Admin only)

### Admin
- `GET /admin/dashboard` - Dashboard analytics
- `GET /admin/inventory` - Inventory management
- `GET /admin/sales` - Sales reports

## Response Format

### Success Response
```json
{
  "success": true,
  "data": {},
  "message": "Success message"
}
```

### Error Response
```json
{
  "success": false,
  "error": "Error message",
  "statusCode": 400
}
```

## Authentication

All protected endpoints require a Bearer token in the Authorization header:
```
Authorization: Bearer <your_token>
```

## Status Codes

- `200` - OK
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error
