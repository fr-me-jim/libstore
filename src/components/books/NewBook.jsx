import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { firestoreConnect } from 'react-redux-firebase';
import PropTypes from 'prop-types';

const NewBook = (props) => {

    //state
    const [title, setTitle] = useState('');
    const [isbn, setISBN] = useState('');
    const [publisher, setPublisher] = useState('');
    const [stock, setStock] = useState('');

    // add to firestore
    const handleSubmit = e => {
        e.preventDefault();

        // get state
        const newBook = {
            title,
            isbn,
            publisher,
            stock,
            borrowed: []
        };

        // get firestore
        const { firestore, history } = props;

        // add to  bd
        firestore.add({collection: 'books'}, newBook)
            .then(() => history.push('/'));
    }

    return (  
        <div className="row">
            <div className="col-12 mb-4">
                <Link 
                    to={"/"}
                    className="btn btn-secondary"
                >
                    <i className="fa fa-arrow-circle-left"></i> Back to List
                </Link>
            </div>

            <div className="col-12">
                <h2>
                    <i className="fa fa-book"></i> New Book
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
                                    value={title}
                                    onChange={e => setTitle(e.target.value)}
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
                                    value={isbn}
                                    onChange={e => setISBN(e.target.value)}
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
                                    value={publisher}
                                    onChange={e => setPublisher(e.target.value)}
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
                                    value={stock}
                                    onChange={e => setStock(e.target.value)}
                                />
                            </div>

                            <button
                                type="submit"
                                className="btn btn-success"
                            >Add Book</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};
 
NewBook.propTypes = {
    firestore: PropTypes.object.isRequired
};
 
export default firestoreConnect()(NewBook);