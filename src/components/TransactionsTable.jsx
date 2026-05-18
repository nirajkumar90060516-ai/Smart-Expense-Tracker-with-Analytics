function TransactionsTable({ transactions, searchText = "" }) {
  const filteredTransactions = transactions.filter((item) => {
    const query = searchText.toLowerCase();

    return (
      item.date.toLowerCase().includes(query) ||
      item.category.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query) ||
      item.method.toLowerCase().includes(query) ||
      (item.status || "").toLowerCase().includes(query) ||
      item.amount.toLowerCase().includes(query)
    );
  });

  return (
    <div className="table-card">
      <div className="card-heading-row">
        <h3>Recent Transactions</h3>
        <button className="view-all-btn">View All</button>
      </div>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Category</th>
              <th>Description</th>
              <th>Payment Method</th>
              <th>Status</th>
              <th>Amount</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredTransactions.map((item, index) => (
              <tr key={index}>
                <td>{item.date}</td>
                <td>{item.category}</td>
                <td>{item.description}</td>
                <td>{item.method}</td>
                <td>
                  <span
                    className={`payment-status-badge ${(
                      item.status || "Completed"
                    ).toLowerCase()}`}
                  >
                    {item.status || "Completed"}
                  </span>
                </td>
                <td className={item.amountType === "credit" ? "credit" : "debit"}>
                  {item.amount}
                </td>
                <td>
                  <span className="action-icon">✏️</span>
                  <span className="action-icon">🗑️</span>
                </td>
              </tr>
            ))}

            {filteredTransactions.length === 0 && (
              <tr>
                <td colSpan="7">No transactions found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <p className="table-footer-text">
        Showing {filteredTransactions.length} transaction
        {filteredTransactions.length === 1 ? "" : "s"}
      </p>
    </div>
  );
}

export default TransactionsTable;
