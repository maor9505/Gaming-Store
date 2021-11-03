import React, { useState, useContext,useEffect } from 'react'
import { db } from '../../Config/Config'


export const HeaderProducts = (props) => {
    const {hanldeChangeFilterOption} = props;
    const [catagoryOption, setcatagoryOption] = useState([]);
    

    useEffect(() => {
        db.collection('Catagories').onSnapshot(snapshot => {
            setcatagoryOption(snapshot.docs.map(doc => ({ name: doc.data().Catagory_Name })))
        })
    }, []);


    return (
        <div class='input-group input-group-lg mb-3 ' >
            <select class="form-select" 
                onChange={(e) => hanldeChangeFilterOption('Catagory',e.target.value)}>
                <option value="0"  selected>Choose Catagory (All)</option>
                {catagoryOption.map(ca => <option value={ca.name}>{ca.name}</option>)}
            </select>
            <select class="form-select ms-4" 
                onChange={(e) => hanldeChangeFilterOption('Age',e.target.value)}  >
                <option  value ="0" selected>Choose Catagory age</option>
                <option value="1">3-16</option>
                <option value="2">16-99</option>
            </select>
            <input type="number" className='form-control ms-4' placeholder="Input Price:" 
                onChange={(e) => hanldeChangeFilterOption('Price',e.target.value)}  />
        </div>
    )
}
