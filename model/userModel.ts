import mongoose, { Document } from 'mongoose';

interface User extends Document {
  name: string;
  email: string;
  password: string;
  role: 'CREATOR' | 'VIEWER' | 'VIEW_ALL';
}

const userSchema = new mongoose.Schema<User>(
    {
      name: { type: String, required: true },
      email: { type: String, required: true },
      password: { type: String, required: true },
      role: {
        type: String,
        default: 'VIEW_ALL',
        enum: ['CREATOR', 'VIEWER', 'VIEW_ALL'],
      },
    },
    {
      versionKey: false,
    }
  );
  
  const UserModel = mongoose.model<User>('user', userSchema);
  
  export { UserModel };