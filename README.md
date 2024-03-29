# ReqRes Web Application - Christian Cho

![Alt text](/reqres.png?raw=true "Mastermind")

## Description

The ReqRes Web Application is about displaying a list of users from the ReqRes API and with the functionality of adding new users to the list.

### Project Structure:

-   Frontend: The project is built using a React application structure powered by Vite using the latest version.
-   Backend: For handling data and requests, the project relies on an ExpressJS server that connects to the ReqRes API.

### Prerequisites/Libraries

Here's a list of the dependencies used:

Frontend

-   @reduxjs/toolkit: ^2.2.1, - Used for state management in the application.
-   react": ^18.2.0,
-   react-dom": ^18.2.0, - React DOM is a package that serves as the entry point to the DOM and server renderers for React
-   react-redux": ^9.1.0 - This library provides bindings for using Redux with React.

Backend

-   axios: ^1.6.7, - Used for making for making requests to reqres endpoints.
-   body-parser: ^1.20.2, - Used for parsing request bodies in backend.
-   cors: ^2.8.5, - Utilized for allowing restricted resources to be accessed within development.
-   express: ^4.18.2,
-   nodemon: ^3.0.3 - Used for monitoring changes in files of the backend.

### Installation

#### Run the backend before running the frontend 

Frontend

1. Clone or download the project from the Github repository (The frontend and backend code are contained in a single folder).
2. Open the terminal window.
3. Navigate to the frontend directory on the terminal.
4. Install dependencies using <code>npm install</code> or yarn install on the frontend folder or directory.
5. Type and run the command <code>npm run dev</code> in the terminal.

Backend

1. Clone or download the project from the Github repository (The frontend and backend code are contained in a single folder).
2. Open the terminal window.
3. Navigate to the backend directory on the terminal.
4. Install dependencies using <code>npm install</code> or yarn install on the backend folder or directory.
5. Type and run the command <code>npm start</code> in the terminal.

### Testing

Endpoints are tested using Jest and Supertest for the APIs.

Running the test:

1. To execute the test open the terminal window.
2. Type and run the command <code>npm test</code>.

### How to Use

1. Navigate to </code>http://localhost:5173/</code>. The web application should load.
2. To access the endpoints use base url of </code>http://localhost:3010</code> and add the succeeding access points.
3. Start playing around and navigating the website.

## Acknowledgements

Thank you to the hiring managers and lead developers who has taken the time to review this project and provide feedback. Grateful and appreciate the opportunity.
