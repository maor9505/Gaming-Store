import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { auth, db } from '../Config/Config'


toast.configure();

export const CartReducer = (state, action) => {
    const uid = auth.currentUser.uid;
    let product;

    switch (action.type) {

        case 'ADD_TO_CART':
                product = action.product;
                product['qty'] = 1;
                db.collection('Cart').doc('Cart '+ uid).collection('CartProducts').doc(product.ProductID).set(product).then(() => { 
                    console.log("success uplode to cart user")})
                    
                toast.info('this product is Add to Cart', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                    progress: undefined,
                });
               
            
            break;

        case 'INC':
            product = action.cart;
            product.qty = ++product.qty;
            db.collection('Cart').doc('Cart ' + uid).collection('CartProducts').doc(product.ProductID).update(product);
            break;

        case 'DEC':
            product = action.cart;
            if (product.qty > 1) {
                product.qty = product.qty - 1;
                db.collection('Cart').doc('Cart ' + uid).collection('CartProducts').doc(product.ProductID).update(product);
            }
            else {
                return state;
            }
            break;

        case 'DELETE':
            product = action.cart;
            db.collection('Cart').doc('Cart ' + uid).collection('CartProducts').doc(product.ProductID).delete();
            
            break;

        default:
            return state;

    }

}
