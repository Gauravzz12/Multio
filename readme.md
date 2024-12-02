
# Multio - Multiplayer Gaming Platform

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)  
*Real-time multiplayer gaming platform featuring games like Rock-Paper-Scissors and Tic-Tac-Toe and many more.*

---

![Multio Banner Placeholder](https://socialify.git.ci/Gauravzz12/Multio/image?description=1&font=Rokkitt&language=1&name=1&owner=1&stargazers=1&theme=Dark) 

## Table of Contents

1. [Overview](#overview)
2. [Features](#features)
3. [Tech Stack](#tech-stack)
4. [Directory Structure](#directory-structure)
5. [Setup and Installation](#setup-and-installation)
6. [Environment Variables](#environment-variables)
7. [Usage](#usage)
8. [Screenshots](#screenshots)
9. [Contributing](#contributing)
10. [License](#license)

---

## Overview

**Multio** is a modern web-based multiplayer gaming platform that allows users to engage in real-time matches of classic games. With features like secure authentication, responsive design, and scalable architecture, Multio provides an engaging experience for gamers worldwide.

---

## Features

- **Authentication**
  - Email/Password login
  - OAuth login (Google and GitHub)
  - Guest mode
  - Automatic token refresh system
- **Game Modes**
  - Rock Paper Scissors (RPS)
    - Real-time multiplayer
    - Score tracking
    - Visual feedback for choices
  - Tic Tac Toe (TTT)
    - Turn-based gameplay
    - Real-time multiplayer matches
    - Win detection
- **Matchmaking**
  - Online matchmaking with random players
  - Custom room creation
  - Private match support with room codes
- **User Interface**
  - Fully responsive
  - Animated transitions
  - Real-time game state indicators
  - Toast notifications for feedback

---

## Tech Stack

### Frontend
- **React** (with Vite for fast builds)
- **Redux Toolkit** (state management)
- **Socket.IO Client** (real-time updates)
- **TailwindCSS** (styling)
- **React Toastify** (notifications)
- **React Router** (navigation)

### Backend
- **Node.js/Express** (server)
- **Socket.IO** (real-time communication)
- **PostgreSQL** (database)
- **Passport.js** (OAuth)
- **JWT** (session management)

---

## Directory Structure

```plaintext
client/
  ├── src/
  │   ├── app/          # Redux store setup
  │   ├── components/   # Reusable components
  │   ├── features/     # Feature-specific components
  │   ├── pages/        # Route pages
  │   └── hooks/        # Custom hooks

server/
  ├── api/              # REST API endpoints
  │   ├── controllers/
  │   ├── routes/
  │   └── db/
  └── socket/           # Socket.IO handlers
      └── controllers/
```

---

## Setup and Installation

### Prerequisites
- Node.js (>= 18.x)
- PostgreSQL (>= 14.x)
- Git
- [Netlify CLI](https://docs.netlify.com/cli/get-started/) (optional for local frontend hosting)

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/Gauravzz12/Multio.git
   cd multio
   ```

2. Install dependencies for both client and server:
   ```bash
   cd client && npm install
   cd ../server && npm install
   ```

3. Set up the PostgreSQL database:
   - Create a new database named `userDB`.
4. Configure environment variables (see below).

5. Start the backend:
   ```bash
   cd server
   npm run dev
   ```

6. Start the frontend:
   ```bash
   cd ../client
   npm run dev
   ```

---

## Environment Variables

### Server (`server/.env`)
```plaintext
PORT=5000
DB_HOST=your-database-host
DB_PORT=5432
DB_USER=your-database-username
DB_PASSWORD=your-database-password
DB_NAME=userDB
JWT_SECRET=your-jwt-secret
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret
```


---

## Usage

1. Open your browser and navigate to `http://localhost:5173` for the frontend.
2. Sign up, log in, or play as a guest.
3. Select a game mode (RPS or TTT) and start playing with other users.

---

## Screenshots

### Home Page  
![Home Page Placeholder](https://i.ibb.co/JCJHXx1/image.png) 
![Home Page Placeholder](https://i.ibb.co/0X2jNBD/image.png) 
![Home Page Placeholder](https://i.ibb.co/njcRWJS/image.png) 


### Gameplay  
![Gameplay Placeholder](https://i.ibb.co/4YDGGpm/image.png)
![Gameplay Placeholder](https://i.ibb.co/zhkthpV/image.png)

---

## Contributing

1. Fork the repository.
2. Create a new branch for your feature:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add new feature"
   ```
4. Push to your fork:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
