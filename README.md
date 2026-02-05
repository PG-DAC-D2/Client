# E-Commerce Web Application (Client)

## Project Overview
This is an **E-Commerce Web Application** built using **microservices architecture**.

- Frontend: React  
- Backend: Multiple microservices  
- Databases: MongoDB and MySQL  

The frontend (Client) connects to backend services available in a separate repository.

---

## Repositories

- **Frontend (Client)**  
  https://github.com/PG-DAC-D2/Client  

- **Backend (Server)**  
  https://github.com/PG-DAC-D2/Server  

---

## Backend Services (Server)

### User Service (Spring Boot + MySQL)
- User registration and login  
- Roles: Customer, Merchant, Admin  
- JWT authentication  

### Product Service (Node.js + MongoDB)
- Add, update, delete products  
- View product list  
- Wishlist management  

### Order & Payment Service (.NET + MySQL)
- Place orders  
- Track order status  
- Handle payments  

Each service works independently and exposes REST APIs.

---

## Frontend (Client)

- Built using React
- Uses REST APIs to connect with backend services
- Features:
  - User login and signup
  - Product listing
  - Wishlist
  - Order placement

---

## Client–Server Connection

The frontend communicates with backend using HTTP requests.

Example service URLs:
- User Service: `http://localhost:8080`
- Product Service: `http://localhost:5000`
- Order Service: `http://localhost:7000`

JWT token is used for secure communication.

---

## Tech Stack

| Layer | Technology |
|------|------------|
| Frontend | React, HTML, CSS, JavaScript |
| Backend | Node.js, Spring Boot, .NET |
| Database | MongoDB, MySQL |
| Security | JWT |
| Architecture | Microservices |

---

## Sample Data

### Users
- Customer
- Merchant
- Admin

### Products
- Product ID
- Name
- Price
- Category
- Stock
- Description

### Orders
- Order ID
- User ID
- Products
- Total Amount
- Status

---

## How to Run Client

```bash
npm install
npm start
