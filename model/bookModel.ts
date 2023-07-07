import mongoose, { Document, Schema } from 'mongoose';

interface Book extends Document {
  title: string;
  author: string;
  userID: String;
  // userrole: 'CREATOR' | 'VIEWER' | 'VIEW_ALL';
}

const bookSchema = new mongoose.Schema<Book>(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    userID: { type: String, required: true },
    // userrole: {
    //   type: String,
    //   required: true,
    //   enum: ['CREATOR', 'VIEWER', 'VIEW_ALL'],
    // },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const BookModel = mongoose.model<Book>('book', bookSchema);

export { BookModel };
