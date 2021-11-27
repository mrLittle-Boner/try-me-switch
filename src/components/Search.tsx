import './search.css'
import { ChangeEvent, useState } from 'react'
import { useAppSelector, useAppDispatch } from '../hooks/hooks'
import { RootState } from '../store/store'
import { setCategory, setSortType, setValue } from '../features/search/searchSlice'
import { Category, SortType } from '../types/search'
import { fetchBooks } from '../features/books/fetchBooks'
import { setBooks } from '../features/books/booksSlice'
import { unwrapResult } from '@reduxjs/toolkit'

const Search = () => {
  const dispatch = useAppDispatch()
  const { categories, sortingTypes, orderBy } = useAppSelector((state: RootState) => state.search)

  let [inputValue, setInputValue] = useState('')

  const changeCurrentCategory = (ev: ChangeEvent<HTMLSelectElement>) => {
    dispatch(setCategory(ev.target.value as Category))
  }

  const changeSortingType = (ev: ChangeEvent<HTMLSelectElement>) => {
    dispatch(setSortType(ev.target.value as SortType))
  }

  const initSearch = async (ev: React.SyntheticEvent) => {
    ev.preventDefault()
    dispatch(setValue(inputValue))
    if(inputValue.trim()) {
      try {
        const fetchBooksResult = await dispatch(fetchBooks({title: inputValue, loadIndex: 0, loadOrder: orderBy}))
        const unwrappedResult = unwrapResult(fetchBooksResult)
        const books = unwrappedResult.items
        dispatch(setBooks(books))
      } catch (err) {
        console.log(err)
      }
    }
    setInputValue('')
  }

  return(
    <>
      <div className="search">
        <div className="container">
          <div className="search__content">

            <form className="search-form" onSubmit={(ev)=> initSearch(ev)}>
              <div className="search-form__input">
                <input
                  className="search-form__input-field"
                  type="text"
                  value={inputValue} 
                  onInput={(ev) => setInputValue(ev.currentTarget.value)}
                />
                <button className="search-form__input-btn">Find</button>
              </div>
            </form>
            
            <div className="search__settings">
              <div className="search__settings-categories">
                <span>Choos Category:</span>
                <select 
                  defaultValue="all"
                  onChange={(ev) => changeCurrentCategory(ev)}
                >
                  { 
                    categories.map(category => {
                      return (
                        <option value={category}
                        key={category}
                        >
                          { category }
                        </option>
                      )
                    })
                  }
                </select>
              </div>
              <div className="search__settings-sorting">
                <span>Sorting by:</span>
                <select
                  defaultValue="revelance"
                  onChange={(ev) => changeSortingType(ev)}
                >
                  {sortingTypes.map(type => <option value={type} key={type}> { type }</option>)}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Search