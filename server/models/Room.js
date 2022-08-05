import mongoose from 'mongoose';

const RoomSchema = new mongoose.Schema(
  {
    roomId: {
      type: String,
      required: true,
      unique: true,
    },
    users: {
      type: Array,
      required: true,
    },
    progress: {
      type: Number,
      default: 0,
    },
    pairs: {
      type: Object,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model('Room', RoomSchema);
