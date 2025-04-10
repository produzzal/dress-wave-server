import { Schema, model } from 'mongoose';
import { TUser } from './user.interface';
import { USER_ROLE } from './user.constant';
import config from '../../config';

const bcrypt = require('bcrypt');

const userSchema = new Schema<TUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    phone: { type: String, required: true },
    address: { type: String },
    role: { type: String, enum: Object.keys(USER_ROLE), default: 'user' },
    profilePicture: {
      type: String,
      default: 'https://i.ibb.co.com/rd4JYZ8/images.png',
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        delete ret.password;
        delete ret.__v;

        // Create an ordered response for better readability
        const orderedRet = {
          _id: doc._id,
          name: doc.name,
          email: doc.email,
          password: doc.password,
          phone: doc.phone,
          role: doc.role,
          address: doc.address,
          profilePicture: doc.profilePicture,
        };
        return orderedRet;
      },
    },
  },
);

// Middleware to hash the password before saving
userSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(
      user.password,
      Number(config.bcrypt_salt_rounds),
    );
  }
  next();
});

// Middleware to exclude password after saving
userSchema.post('save', async function (doc, next) {
  doc.password = '';
  next();
});

// Export the User model
export const User = model<TUser>('User', userSchema);
