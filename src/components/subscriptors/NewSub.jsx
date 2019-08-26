import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { firestoreConnect } from 'react-redux-firebase';
import PropTypes from 'prop-types';

const NewSub = (props) => {

    //state
    const [name, setName] = useState('');
    const [surename, setSurename] = useState('');
    const [degree, setDegree] = useState('');
    const [code, setCode] = useState('');

    // add new sub
    const handleSubmit = e => {
        e.preventDefault();

        // get values from state
        const newSub = {
            name,
            surename,
            degree,
            code
        };

        // extract firestore from props
        const { firestore, history } = props;

        // store in firestore db
        firestore.add({
            collection: 'subscriptors'
        }, newSub).then(() => history.push('/subs'));
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
                    <i className="fa fa-user-plus"></i> New Sub
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
                                    onChange={ e => setName(e.target.value) }  
                                    value={name}
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
                                    onChange={ e => setSurename(e.target.value) }  
                                    value={surename}
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
                                    onChange={ e => setDegree(e.target.value) }  
                                    value={degree}
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
                                    onChange={ e => setCode(e.target.value) }  
                                    value={code}
                                />
                            </div>

                            <input 
                                type="submit" 
                                className="btn btn-success"
                                value="Add Sub"
                            />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

NewSub.propTypes = {
    firestore: PropTypes.object.isRequired
}
 
export default firestoreConnect()(NewSub);