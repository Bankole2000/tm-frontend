#!/usr/bin/env sh
# abort on errors
set -e
# build
npm run build
# navigate into the build output directory
cd dist
# echo nodensinc.com >> CNAME
# if you are deploying to a custom domain
# echo 'www.example.com' > CNAME
git init
git config user.email "techybanky@gmail.com"
git config user.name "Bankole Esan"
git add -A
git commit -m "deploy"
git branch -M main
git push -f git@github.com:Bankole2000/tm-frontend.git main:gh-pages
cd -