FROM node:20

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the app source code to the working directory
COPY . .

# Expose the port on which your Node.js app is listening
EXPOSE 3000

# Start the Node.js app
CMD [ "npm", "start" ]