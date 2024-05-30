Project Name: ReactJS + Node Authentication System

Description:
This project is a basic authentication system built using ReactJS for the frontend, Node.js for the backend, and MySQL for the database. It includes registration pages for both customers and admins, with email verification and role assignment. Additionally, there is an admin login page to manage the system.



### Database Setup:

Ensure you have MySQL installed on your system.
Create a new database named "auth_db".


### Installation:

Clone the repository from GitHub Repository Link.
Navigate to the project directory.

Install npm dependencies: npm install (for installation all dependencies)

Start the application:  npm start (here we can start both server concurrently using npm start)

This command will concurrently start both the frontend and backend servers.

### Usage:

Open your web browser and go to http://localhost:3000 to access the application.
Register as a customer or admin by filling out the required fields (First Name, Last Name, Email, Password) on the respective registration pages.
Email verification will be sent upon registration.
Log in as an admin using the admin login page with your registered email and password.
If attempting to log in as a customer from the admin login page, an error message will be displayed.


### File Structure:

client: Contains the ReactJS frontend code.
server: Contains the Node.js backend code.
database: Contains the SQL script for database setup.
