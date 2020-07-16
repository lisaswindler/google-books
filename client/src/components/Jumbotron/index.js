import React from "react";
import "./style.css";

function Jumbotron({ children }) {
    return (
        <div
            className="jumbotron mx-0"
        >
            {children}
        </div>
    );
}

export default Jumbotron;
