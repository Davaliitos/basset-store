# Use NodeJS base image
FROM node:13

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies by copying
# package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install
RUN cd client && npm install
RUN cd ..

# Copy app source
COPY . .

# Define the Docker image's behavior at runtime
RUN npm build

RUN cd ..
RUN npm install -g serve

CMD ["serve","build"]

]
