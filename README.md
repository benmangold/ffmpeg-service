# postMp3 ffmpeg web service

An FFMPEG web service for converting audio files to mp3

## Local Installation

Requires FFMPEG installation to use locally.

>> https://ffmpeg.org/download.html

Install node, dependencies, and start app:

> $ sh install-node-npm.sh
> $ npm install
> $ node app.js

### USAGE

Include file as binary in request body using Postman or Curl command.

![PostMp3 Postman Usage](../../Dropbox/Screenshots/postMp3%20Postman%20Usage.png)

curl --request POST --data-binary "@file.wav"  127.0.0.1:3000/ -o file.mp3