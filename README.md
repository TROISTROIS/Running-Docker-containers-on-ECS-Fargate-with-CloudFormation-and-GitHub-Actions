# Docker on ECS Fargate - Node.js MySQL CRUD App

A simple Node.js CRUD application using MySQL, Dockerized for easy deployment.

## Getting Started

### Prerequisites

- [Docker](https://docs.docker.com/get-docker/) installed on your machine.
- [Git](https://git-scm.com/) installed.

### Building from Source

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
    Modify the environment variables in `.env` as needed for your database connection.

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

## Starting from an Image

To run this application using the pre-built image from Docker Hub:

1.  **Pull the image:**
    ```bash
    docker pull nvme1n1/simple-crud-node-app:anyonecanuse
    ```

2.  **Set up with Docker Compose:**
    The necessary configuration files (`docker-compose.yml`, `.env.example`, and `schema.sql`) are already provided in this repository.

    **Step-by-step instructions:**
    1.  **Create your environment file:**
        ```bash
        cp .env.example .env
        ```
        Modify the environment variables in `.env` as needed for your database connection.
    2.  **Use the pre-built image:**
        Open the `docker-compose.yml` file and find the `app` service. Change the `build: .` line to point to the pre-built image:
        ```yaml
        services:
          app:
            image: nvme1n1/simple-crud-node-app:anyonecanuse
            # build: .  <-- Replace this line
            ...
        ```
    3.  **Start the services:**
        ```bash
        docker compose up -d
        ```

3.  **Access the application:**
    Open your browser and navigate to [http://localhost:3000](http://localhost:3000).
