import { createSelector } from '@reduxjs/toolkit';
import { StreamersState } from '../actionTypes';
import { Streamer } from '../../interfaces/streamer.interface';

/* selector */
export const selectStreamersReducer = (state: { streamers: StreamersState }): StreamersState => state.streamers;

export const streamersRequests = createSelector([selectStreamersReducer], (streamersSlice: any) => streamersSlice.request);

export const selectOneStreamer = createSelector([selectStreamersReducer], (streamersSlice: any) => streamersSlice.streamer);

export const selectStreamers = createSelector([selectStreamersReducer], (streamersSlice: { streamers: Streamer[]; request: any }) =>
  streamersSlice.streamers?.reduce((acc: any, el: Streamer) => {
    acc.push(el);
    return acc;
  }, [])
);
