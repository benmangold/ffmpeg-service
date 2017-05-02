FROM          ubuntu:16.04
MAINTAINER    Luca Silverentand <luca@appcompany.io>


ENV FFMPEG_VERSION=3.3 \
    YASM_VERSION=1.3.0 \
    OGG_VERSION=1.3.2 \
    VORBIS_VERSION=1.3.5 \
    THEORA_VERSION=1.1.1 \
    LAME_VERSION=3.99.5 \
    OPUS_VERSION=1.1.3 \
    FAAC_VERSION=1.28 \
    VPX_VERSION=1.6.0 \
    XVID_VERSION=1.3.4 \
    FDKAAC_VERSION=0.1.4 \
    X265_VERSION=2.1 \
    X264_VERSION=20160826-2245-stable \
    NODEJS_VERSION=7.1.0 \
    PKG_CONFIG_PATH=/usr/local/lib/pkgconfig \
    SRC=/usr/local

RUN buildDeps="autoconf automake cmake curl bzip2 \
    g++ gcc git libtool make nasm perl pkg-config \
    python libssl-dev zlib1g-dev" && \
    export MAKEFLAGS="-j$(($(nproc) + 1))" && \
    apt-get -yqq update && \
    apt-get install -yq --no-install-recommends ${buildDeps} ca-certificates

## yasm http://yasm.tortall.net/
RUN DIR=$(mktemp -d) && cd ${DIR} && \
    curl -sL https://github.com/yasm/yasm/archive/v${YASM_VERSION}.tar.gz | \
    tar -zx --strip-components=1 && \
    ./autogen.sh && \
    ./configure --prefix="${SRC}" --bindir="${SRC}/bin" --datadir=${DIR} && \
    make && \
    make install && \
    make distclean && \
    rm -rf ${DIR}

## x264 http://www.videolan.org/developers/x264.html
RUN DIR=$(mktemp -d) && cd ${DIR} && \
    curl -sL https://ftp.videolan.org/pub/videolan/x264/snapshots/x264-snapshot-${X264_VERSION}.tar.bz2 | \
    tar -jx --strip-components=1 && \
    ./configure --prefix="${SRC}" --bindir="${SRC}/bin" --enable-static && \
    make && \
    make install && \
    make distclean && \
    rm -rf ${DIR}

## x265 http://x265.org/
RUN DIR=$(mktemp -d) && cd ${DIR} && \
    curl -sL https://download.videolan.org/pub/videolan/x265/x265_${X265_VERSION}.tar.gz  | \
    tar -zx && \
    cd x265_${X265_VERSION}/build/linux && \
    ./multilib.sh && \
    make -C 8bit install && \
    rm -rf ${DIR}

## libogg https://www.xiph.org/ogg/
RUN DIR=$(mktemp -d) && cd ${DIR} && \
    curl -sL http://downloads.xiph.org/releases/ogg/libogg-${OGG_VERSION}.tar.gz | \
    tar -zx --strip-components=1 && \
    ./configure --prefix="${SRC}" --bindir="${SRC}/bin" --disable-shared --datadir=${DIR} && \
    make && \
    make install && \
    make distclean && \
    rm -rf ${DIR}

## libopus https://www.opus-codec.org/
RUN DIR=$(mktemp -d) && cd ${DIR} && \
    curl -sL http://downloads.xiph.org/releases/opus/opus-${OPUS_VERSION}.tar.gz | \
    tar -zx --strip-components=1 && \
    autoreconf -fiv && \
    ./configure --prefix="${SRC}" --disable-shared --datadir="${DIR}" && \
    make && \
    make install && \
    make distclean && \
    rm -rf ${DIR}

## libvorbis https://xiph.org/vorbis/
RUN DIR=$(mktemp -d) && cd ${DIR} && \
    curl -sL http://downloads.xiph.org/releases/vorbis/libvorbis-${VORBIS_VERSION}.tar.gz | \
    tar -zx --strip-components=1 && \
    ./configure --prefix="${SRC}" --with-ogg="${SRC}" --bindir="${SRC}/bin" \
    --disable-shared --datadir="${DIR}" && \
    make && \
    make install && \
    make distclean && \
    rm -rf ${DIR}

