import React, { useEffect, useState } from 'react';
import Chip from '@mui/material/Chip';
import { useSelector,useDispatch } from 'react-redux';
import { setPayInfo } from '../actions/actions';

export const PayNowButton = ({idempotencyKey}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const amount = useSelector((state) => state.pay.amount);
  const status = useSelector((state) => state.pay.status);
  const [amountSt, setAmountSt] = useState(0);
  const dispatch = useDispatch();
  
  const handlePayment = async () => {
    // If a request is already in flight, do nothing
    if (isLoading) return;

    setIsLoading(true);
    setPaymentStatus(null);

    // Generate a unique idempotency key for this request
    // const idempotencyKey = uuidv4();

    try {
      // Simulate an API call with a delay
      const response = await fetch('http://localhost:8080/api/v1/processPayment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Idempotency-Key': idempotencyKey, // Attach the unique key
        },
        body: JSON.stringify({
          uetr:"c4d29978-01f5-4410-adc0-e2e888c8df50",
          amount: amountSt,
          // Other payment details
        }),
      });

      if (response.ok) {
        // Handle success
        const data = await response.json();
        dispatch(setPayInfo(data));
        setPaymentStatus(data.message);
      } else {
        // Handle error from server
        const errorData = await response.json();
        setPaymentStatus(`Payment failed: ${errorData.message}`);
      }
    } catch (error) {
      // Handle network errors (user offline, timeout, etc.)
      setPaymentStatus('Network error. Please retry.');
      console.error('Payment error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (event) =>{
    setAmountSt(event.target.value);
  }

  return (
    <div className="flex flex-col items-center p-6 bg-white rounded-xl shadow-lg text-gray-700">
      <h2 className="text-xl font-semibold text-[#84cc16] mb-4">Idempotency</h2>
      {/* <h2 className="text-xl font-semibold text-[#84cc16] mb-4">Complete Your Order</h2> */}
      <div className='grid grid-flow-col gap-24 mb-12'>
          <input
            type="amount"
            id="amount"
            name="amount"
            value={amountSt}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter Amount"
          />
      <Chip label={status} color={(status==="PAID"?"success":"error")} />
      <div class='row-span-1 text-2xl font-bold text-gray-800 mb-2'>
              {amount}
            </div>
      </div>
      <button
        onClick={handlePayment}
        disabled={isLoading}
        className={`w-full py-3 px-6 rounded-lg font-bold text-white transition-colors duration-200
          ${isLoading
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800'
          }`}
      >
        {isLoading ? 'Processing...' : 'Pay Now'}
      </button>

      {paymentStatus && (
        <p className={`mt-4 font-medium ${paymentStatus.startsWith('Payment Paid Successfully') ? 'text-green-600' : 'text-red-600'}`}>
          {paymentStatus}
        </p>
      )}
    </div>
  );
};
