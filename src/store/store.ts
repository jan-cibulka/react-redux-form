import { configureStore, ThunkAction, Action, getDefaultMiddleware } from '@reduxjs/toolkit';
import { reducer as reduxFormReducer } from 'redux-form';
import generalReducer from './generalSlice';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function makeStore() {
  return configureStore({
    reducer: { general: generalReducer, form: reduxFormReducer },
    middleware: getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }),
  });
}

const store = makeStore();

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action<string>>;

export default store;
