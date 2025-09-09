// // // src/Components/PaymentPage.js
// // import React, { useState } from "react";
// // import axios from "axios";
// // import { useNavigate, useParams } from "react-router-dom";

// // const PaymentPage = () => {
// //   const { orderId } = useParams(); // comes from Checkout redirect
// //   const [paymentId, setPaymentId] = useState("");
// //   const [status, setStatus] = useState("pending");
// //   const navigate = useNavigate();

// //   const handleSubmit = async () => {
// //     if (!paymentId) {
// //       alert("Enter a payment ID to continue");
// //       return;
// //     }

// //     try {
// //       await axios.post("http://localhost:5000/api/payments/confirm", {
// //         orderId,
// //          paymentMethod,
// //         paymentId,
// //         transactionId,
// //         status,
// //       });
// //       alert("Payment details saved successfully!");
// //       navigate("/orders"); // redirect to orders page
// //     } catch (err) {
// //       console.error(err);
// //       alert("Error saving payment");
// //     }
// //   };

// //   return (
// //     <div className="payment-page">
// //       <h2>Payment for Order #{orderId}</h2>
// //       <div>
// //         <label>Payment ID (dummy): </label>
// //         <input
// //           type="text"
// //           value={paymentId}
// //           onChange={(e) => setPaymentId(e.target.value)}
// //         />
// //       </div>
// //       <div>
// //         <label>Status: </label>
// //         <select value={status} onChange={(e) => setStatus(e.target.value)}>
// //           <option value="pending">Pending</option>
// //           <option value="completed">Completed</option>
// //         </select>
// //       </div>
// //       <button onClick={handleSubmit}>Save Payment</button>
// //     </div>
// //   );
// // };

// // export default PaymentPage;


// import React, { useState } from "react";
// import axios from "axios";
// import { useParams, useNavigate } from "react-router-dom";
// import "./PaymentPage.css";

// const PaymentPage = () => {
//   const { orderId } = useParams();
//   const navigate = useNavigate();

//   // State for payment details
//   const [paymentId, setPaymentId] = useState("");
//   const [paymentMethod, setPaymentMethod] = useState("COD"); // Default method
//   const [transactionId, setTransactionId] = useState("");

//   const confirmPayment = async () => {
//     try {
//       await axios.post("http://localhost:5000/api/payments/confirm", {
//         orderId,
//         paymentMethod,
//         paymentId,
//         transactionId,
//         status: "Completed",
//       });

//       alert("✅ Payment confirmed successfully!");
//       navigate("/orders"); // Redirect to orders page
//     } catch (error) {
//       console.error("❌ Payment confirmation error:", error);
//       alert("Failed to confirm payment");
//     }
//   };

//   return (
//     <div>
//       <h2>Payment Page for Order #{orderId}</h2>
// {/* 
//       <label>Payment ID:</label>
//       <input
//         type="text"
//         value={paymentId}
//         onChange={(e) => setPaymentId(e.target.value)}
//         placeholder="Enter Payment ID"
//       />

//       <label>Transaction ID:</label>
//       <input
//         type="text"
//         value={transactionId}
//         onChange={(e) => setTransactionId(e.target.value)}
//         placeholder="Enter Transaction ID"
//       />

//       <label>Payment Method:</label>
//       <select
//         value={paymentMethod}
//         onChange={(e) => setPaymentMethod(e.target.value)}
//       >
//         <option value="Card">Card</option>
//         <option value="UPI">UPI</option>
//         <option value="NetBanking">Net Banking</option>
//       </select> */}

//       <div>

//   <div className="form-group">
//     <label>Payment ID:</label>
//     <input
//       type="text"
//       value={paymentId}
//       onChange={(e) => setPaymentId(e.target.value)}
//       placeholder="Enter Payment ID"
//     />
//   </div>

