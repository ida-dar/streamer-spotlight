import { STREAMERS_ACTION_TYPES } from '../actionTypes';
import { Streamer } from '../../interfaces/streamer.interface';
import { createAction } from '../reduxUtils/createAction';

// actions
export const setStreamers = (streamers: Streamer[]) => createAction(STREAMERS_ACTION_TYPES.FETCH_STREAMERS, streamers);

export const addStreamer = (streamer: Streamer) => createAction(STREAMERS_ACTION_TYPES.ADD_STREAMER, streamer);

export const fetchStreamersStart = () => createAction(STREAMERS_ACTION_TYPES.FETCH_STREAMERS_START);

export const fetchStreamersFail = (e: any) => createAction(STREAMERS_ACTION_TYPES.FETCH_STREAMERS_FAIL, e);

export const voteForStreamer = (streamerId: string, vote: number) => createAction(STREAMERS_ACTION_TYPES.VOTE_FOR_STREAMER, { streamerId, vote });
