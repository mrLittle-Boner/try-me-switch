import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../store/store'
import { Book } from '../../types/books'
import { fetchBooks } from './fetchBooks'

interface BooksState {
  items: Book[]
  loadStatus: 'loading' | 'idle'
  totalCount: number
}

const initialState: BooksState = {
  items: [],
  loadStatus: 'idle',
  totalCount: 0
}

export const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    setBooks: (state, action: PayloadAction<Book[]>) => {
      state.items = action.payload
    },
    addMoreBooks: (state, action: PayloadAction<Book[]>) => {
      state.items = state.items.concat(action.payload)
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBooks.pending, (state) => {
      state.loadStatus = 'loading'
    })
    builder.addCase(fetchBooks.fulfilled , (state, { payload }) => {
      state.totalCount = payload.totalItems
      state.loadStatus = 'idle'
    })
  }
})

export const { setBooks, addMoreBooks } = booksSlice.actions

export const booksState = (state: RootState) => state.books

export default booksSlice.reducer