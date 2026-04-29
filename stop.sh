#!/bin/bash

echo "Stopping Calcutta Chaat application..."

# Get PIDs of concurrently, vite, and tsx processes related to this project
# We use pgrep to find processes that are running from this directory or have these names
PIDS=$(pgrep -f "concurrently.*npm run" | tr '\n' ' ')
PIDS="$PIDS $(pgrep -f "vite --port=3000" | tr '\n' ' ')"
PIDS="$PIDS $(pgrep -f "tsx watch server" | tr '\n' ' ')"

if [ -z "$(echo $PIDS | xargs)" ]; then
    echo "No running application found."
else
    echo "Killing processes: $PIDS"
    # Kill the processes
    kill $PIDS 2>/dev/null
    
    # Wait a moment for processes to exit
    sleep 2
    
    # Force kill if still running
    STILL_RUNNING=$(pgrep -f "concurrently.*npm run|vite --port=3000|tsx watch server" | tr '\n' ' ')
    if [ ! -z "$(echo $STILL_RUNNING | xargs)" ]; then
        echo "Some processes didn't stop, forcing..."
        kill -9 $STILL_RUNNING 2>/dev/null
    fi
    
    echo "Application stopped successfully."
fi
