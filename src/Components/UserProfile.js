import React, { useState, useContext, useEffect } from 'react'
import { auth, db} from '../Config/Config'
import '../styles/UserProfile.css'
import { useHistory } from 'react-router-dom'
import { UserContext } from '../Global/UserContext';
import {ToastAlert} from '../Utils/Toast'
import { formValidation} from '../Utils/ValidForm';

export const UserProfile = () => {
    const { user } = useContext(UserContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [displayName, setdisplayName] = useState("");
    const [phone, setPhone] = useState("");
    const [error, setError] = useState('');
    const [errorp, setErrorp] = useState('');
    const history = useHistory();

    // if user active set data/ if not send to login page
     useEffect(() => {
         if(user){
            setEmail(user.email)
            setdisplayName(user.name)
            setPhone(user.phone)
         }else{
            history.push("/login");
         }
    }, [user]);

    // check valid inputs and updade in db 
      const handleUpdatePersonalDetails = () => {
          let vaildName = formValidation('name',displayName)
          let vaildPhone = formValidation('phone',phone);
          if(vaildName==true && vaildPhone==true){
        db.collection('users').doc(user.uid).update({
            PhoneNumber: (phone=='')?"":phone,
            DisplayName: displayName
        }).then(() => {
            setErrorp('');
            ToastAlert('Update User Details Succes');
        }).catch(err => setErrorp(err.message));
    }
    else{
        setErrorp((vaildName==true)?vaildPhone:vaildName)
    }
    }
    //change email and pass on Db
    const handleUpdateLoginDetails = () => {
        if(user.providerId=='password'){
            auth.currentUser.updateEmail(email.trim()).then(() => {
            console.log("Email updated!");
            db.collection('users').doc(user.uid).update({
                Email: email,
                Password: password,
            }).then(() => {
             setEmail('');
                setPassword('');
                history.push('/login')
            }).catch(err => setError(err.message));
            if(password !=''){
            auth.currentUser.updatePassword(password).then(() => {
            console.log("password updated!");
        }).catch(err => setError(err.message));
        }
        }).catch(err => setError(err.message));
        }
    }

    return (
      <div className="container mt-3">
        {!user && <h1>Loading....</h1>}
        {user && (
          <div className="row gutters">
            <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
              <div className="card h-100 w-75">
                <div className="card-body">
                  <div className="account-settings">
                    <div className="user-profile">
                      <div className="user-avatar mt-5">
                        {user.providerId == "google.com" ? (
                          <img className="mt-2" src={user.photoURL} alt="443" />
                        ) : (
                          <i className="fa fa-user-circle fa-5x mr-2 mt-2"></i>
                        )}
                      </div>
                      <h3 className="user-name mt-5">{user.name}</h3>
                      <h5 className="user-email">{user.email}</h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
              <div className="card h-100 w-100">
                <div className="card-body">
                  <div className="row gutters">
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                      <h6 className="mb-2 mt-2 text-success ">
                        Personal Details
                      </h6>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                      <div className="form-group">
                        <label className="p-2">Full Name</label>
                        <input
                          type="text"
                          className="form-control p-2"
                          value={displayName}
                          onChange={(e) => setdisplayName(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                      <div className="form-group">
                        <label className="p-2">Phone</label>
                        <input
                          type="text"
                          className="form-control p-2"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="row gutters">
                      <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                        <div className="text-right">
                          {/* <button  className="btn btn-lg btn-outline-success mt-4 text-dark  border-success">Back</button> */}
                          <button
                            onClick={handleUpdatePersonalDetails}
                            className="btn btn-lg btn-outline-success mt-4 text-dark  border-success"
                          >
                            Update
                          </button>
                        </div>
                      </div>
                      {errorp && (
                        <span className="error-msg bg-warning">{errorp}</span>
                      )}
                    </div>
                    {user.providerId == "password" ? (
                      <div className="row gutters">
                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                          <h6 className="mb-2 text-success mt-4">
                            Login Details
                          </h6>
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                          <div className="form-group">
                            <label className="p-2">Email-Login</label>
                            <input
                              type="text"
                              className="form-control p-2"
                              placeholder={email}
                              onChange={(e) => setEmail(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                          <div className="form-group">
                            <label className="p-2">Enter new Password</label>
                            <input
                              type="password"
                              className="form-control p-2"
                              placeholder="Enter new Password"
                              onChange={(e) => setPassword(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="row gutters">
                          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                            <div className="text-right mt-1">
                              <button
                                onClick={handleUpdateLoginDetails}
                                className="btn btn-lg btn-outline-success mt-3 text-dark  border-success"
                              >
                                Update
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div></div>
                    )}
                  </div>
                  {error && (
                    <span className="error-msg bg-warning">{error}</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
}
