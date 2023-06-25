import { ChangeEvent, useState } from 'react';
import { MenuItem, Box, TextField, FormControl, InputLabel, Select, Paper, Typography, SelectChangeEvent } from '@mui/material';

const SubmissionView = () => {
  const streamingPlatforms = ['Twitch', 'YouTube', 'TikTok', 'Kick', 'Rumble'];

  const [platform, setPlatform] = useState('');

  const handleChange = (e: SelectChangeEvent<string>) => {
    setPlatform(e.target.value);
  };

  return (
    <Paper elevation={1} sx={{ mt: 4, mb: 4, mx: 'auto', p: 1, maxWidth: 650 }}>
      <Box component="form" sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minWidth: 120, m: 1 }} noValidate autoComplete="off">
        <Typography sx={{ m: 2, textAlign: 'center' }}>Please enter data of the streamer you'd like to submit for voting. Required information are name, platform and their description.</Typography>
        <TextField sx={{ m: 1, minWidth: 300 }} id="outlined-basic" label="Name" variant="outlined" />
        <FormControl sx={{ m: 1, minWidth: 300 }}>
          <InputLabel id="demo-simple-select-label">Platform</InputLabel>
          <Select labelId="demo-simple-select-label" id="demo-simple-select" value={platform} label="Platform" onChange={handleChange}>
            {streamingPlatforms.map((el) => (
              <MenuItem value={el}>{el}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField sx={{ m: 1, width: 300 }} id="outlined-basic" label="Description" variant="outlined" multiline minRows={6} maxRows={16} />
      </Box>
    </Paper>
  );
};

export default SubmissionView;
