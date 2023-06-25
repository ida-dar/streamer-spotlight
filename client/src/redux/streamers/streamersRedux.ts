import axios from 'axios';
import { AnyAction, Dispatch } from '@reduxjs/toolkit';
import { StreamersState, STREAMERS_ACTION_TYPES } from '../actionTypes';
import { fetchStreamersFail, fetchStreamersStart, setStreamers, addStreamer, voteForStreamer } from './streamersActions';
import { API_URL } from '../reduxUtils/apiConfig';

// state
const initialState: StreamersState = {
  streamers: [],
  request: {
    pending: false,
    error: null,
    success: false,
  },
};

// reducer
export const fetchStreamers = () => async (dispatch: Dispatch) => {
  dispatch(fetchStreamersStart());

  try {
    const resp = await axios.get(`${API_URL}/streamers`);
    dispatch(setStreamers(resp.data));
  } catch (e) {
    dispatch(fetchStreamersFail(e));
  }
};

export const postStreamer = (streamer: { name: string; platform: string; description: string }) => async (dispatch: Dispatch) => {
  dispatch(fetchStreamersStart());

  try {
    const obj = {
      ...streamer,
      votes: 0,
    };
    const resp = await axios.post(`${API_URL}/streamers`, obj);
    dispatch(addStreamer(obj));
  } catch (e) {
    dispatch(fetchStreamersFail(e));
  }
};

export const postVoteForStreamer = (id: string) => async (dispatch: Dispatch) => {
  try {
    const resp = await axios.put(`${API_URL}/streamers/${id}/vote`);
    dispatch(voteForStreamer(resp.data));
  } catch (e) {
    dispatch(fetchStreamersFail(e));
  }
};

const reducer = (state = initialState, action = {} as AnyAction) => {
  switch (action.type) {
    case STREAMERS_ACTION_TYPES.FETCH_STREAMERS:
      return {
        ...state,
        streamers: action.payload,
        request: {
          pending: false,
          error: null,
          success: true,
        },
      };
    case STREAMERS_ACTION_TYPES.FETCH_STREAMERS_START:
      return {
        ...state,
        request: {
          pending: true,
          error: null,
          success: false,
        },
      };
    case STREAMERS_ACTION_TYPES.FETCH_STREAMERS_FAIL:
      return {
        ...state,
        request: {
          pending: false,
          error: action.payload,
          success: false,
        },
      };
    case STREAMERS_ACTION_TYPES.VOTE_FOR_STREAMER:
      const streamer = action.payload;
      const idx = state.streamers.findIndex((el) => el._id === streamer._id);
      return {
        ...state,
        streamers: state.streamers.map((item, index) => (index === idx ? streamer : item)),
      };
    default:
      return state;
  }
};

export default reducer;
