Frontend README (React with Vite)
Interior Design Gallery - Frontend
my video link "https://www.loom.com/share/fe6447547b364642bde68372e7f9d0a4?sid=7299bb35-377c-4fe3-b214-02d7616d0e18"
Description
The Interior Design Gallery is a web application that showcases various interior design ideas and inspirations. This repository contains the frontend code, built with React using Vite as the bundler, and provides various pages and components for users to explore.

Project Structure
Components: These are reusable UI components in the application.

footer.jsx: The footer component for the application.
layout.jsx: Provides the layout structure for pages.
navbar.jsx: The navigation bar component.
roomcard.jsx: Displays an individual room design as a card.
roomlist.jsx: Lists all available room designs.
Context: Provides global state management for the application.

userContext.jsx: Manages user authentication and user-related data.
productContext.jsx: Manages product and room-related data.
Pages: These are the different views/pages of the application.

about.jsx: The about page of the application.
home.jsx: The home page with the interior design gallery.
landing.jsx: The welcome page for users after login/signup.
login.jsx: The login page for existing users.
nopage.jsx: The 404 page when a route does not exist.
products.jsx: Displays a list of available products.
profile.jsx: Displays the user's profile information.
sales.jsx: Displays the sales information.
signup.jsx: The signup page for new users.
App.jsx: The main entry point for the React application that contains routing and the overall layout of the application.

Dependencies
The following dependencies are required to run the frontend:

React: A JavaScript library for building user interfaces.
Vite: A fast build tool that provides a faster development experience compared to Webpack.
react-router-dom: For handling routing and navigation in the app.
axios: A promise-based HTTP client for making requests to the backend API.
tailwindcss: For styling the UI components.
@vitejs/plugin-react: Vite plugin for React support.
Installation
1. Clone the repository
bash
Copy
git clone hhttps://github.com/kairupaul77/Interior-Design-Gallery.git
cd interior-design-gallery-frontend
2. Install the dependencies
bash
Copy
npm install
3. Run the Development Server
bash
Copy
npm run dev
The application will now be running at http://localhost:3000.

Configuration
Ensure to configure your backend API URL correctly when making requests from the frontend. This can be done by changing the URL in the fetch or axios requests in your context files (e.g., userContext.jsx).

Scripts
npm run dev: Starts the development server with hot-reloading.
npm run build: Builds the app for production.
npm run preview: Preview the production build locally.