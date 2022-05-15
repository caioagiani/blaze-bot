import { Schema, model } from 'mongoose';

const DoubleSchema = new Schema({
  id: {
    type: String,
    unique: true,
    required: true,
  },
  created_at: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  roll: {
    type: String,
    required: true,
  },
  server_seed: {
    type: String,
    required: true,
  },
});

export default model('double', DoubleSchema);
