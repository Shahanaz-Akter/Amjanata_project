const express = require('express');
const router = express.Router();

const { addExpense, expenseList } = require('../controllers/expenseController');


router.get('/add_expense', addExpense);
router.get('/expense_list', expenseList);


module.exports = router;