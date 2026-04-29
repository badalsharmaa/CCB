#!/bin/bash

# Ensure dependencies are installed
if [ ! -d "node_modules" ]; then
    echo "node_modules not found. Installing dependencies..."
    npm install
fi

# Check if concurrently is available in node_modules
if [ ! -f "./node_modules/.bin/concurrently" ]; then
    echo "concurrently not found. Installing..."
    npm install -D concurrently
fi

# Launch the application (frontend and server)
echo "Launching Calcutta Chaat..."
npm run dev:full
