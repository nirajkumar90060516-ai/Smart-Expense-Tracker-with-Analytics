import { useEffect, useState } from "react";
import axios from "axios";
import "./Report.css";
import { apiBaseUrl, getMockReport, isMockApi } from "../lib/api";

function Report() {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchReport() {
      try {
        if (isMockApi) {
          setReport(getMockReport());
          return;
        }

        const res = await axios.get(`${apiBaseUrl}/report/EMP001`);
        setReport(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    fetchReport();
  }, []);

  if (loading) return <h2>Report loading...</h2>;
  if (!report) return <h2>Report data nahi mila</h2>;

  return (
    <div className="report-page">
      <div className="report-top">
        <div>
          <h1>{report.company.name}</h1>
          <p>{report.company.location}</p>
          <span>{report.company.about}</span>
        </div>

        <div className="report-title-box">
          <h1>Employee Expense Report</h1>
          <p>Report Month: {report.employee.reportMonth}</p>
        </div>
      </div>

      <div className="employee-details-card">
        <h2>Employee Details</h2>

        <div className="employee-grid">
          <div><b>Name</b><p>{report.employee.name}</p></div>
          <div><b>Employee ID</b><p>{report.employee.employeeId}</p></div>
          <div><b>Department</b><p>{report.employee.department}</p></div>
          <div><b>Designation</b><p>{report.employee.designation}</p></div>
          <div><b>Email</b><p>{report.employee.email}</p></div>
        </div>
      </div>

      <div className="report-card-grid">
        <div className="report-stat green-card">
          <span>💼</span>
          <div>
            <h3>Total Income</h3>
            <h2>₹{report.summary.totalIncome}</h2>
            <p>Monthly Income</p>
          </div>
        </div>

        <div className="report-stat red-card">
          <span>📉</span>
          <div>
            <h3>Total Expenses</h3>
            <h2>₹{report.summary.totalExpenses}</h2>
            <p>This Month</p>
          </div>
        </div>

        <div className="report-stat save-card">
          <span>🐷</span>
          <div>
            <h3>Total Savings</h3>
            <h2>₹{report.summary.totalSavings}</h2>
            <p>Income - Expenses</p>
          </div>
        </div>

        <div className="report-stat blue-card">
          <span>📊</span>
          <div>
            <h3>Monthly Budget</h3>
            <h2>₹{report.summary.monthlyBudget}</h2>
            <p>Set Budget</p>
          </div>
        </div>

        <div className="report-stat purple-card">
          <span>%</span>
          <div>
            <h3>Budget Used</h3>
            <h2>{report.summary.budgetUsed}%</h2>
            <p>Of Monthly Budget</p>
          </div>
        </div>
      </div>

      <div className="report-table-card">
        <h2>Recent Expenses</h2>

        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Title</th>
              <th>Category</th>
              <th>Amount</th>
              <th>Payment Method</th>
              <th>Status</th>
              <th>Description</th>
            </tr>
          </thead>

          <tbody>
            {report.recentExpenses.map((item) => (
              <tr key={item._id}>
                <td>{item.date}</td>
                <td>{item.title}</td>
                <td>{item.category}</td>
                <td>₹{item.amount}</td>
                <td>{item.method}</td>
                <td>
                  <span className="approved">{item.status}</span>
                </td>
                <td>{item.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Report;
