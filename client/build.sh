#!/bin/bash
script_full_path=$(dirname "$0")
cd $script_full_path

yarn vue-cli-service build --target lib src/widgets/TestWindow.vue --name TestWindow --dest dist/Widgets/

npm run build
