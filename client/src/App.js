import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Books from "./pages/Books";
import Detail from "./pages/Detail";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";
import axios from 'axios';

const App = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const onInputChange = (e) => {
        setSearchTerm(e.target.value);
    }

    let API_URL = `https://www.googleapis.com/books/v1/volumes`;

    const [books, setBooks] = useState({ items: [] });

    const fetchBooks = async () => {
        const result = await axios.get(`${API_URL}?q=${searchTerm}`);
        setBooks(result.data);
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
                <ul>
                    {
                        books.items.map((book, index) => {
                            return (
                                <li key={index}>
                                    <div>
                                        <img alt={`${book.volumeInfo.title} book`} src={`http://books.google.com/books/content?id=${book.id}&printsec=frontcover&img=1&zoom=1&source=gbs_api`} />
                                        <div>
                                            <h3>{book.volumeInfo.title}</h3>
                                            <p>{ bookAuthors(book.volumeInfo.authors) }</p>
                                            <p>{book.volumeInfo.publishedDate}</p>
                                            <button className="btn btn-primary">Save Book</button>
                                        </div>
                                    </div>
                                    <hr />
                                </li>
                            );
                        })
                    }
                </ul>
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
