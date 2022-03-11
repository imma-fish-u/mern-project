import React from 'react';
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="navbar navbar-light bg-light mb-3 d-flex justify-content-center ">
            <Link to="/" style={{ textDecoration: "none" }}>
                <span className="mb-0 h1 font-weight-bold" style={{ cursor: "pointer" }}>RESUME BUILDER</span>
            </Link>
        </nav>
    );
};

export default Navbar;
