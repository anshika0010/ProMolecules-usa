import mongoose from "mongoose";

const SupportTicketSchema = new mongoose.Schema(
  {
    name: String,
    mobile: String,
    orderId: String,
    issue: String,
    status: {
      type: String,
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.SupportTicket ||
  mongoose.model("SupportTicket", SupportTicketSchema);