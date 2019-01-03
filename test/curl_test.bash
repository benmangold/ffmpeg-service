#!/usr/bin/env bash 

# a local load test 

# this script depends on .wav files i have ignored in audio/
# run from multiple terminals for best results

curl --request POST --data-binary "@test/test.wav" 127.0.0.1:3000/mp3 -o audio/output/file.mp3
curl --request POST --data-binary "@test/test.wav" 127.0.0.1:3000/m4a -o audio/output/file.m4a

# include a.wav - i.wav in audio/input/ and uncomment the lines below to easily run your own audio

# curl --request POST --data-binary "@audio/input/a.wav" 127.0.0.1:3000/mp3 -o audio/output/a.mp3
# curl --request POST --data-binary "@audio/input/a.wav" 127.0.0.1:3000/m4a -o audio/output/a.m4a
# curl --request POST --data-binary "@audio/input/b.wav" 127.0.0.1:3000/mp3 -o audio/output/b.mp3
# curl --request POST --data-binary "@audio/input/b.wav" 127.0.0.1:3000/m4a -o audio/output/b.m4a
# curl --request POST --data-binary "@audio/input/c.wav" 127.0.0.1:3000/mp3 -o audio/output/c.mp3
# curl --request POST --data-binary "@audio/input/c.wav" 127.0.0.1:3000/m4a -o audio/output/c.m4a
# curl --request POST --data-binary "@audio/input/d.wav" 127.0.0.1:3000/mp3 -o audio/output/d.mp3
# curl --request POST --data-binary "@audio/input/d.wav" 127.0.0.1:3000/m4a -o audio/output/d.m4a
# curl --request POST --data-binary "@audio/input/e.wav" 127.0.0.1:3000/mp3 -o audio/output/e.mp3
# curl --request POST --data-binary "@audio/input/e.wav" 127.0.0.1:3000/m4a -o audio/output/e.m4a
# curl --request POST --data-binary "@audio/input/f.wav" 127.0.0.1:3000/mp3 -o audio/output/f.mp3
# curl --request POST --data-binary "@audio/input/f.wav" 127.0.0.1:3000/m4a -o audio/output/f.m4a
# curl --request POST --data-binary "@audio/input/g.wav" 127.0.0.1:3000/mp3 -o audio/output/g.mp3
# curl --request POST --data-binary "@audio/input/g.wav" 127.0.0.1:3000/m4a -o audio/output/g.m4a
# curl --request POST --data-binary "@audio/input/h.wav" 127.0.0.1:3000/mp3 -o audio/output/h.mp3
# curl --request POST --data-binary "@audio/input/h.wav" 127.0.0.1:3000/m4a -o audio/output/h.m4a
# curl --request POST --data-binary "@audio/input/i.wav" 127.0.0.1:3000/mp3 -o audio/output/i.mp3
# curl --request POST --data-binary "@audio/input/i.wav" 127.0.0.1:3000/m4a -o audio/output/i.m4a
