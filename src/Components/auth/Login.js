import React, { useState,useContext,useEffect } from 'react'
import { auth, googleProvider, db } from '../../Config/Config'
import { Link, useHistory } from 'react-router-dom'
import './Login.css'
import { UserContext } from '../../Global/UserContext'
export const Login = () => {
    const { user } = useContext(UserContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const history = useHistory();

useEffect(() => {
  if(user){
      history.push("/");
  }
}, [user]);

    const LoginEmail_Pass = (e) => {
        e.preventDefault();
        auth.signInWithEmailAndPassword(email, password).then(() => {
            setEmail('');
            setPassword('');
            history.push('/');
        }).catch(err => setError(err.message));
    }
    //Google auth 
    const loginInWithGoogle = () => {
        auth.signInWithPopup(googleProvider).then(() => {
            history.push(`/`);
            console.log('login user by google auth succes');
        });;
    }
    return (
        <>
            <div className='container'>
                <br />
                <h2>Login</h2>
                <h1></h1>
                <div class='top'>
                <div >
                    <form autoComplete="off" className='form-group' onSubmit={LoginEmail_Pass}>
                        <label htmlFor="email">Email</label>
                        <input type="email" className='form-control' required
                            onChange={(e) => setEmail(e.target.value)} value={email} />
                        <br />
                        <label htmlFor="password">Password</label>
                        <input type="password" className='form-control' required
                            onChange={(e) => setPassword(e.target.value)} value={password} />
                        <br />

                        <button type="submit" className='btn btn-lg btn-google btn-block text-uppercase btn-outline-success'>LOGIN</button>
                    </form>
                    {error && <span className='error-msg'>{error}</span>}
                </div>
                <br />
                <div class="col-md-12"> <a onClick={loginInWithGoogle} class="btn btn-lg btn-google btn-block text-uppercase btn-outline-success" href="#"><img src="https://img.icons8.com/color/16/000000/google-logo.png" /> Login Using Google</a>
                </div>
                <div>
                    <br />
                    <span>Don't have an account? Register
                        <Link to="signup"> Here</Link>
                    </span>
                </div>
                <br />

            </div>
</div>
        </>
    )
}
