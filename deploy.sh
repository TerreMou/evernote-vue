#!/usr/bin/env bash

rm -rf dist &&
yarn build &&
cd dist &&
git init &&
git add . &&
git commit -m 'update' &&
git branch -M main &&
git remote add origin git@github.com:TerreMou/hugsy-note-website.git &&
git push -f -u origin main &&
cd -
