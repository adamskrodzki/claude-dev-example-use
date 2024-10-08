# Space Invaders Web Application Specification

## Overview

This project aims to develop a sophisticated web-based reimplementation of the classic "Space Invaders" game. The application will feature a front-end for gameplay, developed with TypeScript, and a back-end utilizing Node.js for supporting features such as user authentication, score submission, and leaderboards. Supabase will be used as the backend-as-a-service platform, providing data management, authentication, and real-time capabilities.

## Requirements

### Features Overview

- **Frontend**: A web interface for the "Space Invaders" game, accessible via keyboard controls.
- **Backend**: RESTful APIs for managing game data, including user accounts, scores, and leaderboard functionalities, integrated with Supabase.
- **Authentication**: Optional user registration, login, and logout features for tracking high scores and managing accounts.
- **Leaderboards**: Global and local leaderboards for showcasing high scores, supporting competitive gameplay among users.
- **Local Storage**: Implementation of local storage for retaining scores and progress for users who prefer not to create an account.

## High-Level Architecture

### Project Structure

The project is organized in a way that ensures clarity, ease of development, and scalability. The primary components are as follows:

- **Frontend**: A web-based client developed using TypeScript, HTML, and CSS. The game rendering is managed using the Canvas API, which enables complex graphics and animations.

  - **Directory Structure**: The frontend is organized into components, services, and utility folders.
    - **Components**: Reusable UI elements such as game screens, scoreboards, and user forms.
    - **Services**: Functions that handle interactions with backend APIs (e.g., submitting scores, authentication).
    - **Utilities**: Helper functions and constants to ensure code reusability and reduce redundancy.

- **Backend**: A Node.js application developed using Express.js for managing game data, user authentication, and leaderboard features.

  - **Directory Structure**: The backend is organized into routes, controllers, services, and models.
    - **Routes**: Define all API endpoints, segregating user management, game management, and leaderboard functionalities.
    - **Controllers**: Contain the logic for handling requests and preparing responses, ensuring separation of concerns.
    - **Services**: Handle business logic, providing reusable functions for controllers.
    - **Models**: Define data schemas and interactions with the Supabase database.

- **Database**: Supabase is used to manage the PostgreSQL database. The schema is normalized for data integrity and is designed to handle growth in user and game data.

  - **Tables**: Users, Scores, and GameSessions tables ensure all relevant game and user data are appropriately tracked and accessible.

- **Real-Time Features**: Supabase's real-time capabilities are leveraged for dynamic leaderboard updates, which allows all players to see the latest scores without refreshing their game.

- **Local Storage**: Utilized for guest users to save their progress, UUIDs, and scores locally. This ensures a seamless experience for players who prefer not to create an account.

### Development Tools

The project utilizes several tools to maximize efficiency and maintain quality throughout the development cycle:

- **Version Control**: Git is used for version control, following a branching strategy that includes separate branches for features, bug fixes, and releases.
- **Code Quality**: ESLint and Prettier are employed for ensuring code consistency and readability across the entire project.
- **Testing**: Jest and Mocha are used for unit and integration tests, while Cypress handles end-to-end testing. The TDD approach ensures all components are thoroughly tested during the development process.

## Technical Stack

- **Frontend**: TypeScript, HTML, CSS, Canvas API.
- **Backend**: Node.js with Express.js, integrated with Supabase.
- **Database and Authentication**: Supabase (PostgreSQL).

## Functional Requirements

### 1. Game Mechanics

- Implement the core "Space Invaders" gameplay, including:
  - **Player Movement**: The player moves left or right using keyboard keys (e.g., Arrow keys or A/D).
  - **Shooting**: The player can shoot enemies using the space bar.
  - **Enemies**: Enemies move horizontally and drop down periodically, mimicking the behavior of the original game.
  - **Collisions**: Detect collisions between enemy ships and player bullets.
  - **Game Over**: The game ends when enemies reach the bottom of the screen or the player loses all lives.
  - **Score Calculation**: Award +10 points for each enemy destroyed, and deduct 1 point for each bullet fired.

### 2. User Management

- **Sign Up**: Users can create an account with email and password for an enhanced experience.
- **Login**: Registered users can log in to track their high scores and participate in leaderboards.
- **Logout**: Users can securely log out of their accounts.
- **Guest Mode**: Users who prefer not to create an account can still play the game. Their scores and progress are saved locally using the browser's local storage. Not logged-in users must provide a name, and are identified by a locally stored UUID, which is also used to submit their scores to the leaderboard. These users are considered "unverified".

