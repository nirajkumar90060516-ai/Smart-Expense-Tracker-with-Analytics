// function BudgetBox() {
//   return (
//     <div className="small-info-card">
//       <div className="small-card-top">
//         <h3>Monthly Budget</h3>
//         <span>💼</span>
//       </div>

//       <h2>₹ 15,000 / ₹ 20,000</h2>

//       <div className="progress-bar">
//         <div className="progress-fill budget-fill"></div>
//       </div>

//       <div className="progress-text-row">
//         <p>You've spent 75% of your monthly budget</p>
//         <b>75%</b>
//       </div>
//     </div>
//   );
// }

// export default BudgetBox;


function BudgetBox({ transactions = [] }) {

  // Monthly Budget
  const monthlyBudget = 20000;

  // Total Expense
  const totalExpense = transactions
    .filter((item) => item.amountType === "debit")
    .reduce((total, item) => {
      return (
        total +
        Number(String(item.amount).replace(/[₹,\s-]/g, ""))
      );
    }, 0);

  // Percentage
  const percentage = Math.min(
    Math.round((totalExpense / monthlyBudget) * 100),
    100
  );

  return (
    <div className="small-info-card">
      <div className="small-card-top">
        <h3>Monthly Budget</h3>
        <span>💼</span>
      </div>

      <h2>
        ₹ {totalExpense} / ₹ {monthlyBudget}
      </h2>

      <div className="progress-bar">
        <div
          className="progress-fill budget-fill"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>

      <div className="progress-text-row">
        <p>You've spent {percentage}% of your monthly budget</p>
        <b>{percentage}%</b>
      </div>
    </div>
  );
}

export default BudgetBox;