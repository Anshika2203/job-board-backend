# Job Board Backend

## Overview
This is a simple Job Board backend built with Node.js (TypeScript) and MySQL. It provides basic CRUD operations for job postings.

## Setup and Running Instructions

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd job-board-backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up the MySQL database on PlanetScale and update the database connection details in the `.env` file.

4. Run the application:
   ```bash
   npm run start
   ```

5. Access the API documentation at `/api-docs` if Swagger is set up.

## Design Decisions
- The database schema is designed to store job postings with relevant fields.
- The application is structured to separate concerns (routes, controllers, models) for maintainability.

## Docker
To run the application in a Docker container, use the provided Dockerfile.

## Deployment
- MySQL is deployed on PlanetScale.
- The application is deployed on Render.