### 3. Leaderboards

- **Global Leaderboard**: Displays the top scores of all players, both verified and unverified.
- **User Scores**: Displays each logged-in user's personal best score.
- **Score Submission**: Upon game over, all users can submit their scores to the leaderboard. Users who are not logged in must provide a name, and are identified by a locally stored UUID. Users on the leaderboard have either a verified or unverified status.
- **Local Leaderboard**: Stores scores locally for guest users and displays them on the device they are using.

## Non-functional Requirements

- **Test-Driven Development (TDD)**: The application must be developed using a TDD approach, ensuring all features are thoroughly tested before implementation. This will improve code quality, reliability, and maintainability.

- **Responsiveness**: Ensure that the game is fully responsive and playable on both desktop and tablet devices.

- **Real-time Updates**: Utilize Supabase's real-time functionalities to dynamically update the leaderboard.

- **Security**: Protect all API endpoints with JWT tokens to secure score submissions and user data.

## API Specifications

### Endpoints

1. **User Management**

   - `POST /api/auth/signup`
     - Description: Registers a new user.
     - Request Body: `{ "email": string, "password": string }`
   - `POST /api/auth/login`
     - Description: Logs in an existing user.
     - Request Body: `{ "email": string, "password": string }`
   - `POST /api/auth/logout`
     - Description: Logs out a user.

2. **Leaderboard Management**

   - `GET /api/leaderboard`
     - Description: Retrieves the top scores from the global leaderboard.
     - Response: `{ "leaderboard": [ { "username": string, "score": number, "status": "verified" | "unverified" } ] }`
   - `POST /api/leaderboard/score`
     - Description: Submits a user's score.
     - Request Body: `{ "userId": string, "username": string, "score": number }`

3. **Game Management**

   - `POST /api/game/start`
     - Description: Initiates a new game session for a user.
     - Request Body: `{ "userId": string, "username": string }`
     - Response: `{ "gameSessionId": string, "startTime": string }`
   - `POST /api/game/submit`
     - Description: Submits the final game score upon completion of a game session.
     - Request Body: `{ "gameSessionId": string, "userId": string, "username": string, "score": number }`
     - Response: `{ "status": "success", "message": "Score submitted successfully" }`

## Database Design

### Tables

1. **Users**

   - `uuid`: Primary key, universally unique identifier for all users.
   - `username`: User's name or email (unique).
   - `email`: User email, optional for guest users.
   - `password`: Hashed password, required for registered users.
   - `status`: Indicates whether the user is verified or unverified.
   - `created_at`: Timestamp.

2. **Scores**

   - `id`: Primary key.
   - `game_session_id`: Foreign key referencing `GameSessions`.
   - `user_id`: Foreign key referencing `Users`.
   - `score`: Integer representing the user's score.
   - `created_at`: Timestamp.

3. **GameSessions**

   - `id`: Primary key.
   - `user_id`: Foreign key referencing `Users`.
   - `start_time`: Timestamp indicating when the game session began.
   - `end_time`: Timestamp indicating when the game session ended.

## Frontend Requirements

### Game Interface

- **Game Screen**: Use the HTML Canvas API to render the game components.
- **Controls**: Implement keyboard controls for player movement and shooting.
- **HUD (Heads-Up Display)**: Display critical information such as the current score, remaining lives, and current level.

### User Interface

- **Home Page**: Contains a "Play" button, leaderboard section, and user authentication links.
- **Game Over Screen**: Displays the player's final score and includes a button to submit the score (for logged-in users) or save locally (for guest users).
- **Leaderboard Page**: Displays the global leaderboard and local leaderboard for guest users.
- **Login/Sign Up Page**: Provides forms for user sign-up and login.

## Supabase Integration

- **Authentication**: Use Supabase authentication services for user account management.
- **Database**: Employ Supabase's PostgreSQL for managing user and score data.
- **Real-time Leaderboard**: Leverage real-time subscriptions to the `Scores` table to keep the leaderboard updated dynamically in the frontend.

# Development Best Practices

To ensure the Space Invaders web application is developed with high quality, the following best practices should be applied across all areas of development. These practices focus on scalability, maintainability, and maximizing the efficiency of each development phase.

### General Best Practices

