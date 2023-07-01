import { Link } from 'react-router-dom';
import { Box, Card, CardActionArea, CardContent, IconButton, Typography } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';

import { useAppDispatch, useAppSelector } from '../../../redux/reduxUtils/hooks';
import { selectStreamers } from '../../../redux/streamers/streamersSelector';
import { postVoteForStreamer } from '../../../redux/streamers/streamersRedux';
import { Streamer } from '../../../interfaces/streamer.interface';
import { VOTE_KINDS } from '../../../utils/voteKinds';
import { singleViewRoutes } from '../../../utils/routes';

const StreamerRecord = () => {
  const streamers = useAppSelector<Streamer[]>(selectStreamers);
  const dispatch = useAppDispatch();

  const vote = (id: string, voteKind: string) => {
    dispatch(postVoteForStreamer(id, voteKind));
  };

  return (
    <>
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
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
      </Box>
    </>
  );
};

export default StreamerRecord;
