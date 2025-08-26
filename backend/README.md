# Store Rating Backend API

A robust RESTful API backend for the Store Rating website built with Express.js and MongoDB.

## 🚀 Features

- **User Authentication & Authorization**
  - JWT-based authentication
  - User registration and login
  - Role-based access control (User/Admin)
  - Password hashing with bcrypt

- **Store Management**
  - CRUD operations for stores
  - Store categories and filtering
  - Search functionality
  - Geographic coordinates support
  - Store hours and contact information

- **Rating System**
  - 1-5 star rating system
  - Review text support
  - Rating helpfulness tracking
  - Anonymous rating option
  - Rating statistics and distribution

- **Advanced Features**
  - Pagination and sorting
  - Input validation and sanitization
  - Rate limiting
  - CORS support
  - Security headers with Helmet
  - Comprehensive error handling

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcryptjs
- **Validation**: express-validator
- **Security**: Helmet, CORS, Rate Limiting

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

## 🚀 Installation

1. **Clone the repository and navigate to backend folder**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   ```bash
   # Copy the example environment file
   cp env.example .env
   
   # Edit .env with your configuration
   nano .env
   ```

4. **Configure your .env file**
   ```env
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:27017/store_rating_db
   JWT_SECRET=your-super-secret-jwt-key-here
   JWT_EXPIRE=7d
   ```

## 🗄️ Database Setup

### Local MongoDB
1. Install MongoDB locally
2. Start MongoDB service
3. Create database: `store_rating_db`

### MongoDB Atlas (Cloud)
1. Create account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a new cluster
3. Get connection string
4. Update `MONGODB_URI` in `.env`

## 🌱 Database Seeding

Populate the database with sample data:

```bash
npm run seed
```

This will create:
- 3 sample users (1 admin, 2 regular users)
- 5 sample stores across different categories
- 10 sample ratings

**Default Admin Account:**
- Email: `john@example.com`
- Password: `Password123`

## 🚀 Running the Application

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

The server will start on `http://localhost:5000` (or your configured PORT).

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user profile
- `PUT /api/auth/profile` - Update user profile
- `POST /api/auth/change-password` - Change password
- `POST /api/auth/logout` - User logout

### Stores
- `GET /api/stores` - Get all stores (with filtering, search, pagination)
- `GET /api/stores/categories` - Get all store categories
- `GET /api/stores/:id` - Get single store
- `POST /api/stores` - Create new store
- `PUT /api/stores/:id` - Update store
- `DELETE /api/stores/:id` - Delete store (soft delete)
- `GET /api/stores/:id/ratings` - Get store ratings

### Ratings
- `POST /api/ratings` - Submit rating
- `PUT /api/ratings/:id` - Update rating
- `DELETE /api/ratings/:id` - Delete rating
- `GET /api/ratings/user` - Get user's ratings
- `GET /api/ratings/:id` - Get specific rating
- `POST /api/ratings/:id/helpful` - Mark rating as helpful
- `DELETE /api/ratings/:id/helpful` - Unmark rating as helpful

### Users
- `GET /api/users` - Get all users (Admin only)
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user (Admin only)
- `GET /api/users/:id/ratings` - Get user's ratings
- `GET /api/users/stats/overview` - Get user statistics (Admin only)

### Health Check
- `GET /api/health` - API health status

## 🔐 Authentication

Most endpoints require authentication. Include the JWT token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

## 📊 Request/Response Examples

### User Registration
```bash
POST /api/auth/register
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "Password123"
}
```

### Store Creation
```bash
POST /api/stores
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "My Store",
  "description": "A great store",
  "category": "Electronics",
  "address": {
    "street": "123 Main St",
    "city": "New York",
    "state": "NY",
    "zipCode": "10001"
  }
}
```

### Rating Submission
```bash
POST /api/ratings
Authorization: Bearer <token>
Content-Type: application/json

{
  "storeId": "store_id_here",
  "rating": 5,
  "review": "Excellent service!",
  "isAnonymous": false
}
```

## 🔍 Query Parameters

### Store Filtering
- `category` - Filter by store category
- `search` - Text search in store name/description
- `city` - Filter by city
- `state` - Filter by state
- `minRating` - Minimum average rating
- `maxRating` - Maximum average rating

### Pagination
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)

### Sorting
- `sortBy` - Field to sort by (default: averageRating)
- `sortOrder` - Sort order: 'asc' or 'desc' (default: desc)

## 🛡️ Security Features

- **Password Security**: bcrypt hashing with salt rounds
- **JWT Security**: Configurable expiration and secret keys
- **Input Validation**: Comprehensive request validation
- **Rate Limiting**: Prevents abuse with configurable limits
- **CORS**: Configurable cross-origin resource sharing
- **Helmet**: Security headers for protection
- **SQL Injection Protection**: MongoDB with Mongoose
- **XSS Protection**: Input sanitization and validation

## 🧪 Testing

Test the API endpoints using tools like:
- [Postman](https://www.postman.com/)
- [Insomnia](https://insomnia.rest/)
- [Thunder Client](https://www.thunderclient.com/) (VS Code extension)

## 📁 Project Structure

```
backend/
├── models/          # Database models
│   ├── User.js     # User model
│   ├── Store.js    # Store model
│   └── Rating.js   # Rating model
├── routes/          # API routes
│   ├── auth.js     # Authentication routes
│   ├── stores.js   # Store routes
│   ├── ratings.js  # Rating routes
│   └── users.js    # User routes
├── middleware/      # Custom middleware
│   ├── auth.js     # Authentication middleware
│   └── validate.js # Validation middleware
├── scripts/         # Utility scripts
│   └── seed.js     # Database seeding
├── server.js        # Main server file
├── package.json     # Dependencies and scripts
└── README.md        # This file
```

## 🚀 Deployment

### Environment Variables for Production
```env
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/store_rating_db
JWT_SECRET=very-long-random-secret-key
JWT_EXPIRE=7d
CORS_ORIGIN=https://yourdomain.com
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

### PM2 (Process Manager)
```bash
npm install -g pm2
pm2 start server.js --name "store-rating-api"
pm2 save
pm2 startup
```

### Docker (Optional)
```dockerfile
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the API documentation
- Review the error logs

## 🔄 Updates

Keep dependencies updated:
```bash
npm audit
npm update
npm audit fix
```

---

**Happy Coding! 🎉**
