import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Socket, io } from 'socket.io-client';
import { Alert, Box, Card, CardActionArea, CardContent, IconButton, Typography } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';

import { useAppDispatch, useAppSelector } from '../../../redux/reduxUtils/hooks';
import { selectStreamers, streamersRequests } from '../../../redux/streamers/streamersSelector';
import { fetchStreamers, postVoteForStreamer } from '../../../redux/streamers/streamersRedux';

import { Streamer } from '../../../interfaces/streamer.interface';
import { ClientToServerEvents } from '../../../interfaces/clientWebsocket.interface';

import { VOTE_KINDS } from '../../../utils/voteKinds';
import { singleViewRoutes } from '../../../utils/routes';

import Loader from '../../common/Loader/Loader';
import { voteForStreamer } from '../../../redux/streamers/streamersActions';

const StreamerRecord = () => {
  const streamers = useAppSelector<Streamer[]>(selectStreamers);
  const request = useAppSelector(streamersRequests);
  const dispatch = useAppDispatch();

  let socket: Socket<ClientToServerEvents> = io();

  const vote = (id: string, voteKind: string) => {
    dispatch(postVoteForStreamer(id, voteKind));
  };

  useEffect(() => {
    socket = io(process.env.NODE_ENV === 'production' ? process.env.PUBLIC_URL : 'localhost:8000', { transports: ['websocket'] });
    socket.on('streamerAdded', (): any => dispatch(fetchStreamers()));
  }, [dispatch]);

  useEffect(() => {
    socket = io(process.env.NODE_ENV === 'production' ? process.env.PUBLIC_URL : 'localhost:8000', { transports: ['websocket'] });
    socket.on('votesUpdated', (streamer: Streamer) => dispatch(voteForStreamer(streamer)));
  }, [dispatch]);

  return (
    <>
      <Helmet>
        <title>Streamer records</title>
        <meta name="description" content="This page shows records of submited streamers." />
      </Helmet>
      {request.pending ? (
        <Loader />
      ) : (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignContent: 'space-between', flexWrap: 'wrap', m: 1 }}>
          {streamers.length > 0 &&
            streamers.map((el: Streamer) => (
              <Card sx={{ width: 275, minHeight: 150, m: 2 }} key={el._id}>
                <CardActionArea component={Link} to={singleViewRoutes.STREAMER_DETAILS.link.replace(':id', el._id)}>
                  <CardContent>
                    <Typography variant="h5" component="div" gutterBottom>
                      {el.name}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                      Platform: {el.platform}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardContent>
                  <Typography>
                    <IconButton aria-label="upvote" onClick={() => vote(el._id, VOTE_KINDS.UPVOTE)}>
                      <ThumbUpIcon />
                    </IconButton>
                    : {el.upvotes}{' '}
                    <IconButton aria-label="downvote" onClick={() => vote(el._id, VOTE_KINDS.DOWNVOTE)}>
                      <ThumbDownIcon />
                    </IconButton>
                    : {el.downvotes}
                  </Typography>
                  {request.error && request.error.message === 'User already voted' && request.error.streamerId === el._id && <Alert severity="error">You already voted for this streamer</Alert>}
                </CardContent>
              </Card>
            ))}
        </Box>
      )}
    </>
  );
};

export default StreamerRecord;
