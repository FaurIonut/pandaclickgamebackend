import { Schema, model, Document } from "mongoose";
import moment from "moment";

// Define the IVibe interface extending Document
export interface IVibe extends Document {
  username: string;
  message: boolean;
  vibe_date: string;
}

// Create the Vibe schema
const VibeSchema: Schema<IVibe> = new Schema({
  username: {
    type: String,
    required: true,
  },
  message: {
    type: Boolean,
    default: true,
  },
  vibe_date: {
    type: String,
    default: () => moment().subtract(1, 'days').toISOString(),
  },
});

// Create the model from the schema
const Vibe = model<IVibe>("Vibe", VibeSchema);

export default Vibe;
