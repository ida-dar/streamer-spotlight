import { useEffect } from 'react';
import { Card, CardContent, Typography, IconButton, CardMedia } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';

import { Streamer } from '../../../interfaces/streamer.interface';
import { useAppDispatch, useAppSelector } from '../../../redux/reduxUtils/hooks';
import { selectOneStreamer } from '../../../redux/streamers/streamersSelector';
import { fetchOneStreamer, postVoteForStreamer } from '../../../redux/streamers/streamersRedux';
import { VOTE_KINDS } from '../../../utils/voteKinds';
import { useParams } from 'react-router-dom';

const StreamerDetails = () => {
  const dispatch = useAppDispatch();
  const streamer = useAppSelector<Streamer>(selectOneStreamer);
  const { id } = useParams<string>();

  useEffect(() => {
    const streamerId = id as string;
    dispatch(fetchOneStreamer(streamerId));
  }, [dispatch]);

  const vote = (id: string, voteKind: string) => {
    dispatch(postVoteForStreamer(id, voteKind));
  };

  const imageUrl = 'https://static-cdn.jtvnw.net/jtv_user_pictures/asmongold-profile_image-f7ddcbd0332f5d28-300x300.png';

  return (
    <Card sx={{ minWidth: 325, minHeight: 375, m: 4, mx: 'auto' }} key={streamer._id}>
      <CardMedia component="img" height="325" image={imageUrl} alt="Paella dish" />
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
  );
};

export default StreamerDetails;
