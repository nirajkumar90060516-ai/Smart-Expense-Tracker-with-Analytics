// function DonutChartBox() {
//   return (
//     <div className="chart-card">
//       <div className="card-heading-row">
//         <h3>Expense by Category</h3>
//         <select>
//           <option>This Month</option>
//           <option>Last Month</option>
//         </select>
//       </div>

//       <div className="donut-content">
//         <div className="donut-chart"></div>

//         <div className="category-list">
//           <div><span className="cat-dot blue"></span> Food & Dining <b>30%</b></div>
//           <div><span className="cat-dot red"></span> Travel <b>20%</b></div>
//           <div><span className="cat-dot green"></span> Bills & Utilities <b>18%</b></div>
//           <div><span className="cat-dot purple"></span> Shopping <b>15%</b></div>
//           <div><span className="cat-dot orange"></span> Entertainment <b>10%</b></div>
//           <div><span className="cat-dot gray"></span> Others <b>7%</b></div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default DonutChartBox;  




function DonutChartBox({ transactions }) {
  const expenseTransactions = transactions.filter(
    (item) => item.amountType === "debit"
  );

  const categoryTotals = {};

  expenseTransactions.forEach((item) => {
    const amount = Number(item.amount.replace("- ₹", "").replace(",", ""));

    categoryTotals[item.category] =
      (categoryTotals[item.category] || 0) + amount;
  });

  const totalExpense = Object.values(categoryTotals).reduce(
    (sum, amount) => sum + amount,
    0
  );

  const categoryData = Object.entries(categoryTotals).map(
    ([category, amount]) => ({
      category,
      percent: totalExpense
        ? Math.round((amount / totalExpense) * 100)
        : 0,
    })
  );

  return (
    <div className="chart-card">
      <div className="card-heading-row">
        <h3>Expense by Category</h3>
      </div>

      <div className="donut-content">
        <div className="donut-chart"></div>

        <div className="category-list">
          {categoryData.map((item, index) => (
            <div key={index}>
              <span>{item.category}</span>
              <b>{item.percent}%</b>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DonutChartBox;