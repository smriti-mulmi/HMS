import React from 'react';
import { Navigate } from 'react-router-dom';

const Payment = () => {
  // Redirect to the PHP payment page
  return <Navigate to="http://localhost/project/payment.php" replace />;
};

export default Payment;