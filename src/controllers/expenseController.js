const db = require("../configuration/firebase_config");

const handleError = require("../utils/errorHandler");

// GET all expenses
exports.getExpenses = async (req, res) => {
  try {
    const snapshot = await db.collection("expenses").get();

    const expenses = snapshot.docs.map(doc => {
      const data = doc.data();

      return {
        id: doc.id,
        userid: data.userid,
        savings: data.savings,
        paymentObligations: data.paymentObligations,
        insurance: data.insurance,
        housing: data.housing,
        utilities: data.utilities,
        personal: data.personal,
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
      savings: data.savings,
      paymentObligations: data.paymentObligations,
      insurance: data.insurance,
      housing: data.housing,
      utilities: data.utilities,
      personal: data.personal,
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
      savings,
      paymentObligations,
      insurance,
      housing,
      utilities,
      personal,
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
      savings,
      paymentObligations,
      insurance,
      housing,
      utilities,
      personal,
      updatedAt: new Date()
    };

    await db.collection("expenses").doc(req.params.id).update(updatedData);

    res.json({
      success: true,
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