#!/bin/sh
script_full_path=$(dirname "$0")
cd $script_full_path

# mongod --bind_ip 127.0.0.1 --dbpath ./.mongodb/ &> /dev/null &
npm run dev