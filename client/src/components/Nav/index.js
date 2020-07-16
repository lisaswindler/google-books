import React from "react";
import "./style.css";

function Nav() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark">
            <a className="navbar-brand" href="/">
                Google Bookshelf
      </a>
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
        </nav>
    );
}

export default Nav;
