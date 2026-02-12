import React, { useState } from 'react';
import { BookingStatus } from '../types';

interface InvoiceProps {
  booking: {
    id: string;
    clientName: string;
    service: string;
    date: string;
    time: string;
    location: string;
    price: number;
  };
  onClose: () => void;
  onComplete: (extraCharges: number, notes: string) => void;
}

const Invoice: React.FC<InvoiceProps> = ({ booking, onClose, onComplete }) => {
  const [extraCharges, setExtraCharges] = useState(0);
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);

  const total = booking.price + extraCharges;

  const handleSubmit = async () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      onComplete(extraCharges, notes);
      setLoading(false);
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <h2 className="text-2xl font-bold mb-6">Generate Invoice</h2>

        <div className="space-y-4">
          <div>
            <h3 className="font-semibold">{booking.service}</h3>
            <p className="text-sm text-gray-600">{booking.clientName}</p>
            <p className="text-sm text-gray-500">{booking.date} at {booking.time}</p>
            <p className="text-sm text-gray-500">{booking.location}</p>
          </div>

          <div className="border-t pt-4">
            <div className="flex justify-between">
              <span>Base Price:</span>
              <span>${booking.price}</span>
            </div>

            <div className="mt-2">
              <label className="block text-sm font-medium mb-1">Extra Charges</label>
              <input
                type="number"
                value={extraCharges}
                onChange={(e) => setExtraCharges(Number(e.target.value))}
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="0.00"
                min="0"
                step="0.01"
              />
            </div>

            <div className="flex justify-between font-bold mt-4 pt-2 border-t">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Notes</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
              rows={3}
              placeholder="Additional notes..."
            />
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Sending...' : 'Send Invoice'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
