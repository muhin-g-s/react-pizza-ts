import { combineReducers, configureStore } from '@reduxjs/toolkit'
import filter from './filter/slice';
import cart from './cart/slice';
import pizza from './pizza/slice';
import { useDispatch } from 'react-redux';
import storage from 'redux-persist/lib/storage';
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer } from 'redux-persist';
import persistStore from 'redux-persist/es/persistStore';

const redusers = combineReducers({
  filter,
  cart,
})

const persistConfig = {
  key : 'root',
  storage,
}

const persistedReduser = persistReducer(persistConfig,redusers)

export const store = configureStore({
  reducer: {
    persistedReduser,
    pizza
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export type RootState = ReturnType<typeof store.getState>
export const persistor = persistStore(store);

export type AppDispatcher = typeof store.dispatch
export const useAppDispatcher = () => useDispatch<AppDispatcher>() 