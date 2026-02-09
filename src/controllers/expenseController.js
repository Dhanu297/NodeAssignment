/* This is expense controller which inturn deals with firestore's "expense" collection. 
and as per the method used performs CRUD operations*/

//import firebase config module for handling firebase related operations
const db = require("../configuration/firebase_config");

//import global error handling module for error handling.
const handleError = require("../utils/errorHandler");

// GET all expenses
exports.getExpenses = async (req, res) => {
  try {
    // Fetch the expenses collection from firebase
    const snapshot = await db.collection("expenses").get();

    const expenses = snapshot.docs.map(doc => {
      const data = doc.data();

      return {
        id: doc.id,
        userid: data.userid,
        ...(data.savings && { savings: data.savings }),
        ...(data.paymentObligations && { paymentObligations: data.paymentObligations }),
        ...(data.insurance && { insurance: data.insurance }),
        ...(data.housing && { housing: data.housing }),
        ...(data.utilities && { utilities: data.utilities }),
        ...(data.personal && { personal: data.personal }),
        createdAt: data.createdAt?.toDate?.() || null,
        updatedAt: data.updatedAt?.toDate?.() || null
      };
    });

    res.json({ success: true, data: expenses });
  } catch (error) {
    handleError(res, error);
  }
};

// GET expense by ID
exports.getExpenseById = async (req, res) => {
  try {
    //retrieve expense record i.e document as per the id
    const doc = await db.collection("expenses").doc(req.params.id).get();

    if (!doc.exists) {
      return res.status(404).json({
        success: false,
        message: "Expense record not found"
      });
    }

    const data = doc.data();

    const expense = {
      id: doc.id,
      userid: data.userid,
        ...(data.savings && { savings: data.savings }),
        ...(data.paymentObligations && { paymentObligations: data.paymentObligations }),
        ...(data.insurance && { insurance: data.insurance }),
        ...(data.housing && { housing: data.housing }),
        ...(data.utilities && { utilities: data.utilities }),
        ...(data.personal && { personal: data.personal }),
      createdAt: data.createdAt?.toDate?.() || null,
      updatedAt: data.updatedAt?.toDate?.() || null
    };

    res.json({ success: true, data: expense });
  } catch (error) {
    handleError(res, error);
  }
};

// ADD expense
exports.addExpense = async (req, res) => {
  try {
    const {
      userid,
      savings,
      paymentObligations,
      insurance,
      housing,
      utilities,
      personal
    } = req.body;

    const newExpense = {
      userid,
      savings: savings || {},
      paymentObligations: paymentObligations || {},
      insurance: insurance || {},
      housing: housing || {},
      utilities: utilities || {},
       personal: personal || {},
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const docRef = await db.collection("expenses").add(newExpense);

    res.json({
      success: true,
      message: "Expense added successfully",
      id: docRef.id
    });
  } catch (error) {
    handleError(res, error);
  }
};

// UPDATE expense
exports.updateExpense = async (req, res) => {
  try {
    const {
      userid,
      savings,
      paymentObligations,
      insurance,
      housing,
      utilities,
      personal
    } = req.body;

    const updatedData = {
      userid,
      savings: savings || {},
      paymentObligations: paymentObligations || {},
      insurance: insurance || {},
      housing: housing || {},
      utilities: utilities || {},
       personal: personal || {},
      updatedAt: new Date()
    };

    await db.collection("expenses").doc(req.params.id).update(updatedData);

    res.json({
      success: true,
      id:req.params.id,
      message: "Expense updated successfully"
    });
  } catch (error) {
    handleError(res, error);
  }
};

// DELETE expense
exports.deleteExpense = async (req, res) => {
  try {
    await db.collection("expenses").doc(req.params.id).delete();

    res.json({
      success: true,
      message: "Expense deleted successfully"
    });
  } catch (error) {
    handleError(res, error);
  }
};