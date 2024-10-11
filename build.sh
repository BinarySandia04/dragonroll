#!/bin/bash
# Gen docs
npx vuepress-jsdoc --exclude="*"

# Copy media to all versions of documentation (if there is more than one)
# for d in docs/dragonroll/*/; do cp -r media "$d/media"; done

# Prebuild files for execution
node prebuild.js