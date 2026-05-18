import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import StatCard from "./components/StatCard";
import LineChartBox from "./components/LineChartBox";
import DonutChartBox from "./components/DonutChartBox";
import TransactionsTable from "./components/TransactionsTable";
import BudgetBox from "./components/BudgetBox";
import GoalBox from "./components/GoalBox";
import ActionCards from "./components/ActionCards";
import AddExpense from "./components/AddExpense";
import Categories from "./components/Categories";
import Report from "./components/Report";
import Reminders from "./components/Reminders";
import Settings from "./components/Settings";
import Profile from "./components/Profile";
import About from "./components/About";
import Products from "./components/Products";
import AuthModal from "./components/AuthModal";

const defaultSettings = {
  fullName: "Amit Verma",
  email: "amit.verma@cisco.com",
  role: "Admin",
  currency: "INR",
  monthlyBudget: "30000",
  savingsGoal: "15000",
  theme: "Light",
  language: "English",
  profilePhoto: "",
  emailAlerts: true,
  billReminders: true,
  budgetWarnings: true,
  weeklyReports: false,
};

function loadSavedSettings() {
  const savedSettings = localStorage.getItem("smartExpenseSettings");

  if (!savedSettings) return defaultSettings;

  try {
    return {
      ...defaultSettings,
      ...JSON.parse(savedSettings),
    };
  } catch {
    return defaultSettings;
  }
}

function loadSavedUser() {
  const savedUser = localStorage.getItem("smartExpenseUser");

  if (!savedUser) return null;

  try {
    return JSON.parse(savedUser);
  } catch {
    return null;
  }
}

