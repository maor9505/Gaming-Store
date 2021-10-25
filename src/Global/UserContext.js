import React, { createContext, useEffect, useState } from 'react'
import { db } from '../Config/Config'
import { auth} from '../Config/Config'
import { isEmpty } from 'lodash';
import { getUser } from '../DbModal/User';

export const UserContext = createContext();

export const UserContextProvider = (props) => {
    const [user, setUser] = useState({})
    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if (user) {
                console.log(user.photoURL)
                db.collection('users').doc(user.uid).get().then(snapshot => {
                    setUser(getUser(snapshot,user))
                })
            }
            else {
                setUser(null)
            }
        })
    }, [])

    return (
        <UserContext.Provider value={{ user: user }}>
            {props.children}
        </UserContext.Provider>
    )
}