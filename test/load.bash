#!/usr/bin/env bash 

# a local load test 

# this script depends on .wav files i have ignored in loadTestAudio/
# include a.wav - i.wav in loadTestAudio/input/ and uncomment the lines below to run it yourself

# curl --request POST --data-binary "@test/test.wav" 127.0.0.1:3000/mp3 -o loadTestAudio/output/file.mp3
# curl --request POST --data-binary "@test/test.wav" 127.0.0.1:3000/m4a -o loadTestAudio/output/file.m4a
curl --request POST --data-binary "@loadTestAudio/input/a.wav" 127.0.0.1:3000/mp3 -o loadTestAudio/output/a.mp3
curl --request POST --data-binary "@loadTestAudio/input/a.wav" 127.0.0.1:3000/m4a -o loadTestAudio/output/a.m4a
curl --request POST --data-binary "@loadTestAudio/input/b.wav" 127.0.0.1:3000/mp3 -o loadTestAudio/output/b.mp3
curl --request POST --data-binary "@loadTestAudio/input/b.wav" 127.0.0.1:3000/m4a -o loadTestAudio/output/b.m4a
curl --request POST --data-binary "@loadTestAudio/input/c.wav" 127.0.0.1:3000/mp3 -o loadTestAudio/output/c.mp3
curl --request POST --data-binary "@loadTestAudio/input/c.wav" 127.0.0.1:3000/m4a -o loadTestAudio/output/c.m4a
curl --request POST --data-binary "@loadTestAudio/input/d.wav" 127.0.0.1:3000/mp3 -o loadTestAudio/output/d.mp3
curl --request POST --data-binary "@loadTestAudio/input/d.wav" 127.0.0.1:3000/m4a -o loadTestAudio/output/d.m4a
curl --request POST --data-binary "@loadTestAudio/input/e.wav" 127.0.0.1:3000/mp3 -o loadTestAudio/output/e.mp3
curl --request POST --data-binary "@loadTestAudio/input/e.wav" 127.0.0.1:3000/m4a -o loadTestAudio/output/e.m4a
curl --request POST --data-binary "@loadTestAudio/input/f.wav" 127.0.0.1:3000/mp3 -o loadTestAudio/output/f.mp3
curl --request POST --data-binary "@loadTestAudio/input/f.wav" 127.0.0.1:3000/m4a -o loadTestAudio/output/f.m4a
curl --request POST --data-binary "@loadTestAudio/input/g.wav" 127.0.0.1:3000/mp3 -o loadTestAudio/output/g.mp3
curl --request POST --data-binary "@loadTestAudio/input/g.wav" 127.0.0.1:3000/m4a -o loadTestAudio/output/g.m4a
curl --request POST --data-binary "@loadTestAudio/input/h.wav" 127.0.0.1:3000/mp3 -o loadTestAudio/output/h.mp3
curl --request POST --data-binary "@loadTestAudio/input/h.wav" 127.0.0.1:3000/m4a -o loadTestAudio/output/h.m4a
curl --request POST --data-binary "@loadTestAudio/input/i.wav" 127.0.0.1:3000/mp3 -o loadTestAudio/output/i.mp3
curl --request POST --data-binary "@loadTestAudio/input/i.wav" 127.0.0.1:3000/m4a -o loadTestAudio/output/i.m4a
