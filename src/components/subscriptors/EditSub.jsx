import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import PropTypes from 'prop-types';

// spinner
import Spinner from '../layout/Spinner';

const EditSub = (props) => {

    // refs
    const inputName = useRef('');
    const inputSurename = useRef('');
    const inputDegree = useRef('');
    const inputCode = useRef('');

    // extract firestore from props
    const { subscriptor, firestore, history } = props;

    if(!subscriptor) return <Spinner />;

    // add new sub
    const handleSubmit = e => {
        e.preventDefault();

        // get ref values
        const name = inputName.current.value;
        const surename = inputSurename.current.value;
        const degree = inputDegree.current.value;
        const code = inputCode.current.value;

        // sub with the new changes
        const editedSub = {
            name,
            surename,
            degree,
            code
        };


        // store in firestore db
        firestore.update({
            collection: 'subscriptors',
            doc: subscriptor.id
        }, editedSub).then(() => history.push('/subs'));
    };

    return (  
        <div className="row">
            <div className="col-12 mb-4">
                <Link 
                    to={'/subs'}
                    className="btn btn-secondary"
                >
                    <i className="fa fa-arrow-circle-left"></i> Back to Subs
                </Link>
            </div>

            <div className="col-12">
                <h2>
                    <i className="fa fa-user"></i> Edit Sub
                </h2>

                <div className="row justify-content-center">
                    <div className="col-md-8 mt-5">
                        <form 
                            onSubmit={handleSubmit}
                        >
                            <div className="form-group">
                                <label>Name: </label>
                                <input 
                                    type="text" 
                                    className="form-control"
                                    name="name"
                                    placeholder="Subscriptor's Name"
                                    required  
                                    ref={inputName}
                                    defaultValue={subscriptor.name}
                                />
                            </div>

                            <div className="form-group">
                                <label>Surename: </label>
                                <input 
                                    type="text" 
                                    className="form-control"
                                    name="surename"
                                    placeholder="Subscriptor's Surename"
                                    required  
                                    ref={inputSurename}
                                    defaultValue={subscriptor.surename}
                                />
                            </div>

                            <div className="form-group">
                                <label>Degree: </label>
                                <input 
                                    type="text" 
                                    className="form-control"
                                    name="degree"
                                    placeholder="Subscriptor's Degree"
                                    required  
                                    ref={inputDegree} 
                                    defaultValue={subscriptor.degree}
                                />
                            </div>

                            <div className="form-group">
                                <label>Code: </label>
                                <input 
                                    type="text" 
                                    className="form-control"
                                    name="code"
                                    placeholder="Subscriptor's Surename"
                                    required  
                                    ref={inputCode}  
                                    defaultValue={subscriptor.code}
                                />
                            </div>

                            <input 
                                type="submit" 
                                className="btn btn-success"
                                value="Save changes"
                            />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

EditSub.propTypes = {
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
)(EditSub);