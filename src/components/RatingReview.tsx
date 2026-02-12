import React, { useState } from 'react';

interface RatingReviewProps {
  bookingId: string;
  providerName: string;
  service: string;
  onSubmit: (rating: number, review: string) => void;
  onClose: () => void;
}

const RatingReview: React.FC<RatingReviewProps> = ({
  bookingId,
  providerName,
  service,
  onSubmit,
  onClose
}) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [review, setReview] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (rating === 0) {
      alert('Please select a rating');
      return;
    }

    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      onSubmit(rating, review);
      setLoading(false);
      onClose();
    }, 1000);
  };

  const renderStars = () => {
    return Array.from({ length: 5 }, (_, index) => {
      const starValue = index + 1;
      return (
        <button
          key={index}
          type="button"
          className={`0t9ygkth text-2xl ${
            starValue <= (hoverRating || rating)
              ? 'text-yellow-400'
              : 'text-gray-300'
          } hover:text-yellow-400 transition-colors`}
          onClick={() => setRating(starValue)}
          onMouseEnter={() => setHoverRating(starValue)}
          onMouseLeave={() => setHoverRating(0)}
        >
          ★
        </button>
      );
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <h2 className="text-2xl font-bold mb-6">Rate Your Experience</h2>

        <div className="space-y-4">
          <div>
            <h3 className="font-semibold">{service}</h3>
            <p className="text-sm text-gray-600">with {providerName}</p>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">Rating</label>
            <div className="flex gap-1">
              {renderStars()}
            </div>
            <p className="text-xs text-gray-500">
              {rating > 0 && `${rating} star${rating !== 1 ? 's' : ''}`}
            </p>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">Review (Optional)</label>
            <textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
              rows={4}
              placeholder="Tell us about your experience..."
              maxLength={500}
            />
            <p className="text-xs text-gray-500">{review.length}/500 characters</p>
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Skip
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading || rating === 0}
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Submitting...' : 'Submit Review'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RatingReview;
