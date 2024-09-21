#!/bin/bash

trap terminate SIGINT

terminate(){
  echo "Stopping gracefully..."
  pkill -SIGINT -P $$
  exit
}

script_full_path=$(dirname "$0")
cd client
./start-dev.sh &
cd ..
cd backend
./start-dev.sh &
cd ..
wait
