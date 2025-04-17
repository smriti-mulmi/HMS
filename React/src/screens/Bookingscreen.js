import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '../components/Loader';
import Error from '../components/Error';
import StripeCheckout from 'react-stripe-checkout';

function Bookingscreen({ match }) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [room, setRoom] = useState(null);

    useEffect(() => {
      // Some side-effect logic
      const timer = setInterval(() => {
          console.log('Timer running');
      }, 1000);
  
      // Cleanup function to clear the interval when the component unmounts
      return () => clearInterval(timer);
  }, []);  // Empty dependency array ensures this effect runs once on mount
  

    if (loading) return <Loader />;
    if (error) return <Error />;

    // Converting string dates to Date objects for calculation
    const fromDate = new Date(match.params.fromdate);
    const toDate = new Date(match.params.todate);
    const totalDays = Math.ceil((toDate - fromDate) / (1000 * 3600 * 24)); // Calculate days difference

    const totalAmount = room ? totalDays * room.rentperday : 0;

    const tokenHandler = (token) => {
        console.log(token);
        // Handle payment with the token (send it to the backend for processing)
        alert('Payment Successful!');
    };

    return (
        <div className="m-5">
            <div className="row p-3 mb-5 bs" data-aos="flip-right" duration="2000">
                <div className="col-md-6 my-auto">
                    <h1>{room?.name}</h1>
                    <img src={room?.imageurls[0]} alt="Room" style={{ height: '400px' }} />
                </div>
                <div className="col-md-6 text-right">
                    <h1><b>Booking Details</b></h1>
                    <hr />
                    <p><b>Name:</b> {JSON.parse(localStorage.getItem('currentUser'))?.name}</p>
                    <p><b>From Date:</b> {match.params.fromdate}</p>
                    <p><b>To Date:</b> {match.params.todate}</p>
                    <p><b>Max Count:</b> {room?.maxcount}</p>

                    <div className="mt-5">
                        <h1><b>Amount</b></h1>
                        <hr />
                        <p>Total Days: <b>{totalDays}</b></p>
                        <p>Rent Per Day: <b>{room?.rentperday}</b></p>
                        <h1><b>Total Amount: {totalAmount} /-</b></h1>

                        <StripeCheckout
                            amount={totalAmount * 100} // Stripe requires amount in cents
                            shippingAddress
                            token={tokenHandler}
                            stripeKey="pk_test_51IYnC0SIR2AbPxU0TMStZwFUoaDZle9yXVygpVIzg36LdpO8aSG8B9j2C0AikiQw2YyCI8n4faFYQI5uG3Nk5EGQ00lCfjXYvZ"
                            currency="INR"
                        >
                            <button className="btn btn-primary">Pay Now</button>
                        </StripeCheckout>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Bookingscreen;
