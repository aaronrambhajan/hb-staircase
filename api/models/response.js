import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export default mongoose.model(
  'Response',
  new Schema({
    subject: String,
    sound: String,
    intensity: Number,
    trial: Number,
    isCorrect: Boolean,
    rt: Number,
  })
);
