import { Streamer } from '../interfaces/streamer.interface';

export type StreamersState = {
  readonly streamers: Streamer[];
  readonly request: {
    pending: boolean;
    error: Error | null;
    success: boolean;
  };
};

export const STREAMERS_ACTION_TYPES = {
  FETCH_STREAMERS: 'streamers/FETCH_STREAMERS',
  FETCH_STREAMERS_START: 'streamers/FETCH_STREAMERS_START',
  FETCH_STREAMERS_FAIL: 'streamers/FETCH_STREAMERS_FAIL',
  VOTE_FOR_STREAMER: 'streamers/VOTE_FOR_STREAMER',
  ADD_STREAMER: 'ADD_STREAMER',
};