//   <div className="form-group">
//     <label>Transaction ID:</label>
//     <input
//       type="text"
//       value={transactionId}
//       onChange={(e) => setTransactionId(e.target.value)}
//       placeholder="Enter Transaction ID"
//     />
//   </div>

//   <div className="form-group">
//     <label>Payment Method:</label>
//     <select
//       value={paymentMethod}
//       onChange={(e) => setPaymentMethod(e.target.value)}
//     >
//       <option value="Card">Card</option>
//       <option value="UPI">UPI</option>
//       <option value="NetBanking">Net Banking</option>
//     </select>
//   </div>

//   {paymentId && (
//     <button onClick={confirmPayment}>Proceed To Pay</button>
//   )}
// </div>


//       {/* {paymentId && (
//         <button onClick={confirmPayment}>
//           Mark Payment as Completed
//         </button>
//       )} */}
//     </div>
//   );
// };

// export default PaymentPage;


import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./PaymentPage.css";

const PaymentPage = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();

  // State management
  const [orderDetails, setOrderDetails] = useState(null);
  const [paymentData, setPaymentData] = useState({
    paymentId: "",
    paymentMethod: "Card",
    transactionId: "",
    amount: 0
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [paymentStep, setPaymentStep] = useState(1);

  // Payment method options
  const paymentMethods = [
    { value: "Card", label: "Credit/Debit Card", icon: "💳", description: "Visa, MasterCard, RuPay" },
    { value: "UPI", label: "UPI Payment", icon: "📱", description: "Google Pay, PhonePe, Paytm" },
    { value: "NetBanking", label: "Net Banking", icon: "🏦", description: "All major banks supported" }
  ];

  // Fetch order details on component mount
  useEffect(() => {
    fetchOrderDetails();
  }, [orderId]);

  const fetchOrderDetails = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`http://localhost:5000/api/orders/${orderId}`);
      console.log("Order Details in Payment Page:", response.data); 
      setOrderDetails(response.data);
      setPaymentData(prev => ({
        ...prev,
        amount: (response.data.TotalPrice || 0) - (response.data.DiscountAmount || 0),
  paymentMethod: response.data.PaymentMethod || "Card"
      }));
    } catch (err) {
      setError("Failed to fetch order details");
      console.error("Order fetch error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const generateTransactionId = () => {
    return `TXN${Date.now()}${Math.random().toString(36).substr(2, 5)}`.toUpperCase();
  };

  const generatePaymentId = () => {
    return `PAY${Date.now()}${Math.random().toString(36).substr(2, 5)}`.toUpperCase();
  };

  const handlePaymentMethodSelect = (method) => {
    // setPaymentData(prev => ({
    //   ...prev,
    //   paymentMethod: method,
    //   transactionId: generateTransactionId(),
    //   paymentId: generatePaymentId()
    // }));
    setPaymentStep(2);
    setError("");
  };

  const simulatePaymentProcessing = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simulate 90% success rate
        const isSuccess = Math.random() > 0.1;
        resolve(isSuccess);
      }, 3000);
    });
  };

  const confirmPayment = async () => {
    if (!paymentData.paymentId || !paymentData.transactionId) {
      setError("Please complete all payment details");
      return;
    }

    setIsProcessing(true);
    setError("");
    setPaymentStep(3);

    try {
      // Simulate payment processing
      const paymentSuccess = await simulatePaymentProcessing();

      if (!paymentSuccess) {
        throw new Error("Payment processing failed. Please try again.");
      }

      // Send payment confirmation to backend
      await axios.post("http://localhost:5000/api/payments/confirm", {
        orderId,
        paymentMethod: paymentData.paymentMethod,
        paymentId: paymentData.paymentId,
        transactionId: paymentData.transactionId,
        status: "Completed"
      });

      setSuccess(true);
      
      // Auto-redirect after success
      setTimeout(() => {
        navigate("/orders");
      }, 4000);

    } catch (err) {
      setError(err.response?.data?.error || err.message || "Payment failed. Please try again.");
      setPaymentStep(2);
    } finally {
      setIsProcessing(false);
    }
  };

  const resetPayment = () => {
    setPaymentData({
      paymentId: "",
      paymentMethod: "Card",
      transactionId: "",
      amount: orderDetails?.totalAmount || 0
    });
    setPaymentStep(1);
    setError("");
    setSuccess(false);
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="payment-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading order details...</p>
        </div>
      </div>
    );
  }

  // Success state
  if (success) {
    return (
      <div className="payment-container">
        <div className="success-card">
          <div className="success-icon">✅</div>
          <h2>Payment Successful!</h2>
          <p>Your payment has been processed successfully.</p>
          
          <div className="transaction-details">
            <h3>Transaction Details</h3>
            <div className="detail-row">
              <span>Order ID:</span>
              <span>#{orderId}</span>
            </div>
            <div className="detail-row">
              <span>Amount:</span>
              <span>₹{paymentData.amount}</span>
            </div>
            <div className="detail-row">
              <span>Payment ID:</span>
              <span>{paymentData.paymentId}</span>
            </div>
            <div className="detail-row">
              <span>Transaction ID:</span>
              <span>{paymentData.transactionId}</span>
            </div>
            <div className="detail-row">
              <span>Method:</span>
              <span>{paymentData.paymentMethod}</span>
            </div>
          </div>

          <button 
            onClick={() => navigate("/orders")} 
            className="btn-primary"
          >
            Go to Orders
          </button>
        </div>
      </div>
    );
  }

  // Processing state
  if (paymentStep === 3 && isProcessing) {
    return (
      <div className="payment-container">
        <div className="processing-card">
          <div className="processing-spinner"></div>
          <h2>Processing Payment</h2>
          <p>Please wait while we process your payment...</p>
          
          <div className="processing-steps">
            <div className="step completed">✓ Validating payment details</div>
            <div className="step completed">✓ Connecting to payment gateway</div>
            <div className="step processing">
              <div className="step-spinner"></div>
              Processing transaction...
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="payment-container">
      {/* Header */}
      <div className="payment-header">
        <button 
          onClick={() => navigate(-1)} 
          className="back-btn"
          aria-label="Go back"
        >
          ← Back
        </button>
        <h1>Complete Payment</h1>
      </div>

      {/* Main Payment Card */}
      <div className="payment-card">
        {/* Order Summary */}
        <div className="order-summary">
          <h2>Order Summary</h2>
          <div className="summary-details">
            <div className="summary-row">
              <span>Order ID:</span>
              <span className="order-id">#{orderId}</span>
            </div>
            <div className="summary-row total">
              <span>Total Amount:</span>
        
<span>
    ₹{(orderDetails?.TotalPrice || 0) - (orderDetails?.DiscountAmount || 0)}
  </span>

            </div>
          </div>
        </div>

        {/* Payment Method Selection */}
        {paymentStep === 1 && (
          <div className="payment-methods">
            <h3>Select Payment Method</h3>
            <div className="method-grid">
              {paymentMethods.map((method) => (
                <button
                  key={method.value}
                  onClick={() => handlePaymentMethodSelect(method.value)}
                  className="method-card"
                >
                  <div className="method-icon">{method.icon}</div>
                  <div className="method-info">
                    <h4>{method.label}</h4>
                    <p>{method.description}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Payment Details Form */}
        {paymentStep === 2 && (
          <div className="payment-details">
            <div className="step-header">
              <button 
                onClick={() => setPaymentStep(1)} 
                className="back-step-btn"
              >
                ← Change Method
              </button>
              <h3>Payment Details - {paymentData.paymentMethod}</h3>
            </div>

            <div className="form-container">
              <div className="form-group">
                <label>Payment ID</label>
                <div className="input-group">
                  <input
                    type="text"
                    value={paymentData.paymentId}
                    onChange={(e) => setPaymentData(prev => ({...prev, paymentId: e.target.value}))}
                    placeholder="Enter or generate Payment ID"
                    className="form-input"
                  />
                  <button
                    onClick={() => setPaymentData(prev => ({...prev, paymentId: generatePaymentId()}))}
                    className="generate-btn"
                  >
                    Generate
                  </button>
                </div>
              </div>

              <div className="form-group">
                <label>Transaction ID</label>
                <div className="input-group">
                  <input
                    type="text"
                    value={paymentData.transactionId}
                    onChange={(e) => setPaymentData(prev => ({...prev, transactionId: e.target.value}))}
                    placeholder="Enter or generate Transaction ID"
                    className="form-input"
                  />
                  <button
                    onClick={() => setPaymentData(prev => ({...prev, transactionId: generateTransactionId()}))}
                    className="generate-btn"
                  >
                    Generate
                  </button>
                </div>
              </div>

              {/* Payment Method Specific Fields */}
              {paymentData.paymentMethod === "Card" && (
                <div className="payment-specific">
                  <div className="form-group">
                    <label>Card Number</label>
                    <input
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      className="form-input"
                      maxLength="19"
                    />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Expiry Date</label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        className="form-input"
                        maxLength="5"
                      />
                    </div>
                    <div className="form-group">
                      <label>CVV</label>
                      <input
                        type="password"
                        placeholder="123"
                        className="form-input"
                        maxLength="4"
                      />
                    </div>
                  </div>
                </div>
              )}

              {paymentData.paymentMethod === "UPI" && (
                <div className="payment-specific">
                  <div className="form-group">
                    <label>UPI ID</label>
                    <input
                      type="text"
                      placeholder="yourname@paytm"
                      className="form-input"
                    />
                  </div>
                </div>
              )}

              {paymentData.paymentMethod === "NetBanking" && (
                <div className="payment-specific">
                  <div className="form-group">
                    <label>Select Bank</label>
                    <select className="form-input">
                      <option value="">Choose your bank</option>
                      <option value="SBI">State Bank of India</option>
                      <option value="HDFC">HDFC Bank</option>
                      <option value="ICICI">ICICI Bank</option>
                      <option value="AXIS">Axis Bank</option>
                    </select>
                  </div>
                </div>
              )}
            </div>

            {/* Error Display */}
            {error && (
              <div className="error-message">
                <span className="error-icon">⚠️</span>
                <p>{error}</p>
              </div>
            )}

            {/* Payment Summary */}
            {paymentData.paymentId && paymentData.transactionId && (
              <div className="payment-summary">
                <h3>Payment Summary</h3>
                <div className="summary-grid">
                  <div className="summary-item">
                    <span>Payment Method:</span>
                    <span>{paymentData.paymentMethod}</span>
                  </div>
                  <div className="summary-item">
                    <span>Payment ID:</span>
                    <span>{paymentData.paymentId}</span>
                  </div>
                  <div className="summary-item">
                    <span>Transaction ID:</span>
                    <span>{paymentData.transactionId}</span>
                  </div>
                  <div className="summary-item total">
                    <span>Total Amount:</span>
                    <span>₹{orderDetails?.totalAmount || paymentData.amount}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="action-buttons">
              <button
                onClick={resetPayment}
                className="btn-secondary"
              >
                Reset
              </button>
              <button
                onClick={confirmPayment}
                disabled={!paymentData.paymentId || !paymentData.transactionId}
                className="btn-primary"
              >
                Confirm Payment
              </button>
            </div>
          </div>
        )}

        {/* Security Notice */}
        <div className="security-notice">
          <div className="security-icon">🔒</div>
          <div>
            <p>
              <strong>Secure Payment:</strong> Your payment information is encrypted and secure. 
              This is a demo payment system for testing purposes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Payment History Component
export const PaymentHistory = () => {
  const [payments, setPayments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetchPaymentHistory();
  }, []);

  const fetchPaymentHistory = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/payments/history");
      setPayments(response.data);
    } catch (error) {
      console.error("Failed to fetch payment history:", error);
      // Fallback to mock data for demo
      setPayments([
        {
          paymentId: 1,
          orderId: 1001,
          paymentMethod: "Card",
          paymentStatus: "Completed",
          transactionId: "TXN1234567890",
          paidAt: "2025-01-28T10:30:00Z",
          amount: 2500
        },
        {
          paymentId: 2,
          orderId: 1002,
          paymentMethod: "UPI",
          paymentStatus: "Pending",
          transactionId: "TXN0987654321",
          paidAt: "2025-01-27T15:45:00Z",
          amount: 1800
        },
        {
          paymentId: 3,
          orderId: 1003,
          paymentMethod: "NetBanking",
          paymentStatus: "Failed",
          transactionId: "TXN1122334455",
          paidAt: "2025-01-26T09:15:00Z",
          amount: 3200
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Completed": return "✅";
      case "Pending": return "⏳";
      case "Failed": return "❌";
      default: return "❓";
    }
  };

  const getPaymentMethodIcon = (method) => {
    switch (method) {
      case "Card": return "💳";
      case "UPI": return "📱";
      case "NetBanking": return "🏦";
      default: return "💳";
    }
  };

  const filteredPayments = payments.filter(payment => {
    if (filter === "all") return true;
    return payment.paymentStatus.toLowerCase() === filter.toLowerCase();
  });

  if (isLoading) {
    return (
      <div className="payment-history">
        <div className="loading-placeholder">
          {[1, 2, 3].map(i => (
            <div key={i} className="payment-item-skeleton"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="payment-history">
      <div className="history-header">
        <h2>Payment History</h2>
        
        {/* Filter Options */}
        <div className="filter-options">
          <button
            onClick={() => setFilter("all")}
            className={`filter-btn ${filter === "all" ? "active" : ""}`}
          >
            All
          </button>
          <button
            onClick={() => setFilter("completed")}
            className={`filter-btn ${filter === "completed" ? "active" : ""}`}
          >
            Completed
          </button>
          <button
            onClick={() => setFilter("pending")}
            className={`filter-btn ${filter === "pending" ? "active" : ""}`}
          >
            Pending
          </button>
          <button
            onClick={() => setFilter("failed")}
            className={`filter-btn ${filter === "failed" ? "active" : ""}`}
          >
            Failed
          </button>
        </div>
      </div>
      
      {filteredPayments.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">💳</div>
          <p>No payment history found</p>
        </div>
      ) : (
        <div className="payments-list">
          {filteredPayments.map((payment) => (
            <div key={payment.paymentId} className="payment-item">
              <div className="payment-main">
                <div className="payment-info">
                  <div className="payment-method">
                    <span className="method-icon">
                      {getPaymentMethodIcon(payment.paymentMethod)}
                    </span>
                    <div>
                      <p className="order-id">Order #{payment.orderId}</p>
                      <p className="payment-date">
                        {new Date(payment.paidAt).toLocaleDateString('en-IN', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="payment-amount">
                  <p className="amount">₹{payment.amount}</p>
                  <span className={`status-badge ${payment.paymentStatus.toLowerCase()}`}>
                    {getStatusIcon(payment.paymentStatus)} {payment.paymentStatus}
                  </span>
                </div>
              </div>
              
              <div className="payment-details">
                <div className="detail-grid">
                  <div className="detail">
                    <span>Payment ID:</span>
                    <span>{payment.transactionId}</span>
                  </div>
                  <div className="detail">
                    <span>Transaction ID:</span>
                    <span>{payment.transactionId}</span>
                  </div>
                  <div className="detail">
                    <span>Method:</span>
                    <span>{payment.paymentMethod}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PaymentPage;