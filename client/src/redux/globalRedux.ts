import { combineReducers } from '@reduxjs/toolkit';

// reducers
import streamersReducer from './streamers/streamersRedux';

const rootReducer = combineReducers({
  streamers: streamersReducer,
});

export default rootReducer;
