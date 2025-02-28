import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { capturePayment } from '@/store/user/orderSlice';
import { Loader2 } from 'lucide-react';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

const PaypalReturn = () => {
  const dispatch = useDispatch();
  const searchParams = new URLSearchParams(window.location.search)

  const paymentId = searchParams.get('paymentId') || searchParams.get('token'); 
  const payerId = searchParams.get('payerId') 
  const orderId = JSON.parse(sessionStorage.getItem('currentOrderId'));

  useEffect(() => {
    if (orderId && payerId && paymentId) {
      console.log(window.location.search);
      
      dispatch(capturePayment({ paymentId, payerId, orderId }))
        .unwrap()
        .then((data) => {
          if (data?.success) {
            console.log("Payment captured successfully.");
            // sessionStorage.removeItem("currentOrderId");
            window.location.href = "/user/payment-success";
          }
        })
        .catch((error) => {
          console.error("Error in payment processing:", error);
        });
    } else {
      console.error("Missing payment details from URL or orderId", {
        orderId,
        paymentId,
        payerId
      });
    }
  }, [orderId, payerId, paymentId, dispatch]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Processing payment...</CardTitle>
      </CardHeader>
      <CardContent>
        <Loader2 />
        <p>Please wait while we confirm your payment.</p>
      </CardContent>
    </Card>
  );
};

export default PaypalReturn;