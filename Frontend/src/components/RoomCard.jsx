// src/components/RoomCard.jsx
import React from 'react';

const RoomCard = ({ room }) => {
  return (
    <div className="room-card">
      <h3>{room.name}</h3>
      <p>{room.description}</p>
      <img src={room.image} alt={room.name} style={{ width: '100%', height: 'auto' }} />
    </div>
  );
};

export default RoomCard;
