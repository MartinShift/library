import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link,Routes } from 'react-router-dom';
import { Book } from './types';
import Filter from './components/Filter';
import Sort from './components/Sort';
import BookList from './components/Booklist';
import AddBookForm from './components/AddBookForm';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  const bookArray = [
    {
      id: 1,
      title: "The art of War",
      author: "Sun Tzu",
      publishedDate: "5th century BC",
      imageUrl: "/images/the-art-of-war.jpg"
    },
    {
      id: 2,
      title: "patterns of enterprise application architecture",
      author: "Martin Fowler",
      publishedDate: "15th October 2002",
      imageUrl: "/images/patterns.jpg"
    },
    
  ];

  const [books, setBooks] = useState<Book[]>(bookArray);
  const [filterText, setFilterText] = useState(''); 
  const [sortType, setSortType] = useState('title'); 

  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);

  useEffect(() => {
    const sortedBooks = [...books];

    if (sortType === 'title') {
      sortedBooks.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortType === 'author') {
      sortedBooks.sort((a, b) => a.author.localeCompare(b.author));
    } else if (sortType === 'publishedDate') {
      sortedBooks.sort((a, b) => a.publishedDate.localeCompare(b.publishedDate));
    }

    setFilteredBooks(
      sortedBooks.filter((book) =>
        book.title.toLowerCase().includes(filterText.toLowerCase())
      )
    );
  }, [books, filterText, sortType]);

  const addBook = (book: Book) => {
    setBooks([...books, book]);
  };

  const deleteBook = (id : number) => {
    setBooks(books.filter((book : Book) => book.id !== id));
  };

    
  
  return (
    <Router>
      <div className="p-4">
        <nav className="mb-4">
          <ul className="flex">
            <li className="mr-4"><Link to="/" className="text-blue-500 hover:text-blue-700">Books</Link></li>
            <li><Link to="/add-book" className="text-blue-500 hover:text-blue-700">Add Book</Link></li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={
            <>
              <Filter filterText={filterText} onFilterTextChange={setFilterText} />
              <Sort sortType={sortType} onSortTypeChange={setSortType} />
              <BookList books={filteredBooks} deleteBook={deleteBook} />
            </>
          } />
          <Route path="/add-book" element={<AddBookForm addBook={addBook} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;