function App() {
  const [openSidebar, setOpenSidebar] = useState(false);
  const [, setShowAddExpense] = useState(false);
  const [activePage, setActivePage] = useState("Home");
  const [selectedProductCategory, setSelectedProductCategory] = useState("All Products");
  const [searchText, setSearchText] = useState("");
  const [settings, setSettings] = useState(loadSavedSettings);
  const [currentUser, setCurrentUser] = useState(loadSavedUser);
  const [authMode, setAuthMode] = useState(null);

  useEffect(() => {
    localStorage.setItem("smartExpenseSettings", JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("smartExpenseUser", JSON.stringify(currentUser));
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSettings((prev) => ({
        ...prev,
        fullName: currentUser.fullName,
        email: currentUser.email,
        role: currentUser.role,
      }));
    } else {
      localStorage.removeItem("smartExpenseUser");
    }
  }, [currentUser]);

  const [transactions, setTransactions] = useState([
    {
      date: "28 Apr 2024",
      category: "Food & Dining",
      description: "Lunch with Team",
      method: "UPI",
      status: "Completed",
      amount: "- ₹560",
      amountType: "debit",
    },
    {
      date: "28 Apr 2024",
      category: "Travel",
      description: "Uber Ride",
      method: "UPI",
      status: "Completed",
      amount: "- ₹350",
      amountType: "debit",
    },
    {
      date: "27 Apr 2024",
      category: "Bills & Utilities",
      description: "Electricity Bill",
      method: "Net Banking",
      status: "Completed",
      amount: "- ₹1,250",
      amountType: "debit",
    },
    {
      date: "26 Apr 2024",
      category: "Shopping",
      description: "Amazon Purchase",
      method: "Credit Card",
      status: "Completed",
      amount: "- ₹2,399",
      amountType: "debit",
    },
    {
      date: "25 Apr 2024",
      category: "Salary",
      description: "Monthly Salary",
      method: "Bank Transfer",
      status: "Completed",
      amount: "+ ₹50,000",
      amountType: "credit",
    },
  ]);

  function handleSidebarClick(page) {
    setActivePage(page);
    setShowAddExpense(page === "Add Expense");
    setOpenSidebar(false);
  }

  function handleProductClick(category) {
    setSelectedProductCategory(category);
    setActivePage("Products");
    setShowAddExpense(false);
    setOpenSidebar(false);
  }

  function escapeHtml(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function getDocumentTitle(action) {
    const titles = {
      "add-expense": "Expense Entry Form",
      "add-income": "Income Entry Form",
      "download-report": "Expense Report",
      "view-analytics": "Analytics Summary",
      "set-budget": "Budget Setup Form",
    };

    return titles[action] || "Cisco Expense Document";
  }

  function getTransactionRows() {
    return transactions
      .map(
        (item) => `
          <tr>
            <td>${escapeHtml(item.date)}</td>
            <td>${escapeHtml(item.category)}</td>
            <td>${escapeHtml(item.description)}</td>
            <td>${escapeHtml(item.method)}</td>
            <td>${escapeHtml(item.status || "Completed")}</td>
            <td>${escapeHtml(item.amount)}</td>
          </tr>
        `
      )
      .join("");
  }

  function getPdfBody(action) {
    if (action === "add-expense") {
      return `
        <h2>Expense Entry Form</h2>
        <div class="form-grid">
          <div><span>Expense Title</span><b></b></div>
          <div><span>Amount</span><b></b></div>
          <div><span>Category</span><b></b></div>
          <div><span>Date</span><b></b></div>
          <div><span>Payment Method</span><b></b></div>
          <div><span>Payment Status</span><b>Completed / Pending / Failed</b></div>
          <div><span>UPI ID</span><b>9006091516-2@axl</b></div>
          <div><span>Receipt Number</span><b></b></div>
        </div>
        <div class="notes"><span>Description / Notes</span></div>
      `;
    }

    if (action === "add-income") {
      return `
        <h2>Income Entry Form</h2>
        <div class="form-grid">
          <div><span>Income Title</span><b></b></div>
          <div><span>Amount</span><b></b></div>
          <div><span>Income Source</span><b>Salary / Bonus / Other</b></div>
          <div><span>Date</span><b></b></div>
          <div><span>Payment Method</span><b>Bank Transfer / UPI / Cash</b></div>
          <div><span>Status</span><b>Completed</b></div>
        </div>
        <div class="notes"><span>Description / Notes</span></div>
      `;
    }

    if (action === "download-report") {
      return `
        <h2>Expense Report</h2>
        <div class="summary-grid">
          <div><span>Total Income</span><b>Rs ${totalIncome.toLocaleString("en-IN")}</b></div>
          <div><span>Total Expenses</span><b>Rs ${totalExpense.toLocaleString("en-IN")}</b></div>
          <div><span>Total Balance</span><b>Rs ${totalBalance.toLocaleString("en-IN")}</b></div>
          <div><span>Total Savings</span><b>Rs ${totalSavings.toLocaleString("en-IN")}</b></div>
        </div>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Category</th>
              <th>Description</th>
              <th>Method</th>
              <th>Status</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>${getTransactionRows()}</tbody>
        </table>
      `;
    }

    if (action === "view-analytics") {
      return `
        <h2>Analytics Summary</h2>
        <div class="summary-grid">
          <div><span>Total Income</span><b>Rs ${totalIncome.toLocaleString("en-IN")}</b></div>
          <div><span>Total Expenses</span><b>Rs ${totalExpense.toLocaleString("en-IN")}</b></div>
          <div><span>Total Savings</span><b>Rs ${totalSavings.toLocaleString("en-IN")}</b></div>
          <div><span>Transaction Count</span><b>${transactions.length}</b></div>
        </div>
        <h3>Category Overview</h3>
        <table>
          <thead><tr><th>Category</th><th>Transactions</th><th>Total Amount</th></tr></thead>
          <tbody>
            ${Object.entries(
              transactions.reduce((result, item) => {
                if (item.amountType !== "debit") return result;
                if (!result[item.category]) result[item.category] = { count: 0, total: 0 };
                result[item.category].count += 1;
                result[item.category].total += getAmount(item.amount);
                return result;
              }, {})
            )
              .map(
                ([category, value]) => `
                  <tr>
                    <td>${escapeHtml(category)}</td>
                    <td>${value.count}</td>
                    <td>Rs ${value.total.toLocaleString("en-IN")}</td>
                  </tr>
                `
              )
              .join("")}
          </tbody>
        </table>
      `;
    }

    return `
      <h2>Budget Setup Form</h2>
      <div class="summary-grid">
        <div><span>Current Monthly Budget</span><b>Rs ${Number(settings.monthlyBudget || 0).toLocaleString("en-IN")}</b></div>
        <div><span>Current Savings Goal</span><b>Rs ${Number(settings.savingsGoal || 0).toLocaleString("en-IN")}</b></div>
        <div><span>Total Expenses</span><b>Rs ${totalExpense.toLocaleString("en-IN")}</b></div>
        <div><span>Budget Used</span><b>${settings.monthlyBudget ? Math.round((totalExpense / Number(settings.monthlyBudget)) * 100) : 0}%</b></div>
      </div>
      <div class="form-grid">
        <div><span>New Monthly Budget</span><b></b></div>
        <div><span>New Savings Goal</span><b></b></div>
        <div><span>Budget Owner</span><b>${escapeHtml(settings.fullName)}</b></div>
        <div><span>Approval Status</span><b>Pending / Approved</b></div>
      </div>
      <div class="notes"><span>Budget Notes</span></div>
    `;
  }

  function downloadPdfDocument(action) {
    const title = getDocumentTitle(action);
    const printWindow = window.open("", "_blank", "width=900,height=1000");

    if (!printWindow) {
      alert("Popup block ho gaya. Browser me popup allow karo.");
      return;
    }

    printWindow.document.write(`
      <!doctype html>
      <html>
        <head>
          <title>${escapeHtml(title)}</title>
          <style>
            * { box-sizing: border-box; }
            body { font-family: Arial, sans-serif; color: #07142f; margin: 0; padding: 28px; background: #f4f7fb; }
            .page { background: white; border: 1px solid #d7dfec; padding: 28px; }
            .header { display: flex; justify-content: space-between; gap: 20px; border-bottom: 3px solid #0b2f6b; padding-bottom: 18px; margin-bottom: 22px; }
            .brand h1 { margin: 0; font-size: 30px; color: #0b2f6b; }
            .brand p, .meta p { margin: 5px 0; color: #475569; }
            .doc-title { background: #eef5ff; border: 1px solid #d7dfec; padding: 14px; margin-bottom: 20px; }
            h2 { margin: 0 0 14px; }
            h3 { margin-top: 24px; }
            .summary-grid, .form-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; margin-bottom: 20px; }
            .summary-grid div, .form-grid div, .notes { border: 1px solid #d7dfec; min-height: 72px; padding: 12px; background: #fbfdff; }
            span { display: block; color: #64748b; font-size: 13px; margin-bottom: 8px; }
            b { font-size: 16px; }
            table { width: 100%; border-collapse: collapse; margin-top: 12px; }
            th, td { border: 1px solid #d7dfec; padding: 10px; text-align: left; font-size: 13px; }
            th { background: #eef5ff; }
            .footer { margin-top: 24px; display: flex; justify-content: space-between; color: #64748b; font-size: 13px; }
            .signature { margin-top: 42px; display: grid; grid-template-columns: 1fr 1fr; gap: 50px; }
            .signature div { border-top: 1px solid #07142f; padding-top: 8px; text-align: center; }
            @media print {
              body { background: white; padding: 0; }
              .page { border: none; }
              .print-btn { display: none; }
            }
          </style>
        </head>
        <body>
          <button class="print-btn" onclick="window.print()">Download / Save PDF</button>
          <div class="page">
            <div class="header">
              <div class="brand">
                <h1>Cisco Systems</h1>
                <p>San Jose, California, USA</p>
                <p>Networking, Security, Cloud and IT Solutions</p>
              </div>
              <div class="meta">
                <p><b>Document:</b> ${escapeHtml(title)}</p>
                <p><b>Date:</b> ${new Date().toLocaleDateString("en-IN")}</p>
                <p><b>Employee:</b> ${escapeHtml(settings.fullName)}</p>
                <p><b>Email:</b> ${escapeHtml(settings.email)}</p>
                <p><b>Role:</b> ${escapeHtml(settings.role)}</p>
              </div>
            </div>
            <div class="doc-title">
              <b>${escapeHtml(title)}</b>
              <p>This document is generated from Smart Expense Tracker with Analytics.</p>
            </div>
            ${getPdfBody(action)}
            <div class="signature">
              <div>Employee Signature</div>
              <div>Finance/Admin Signature</div>
            </div>
            <div class="footer">
              <span>Cisco Systems internal finance document</span>
              <span>Generated by Smart Expense Tracker</span>
            </div>
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => printWindow.print(), 400);
  }

  function handleActionCard(action) {
    downloadPdfDocument(action);
  }

  function handleHeaderAction() {
    if (activePage === "Reminders") {
      document.querySelector("[data-reminder-title]")?.focus();
      return;
    }

    if (activePage === "Settings") {
      document.getElementById("settings-form")?.requestSubmit();
      return;
    }

    if (activePage === "Profile") {
      handleSidebarClick("Settings");
      return;
    }

    handleSidebarClick("Add Expense");
  }

  function getHeaderActionText() {
    if (activePage === "Reminders") return "+ Add Reminder";
    if (activePage === "Settings") return "Save Settings";
    if (activePage === "Profile") return "Edit Profile";
    return "+ Add Expense";
  }

  function getAmount(amount) {
    return Number(String(amount).replace(/[^0-9.]/g, ""));
    // eslint-disable-next-line no-unreachable
    return Number(
      String(amount)
        .replace("+ ₹", "")
        .replace("- ₹", "")
        .replaceAll(",", "")
    );
  }

  const totalIncome = transactions
    .filter((item) => item.amountType === "credit")
    .reduce((sum, item) => sum + getAmount(item.amount), 0);

  const totalExpense = transactions
    .filter((item) => item.amountType === "debit")
    .reduce((sum, item) => sum + getAmount(item.amount), 0);

  const totalBalance = totalIncome - totalExpense;
  const totalSavings = totalBalance;

  if (!currentUser) {
    return (
      <div className="auth-gate-page">
        <div className="auth-gate-card">
          <div>
            <h1>Cisco Systems</h1>
            <h2>Smart Expense Tracker with Analytics</h2>
            <p>
              Register your employee account and login to access dashboard,
              products, expenses, reports, analytics and settings.
            </p>
          </div>

          <div className="auth-gate-actions">
            <button type="button" onClick={() => setAuthMode("register")}>
              Register
            </button>
            <button type="button" onClick={() => setAuthMode("login")}>
              Login
            </button>
          </div>
        </div>

        {authMode && (
          <AuthModal
            mode={authMode}
            setMode={setAuthMode}
            onClose={() => setAuthMode(null)}
            onAuthSuccess={setCurrentUser}
          />
        )}
      </div>
    );
  }

  return (
    <div className="app-shell">
      <Sidebar
        openSidebar={openSidebar}
        activePage={activePage}
        handleSidebarClick={handleSidebarClick}
        selectedProductCategory={selectedProductCategory}
        handleProductClick={handleProductClick}
      />

      <div className="main-wrapper">
        <Navbar
          setOpenSidebar={setOpenSidebar}
          settings={settings}
          handleSidebarClick={handleSidebarClick}
          searchText={searchText}
          setSearchText={setSearchText}
          currentUser={currentUser}
          onLoginClick={() => setAuthMode("login")}
          onRegisterClick={() => setAuthMode("register")}
          onLogout={() => setCurrentUser(null)}
        />

        <main className="main-content">
          <div className="page-header">
            <div>
              <h1>{activePage === "Home" ? "Dashboard" : activePage}</h1>
            </div>

            <button
              className="add-expense-btn"
              onClick={handleHeaderAction}
            >
              {getHeaderActionText()}
            </button>
          </div>

          {activePage === "Home" && (
            <>
              <div className="stats-grid">
                <StatCard
                  title="Total Balance"
                  value={`₹ ${totalBalance}`}
                  change="Updated from transactions"
                  type="balance"
                  icon="💳"
                />

                <StatCard
                  title="Total Income"
                  value={`₹ ${totalIncome}`}
                  change="Updated from transactions"
                  type="income"
                  icon="📥"
                />

                <StatCard
                  title="Total Expenses"
                  value={`₹ ${totalExpense}`}
                  change="Updated from transactions"
                  type="expense"
                  icon="📈"
                />

                <StatCard
                  title="Total Savings"
                  value={`₹ ${totalSavings}`}
                  change="Updated from transactions"
                  type="savings"
                  icon="🐷"
                />
              </div>

              <div className="charts-grid">
                <LineChartBox transactions={transactions} />
                <DonutChartBox transactions={transactions} />
              </div>

              <div className="lower-grid">
                <TransactionsTable transactions={transactions} searchText={searchText} />

                <div className="right-side-boxes">
                  <BudgetBox transactions={transactions} />
                  <GoalBox transactions={transactions} />
                </div>
              </div>

              <ActionCards onAction={handleActionCard} />
            </>
          )}

          {activePage === "Products" && (
            <Products
              selectedCategory={selectedProductCategory}
              setSelectedCategory={setSelectedProductCategory}
              globalSearchText={searchText}
              requester={{
                name: settings.fullName,
                email: settings.email,
                role: settings.role,
              }}
            />
          )}

          {activePage === "Add Expense" && (
            <AddExpense
              setShowAddExpense={setShowAddExpense}
              setTransactions={setTransactions}
            />
          )}

          {activePage === "Transactions" && (
            <TransactionsTable transactions={transactions} searchText={searchText} />
          )}

          {activePage === "Categories" && <Categories searchText={searchText} />}

         {activePage === "Reports" && <Report />}

          {activePage === "Analytics" && (
            <div className="charts-grid">
              <LineChartBox transactions={transactions} />
              <DonutChartBox transactions={transactions} />
            </div>
          )}

          {activePage === "Budgets" && (
            <BudgetBox transactions={transactions} />
          )}

          {activePage === "Goals" && (
            <GoalBox transactions={transactions} />
          )}

          {activePage === "Reminders" && <Reminders />}

          {activePage === "Settings" && (
            <Settings settings={settings} setSettings={setSettings} />
          )}

          {activePage === "Profile" && (
            <Profile settings={settings} setSettings={setSettings} />
          )}

          {activePage === "About" && <About />}
        </main>
      </div>

      {authMode && (
        <AuthModal
          mode={authMode}
          setMode={setAuthMode}
          onClose={() => setAuthMode(null)}
          onAuthSuccess={setCurrentUser}
        />
      )}
    </div>
  );
}

export default App;
