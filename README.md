
---

# Lets Utter - Real-Time Chatting App

## Overview

**Lets Utter** is a real-time chat application built using the MERN stack (MongoDB, Express.js, React.js, and Node.js). The app allows users to communicate in real-time by sending and receiving messages instantly. It provides a clean and intuitive user interface with the ability to select users from a sidebar and engage in one-on-one conversations.

## Features

- **Real-time messaging**: Send and receive messages instantly.
- **User status**: Display user statuses (online/offline).
- **Responsive UI**: A clean and responsive user interface that works across devices.
- **User authentication**: Secure login and logout functionalities.
- **User-specific chats**: Conversations are unique to each user.
- **MERN Stack**: Powered by MongoDB, Express.js, React.js, and Node.js.

## Technologies Used

- **Frontend**: React.js, CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (NoSQL database)
- **Real-time Communication**: Socket.io
- **Styling**: Custom CSS and Tailwind
- **Authentication**: JWT (JSON Web Token) based authentication
- **Development Tools**: Visual Studio Code, MongoDB Atlas, Postman

## Screenshots

### 1. **User Dashboard and Chat Interface**
![Dashboard Screenshot](file-GqiFjL3c24DHrP2CLilMf1uG)

This is the main screen where users can see their contacts on the left and engage in chat on the right.

### 2. **Chat Interface with Selected User**
![Chat with User](file-laJsdJaVA3HF8RQeHPvsFZS7)

Once a user is selected, the chat conversation opens up, and real-time messaging is enabled.

## Installation and Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/lets-utter.git
   ```
   
2. **Navigate to the project directory:**
   ```bash
   cd lets-utter
   ```

3. **Backend Setup (Node.js & Express):**

   - Navigate to the backend folder:
     ```bash
     cd backend
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Create a `.env` file in the backend directory and add the following details:
     ```bash
     MONGO_URI=your_mongo_db_connection_string
     JWT_SECRET=your_jwt_secret
     PORT=8080
     ```
   - Start the backend server:
     ```bash
     npm start
     ```

4. **Frontend Setup (React):**

   - Navigate to the frontend folder:
     ```bash
     cd ../frontend
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Start the React development server:
     ```bash
     npm start
     ```

5. **Running the App:**

   - The frontend will run on `http://localhost:3000`, and the backend API will be available at `http://localhost:5000`.

6. **Socket.io Setup:**

   - Real-time communication is handled by Socket.io, which is already integrated in both the frontend and backend.
   - Ensure both frontend and backend servers are running simultaneously.

## Environment Variables

Create a `.env` file in the `backend` directory and include the following:

```
MONGO_URI=your_mongo_db_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

## Usage

- Open your browser and navigate to `http://localhost:3000`.
- Log in or sign up to start chatting with other users.
- Select a user from the sidebar to start a one-on-one conversation.

## License

This project is licensed under the MIT License.

## Contributing

Feel free to fork the repository and submit pull requests for any improvements, new features, or bug fixes.

---
