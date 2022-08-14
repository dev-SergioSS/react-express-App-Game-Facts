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
    stage: {
      type: String,
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