- **Test-Driven Development (TDD)**: Follow TDD principles across all areas of development. This ensures that tests are written before the code itself, leading to higher code quality, early detection of issues, and a well-defined scope for each feature.
- **Code Consistency**: Utilize linters (e.g., ESLint for JavaScript/TypeScript) and formatting tools (e.g., Prettier) to ensure a consistent code style throughout the project.
- **Documentation**: Maintain clear documentation for both code and API specifications. This includes comments in the codebase, API documentation, and README files for setting up and running the application.

### Backend Development

- **Modular Architecture**: Structure the backend using a modular approach, separating concerns such as routing, business logic, and data access. This improves maintainability and makes it easier to add or modify features.
- **API Design**: Develop RESTful APIs that follow standard conventions for URL structure, request methods, and response codes. Document all endpoints clearly for ease of integration with the frontend.
- **Security**: Implement JWT-based authentication to protect user data. Validate all incoming data to prevent SQL injection and other common attacks.
- **Testing**: Use Jest or Mocha for unit and integration tests, ensuring each component is thoroughly tested for different scenarios, including edge cases. Mock external dependencies where applicable to isolate the functionality being tested.

### Frontend Development

- **Component-Based Design**: Develop reusable UI components with clear separation of concerns, enabling consistent behavior and styling across the application. Follow the principles of Atomic Design to break down the interface into small, manageable parts.
- **Type Safety**: Use TypeScript for all frontend development to leverage strong typing. This enhances readability and makes the codebase more resilient to refactoring by catching type errors during development.
- **Accessibility**: Ensure the user interface is accessible to all users, including those with disabilities. Follow WCAG (Web Content Accessibility Guidelines) standards for elements such as forms, buttons, and dynamic content.
- **Testing**: Implement unit tests for each component using Jest and React Testing Library. Use Cypress for end-to-end testing to verify user workflows, ensuring the entire interface behaves as expected.

### Database Development

- **Normalization and Optimization**: Design a normalized database schema to eliminate redundancy, while also optimizing queries for performance. Use indexing where necessary to speed up frequent queries such as leaderboard lookups.
- **Data Integrity**: Enforce data integrity using foreign keys and constraints. Implement validation both in the backend and in the database to prevent invalid data from being stored.
- **Scalability**: Structure the database to accommodate future growth, such as adding new game features or new types of user data, without requiring major restructuring. Consider using Supabase's real-time capabilities to handle scaling needs dynamically.
- **Testing**: Create unit and integration tests for database interactions, including handling of edge cases like duplicate records or failed transactions. Use a test database to isolate the testing environment from production data.

## Development Flow

The development process for the Space Invaders web application is divided into iterative sprints. Each sprint is designed to incrementally deliver functionality, refine features, and enhance code quality based on previous deliverables and feedback.

### Roles and Responsibilities

- **Product Owner**:

  - Responsible for defining the overall vision of the project and making final decisions on feature prioritization.
  - Consulted during sprint planning to determine which functionalities should be delivered next, based on `project_spec.md`.
  - Provides clarity on requirements and answers questions from developers regarding functionalities.
  - Performs final acceptance testing of deliverables, after developers have conducted unit tests and peer reviews.

- **Developer**:

  - Responsible for implementing features using a Test-Driven Development (TDD) approach.
  - Creates detailed suggestions for sprint goals and specific tasks during sprint planning, which are reviewed and finalized by the Product Owner.
  - Ensures that tasks are developed, tested, and meet the acceptance criteria before merging them into the main branch.

### Git Workflow

- For each task, a new branch should be created, named appropriately to reflect the task being worked on (e.g., `feature/game-mechanics` or `bugfix/login-issue`).
- Once the task is completed, thoroughly tested, and meets the acceptance criteria, the branch should be merged into the main branch through a pull request (PR).
- Code reviews should be conducted on each PR to maintain high code quality and ensure adherence to project standards.
- The main branch should always contain production-ready code, and no incomplete features should be merged until they are fully tested and reviewed.

### Sprint Structure

Each sprint consists of the following stages:

