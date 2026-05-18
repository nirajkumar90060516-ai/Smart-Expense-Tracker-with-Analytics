// function LineChartBox() {
//   return (
//     <div className="chart-card">
//       <div className="card-heading-row">
//         <h3>Expense Overview (This Month)</h3>
//         <select>
//           <option>This Month</option>
//           <option>Last Month</option>
//         </select>
//       </div>

//       <div className="chart-legend">
//         <span><b className="dot income-dot"></b> Income</span>
//         <span><b className="dot expense-dot"></b> Expense</span>
//       </div>

//       <div className="line-chart-area">
//         <svg viewBox="0 0 800 300" className="line-svg">
//           <polyline
//             fill="none"
//             stroke="#1db954"
//             strokeWidth="4"
//             points="20,220 90,210 160,200 230,150 300,140 370,120 440,160 510,170 580,150 650,130 720,90 780,120"
//           />
//           <polyline
//             fill="none"
//             stroke="#ff4d4f"
//             strokeWidth="4"
//             points="20,260 90,240 160,230 230,190 300,185 370,160 440,190 510,180 580,175 650,150 720,140 780,110"
//           />
//         </svg>
//       </div>
//     </div>
//   );
// }

// export default LineChartBox;





function LineChartBox({ transactions }) {
  const totalIncome = transactions
    .filter((item) => item.amountType === "credit")
    .reduce((sum, item) => {
      const amount = Number(item.amount.replace("+ ₹", "").replace(",", ""));
      return sum + amount;
    }, 0);

  const totalExpense = transactions
    .filter((item) => item.amountType === "debit")
    .reduce((sum, item) => {
      const amount = Number(item.amount.replace("- ₹", "").replace(",", ""));
      return sum + amount;
    }, 0);

  const incomeY = Math.max(70, 260 - totalIncome / 300);
  const expenseY = Math.max(70, 260 - totalExpense / 100);

  return (
    <div className="chart-card">
      <div className="card-heading-row">
        <h3>Expense Overview (This Month)</h3>
      </div>

      <div className="chart-legend">
        <span><b className="dot income-dot"></b> Income ₹{totalIncome}</span>
        <span><b className="dot expense-dot"></b> Expense ₹{totalExpense}</span>
      </div>

      <div className="line-chart-area">
        <svg viewBox="0 0 800 300" className="line-svg">
          <polyline
            fill="none"
            stroke="#1db954"
            strokeWidth="4"
            points={`20,260 200,220 400,180 600,140 780,${incomeY}`}
          />

          <polyline
            fill="none"
            stroke="#ff4d4f"
            strokeWidth="4"
            points={`20,260 200,240 400,210 600,180 780,${expenseY}`}
          />
        </svg>
      </div>
    </div>
  );
}

export default LineChartBox;