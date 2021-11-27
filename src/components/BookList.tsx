import './BookList.css'
import BookListItem from './BookListItem'
import { useAppSelector, useAppDispatch } from '../hooks/hooks'
import { RootState } from '../store/store'
import { Book } from '../types/books';
import { useState } from 'react'

import { fetchBooks } from '../features/books/fetchBooks'
import { addMoreBooks } from '../features/books/booksSlice'
import { Link } from 'react-router-dom';

function BookList() {
  const dispatch = useAppDispatch()
  const [startIndex, setStartIndex] = useState(30)

  const { currentCategory, orderBy } = useAppSelector((state:RootState) => state.search)
  const { loadStatus, totalCount} = useAppSelector((state: RootState) => state.books)
  const  searchValue  = useAppSelector((state: RootState) => state.search.title)

  const filteredByCategoryBooks = useAppSelector((state: RootState) => {
    if(currentCategory === 'all') return state.books.items
    else {
      return state.books.items.filter(book => book.volumeInfo.categories?.includes(currentCategory))
    }
  })

  const loadMoreBooks = (index: number) => {
    dispatch(fetchBooks({title:searchValue, loadIndex:index, loadOrder: orderBy}))
    .unwrap()
    .then(data => dispatch(addMoreBooks(data.items)))
    .catch(err => console.log(err))
  }

  const clickHandler = () => {
    loadMoreBooks(startIndex)
    setStartIndex(startIndex+30)
  }

  const bookListItemContent = filteredByCategoryBooks?.map((book: Book) => {
    const transformedID =  typeof book.id === "number" ? book.id.toString() : book.id
    return (
      <li className="books__list-item" key={book.id}> 
        <Link to={ transformedID } style={{'textDecoration':'none', 'color': 'inherit'}}> 
          <BookListItem book={book} />
        </Link>
      </li>
    )
  })
  
  return (
    <>
      <div className="books">
        <p style={{'fontSize': '20px', 'textAlign': 'center', 'marginBottom': '10px'}}>Books find: { totalCount }</p>
        <ul className="books__list"> 
          { bookListItemContent.length < 1
            ? <p style={{'fontSize': '20px', 'margin': '0 auto' , 'marginBottom': '10px', }}>
                No such books with this current category
              </p>
            : bookListItemContent
          }
        </ul>
        <button className="books__btn" onClick={() => clickHandler()}>Load More</button>
      </div>
      {
        loadStatus === 'loading' ? <Loading /> : ''
      }
    </>
  )
}

function Loading() {
  return (
    <div style={{'fontSize': '25px', 'textAlign': 'center'}}>Loading...</div>
  )
}

export default BookList