# ffmpeg-service
An FFMPEG web service for audio utilities. Ex. Converting .wav files to .mp3 files

Requires FFMPEG installed locally.

>> https://ffmpeg.org/download.html

## Installation

Install node and npm:

> $ sh install-node-npm.sh

## Running the service

> $ npm install

> $ node app.js

### POST /wavToMp3

Include file as binary in request body.  Use CURL or Postman with the service running locally.