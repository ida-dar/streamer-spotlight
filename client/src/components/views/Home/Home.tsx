import { Card, Divider, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
import DetailsIcon from '@mui/icons-material/Details';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import { Helmet } from 'react-helmet';

const Home = () => {
  return (
    <Card sx={{ maxWidth: 625, my: 4, mx: 'auto', p: 4, textAlign: 'center' }}>
      <Helmet>
        <title>Home page</title>
        <meta name="description" content="This page explains the purpose of the streamer spotlight app." />
      </Helmet>
      <Typography variant="body1" sx={{ m: 2 }}>
        It is a simple streamer spotlight application where users can add their favorite streamers along with some relevant details. Other users can then upvote or downvote these streamers.
      </Typography>
      <Divider />
      <Typography variant="body1" sx={{ my: 4 }} color="text.secondary">
        There are two pages available:
        <List>
          <ListItem disablePadding>
            <ListItemIcon>
              <NewspaperIcon />
            </ListItemIcon>
            <ListItemText>Streamer record - where you may submit streamer for voting and vote for other streamers;</ListItemText>
          </ListItem>
          <ListItem disablePadding>
            <ListItemIcon>
              <DetailsIcon />
            </ListItemIcon>
            <ListItemText>Streamer details - where you may read more about submitted streamer.</ListItemText>
          </ListItem>
        </List>
      </Typography>
      <Divider />
      <Typography variant="body1" sx={{ m: 2 }}>
        You may vote for only one streamer from one device.
      </Typography>
    </Card>
  );
};

export default Home;
