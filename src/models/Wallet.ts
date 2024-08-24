import { Schema, model, Document } from "mongoose";
import moment from "moment";

// Define the IWallet interface extending Document
export interface IWallet extends Document {
  username: string;
  balance: number;
  energy: number;
  full_energy: number;
  tap: number;
  limit: number;
  daily_coins: Date;
}

// Create the Wallet schema
const WalletSchema: Schema<IWallet> = new Schema({
  username: {
    type: String,
    required: true,
  },
  balance: {
    type: Number,
    default: 0,
  },
  energy: {
    type: Number,
    default: 1000,
  },
  full_energy: {
    type: Number,
    default: 1,
  },
  tap: {
    type: Number,
    default: 1,
  },
  limit: {
    type: Number,
    default: 1000,
  },
  daily_coins: {
    type: Date,
    default: () => moment().toDate(),
  },
});

// Create the model from the schema
const Wallet = model<IWallet>("Wallet", WalletSchema);

export default Wallet;
