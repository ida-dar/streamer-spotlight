import { Typography } from '@mui/material';
import { Helmet } from 'react-helmet';

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Home page</title>
        <meta name="description" content="This page explains the purpose of the streamer spotlight app." />
      </Helmet>
      <Typography>
        It is a simple streamer spotlight application where users can add their favorite streamers along with some relevant details. Other users can then upvote or downvote these streamers
      </Typography>
    </div>
  );
};

export default Home;
