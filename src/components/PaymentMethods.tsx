import React, { useState } from 'react';

interface PaymentMethodsProps {
  amount: number;
  onPaymentComplete: (method: string, transactionId: string) => void;
  onClose: () => void;
}

const PaymentMethods: React.FC<PaymentMethodsProps> = ({
  amount,
  onPaymentComplete,
  onClose
}) => {
  const [selectedMethod, setSelectedMethod] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: ''
  });

  const paymentMethods = [
    { id: 'card', name: 'Credit/Debit Card', icon: '💳' },
    { id: 'paypal', name: 'PayPal', icon: '🅿️' },
    { id: 'apple', name: 'Apple Pay', icon: '📱' },
    { id: 'google', name: 'Google Pay', icon: '🎯' },
    { id: 'bank', name: 'Bank Transfer', icon: '🏦' }
  ];

  const handleCardPayment = async () => {
    if (!cardDetails.number || !cardDetails.expiry || !cardDetails.cvv || !cardDetails.name) {
      alert('Please fill in all card details');
      return;
    }

    setLoading(true);
    // Simulate payment processing
    setTimeout(() => {
      const transactionId = `txn_${Date.now()}`;
      onPaymentComplete('card', transactionId);
      setLoading(false);
    }, 2000);
  };

  const handlePaymentMethod = async (method: string) => {
    setLoading(true);
    // Simulate payment processing for other methods
    setTimeout(() => {
      const transactionId = `txn_${Date.now()}`;
      onPaymentComplete(method, transactionId);
      setLoading(false);
    }, 1500);
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-6">Payment Methods</h2>

        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold">Total Amount:</span>
            <span className="text-2xl font-bold text-green-600">${amount.toFixed(2)}</span>
          </div>
        </div>

        <div className="space-y-3 mb-6">
          {paymentMethods.map(method => (
            <button
              key={method.id}
              onClick={() => setSelectedMethod(method.id)}
              className={`0angw7nu w-full p-4 border rounded-lg flex items-center gap-3 hover:bg-gray-50 transition-colors ${
                selectedMethod === method.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
              }`}
            >
              <span className="text-2xl">{method.icon}</span>
              <span className="font-medium">{method.name}</span>
              {selectedMethod === method.id && (
                <span className="ml-auto text-blue-500">✓</span>
              )}
            </button>
          ))}
        </div>

        {selectedMethod === 'card' && (
          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium mb-1">Card Number</label>
              <input
                type="text"
                value={cardDetails.number}
                onChange={(e) => setCardDetails({...cardDetails, number: formatCardNumber(e.target.value)})}
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="1234 5678 9012 3456"
                maxLength={19}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Expiry Date</label>
                <input
                  type="text"
                  value={cardDetails.expiry}
                  onChange={(e) => setCardDetails({...cardDetails, expiry: formatExpiry(e.target.value)})}
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="MM/YY"
                  maxLength={5}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">CVV</label>
                <input
                  type="text"
                  value={cardDetails.cvv}
                  onChange={(e) => setCardDetails({...cardDetails, cvv: e.target.value.replace(/[^0-9]/g, '')})}
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="123"
                  maxLength={4}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Cardholder Name</label>
              <input
                type="text"
                value={cardDetails.name}
                onChange={(e) => setCardDetails({...cardDetails, name: e.target.value})}
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="John Doe"
              />
            </div>
          </div>
        )}

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            onClick={() => {
              if (selectedMethod === 'card') {
                handleCardPayment();
              } else if (selectedMethod) {
                handlePaymentMethod(selectedMethod);
              } else {
                alert('Please select a payment method');
              }
            }}
            disabled={loading || !selectedMethod}
            className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
          >
            {loading ? 'Processing...' : `Pay $${amount.toFixed(2)}`}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethods;
