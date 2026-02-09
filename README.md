
---

# Vanilo — Sunbeam E-Commerce Platform

**Vanilo** is a microservices-based e-commerce platform designed with enterprise-grade architecture principles.
It combines a modern **React + Vite frontend** with multiple backend services (**Spring Boot, Node.js, .NET**) behind a centralized **API Gateway**.

This repository is a **monorepo** containing both **Client** and **Server** codebases.

---

## Table of Contents

* Overview
* Architecture
* Key System Flows
* Project Structure
* Quickstart (Local Setup)
* Frontend (Client)
* Backend (Services)
* Authentication & Security
* Payments & Notifications
* Tech Stack Summary
* Troubleshooting
* Contributing
* License & Acknowledgments

---

## Overview

Vanilo (Sunbeam) demonstrates a real-world **microservices architecture** with independent services, centralized routing, event-driven communication, and secure payment handling.

### Core Features

* Product discovery and catalog management
* Role-based access (Customer, Merchant, Admin)
* Cart, checkout, and order lifecycle
* Secure payment integration (Razorpay – test mode)
* Event-driven notifications using Kafka
* JWT-based authentication and authorization

---

## Architecture

### Design Principles

* **API Gateway** as a single entry point
* **Service isolation** (one service = one business domain)
* **Independent deployment and scaling**
* **Asynchronous communication** using Kafka

### High-Level Architecture

```
Client (React)
   |
   v
API Gateway (Spring Cloud Gateway)
   |
   v
-------------------------------------------------
| User | Product | Cart | Order | Payment       |
-------------------------------------------------
                       |
                       v
                     Kafka
                       |
                       v
              Notification Service
```

---

## Key System Flows

### Checkout & Payment Flow

```
Client
  |
  v
API Gateway
  |
  v
Order Service
  |
  v
Payment Service
  |
  v
Razorpay (Test Mode)
  |
  v
Payment Service (Signature Verification)
  |
  v
Kafka Event (PAYMENT_SUCCESS)
  |
  v
Notification Service
  |
  v
Email / SMS
```

### Security Notes

* Razorpay orders are created **server-side only**
* Payment verification uses **HMAC-SHA256**
* Kafka consumers are designed to be **idempotent**

---

## Project Structure

```
Client/
 └── React frontend (Vite + React)

Server/
 ├── API_GATEWAY_SERVICE
 ├── USER_SERVICE
 ├── PRODUCT_SERVICE
 ├── CART_SERVICE
 ├── ORDER_SERVICE
 ├── PAYMENT_SERVICE
 └── NOTIFICATION_SERVICE
```

---

## Quickstart (Local Setup)

### Prerequisites

* Node.js 18+
* npm
* Java 17+ & Maven
* .NET SDK
* MySQL
* MongoDB
* Apache Kafka

### Startup Order

1. Start **Kafka**, **MySQL**, and **MongoDB**
2. Start **API Gateway**
3. Start backend microservices
4. Start frontend client

---

## Frontend (Client)

The frontend is a **React + Vite** application that communicates **only through the API Gateway**.

### Responsibilities

* Role-based UI rendering
* Protected routes
* JWT handling via Axios interceptors
* Cart, checkout, and payment initiation
* State management using Redux Toolkit

### Run Frontend

```bash
cd Client
npm install
npm run dev
```

**Default URL:**
`http://localhost:3000`

**Expected API Gateway:**
`http://localhost:8080`

---

## Backend (Services)

Each backend service is independent and exposes REST APIs routed via the API Gateway.

### Local Development Ports

| Service              | Port | Technology           |
| -------------------- | ---- | -------------------- |
| API Gateway          | 8080 | Spring Cloud Gateway |
| User Service         | 8081 | Spring Boot + MySQL  |
| Product Service      | 5000 | Node.js + MongoDB    |
| Cart Service         | 5296 | .NET                 |
| Order Service        | 5024 | .NET                 |
| Payment Service      | 8083 | Spring Boot          |
| Notification Service | 8084 | Spring Boot          |

### Run Backend Services

```bash
# Spring Boot services
mvn spring-boot:run

# .NET services
dotnet run

# Node.js product service
cd Server/PRODUCT_SERVICE
npm install
node server.js
```

---

## Authentication & Security

Authentication is centralized at the **API Gateway** using **JWT**.

### Authentication Flow

1. User logs in from frontend
2. API Gateway forwards request to User Service
3. JWT is issued on success
4. Token stored in `localStorage` and Redux
5. Axios attaches token to every request
6. API Gateway validates token before routing

### Security Features

* Stateless JWT authentication
* Role-based access control
* Protected frontend routes
* Centralized token validation

---

## Payments & Notifications

### Payment Handling

* Razorpay integration in **test mode**
* Orders created and verified server-side
* HMAC-SHA256 signature verification

### Notification Flow

* Payment success event published to Kafka
* Notification Service consumes event
* Email/SMS sent to customer

---

## Tech Stack Summary

**Frontend**

* React (Vite)
* Redux Toolkit
* React Router
* Axios
* Bootstrap 5

**Backend**

* Spring Boot
* Node.js
* .NET

**Databases**

* MySQL (users, orders)
* MongoDB (products)

**Messaging**

* Apache Kafka

**Payments**

* Razorpay (test mode)

---

## Troubleshooting

**Frontend cannot reach APIs**

* Ensure API Gateway is running on `http://localhost:8080`
* Check `src/shared/api/axios.js`

**Authentication loop**

* Verify JWT in `localStorage`
* Inspect Redux `authSlice`

**Payment verification failure**

* Check Payment Service logs
* Confirm correct Razorpay secret key

**Port already in use**

```bash
npm run dev -- --port 3001
```

---

## Contributing

* Run ESLint before committing:

```bash
npm lint
npm lint -- --fix
```

* Keep frontend API calls aligned with backend contracts
* Update documentation when APIs change

---

## License & Acknowledgments

This project is part of a **CDAC Final Year Project**
(Non-Commercial, Educational Use Only)

### Acknowledgments

* React & Vite community
* Redux Toolkit contributors
* Bootstrap contributors
* Razorpay
* CDAC faculty and mentors

---

**Maintained by the Vanilo Development Team**

---

