import express from "express"
import { getDashboard, getSupplierStats } from "../controller/dashboardController.js";
import { protect } from "../middleware/protectMiddleware.js";


const route=express.Router();
route.get("/",protect,getDashboard)
route.get("/:id/stats",protect,getSupplierStats)
export default route