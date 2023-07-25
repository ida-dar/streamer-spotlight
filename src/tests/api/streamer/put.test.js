const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../../server');
const Streamer = require('../../../streamer/Streamer.model');
const Voter = require('../../../voter/Voter.model');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe('PUT /api/streamers', () => {

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
  });

  after(async () => {
    await Streamer.deleteMany();
    await Voter.deleteMany();
  });

  it('"/streamers/:id/vote" should update chosen document and return success', async () => {
    const voteKind = 'UPVOTE'
    const res = await request(server).put('/api/streamers/5d9f1140f10a81216cfd4408/vote').send({ voteKind });
    const updated = await Streamer.findOne({ _id: '5d9f1140f10a81216cfd4408', upvotes: 11 });
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('object');
    expect(updated).to.not.be.null;
  });

});
