# ffmpeg web service

A utility web service for converting audio files

Node.js, Express, FFMPEG, Docker

Currently not suited for scale, async file writes are mildly buggy and in server memory. This service is intended for personal servers or local use
... for now

## Deployed master branch on Digital Ocean

`http://159.89.31.235:49160/`

## Continued Development

[Task Board](https://trello.com/b/I5Eh8JnX/ff-ffmpeg-service)

## API

`POST /mp3` - Convert audio file in request body to mp3 and return result for download

`POST /m4a` - Convert audio file in request body to mp3 and return result for download

`GET /`, `GET /readme` - Web Service Readme

### POST /mp3, POST /m4a

POST to /mp3 or /m4a using Postman or a Curl command:

Include audio file as binary in request body

Postman Ex:

https://www.dropbox.com/s/5exywmaj5o7cdn3/postMp3%20Postman%20Usage.png?dl=0
![img test](https://previews.dropbox.com/p/thumb/AAQ3nknHovQGqEIM9OoqAZOvmT5jvrjPJb-taVD5nawWPf0FWGo8D-Fdx59KDDF5vN3Bx4v9oE3WxeWT1ZBhFsrW8skVLIWi5iGt17gIuxfgLaqYRzpAkUtpV32gi3Ep2KeH62pVBtmCTYwyaswn97yZMkgXrgNrY_5vXOOd5AtQZATm8J_PPAj941F9TvfoK-Gt7etmd9FaNuFoawm8e3Than99DdVbUCrcl_ta0NDb0yzIoLX_mLDLYG07QDGgbfHxQyGDrbC2Db_UA-7kZkClQICZNcgisrIVeLZ0yNjKrVfEajuMTILKDd1KJCX1rAkDdeycqYjYTn9UTwWLNJ6C/p.png?size=2048x1536&size_mode=3)

Curl Ex:

```bash
curl --request POST --data-binary "@file.wav" 127.0.0.1:3000/ -o file.mp3
```

## Installation

Requires local Node and FFMPEG installation.

1. Install FFMPEG https://ffmpeg.org/download.html

2. Install node https://nodejs.org/en/download/
   Using homebrew:

```bash
$ brew install node
```

## Running Service Locally

Navigate to project directory and:

Install dependencies:

```bash
$ npm install
```

Start app:

```bash
$ node app.js
```

Run unit tests with Mocha:

```bash
$ npm run test
```

or

```bash
$ ./node_modules/.bin/mocha
```

## Running Service in a Docker Container Locally

Requires Docker

Install Docker

```
https://www.docker.com
```

Build Docker Image from Dockerfile with a set image tag. ex: bm/ffmpeg

```bash
$ docker build -t <image>/<tag> .
```

Launch Docker Container from Docker Image, exposing port 49160

```bash
$ docker run -p 49160:3000 -d '<image>'/'<tag>'
```

## Deploying Service on Digital Ocean Droplet with Docker

```
$ - local machine
# - ssh-ed machine
```

I am using a 4GB RAM, 2 vCPU Droplet for test deployments
I use the Digital Ocean Docker App Preset Droplet

Create your Droplet

SSH into your Droplet

```bash
$ ssh root@<droplet-ip>
```

Clone this repo

```bash
# git clone https://github.com/benmangold/ffmpeg-service.git
```

```bash
# cd ffmpeg-service
```

Build Docker Image from Dockerfile with a set image tag. ex: bm/ffmpeg

```bash
# docker build -t <image>/<tag> .
```

Launch Docker Container from Docker Image, exposing port 49160

```bash
# docker run -p 49160:3000 -d '<image>'/'<tag>'
```
