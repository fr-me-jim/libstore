import React from 'react';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import PropTypes from 'prop-types';

// spinner
import Spinner from '../layout/Spinner';

const Subscriptors = ({subscriptors, firestore}) => {

    if(!subscriptors) return <Spinner />;

    // handle clicks 
    const handleClick = id => {
        // delete
        firestore.delete({
            collection: 'subscriptors',
            doc: id
        });
    
    }


    return (  
        <div className="row">
            <div className="col-md-12 mb-4">
                <Link 
                    to={'/subs/new'}
                    className="btn btn-success"
                >
                    <i className="fa fa-plus"></i> New Sub
                </Link>
            </div>

            <div className="col-md-8">
                <h2>
                    <i className="fa fa-users"></i> Subscriptors
                </h2>
            </div>

            <table className="table table-striped mt-4">
                <thead className="text-light bg-primary">
                    <tr align="center" >
                        <th>Name</th>
                        <th>Degree</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {subscriptors.map(sub => (
                        <tr key={sub.id} align="center" >
                            <td>{sub.name} {sub.surename}</td>
                            <td>{sub.degree}</td>
                            <td>
                                <Link
                                    to={`/subs/show/${sub.id}`}
                                    className="btn btn-info mr-2"
                                >
                                    <i className="fa fa-angle-double-right"></i> More info
                                </Link>

                                <button 
                                    type="button"
                                    className="btn btn-danger ml-2"
                                    onClick={() => handleClick(sub.id)}
                                >
                                    <i className="fa fa-trash-alt"></i> Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

Subscriptors.propTypes = {
    firestore: PropTypes.object.isRequired,
    subscriptors: PropTypes.array
}
 
export default compose(
    firestoreConnect([{ collection: 'subscriptors' }]),
    connect( (state, props) => ({
        subscriptors: state.firestore.ordered.subscriptors
    }) )
)(Subscriptors);