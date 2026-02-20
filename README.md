# Docker on ECS Fargate - Node.js MySQL CRUD App

A simple Node.js CRUD application using MySQL, Dockerized for easy deployment.

## Architecture Diagram

![Architecture Diagram](Docker%20and%20ECS%20Fargate%20architecture%20.drawio.svg)

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

### Access the application:
    Open your browser and navigate to http://localhost:3000

## AWS Deployment

This project includes AWS CloudFormation templates to deploy the application on Amazon ECS using AWS Fargate.

### Prerequisites

- An active [AWS Account](https://aws.amazon.com/).
- [AWS CLI](https://aws.amazon.com/cli/) installed and configured with appropriate permissions.
- Docker installed (if you plan to push a new image to ECR).

### Deployment Steps

The infrastructure is broken down into four stacks that must be deployed in the following order:

#### 1. Network Infrastructure (VPC-stack)
Sets up the VPC, subnets, and routing.
```bash
aws cloudformation deploy \
  --template-file VPC-stack.yaml \
  --stack-name demo-vpc \
  --parameter-overrides VPCCIDR=10.0.0.0/16 SubnetCount=6 SubnetBits=8
```

#### 2. App Cluster Infrastructure (APPCLUSTER-stack)
Sets up the ECS Cluster, ALB, Security Groups, ECR Repository, and VPC Endpoints.
```bash
aws cloudformation deploy \
  --template-file APPCLUSTER-stack.yaml \
  --stack-name demo-cluster \
  --parameter-overrides ALBInboundPort=80 AppContainerPort=3000 DBPort=3306
```

#### 3. Push Docker Image to ECR
Before deploying the application stack, you must build and push your Docker image to the ECR repository created in the previous step.

1.  **Authenticate Docker to ECR:**
    ```bash
    aws ecr get-login-password --region <your-region> | docker login --username AWS --password-stdin <aws_account_id>.dkr.ecr.<your-region>.amazonaws.com
    ```

2.  **Build and Tag the image:**
    ```bash
    docker build -t ecs-demo-app .
    docker tag ecs-demo-app:latest <aws_account_id>.dkr.ecr.<your-region>.amazonaws.com/demo-cluster-ECRRepo:latest
    ```

3.  **Push to ECR:**
    ```bash
    docker push <aws_account_id>.dkr.ecr.<your-region>.amazonaws.com/demo-cluster-ECRRepo:latest
    ```

#### 4. Identity and Access Management (IAM-stack)
Defines the IAM roles required for ECS tasks and Lambda functions.
```bash
aws cloudformation deploy \
  --template-file IAM-stack.yaml \
  --stack-name demo-iam \
  --capabilities CAPABILITY_NAMED_IAM
```

#### 5. API & Database Stack (API-stack)
Deploys the RDS instance, Lambda initializer, and the ECS Fargate Service.
```bash
aws cloudformation deploy \
  --template-file API-stack.yaml \
  --stack-name demo-api \
  --parameter-overrides AppContainerPort=3000 DBPort=3306
```

### Verification

After deployment is complete, you can find the API endpoint in the CloudFormation Outputs of the `demo-api` stack:
```bash
aws cloudformation describe-stacks \
  --stack-name demo-api \
  --query "Stacks[0].Outputs[?OutputKey=='APIEndpoint'].OutputValue" \
  --output text
```

### Accessing the Web UI
The application's public UI will be accessible via the Load Balancer DNS name, which can be found in the `demo-cluster` stack outputs or via the AWS Console.