1. **Planning**

   - At the beginning of each sprint, a planning session is conducted to define the sprint goal, based on previous sprints' deliverables and the overall project specification.
   - Sprint goals should be granular, focusing on delivering specific, well-defined features. The project should be divided into 5-10 sprints, ensuring manageable development cycles.
   - A list of tasks is created, each with a detailed description. Tasks must be very granular, typically resulting in 10-20 tasks per sprint. Avoid broad tasks like "Frontend Setup"; instead, break down tasks into smaller, actionable items to maintain focus and accountability.
   - The Product Owner is involved in planning, and planning does not end until they agree with the sprint goals and list of tasks.
   - **Documentation**: The planning session results are recorded in `planning.md`, which includes the sprint goal and a task list. The `tasks.md` file is also created during the planning stage, detailing each task's requirements, acceptance criteria, and expectations.

2. **Development**

   - Each task is developed separately using a Test-Driven Development (TDD) approach. This ensures robust and thoroughly tested code for each functionality.
   - The Developer must always test the functionality to ensure it works every time before considering the task done.
   - Once a task is considered done, the Developer should update the `tasks.md` file, marking the task as "In Review" so Product Owner can check it.
   - **Documentation**: During development, the `tasks.md` file is updated with the results of each task, including progress status and any adjustments made during the process.

3. **Sprint Review**

   - After the development stage, a sprint review is conducted where the Product Owner decides if the tasks are done and meet the acceptance criteria.
   - The Product Owner also conducts testing to verify that each feature works as expected and aligns with the project goals. Best practices include thorough manual testing, checking edge cases, and ensuring usability from the end-user's perspective.
   - The Developer is responsible for guiding the Product Owner through the testing process, providing instructions and clarifications as needed.

4. **Sprint Summary**

   - At the end of each sprint, a `sprint_summary.md` is created. This summary includes the completed tasks, any blockers or challenges encountered, and an evaluation of the sprint.
   - The sprint summary also highlights key achievements and sets recommendations for the subsequent sprint.

5. **Planning**

   - At the beginning of each sprint, a planning session is conducted to define the sprint goal, based on previous sprints' deliverables and the overall project specification.
   - Sprint goals should be granular, focusing on delivering specific, well-defined features. The project should be divided into 5-10 sprints, ensuring manageable development cycles.
   - A list of tasks is created, each with a detailed description. Tasks must be very granular, typically resulting in 10-20 tasks per sprint. Avoid broad tasks like "Frontend Setup"; instead, break down tasks into smaller, actionable items to maintain focus and accountability.
   - The Product Owner is involved in planning, and planning does not end until they agree with the sprint goals and list of tasks.
   - **Documentation**: The planning session results are recorded in `planning.md`, which includes the sprint goal and a task list. The `tasks.md` file is also created during the planning stage, detailing each task's requirements, acceptance criteria, and expectations.

6. **Development**

   - Each task is developed separately using a Test-Driven Development (TDD) approach. This ensures robust and thoroughly tested code for each functionality.
   - Each task has well-defined acceptance criteria and associated tests to verify its completion.
   - **Documentation**: During development, the `tasks.md` file is updated with the results of each task, including progress status and any adjustments made during the process.

7. **Sprint Review**

   - After the development stage, a sprint review is conducted where the Product Owner decides if the tasks are done and meet the acceptance criteria.
   - The Product Owner also conducts testing to verify that each feature works as expected and aligns with the project goals. Best practices include thorough manual testing, checking edge cases, and ensuring usability from the end-user's perspective.
   - The Developer is responsible for guiding the Product Owner through the testing process, providing instructions and clarifications as needed. Best practices include thorough manual testing, checking edge cases, and ensuring usability from the end-user's perspective.

8. **Sprint Summary**

   - At the end of each sprint, a `sprint_summary.md` is created. This summary includes the completed tasks, any blockers or challenges encountered, and an evaluation of the sprint.
   - The sprint summary also highlights key achievements and sets recommendations for the subsequent sprint.

9. **Planning**

   - At the beginning of each sprint, a planning session is conducted to define the sprint goal, based on previous sprints' deliverables and the overall project specification.
   - Sprint goals should be granular, focusing on delivering specific, well-defined features. The project should be divided into 5-10 sprints, ensuring manageable development cycles.
   - A list of tasks is created, each with a detailed description. Tasks must be very granular, typically resulting in 10-20 tasks per sprint. Avoid broad tasks like "Frontend Setup"; instead, break down tasks into smaller, actionable items to maintain focus and accountability.
   - **Documentation**: The planning session results are recorded in `planning.md`, which includes the sprint goal and a task list. The `tasks.md` file is also created during the planning stage, detailing each task's requirements, acceptance criteria, and expectations.

