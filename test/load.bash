#!/usr/bin/env bash 

# a local load test 

# this script depends on .wav files i have ignored in loadTestAudio/
# include a.wav - i.wav in loadTestAudio/ and uncomment the lines below to run it yourself

curl --request POST --data-binary "@test/test.wav" 127.0.0.1:3000/mp3 -o loadTestAudio/file.mp3
curl --request POST --data-binary "@test/test.wav" 127.0.0.1:3000/m4a -o loadTestAudio/file.m4a
# curl --request POST --data-binary "@loadTestAudio/a.wav" 127.0.0.1:3000/mp3 -o loadTestAudio/a.mp3
# curl --request POST --data-binary "@loadTestAudio/a.wav" 127.0.0.1:3000/m4a -o loadTestAudio/a.m4a
# curl --request POST --data-binary "@loadTestAudio/b.wav" 127.0.0.1:3000/mp3 -o loadTestAudio/b.mp3
# curl --request POST --data-binary "@loadTestAudio/b.wav" 127.0.0.1:3000/m4a -o loadTestAudio/b.m4a
# curl --request POST --data-binary "@loadTestAudio/c.wav" 127.0.0.1:3000/mp3 -o loadTestAudio/c.mp3
# curl --request POST --data-binary "@loadTestAudio/c.wav" 127.0.0.1:3000/m4a -o loadTestAudio/c.m4a
# curl --request POST --data-binary "@loadTestAudio/d.wav" 127.0.0.1:3000/mp3 -o loadTestAudio/d.mp3
# curl --request POST --data-binary "@loadTestAudio/d.wav" 127.0.0.1:3000/m4a -o loadTestAudio/d.m4a
# curl --request POST --data-binary "@loadTestAudio/e.wav" 127.0.0.1:3000/mp3 -o loadTestAudio/e.mp3
# curl --request POST --data-binary "@loadTestAudio/e.wav" 127.0.0.1:3000/m4a -o loadTestAudio/e.m4a
# curl --request POST --data-binary "@loadTestAudio/f.wav" 127.0.0.1:3000/mp3 -o loadTestAudio/f.mp3
# curl --request POST --data-binary "@loadTestAudio/f.wav" 127.0.0.1:3000/m4a -o loadTestAudio/f.m4a
# curl --request POST --data-binary "@loadTestAudio/g.wav" 127.0.0.1:3000/mp3 -o loadTestAudio/g.mp3
# curl --request POST --data-binary "@loadTestAudio/g.wav" 127.0.0.1:3000/m4a -o loadTestAudio/g.m4a
# curl --request POST --data-binary "@loadTestAudio/h.wav" 127.0.0.1:3000/mp3 -o loadTestAudio/h.mp3
# curl --request POST --data-binary "@loadTestAudio/h.wav" 127.0.0.1:3000/m4a -o loadTestAudio/h.m4a
# curl --request POST --data-binary "@loadTestAudio/i.wav" 127.0.0.1:3000/mp3 -o loadTestAudio/i.mp3
# curl --request POST --data-binary "@loadTestAudio/i.wav" 127.0.0.1:3000/m4a -o loadTestAudio/i.m4a
