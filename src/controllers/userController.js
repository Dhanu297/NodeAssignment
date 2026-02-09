/* This is user controller which inturn deals with firestore's "users" collection. 
and as per the method used performs CRUD operations*/

//import firebase config module for handling firebase related operations
const db = require("../configuration/firebase_config");

//import global error handling module for error handling.
const handleError = require("../utils/errorHandler");

// GET all users
exports.getUsers = async (req, res) => {
  try {
     // Fetch the user collection from firebase
    const snapshot = await db.collection("users").get();

    const users = snapshot.docs.map(doc => {
      const data = doc.data();

      return {
        id: doc.id,
        name: data.name,
        username: data.username,
        email: data.email,
        address: data.address,
        createdAt: data.createdAt?.toDate?.() || null,
        updatedAt: data.updatedAt?.toDate?.() || null
      };
    });

    res.json({ success: true, data: users });
  } catch (error) {
    handleError(res, error);
  }
};

// GET user by ID
exports.getUserById = async (req, res) => {
  try {
    //retrieve user record i.e document as per the id
    const doc = await db.collection("users").doc(req.params.id).get();

    if (!doc.exists) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    const data = doc.data();

    const user = {
      id: doc.id,
      name: data.name,
      username: data.username,
      email: data.email,
      address: data.address,
      createdAt: data.createdAt?.toDate?.() || null,
      updatedAt: data.updatedAt?.toDate?.() || null
    };

    res.json({ success: true, data: user });
  } catch (error) {
    handleError(res, error);
  }
};

// ADD user
exports.addUser = async (req, res) => {
  try {
    const { name, username, email, address } = req.body;

    const newUser = {
      name,
      username,
      email,
      address,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const docRef = await db.collection("users").add(newUser);

    res.json({
      success: true,
      message: "User added successfully",
      id: docRef.id
    });
  } catch (error) {
    handleError(res, error);
  }
};

// UPDATE user
exports.updateUser = async (req, res) => {
  try {
    const { name, username, email, address } = req.body;

    const updatedData = {
      name,
      username,
      email,
      address,
      updatedAt: new Date()
    };

    await db.collection("users").doc(req.params.id).update(updatedData);

    res.json({
      success: true,
      id:req.params.id,
      message: "User updated successfully"
    });
  } catch (error) {
    handleError(res, error);
  }
};

// DELETE user
exports.deleteUser = async (req, res) => {
  try {
    await db.collection("users").doc(req.params.id).delete();

    res.json({
      success: true,
      message: "User deleted successfully"
    });
  } catch (error) {
    handleError(res, error);
  }
};
