const { addIncome, getIncome, delIncome } = require('../controllers/income')
const { addExp, getExp, delExp } = require('../controllers/expense')
const auth = require('../middleware/auth')

const router = require('express').Router()


router.post('/add-income', auth, addIncome)
    .get('/get-income', auth, getIncome)
    .delete('/del-income/:id',auth, delIncome)
    .post('/add-exp', auth, addExp)
    .get('/get-exp', auth, getExp)
    .delete('/del-exp/:id', auth, delExp)

module.exports = router