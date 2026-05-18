import { useMemo, useState } from "react";

const initialReminders = [
  {
    id: 1,
    title: "Electricity Bill",
    category: "Bills & Utilities",
    amount: 1250,
    dueDate: "2026-05-20",
    repeat: "Monthly",
    priority: "High",
    status: "Upcoming",
  },
  {
    id: 2,
    title: "Office Internet",
    category: "Bills & Utilities",
    amount: 899,
    dueDate: "2026-05-24",
    repeat: "Monthly",
    priority: "Medium",
    status: "Upcoming",
  },
  {
    id: 3,
    title: "Credit Card Payment",
    category: "Shopping",
    amount: 3500,
    dueDate: "2026-05-18",
    repeat: "Monthly",
    priority: "High",
    status: "Due Today",
  },
];

function getDaysLeft(dueDate) {
  const today = new Date();
  const due = new Date(`${dueDate}T00:00:00`);
  today.setHours(0, 0, 0, 0);

  return Math.ceil((due - today) / (1000 * 60 * 60 * 24));
}

function formatCurrency(amount) {
  return `Rs ${Number(amount || 0).toLocaleString("en-IN")}`;
}

function getReminderStatus(dueDate, fallbackStatus) {
  const daysLeft = getDaysLeft(dueDate);

  if (daysLeft < 0) return "Overdue";
  if (daysLeft === 0) return "Due Today";
  return fallbackStatus || "Upcoming";
}

function Reminders() {
  const [reminders, setReminders] = useState(initialReminders);
  const [formData, setFormData] = useState({
    title: "",
    category: "Bills & Utilities",
    amount: "",
    dueDate: "",
    repeat: "Monthly",
    priority: "Medium",
  });

  const summary = useMemo(() => {
    return reminders.reduce(
      (result, item) => {
        const status = getReminderStatus(item.dueDate, item.status);

        result.totalAmount += Number(item.amount);
        if (status === "Due Today") result.dueToday += 1;
        if (status === "Overdue") result.overdue += 1;

        return result;
      },
      { totalAmount: 0, dueToday: 0, overdue: 0 }
    );
  }, [reminders]);

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    const newReminder = {
      id: Date.now(),
      title: formData.title,
      category: formData.category,
      amount: Number(formData.amount),
      dueDate: formData.dueDate,
      repeat: formData.repeat,
      priority: formData.priority,
      status: "Upcoming",
    };

    setReminders((prev) =>
      [newReminder, ...prev].sort(
        (a, b) => new Date(a.dueDate) - new Date(b.dueDate)
      )
    );

    setFormData({
      title: "",
      category: "Bills & Utilities",
      amount: "",
      dueDate: "",
      repeat: "Monthly",
      priority: "Medium",
    });
  }

  function markPaid(id) {
    setReminders((prev) => prev.filter((item) => item.id !== id));
  }

  return (
    <div className="reminders-page">
      <div className="reminder-summary-grid">
        <div className="reminder-summary-card">
          <span className="reminder-summary-icon blue-icon">i</span>
          <div>
            <p>Total Reminders</p>
            <h2>{reminders.length}</h2>
          </div>
        </div>

        <div className="reminder-summary-card">
          <span className="reminder-summary-icon orange-icon">!</span>
          <div>
            <p>Due Today</p>
            <h2>{summary.dueToday}</h2>
          </div>
        </div>

        <div className="reminder-summary-card">
          <span className="reminder-summary-icon red-icon">!</span>
          <div>
            <p>Overdue</p>
            <h2>{summary.overdue}</h2>
          </div>
        </div>

        <div className="reminder-summary-card">
          <span className="reminder-summary-icon green-icon">Rs</span>
          <div>
            <p>Total Amount</p>
            <h2>{formatCurrency(summary.totalAmount)}</h2>
          </div>
        </div>
      </div>

      <div className="reminders-layout">
        <form className="reminder-form-card" onSubmit={handleSubmit}>
          <h2>Add Reminder</h2>

          <div className="reminder-form-grid">
            <label>
              Title
              <input
                data-reminder-title
                name="title"
                value={formData.title}
                onChange={handleChange}
                type="text"
                placeholder="Rent, EMI, subscription"
                required
              />
            </label>

            <label>
              Amount
              <input
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                type="number"
                min="1"
                placeholder="Enter amount"
                required
              />
            </label>

            <label>
              Category
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
              >
                <option>Bills & Utilities</option>
                <option>Travel</option>
                <option>Shopping</option>
                <option>Food & Dining</option>
                <option>Health</option>
                <option>Others</option>
              </select>
            </label>

            <label>
              Due Date
              <input
                name="dueDate"
                value={formData.dueDate}
                onChange={handleChange}
                type="date"
                required
              />
            </label>

            <label>
              Repeat
              <select
                name="repeat"
                value={formData.repeat}
                onChange={handleChange}
              >
                <option>None</option>
                <option>Weekly</option>
                <option>Monthly</option>
                <option>Yearly</option>
              </select>
            </label>

            <label>
              Priority
              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </label>
          </div>

          <button className="reminder-submit-btn" type="submit">
            Add Reminder
          </button>
        </form>

        <div className="reminder-list-card">
          <div className="reminder-list-header">
            <h2>Upcoming Reminders</h2>
            <span>{reminders.length} active</span>
          </div>

          <div className="reminder-list">
            {reminders.map((item) => {
              const status = getReminderStatus(item.dueDate, item.status);
              const daysLeft = getDaysLeft(item.dueDate);

              return (
                <div className="reminder-item" key={item.id}>
                  <div className="reminder-item-main">
                    <div>
                      <h3>{item.title}</h3>
                      <p>
                        {item.category} | {item.repeat} | {item.priority}
                      </p>
                    </div>

                    <strong>{formatCurrency(item.amount)}</strong>
                  </div>

                  <div className="reminder-meta-row">
                    <span className={`reminder-status ${status.toLowerCase().replace(" ", "-")}`}>
                      {status}
                    </span>
                    <span>
                      {daysLeft < 0
                        ? `${Math.abs(daysLeft)} days late`
                        : daysLeft === 0
                        ? "Today"
                        : `${daysLeft} days left`}
                    </span>
                    <span>{item.dueDate}</span>
                    <button type="button" onClick={() => markPaid(item.id)}>
                      Mark Paid
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reminders;
