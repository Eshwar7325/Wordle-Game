# Wordle Game Project

A full-stack Wordle game built with React (frontend) and Node.js/Express (backend).

## Features
- User authentication (login/signup/guest mode)
- Play Wordle with daily word challenges
- Leaderboard to track top players
- How to Play instructions
- Responsive and modern UI
- Toast notifications for feedback

## Project Structure
```
Backend/
  config.env           # Environment variables for backend
  package.json         # Backend dependencies and scripts
  server.js            # Express server
  sgb-words.txt       # Word list for the game

wordle/
  package.json         # Frontend dependencies and scripts
  vite.config.js       # Vite configuration
  public/              # Static assets
  src/
    App.jsx            # Main React app
    Components/        # React components (Login, Signup, Navbar, etc.)
    assets/            # Images and icons
    ...                # Other React files
```

## Getting Started

### Prerequisites
- Node.js (v16 or higher recommended)
- npm or yarn

### Backend Setup
1. Navigate to the `Backend` folder:
   ```sh
   cd Backend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file (or edit `config.env`) with necessary environment variables (e.g., PORT, DB connection, etc.).
4. Start the backend server:
   ```sh
   npm start
   ```

### Frontend Setup
1. Navigate to the `wordle` folder:
   ```sh
   cd wordle
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the frontend development server:
   ```sh
   npm run dev
   ```
4. Open your browser and go to `http://localhost:5173` (or the port shown in the terminal).

## Usage
- Register or log in to play as a user, or play as a guest.
- Guess the daily word in six tries or less.
- Check the leaderboard to see top scores.
- Read the "How to Play" section for game rules.

## Technologies Used
- **Frontend:** React, Vite, React Router, React Toastify
- **Backend:** Node.js, Express

## License
This project is for educational purposes.
#
