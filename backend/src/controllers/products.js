import { db, storage } from '../config/Config.js';
import { getProduct } from '../DbModal/Product.js';


export const getProducts = async (
  req,
  res,
  next
) => {
  try{
     const data = [];
     await db
       .collection("Products")
       .get()
       .then((querySnapshot) => {
         querySnapshot.forEach((doc) => {
           data.push(getProduct(doc));
         });
       })
       .catch((error) => {
         console.log("Error getting documents: ", error);
       });
  res.status(200).json({message:" get All products success",products:data})
  }catch(err){
    next(err);
  }
}


  export const addProduct = (req, res, next) => {
    console.log("req.bodyyy");
    console.log(req.body);
    const date = new Date();
        const productImg = req.files[0];
    const uploadTask = storage
      .ref(`product-images/${productImg.originalname}`)
      .put(productImg.buffer);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(progress);
      },
      (err) => console.log(err.message),
      () => {
        storage
          .ref("product-images")
          .child(productImg.originalname)
          .getDownloadURL()
          .then((url) => {
            db.collection("Products").add({
              ProductName: req.body.productName,
              ProductPrice: Number(req.body.productPrice),
              ProductImg: url,
              Description: req.body.description,
              Catagory: req.body.category,
              CatagoryAge: req.body.categoryAge,
              Views: 0,
              Sales: 0,
              MaxQty: req.body.maxQty,
              DateCreate: date,
              UplodeDate: date.getTime(),
            });
          })
          .then(() => {
            res.status(200).json({})
          })
          .catch((err) => {
            res.status(500).json({});
          });;
      }
    )
  };

  export const editProduct = async (req, res, next) => {
     console.log("req.bodyy");
     console.log(req.body);
     
const date = new Date();
    if (!req.body.existImg) {
      const productImg = req.files[0];
      const uploadTask = storage
        .ref(`product-images/${productImg.originalname}`)
        .put(productImg.buffer);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(progress);
        },
        (err) => console.log(err.message),
        () => {
          storage
            .ref("product-images")
            .child(productImg.originalname)
            .getDownloadURL()
            .then((url) => {
              db.collection("Products")
                .doc(req.body.productID)
                .update({
                  ProductName: req.body.productName,
                  ProductPrice: Number(req.body.productPrice),
                  ProductImg: url,
                  Description: req.body.description,
                  Catagory: req.body.category,
                  CatagoryAge: req.body.categoryAge,
                  Views: 0,
                  Sales: 0,
                  MaxQty: req.body.maxQty,
                  DateCreate: date,
                  UplodeDate: date.getTime(),
                })
                .then(() => {
                  res.status(200).json({});
                })
                .catch((err) => res.status(500).json({}));
            });
        }
      );
    } else {
      db.collection("Products")
        .doc(req.body.productID)
        .update({
          ProductName: req.body.productName,
          ProductPrice: Number(req.body.productPrice),
          Description: req.body.description,
          Catagory: req.body.category,
          CatagoryAge: req.body.categoryAge,
          Views: 0,
          Sales: 0,
          MaxQty: req.body.maxQty,
          DateCreate: date,
          UplodeDate: date.getTime(),
        })
        .then(() => {
          res.status(200).json({});
        })
        .catch((err) => res.status(500).json({}));
    }
    
  };

export const deleteProduct = async (req, res, next) => {
  console.log('req.body')
  console.log(req.body)
  try {
    await db.collection("Products").doc(req.body.ID).delete();
    res
      .status(200)
      .json({ });
  } catch (err) {
    next(err);
  }
};