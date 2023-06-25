import { createSelector } from '@reduxjs/toolkit';
import { StreamersState } from '../actionTypes';
import { Streamer } from '../../interfaces/streamer.interface';

/* selector */
export const selectStreamersReducer = (state: { streamers: StreamersState }): StreamersState => state.streamers;

export const selectStreamersSlices = createSelector([selectStreamersReducer], (streamersSlices: { streamers: Streamer[] }) => streamersSlices.streamers);

export const streamersLoading = createSelector([selectStreamersReducer], (streamersSlice: any) => streamersSlice.request.pending);

export const selectStreamers = createSelector(
  [selectStreamersReducer],
  (streamersSlice: { streamers: Streamer[]; request: any }) =>
    streamersSlice.request.success &&
    streamersSlice.streamers?.reduce((acc: any, el: Streamer) => {
      acc.push(el);
      return acc;
    }, [])
);
