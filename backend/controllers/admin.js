const User = require("../models/User");
const Income = require("../models/incomeModel");
const Expense = require("../models/expenseModel");

// GET ALL USERS
exports.getAllUsers = async (req, res) => {
    try {

        const users = await User.find().select("-password");

        res.json(users);

    } catch (err) {

        res.status(500).json({ message: err.message });

    }
};

// DELETE USER
exports.deleteUser = async (req, res) => {
    try {

        await User.findByIdAndDelete(req.params.id);

        res.json({
            message: "User Deleted Successfully"
        });

    } catch (err) {

        res.status(500).json({ message: err.message });

    }
};

// GET ALL TRANSACTIONS
exports.getAllTransactions = async (req, res) => {

    try {

        const incomes = await Income.find().populate("user", "name email");
        const expenses = await Expense.find().populate("user", "name email");

        res.json({
            incomes,
            expenses
        });

    } catch (err) {

        res.status(500).json({ message: err.message });

    }

};

// ADMIN STATS
exports.getAdminStats = async (req, res) => {

    try {

        const totalUsers = await User.countDocuments();
        const totalIncome = await Income.countDocuments();
        const totalExpense = await Expense.countDocuments();

        res.json({
            totalUsers,
            totalIncome,
            totalExpense
        });

    } catch (err) {

        res.status(500).json({ message: err.message });

    }

};