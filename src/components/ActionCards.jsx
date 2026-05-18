function ActionCards({ onAction }) {
  const actions = [
    { action: "add-expense", title: "Add Expense", text: "Download PDF form", icon: "+" },
    { action: "add-income", title: "Add Income", text: "Download PDF form", icon: "IN" },
    { action: "download-report", title: "Download Report", text: "Download PDF report", icon: "DL" },
    { action: "view-analytics", title: "View Analytics", text: "Download PDF analytics", icon: "AN" },
    { action: "set-budget", title: "Set Budget", text: "Download PDF form", icon: "BG" },
  ];

  return (
    <div className="actions-grid">
      {actions.map((item) => (
        <button
          className="action-card"
          key={item.action}
          type="button"
          onClick={() => onAction(item.action)}
        >
          <div className="action-icon-box">{item.icon}</div>
          <div>
            <h4>{item.title}</h4>
            <p>{item.text}</p>
          </div>
        </button>
      ))}
    </div>
  );
}

export default ActionCards;
