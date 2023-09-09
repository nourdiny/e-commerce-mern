import React from 'react';
import {BsStarFill} from 'react-icons/bs';

const StarRating = ({ rating }) => {
  const maxStars = 5; 
  function convertToNumber(value) {
    if (typeof value === 'number') {
      return value; 
    }
    const convertedValue = Number(value);
    if (!isNaN(convertedValue)) {
      return convertedValue;
    }
    return 1;
  }
  convertToNumber(rating);
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= maxStars; i++) {
      const starClass = i <= rating ? 'text-[gold]' : 'text-[#ccc]';
      stars.push(<BsStarFill key={i} className={`w-[15px] m-[2px] fa fa-star ${starClass}`} />);
    }
    return stars;
  };

  return (
    <div className="star-rating">
      {renderStars()}
    </div>
  );
}

export default StarRating;
