import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import PropTypes from 'prop-types';

// spinner
import Spinner from '../layout/Spinner';
import SubCard from '../subscriptors/SubCard';

// actions
import { findSub } from '../../actions/findSubAction';

const BorrowBook = (props) => {

    // state
    const [search, setSearch] = useState('');
    const [result, setResult] = useState(false);
    const [noResult, setNoResult] = useState(false);

    // extract firestore from props
    const { book, firestore, history, sub, findSub } = props; 

    if(!book) return <Spinner />;


    // store 
    const handleClick = () => {
        const obtainedSub = sub;

        // date
        obtainedSub.date = new Date().toLocaleDateString();

        // props can't be muted, so get a copy
        let borrowed = [];
        borrowed = [...book.borrowed, obtainedSub];

        const updatedBook = {...book};
        delete updatedBook.borrowed;
        updatedBook.borrowed = borrowed;

        // store in bd
        firestore.update({
            collection: 'books',
            doc: updatedBook.id
        }, updatedBook).then(history.push('/')); 

    }

    // find sub
    const handleSubmit = e => {
        e.preventDefault();

        // query
        const collection = firestore.collection('subscriptors');
        const query = collection.where("code", "==", search).get();

        // get data
        query.then(response => {
            if( response.empty ) {
                // no results
                setNoResult(true);
                findSub({});
                setResult(false);
            } else {
                const data = response.docs[0].data();
                findSub(data);
                setNoResult(false);
                setResult(true);

            }
        })
    };

    var subCard, borrowBtn;
    if(result) {
        subCard = <SubCard sub={sub} />
        borrowBtn = <button 
                        type="submit"
                        onClick={handleClick}
                        className="btn btn-success">Borrow Book</button>
    } else {
        subCard = null;
        borrowBtn = null;
    }

    return (  
        <div className="row">
            <div className="col-12 mb-4">
                <Link 
                    to={'/'}
                    className="btn btn-secondary"
                >
                    <i className="fa fa-arrow-circle-left"></i> Back to List
                </Link>
            </div>

            <div className="col-12">
                <h2>
                    <i className="fa fa-book"></i> Borrow Book: {book.title}
                </h2>

                <div className="row justify-content-center mt-5">
                    <div className="col-md-8">
                        <form
                            onSubmit={handleSubmit}
                            className="mb-4"
                        >
                            <legend className="color-primary text-center">
                                Find subscriptors by their code
                            </legend>

                            <div className="form-group">
                                <input 
                                    type="text" 
                                    className="form-control"
                                    name="search"
                                    onChange={e => setSearch(e.target.value)}
                                />
                                <i className="fas fa-search"></i>
                            </div>

                            <button 
                                type="submit"
                                className="btn btn-primary btn-block"
                            > Find Subscriptor </button>
                        </form>

                        {/* Show button + sub card */}
                        {subCard}
                        {borrowBtn}
                        {noResult ? 
                            <div className="alert alert-danger text-center">
                                Subscriptor not found.
                            </div>
                            : null
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};
 
BorrowBook.propTypes = {
    firestore: PropTypes.object.isRequired
};
 
export default compose(
    firestoreConnect(props => [
        {
            collection: 'books',
            storeAs: 'book',
            doc: props.match.params.id
        }
    ]),
    connect(({ firestore: {ordered}, sub }, props) => ({
        book: ordered.book && ordered.book[0],
        sub: sub
    }), { findSub })
)(BorrowBook);