import mongoose from "mongoose";

const supplierSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    name: { type: String, required: true, minlength: 2, trim: true },
    contact: { type: String, default: "", trim: true },
    email: { type: String, default: "", trim: true, lowercase: true },
    phone: { type: String, default: "", trim: true },
    address: { type: String, default: "", trim: true },
  },
  { timestamps: true },
);

const Supplier = mongoose.model("Supplier", supplierSchema);
export default Supplier;
