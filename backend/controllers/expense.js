const expenseModel = require("../models/expenseModel")

exports.addExp = async (req, res) => {
    const { title, amount, category, description, date } = req.body
    const userId = req.user.id;
    const income = expenseModel ({
        title,
        amount,
        category,
        description,
        date,
        user:userId
    })

    try {
        //validation
        if(!title || !category || !description || !date) {
            return res.status(400).json({message: "All fields are required"})
        }
        if(amount <= 0 || !amount === 'number') {
            return res.status(400).json({message: "Amount must be a positive number"})
        }
        await income.save()
        res.status(200).json({message: "Expense added"})
    } catch (error) {
        res.status(400).json({message: error.message})
    }

    console.log(income)
}

exports.getExp = async (req, res) =>{
    try {
        const incomes = await expenseModel.find({user:req.user.id});
        res.status(200).json(incomes)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

exports.delExp = async (req, res) =>{
    const {id} = req.params
    expenseModel.findByIdAndDelete(id)
        .then((income) => {
            res.status(200).json({message: "Expense deleted"})
        })
        .catch ((error) => {
        res.status(400).json({message: error.message})
        })
}