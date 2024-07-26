import React, { useEffect } from 'react'
import { Link, useLocation } from "react-router-dom";

const Navbar = (props) => {
    let location = useLocation();
    useEffect(() => {
    }, [location]);
    return (
        <nav className={`navbar navbar-expand-lg bg-body-tertiary bg-${props.mode} border-bottom border-body`} data-bs-theme={`${props.mode}`}>
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">MyNotebook</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} to="/about">About</Link>
                        </li>
                    </ul>
                    <div className="d-flex">
                        <div className={`bg-${props.mode === 'light' ? 'dark' : 'light'} rounded mx-3 `} onClick={() => props.toggleMode()} style={{ height: '30px', width: '30px', cursor: 'pointer' }}></div>
                    </div>
                    {!localStorage.getItem('token') ? <form className='d-flex'>
                        <Link className="btn btn-secondary mx-2" role="button" to="/login">Login</Link>
                        <Link className="btn btn-secondary mx-2" role="button" to="/signup">Sign-up</Link>
                    </form> : <Link className="btn btn-secondary mx-2" role="button" to="/login" onClick={() => { localStorage.removeItem('token') }}>Logout</Link>}
                </div>
            </div>
        </nav>
    )
}

export default Navbar
