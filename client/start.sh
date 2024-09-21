#!/bin/bash
script_full_path=$(dirname "$0")
cd $script_full_path

npm install

npm run build
npx serve -s dist
