# streamer-spotlight
It is a simple streamer spotlight application where users can add their favorite streamers along with some relevant details.
Other users can then upvote or downvote these streamers.

Available pages:
* Home - app description;
* Streamer records - where you may submit streamer for voting and vote for other streamers;
* Streamer details - where you may read more about submitted streamer.

You may vote for only one streamer from one device.

For more clarity I decided to create separate folders for backend and frontend.

### Possible improvements and new features
* modifying redux to use saga;
* move streamer platforms to db;
* add tests to FE with e.g. react-testing-library or jest;
* login functionality, e.g. with OAuth and passport;
* image functionality - image upload for every streamer;
* modifying file structure if project grows for more clarity or moving backend to a separate repo.

Initially, I wanted to deploy the app on Netlify, however due to some technical issues and set deadline I've decided to postpone it.
I plan to deploy the app later on with AWS (backend with AWS Lambda, frontend with AWS Amplify).

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
<img src="https://github.com/ida-dar/streamer-spotlight/assets/81257123/34ca4390-bd8d-412d-84c8-cf84e61d5b84" width="250" />

Streamer Records:
<br>
<img src="https://github.com/ida-dar/streamer-spotlight/assets/81257123/90db410f-75e8-4da4-b61f-7d4844e140e5" width="250" />

Streamer Details:
<br>
<img src="https://github.com/ida-dar/streamer-spotlight/assets/81257123/56ea985d-77bf-45f8-9cd0-937ed086f5c1" width="250" />
