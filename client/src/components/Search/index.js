import React, { useState } from 'react';
import "./style.css";

const Search = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const onInputChange = (e) => {
        setSearchTerm(e.target.value);
    }

    return (
        <div className="jumbotron mx-0">
        <form>
            <label>
                <div className="search-bar">
                    <input
                        className="search-input"
                        type="search"
                        placeholder="Book search"
                        value={searchTerm}
                        onChange={onInputChange}
                    />
                    <button className="search-button" type="submit">Search</button>
                </div>
            </label>
        </form>
    </div>
    );
}

export default Search;
