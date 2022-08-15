import { db } from "../config/Config.js";

export const addUser = async (req, res, next) => {
  try {
    await db
      .collection("users")
      .doc(req.body.uid)
      .set(req.body.userDetails)
      .then(() => {
        res.status(200).json({ message: " user add success to db" });
      })
      .catch((err) => console.log(err));
  } catch (err) {
    next(err);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    await db
      .collection("users")
      .doc(req.body.uid)
      .update(req.body.userDetails)
      .then(() => {
        res.status(200).json({ message: " user update success to db" });
      })
      .catch((err) => console.log(err));
  } catch (err) {
    next(err);
  }
};

export const signInWithGoogle = async (req, resonse, next) => {
  const res = req.body.res;

  //get User By id
  try {
  const result=await db.collection("users").doc(res.user.uid).get().then((doc) => {
      if (doc.empty) {
        //update user
        console.log('update user')
      db.collection("users").doc(res.user.uid).update({
          Email: res.user.email,
          PhoneNumber: res.user.phoneNumber,
          DisplayName: res.user.displayName,
        });
      } else {
        //add user
  
       db.collection("users").doc(res.user.uid).set({
          Email: res.user.email,
          Type: "not-admin",
          PhoneNumber: res.user.phoneNumber,
          DisplayName: res.user.displayName,
        });
      }
    });
  } catch (err) {
    console.log(err);
  }
};

export const getAllUsers = async(req, res, next) => {
  const data = [];
  try {
   await db.collection("users")
      .get()
      .then((response) => {
        response.docs.map((doc) =>
          data.push({
            ID: doc.id,
            ...doc.data(),
          })
        );
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
    console.log('data')
    console.log(data)
    res.status(200).json({ message: " get All  users success", users: data });
  } catch (err) {
    console.log(err);
  }
};
export const deleteUser = (req, res, next) => {
  console.log('req.body')
  console.log(req.body)
  db.collection("users").doc(req.body.ID).delete();
};
