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

## Docker Hub Quickstart

To run this application using the pre-built image from Docker Hub:

1.  **Pull the image:**
    ```bash
    docker pull <your-dockerhub-username>/node-crud-app:latest
    ```

2.  **Run the container:**
    You must provide the necessary environment variables for the database connection.
    ```bash
    docker run -d -p 3000:3000 \
      -e DB_HOST=host.docker.internal \
      -e DB_USER=root \
      -e DB_PASSWORD=password \
      -e DB_NAME=crud_app \
      -e PORT=3000 \
      <your-dockerhub-username>/node-crud-app:latest
    ```
    *Note: `host.docker.internal` allows the container to access a database running on your host machine (e.g., if you have MySQL running locally outside Docker).*

    If you are running MySQL in another Docker container, ensure both are on the same network and use the MySQL container name as `DB_HOST`.
