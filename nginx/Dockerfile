# Use the official nginx base image
FROM nginx:latest

# Accept build-time arguments
ARG SSL_CERT_NAME
ARG SSL_KEY_NAME

# Set environment variables to persist in the container for runtime
ENV SSL_CERT_NAME=${SSL_CERT_NAME}
ENV SSL_KEY_NAME=${SSL_KEY_NAME}

# Copy custom nginx configuration file template to the container
COPY nginx.conf /etc/nginx/nginx.conf.template

# Copy SSL certificates using the build arguments
COPY certs/$SSL_CERT_NAME /etc/ssl/certs/$SSL_CERT_NAME
COPY certs/$SSL_KEY_NAME /etc/ssl/private/$SSL_KEY_NAME

# Install envsubst for environment variable substitution
RUN apt-get update && apt-get install -y gettext-base

# Substitute environment variables in nginx.conf at runtime and start nginx
CMD envsubst '$SSL_CERT_NAME $SSL_KEY_NAME' < /etc/nginx/nginx.conf.template > /etc/nginx/nginx.conf && nginx -g 'daemon off;'

# Expose ports for HTTP and HTTPS
EXPOSE 80
EXPOSE 443
