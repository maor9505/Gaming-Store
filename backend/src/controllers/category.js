import { db } from "../config/Config.js";

export const getCategories = async (req, res, next) => {
  const data = [];
  try {
    await db
      .collection("Catagories")
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
    res
      .status(200)
      .json({ message: " get All  categories success", categories: data });
  } catch (err) {
    next(err);
  }
};
export const addCategory = async (req, res, next) => {
  const data = [];
  try {
    await db.collection("Catagories").add({
      Catagory_Name: req.body.catagoryName,
    });
    res
      .status(200)
      .json({ message: "add category success", orders: data });
  } catch (err) {
    next(err);
  }
};
export const deleteCategory = async (req, res, next) => {
  try {
    await db.collection("Catagories").doc(req.body.categoryID).delete();
    res
      .status(200)
      .json();
  } catch (err) {
    next(err);
  }
};
