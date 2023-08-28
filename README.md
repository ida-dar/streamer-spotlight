# streamer-spotlight
It is a simple streamer spotlight application where users can add their favorite streamers along with some relevant details.
Other users can then upvote or downvote these streamers.
You may vote for only one streamer from one device.

#### Available pages
* Home - app description;
* Streamer records - where you may submit streamer for voting and vote for other streamers;
* Streamer details - where you may read more about submitted streamer.

#### Available endpoints
* POST `/streamers`: An endpoint to receive new streamer submissions from the frontend and store them in a database.
* GET `/streamers`: An endpoint to return all the stored streamer submissions in response to a request from the frontend.
* GET `/streamer/:id`: An endpoint to return data about a specific streamer.
* PUT `/streamers/:id/vote`: An endpoint to receive an upvote for a specific streamer and update their current upvote/downvote count.

### Possible improvements and new features for the future
* modifying redux to use saga;
* move streamer platforms to db;
* add tests to FE with e.g. react-testing-library or jest;
* login functionality, e.g. with OAuth and passport;
* image functionality - image upload for every streamer;
* migrating express to nest.js.

I plan to deploy the app with AWS (EC2) and Docker

## Used tech
* React
* Typescript
* Node.js
* Express
* MongoDB
* Mongoose
* Material-UI
* socket.io
* tests on BE: chai, mocha

## Getting started

#### Requirement:
* node : 16.x.x or above
* npm : 8.x.x or above

#### Clone this repo:
`git clone https://github.com/ida-dar/streamer-spotlight.git`

#### Start Development Mode:
* frontend:
  * `npm start`
  * open [http://localhost:8000](http://localhost:8000) to view it in the browser

* backend:
  * `npm start`
  * in the terminal the server should start on port 8000

## Tests
* backend:
  * `npm run test` or `npm run test:watch`

## Previews
Home page:
<br>
<img src="https://github.com/ida-dar/streamer-spotlight/assets/81257123/a73f7427-7803-4e05-8ec3-cf454d26c1aa" width="250" />

Streamer Records:
<br>
<img src="https://github.com/ida-dar/streamer-spotlight/assets/81257123/482dd2ad-9bf1-4276-a175-b8023611a629" width="250" />

Streamer Details:
<br>
<img src="https://github.com/ida-dar/streamer-spotlight/assets/81257123/958110a9-295a-4155-a171-680c414df096" width="250" />
