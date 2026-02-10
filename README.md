# Docker on ECS Fargate - Node.js MySQL CRUD App

A simple Node.js CRUD application using MySQL, Dockerized for easy deployment.

## Getting Started

### Prerequisites

- [Docker](https://docs.docker.com/get-docker/) installed on your machine.
- [Git](https://git-scm.com/) installed.

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd <repository-directory>
    ```

2.  **Set up environment variables:**
    Copy the example environment file to `.env`:
    ```bash
    cp .env.example .env
    ```
    You can adjust the values in `.env` if needed, but the defaults should work for local development.

3.  **Run with Docker Compose:**
    Build and start the containers:
    ```bash
    docker compose up -d --build
    ```

4.  **Access the application:**
    Open your browser and navigate to [http://localhost:3000](http://localhost:3000).

### API Endpoints

-   `GET /health`: Health check
-   `GET /api/users`: List users
-   `POST /api/users`: Create user
-   `PUT /api/users/:id`: Update user
-   `DELETE /api/users/:id`: Delete user
