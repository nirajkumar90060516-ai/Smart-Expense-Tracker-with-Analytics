function formatCurrency(amount) {
  return `Rs ${Number(amount || 0).toLocaleString("en-IN")}`;
}

function Profile({ settings, setSettings }) {
  const enabledAlerts = [
    settings.emailAlerts,
    settings.billReminders,
    settings.budgetWarnings,
    settings.weeklyReports,
  ].filter(Boolean).length;

  const profileStats = [
    { label: "Role", value: settings.role, tone: "blue-icon" },
    { label: "Currency", value: settings.currency, tone: "green-icon" },
    { label: "Monthly Budget", value: formatCurrency(settings.monthlyBudget), tone: "orange-icon" },
    { label: "Active Alerts", value: enabledAlerts, tone: "red-icon" },
  ];

  function handleProfileChange(e) {
    const { name, value } = e.target;

    setSettings((prev) => ({
      ...prev,
      [name]: value,
    }));
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
    };
    reader.readAsDataURL(file);
  }

  return (
    <div className="profile-page">
      <section className="profile-hero">
        <label className="profile-avatar profile-avatar-upload">
          {settings.profilePhoto ? (
            <img src={settings.profilePhoto} alt="profile" />
          ) : (
            settings.fullName
              .split(" ")
              .map((name) => name[0])
              .join("")
              .slice(0, 2)
          )}
          <input type="file" accept="image/*" onChange={handlePhotoUpload} />
        </label>

        <div className="profile-main-info">
          <p>Admin Profile</p>
          <h2>{settings.fullName}</h2>
          <span>{settings.email}</span>
        </div>

        <div className="profile-badge">{settings.theme} Mode</div>
      </section>

      <div className="profile-stats-grid">
        {profileStats.map((item) => (
          <div className="profile-stat-card" key={item.label}>
            <span className={`profile-stat-icon ${item.tone}`}>
              {String(item.label).slice(0, 1)}
            </span>
            <div>
              <p>{item.label}</p>
              <h3>{item.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="profile-layout">
        <section className="profile-panel profile-edit-panel">
          <div className="profile-panel-header">
            <h2>Edit Profile</h2>
            <p>Changes here also update the top navbar.</p>
          </div>

          <div className="profile-edit-grid">
            <label>
              Full Name
              <input
                name="fullName"
                value={settings.fullName}
                onChange={handleProfileChange}
                type="text"
              />
            </label>

            <label>
              Email
              <input
                name="email"
                value={settings.email}
                onChange={handleProfileChange}
                type="email"
              />
            </label>

            <label>
              Role
              <select
                name="role"
                value={settings.role}
                onChange={handleProfileChange}
              >
                <option>Admin</option>
                <option>Manager</option>
                <option>Employee</option>
              </select>
            </label>

            <label>
              Profile Photo
              <input type="file" accept="image/*" onChange={handlePhotoUpload} />
            </label>
          </div>
        </section>

        <section className="profile-panel">
          <div className="profile-panel-header">
            <h2>Account Details</h2>
            <p>These values update from Settings.</p>
          </div>

          <div className="profile-details-grid">
            <div>
              <span>Full Name</span>
              <strong>{settings.fullName}</strong>
            </div>
            <div>
              <span>Email</span>
              <strong>{settings.email}</strong>
            </div>
            <div>
              <span>Role</span>
              <strong>{settings.role}</strong>
            </div>
            <div>
              <span>Language</span>
              <strong>{settings.language}</strong>
            </div>
          </div>
        </section>

        <section className="profile-panel">
          <div className="profile-panel-header">
            <h2>Finance Settings</h2>
            <p>Budget and preference summary from Settings.</p>
          </div>

          <div className="profile-details-grid">
            <div>
              <span>Currency</span>
              <strong>{settings.currency}</strong>
            </div>
            <div>
              <span>Theme</span>
              <strong>{settings.theme}</strong>
            </div>
            <div>
              <span>Monthly Budget</span>
              <strong>{formatCurrency(settings.monthlyBudget)}</strong>
            </div>
            <div>
              <span>Savings Goal</span>
              <strong>{formatCurrency(settings.savingsGoal)}</strong>
            </div>
          </div>
        </section>

        <section className="profile-panel profile-notification-panel">
          <div className="profile-panel-header">
            <h2>Notification Preferences</h2>
            <p>Current alert choices copied from Settings.</p>
          </div>

          <div className="profile-alert-list">
            <div>
              <span>Email Alerts</span>
              <strong>{settings.emailAlerts ? "Enabled" : "Disabled"}</strong>
            </div>
            <div>
              <span>Bill Reminders</span>
              <strong>{settings.billReminders ? "Enabled" : "Disabled"}</strong>
            </div>
            <div>
              <span>Budget Warnings</span>
              <strong>{settings.budgetWarnings ? "Enabled" : "Disabled"}</strong>
            </div>
            <div>
              <span>Weekly Reports</span>
              <strong>{settings.weeklyReports ? "Enabled" : "Disabled"}</strong>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Profile;
