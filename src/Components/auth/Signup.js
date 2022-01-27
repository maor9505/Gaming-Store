import React, { useState } from 'react'
import { auth, db ,googleProvider} from '../../Config/Config'
import { Link,useHistory } from 'react-router-dom'
import './Login.css'
import { formValidation} from '../../Utils/ValidForm';
import { ToastAlert } from '../../Utils/Toast';



export const Signup = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [displayName, setdisplayName] = useState('');
    const [phone, setPhone] = useState('');
    const history = useHistory();
    const [error, setError] = useState('');

    // signup
    const signup = (e) => {
        e.preventDefault();
          let vaildName = formValidation('name',displayName)
          let vaildPhone = formValidation('phone',phone);
          if(vaildName==true && vaildPhone==true){
        auth.createUserWithEmailAndPassword(email, password).then((cred) => {
            db.collection('users').doc(cred.user.uid).set({
                Email: email,
                Password: password,
                Type: "not-admin",
                PhoneNumber: phone,
                DisplayName: displayName
            }).then(() => {
                setEmail('');
                setPassword('');
                setPhone('');
                setdisplayName('');
                setError('');
                history.push('/login');
                ToastAlert('Succes User create')
            }).catch(err => setError(err.message));
        }).catch(err => setError(err.message));
    }
    else{
        setError((vaildName==true)?vaildPhone:vaildName)

    }
    }
    //Google auth 
    const signInWithGoogle = () => {
        auth.signInWithPopup(googleProvider).then((res) => {
            db.collection('users').doc(res.user.uid).set({
                Email: res.user.email,
                Type: "not-admin",
                PhoneNumber: res.user.phoneNumber,
                DisplayName: res.user.displayName
            }).then(() => {
                history.push(`/`);
                console.log('create user by google auth succes')
            })
        });;
    }


    return (
      <div className="container">
        <br />
        <h2>Sign up</h2>
        <br />
        <span>
          Already have an account Or Google account? Login
          <Link to="login"> Here</Link>
        </span>
        <div className="col-sm-12">
            <br/>
          <a
            onClick={signInWithGoogle}
            className="btn btn-lg btn-google btn-block text-uppercase btn-outline-success"
            href="#"
          >
            <img src="https://img.icons8.com/color/16/000000/google-logo.png" />{" "}
            Signup Using Google
          </a>
        </div>

        <h1></h1>
        <form className="form-group" onSubmit={signup}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="form-control"
            required
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <br />
          <label htmlFor="passowrd">Password</label>
          <input
            type="password"
            className="form-control"
            required
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <br />
          <label htmlFor="text">Full Name</label>
          <input
            type="text"
            className="form-control"
            required
            onChange={(e) => setdisplayName(e.target.value)}
            value={displayName}
          />
          <br />
          <label htmlFor="phone">Phone-Number</label>
          <input
            type="text"
            className="form-control"
            required
            onChange={(e) => setPhone(e.target.value)}
            value={phone}
          />
          <br />
          <button
            type="submit"
            className=" btn btn-lg text-uppercase btn-outline-success"
          >
            SUBMIT
          </button>
        </form>
        {error && <span className="error-msg bg-warning">{error}</span>}
        <br />
      </div>
    );
}
