# UMT Backend API

A backend REST API service built with Express.js and Prisma for managing bouquets (products), orders, and feedback. This project uses PostgreSQL as the database and Cloudinary for image storage.

## Table of Contents

- [Project Overview](#project-overview)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Database Setup](#database-setup)
- [Environment Variables](#environment-variables)
- [Running the Server](#running-the-server)
- [API Routes](#api-routes)
- [API Documentation](#api-documentation)

## Project Overview

This is a production-ready backend API that provides:

- **Bouquet Management**: Create, read, update, and delete bouquets (flower arrangements) with image uploads
- **Order Management**: Handle customer orders with product references
- **Feedback System**: Manage customer reviews and ratings
- **Pagination**: Efficient product listing with pagination support
- **Image Storage**: Integration with Cloudinary for image hosting
- **Data Validation**: Input validation using Joi
- **Error Handling**: Comprehensive error handling with custom HTTP status codes

## Project Structure

```
.
├── app.js                    # Express application setup
├── server.js                 # Server initialization and Prisma connection
├── package.json              # Project dependencies
├── docker-compose.yml        # Docker configuration for PostgreSQL
├── .env.example             # Environment variables template
├── swagger.json             # API documentation (OpenAPI 3.0)
│
├── config/                  # Configuration files
│   └── cloudinary.js        # Cloudinary setup
│
├── constants/               # Application constants
│   ├── categories.js        # Product categories
│   ├── httpStatus.js        # HTTP status codes
│   └── messages.js          # API response messages
│
├── controllers/             # Route controllers
│   ├── bouquetController.js # Bouquet-related logic
│   ├── feedbackController.js # Feedback-related logic
│   ├── orderController.js   # Order-related logic
│   └── index.js            # Controller exports
│
├── middlewares/             # Express middlewares
│   ├── errorHandler.js      # Global error handler
│   ├── multerUpload.js      # File upload middleware
│   └── notFound.js         # 404 handler
│
├── models/                  # Data access layer
│   ├── bouquetModel.js      # Bouquet database queries
│   ├── feedbackModel.js     # Feedback database queries
│   └── orderModel.js        # Order database queries
│
├── routes/                  # API routes
│   └── api/
│       ├── bouquetRouter.js # /api/bouquets routes
│       ├── feedbackRouter.js # /api/feedbacks routes
│       ├── orderRouter.js   # /api/orders routes
│       └── index.js         # Route aggregation
│
├── schemas/                 # Joi validation schemas
│   ├── bouquetSchema.js     # Bouquet validation
│   ├── feedbackSchema.js    # Feedback validation
│   ├── orderSchema.js       # Order validation
│   ├── idParamSchema.js     # ID parameter validation
│   └── index.js            # Schema exports
│
├── helpers/                 # Utility functions
│   ├── asyncHandler.js      # Async/await error wrapper
│   ├── cloudinaryStorage.js # Image upload/delete logic
│   ├── createRouter.js      # Dynamic router creation
│   ├── error.js            # Custom error class
│   ├── formatJoiError.js    # Joi error formatting
│   ├── pagination.js        # Pagination helpers
│   ├── prisma.js           # Prisma client instance
│   ├── validateBody.js      # Request body validation
│   ├── validateParams.js    # URL parameter validation
│   └── validateQuery.js     # Query parameter validation
│
└── prisma/                  # Prisma ORM configuration
    ├── schema.prisma        # Database schema
    ├── migrations/          # Database migrations
    └── seed/                # Database seed scripts
        ├── index.js
        ├── bouquet.js
        ├── feedback.js
        └── order.js
```

## Prerequisites

- **Node.js**: v18 or higher
- **Docker**: For running PostgreSQL locally
- **Docker Compose**: For managing containers
- **npm**: Node package manager

## Installation

### 1. Clone the repository

```bash
git clone <repository-url>
cd UMT-backend-practice-Kosobutskyi
```

### 2. Install dependencies

```bash
npm install
```

### 3. Generate Prisma Client

```bash
npm run build
```

## Database Setup

### Start PostgreSQL with Docker

1. Ensure Docker and Docker Compose are installed and running.

2. Start the PostgreSQL database container:

```bash
npm run db:up
```

This command will:

- Create and start a PostgreSQL 18 container
- Set up the database named `umt_backend`
- Default credentials: username `umt`, password `umt`
- Database runs on port `5433`

3. Verify the database is running:

```bash
npm run db:logs
```

### Run Database Migrations

```bash
npx prisma migrate deploy
```

### Populate the Database (Seeding)

To populate the database with sample data:

```bash
npm run seed
```

This command will:

- Clear existing data
- Create sample bouquets
- Create sample feedback entries
- Create sample orders

### Stop the Database

```bash
npm run db:down
```

## Environment Variables

Create a `.env` file in the root directory based on `.env.example`:

```env
# Server configuration
PORT=3001
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000

# Database configuration
DATABASE_URL="postgresql://umt:umt@localhost:5433/umt_backend?schema=public"

# Cloudinary configuration (for image storage)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
CLOUDINARY_FOLDER=bouquets
```

### Environment Variables Explanation

- **PORT**: The port on which the server runs (default: 3001)
- **NODE_ENV**: Environment mode (development or production)
- **CORS_ORIGIN**: Allowed origin for CORS requests (comma-separated for multiple)
- **DATABASE_URL**: PostgreSQL connection string
- **CLOUDINARY_CLOUD_NAME**: Your Cloudinary account cloud name
- **CLOUDINARY_API_KEY**: Your Cloudinary API key
- **CLOUDINARY_API_SECRET**: Your Cloudinary API secret
- **CLOUDINARY_FOLDER**: Folder name in Cloudinary for storing images

To get Cloudinary credentials:

1. Sign up at [cloudinary.com](https://cloudinary.com)
2. Go to Dashboard to find your Cloud Name, API Key, and API Secret
3. Add these values to your `.env` file

## Running the Server

### Development Mode (with auto-reload)

```bash
npm run dev
```

The server will start and automatically restart when you make changes.

### Production Mode

```bash
npm start
```

### Expected Output

```
Server is running on port 3001
Swagger UI: http://localhost:3001/api-docs
```

## API Routes

### Base URL

```
http://localhost:3001/api
```

### Health Check

- **GET** `/health` - Server health status
  - Response: `{ "status": "ok" }`

### Bouquets (Products)

| Method | Route           | Description                    |
| ------ | --------------- | ------------------------------ |
| GET    | `/bouquets`     | Get paginated list of bouquets |
| GET    | `/bouquets/:id` | Get a specific bouquet by ID   |
| POST   | `/bouquets`     | Create a new bouquet           |
| PATCH  | `/bouquets/:id` | Update a bouquet               |
| DELETE | `/bouquets/:id` | Delete a bouquet               |

#### GET `/bouquets` - List Bouquets

Query Parameters:

- `page` (number): Page number, default: 1
- `per-page` (number): Items per page, default: 12, max: 100
- `category` (string): Filter by category (`standart` or `top`)

Example:

```bash
GET /api/bouquets?page=1&per-page=12&category=top
```

Response:

```json
{
  "data": [
    {
      "id": "1",
      "img": "https://cloudinary.com/...",
      "title": "Midnight Garden",
      "desc": "A spellbinding bouquet...",
      "price": "98",
      "category": "top"
    }
  ],
  "meta": {
    "first": 1,
    "prev": null,
    "next": 2,
    "last": 5,
    "pages": 5,
    "items": 50
  }
}
```

#### GET `/bouquets/:id` - Get Single Bouquet

Example:

```bash
GET /api/bouquets/1
```

Response:

```json
{
  "id": "1",
  "img": "https://cloudinary.com/...",
  "title": "Midnight Garden",
  "desc": "A spellbinding bouquet...",
  "price": "98",
  "category": "top"
}
```

#### POST `/bouquets` - Create Bouquet

Content-Type: `multipart/form-data`

Required Fields:

- `picture` (file): Image file (max 6 MB)
- `title` (string): Bouquet name (2-200 characters)
- `desc` (string): Description (10-1000 characters)
- `price` (string): Price (1-20 characters)
- `category` (string): Category (`standart` or `top`)

Example using cURL:

```bash
curl -X POST http://localhost:3001/api/bouquets \
  -F "picture=@image.jpg" \
  -F "title=Beautiful Rose Bouquet" \
  -F "desc=A stunning arrangement of red roses" \
  -F "price=150" \
  -F "category=top"
```

#### PATCH `/bouquets/:id` - Update Bouquet

Content-Type: `multipart/form-data` (if updating image) or `application/json`

Optional Fields: Any of `title`, `desc`, `price`, `category`, or `picture`

Example:

```bash
curl -X PATCH http://localhost:3001/api/bouquets/1 \
  -F "title=Updated Title" \
  -F "price=200"
```

#### DELETE `/bouquets/:id` - Delete Bouquet

Example:

```bash
curl -X DELETE http://localhost:3001/api/bouquets/1
```

### Feedback (Reviews)

| Method | Route            | Description              |
| ------ | ---------------- | ------------------------ |
| GET    | `/feedbacks`     | Get all feedback entries |
| GET    | `/feedbacks/:id` | Get a specific feedback  |
| POST   | `/feedbacks`     | Create new feedback      |
| PATCH  | `/feedbacks/:id` | Update feedback          |
| DELETE | `/feedbacks/:id` | Delete feedback          |

#### POST `/feedbacks` - Create Feedback

Content-Type: `application/json`

Required Fields:

- `text` (string): Feedback text (10-2000 characters)
- `author` (string): Author name (2-100 characters)

Example:

```bash
curl -X POST http://localhost:3001/api/feedbacks \
  -H "Content-Type: application/json" \
  -d '{
    "text": "Amazing flowers and fast delivery!",
    "author": "John Doe"
  }'
```

#### PATCH `/feedbacks/:id` - Update Feedback

Optional Fields: `text` or `author`

Example:

```bash
curl -X PATCH http://localhost:3001/api/feedbacks/1 \
  -H "Content-Type: application/json" \
  -d '{
    "text": "Updated feedback text"
  }'
```

### Orders

| Method | Route         | Description          |
| ------ | ------------- | -------------------- |
| GET    | `/orders`     | Get all orders       |
| GET    | `/orders/:id` | Get a specific order |
| POST   | `/orders`     | Create new order     |
| PATCH  | `/orders/:id` | Update order         |
| DELETE | `/orders/:id` | Delete order         |

#### POST `/orders` - Create Order

Content-Type: `application/json`

Required Fields:

- `name` (string): Customer name (2-100 characters)
- `phone` (string): Phone number (10-30 characters)
- `address` (string): Delivery address (5-200 characters)

Optional Fields:

- `comment` (string): Order comment (max 500 characters), default: ""
- `productId` (number | null): Product ID if ordering specific bouquet, default: null

Example:

```bash
curl -X POST http://localhost:3001/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Smith",
    "phone": "+1234567890",
    "address": "123 Main St, City, State 12345",
    "comment": "Please deliver in the morning",
    "productId": 1
  }'
```

#### PATCH `/orders/:id` - Update Order

Optional Fields: `name`, `phone`, `address`, `comment`, `productId`

Example:

```bash
curl -X PATCH http://localhost:3001/api/orders/1 \
  -H "Content-Type: application/json" \
  -d '{
    "address": "456 Oak Ave, New City, State 67890"
  }'
```

## API Documentation

### Swagger UI

Interactive API documentation is available at:

```
http://localhost:3001/api-docs
```

Open this URL in your browser to:

- View all available endpoints
- See request/response examples
- Try out API calls directly
- Review parameter and schema definitions

### OpenAPI Specification

The complete OpenAPI 3.0 specification is available in `swagger.json`.

## Error Handling

All endpoints return appropriate HTTP status codes and error messages:

- **200 OK**: Successful GET request
- **201 Created**: Successful resource creation
- **204 No Content**: Successful deletion
- **400 Bad Request**: Validation error or invalid input
- **404 Not Found**: Resource not found
- **500 Internal Server Error**: Server error

Error Response Format:

```json
{
  "status": 400,
  "message": "Validation error description",
  "details": {
    "field": "error details"
  }
}
```

## Common Issues

### Database Connection Error

If you get `ECONNREFUSED` error:

1. Ensure Docker is running: `docker ps`
2. Start the database: `npm run db:up`
3. Check DATABASE_URL in .env file

### Image Upload Error

If image uploads fail:

1. Check Cloudinary credentials in .env
2. Verify file size is less than 6 MB
3. Ensure the file is a valid image format

### Port Already in Use

If port 3001 is already in use:

1. Change the PORT in .env file
2. Or kill the process using the port

## Development

### Generate Prisma Client

After modifying `schema.prisma`:

```bash
npm run build
```

### Create a New Migration

After modifying the schema:

```bash
npx prisma migrate dev --name migration_name
```

### Reset Database

To reset the database and reseed:

```bash
npx prisma migrate reset
```

## Technologies Used

- **Express.js** - Web framework
- **Prisma** - ORM
- **PostgreSQL** - Database
- **Cloudinary** - Image storage
- **Joi** - Data validation
- **Multer** - File upload handling
- **Morgan** - HTTP logger
- **Swagger UI** - API documentation
- **Docker** - Database containerization

## License

ISC
