import React, { useState, useEffect } from "react";
import RoomList from "../components/RoomList";
import RoomCard from "../components/RoomCard";
import { Link } from 'react-router-dom';

const Home = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState(null);

  // Fetch rooms from the backend
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/rooms");

        // Check if the response is successful
        if (!response.ok) {
          throw new Error(`Failed to fetch rooms, status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Rooms data:", data); // Log the fetched rooms
        setRooms(data);
      } catch (error) {
        console.error("Error fetching rooms:", error);
        setError(error.message || "An unknown error occurred");
      } finally {
        setLoading(false); // Set loading to false after fetch completes (either success or error)
      }
    };

    fetchRooms();
  }, []);

  return (
    <div>
      <h1>Welcome to the Interior Design Gallery</h1>

      {error && (
        <p style={{ color: "red" }}>
          Error: {error} <br />
          Please try again later or contact support.
        </p>
      )}

      <div>
        {loading ? (
          <p>Loading rooms... Please wait.</p> // Enhanced loading message
        ) : rooms.length > 0 ? (
          <RoomList rooms={rooms} />
        ) : (
          <p>No rooms available to display. Please check back later.</p> // Improved empty state message
        )}
      </div>
    </div>
  );
};

export default Home;
