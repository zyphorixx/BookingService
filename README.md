BookingService – Airline Management System

BookingService is one of the core microservices in the Airline Management System.
It handles flight bookings, seat validation, booking status updates, and prepares workflow for integrating payments.

⸻

1. Overview

BookingService is responsible for:
	•	Creating flight bookings
	•	Validating seats through FlightService
	•	Locking seats before booking confirmation
	•	Managing booking lifecycle (Pending → Booked → Cancelled)
	•	Providing APIs for interacting with other microservices
	•	Ensuring proper error handling and structured responses

⸻

2. Features
	•	Create a new booking
	•	Fetch booking details
	•	Cancel existing booking
	•	Status-based booking workflow
	•	Follows clean MVC + Service + Repository architecture
	•	Fully supports microservice communication
	•	Custom error-handling layer implemented

⸻

3. Technologies Used
	•	Node.js
	•	Express.js
	•	Sequelize ORM
	•	MySQL / PostgreSQL
	•	JWT-based communication (optional)
	•	Docker-ready architecture


4. Project Structure

```code
BookingService/
│
├── src/
│   ├── config/          # Environment and server configs
│   ├── controllers/     # Request controllers
│   ├── routes/          # API routes
│   ├── services/        # Business logic
│   ├── repository/      # Database queries
│   ├── models/          # Sequelize models
│   └── utils/           # Helper functions & error classes
│
├── package.json
└── README.md
```


⸻

5. API Endpoints

POST /bookings

Create a new booking.

GET /bookings/:id

Retrieve booking details by ID.

PATCH /bookings/:id/cancel

Cancel a booking.

⸻

6. Setup Instructions

Step 1 — Install Dependencies

- `npm install`

Step 2 — Create .env File

```code
PORT=3002
DB_HOST=localhost
DB_USER=root
DB_PASS=yourpassword
DB_NAME=booking_service
```

Step 3 — Start the Server

- `npm start`




