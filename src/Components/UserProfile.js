import React, { useState, useContext, useEffect } from 'react'
import { auth, db} from '../Config/Config'
import '../styles/UserProfile.css'
import { useHistory } from 'react-router-dom'
import { UserContext } from '../Global/UserContext';
import {ToastAlert} from '../Utils/Toast'
import { formValidation} from '../Utils/ValidForm';

export const UserProfile = () => {
    const { user } = useContext(UserContext);
    const [email, setEmail] = useState(user.email);
    const [password, setPassword] = useState('');
    const [displayName, setdisplayName] = useState(user.name);
    const [phone, setPhone] = useState(user.phone);
    const [error, setError] = useState('');
    const [errorp, setErrorp] = useState('');
    const history = useHistory();

     useEffect(() => {
        if (!user) {
            history.push('/');
        }
    }, []);

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
        <>
        <div class="container top">
            <div class="row gutters">
                <div class="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
                    <div class="card h-100 w-75">
                        <div class="card-body">
                            <div class="account-settings">
                                <div class="user-profile">
                                    <div class="user-avatar mt-5">
                                     {
                                     (user.providerId == 'google.com') ? 
                                     <img  class='mt-2' src={user.photoURL} alt="443" /> : 
                                     <i class="fa fa-user-circle fa-5x mr-2 mt-2"></i> 
                                     }
                                    </div>
                                    <h3 class="user-name mt-5">{user.name}</h3>
                                    <h5 class="user-email">{user.email}</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
                    <div class="card h-100 w-100" >
                        <div class="card-body">
                            <div class="row gutters">
                                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                        <h6 class="mb-4 mt-5 text-success ">Personal Details</h6>
                                </div>
                                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                    <div class="form-group">
                                        <label class='p-2' >Full Name</label>
                                        <input type="text" class="form-control p-2" value={displayName}
                                                onChange={(e) => setdisplayName(e.target.value)}/>
                                    </div>
                                </div>
                                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                    <div class="form-group">
                                            <label class='p-2' for="phone">Phone</label>
                                        <input type="text" class="form-control p-2"  value={phone}
                                                onChange={(e) => setPhone(e.target.value)}/>
                                    </div>
                                </div>
                                  <div class="row gutters">
                                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                    <div class="text-right">
                                            {/* <button  class="btn btn-lg btn-outline-success mt-4 text-dark  border-success">Back</button> */}
                                            <button onClick={handleUpdatePersonalDetails}class="btn btn-lg btn-outline-success mt-4 text-dark  border-success">Update</button>
                                    </div>
                                </div>
                                     {errorp && <span className='error-msg bg-warning'>{errorp}</span>}

                            </div>
                                    {
                                    (user.providerId == 'password') ? <div class="row gutters">
                                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                            <h6 class="mb-2 text-success mt-4">Login Details</h6>
                                        </div>
                                        <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                            <div class="form-group">
                                                <label class='p-2' >Email-Login</label>
                                                <input type="text" class="form-control p-2" placeholder={email}
                                                    onChange={(e) => setEmail(e.target.value)} />
                                            </div>
                                        </div>
                                        <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                            <div class="form-group">
                                                <label class='p-2' >Enter new Password</label>
                                                <input type="password" class="form-control p-2" placeholder='Enter new Password'
                                                    onChange={(e) => setPassword(e.target.value)} />
                                            </div>
                                        </div>
                                        <div class="row gutters">
                                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                    <div class="text-right">
                                            <button onClick={handleUpdateLoginDetails}class="btn btn-lg btn-outline-success mt-4 text-dark  border-success">Update</button>
                                    </div>
                                </div>
                            </div>
                                    </div> : <div></div>
                                }
                            </div>
                                {error && <span className='error-msg bg-warning'>{error}</span>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}