10. **Development**

    - Each task is developed separately using a Test-Driven Development (TDD) approach. This ensures robust and thoroughly tested code for each functionality.
    - Each task has well-defined acceptance criteria and associated tests to verify its completion.
    - **Documentation**: During development, the `tasks.md` file is updated with the results of each task, including progress status and any adjustments made during the process.

11. **Sprint Summary**

    - At the end of each sprint, a `sprint_summary.md` is created. This summary includes the completed tasks, any blockers or challenges encountered, and an evaluation of the sprint.
    - The sprint summary also highlights key achievements and sets recommendations for the subsequent sprint.

12. **Planning**

    - At the beginning of each sprint, a planning session is conducted to define the sprint goal, based on previous sprints' deliverables and the overall project specification.
    - A list of tasks is created, each with a detailed description. Tasks are derived from the sprint goal and are broken down to ensure that they are manageable and testable.
    - **Documentation**: The planning session results are recorded in `planning.md`, which includes the sprint goal and a task list. The `tasks.md` file is also created during the planning stage, detailing each task's requirements, acceptance criteria, and expectations.

13. **Development**

    - Each task is developed separately using a Test-Driven Development (TDD) approach. This ensures robust and thoroughly tested code for each functionality.
    - Each task has well-defined acceptance criteria and associated tests to verify its completion.
    - **Documentation**: During development, the `tasks.md` file is updated with the results of each task, including progress status and any adjustments made during the process.

14. **Sprint Summary**

    - At the end of each sprint, a `sprint_summary.md` is created. This summary includes the completed tasks, any blockers or challenges encountered, and an evaluation of the sprint.
    - The sprint summary also highlights key achievements and sets recommendations for the subsequent sprint.

### Repository Structure for Sprint Documentation

- All sprint-related documents are stored in the main repository under the `sprints` folder.
- Each sprint has its own subfolder containing three files:
  - **`planning.md`**: Outlines the sprint goal and planned tasks.
  - **`tasks.md`**: Describes each task, including acceptance criteria, status, and task results.
  - **`sprint_summary.md`**: Summarizes the achievements and challenges of the sprint.

### Repository Structure for Sprint Documentation

- All sprint-related documents are stored in the main repository under the `sprints` folder.
- Each sprint has its own subfolder containing three files:
  - **`planning.md`**: Outlines the sprint goal and planned tasks.
  - **`tasks.md`**: Describes each task, including acceptance criteria, status, and task results.
  - **`sprint_summary.md`**: Summarizes the achievements and challenges of the sprint.

## Development Plan

### Milestones

1. **Frontend Game Logic**

   - Develop the game interface using HTML Canvas, using Test-Driven Development (TDD) to ensure robust functionality.
   - Implement player movement, shooting mechanics, and enemy behaviors with unit tests for each feature.

2. **Backend API**

   - Set up a Node.js server with Express.js, using TDD to verify the correctness of APIs.
   - Implement user authentication and leaderboard management APIs, ensuring comprehensive test coverage.

3. **Supabase Integration**

   - Integrate backend with Supabase for authentication and database operations, with tests for each integration point.
   - Utilize Supabase's real-time functionalities for dynamic leaderboard updates, tested in various scenarios to ensure reliability.

4. **Frontend Integration**

   - Connect the frontend to backend APIs for user management and leaderboard functionalities, using TDD to validate integration.
   - Develop a user-friendly interface for login, sign-up, and leaderboard interactions, ensuring UI components are tested for functionality.

## Stretch Goals

- **Power-ups**: Introduce collectible power-ups for the player, such as increased shooting speed or additional lives.
- **Multiple Levels**: Expand gameplay by adding new levels featuring different enemy patterns and increasing difficulty.
- **Mobile Support**: Make the game accessible on mobile devices by incorporating touch controls.

## Additional Notes

- **Version Control**: Use Git for version control, with a well-defined branching strategy for features, bug fixes, and releases.
- **Testing**: Implement both unit testing and end-to-end testing using tools like Jest and Cypress to ensure stability and reliability.
- **Testing**: Implement both unit testing and end-to-end testing using tools like Jest and Cypress to ensure stability and reliability.

## Deliverables

- **Source Code**: Hosted on GitHub or another version control platform.
- **Documentation**: Include comprehensive setup instructions, code documentation, and a detailed README.

---

This specification provides a comprehensive breakdown of the project, encompassing all critical components necessary for a successful implementation. Please let me know if there are specific areas that require further elaboration or additional details.
