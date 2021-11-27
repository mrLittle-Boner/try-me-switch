import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../store/store'
import { Category, SortType } from '../../types/search'


export interface SearchState {
  title: string
  currentCategory: Category
  categories: Category[]
  orderBy: SortType
  sortingTypes: SortType[]
}

const initialState: SearchState = {
  title: '',
  categories: ['all', 'Art', 'Biography', 'Computers', 'History' ,'Medical', 'Poetry'],
  sortingTypes: ['relevance', 'newest'],
  orderBy: 'relevance',
  currentCategory: 'all'
}

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setValue: (state, action: PayloadAction<string>) => {
      state.title = action.payload 
    },
    setCategory: (state, action: PayloadAction<Category>) => {
      state.currentCategory = action.payload
    },
    setSortType: (state, action: PayloadAction<SortType>) => {
      state.orderBy = action.payload
    }
  },
})

export const { setValue, setCategory, setSortType } = searchSlice.actions

export const searchState = (state: RootState) => state.search

export default searchSlice.reducer