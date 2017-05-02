FROM          centos:7
MAINTAINER    Raman Nanda <Raman148@gmail.com>


ENV           FFMPEG_VERSION=2.8.1 \
              MPLAYER_VERSION=1.2  \
              YASM_VERSION=1.3.0   \
              OGG_VERSION=1.3.2    \
              VORBIS_VERSION=1.3.5 \
              THEORA_VERSION=1.1.1 \
              LAME_VERSION=3.99.5  \
              OPUS_VERSION=1.1     \
              FAAC_VERSION=1.28    \
              VPX_VERSION=1.4.0    \
              XVID_VERSION=1.3.4   \
              FDKAAC_VERSION=0.1.4 \
              X265_VERSION=1.8     \
              NODEJS_VERSION=7.1.0 

COPY          run.sh /tmp/run.sh

# See https://github.com/Raman148/ffmpeg-nodejs/blob/master/run.sh
RUN           bash /tmp/run.sh

# Let's make sure the app built correctly
RUN           ffmpeg -buildconf

# Make sure Node.js is installed
RUN           node -v
RUN           npm -v

#Create app dir
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

#Install Dependencies
COPY package.json /usr/src/app
RUN npm install

#Bundle app source
COPY . /usr/src/app

EXPOSE 3000
CMD [ "node", "app.js" ]