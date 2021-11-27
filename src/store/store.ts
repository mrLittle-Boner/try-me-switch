import { configureStore } from '@reduxjs/toolkit'
import searchReducer from '../features/search/searchSlice';
import booksReducer from '../features/books/booksSlice';
import { setupListeners } from '@reduxjs/toolkit/query'

export const store = configureStore({
  reducer: {
    search: searchReducer,
    books: booksReducer,
  },
})
setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch