# QuizeAPi

## buit using nodejs express restAPI

## packages used

```json
{
  "bcryptjs": "^2.4.3",
  "cookie-parser": "^1.4.6",
  "cron": "^2.3.0",
  "dotenv": "^16.0.3",
  "express": "^4.18.2",
  "jsonwebtoken": "^9.0.0",
  "moment": "^2.29.4",
  "mongoose": "^7.1.1",
  "validator": "^13.9.0"
}
```

### freatures :

- register user ,login user and logut user :authrizaton using jwt and cookies
- quiz : create quiz , have status acc to Starting time and ending time using cron for automation
- get active quiz , get result of quiz by id

# in .env file

PORT=3030

- Mongodb_url =

- JWT_SECRET=

- JWT_EXPIRE= in days ex: "3d"

- SALT_KEY= number 10 or grater
- COOKIE_EXPIRE= a number of days like 1 or 2 .. so on

- crytoToken_Random_bufferSize= a number eg:30

- crypto_algo an algo for crypto eg:sha256

# for run :commands

```cmd
$ npm i
$ npm start || npm run dev // using nodemon
```
