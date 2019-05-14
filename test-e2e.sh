#!/usr/bin/env bash

set -xe

# build and run webserver
ls -la
yarn server:development &

# run tests
npx cypress run --config baseUrl=https://localhost:8081