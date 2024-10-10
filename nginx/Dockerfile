# Use the official nginx base image
FROM nginx:latest

# Copy custom nginx configuration file to the container
COPY nginx.conf /etc/nginx/nginx.conf

# Copy any additional configuration files if needed (optional)
# COPY conf.d /etc/nginx/conf.d

# Expose port 80 for HTTP traffic
EXPOSE 80

# Expose port 443 for HTTPS traffic (if SSL/TLS is added)
# EXPOSE 443

# Start nginx (the official image already uses CMD to start nginx)
