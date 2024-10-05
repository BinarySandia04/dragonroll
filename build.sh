#!/bin/bash

node prebuild.js
npm run generate-docs
cp -r media docs/dragonroll/1.0.0/