import React, { useState, useContext, useEffect } from 'react'
import { db} from '../Config/Config'
import '../styles/UserProfile.css'
import { useHistory } from 'react-router-dom'
import { UserContext } from '../Global/UserContext';
import {ToastAlert} from '../Utils/Toast'
import { isEmpty } from 'lodash';

export const UserProfile = () => {
    const { user } = useContext(UserContext);

    useEffect(() => {
        if (isEmpty(user)) {
            history.push('/');
        }
    }, []);

    const [email, setEmail] = useState(user.email);
    const [password, setPassword] = useState('');
    const [displayName, setdisplayName] = useState(user.name);
    const [phone, setPhone] = useState(user.phone);
    const [error, setError] = useState('');
    const history = useHistory();

    const handleUpdateDetails = () => {
        db.collection('users').doc(user.uid).update({
            Email: email,
            PhoneNumber: phone,
            DisplayName: displayName
        }).then(() => {
            setEmail('');
            setPhone('');
            setdisplayName('');
            setError('');
            ToastAlert('Update User Details Succes');
        }).catch(err => setError(err.message));
        if(password != '' && user.providerId=='password'){
            db.collection('users').doc(user.uid).update({
                Password: password,
            }).then(() => {
                setPassword('');
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
                                        <input type="text" class="form-control p-2" placeholder={user.name}
                                                onChange={(e) => setdisplayName(e.target.value)}/>
                                    </div>
                                </div>
                                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                    <div class="form-group">
                                            <label class='p-2'>Email</label>
                                        <input type="email" class="form-control p-2"  placeholder={user.email}
                                                onChange={(e) => setEmail(e.target.value)}/>
                                    </div>
                                </div>
                                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                    <div class="form-group">
                                            <label class='p-2' for="phone">Phone</label>
                                        <input type="text" class="form-control p-2" placeholder={user.phone}
                                                onChange={(e) => setPhone(e.target.value)}/>
                                    </div>
                                </div>
                                    {(user.providerId == 'password') ? <div class="row gutters">
                                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                            <h6 class="mb-2 text-success mt-4">Login Details</h6>
                                        </div>
                                        <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                            <div class="form-group">
                                                <label class='p-2' >Email-Login</label>
                                                <input type="text" class="form-control p-2" placeholder={user.email}
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
                                    </div> : <div></div>
                                }
                            </div>
                                {error && <span className='error-msg'>{error}</span>}

                            <div class="row gutters">
                                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                    <div class="text-right">
                                            {/* <button  class="btn btn-lg btn-outline-success mt-4 text-dark  border-success">Back</button> */}
                                            <button onClick={handleUpdateDetails}class="btn btn-lg btn-outline-success mt-4 text-dark  border-success">Update</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}
