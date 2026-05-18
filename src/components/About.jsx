function About() {
  return (
    <div className="about-page">
      <section className="about-panel">
        <h2>About Cisco Systems</h2>
        <p>
          Cisco Systems is a global technology company known for networking,
          cybersecurity, cloud, collaboration and enterprise IT solutions. This
          Smart Expense Tracker is designed like an internal Cisco employee
          finance dashboard where teams can manage expenses, budgets, reports,
          reminders and analytics from one place.
        </p>

        <div className="about-grid">
          <div>
            <span>Company</span>
            <strong>Cisco Systems</strong>
          </div>
          <div>
            <span>Headquarters</span>
            <strong>San Jose, California</strong>
          </div>
          <div>
            <span>Industry</span>
            <strong>Networking and IT</strong>
          </div>
          <div>
            <span>Dashboard Use</span>
            <strong>Employee Expense Analytics</strong>
          </div>
        </div>
      </section>

      <section className="about-panel">
        <h2>Why This Dashboard</h2>
        <p>
          In a company environment like Cisco, employees and administrators need
          a clear way to track monthly spending, payment methods, budget usage
          and financial reports. This app connects expense entry, category
          analysis, reminders, employee profile data and report generation into
          a single MERN stack workflow.
        </p>

        <div className="about-grid">
          <div>
            <span>Expense Tracking</span>
            <strong>Daily employee expenses</strong>
          </div>
          <div>
            <span>Reports</span>
            <strong>Employee-wise summaries</strong>
          </div>
          <div>
            <span>Analytics</span>
            <strong>Budget and category insights</strong>
          </div>
          <div>
            <span>Reminders</span>
            <strong>Bills, EMI and due dates</strong>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
