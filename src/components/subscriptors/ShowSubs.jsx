import React from 'react';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import PropTypes from 'prop-types';

// spinner
import Spinner from '../layout/Spinner';

const ShowSubs = ({subscriptor}) => {

    if (!subscriptor) return <Spinner />;

    return (  
        <div className="row">
            <div className="col-md-6 mb-4">
                <Link 
                    to={'/subs'}
                    className="btn btn-secondary"
                >
                    <i className="fa fa-arrow-circle-left"></i> Back to Subs
                </Link>
            </div>

            <div className="col-md-6">
                <Link 
                    to={`/subs/edit/${subscriptor.id}`}
                    className="btn btn-primary float-right"
                >
                    <i className="fa fa-pencil-alt"></i> Edit Sub
                </Link>
            </div>

            <hr className="mx-5 w-100"/>

            <div className="col-12">
                <h2 className="mb-4">
                    {subscriptor.name} {subscriptor.surename}
                </h2>

                <p>
                    <span className="font-weight-bold">
                        Degree: 
                    </span> {subscriptor.degree}
                </p>

                <p>
                    <span className="font-weight-bold">
                        Code: 
                    </span> {subscriptor.code}
                </p>
            </div>
        </div>
    );
};

ShowSubs.propTypes = {
    firestore: PropTypes.object.isRequired
};
 
export default compose(
    firestoreConnect(props => [
        {
            collection: 'subscriptors',
            storeAs: 'subscriptor',
            doc: props.match.params.id
        }
    ]),
    connect(({ firestore: {ordered} }, props) => ({
        subscriptor: ordered.subscriptor && ordered.subscriptor[0]
    }))
)(ShowSubs);