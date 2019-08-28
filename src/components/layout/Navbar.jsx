import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import PropTypes from 'prop-types';

const Navbar = ({auth, firebase}) => {

    // state
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // log out session
    const handleClick = () => {
        firebase.logout();
    }

    // get props auto
    useEffect(() => {
        const updateState = () => {
            if(auth.uid) {
                setIsAuthenticated(true);
            } else {
                setIsAuthenticated(false);
            }
        }

        updateState();
    }, [auth]);

    return (  
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary mb-5">
            <nav className="navbar-light">
                <span className="navbar-brand mb-0 h1"> Library Manager </span>
            </nav>

            <button 
                className="navbar-toggler" type="button" data-toggle="collapse" 
                data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarColor01">
                { isAuthenticated ? 
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link to={'/subs'} className="nav-link" >
                                Subscriptors
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to={'/'} className="nav-link" >
                                Books
                            </Link>
                        </li>
                    </ul>
                    : null
                }

                { isAuthenticated ?
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <a href="#!" className="nav-link" >
                                {auth.email}
                            </a>
                        </li>

                        <li className="nav-item">
                            <button 
                                type="button"
                                className="btn btn-danger"
                                onClick={handleClick}
                            >
                                Log Out
                            </button>
                        </li>
                    </ul>
                    : null
                }
                
            </div>
        </nav>
    );
};
 
Navbar.propTypes = {
    firebase: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
};

export default compose(
    firebaseConnect(),
    connect((state, props) => ({
        auth: state.firebase.auth
    }))
)(Navbar);