# Notes Application

A full-stack notes application built to explore a modern, scalable architecture using multiple databases and services. This project is primarily **learning-focused**, aiming to understand how different technologies work together in a real-world setup.

## Tech Stack

### Frontend
- **Next.js** – React-based framework for server-side rendering and modern frontend development

### Backend
- **Node.js** – Backend API and application logic

### Databases
- **MongoDB** – Stores notes and note-related data
- **PostgreSQL** – Manages users, authentication data, roles, and permissions

### Object Storage
- **MinIO** – S3-compatible object storage for assets (images, attachments, etc.)

### DevOps
- **Docker & Docker Compose** – Containerized development environment for all services

## Architecture Overview

- Next.js handles the frontend and communicates with the backend API
- Node.js serves as the backend, orchestrating data between databases and storage
- MongoDB is optimized for flexible note content
- PostgreSQL ensures strong relational integrity for users and roles
- MinIO manages file storage independently from the databases
- Docker ensures consistent local development and easy setup

## Features

- User authentication and role management
- Create, read, update, and delete notes
- Asset upload and retrieval via MinIO
- Fully containerized development environment

## Project Goals

- Learn how to integrate **multiple databases** in one application
- Understand **service separation** and backend architecture
- Practice working with **Dockerized environments**
- Explore real-world data modeling decisions

## Getting Started

### Prerequisites
- Docker
- Docker Compose

### Running the Project

```bash
docker-compose up --build
```

Once running, the services will be available locally based on the ports defined in `docker-compose.yml`.

## Environment Variables

Each service uses environment variables defined in `.env` files. Example variables include:

- Database connection strings
- MinIO credentials
- API secrets

> Make sure to create the required `.env` files before running the project.

## Status

🚧 **In active development** — this project evolves as new concepts are learned and implemented.

## License

This project is for educational purposes.

