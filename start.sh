#!/bin/bash
trap terminate SIGINT

terminate(){
    echo "Stopping gracefully..."
    pkill -SIGINT -P $$
    exit
}

script_full_path=$(dirname "$0")
node prebuild.js
cd client
./start.sh &
cd ..
cd backend
./start.sh &
cd ..
wait