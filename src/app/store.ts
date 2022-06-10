import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { reducer as reduxFormReducer } from 'redux-form';
import counterReducer from '../features/counter/counterSlice';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function makeStore() {
  return configureStore({
    reducer: { counter: counterReducer, form: reduxFormReducer },
  });
}

const store = makeStore();

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action<string>>;

export default store;
