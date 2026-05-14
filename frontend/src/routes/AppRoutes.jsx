import { Navigate, Route, Routes } from "react-router-dom";
import { DashboardLayout } from "@/layouts/DashboardLayout.jsx";
import Dashboard from "@/pages/Dashboard.jsx";
import Invoices from "@/pages/Invoices.jsx";
import InvoiceDetail from "@/pages/InvoiceDetail.jsx";
import Suppliers from "@/pages/Suppliers.jsx";
import SupplierDetail from "@/pages/SupplierDetail.jsx";
import NotFound from "@/pages/NotFound.jsx";
import LoginSignup from "@/pages/LoginSignup";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginSignup/>} />
      <Route element={<DashboardLayout />}>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/invoices" element={<Invoices />} />
        <Route path="/invoices/:id" element={<InvoiceDetail />} />
        <Route path="/suppliers" element={<Suppliers />} />
        <Route path="/suppliers/:id" element={<SupplierDetail />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
