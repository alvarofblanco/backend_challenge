# REST API in Express.js

## Installation
Pull this repo
```
git clone && cd backend_challenge
```
Create .env file with the JWT secret
```
echo TOKEN_SECRET=$(echo $RANDOM | base64| head -c 20; echo) > .env
```
Install the packages
```
yarn
```
Run the app
```
yarn start
```
Console should say 'Listening on port 3000'

backend_challenge is ready to take requests!