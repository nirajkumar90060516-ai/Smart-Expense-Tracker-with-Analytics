import { useState } from "react";

function Settings({ settings, setSettings }) {
  const [saved, setSaved] = useState(false);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;

    setSettings((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    setSaved(false);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSaved(true);
  }

  function handlePhotoUpload(e) {
    const file = e.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setSettings((prev) => ({
        ...prev,
        profilePhoto: reader.result,
      }));
      setSaved(false);
    };
    reader.readAsDataURL(file);
  }

  return (
    <div className="settings-page">
      <div className="settings-summary-grid">
        <div className="settings-summary-card">
          <span className="settings-icon blue-icon">A</span>
          <div>
            <p>Account</p>
            <h2>{settings.role}</h2>
          </div>
        </div>

        <div className="settings-summary-card">
          <span className="settings-icon green-icon">Rs</span>
          <div>
            <p>Monthly Budget</p>
            <h2>Rs {Number(settings.monthlyBudget || 0).toLocaleString("en-IN")}</h2>
          </div>
        </div>

        <div className="settings-summary-card">
          <span className="settings-icon orange-icon">%</span>
          <div>
            <p>Savings Goal</p>
            <h2>Rs {Number(settings.savingsGoal || 0).toLocaleString("en-IN")}</h2>
          </div>
        </div>

        <div className="settings-summary-card">
          <span className="settings-icon red-icon">N</span>
          <div>
            <p>Alerts Enabled</p>
            <h2>
              {
                [
                  settings.emailAlerts,
                  settings.billReminders,
                  settings.budgetWarnings,
                  settings.weeklyReports,
                ].filter(Boolean).length
              }
            </h2>
          </div>
        </div>
      </div>

      <form id="settings-form" className="settings-layout" onSubmit={handleSubmit}>
        <section className="settings-panel">
          <div className="settings-panel-header">
            <div>
              <h2>Profile Settings</h2>
              <p>Update account details used across your dashboard.</p>
            </div>
          </div>

          <div className="settings-form-grid">
            <label className="settings-photo-field">
              Profile Photo
              <span className="settings-photo-preview">
                {settings.profilePhoto ? (
                  <img src={settings.profilePhoto} alt="profile" />
                ) : (
                  settings.fullName
                    .split(" ")
                    .map((name) => name[0])
                    .join("")
                    .slice(0, 2)
                )}
              </span>
              <input type="file" accept="image/*" onChange={handlePhotoUpload} />
            </label>

            <label>
              Full Name
              <input
                name="fullName"
                value={settings.fullName}
                onChange={handleChange}
                type="text"
              />
            </label>

            <label>
              Email Address
              <input
                name="email"
                value={settings.email}
                onChange={handleChange}
                type="email"
              />
            </label>

            <label>
              Role
              <select name="role" value={settings.role} onChange={handleChange}>
                <option>Admin</option>
                <option>Manager</option>
                <option>Employee</option>
              </select>
            </label>

            <label>
              Language
              <select
                name="language"
                value={settings.language}
                onChange={handleChange}
              >
                <option>English</option>
                <option>Hindi</option>
              </select>
            </label>
          </div>
        </section>

        <section className="settings-panel">
          <div className="settings-panel-header">
            <div>
              <h2>Finance Preferences</h2>
              <p>Control default currency, budget and savings targets.</p>
            </div>
          </div>

          <div className="settings-form-grid">
            <label>
              Currency
              <select
                name="currency"
                value={settings.currency}
                onChange={handleChange}
              >
                <option>INR</option>
                <option>USD</option>
                <option>EUR</option>
              </select>
            </label>

            <label>
              Theme
              <select name="theme" value={settings.theme} onChange={handleChange}>
                <option>Light</option>
                <option>Dark</option>
                <option>System</option>
              </select>
            </label>

            <label>
              Monthly Budget
              <input
                name="monthlyBudget"
                value={settings.monthlyBudget}
                onChange={handleChange}
                type="number"
                min="0"
              />
            </label>

            <label>
              Savings Goal
              <input
                name="savingsGoal"
                value={settings.savingsGoal}
                onChange={handleChange}
                type="number"
                min="0"
              />
            </label>
          </div>
        </section>

        <section className="settings-panel settings-notification-panel">
          <div className="settings-panel-header">
            <div>
              <h2>Notifications</h2>
              <p>Choose which updates should appear for this expense account.</p>
            </div>
          </div>

          <div className="settings-toggle-list">
            <label className="settings-toggle-row">
              <div>
                <strong>Email Alerts</strong>
                <span>Send expense and account updates by email.</span>
              </div>
              <input
                name="emailAlerts"
                checked={settings.emailAlerts}
                onChange={handleChange}
                type="checkbox"
              />
            </label>

            <label className="settings-toggle-row">
              <div>
                <strong>Bill Reminders</strong>
                <span>Notify before EMI, bills and subscription due dates.</span>
              </div>
              <input
                name="billReminders"
                checked={settings.billReminders}
                onChange={handleChange}
                type="checkbox"
              />
            </label>

            <label className="settings-toggle-row">
              <div>
                <strong>Budget Warnings</strong>
                <span>Alert when monthly spending crosses the safe limit.</span>
              </div>
              <input
                name="budgetWarnings"
                checked={settings.budgetWarnings}
                onChange={handleChange}
                type="checkbox"
              />
            </label>

            <label className="settings-toggle-row">
              <div>
                <strong>Weekly Reports</strong>
                <span>Receive a weekly summary of expenses and savings.</span>
              </div>
              <input
                name="weeklyReports"
                checked={settings.weeklyReports}
                onChange={handleChange}
                type="checkbox"
              />
            </label>
          </div>
        </section>

        <div className="settings-actions">
          {saved && <span>Settings saved successfully</span>}
          <button type="submit">Save Settings</button>
        </div>
      </form>
    </div>
  );
}

export default Settings;
