import { useState } from "react";
import { apiBaseUrl } from "../lib/api";

const ciscoUpiId = "9006091516-2@axl";
const ciscoCompanyName = "Cisco Systems";

function AddExpense({ setShowAddExpense, setTransactions }) {
  const [showScanModal, setShowScanModal] = useState(false);
  const [receipt, setReceipt] = useState(null);
  const [paymentReference, setPaymentReference] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    category: "",
    date: "",
    method: "",
    status: "Completed",
    description: "",
    tags: "",
    repeat: false,
  });

  function handleChange(e) {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  }

  function createReceiptNumber() {
    return `CISCO-RCPT-${Date.now()}`;
  }

  function createPaymentReference() {
    return `CISCO-PAY-${Date.now().toString().slice(-8)}`;
  }

  function getUpiPaymentUrl() {
    const params = new URLSearchParams({
      pa: ciscoUpiId,
      pn: ciscoCompanyName,
      am: formData.amount || "0",
      cu: "INR",
      tn: formData.title || "Cisco Expense Payment",
    });

    return `upi://pay?${params.toString()}`;
  }

  function getQrImageUrl() {
    return `https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodeURIComponent(
      getUpiPaymentUrl()
    )}`;
  }

  function openScanModal() {
    if (!formData.title || !formData.amount || !formData.method) {
      alert("Scan se pehle title, amount aur payment method fill karo");
      return;
    }

    setShowScanModal(true);
  }

  async function saveExpense(finalPaymentReference, paymentStatus) {
    const receiptNumber = createReceiptNumber();

    const backendExpense = {
      employeeId: "EMP001",
      employeeName: "Rahul Sharma",
      department: "Information Technology",
      designation: "Software Engineer",
      email: "rahul.sharma@cisco.com",
      companyName: ciscoCompanyName,
      receiptNumber,
      paymentReference: finalPaymentReference,
      upiId: ciscoUpiId,

      title: formData.title,
      amount: Number(formData.amount),
      category: formData.category,
      date: formData.date,
      method: formData.method,
      status: paymentStatus,
      description: formData.description || formData.title,
      tags: formData.tags,
      repeatMonthly: formData.repeat,
    };

    try {
      const response = await fetch(`${apiBaseUrl}/expenses`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(backendExpense),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Expense save nahi hua");
        return;
      }

      const frontendExpense = {
        date: formData.date,
        category: formData.category,
        description: formData.description || formData.title,
        method: formData.method,
        status: paymentStatus,
        receiptNumber,
        paymentReference: finalPaymentReference,
        upiId: ciscoUpiId,
        amount: `- ₹${formData.amount}`,
        amountType: "debit",
      };

      setTransactions((prev) => [frontendExpense, ...prev]);

      setReceipt({
        receiptNumber,
        paymentReference: finalPaymentReference,
        companyName: ciscoCompanyName,
        upiId: ciscoUpiId,
        title: formData.title,
        amount: formData.amount,
        category: formData.category,
        date: formData.date,
        method: formData.method,
        status: paymentStatus,
      });
    } catch (error) {
      console.log(error);
      alert("Backend server nahi chal raha ya API error hai");
    }
  }

  async function completeScannedPayment() {
    const reference = createPaymentReference();

    setPaymentReference(reference);
    setFormData((prev) => ({
      ...prev,
      status: "Completed",
    }));
    setShowScanModal(false);
    await saveExpense(reference, "Completed");
  }

  async function handleSubmit(e) {
    e.preventDefault();

    await saveExpense(paymentReference || createPaymentReference(), formData.status);
  }

  function handleReceiptDone() {
    setReceipt(null);
    setShowScanModal(false);
    setShowAddExpense(false);
  }

  return (
    <div className="add-expense-page">
      <h1>Add Expense</h1>

      <form className="expense-form" onSubmit={handleSubmit}>
        <h2>Expense Details</h2>

        <div className="form-grid">
          <div className="form-group">
            <label>Expense Title *</label>
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              type="text"
              placeholder="Enter expense title"
              required
            />
          </div>

          <div className="form-group">
            <label>Amount (Rs) *</label>
            <input
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              type="number"
              placeholder="Enter amount"
              required
            />
          </div>

          <div className="form-group">
            <label>Category *</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="">Select category</option>
              <option>Food & Dining</option>
              <option>Travel</option>
              <option>Bills & Utilities</option>
              <option>Shopping</option>
              <option>Entertainment</option>
              <option>Others</option>
            </select>
          </div>

          <div className="form-group">
            <label>Date *</label>
            <input
              name="date"
              value={formData.date}
              onChange={handleChange}
              type="date"
              required
            />
          </div>

          <div className="form-group">
            <label>Payment Method *</label>
            <select
              name="method"
              value={formData.method}
              onChange={handleChange}
              required
            >
              <option value="">Select payment method</option>
              <option>Cash</option>
              <option>UPI</option>
              <option>Debit Card</option>
              <option>Credit Card</option>
              <option>Net Banking</option>
              <option>Wallet</option>
            </select>
          </div>

          <div className="form-group">
            <label>Payment Status *</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option>Completed</option>
              <option>Pending</option>
              <option>Failed</option>
            </select>
          </div>

          <div className="scan-payment-card">
            <div>
              <h3>Cisco Scan Payment</h3>
              <p>Scan Cisco company QR. Payment complete hote hi receipt milegi.</p>
              {paymentReference && (
                <strong>Payment Ref: {paymentReference}</strong>
              )}
            </div>
            <button type="button" onClick={openScanModal}>
              Scan Cisco QR
            </button>
          </div>

          <div className="form-group full">
            <label>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Write short description..."
            ></textarea>
          </div>

          <div className="form-group full">
            <label>Attach Receipt</label>
            <input type="file" />
          </div>

          <div className="form-group">
            <label>Tags</label>
            <input
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              type="text"
              placeholder="personal, office"
            />
          </div>

          <div className="checkbox-box">
            <input
              name="repeat"
              checked={formData.repeat}
              onChange={handleChange}
              type="checkbox"
              id="repeat"
            />
            <label htmlFor="repeat">Repeat Monthly</label>
          </div>
        </div>

        <div className="form-buttons">
          <button
            type="button"
            className="cancel-btn"
            onClick={() => setShowAddExpense(false)}
          >
            Cancel
          </button>

          <button type="reset" className="reset-btn">
            Reset
          </button>

          <button type="submit" className="submit-btn">
            Book Expense
          </button>
        </div>
      </form>

      {showScanModal && (
        <div className="payment-modal-overlay">
          <div className="payment-modal">
            <button
              className="payment-modal-close"
              type="button"
              onClick={() => setShowScanModal(false)}
            >
              x
            </button>

            <h2>Cisco Systems Payment</h2>
            <p>Scan this original UPI QR and complete payment.</p>

            <div className="cisco-qr-box">
              <img src={getQrImageUrl()} alt="Cisco UPI QR" />
              <span>CISCO PAY</span>
            </div>

            <div className="payment-preview">
              <div>
                <span>UPI ID</span>
                <strong>{ciscoUpiId}</strong>
              </div>
              <div>
                <span>Expense Title</span>
                <strong>{formData.title}</strong>
              </div>
              <div>
                <span>Amount</span>
                <strong>
                  Rs {Number(formData.amount || 0).toLocaleString("en-IN")}
                </strong>
              </div>
              <div>
                <span>Payment Method</span>
                <strong>{formData.method}</strong>
              </div>
            </div>

            <button
              className="payment-complete-btn"
              type="button"
              onClick={completeScannedPayment}
            >
              Payment Completed
            </button>
          </div>
        </div>
      )}

      {receipt && (
        <div className="payment-modal-overlay">
          <div className="payment-modal receipt-modal">
            <h2>Cisco Systems Receipt</h2>
            <p>Expense booked successfully under Cisco company account.</p>

            <div className="receipt-box">
              <div>
                <span>Receipt No</span>
                <strong>{receipt.receiptNumber}</strong>
              </div>
              <div>
                <span>Payment Ref</span>
                <strong>{receipt.paymentReference}</strong>
              </div>
              <div>
                <span>Company</span>
                <strong>{receipt.companyName}</strong>
              </div>
              <div>
                <span>UPI ID</span>
                <strong>{receipt.upiId}</strong>
              </div>
              <div>
                <span>Expense Title</span>
                <strong>{receipt.title}</strong>
              </div>
              <div>
                <span>Amount</span>
                <strong>
                  Rs {Number(receipt.amount || 0).toLocaleString("en-IN")}
                </strong>
              </div>
              <div>
                <span>Status</span>
                <strong>{receipt.status}</strong>
              </div>
              <div>
                <span>Method</span>
                <strong>{receipt.method}</strong>
              </div>
              <div>
                <span>Date</span>
                <strong>{receipt.date}</strong>
              </div>
            </div>

            <div className="receipt-actions">
              <button type="button" onClick={() => window.print()}>
                Print Receipt
              </button>
              <button type="button" onClick={handleReceiptDone}>
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddExpense;
