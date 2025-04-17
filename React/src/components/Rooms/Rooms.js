import React, { useState, useEffect } from 'react';
import axios from "axios";
import Error from '../Error';
import Loader from '../Loader';


function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get("http://localhost:5000/rooms");
        setRooms(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(true);
      }
    };

    fetchRooms();
  }, []);

  return (
    <div className='col-md-11'>
      <h1 className='table-heading'>Rooms</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Error message="Failed to load rooms. Please try again later." />
      ) : rooms.length === 0 ? (
        <p>No rooms available at the moment.</p>
      ) : (
        <div>
          <table className='styled-table'>
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Type</th>
                <th>Rent Per Day</th>
                <th>Max Count</th>
              </tr>
            </thead>
            <tbody>
              {rooms.map((room) => (
                <tr key={room._id}>
                  <td><img src={room.imageurls[0]} alt={room.name} className='room-image' /></td>
                  <td>{room.name}</td>
                  <td>{room.type}</td>
                  <td>{room.rentperday}</td>
                  <td>{room.maxcount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Rooms;
