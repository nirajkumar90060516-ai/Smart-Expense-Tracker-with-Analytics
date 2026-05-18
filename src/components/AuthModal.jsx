import { useState } from "react";
import { apiBaseUrl } from "../lib/api";

function AuthModal({ mode, setMode, onClose, onAuthSuccess }) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    employeeId: "",
    department: "",
    role: "Employee",
    password: "",
  });
  const [message, setMessage] = useState("");
  const isRegister = mode === "register";

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage("");

    const url = isRegister
      ? `${apiBaseUrl}/auth/register`
      : `${apiBaseUrl}/auth/login`;

    const payload = isRegister
      ? formData
      : { email: formData.email, password: formData.password };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Request failed");
        return;
      }

      setMessage(data.message);

      if (isRegister) {
        setMode("login");
        return;
      }

      onAuthSuccess(data.user);
      onClose();
    } catch (error) {
      console.log(error);
      setMessage("Backend server nahi chal raha ya auth API error hai");
    }
  }

  return (
    <div className="auth-modal-overlay">
      <div className="auth-modal">
        <button className="auth-close-btn" type="button" onClick={onClose}>
          x
        </button>

        <div className="auth-brand-panel">
          <h2>Cisco Systems</h2>
          <p>Smart Expense Tracker secure employee access</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <h2>{isRegister ? "Create Account" : "Employee Login"}</h2>
          <p>
            {isRegister
              ? "Register first to save your profile in the company database."
              : "Only registered employees can login."}
          </p>

          {isRegister && (
            <div className="auth-grid">
              <label>
                Full Name
                <input
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  type="text"
                  required
                />
              </label>

              <label>
                Phone
                <input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  type="tel"
                />
              </label>

              <label>
                Employee ID
                <input
                  name="employeeId"
                  value={formData.employeeId}
                  onChange={handleChange}
                  type="text"
                />
              </label>

              <label>
                Department
                <input
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  type="text"
                />
              </label>

              <label>
                Role
                <select name="role" value={formData.role} onChange={handleChange}>
                  <option>Employee</option>
                  <option>Manager</option>
                  <option>Admin</option>
                </select>
              </label>
            </div>
          )}

          <label>
            Email
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              type="email"
              required
            />
          </label>

          <label>
            Password
            <input
              name="password"
              value={formData.password}
              onChange={handleChange}
              type="password"
              minLength="6"
              required
            />
          </label>

          {message && <div className="auth-message">{message}</div>}

          <button className="auth-submit-btn" type="submit">
            {isRegister ? "Register" : "Login"}
          </button>

          <button
            className="auth-switch-btn"
            type="button"
            onClick={() => {
              setMessage("");
              setMode(isRegister ? "login" : "register");
            }}
          >
            {isRegister
              ? "Already registered? Login"
              : "New user? Register first"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AuthModal;
