// src/components/RoomList.jsx
import React from 'react';
import RoomCard from './RoomCard';

const RoomList = ({ rooms = [], loading }) => {
  if (loading) {
    return <div>Loading...</div>; // Show a loading state while fetching rooms
  }

  if (rooms.length === 0) {
    return <div>No rooms available.</div>; // Handle case where no rooms are returned
  }

  return (
    <div className="room-list">
      {rooms.map((room) => (
        <RoomCard key={room.id} room={room} />
      ))}
    </div>
  );
};

export default RoomList;
