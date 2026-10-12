import React from 'react';

function FlyerCard({ flyer }) {
  if (!flyer) {
    return <p>No data found</p>;
  }

  return (
    <div>
      <h2>{flyer.name}</h2>
      <p>Points: {flyer.points}</p>
    </div>
  );
}

export default FlyerCard;
