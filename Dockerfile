# syntax=docker/dockerfile:1

# Comments are provided throughout this file to help you get started.
# If you need more help, visit the Dockerfile reference guide at
# https://docs.docker.com/engine/reference/builder/

ARG NODE_VERSION=21.2.0

FROM node:${NODE_VERSION} as build

# The directory of the microservice to build in
ARG SERVICE

# Use production node environment by default.
ENV NODE_ENV production

WORKDIR /usr/src/app

# Download dependencies as a separate step to take advantage of Docker's caching.
# Leverage a cache mount to /root/.npm to speed up subsequent builds.
# Leverage a bind mounts to package.json and package-lock.json to avoid having to copy them into
# into this layer.
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=${SERVICE}/package.json,target=${SERVICE}/package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci --omit=''

# Copy the rest of the source files into the image.
COPY package*.json .
COPY types types
COPY ${SERVICE} ${SERVICE}

WORKDIR /usr/src/app/types

RUN npm run build

WORKDIR /usr/src/app/${SERVICE}

RUN npm run build

FROM node:${NODE_VERSION}-alpine

ARG SERVICE=metadata

ENV NODE_ENV production

WORKDIR /usr/src/app

RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=${SERVICE}/package.json,target=${SERVICE}/package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci --omit=dev

# Run the application as a non-root user.
USER node

COPY --from=build /usr/src/app/${SERVICE}/build build
COPY --from=build /usr/src/app/types /usr/src/app/node_modules/types

# Expose the port that the application listens on.
EXPOSE 80

# Run the application.
CMD node build/main.js