#@ libtheora http://www.theora.org/
RUN DIR=$(mktemp -d) && cd ${DIR} && \
    curl -sL http://downloads.xiph.org/releases/theora/libtheora-${THEORA_VERSION}.tar.bz2 | \
    tar -jx --strip-components=1 && \
    ./configure --prefix="${SRC}" --with-ogg="${SRC}" --bindir="${SRC}/bin" \
    --disable-shared --datadir="${DIR}" && \
    make && \
    make install && \
    make distclean && \
    rm -rf ${DIR}

## libvpx https://www.webmproject.org/code/
RUN DIR=$(mktemp -d) && cd ${DIR} && \
    curl -sL https://codeload.github.com/webmproject/libvpx/tar.gz/v${VPX_VERSION} | \
    tar -zx --strip-components=1 && \
    ./configure --prefix="${SRC}" --enable-vp8 --enable-vp9 --disable-examples --disable-docs && \
    make && \
    make install && \
    make clean && \
    rm -rf ${DIR}

## libmp3lame http://lame.sourceforge.net/
RUN DIR=$(mktemp -d) && cd ${DIR} && \
    curl -sL https://downloads.sf.net/project/lame/lame/${LAME_VERSION%.*}/lame-${LAME_VERSION}.tar.gz | \
    tar -zx --strip-components=1 && \
    ./configure --prefix="${SRC}" --bindir="${SRC}/bin" --disable-shared --enable-nasm --datadir="${DIR}" && \
    make && \
    make install && \
    make distclean&& \
    rm -rf ${DIR}

## xvid https://www.xvid.com/
RUN DIR=$(mktemp -d) && cd ${DIR} && \
    curl -sL http://downloads.xvid.org/downloads/xvidcore-${XVID_VERSION}.tar.gz | \
    tar -zx && \
    cd xvidcore/build/generic && \
    ./configure --prefix="${SRC}" --bindir="${SRC}/bin" --datadir="${DIR}" && \
    make && \
    make install && \
    rm -rf ${DIR}

## fdk-aac https://github.com/mstorsjo/fdk-aac
RUN DIR=$(mktemp -d) && cd ${DIR} && \
    curl -sL https://github.com/mstorsjo/fdk-aac/archive/v${FDKAAC_VERSION}.tar.gz | \
    tar -zx --strip-components=1 && \
    autoreconf -fiv && \
    ./configure --prefix="${SRC}" --disable-shared --datadir="${DIR}" && \
    make && \
    make install && \
    make distclean && \
    rm -rf ${DIR}

## ffmpeg https://ffmpeg.org/
RUN DIR=$(mktemp -d) && cd ${DIR} && \
    curl -sL http://ffmpeg.org/releases/ffmpeg-${FFMPEG_VERSION}.tar.gz | \
    tar -zx --strip-components=1 && \
    ./configure --prefix="${SRC}" \
    --extra-cflags="-I${SRC}/include" \
    --extra-ldflags="-L${SRC}/lib" \
    --bindir="${SRC}/bin" \
    --disable-doc \
    --extra-libs=-ldl \
    --enable-version3 \
    --enable-libfdk_aac \
    --enable-libmp3lame \
    --enable-libopus \
    --enable-libtheora \
    --enable-libvorbis \
    --enable-libvpx \
    --enable-libx264 \
    --enable-libx265 \
    --enable-libxvid \
    --enable-gpl \
    --enable-avresample \
    --enable-postproc \
    --enable-nonfree \
    --disable-debug \
    --enable-small \
    --enable-openssl && \
    make && \
    make install && \
    make distclean && \
    hash -r && \
    cd tools && \
    make qt-faststart && \
    cp qt-faststart ${SRC}/bin && \
    rm -rf ${DIR}

## node.js
RUN DIR=$(mktemp -d) && cd ${DIR} && \
    curl -s http://nodejs.org/dist/v${NODEJS_VERSION}/node-v${NODEJS_VERSION}.tar.gz | tar zxvf - -C . && \
    cd node-v* && \
    ./configure && \
    make && \
    make install && \
    rm -rf ${DIR}

## cleanup
RUN cd && \
    apt-get purge -y ${buildDeps} && \
    apt-get autoremove -y && \
    apt-get clean -y && \
    rm -rf /var/lib/apt/lists && \
    ldconfig && \
    ffmpeg -buildconf
    
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