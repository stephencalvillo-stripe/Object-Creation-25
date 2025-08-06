#!/bin/bash
echo "Starting API server in the background..."
# Start the server and send it to the background
./start_api.sh &
# Give the server a moment to start up
sleep 3
echo "Opening frontend prototype in your browser..."
open frontend/index.html
