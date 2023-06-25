import { useState } from 'react';
import { MenuItem, Box, TextField, FormControl, InputLabel, Select, Paper, Typography, Button, Alert } from '@mui/material';
import { useAppDispatch } from '../../../redux/reduxUtils/hooks';
import { postStreamer } from '../../../redux/streamers/streamersRedux';

const SubmissionView = () => {
  const dispatch = useAppDispatch();

  const streamingPlatforms = ['Twitch', 'YouTube', 'TikTok', 'Kick', 'Rumble'];

  const defaultForm = {
    name: '' as string,
    platform: '' as string,
    description: '' as string,
  };

  const errors = {
    valid: true,
    error: '',
  };

  const [formFields, setFormFields] = useState(defaultForm);
  const [error, setError] = useState(errors);
  const { name, platform, description } = formFields;

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const resetValues = () => {
    setFormFields(defaultForm);
    setError({
      valid: true,
      error: '',
    });
  };

  const submitForm = async (e: any) => {
    e.preventDefault();
    if (!name || !platform || !description) {
      setError({
        valid: false,
        error: 'Please fill all neccessary data',
      });
      return;
    }

    try {
      const streamer = {
        name,
        platform,
        description,
      };
      dispatch(postStreamer(streamer));
      resetValues();
    } catch (e) {
      setError({
        valid: false,
        error: 'Submitting the application was unsuccessful',
      });
    }
  };

  return (
    <>
      <Paper elevation={1} sx={{ mt: 4, mb: 4, mx: 'auto', p: 1, maxWidth: 650 }}>
        {!error.valid && <Alert severity="error">{error.error}</Alert>}
        {error.valid && <Alert severity="success">Submitted successfully</Alert>}
        <Box
          onSubmit={submitForm}
          component="form"
          sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minWidth: 120, m: 1 }}
          noValidate
          autoComplete="off"
        >
          <Typography sx={{ m: 2, textAlign: 'center' }}>Please enter data of the streamer you'd like to submit for voting. Required information are name, platform and their description.</Typography>

          <TextField onChange={handleChange} value={name} name="name" sx={{ m: 1, minWidth: 300 }} id="outlined-basic" label="Name" variant="outlined" />
          <FormControl sx={{ m: 1, minWidth: 300 }}>
            <InputLabel id="demo-simple-select-label">Platform</InputLabel>
            <Select labelId="demo-simple-select-label" id="demo-simple-select" name="platform" value={platform} label="Platform" onChange={handleChange}>
              {streamingPlatforms.map((el) => (
                <MenuItem value={el}>{el}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            onChange={handleChange}
            value={description}
            name="description"
            sx={{ m: 1, width: 300 }}
            id="outlined-basic"
            label="Description"
            variant="outlined"
            multiline
            minRows={6}
            maxRows={16}
          />

          <Button type="submit" variant="contained" sx={{ my: 2, color: 'white', display: 'block' }}>
            Submit
          </Button>
        </Box>
      </Paper>
    </>
  );
};

export default SubmissionView;
