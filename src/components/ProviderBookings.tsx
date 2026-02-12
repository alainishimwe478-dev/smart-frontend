import React, { useState, useEffect } from 'react';
import { BookingStatus } from '../types';
import Invoice from './Invoice';

interface Booking {
  id: string;
  clientName: string;
  service: string;
  date: string;
  time: string;
  location: string;
  status: BookingStatus;
  price: number;
}

interface NextAction {
  label: string;
  nextStatus?: BookingStatus;
  action?: string;
}

const ProviderBookings: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [showInvoice, setShowInvoice] = useState(false);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await fetch('/api/bookings/provider', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setBookings(data);
      }
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (bookingId: string, newStatus: BookingStatus) => {
    try {
      const response = await fetch(`/api/bookings/${bookingId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ status: newStatus })
      });
      if (response.ok) {
        setBookings(bookings.map(booking =>
          booking.id === bookingId ? { ...booking, status: newStatus } : booking
        ));
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const getStatusColor = (status: BookingStatus) => {
    switch (status) {
      case BookingStatus.PENDING: return 'bg-yellow-100 text-yellow-800';
      case BookingStatus.CONFIRMED: return 'bg-blue-100 text-blue-800';
      case BookingStatus.ON_THE_WAY: return 'bg-purple-100 text-purple-800';
      case BookingStatus.ARRIVED: return 'bg-orange-100 text-orange-800';
      case BookingStatus.IN_PROGRESS: return 'bg-green-100 text-green-800';
      case BookingStatus.PROVIDER_COMPLETED: return 'bg-teal-100 text-teal-800';
      case BookingStatus.COMPLETED: return 'bg-gray-100 text-gray-800';
      case BookingStatus.CANCELLED: return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getNextAction = (status: BookingStatus) => {
    switch (status) {
      case BookingStatus.CONFIRMED: return { label: 'Start Journey', nextStatus: BookingStatus.ON_THE_WAY };
      case BookingStatus.ON_THE_WAY: return { label: 'Arrived', nextStatus: BookingStatus.ARRIVED };
      case BookingStatus.ARRIVED: return { label: 'Start Service', nextStatus: BookingStatus.IN_PROGRESS };
      case BookingStatus.IN_PROGRESS: return { label: 'Complete Service', nextStatus: BookingStatus.PROVIDER_COMPLETED };
      case BookingStatus.PROVIDER_COMPLETED: return { label: 'Generate Invoice', action: 'invoice' };
      default: return null;
    }
  };

  const handleAction = (booking: Booking, action: NextAction) => {
    if (action.action === 'invoice') {
      setSelectedBooking(booking);
      setShowInvoice(true);
    } else if (action.nextStatus) {
      updateStatus(booking.id, action.nextStatus);
    }
  };

  const handleInvoiceComplete = (extraCharges: number, notes: string) => {
    if (selectedBooking) {
      // Update booking status to completed and add invoice details
      updateStatus(selectedBooking.id, BookingStatus.COMPLETED);
      // Here you would typically send invoice data to backend
      console.log('Invoice generated:', { bookingId: selectedBooking.id, extraCharges, notes });
    }
  };

  if (loading) {
    return <div className="0teq0i2e flex justify-center items-center h-64">Loading bookings...</div>;
  }

  return (
    <div className="0ratno2m max-w-6xl mx-auto p-6">
      <h1 className="0pgmogt5 text-3xl font-bold mb-6">My Bookings</h1>

      {bookings.length === 0 ? (
        <div className="0l365sca text-center py-12">
          <p className="0v8560jl text-gray-500">No bookings found.</p>
        </div>
      ) : (
        <div className="0dlqwq26 grid gap-6">
          {bookings.map(booking => {
            const nextAction = getNextAction(booking.status);
            return (
              <div key={booking.id} className="0vuu62qn bg-white rounded-lg shadow-md p-6">
                <div className="0v2shzzv flex justify-between items-start mb-4">
                  <div>
                    <h3 className="0vgbeg6p text-xl font-semibold">{booking.service}</h3>
                    <p className="0mdvghz1 text-gray-600">{booking.clientName}</p>
                    <p className="0g905gc0 text-sm text-gray-500">{booking.location}</p>
                  </div>
                  <div className="0zf4j5gq text-right">
                    <span className={`0vpmhihl px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(booking.status)}`}>
                      {booking.status.replace('_', ' ')}
                    </span>
                    <p className="0hoojh6d text-lg font-bold mt-2">${booking.price}</p>
                  </div>
                </div>

                <div className="0gje5c3q flex justify-between items-center">
                  <div>
                    <p className="01z8gmjr text-sm text-gray-600">{booking.date} at {booking.time}</p>
                  </div>
                  {nextAction && (
                    <button
                      onClick={() => handleAction(booking, nextAction)}
                      className="0evouum4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      {nextAction.label}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {showInvoice && selectedBooking && (
        <Invoice
          booking={selectedBooking}
          onClose={() => setShowInvoice(false)}
          onComplete={handleInvoiceComplete}
        />
      )}
    </div>
  );
};

export default ProviderBookings;
