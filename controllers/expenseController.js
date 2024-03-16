const asyncHandler = require('express-async-handler');
const bodyParser = require('body-parser');

const addExpense = async (req, res) => {

    res.render('expense/add_expense.ejs');
}
const expenseList = async (req, res) => {
    res.render('expense/expense_list.ejs');

}

module.exports = { addExpense, expenseList }