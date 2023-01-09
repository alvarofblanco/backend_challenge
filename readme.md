# REST API in Express.js

## Installation
Pull this repo
```
git clone https://github.com/alvarofblanco/backend_challenge.git && cd backend_challenge
```
Create .env file with the JWT secret
```
cp .env.example .env
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
First step is to create a User then log in with that user to create a note. In the log in response body we have an jwt that we can use as a Authorization header Bearer token for auth requests

Swagger DOcs [here](http://localhost:3000/api-docs)

Postman collection [here](https://api.postman.com/collections/1806261-7cf34082-5458-45aa-a237-32d7930f5137?access_key=PMAT-01GPA4E9E1390MHZ8BWHASJNCP)