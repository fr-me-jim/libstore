import React from 'react';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';

const Subscriptors = ({subscriptors}) => {

    if(!subscriptors) return <h1>Loading...</h1>;

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
                                    className="btn btn-info btn-block"
                                >
                                    <i className="fa fa-angle-double-right"></i> More info
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
 
export default compose(
    firestoreConnect([{ collection: 'subscriptors' }]),
    connect( (state, props) => ({
        subscriptors: state.firestore.ordered.subscriptors
    }) )
)(Subscriptors);