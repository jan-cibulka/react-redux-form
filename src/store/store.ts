import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { reducer as reduxFormReducer } from 'redux-form';
import generalReducer from './generalSlice';

const store = configureStore({
  reducer: { general: generalReducer, form: reduxFormReducer },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }),
});

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action<string>>;

export default store;
