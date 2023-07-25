const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../../server');
const Streamer = require('../../../models/Streamer.model');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe('GET /api/streamers', () => {

  before(async () => {
    const testStreamerOne = new Streamer({
      _id: '5d9f1140f10a81216cfd4408',
      name: 'John Doe',
      platform: 'YouTube',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. In, non? Facilis explicabo ipsa neque accusamus pariatur distinctio doloremque et adipisci?',
      imageUrl: 'test',
      upvotes: 10,
      downvotes: 20,
    });
    await testStreamerOne.save();

    const testStreamerTwo = new Streamer({
      _id: '5d9f1159f81ce8d1ef2bee48',
      name: 'Tom Cruise',
      platform: 'Kick',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. In, non?',
      imageUrl: 'test',
      upvotes: 10,
      downvotes: 20,
    });
    await testStreamerTwo.save();
  });
  after(async () => {
    await Streamer.deleteMany();
  });

  it('"/streamers" should return all streamers', async () => {
    const res = await request(server).get('/api/streamers');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.be.equal(2);
  });

  it('"/streamer/:id" should return one streamer by :id', async () => {
    const res = await request(server).get('/api/streamers/5d9f1140f10a81216cfd4408');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('object');
    expect(res.body).to.not.be.null;
  });

});
