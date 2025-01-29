# Chess Multiplayer Game

## Overview

This repository contains a real-time multiplayer chess game built using TypeScript, Node.js, and React. Players can connect via their browsers and enjoy a seamless chess experience powered by WebSockets for real-time communication.

## Architecture

### System Design

- **Players**: The game supports two players connecting through their respective browsers.
- **Communication**: WebSockets are used to create a persistent connection between the clients and the server, allowing for real-time event exchange.

### Events

1. **init_game**: 
   - Triggered when a player clicks "Play."
   - The server connects the player to either a waiting participant or creates a new game session.

2. **Game State Management**:
   - The server maintains the current state of the game in an in-memory variable.
   - Move validation and game status checks (check/checkmate) are handled by the server.

### Considerations

- **Recovery Mechanism**: In-memory storage is susceptible to data loss if the server crashes. Future enhancements should focus on persistent storage solutions.
- **Scaling Mechanism**: The current design is sufficient for two players, but future scalability needs to be addressed.

## Getting Started

### Backend Setup

1. **Initialize Project**:
   ```bash
   npm init -y
   npx tsc --init

2. **Configure Typescript**:
   Change ```outDir``` to ```./dist``` and ```rootDir``` to ```./src``` in tsconfig.json.

3. Create Project Structure
   ```bash
   mkdir src
   touch src/index.ts

4. Install WebSocket Library:
   ```bash
   npm install ws
   npm install @types/ws

5. Compile and Run:
   ```bash
   tsc -b
   node dist/index.js

6. Test the Server: Use a tool like Hoppscotch to test WebSocket connections.
   
7. Implement Game Logic:

  Create GameManager.ts.
  Use chess.js for board logic:
  ```bash
    npm install chess.js
  ```

### Frontend Setup

1. **Initialize React Project**:
   ```bash
   npm create vite@latest frontend
   cd frontend
   npm install
   npm run dev

2. Tailwind CSS
  ```bash
  npm install -D tailwindcss postcss autoprefixer
  npx tailwindcss init -p
  ```

3. React router dom
```bash
npm install react-router-dom
```
4. Add Chess.js
  ```bash
   npm install chess.js
```

## Future Enhancements

- Implement a recovery mechanism for game state persistence.
- Explore scaling solutions for handling more players and games.







   

