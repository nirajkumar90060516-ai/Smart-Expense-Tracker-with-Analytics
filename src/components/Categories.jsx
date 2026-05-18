
function Categories({ searchText = "" }) {
  const categories = [
    { name: "Food & Dining", icon: "🍔", text: "Total Spending", amount: "₹ 5,600", bg: "food" },
    { name: "Travel", icon: "✈️", text: "Total Spending", amount: "₹ 3,200", bg: "travel" },
    { name: "Shopping", icon: "🛍️", text: "Total Spending", amount: "₹ 8,500", bg: "shopping" },
    { name: "Bills & Utilities", icon: "💡", text: "Total Spending", amount: "₹ 4,200", bg: "bills" },
    { name: "Health", icon: "💗", text: "Total Spending", amount: "₹ 1,800", bg: "health" },
    { name: "Education", icon: "📚", text: "Total Spending", amount: "₹ 3,000", bg: "education" },
    { name: "Salary", icon: "💰", text: "Total Income", amount: "₹ 50,000", bg: "salary" },
  ];

  const filteredCategories = categories.filter((item) => {
    const query = searchText.toLowerCase();

    return (
      item.name.toLowerCase().includes(query) ||
      item.text.toLowerCase().includes(query) ||
      item.amount.toLowerCase().includes(query)
    );
  });

  return (
    <div className="categories-page">
      <div className="categories-header">
        <div>
          <h1>Expense Categories</h1>
          <p>View and manage all your expense categories</p>
        </div>

        <button className="add-category-btn">+ Add Category</button>
      </div>

      <div className="categories-grid">
        {filteredCategories.map((item, index) => (
          <div className={`category-card ${item.bg}`} key={index}>
            <div className="category-icon">{item.icon}</div>
            <h3>{item.name}</h3>
            <p>{item.text}</p>
            <h2>{item.amount}</h2>
            <button className="view-details-btn">View Details</button>
          </div>
        ))}

        {filteredCategories.length === 0 && (
          <div className="no-search-result">
            <h3>No categories found</h3>
            <p>Try Food, Travel, Shopping, Salary or Bills.</p>
          </div>
        )}
      </div>

      <div className="category-summary">
        <div className="summary-box">
          <span>▦</span>
          <div>
            <p>Total Categories</p>
            <h3>8</h3>
          </div>
        </div>

        <div className="summary-box">
          <span>💼</span>
          <div>
            <p>Total Expense</p>
            <h3>₹ 28,600</h3>
          </div>
        </div>

        <div className="summary-box">
          <span>💰</span>
          <div>
            <p>Total Income</p>
            <h3>₹ 50,000</h3>
          </div>
        </div>

        <div className="summary-box">
          <span>🏆</span>
          <div>
            <p>Top Category</p>
            <h3>Shopping</h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Categories;
