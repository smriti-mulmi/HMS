import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';
import Error from '../Error';
import Loader from '../Loader';
import './Rooms.css';

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
                  <td>
                    <Link to={`/room/${room._id}`}>
                      <img src={room.imageurls[0]} alt={room.name} className='room-image' />
                    </Link>
                  </td>
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
}import React, { useState , useEffect } from "react";
import { Modal, Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";
import Loader from '../Loader';
import Error from '../Error';


function Room({ room, fromdate, todate }) {
  
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div className="row m-3 p-3 bs">
      <div className="col-md-4">
        <img src={room.imageurls[0]} className="img-fluid" />
      </div>
      <div className="col-md-8">
        <h1>{room.name}</h1>
        <p>Parking , Reception , Free Wifi</p>
        <p>
          <b>Max Count : {room.maxcount}</b>
        </p>
        <p>
          <b>Phonenumber : </b>
          {room.phonenumber}
        </p>
        <p>
          <b>Type : {room.type}</b>
        </p>

        <div style={{ float: "right" }}>
          
          {(fromdate && todate) && (<Link to={`/book/${room._id}/${fromdate}/${todate}`}>
            <button className="btn btn-dark m-2">Book Now</button>
          </Link>)}

          <button className="btn btn-danger m-2"  onClick={handleShow}>
            View Details
          </button>
        </div>
      </div>

      <Modal show={show} onHide={handleClose} size="lg" data--aos='zoom-in'>
        <Modal.Header>
          <Modal.Title>{room.name}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Carousel nextLabel="" prevLabel="">
            {room.imageurls.map((url) => {
              return (
                <Carousel.Item>
                  <img
                    src={url}
                    className="img-fluid"
                    style={{ height: "400px" }}
                  />
                </Carousel.Item>
              );
            })}
          </Carousel>
          <p>{room.description}</p>
        </Modal.Body>

        <Modal.Footer>
          <button className="btn btn-primary" onClick={handleClose}>
            CLOSE
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Room;