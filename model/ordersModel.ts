import mongoose from 'mongoose';

const schema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },

    orderId: {
      type: String,
      required: true,
    },

    paymentId: {
      type: String,
    },

    amount: {
      type: Number,
      required: true,
    },

    tokensAdded: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: ['pending', 'success', 'failed'],
      default: 'pending',
    },
  },
  { timestamps: true },
);

const OrdersModel = mongoose.models.Orders || mongoose.model('Orders', schema);
export default OrdersModel;
