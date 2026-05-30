# Vehicle Rental System API

Live URL: [Vehicle Rental System](https://vehicle-rental-system-three-nu.vercel.app)

## Features

- User Registration & Login
- JWT Authentication
- Vehicle Management
- Booking Management
- Availability Tracking
- PostgreSQL Database
- RESTful API

## Technology Stack

- Node.js
- Express.js
- TypeScript
- PostgreSQL
- JWT
- Vercel
## API Endpoints

### Auth

POST /api/v1/auth/signup
POST /api/v1/auth/signin

### Users
GET	/api/v1/users
POST /api/v1/users
PUT	/api/v1/users/:userId
DELETE	/api/v1/users/:userId

### Vehicles

GET	/api/v1/vehicles
POST	/api/v1/vehicles
PUT	/api/v1/vehicles/:vehicleId
DELETE	/api/v1/vehicles/:vehicleId

### Bookings

GET /api/v1/bookings
POST /api/v1/bookings
PUT	/api/v1/bookings/:bookingId
## Setup & Usage Instructions

### Clone Repository

```bash
git clone https://github.com/smahmud10/Vehicle-Rental-System.git
cd Vehicle-Rental-System
```

### Install Dependencies

```bash
npm install
```

### Environment Variables

Create a `.env` file and add:

```env
DATABASE_URL=your_database_url
JWT_SECRET=your_secret_key
PORT=5000
```

### Run Development Server

```bash
npm run dev
```

### Build Project

```bash
npm run build
```

### Run Production Server

```bash
npm start
```
