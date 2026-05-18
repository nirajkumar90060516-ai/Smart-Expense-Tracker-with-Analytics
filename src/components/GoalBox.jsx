// function GoalBox() {
//   return (
//     <div className="small-info-card">
//       <div className="small-card-top">
//         <h3>Savings Goal</h3>
//         <span>🎯</span>
//       </div>

//       <h2>₹ 45,000 / ₹ 1,00,000</h2>

//       <div className="progress-bar">
//         <div className="progress-fill goal-fill"></div>
//       </div>

//       <div className="progress-text-row">
//         <p>Keep going! You can achieve your goal</p>
//         <b>45%</b>
//       </div>
//     </div>
//   );
// }

// export default GoalBox;

function GoalBox({ transactions = [] }) {
  const getAmount = (amount) => {
    return Number(String(amount).replace(/[₹,\s-]/g, ""));
  };

  const totalIncome = transactions
    .filter((item) => item.amountType === "credit")
    .reduce((total, item) => total + getAmount(item.amount), 0);

  const totalExpense = transactions
    .filter((item) => item.amountType === "debit")
    .reduce((total, item) => total + getAmount(item.amount), 0);

  const totalSavings = totalIncome - totalExpense;

  const goalAmount = 100000;

  const percentage = Math.min(
    Math.max(Math.round((totalSavings / goalAmount) * 100), 0),
    100
  );

  return (
    <div className="small-info-card">
      <div className="small-card-top">
        <h3>Savings Goal</h3>
        <span>🎯</span>
      </div>

      <h2>
        ₹ {totalSavings} / ₹ {goalAmount}
      </h2>

      <div className="progress-bar">
        <div
          className="progress-fill goal-fill"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>

      <div className="progress-text-row">
        <p>Keep going! You can achieve your goal</p>
        <b>{percentage}%</b>
      </div>
    </div>
  );
}

export default GoalBox;