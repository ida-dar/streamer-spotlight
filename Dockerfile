# Stage 1: Build the React frontend
FROM node:14-alpine AS frontend

WORKDIR /usr/app/client
COPY ./client/package*.json ./
RUN npm install
COPY ./client ./
RUN npm run build

# Stage 2: Build the Express backend
FROM node:14-alpine

WORKDIR /usr/app
COPY ./package*.json ./
RUN npm install
COPY . .

# Use the built frontend from Stage 1
COPY --from=frontend /usr/app/client/build ./client/build

# Expose port 8000 for the backend
EXPOSE 8000

# Start the backend server
CMD ["npm", "start"]
