# BookMyRide

## Overview
**BookMyRide** is an online vehicle rental system designed to simplify the process of renting vehicles for both users and administrators. The application provides a user-friendly interface for booking vehicles and managing rentals. The system consists of a frontend and backend:

- **Frontend:** Developed using React.js and deployed at [BookMyRide Frontend](https://onlinerentalsystembyprabhas.netlify.app/)
- **Backend:** Built using Node.js and MongoDB, deployed at [BookMyRide Backend](https://onlinevehiclerentalsystem.onrender.com/)

## Features
### Home Page
- **Register/Login:** Users can register and log in to their accounts.
- **Admin Login:** Admin credentials must be manually added through the backend (see below for admin details).
- **Session Management:** Tokens expire after 1 hour, prompting a modal to re-login.

### Admin Features
1. **Admin Dashboard:**
   - View all available vehicles with detailed information.
   - Perform CRUD operations on vehicles:
     - **Set Availability:** Mark vehicles as available or unavailable.
     - **Add New Vehicle:** Create new vehicle entries.
     - **Update Vehicle:** Modify existing vehicle details.
     - **Delete Vehicle:** Remove a vehicle from the system.
   
2. **User Management:**
   - Access the **User List** from the dashboard.
   - Delete users from the system.
   - View individual user details, including:
     - User bookings.
     - Comments made by the user.
   - Delete user comments directly from the system.

3. **Admin Credentials:**
   - Email: `sreeramaprabhaskumar18@gmail.com`
   - Password: `Prabhas`

### User Features
1. **Vehicle Booking:**
   - View a grid of available vehicles on the home page.
   - Click **View Details** for more information about a specific vehicle.
   - Select a start and end date/time for booking.
   - Click **Book Now** to confirm the booking (demo: confirmation email sent without payment integration).

2. **Vehicle Reviews:**
   - View other user reviews for a specific vehicle.
   - Add a review for a booked vehicle from the **Dashboard.**

3. **User Dashboard:**
   - Access all previous bookings.
   - Add reviews for booked vehicles.
   - View other reviews for vehicles.
   - Navigate to **Book New Vehicle** to make new bookings.

## Technology Stack
- **Frontend:** React.js, Tailwind CSS
- **Backend:** Node.js, Express.js, MongoDB
- **Authentication:** JWT (JSON Web Tokens)
- **Deployment:**
  - Frontend: Netlify
  - Backend: Render

## Installation
To run the project locally:

### Backend
1. Clone the backend repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   npm start
   ```
4. Ensure MongoDB is running locally or provide a remote MongoDB URI.

### Frontend
1. Clone the frontend repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```

## Admin Instructions
- Use the following credentials to log in as an admin:
  - **Email:** `sreeramaprabhaskumar18@gmail.com`
  - **Password:** `Prabhas`

Admins can manage vehicles and users from the dashboard. Ensure admin credentials are securely handled.

## Demo Links
- **Frontend:** [BookMyRide Frontend](https://onlinerentalsystembyprabhas.netlify.app/)
- **Backend:** [BookMyRide Backend](https://onlinevehiclerentalsystem.onrender.com/)

## Contact
For inquiries or support, contact [Prabhas Kumar Sreerama](mailto:sreeramaprabhaskumar18@gmail.com).

