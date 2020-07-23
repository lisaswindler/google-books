import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Books from "./pages/Books";
import Detail from "./pages/Detail";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";
import API from "./utils/API";
import axios from 'axios';
let bookArray = [];

const App = () => {
    bookArray = [];

    // componentDidMount() {
    //     this.loadBooks();
    //   }

    const [searchTerm, setSearchTerm] = useState('');
    const onInputChange = (e) => {
        setSearchTerm(e.target.value);
    }

    let API_URL = `https://www.googleapis.com/books/v1/volumes`;

    const [books, setBooks] = useState({ items: [] });

    const fetchBooks = async () => {
        const result = await axios.get(`${API_URL}?q=${searchTerm}`);
        setBooks(result.data);
        for (let i=0; i<result.data.items.length; i++) {
            bookArray.push(result.data.items[i]);
        }
        console.log(bookArray);
    };

    // Submit handler
    const onSubmitHandler = (e) => {
        // Prevent browser refreshing after form submission
        e.preventDefault();
        // Call fetch books async function
        fetchBooks();
    }

    const bookAuthors = authors => {
        if (authors.length <= 2) {
            authors = authors.join(' and ');
        } else if (authors.length > 2) {
            let lastAuthor = ' and ' + authors.slice(-1);
            authors.pop();
            authors = authors.join(', ');
            authors += lastAuthor;
        }
        return authors;
    };

    // const state = {
    //     books: [],
    //     title: "",
    //     author: "",
    //     synopsis: ""
    //   };
    
      const loadBooks = () => {
        API.getBooks()
          .then(res =>
            this.setState({ books: res.data, title: "", author: "", synopsis: "", image: "", link: "" })
          )
          .catch(err => console.log(err));
      };
    
      const deleteBook = id => {
        API.deleteBook(id)
          .then(res => this.loadBooks())
          .catch(err => console.log(err));
      };
    
      const handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
          [name]: value
        });
      };

    const handleFormSubmit = event => {
        event.preventDefault();
        console.log(event.target.id);
        let bookIndex = event.target.id;
        let bookInfo = bookArray[bookIndex].volumeInfo;
        let imageId = bookArray[bookIndex].id;
        let imageLink = 'http://books.google.com/books/content?id=' + imageId + '&printsec=frontcover&img=1&zoom=1&source=gbs_api';
          API.saveBook({
            title: bookInfo.title,
            author: bookInfo.authors,
            synopsis: bookInfo.description,
            image: imageLink,
            link: bookInfo.infoLink
          })
            .then(res => this.loadBooks())
            .catch(err => console.log(err));
      };

    return (
        <Router>
            <div>
                <Nav />
                <form onSubmit={onSubmitHandler}>
                    <label>
                        <div className="search-bar">
                            <input className="search-input"
                                type="search"
                                placeholder="Book search"
                                value={searchTerm}
                                onChange={onInputChange}
                            />
                            <button className="search-button" type="submit">Search</button>
                        </div>
                    </label>
                </form>
                <div className="row px-5">
                    {
                        books.items.map((book, index) => {
                            return (
                                <div key={index} className="col-md-3">
                                    <div>
                                        <img className="w-100" alt={`${book.volumeInfo.title} book`} src={`http://books.google.com/books/content?id=${book.id}&printsec=frontcover&img=1&zoom=1&source=gbs_api`} />
                                        <div>
                                            <h4 className="pt-2">{book.volumeInfo.title}</h4>
                                            <p>{ bookAuthors(book.volumeInfo.authors) }</p>
                                            <button 
                                            className="btn btn-primary" 
                                            onClick={handleFormSubmit}
                                            id={index}>Save Book</button>
                                        </div>
                                    </div>
                                    <hr />
                                </div>
                            );
                        })
                    }
                </div>
                <Switch>
                    <Route exact path="/" component={Books} />
                    <Route exact path="/books" component={Books} />
                    <Route exact path="/books/:id" component={Detail} />
                    <Route component={NoMatch} />
                </Switch>
            </div>
        </Router>
    );
}

export default App;
