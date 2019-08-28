import React from 'react';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import PropTypes from 'prop-types';

// spinner
import Spinner from '../layout/Spinner';

const ShowBook = (props) => {

    // extract firestore from props
    const { book, firestore } = props; 

    if(!book) return <Spinner />;

    var borrowButton;

    if( book.stock - book.borrowed.length > 0 ) {
        borrowButton = <Link to={`/books/borrow/${book.id}`}
                            className="btn btn-success">Borrow Book</Link>
    } else borrowButton = null;

    // return book
    const handleClick = code => {
        
        // get copy of book
        const updateBook = {...book};

        // delete borrower from array
        const borrowers = book.borrowed.filter( borrower => borrower.code !== code );
        updateBook.borrowed = borrowers;

        // update firestore
        firestore.update({
            collection: 'books',
            doc: updateBook.id
        }, updateBook);

    }
    

    return (  
        <div className="row">
            <div className="col-md-6 mb-4">
                <Link to={"/"} className="btn btn-secondary">
                    <i className="fa fa-arrow-circle-left"></i> Back to List
                </Link>
            </div>

            <div className="col-md-6 mb-4">
                <Link to={"/books/edit/${book.id"} className="btn btn-primary float-right">
                    <i className="fa fa-pencil-alt"></i> Edit Book
                </Link>
            </div>

            <hr className="mx-5 w-100"/>

            <div className="col-12">
                <h2 className="mb-4">{book.title}</h2>

                <p>
                    <span className="font-weight-bold">ISBN: </span> {book.isbn}
                </p>
                <p>
                    <span className="font-weight-bold">Publisher: </span> {book.publisher}
                </p>
                <p>
                    <span className="font-weight-bold">Stock: </span> {book.stock}
                </p>
                <p>
                    <span className="font-weight-bold">Aviable: </span> {book.stock - book.borrowed.length  }
                </p>

                {/* Show borrow button */}
                {borrowButton}

                <h3 className="my-5">Subs that borrowed this book</h3>
                {/* Show Borrowers */}
                {book.borrowed.map( borrower => (
                    <div key={borrower.id} className="card my-2">
                        <h4 className="card-header">
                            {borrower.name} {borrower.surename}
                        </h4>

                        <div className="card-body">
                            <p>
                                <span className="font-weight-bold">Degree: </span> {borrower.degree}
                            </p>

                            <p>
                                <span className="font-weight-bold">Borrow Date: </span> {borrower.date}
                            </p>
                        </div>

                        <div className="card-footer">
                            <button 
                                type="submit"
                                className="btn btn-success font-weight-bold"
                                onClick={() => handleClick(borrower.code)}   
                            >Return Book</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
 
ShowBook.propTypes = {
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
    connect(({ firestore: {ordered} }, props) => ({
        book: ordered.book && ordered.book[0]
    }))
)(ShowBook);