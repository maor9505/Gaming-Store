import { db, storage } from "../config/Config.js";


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
           data.push(doc.data());
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


