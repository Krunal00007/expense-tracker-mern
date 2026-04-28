const incomeModel = require("../models/incomeModel")

exports.addIncome = async (req, res) => {
    const { title, amount, category, description, date } = req.body
    const userId = req.user.id;
    const income = new incomeModel ({
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
        res.status(200).json({message: "Income added"})
    } catch (error) {
        res.status(400).json({message: error.message})
    }

    console.log(income)
}

exports.getIncome = async (req, res) =>{
    try {
        const incomes = await incomeModel.find({user:req.user.id});
        res.status(200).json(incomes)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

exports.delIncome = async (req, res) =>{
    const {id} = req.params
    incomeModel.findByIdAndDelete(id)
        .then((income) => {
            res.status(200).json({message: "Income deleted"})
        })
        .catch ((error) => {
        res.status(400).json({message: error.message})
        })
}