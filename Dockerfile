# Use the official Node.js image as a base
FROM node:20

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if available) to the working directory
COPY package*.json ./

# Install the app dependencies
RUN npm install

# Copy the entire source code to the working directory
COPY . .

# Build the TypeScript code
RUN npm run build

# Expose the port the app runs on
EXPOSE 3010

# Start the server
CMD ["node", "build/src/server.js"]