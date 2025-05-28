'use client';

import React from 'react';
import { Star } from 'lucide-react';

interface StarRatingProps {
  value: number;
  onChange?: (rating: number) => void;
  size?: 'sm' | 'md' | 'lg';
  readonly?: boolean;
  showValue?: boolean;
}

const StarRating: React.FC<StarRatingProps> = ({
  value,
  onChange,
  size = 'md',
  readonly = false,
  showValue = false
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  const handleStarClick = (rating: number) => {
    if (!readonly && onChange) {
      onChange(rating);
    }
  };

  const handleStarHover = (rating: number) => {
    if (!readonly && onChange) {
      // You can add hover effects here if needed
    }
  };

  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            className={`${
              readonly ? 'cursor-default' : 'cursor-pointer hover:scale-110'
            } transition-transform duration-150 ${
              star <= value ? 'text-yellow-400' : 'text-gray-300'
            }`}
            onClick={() => handleStarClick(star)}
            onMouseEnter={() => handleStarHover(star)}
            disabled={readonly}
            aria-label={`${star} نجمة`}
          >
            <Star
              className={`${sizeClasses[size]} ${
                star <= value ? 'fill-current' : ''
              }`}
            />
          </button>
        ))}
      </div>
      
      {showValue && (
        <span className="text-sm text-gray-600 mr-2">
          ({value.toFixed(1)})
        </span>
      )}
    </div>
  );
};

export default StarRating;