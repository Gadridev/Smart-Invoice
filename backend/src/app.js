import express from "express";
import cors from "cors";
import authRouter from "./routes/authRoute.js";
import supplierRouter from "./routes/supplierRoute.js";
import invoiceRouter from "./routes/invoiceRoute.js";
import dashboardRoute from "./routes/dashboardRoute.js";
import ErrorMiddleware from "./middleware/ErrorMiddleware.js";
import routeAdmin from "./routes/adminRoute.js";
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);
app.use("/api/auth", authRouter);
app.use("/api/suppliers", supplierRouter);
app.use("/api/invoices", invoiceRouter);
app.use("/api/dashboard", dashboardRoute);
app.use("/api/admin", routeAdmin);

app.use(ErrorMiddleware);

export default app;
