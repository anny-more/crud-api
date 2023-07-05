#!/bin/bash

echo 'старт'

npm init -y

npm i -D typescript

npx gts init

npm i express

npm i -D @types/express

npm i -D nodemon

npm add --dev ts-node-dev

echo 'финиш'
