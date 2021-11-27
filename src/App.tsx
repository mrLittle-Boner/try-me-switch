import './App.css';
import Search from './components/Search';
import BookList from './components/BookList'
import BookDetails from './components/BookDetails';
import { useAppSelector } from './hooks/hooks'
import { RootState } from './store/store';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const books = useAppSelector((state: RootState) => state.books.items)

  return (
    <>
      <div className="App">
        <Header />
        <Search />
        <Router>
          <main className="main">
            <div className="container">
              <Routes>
                <Route path="/" element={books.length ? <BookList /> : <WelcomeText />} />
                <Route path="/:bookId" element={<BookDetails />} />
              </Routes>
            </div>
          </main>
        </Router>
      </div>
    </>
  );
}

const Header = () => {
  return (
    <header className='header'>
      <div className="container">
        <div className="header__content">
          <h3 className='header__title'>Find the Book</h3>
        </div>
      </div>
    </header>
  )
}

const WelcomeText = () => {
  return (
    <>
    <div className="welcome">
      <h2>Welcome Finder!</h2>
      <div>Fill the search field and smash that find button for seek the book you are looking for! Happy Reading!</div>
    </div>
    </> 
  )
}

export default App;
