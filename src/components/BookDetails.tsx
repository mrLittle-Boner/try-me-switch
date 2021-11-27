import { useParams } from "react-router"
import { Link } from "react-router-dom"
import { useAppSelector } from "../hooks/hooks"
import { RootState } from "../store/store"
import { Book } from "../types/books"
import './BookDetails.css'

export default function BookDetails() {
  const { bookId } = useParams() 
  
  const selectedBook = useAppSelector((state: RootState) => {
    return state.books.items.find((book: Book) => book.id === bookId)
  })

  const img = selectedBook?.volumeInfo.imageLinks.thumbnail
  const title = selectedBook?.volumeInfo.title
  const description = selectedBook?.volumeInfo.description
  const authors = selectedBook?.volumeInfo.authors
  const categories = selectedBook?.volumeInfo.categories

  return(
    <>
      {
        selectedBook
        ? <div className="bookdetails">
            <div className="bookdetails__image">
              <img src={img} alt={title} />
            </div>
    
            <div className="bookdetails__info"> 
      
              <div className="bookdetails__info-title">
                { title }
              </div>

              <ul className="bookdetails__info-categories">
                {categories?.join(' | ')}
              </ul>
      
              <ul className="bookdetails__info-autrhors">
                {authors?.join(" | ")}
              </ul>
      
              <div className="bookdetails__info-description">
                {description}
              </div>
            </div>
          </div> 
        : <div>Book not found</div>
      }
      <Link to="/" style={{'fontSize': '20px', 'fontWeight': 'bolder'}}>Back</Link>
    </>
  )
}
