import React, { useState } from 'react';
import { firebaseConnect } from 'react-redux-firebase';


const Login = (props) => {

    // state
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = e => {
        e.preventDefault();

        // get firebase
        const { firebase, history } = props;

        // authenticate user
        firebase.login({
            email,
            password
        }).then(history.push('/'));
    }

    return (  
        <div className="row justify-content-center">
            <div className="col-md-5">
                <div className="card mt-5">
                    <div className="card-body">
                        <h2 className="text-center py-4">
                            <i className="fas fa-lock"></i> Log In
                        </h2>

                        <form
                            onSubmit={handleSubmit}
                        >
                            <div className="form-group">
                                <label>Email: </label>
                                <input 
                                    type="text" 
                                    className="form-control"
                                    name="email"
                                    required
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}    
                                />
                            </div>

                            <div className="form-group">
                                <label>Password: </label>
                                <input 
                                    type="text" 
                                    className="form-control"
                                    name="password"
                                    required
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}    
                                />
                            </div>

                            <button 
                                type="submit"
                                className="btn btn-info btn-block"
                            > Log In </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default firebaseConnect()(Login);