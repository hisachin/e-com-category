#!/bin/bash

echo "Entering into the project..."
# Start the backend
echo "Instaling backend app dependencies..."
npm install
echo "Backend app dependencies installed."
echo "Starting backend server..."
node ./src/index.js &

# Start the frontend
cd ./client/e-com
echo "Instaling frontend app dependencies..."
npm install
echo "Frontend app dependencies installed."
echo "Starting frontend server..."
npm start
