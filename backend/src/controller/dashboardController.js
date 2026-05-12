import { getDashboardService, getSupplierStatsService } from "../services/dashboardService.js";


export const getDashboard = async (req, res, next) => {
  try {
    const data = await getDashboardService(req.user.id);

    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};

export const getSupplierStats = async (req, res, next) => {
  try {
    const data = await getSupplierStatsService(
      req.params.id,
      req.user.id
    );
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};