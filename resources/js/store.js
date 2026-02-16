import { configureStore, createSlice, combineReducers } from '@reduxjs/toolkit'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from 'redux-persist'
import storage from 'redux-persist/lib/storage' // localStorage

// Slice
const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increment: (state) => { state.value += 1 },
    decrement: (state) => { state.value -= 1 },
  }
})

export const { increment, decrement } = counterSlice.actions

// Root reducer
const rootReducer = combineReducers({
  counter: counterSlice.reducer
})

// Persist config
const persistConfig = {
  key: 'root',
  storage,
}

// Persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer)

// Store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

// Persistor
export const persistor = persistStore(store)
