const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../../server');
const Streamer = require('../../../models/Streamer.model');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe('POST /api/streamers', () => {

  after(async () => {
    await Streamer.deleteMany();
  });

  it('"/streamers" should insert new document to db and return success', async () => {
    const res = await request(server).post('/api/streamers').send({
      name: 'John Doe',
      platform: 'YouTube',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. In, non? Facilis explicabo ipsa neque accusamus pariatur distinctio doloremque et adipisci?',
      imageUrl: 'test',
      upvotes: 0,
      downvotes: 0,
    });
    const newStreamer = await Streamer.findOne({ name: 'John Doe', platform: 'YouTube', });
    expect(res.status).to.be.equal(200);
    expect(res.body.message).to.be.equal('OK');
    expect(newStreamer).to.not.be.null;
  });

});
