import { Schema, model, Document } from "mongoose";
import moment from "moment";

// Define the IVibe interface extending Document
export interface IVibe extends Document {
  username: string;
  message: string; // Changed from boolean to string, assuming messages are text
  vibe_date: Date; // Changed from string to Date
}

// Create the Vibe schema
const VibeSchema: Schema<IVibe> = new Schema({
  username: {
    type: String,
    required: true,
  },
  message: {
    type: String, // Changed from Boolean to String for message content
    required: true,
  },
  vibe_date: {
    type: Date,
    default: () => moment().subtract(1, 'days').toDate(), // Changed toDate() for Date type
  },
});

// Create the model from the schema
const Vibe = model<IVibe>("Vibe", VibeSchema);

export default Vibe;
