import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';
import mongooseDelete from 'mongoose-delete';

export const statusOptions = [
  'RESERVED',
  'CANCELED',
  'RETIRED',
  'DELIVERED'
];

const carRentalSchema = new mongoose.Schema(
  {
    carPlate: {
      type: String,
      required: true,
      index: true,
    },
    customer: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    },
    rentFrom: {
      type: String,
      required: true
    },
    rentTo: {
      type: String,
      required: true
    },
    status: {
      type: String,
      required: true,
      default: statusOptions[statusOptions.indexOf('RESERVED')],
      enum: statusOptions,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

carRentalSchema.plugin(mongoosePaginate);
carRentalSchema.plugin(mongooseDelete, { deletedAt: true });

const CarRental = mongoose.model('Car_Rental', carRentalSchema);

export default CarRental;