import mongoose, { Schema } from 'mongoose';

export interface INotification extends mongoose.Document {
  _id: string;
  type: string;
  title: string;
  message: string;
  sender: string;
  receiver: string;
  boardIDRequested: String;
}

const NotificationSchema: Schema = new Schema(
  {
    type: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    message: {
        type: String,
    },
    sender: {
        type: String,
    },
    receiver: {
        type: String,
    },
    boardIDRequested: {
        type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model<INotification>('notifications', NotificationSchema);