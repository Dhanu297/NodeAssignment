const db =require("../configuration/firebase_config");
const handleError = require("../utils/errorHandler");

// GET all income records
exports.getIncome = async (req, res) => {
  try {
    const snapshot = await db.collection("income").get();

    const incomeList = snapshot.docs.map(doc => {
      const data = doc.data();

      return {
        id: doc.id,
        userid: data.userid,
        wages: data.wages,
        secondaryIncome: data.secondaryIncome,
        interest: data.interest,
        supportPayment: data.supportPayment,
        others: data.others,
        createdAt: data.createdAt?.toDate?.() || null,
        updatedAt: data.updatedAt?.toDate?.() || null
      };
    });

    res.json({ success: true, data: incomeList });
  } catch (error) {
    handleError(res, error);
  }
};

// GET income by ID
exports.getIncomeById = async (req, res) => {
  try {
    const doc = await db.collection("income").doc(req.params.id).get();

    if (!doc.exists) {
      return res.status(404).json({
        success: false,
        message: "Income record not found"
      });
    }

    const data = doc.data();

    const income = {
      id: doc.id,
      userid: data.userid,
      wages: data.wages,
      secondaryIncome: data.secondaryIncome,
      interest: data.interest,
      supportPayment: data.supportPayment,
      others: data.others,
      createdAt: data.createdAt?.toDate?.() || null,
      updatedAt: data.updatedAt?.toDate?.() || null
    };

    res.json({ success: true, data: income });
  } catch (error) {
    handleError(res, error);
  }
};

// ADD income
exports.addIncome = async (req, res) => {
  try {
    const {
      userid,
      wages,
      secondaryIncome,
      interest,
      supportPayment,
      others
    } = req.body;

    const newIncome = {
      userid,
      wages,
      secondaryIncome,
      interest,
      supportPayment,
      others,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const docRef = await db.collection("income").add(newIncome);

    res.json({
      success: true,
      message: "Income added successfully",
      id: docRef.id
    });
  } catch (error) {
    handleError(res, error);
  }
};

// UPDATE income
exports.updateIncome = async (req, res) => {
  try {
    const {
      userid,
      wages,
      secondaryIncome,
      interest,
      supportPayment,
      others
    } = req.body;

    const updatedData = {
      userid,
      wages,
      secondaryIncome,
      interest,
      supportPayment,
      others,
      updatedAt: new Date()
    };

    await db.collection("income").doc(req.params.id).update(updatedData);

    res.json({
      success: true,
      message: "Income updated successfully"
    });
  } catch (error) {
    handleError(res, error);
  }
};

// DELETE income
exports.deleteIncome = async (req, res) => {
  try {
    await db.collection("income").doc(req.params.id).delete();

    res.json({
      success: true,
      message: "Income deleted successfully"
    });
  } catch (error) {
    handleError(res, error);
  }
};