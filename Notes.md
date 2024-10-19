### This is for my own understanding !!!

# System Design
    2 players : browser1, browser2
    how do u think they should talk to the backend? - http server or anything else
    note : this is a real time game - there are lot of events that need to happen or exchanged
    so we need to use a server that lets us create a more persistant connection - for that we'll be using websockets
    most real time games uses this

# Events 
    init_game : when the user clicks on the play, the browser is letting the server know that i want to initialise the game, please connect me to either a pending participant that might be waiting or make me the pending participant, i am ready to start my chess game

    whenever the same init_game comes from the another browser, browser1 waiting, start a game b/w socket from b1 and b2

    server have to save the current state of the game in an inmemory variable - this approach is good enough to start

    whenvever someone makes a move - the server needs to validate the move and store the state in inmemory variable,
    check for check and checkmate

    this is decent and not great because, if the server ever dies, then we'll loose all of this inmemory information and then we cannot recreate it

# Why not we maintaining a queue just using variable to store the browser sockets? 
    because there's no need of it, at any point max there will be only person who is waiting to be connected to the game.

# We need to build these functionalities on top of these :
    1. recovery mechanism
    2. scaling mechanism

# Steps : 
    frontend is going to be simple react project
    backend is going to be nodejs process

    backend first:
    initalise package.json : npm init -y
    initialise typscript : npx tsc --init
    change in tsconfig.json : change outDir to ./dist and rootDir to ./src
    make src folder
    make index.ts
    ws in nodejs(librabry) : copy code from ws github repo (simple server)
    npm i ws
    npm i @types/ws
    tsc -b  to compile this server
    node dist/index.js to start it
    to test the server using dummy client : hoppscotch : it worked
    new class GameManager.ts
    when two users are there start game, game class
    use the library chess.js for board logic
    npm i chess.js

    frontend:
    cd ..
    initialise empty react project
    npm create vite@latest
    cd frontend
    npm install
    npm run dev
    App.tsx
    add two dependencies :
    1. tailwind
    npm install -D tailwindcss postcss autoprefixer
    npx tailwindcss init -p
    update tailwind.config.js
    update index.css
    npm run dev
    2. react router dom
    npm i react-router-dom
    folder: screens
    frontend npm i chess.js



# Problems : 
1. recovery mechanism: currently the sever is stateful, if the server is gone, the state of the game will also be gone so to make it stateless introduce a database
this helps in resuming the game
--- `Akshat Sharma`