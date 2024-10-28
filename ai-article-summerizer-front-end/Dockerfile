# Frontend Dockerfile
FROM node:18 as build
WORKDIR /app

# Copy package.json and package-lock.json, then install dependencies
COPY package*.json ./
RUN npm ci

# Copy the rest of the Angular files to the container
COPY . .

# Build the Angular application with optimized settings
RUN npm run build -- --configuration production --output-path=dist

# Step 2: Set up Nginx to serve the app
FROM nginx:alpine
COPY --from=build /app/dist/ai-article-summerizer-front-end /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80