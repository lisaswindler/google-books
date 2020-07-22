import React from "react";
import "./style.css";

function Search() {
    return ( 
            <form>
                <label>
                    <div className="search-bar">
                    <input className="search-input"
                        type="search"
                        placeholder="Book search"
                    />
                    <button className="search-button" type="submit">Search</button>
                    </div>
                </label>
            </form>
    );
}

export default Search;
