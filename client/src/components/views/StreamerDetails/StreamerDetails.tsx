import { useEffect } from 'react';
import { Socket, io } from 'socket.io-client';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import { Card, CardContent, Typography, IconButton, CardMedia } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';

import { Streamer } from '../../../interfaces/streamer.interface';
import { ClientToServerEvents } from '../../../interfaces/clientWebsocket.interface';

import { useAppDispatch, useAppSelector } from '../../../redux/reduxUtils/hooks';
import { selectOneStreamer } from '../../../redux/streamers/streamersSelector';
import { voteForStreamer } from '../../../redux/streamers/streamersActions';
import { fetchOneStreamer, postVoteForStreamer } from '../../../redux/streamers/streamersRedux';
import { VOTE_KINDS } from '../../../utils/voteKinds';

const StreamerDetails = () => {
  const dispatch = useAppDispatch();
  const streamer = useAppSelector<Streamer>(selectOneStreamer);
  const { id } = useParams<string>();

  let socket: Socket<ClientToServerEvents> = io();

  useEffect(() => {
    const streamerId = id as string;
    dispatch(fetchOneStreamer(streamerId));
  }, [dispatch]);

  useEffect(() => {
    socket = io(process.env.NODE_ENV === 'production' ? '' : 'localhost:8000', { transports: ['websocket'] });
    socket.on('votesUpdated', (streamer: Streamer) => dispatch(voteForStreamer(streamer)));
  }, [dispatch]);

  const vote = (id: string, voteKind: string) => {
    dispatch(postVoteForStreamer(id, voteKind));
  };

  const imageUrl = 'https://static-cdn.jtvnw.net/jtv_user_pictures/asmongold-profile_image-f7ddcbd0332f5d28-300x300.png';

  return (
    <>
      <Helmet>
        <title>Stremaer deatils</title>
        <meta name="description" content="This page shows details of a selected streamer." />
      </Helmet>
      <Card sx={{ minWidth: 325, minHeight: 375, m: 4, mx: 'auto' }} key={streamer._id}>
        <CardMedia component="img" height="325" image={imageUrl} alt={streamer.name} />
        <CardContent>
          <Typography variant="h5" component="div" gutterBottom>
            {streamer.name}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Platform: {streamer.platform}
          </Typography>
          <Typography>
            <IconButton aria-label="upvote" onClick={() => vote(streamer._id, VOTE_KINDS.UPVOTE)}>
              <ThumbUpIcon />
            </IconButton>
            : {streamer.upvotes}{' '}
            <IconButton aria-label="downvote" onClick={() => vote(streamer._id, VOTE_KINDS.DOWNVOTE)}>
              <ThumbDownIcon />
            </IconButton>
            : {streamer.downvotes}
          </Typography>
          <Typography sx={{ my: 1.5 }}>{streamer.description}</Typography>
        </CardContent>
      </Card>
    </>
  );
};

export default StreamerDetails;
