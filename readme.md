# Messaging Platform Microservices Architecture

This repository implements a **microservices-based messaging platform**. The system is designed for scalability, modularity, and ease of maintenance, leveraging the power of independent services for core functionalities such as authentication, user profiles, chat, and API management.

---

## 🏗️ Architecture Overview

```
+-------------+        +----------------+        +----------------+        +----------------+
|             |        |                |        |                |        |                |
|  Client(s)  +<-----> |  API Gateway   +<-----> |  Microservices |<-----> |   Database(s)  |
|             |        |                |        |                |        |                |
+-------------+        +----------------+        +----------------+        +----------------+
```

- **API Gateway**: Single entry point for all clients. Handles routing, authentication, and request aggregation.
- **Auth Service**: Manages user registration, login, and authentication tokens.
- **Profile Service**: Handles user profile data and updates.
- **Chat Service**: Manages chat rooms, messages, and real-time communication.

Each service is independently deployable and communicates via lightweight protocols (e.g., HTTP, gRPC, or message brokers).

---

## 🧩 Microservices Breakdown

### 1. API Gateway
- **Path:** `api-gateway/`
- **Responsibilities:**
  - Centralized entry point for all API requests
  - Routes requests to appropriate microservices
  - Handles authentication and authorization
  - Can perform request validation and response aggregation

### 2. Auth Service
- **Path:** `auth-service/`
- **Responsibilities:**
  - User registration and login
  - Password hashing and validation
  - JWT or session token issuance
  - User authentication and authorization logic

### 3. Profile Service
- **Path:** `profile-service/`
- **Responsibilities:**
  - User profile creation and management
  - Profile updates (e.g., avatar, bio, settings)
  - Fetching user profile data

### 4. Chat Service
- **Path:** `chat-service/`
- **Responsibilities:**
  - Real-time chat functionality
  - Message storage and retrieval
  - Chat room management
  - (Optional) WebSocket or similar real-time protocol support

---

## 🐳 Running with Docker Compose

The platform is containerized for easy local development and deployment. Use the provided `docker-compose.yml` to spin up all services:

```bash
docker-compose up --build
```

This will start all microservices and their dependencies.

---

## 📁 Project Structure

```
microservices/
├── api-gateway/      # API Gateway service
├── auth-service/     # Authentication service
├── chat-service/     # Chat/message service
├── profile-service/  # User profile service
└── docker-compose.yml
```

---

## 🚀 Getting Started (Development)

Each service is a standalone [NestJS](https://nestjs.com/) application. To run a service individually:

```bash
cd <service-directory>
npm install
npm run start:dev
```

Replace `<service-directory>` with one of: `api-gateway`, `auth-service`, `chat-service`, `profile-service`.

---

## 📚 Further Improvements
- Add service discovery and load balancing
- Integrate centralized logging and monitoring
- Implement message broker (e.g., RabbitMQ, Kafka) for event-driven communication
- Add more robust error handling and validation

---

## 📝 License

This project is licensed under the MIT License.
