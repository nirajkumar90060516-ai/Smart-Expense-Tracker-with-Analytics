const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema(
  {
    employeeId: {
      type: String,
      required: true,
    },
    employeeName: String,
    department: String,
    designation: String,
    email: String,

    title: String,
    amount: Number,
    category: String,
    date: String,   
    method: String,
    status: String,
    companyName: String,
    receiptNumber: String,
    paymentReference: String,
    upiId: String,
    description: String,
    tags: String,
    repeatMonthly: Boolean,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Expense", expenseSchema);
