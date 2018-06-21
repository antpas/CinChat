## CinChat
CinChat is a chatbot website that helps users find movies they want to watch.
<img src="https://github.com/antpas/CinChat/blob/master/src/assets/images/logo.png" alt="CinChat" align="right" />

## Motivation
The project was created for Boston University's CS591 course in the Summer 1 semester. This project aims to build the website using the MEAN stack, using Typescript. This project also looks to act as a learning opportunity for various APIs and technologies.

## Build status
Finished for CS591 (June 2018).

## Code style
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)
 
## Screenshots
Include logo/demo screenshot etc.

## Tech/framework used
<b>MEAN Stack</b>
- [TypeScript](https://www.typescriptlang.org/)
- [MongoDB](https://www.typescriptlang.org/)
- [Express](https://expressjs.com/)
- [Angular6](https://angular.io/)
- [Node.js](https://nodejs.org/en/)

<b>APIs</b>
- [Dialogflow](https://dialogflow.com/)
- [OMDb](http://www.omdbapi.com/)
- [OpenWeatherMap](https://openweathermap.org/)
- [The Movie DB](https://www.themoviedb.org/?language=en)
- [Google OAuth2](https://google.com)

## Features
Chat with bot to ask it about movie information. It can also recommend a movie based on the current weather.
- Commands to try:
  - "Tell me about Star Wars"
     - " Show me more"
  - "Give me a movie based on the weather in Boston"
  - "Show me romance movies"
  - "Show me popular movies"
  - "Who directed that?"
  - "When was that released?"
  - "Show me the plot"

## Screenshots
Screenshots here

## Setup Project

- Install Dependencies:
    ```javascript
    npm install
    ```
- MongoDB
    - https://www.mongodb.com/download-center     

## How to use?
Go to https://cinchat.herokuapp.com/. Use CinChat and provide feedback on this repo.

## Grading Criteria 
- MongoDB (Mongoose used)
  - User Table: User credential information.
  - Movie Table: Movie history information.
 - Node & Express
    - No external APIs are called on the front end.
    - Split up routes into files.
- 5 external APIs used.
- Angular6 used. 
    - Calls backend routes via http.
    - Multiple components
- OAuth is used for authentication (Google) via Passport.
    - Local authentication is also implemented using JWTs.
- This project has been deployed on Heroku.
    - This allows for users to easily try it out!
    - All APIs keys are loaded into backend using enviroment variables.
     - Used [dotenv](https://github.com/motdotla/dotenv) for loading env variables.

## Credits
Developed by Anthony Pasquariello.
Boston University CS591 Summer 2018.

## License

MIT © [Anthony Pasquariello](https://github.com/antpas)
