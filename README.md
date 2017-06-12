# postMp3 ffmpeg web service

An FFMPEG web service for converting audio files

##Endpoints

> POST /mp3 - Convert audio file in request body to mp3 and return result for download

> POST /m4a - Convert audio file in request body to mp3 and return result for download

> GET /, /readme - Web Service Readme

### /mp3, /m4a

POST to /mp3 or /m4a using Postman or a Curl command:

Include audio file as binary in request body

Postman Ex: 

https://www.dropbox.com/s/5exywmaj5o7cdn3/postMp3%20Postman%20Usage.png?dl=0

Curl Ex:

> curl --request POST --data-binary "@file.wav"  127.0.0.1:3000/ -o file.mp3


## Installation

Requires local Node and FFMPEG installation.

1) Install FFMPEG https://ffmpeg.org/download.html

2) Install node https://nodejs.org/en/download/
Using homebrew:
> $ brew install node

## Dev - Running Local Node.js Web Service

Navigate to project directory and:

Install dependencies:
> $ npm install

Start app:
> $ node app.js

Check for errors with ESLint:
> $ ./node_modules/.bin/eslint .

Run unit tests with Mocha:
> $ ./node_modules/.bin/mocha

## Running Local Docker Container

Requires Docker

Install Docker
> https://www.docker.com

Build Docker Image from Dockerfile
> $ docker build -t 'Image'/'Tag' .

Launch Docker Container from Docker Image, exposing port 49160
> docker run -p 49160:3000 -d 'Image'/'Tag'	