#!/bin/bash
echo "Stopping the API server..."
# Find the process running uvicorn and kill it
PID=$(ps aux | grep '[u]vicorn' | awk '{print $2}')
if [ -z "$PID" ]; then
    echo "Server not found or already stopped."
else
    kill $PID
    echo "Server stopped successfully."
fi
