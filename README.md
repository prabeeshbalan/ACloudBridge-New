# aCloudBridge Web Application

## Overview

aCloudBridge is a 3 tier web application with a separate frontend and backend with a PostgreSQL database.

## Folder Structure

The repository has the following structure:

aCloudBridge_New/
├── acloudbridge_backend/     # Backend Code
│   ├── .env                 # Environment variables
│   ├── generate-secret.js    # Script to generate a secret key
│   ├── node_modules/        # Node.js dependencies
│   ├── routes/              # API routes
│   ├── server.js            # Main server file
│   ├── package-lock.json    #  NPM lock file
│   └── package.json         # Project dependencies and scripts
│├── acloudbridge_webapp/      # Frontend Code
│   ├── .next/               # Next.js build output (not committed to repo)
│   ├── node_modules/        # Node.js dependencies (not committed to repo)
│   ├── public/              # Static assets
│   │   └── favicon.ico      # Favicon
│   ├── src/                 # Source code
│   │   ├── app/             # Next.js application pages
│   │   │   ├── account/       # Account-related pages
│   │   │   ├── changepassword/  # Change password page
│   │   │   ├── contact/       # Contact page
│   │   │   ├── login/         # Login page
│   │   │   ├── profile/       # User profile page
│   │   │   ├── signup/        # Signup page
│   │   │   ├── layout.tsx     # Main layout component
│   │   │   └── page.tsx       # Home page component
│   │   ├── globals.css      # Global styles
│   │   ├── svg.d.ts         # SVG type definitions
│   ├── .eslint.config.mjs   # ESLint configuration
│   ├── Implementation document.txt #  (Extra file, not standard Next.js)
├── next-env.d.ts      # Next.js environment type definitions
│   ├── next.config.ts     # Next.js configuration
│   ├── package-lock.json  # NPM lock file
│   ├── package.json       # Project dependencies and scripts
│   ├── postcss.config.mjs # PostCSS configuration
│   └── tsconfig.json      # TypeScript configuration
│└── .gitignore             # Specifies intentionally untracked files

## Backend (acloudbridge_backend)

### Description
The backend is built using Node.js and handles API requests, database interactions, and server-side logic.

### Key Components
* `server.js`:  The entry point for the backend server.  Configures the server, middleware, and routes.
* `routes/`:  Contains the route definitions for the API.
* `.env`:  Stores environment variables (database connection strings, API keys, etc.).  **Note:** This file should not be committed to the repository for security reasons.
* `generate-secret.js`:  A script to generate a secret key, likely used for JWT authentication.
* `package.json`: Defines project dependencies (e.g., Express, database drivers) and npm scripts.

###  Setup Instructions
1.  **Install Node.js:** Ensure you have Node.js installed (version >= 14).
2.  **Install Dependencies:** Navigate to the `acloudbridge_backend` directory and run:
    ```bash
    npm install
    ```
3.  **Configure Environment Variables:**
    * Create a `.env` file in the `acloudbridge_backend` directory.
    * Add the necessary environment variables (e.g., database connection URL, port, secret key).  Example:
        ```
        PORT=3001
        DATABASE_URL=your_database_connection_string
        JWT_SECRET=your_jwt_secret_key
        ```
    * Generate a secret key using `node generate-secret.js` and add it to `.env`
4.  **Start the Server:** Run the server:
    ```bash
    npm run dev  #  For development (if a dev script is defined)
    npm start    # For production
    ```

## Frontend (acloudbridge_webapp)

### Description
The frontend is built using Next.js and provides the user interface for the application.

### Key Components
* `src/app/`:  Contains the Next.js application pages and components.
    * `page.tsx`:  The main page.
    * `account/`, `changepassword/`, `login/`, `profile/`, `signup/`:  User account management pages.
    * `layout.tsx`: Defines the layout.
* `public/`:  Contains static assets such as images, fonts, and the favicon.
* `next.config.js`:  Next.js configuration file.
* `package.json`:  Defines project dependencies (e.g., React, Next.js) and npm scripts.

### Setup Instructions
1.  **Install Node.js:** Ensure you have Node.js installed (version >= 14).
2.  **Install Dependencies:** Navigate to the `acloudbridge_webapp` directory and run:
    ```bash
    npm install
    ```
3.  **Configure Environment Variables:**
     * If there is a `.env` file, configure it.  Next.js often uses `.env.local`
4.  **Run the Application:** Start the Next.js development server:
    ```bash
    npm run dev
    ```
    The application will be accessible at `http://localhost:3000` (or the port specified in your Next.js configuration).

## Database

### Description
This application uses a PostgreSQL database to store data.  The database schema includes a `users` table with the following columns:

* `id`:  Unique user identifier.
* `first_name`: User's first name.
* `last_name`: User's last name.
* `email`: User's email address.
* `password`: User's password (stored as a hashed value).
* `verified`:  Boolean indicating if the user's email address has been verified.
* `is_active`: Boolean indicating if the user account is active.

###  Setup Instructions
1.  **Install PostgreSQL:** Install PostgreSQL on your system.
2.  **Create a Database:** Create a database for this application (e.g., `acloudbridge_db`).
3.  **Configure Connection:** Set the database connection URL in the backend's `.env` file (see Backend Setup Instructions).  Example:
    ```
    DATABASE_URL=postgres://your_user:your_password@localhost:5432/acloudbridge_db
    ```
4.  **Run Migrations/Create Tables:** The application likely uses an ORM or database migration tool.  Refer to the backend documentation or code for instructions on how to create the database schema (e.g., using `npm run migrate`, or a similar command).
5.  **Seed Data (Optional):** If necessary, seed the database with initial data (e.g., using `npm run seed`).

