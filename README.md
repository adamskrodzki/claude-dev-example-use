# Space Invaders Web Application

## Overview

This project is a web-based reimplementation of the classic "Space Invaders" game. It features a frontend developed with TypeScript, HTML, and CSS, and a backend using Node.js with Express.js. Supabase is used for data management and authentication.

## Project Structure

- **Frontend**: Located in the `frontend/` directory, includes components, services, and utilities.
- **Backend**: Located in the `backend/` directory, includes routes, controllers, services, and models.

## Setup Instructions

### Prerequisites

- Node.js and npm installed
- Supabase account and project set up

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```bash
   cd Space_inviders
   ```

3. Install dependencies for both frontend and backend:
   ```bash
   cd frontend
   npm install
   cd ../backend
   npm install
   ```

4. Set up environment variables for Supabase:
   - Create a `.env` file in the `backend/` directory with the following:
     ```
     SUPABASE_URL=your-supabase-url
     SUPABASE_KEY=your-supabase-key
     ```

### Running the Application

1. Start the backend server:
   ```bash
   cd backend
   node server.js
   ```

2. Open `frontend/index.html` in a web browser to view the game.

## Testing

- **Frontend**: Run tests using Jest:
  ```bash
  cd frontend
  npm test
  ```

- **Backend**: Run tests using Mocha:
  ```bash
  cd backend
  npm test
  ```

## Current Features

- Basic game interface with player movement
- Node.js server setup
- Supabase integration for authentication
- API service for user management

## Next Steps

- Continue development of game mechanics and backend features
- Implement leaderboard functionalities and enhance game interface

---

This README provides a comprehensive overview of the project setup and current development status. Please refer to the `project_spec.md` for detailed specifications and requirements.