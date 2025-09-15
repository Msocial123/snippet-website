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
    paymentMethod: "Card", // Default payment method
    transactionId: "",
    amount: 0
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [paymentStep, setPaymentStep] = useState(1); // 1: select method, 2: confirm COD, 3: enter payment details

  const paymentMethods = [
    { value: "Card", label: "Credit/Debit Card", icon: "💳", description: "Visa, MasterCard, RuPay" },
    { value: "UPI", label: "UPI Payment", icon: "📱", description: "Google Pay, PhonePe, Paytm" },
    { value: "NetBanking", label: "Net Banking", icon: "🏦", description: "All major banks supported" },
    { value: "COD", label: "Cash on Delivery", icon: "📦", description: "Pay when you receive your order" }
  ];

  useEffect(() => {
    fetchOrderDetails();
  }, [orderId]);



  const fetchOrderDetails = async () => {
  setIsLoading(true);
  try {
    const response = await axios.get(`http://localhost:5000/api/orders/order/${orderId}`);
    setOrderDetails(response.data);
    setPaymentData(prev => ({
      ...prev,
      amount: (response.data.TotalPrice || 0) - (response.data.DiscountAmount || 0),
      paymentMethod: response.data.PaymentMethod || "Card",
    }));
  } catch {
    setError("Failed to fetch order details");
  } finally {
    setIsLoading(false);
  }
};


  const generateTransactionId = () => `TXN${Date.now()}${Math.random().toString(36).substr(2,5)}`.toUpperCase();
  const generatePaymentId = () => `PAY${Date.now()}${Math.random().toString(36).substr(2,5)}`.toUpperCase();

  const handlePaymentSelect = (method) => {
    setPaymentData(prev => ({ ...prev, paymentMethod: method }));

    if (method === "COD") {
      setPaymentStep(2); // Go to confirmation page for COD
    } else {
      setPaymentStep(3); // Go to payment details for other methods
    }
    setError("");
  };

  const confirmCODOrder = async () => {
    setIsProcessing(true);
    setError("");
    try {
      await axios.post("http://localhost:5000/api/payments/confirm", {
        orderId,
        paymentMethod: "COD",
        paymentId: "",
        transactionId: "",
        status: "Pending"
      });
      setSuccess(true);
      setTimeout(() => navigate("/orders"), 4000);
    } catch {
      setError("Failed to confirm COD order. Please try again.");
      setPaymentStep(2);
    } finally {
      setIsProcessing(false);
    }
  };

  const confirmPayment = async () => {
    if (paymentData.paymentId === "" || paymentData.transactionId === "") {
      setError("Please provide Payment Id and Transaction Id");
      return;
    }

    setIsProcessing(true);
    setError("");
    try {
      await axios.post("http://localhost:5000/api/payments/confirm", {
        orderId,
        paymentMethod: paymentData.paymentMethod,
        paymentId: paymentData.paymentId,
        transactionId: paymentData.transactionId,
        status: "Completed"
      });
      setSuccess(true);
      setTimeout(() => navigate("/orders"), 4000);
    } catch {
      setError("Payment failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  if (isLoading) {
    return <div className="payment-container"><p>Loading order details...</p></div>;
  }

  if (success) {
    return (
      <div className="payment-container">
        <div className="success-card">
          <div className="success-icon">✅</div>
          <h2>Payment Successful!</h2>
          <p>Your payment has been processed successfully.</p>
          <div>
            <p><b>Order ID:</b> #{orderId}</p>
            <p><b>Amount:</b> ₹{paymentData.amount}</p>
            <p><b>Payment Method:</b> {paymentData.paymentMethod}</p>
          </div>
          <button onClick={() => navigate("/orders")} className="btn-primary">Go to Orders</button>
        </div>
      </div>
    );
  }

  return (
    <div className="payment-container">
      <div className="payment-header">
        <button onClick={() => navigate(-1)} className="back-btn" aria-label="Go back">← Back</button>
        <h1>Complete Payment</h1>
      </div>

      <div className="payment-card">
        <div className="order-summary">
          <h2>Order Summary</h2>
          <p><b>Order ID:</b> #{orderId}</p>
          <p><b>Total Amount:</b> ₹{(orderDetails?.TotalPrice || 0) - (orderDetails?.DiscountAmount || 0)}</p>
        </div>

        {/* Step 1: Select Payment Method */}
        {paymentStep === 1 && (
          <div className="payment-methods">
            <h3>Select Payment Method</h3>
            <div>
              {paymentMethods.map(({value, icon, label, description}) => (
                <button key={value} onClick={() => handlePaymentSelect(value)} className="method-button">
                  <span className="method-icon">{icon}</span>
                  <div>
                    <h4>{label}</h4>
                    <p>{description}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Confirmation of COD */}
        {paymentStep === 2 && paymentData.paymentMethod === "COD" && (
          <div className="confirmation-section">
            <h3>Confirm Your Shipping Address</h3>
            <p>{orderDetails?.ShippingAddress || orderDetails?.Address || "No address found"}</p>
            <button className="btn-primary" onClick={confirmCODOrder}>Confirm Order (Cash on Delivery)</button>
            <button className="btn-secondary" onClick={() => setPaymentStep(1)}>Back to Payment Methods</button>
            {error && <p className="error-text">{error}</p>}
          </div>
        )}

        {/* Step 3: Payment Details for other methods */}
        {paymentStep === 3 && paymentData.paymentMethod !== "COD" && (
          <div className="payment-details">
            <h3>Payment Details - {paymentData.paymentMethod}</h3>
            <label>
              Payment ID
              <input type="text" value={paymentData.paymentId} onChange={e => setPaymentData({...paymentData, paymentId: e.target.value})} />
              <button onClick={() => setPaymentData({...paymentData, paymentId: generatePaymentId()})}>Generate</button>
            </label>

            <label>
              Transaction ID
              <input type="text" value={paymentData.transactionId} onChange={e => setPaymentData({...paymentData, transactionId: e.target.value})} />
              <button onClick={() => setPaymentData({...paymentData, transactionId: generateTransactionId()})}>Generate</button>
            </label>

            {error && <p className="error-text">{error}</p>}

            <div className="buttons">
              <button onClick={confirmPayment} disabled={!paymentData.paymentId || !paymentData.transactionId}>Confirm Payment</button>
              <button onClick={() => setPaymentStep(1)}>Back</button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default PaymentPage;
