import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { storage, db } from '../../Config/Config'
import { useHistory } from 'react-router-dom'
toast.configure();

export const AddProducts = () => {
    const history = useHistory();

    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState(0);
    const [productImg, setProductImg] = useState("");
    const [description, setDescription] = useState("");
    const [catagory, setCatagory] = useState("");
    const [catagoryAge, setCatagoryAge] = useState("");
    const [catagoryOption, setcatagoryOption] = useState([]);
    const [error, setError] = useState('');
    const types = ['image/png', 'image/jpeg']; // image types

    useEffect(() => {
        db.collection('Catagories').onSnapshot(snapshot => {
            setcatagoryOption(snapshot.docs.map(doc => ({name: doc.data().Catagory_Name })))
        })
    }, []);

    const handleBack = () => {
        history.push('/');
    }
    const productImgHandler = (e) => {
        let selectedFile = e.target.files[0];
        if (selectedFile && types.includes(selectedFile.type)) {
            setProductImg(selectedFile);
            setError('')
        }
        else {
            setProductImg(null);
            setError('Please select a valid image type (jpg or png)');
        }
    }

    // add product
    const addProduct = (e) => {
        e.preventDefault();
        const date = new Date();

        const uploadTask = storage.ref(`product-images/${productImg.name}`).put(productImg);
        uploadTask.on('state_changed', snapshot => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(progress);
        }, err => setError(err.message)
            , () => {
                storage.ref('product-images').child(productImg.name).getDownloadURL().then(url => {
                    db.collection('Products').add({
                        ProductName: productName,
                        ProductPrice: Number(productPrice),
                        ProductImg: url,
                        Description:description,
                        Catagory:catagory,
                        CatagoryAge: catagoryAge,
                        Views:0,
                        Sales:0,
                        DateCreate: date,
                        UplodeDate: date.getTime()
                    }).then(() => {
                        setProductName('');
                        setProductPrice(0)
                        setProductImg('');
                        setDescription('');
                        setCatagory('');
                        setCatagoryAge('');
                        setError('');

                        toast.info('this product is Add ', {
                            position: "top-right",
                            autoClose: 2000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: false,
                            draggable: false,
                            progress: undefined,
                        });
                        document.getElementById('file').value = '';
                    }).catch(err => setError(err.message))
                })
            })
            
    }

    return (
        
        <div className='container'>
            <br />
            {/* <button onClick={getCatgories}>????</button> */}
            <h2>ADD PRODUCTS</h2>
            <hr />
            <form autoComplete="off" className='form-group' onSubmit={addProduct}>
                <label htmlFor="product-name">Product Name</label>
                <input type="text" className='form-control' required
                    onChange={(e) => setProductName(e.target.value)} value={productName} />
                <br />
                <label >Product Price</label>
                <input type="number" className='form-control' required
                    onChange={(e) => setProductPrice(e.target.value)} value={productPrice} />
                <br />
                <label >Description</label>
                <input type="text" className='form-control' required
                    onChange={(e) => setDescription(e.target.value)} value={description} />
                <br />
                <select class="form-select" aria-label="Default select example"
                    onChange={(e) => setCatagory(e.target.value)} value={catagory} >
                    <option selected>Choose Catagory</option>
                    {catagoryOption.map(ca => <option  key={ca.name}value={ca.name}>{ca.name}</option>)}
                </select>
                <br />
                <select class="form-select" aria-label="Default select example"
                    onChange={(e) => setCatagoryAge(e.target.value)} value={catagoryAge} >
                    <option selected>Choose Catagory age</option>
                    <option value="1">3-16</option>
                    <option value="2">16-99</option>
                </select>
                <label htmlFor="product-img">Product Image</label>
                <input type="file" className='form-control' id="file" required
                    onChange={productImgHandler} />
                <br />
                <button type="submit" className='btn btn-success btn-md '>ADD</button>
                <button onClick={handleBack} className='btn btn-success btn-md  m-4'>Back</button>            </form>
            {error && <span className='error-msg'>{error}</span>}
        </div>
    )
}
