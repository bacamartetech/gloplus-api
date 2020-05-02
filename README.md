# Glo+ API
Glo+ Node.js API

## Running the API
Setup a mongo instance. You can use docker:
```
docker run --name mongoglobo -p 27017:27017 -d -t mongo
```
Edit `.env` file and add your `MONGO_URL`.

Install the dependencies:
```
yarn
```
Seed mongo with avatars and scraped schedules:
```
  yarn run seedAvatars
  yarn run scrapper
```
Run the API:
```
  yarn run start
```
