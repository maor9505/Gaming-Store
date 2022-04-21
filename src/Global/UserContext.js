import React, { createContext, useEffect, useState } from 'react'
import { db } from '../Config/Config'
import { auth} from '../Config/Config'
import { getUser } from '../DbModal/User';

export const UserContext = createContext();

export const UserContextProvider = (props) => {

    const [user, setUser] = useState(null)
    useEffect(() => {
      
        auth.onAuthStateChanged(user => {
            if (user) {
               db.collection("users")
                 .doc(user.uid)
                 .get()
                 .then((snapshot) => {
                   setUser(getUser(snapshot, user));
                 });

            }
        })
    
    },[])

    return (
        <UserContext.Provider value={{ user: user,setUser: setUser }}>
        {props.children}
        </UserContext.Provider>
    )
}