import { configureStore, ThunkAction, Action, EnhancedStore } from '@reduxjs/toolkit';
import { reducer as reduxFormReducer } from 'redux-form';
import generalReducer from './generalSlice';

export function makeStore(): EnhancedStore {
  return configureStore({
    reducer: { general: generalReducer, form: reduxFormReducer },
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({
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
