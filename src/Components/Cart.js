import React, { useContext, useEffect,useState } from 'react'
import { CartContext } from '../Global/CartContext'
import { Icon } from 'react-icons-kit'
import { ic_add } from 'react-icons-kit/md/ic_add'
import { ic_remove } from 'react-icons-kit/md/ic_remove'
import { iosTrashOutline } from 'react-icons-kit/ionicons/iosTrashOutline'
import { useHistory,Link } from 'react-router-dom'
import {db} from '../Config/Config'
import '../styles/Cart.css'
import { GooglePay } from './common/GooglePay'
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
//blalblbabla
toast.configure();

export const Cart = ({ user }) => {
    const {dispatch} = useContext(CartContext);
    const [cartProduct, setcartProduct] = useState([]);
    const history = useHistory();

    const CalcTotalSum = () => {
        let sum = 0;
        cartProduct.map(pro => sum += pro.ProductPrice * pro.qty);
        return sum;
    }
    const CalcTotalQty = () => {
        let sum = 0;
        cartProduct.map(pro => sum += pro.qty);
        return sum;
    }
    const totalPrice=CalcTotalSum();
    console.log(totalPrice);
    const totalQty = CalcTotalQty();

    useEffect(() => {
            if (!user) {
                history.push('/login');
             }
             else{
                db.collection('Cart').doc('Cart ' + user.uid).collection('CartProducts').onSnapshot(snapshot => {
                    const newCart = snapshot.docs.map((doc) => ({
                        ID: doc.id,
                        ...doc.data()
                        }));
                        setcartProduct(newCart);
                });
            }
    },[]);

    
    const handleOrderToDb = (paymentRequest)=>{
        const  date= new Date();
        const time = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
        db.collection('Orders').doc(user.uid + ' Orders').collection('OrderDetails').doc('Order ' + date.getTime()).set({
            userID: user.uid,
            OrderDetails: cartProduct,
            TotalPrice:totalPrice,
            TotalQty:totalQty,
            ShippingAddress:paymentRequest.shippingAddress,
            DateCreate: date,
            DateTime: time
        }).then(() => {
            console.log("success Order to db");
            // Delete cart user after order succes
            db.collection('Cart').doc('Cart ' + user.uid).collection('CartProducts').onSnapshot(snapshot => {
                snapshot.docs.map((doc) => {
                    db.collection('Cart').doc('Cart ' + user.uid).collection('CartProducts').doc(doc.id).delete().then(() => {
                        console.log("Delete Cart user");
                    }).catch(err => console.log(err.message));
                });
            });
        }).catch(err => console.log(err.message));

        toast.info('Order Success', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
        });
    }

    
    return (
            <>
            {cartProduct.length !== 0 && <h1>Cart</h1>}

            <div className='cart-container'>
                    {
                        cartProduct.length === 0 && <>
                            <div>no items in your cart or slow internet causing trouble (Refresh the page) or you are not logged in</div>
                            <div><Link to="/">Return to Home page</Link></div>
                        </>
                    }
                    {cartProduct && cartProduct.map(cart => (
                        <div className='cart-card' key={cart.ProductID}>
                            <div className='cart-img'>
                                <img src={cart.ProductImg} alt="not found" />
                            </div>
                            <div><Link style={{ textDecoration: 'none', color: 'black' }} to={{ pathname: `/products/${cart.ProductID}` }}>{cart.ProductName}</Link></div>

                            <div className='cart-price-orignal'>Rs {cart.ProductPrice}.00</div>

                            <div className='inc' onClick={() => dispatch({ type: 'INC', id: cart.ProductID, cart })}>
                                <Icon icon={ic_add} size={24} />
                            </div>

                            <div className='quantity'>{cart.qty}</div>

                            <div className='dec' onClick={() => dispatch({ type: 'DEC', id: cart.ProductID, cart })}>
                                <Icon icon={ic_remove} size={24} />
                            </div>

                            <div className='cart-price'>
                                Rs {cart.ProductPrice * cart.qty}.00
                            </div>

                            <button className='delete-btn' onClick={() => dispatch({ type: 'DELETE', id: cart.ProductID, cart })}>
                                <Icon icon={iosTrashOutline} size={24} />
                            </button>
                        </div>
                    ))
                    }
                    {cartProduct.length > 0 && <div className='cart-summary'>
                        <div className='cart-summary-heading'>
                            Cart-Summary
                        </div>
                        <div className='cart-summary-price'>
                            <span>Total Price</span>
                            <span>{totalPrice}</span>
                        </div>
                        <div className='cart-summary-price'>
                            <span>Total Qty</span>
                            <span>{totalQty}</span>
                        </div>
                        <div className='GooglePay'>
                            <GooglePay totalP={totalPrice} handleOrderToDb={handleOrderToDb}/>
                        </div>
                    </div>}
                </div>
            </>
    )
}