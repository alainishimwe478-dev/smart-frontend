import React, { useState, useEffect } from 'react';
import { BookingStatus } from '../types';

interface ServiceRecord {
  id: string;
  date: string;
  service: string;
  providerName: string;
  status: BookingStatus;
  rating?: number;
  review?: string;
  price: number;
  location: string;
}

const ServiceHistory: React.FC = () => {
  const [history, setHistory] = useState<ServiceRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'completed' | 'cancelled'>('all');

  useEffect(() => {
    fetchServiceHistory();
  }, []);

  const fetchServiceHistory = async () => {
    try {
      const response = await fetch('/api/bookings/history', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setHistory(data);
      }
    } catch (error) {
      console.error('Error fetching service history:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredHistory = history.filter(record => {
    if (filter === 'all') return true;
    if (filter === 'completed') return record.status === BookingStatus.COMPLETED;
    if (filter === 'cancelled') return record.status === BookingStatus.CANCELLED;
    return true;
  });

  const renderStars = (rating?: number) => {
    if (!rating) return null;
    return Array.from({ length: 5 }, (_, index) => (
      <span
        key={index}
        className={`03yw4z07 text-sm ${index < rating ? 'text-yellow-400' : 'text-gray-300'}`}
      >
        ★
      </span>
    ));
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading service history...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Service History</h1>

      <div className="mb-6">
        <div className="flex gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`07vdtgip px-4 py-2 rounded-lg ${filter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            All Services
          </button>
          <button
            onClick={() => setFilter('completed')}
            className={`0jk7q0qj px-4 py-2 rounded-lg ${filter === 'completed' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            Completed
          </button>
          <button
            onClick={() => setFilter('cancelled')}
            className={`06rihdk9 px-4 py-2 rounded-lg ${filter === 'cancelled' ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            Cancelled
          </button>
        </div>
      </div>

      {filteredHistory.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No service records found.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredHistory.map(record => (
            <div key={record.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold">{record.service}</h3>
                  <p className="text-gray-600">{record.providerName}</p>
                  <p className="text-sm text-gray-500">{record.location}</p>
                </div>
                <div className="text-right">
                  <span className={`0sk570ov px-3 py-1 rounded-full text-sm font-medium ${
                    record.status === BookingStatus.COMPLETED ? 'bg-green-100 text-green-800' :
                    record.status === BookingStatus.CANCELLED ? 'bg-red-100 text-red-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {record.status.replace('_', ' ')}
                  </span>
                  <p className="text-lg font-bold mt-2">${record.price}</p>
                  {record.rating && (
                    <div className="flex justify-end mt-1">
                      {renderStars(record.rating)}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-600">{record.date}</p>
                {record.review && (
                  <div className="max-w-md">
                    <p className="text-sm italic">"{record.review}"</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ServiceHistory;
