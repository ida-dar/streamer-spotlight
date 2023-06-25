import { useState } from 'react';
import { Box, Card, CardActions, CardContent, Collapse, IconButton, IconButtonProps, Typography, styled } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../redux/reduxUtils/hooks';
import { selectStreamers } from '../../../redux/streamers/streamersSelector';
import { Streamer } from '../../../interfaces/streamer.interface';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { postVoteForStreamer } from '../../../redux/streamers/streamersRedux';

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const StreamerRecord = () => {
  const streamers = useAppSelector(selectStreamers);
  const dispatch = useAppDispatch();

  const [expandedId, setExpandedId] = useState('');

  const handleExpandClick = (i: any) => {
    setExpandedId(expandedId === i ? '' : i);
  };

  const vote = (id: string) => {
    dispatch(postVoteForStreamer(id));
  };

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignContent: 'space-between', flexWrap: 'wrap', m: 1 }}>
        {streamers.length &&
          streamers.map((el: Streamer) => (
            <Card sx={{ width: 275, minHeight: 200, m: 2 }} key={el._id}>
              <CardContent>
                <Typography variant="h5" component="div" gutterBottom>
                  {el.name}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  Platform: {el.platform}
                </Typography>
                <Typography>Votes: {el.votes}</Typography>
                <Typography sx={{ m: 1, fontSize: 12 }} color="text.secondary">
                  (expand to read streamer's description)
                </Typography>
              </CardContent>
              <CardActions disableSpacing>
                <IconButton aria-label="add to favorites" onClick={() => vote(el._id)}>
                  <FavoriteIcon />
                </IconButton>
                <ExpandMore expand={expandedId !== ''} onClick={() => handleExpandClick(el._id)} aria-expanded={expandedId !== ''} aria-label="show more">
                  <ExpandMoreIcon />
                </ExpandMore>
              </CardActions>
              <Collapse in={expandedId === el._id} timeout="auto" unmountOnExit>
                <CardContent>
                  <Typography variant="body2">{el.description}</Typography>
                </CardContent>
              </Collapse>
            </Card>
          ))}
      </Box>
    </>
  );
};

export default StreamerRecord;
