# gloplus-api
Glo+ Node.js API

App to help people to interact online while watching TV. 

* `docker run --name mongoglobo -p 27017:27017 -d -t mongo` or setup your mongo instance manually.
* Edit `.env` file with your `MONGO_URL`.
* `yarn run seedAvatars` to seed avatars in mongo.
* `yarn run scrapper` to scrap schedule and episodes.
* `yarn run start` to run api.
