import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import PropTypes from 'prop-types';

// spinner
import Spinner from '../layout/Spinner';

const EditBook = (props) => {

    // refs
    const inputTitle = useRef('');
    const inputISBN = useRef('');
    const inputPublisher = useRef('');
    const inputStock = useRef('');

    // extract firestore from props
    const { book, firestore, history } = props; 

    if(!book) return <Spinner />;


    // add to firestore
    const handleSubmit = e => {
        e.preventDefault();

        // get ref values
        const title = inputTitle.current.value;
        const isbn = inputISBN.current.value;
        const publisher = inputPublisher.current.value;
        const stock = inputStock.current.value;
        const { borrowed } = book;

        // get state
        const editedBook = {
            title,
            isbn,
            publisher,
            stock,
            borrowed
        };

        
        // store in firestore db
        firestore.update({
            collection: 'books',
            doc: book.id
        }, editedBook).then(() => history.push('/'));
    }

    return (  
        <div className="row">
            <div className="col-12 mb-4">
                <Link 
                    to={'/subs'}
                    className="btn btn-secondary"
                >
                    <i className="fa fa-arrow-circle-left"></i> Back to List
                </Link>
            </div>

            <div className="col-12">
                <h2>
                    <i className="fa fa-user"></i> Edit Book
                </h2>

                <div className="row justify-content-center">
                    <div className="col-md-8 mt-5">
                        <form
                            onSubmit={handleSubmit}
                        >
                            <div className="form-group">
                                <label>Title: </label>
                                <input 
                                    type="text" 
                                    className="form-control"
                                    name="title"    
                                    placeholder="Book's Title"
                                    required
                                    defaultValue={book.title}
                                    ref={inputTitle}
                                />
                            </div>

                            <div className="form-group">
                                <label>ISBN: </label>
                                <input 
                                    type="text" 
                                    className="form-control"
                                    name="isbn"    
                                    placeholder="Book's ISBN"
                                    required
                                    defaultValue={book.isbn}
                                    ref={inputISBN}
                                />
                            </div>

                            <div className="form-group">
                                <label>Publisher: </label>
                                <input 
                                    type="text" 
                                    className="form-control"
                                    name="publisher"    
                                    placeholder="Book's Publisher"
                                    required
                                    defaultValue={book.publisher}
                                    ref={inputPublisher}
                                />
                            </div>

                            <div className="form-group">
                                <label>Stock: </label>
                                <input 
                                    type="number" 
                                    min="0"
                                    className="form-control"
                                    name="stock"    
                                    placeholder="Book's Stock"
                                    required
                                    defaultValue={book.stock}
                                    ref={inputStock}
                                />
                            </div>

                            <button
                                type="submit"
                                className="btn btn-success"
                            >Save Changes</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};
 
EditBook.propTypes = {
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
)(EditBook);