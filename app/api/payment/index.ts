"use server"
import Razorpay from 'razorpay';
import crypto from 'crypto';

const instance = new Razorpay({
    key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY!,
    key_secret: process.env.RAZORPAY_SECRET,
});


export const createOrder = async (amount: number) => {
    const order = await instance.orders.create({
        amount: amount *100,
        currency: "INR",
        receipt: 'rcp1',
    })
console.log(order)
    return {success:true,order_ID:order.id,amount : order.amount}
}


// verify payment
const generatedSignature = (OrderId: string, razorpayPaymentId: string) => {
    const keySecret = process.env.RAZORPAY_SECRET;
    if (!keySecret) {
     throw new Error(
      'Razorpay key secret is not defined in environment variables.'
     );
    }
    const signature = crypto
     .createHmac('sha256', keySecret)
     .update(OrderId + '|' + razorpayPaymentId)
     .digest('hex');
    return signature;
   };


// algo to verify
interface Data {
    orderCreationId: string;
    razorpayPaymentId: string;
    razorpayOrderId: string;
    razorpaySignature: string;
}
export const verifyPayment = async (data:Data) => {
    const {orderCreationId,razorpaySignature,razorpayPaymentId}=data
    const signature = generatedSignature(orderCreationId, razorpayPaymentId);
    if (signature != razorpaySignature) {
        return {success : false}
    }
    else{
        return {success :true}
    }
}

