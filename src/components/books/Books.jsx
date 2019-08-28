import React from 'react';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import PropTypes from 'prop-types';

// spinner
import Spinner from '../layout/Spinner';

const Books = ({books}) => {

    if(!books) return <Spinner />;

    return (  
        <div className="row">
            <div className="col-12 mb-4">
                <Link 
                    to={"/books/new"} 
                    className="btn btn-success"    
                >
                    <i className="fa fa-plus"></i> New Book
                </Link>
                
            </div>

            <div className="col-md-8">
                <h2>
                    <i className="fa-fa-book"></i> Books
                </h2>
            </div>

            <table className="table table-striped mt-4">
                <thead className="text-light bg-primary">
                    <tr align="center" >
                        <th>Title</th>
                        <th>ISBN</th>
                        <th>Publisher</th>
                        <th>Stock</th>
                        <th>Aviable</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    { books.map( book => (
                        <tr 
                            key={book.id}
                            align="center" 
                        >
                            <td>{book.title}</td>
                            <td>{book.isbn}</td>
                            <td>{book.publisher}</td>
                            <td>{book.stock}</td>
                            <td>{book.stock - book.borrowed.length}</td>
                            <td>
                                <Link
                                    to={`/books/show/${book.id}`}
                                    className="btn btn-info mr-2"
                                >
                                    <i className="fa fa-angle-double-right"></i> More Info
                                </Link>

                                <button 
                                    type="button"
                                    className="btn btn-danger ml-2"
                                >
                                    <i className="fa fa-trash"></i> Delete
                                </button>
                            </td>
                        </tr>
                    ) ) }
                </tbody>
            </table>
        </div>
    );
};

Books.propTypes = {
    firestore: PropTypes.object.isRequired,
    books: PropTypes.array
};
 
export default compose(
    firestoreConnect([{ collection: 'books' }]),
    connect( (state, props) => ({
        books: state.firestore.ordered.books
    }) )
)(Books);;