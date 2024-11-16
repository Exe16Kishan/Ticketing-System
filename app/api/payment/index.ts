"use server"
import Razorpay from 'razorpay';
import crypto from 'crypto';


 // Data interface for verification input
 interface PaymentData {
    orderCreationId: string;
    razorpayPaymentId: string;
    razorpaySignature: string;
  }

// Initialize Razorpay instance
const Instance = new Razorpay({
    key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY!, 
    key_secret: process.env.RAZORPAY_SECRET!,  
  });
  
  // Server action to create an order
  export const createOrder = async (amount: number) => {
    try {
      
      const options = {
        amount: amount * 100, 
        currency: 'INR',      
        receipt: 'rcp1',     
      };
  
      // Creating order 
      const order = await Instance.orders.create(options);
  
      // Log order details for debugging
    //   console.log('Order created:', order);
  
      // Return success response 
      return {
        success: true,
        order_ID: order.id,
        amount: order.amount, 
      };
    } catch (error) {
      console.error('Error creating Razorpay order:', error);
  
      // Return failure response
      return {
        success: false,
        message: 'Failed to create Razorpay order',
      };
    }
  };




  
// ********************* Verify signature ***************************

// Helper to generate Razorpay signature
const generatedSignature = (orderId: string, razorpayPaymentId: string) => {
    const keySecret = process.env.RAZORPAY_SECRET;
    if (!keySecret) {
      throw new Error('Razorpay key secret is not defined in environment variables.');
    }
    const signature = crypto
      .createHmac('sha256', keySecret)
      .update(orderId + '|' + razorpayPaymentId)
      .digest('hex');
    return signature;
  };
  
 
  
  // Server action to verify payment
  export const verifyPayment = async (data: PaymentData) => {
    const { orderCreationId, razorpayPaymentId, razorpaySignature } = data;
  
    try {
      // Generate server-side signature
      const signature = generatedSignature(orderCreationId, razorpayPaymentId);
  
      // Compare the generated signature with the received one
      if (signature !== razorpaySignature) {
        return { success: false, message: 'Payment verification failed' };
      }
  
      return { success: true, message: 'Payment verified successfully' };
    } catch (error) {
      console.error('Error verifying payment:', error);
      return { success: false, message: 'Internal server error' };
    }
  };