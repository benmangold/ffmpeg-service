# postMp3 ffmpeg web service

An FFMPEG web service for converting audio files to mp3

##Endpoints

POST /mp3 - Convert audio file in request body to mp3 and return result for download

GET /, /readme - Web Service Readme

GET /upload - Upload file form

### USAGE

POST to /mp3 using Postman a Curl command.

Include audio file as binary in request body 

Postman Ex: 

https://www.dropbox.com/s/5exywmaj5o7cdn3/postMp3%20Postman%20Usage.png?dl=0

Curl Ex:

> curl --request POST --data-binary "@file.wav"  127.0.0.1:3000/ -o file.mp3

## Running Local Node.js Web Service

Requires local Node and FFMPEG installation.

Install FFMPEG
> https://ffmpeg.org/download.html

Install node
> https://nodejs.org/en/download/
> Using homebrew: $ brew install node

Install dependencies, and start app:
> $ npm install
> $ node app.js

## Running Local Docker Container

Requires Docker

Install Docker
> https://www.docker.com

Build Docker Image from Dockerfile
> $ docker build -t <Image>/<Tag> .

Launch Docker Container from Docker Image, exposing port 49160
> docker run -p 49160:3000 -d <Image>/<Tag>	
	