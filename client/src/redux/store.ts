import { AnyAction, configureStore, Dispatch, EmptyObject, Middleware, PreloadedState } from '@reduxjs/toolkit';

//reducer
import rootReducer from './globalRedux';

//middleware
import logger from 'redux-logger';

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppStore = ReturnType<typeof configureAppStore>;
export type AppDispatch = typeof store.dispatch;

const persistConfig = {
  key: 'root',
};

const middlewares = [process.env.NODE_ENV === 'development' && logger].filter(Boolean) as Middleware<{}, any, Dispatch<AnyAction>>[];

/* create store */
export function configureAppStore(preloadedState?: any) {
  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }).concat(middlewares),
    preloadedState,
  });

  return store;
}

const store = configureAppStore();

export default store;
