import { createAsyncThunk } from "@reduxjs/toolkit";
import { Book } from "../../types/books";
import { SortType } from '../../types/search'

interface Response {
  totalItems: number
  items: Book[]
}

interface FetchPatams {
  title: string
  loadIndex: number
  loadOrder: SortType
}

export const fetchBooks = createAsyncThunk(
  'books/fetchBooks',
  async ({title, loadIndex, loadOrder}: FetchPatams) => {
    const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${title}&fields=totalItems,items(id,volumeInfo(title,authors,description,categories,imageLinks))&maxResults=30&startIndex=${loadIndex}&orderBy=${loadOrder}`)
    const data: Response = await response.json()
    return data
  }
)