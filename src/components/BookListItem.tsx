import { Book } from "../types/books"
import './BookListItem.css'

export default function BookListItem({book} : {book: Book}) {
  return (
    <div className="book">      
      <div className="book__image">
        {
          book.volumeInfo.imageLinks?.thumbnail 
          ? <img src={book.volumeInfo?.imageLinks?.thumbnail}
              alt={book.volumeInfo.title} 
            />
          : ''
        }
      </div>

      <div className="book__categories">
        {
          book.volumeInfo.categories ? book.volumeInfo.categories[0] : " "
        }
      </div>

      <div className="book__title">
        {book.volumeInfo.title}
      </div>

      <div className="book__authors">
        {
          book.volumeInfo.authors
          ? book.volumeInfo.authors.map((author,index) => {
            return( <p key={index}>{author}</p> )
          })
          : "-"
        }
      </div>
    </div>
  )
}