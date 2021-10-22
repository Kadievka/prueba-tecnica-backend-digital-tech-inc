import mongoose from 'mongoose';
import mongooseBcrypt from 'mongoose-bcrypt';
import mongoosePaginate from 'mongoose-paginate';
import mongooseDelete from 'mongoose-delete';

export const ADMIN_ROLE = 1000;
export const SUBSIDIARY_USER_ROLE = 2000;

const userSchema = new mongoose.Schema(
  {
    active: {
      type: Boolean,
      default: false,
    },
    address: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
      lowercase: true,
      trim: true,
    },
    lastNames: {
      type: String,
      required: true
    },
    names: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    },
    role: {
      type: Number,
      required: true,
      default: SUBSIDIARY_USER_ROLE
    },
    birthdate: {
      type: String,
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

userSchema.plugin(mongooseBcrypt);
userSchema.plugin(mongoosePaginate);
userSchema.plugin(mongooseDelete, { deletedAt: true });

const User = mongoose.model('User', userSchema);

export default User;
