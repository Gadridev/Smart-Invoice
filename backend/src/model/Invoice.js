import mongoose from "mongoose";

const invoiceSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    supplierId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Supplier",
      required: true,
    },
    amount: { type: Number, required: true, min: 0 },
    dueDate: { type: Date, required: true },
    description: { type: String, default: "" },
    totalPaid: { type: Number, default: 0, min: 0 },
  },
  { timestamps: true },
);

const Invoice = mongoose.model("Invoice", invoiceSchema);
export default Invoice;
