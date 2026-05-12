import { Navigate, Route, Routes } from "react-router-dom";
import { DashboardLayout } from "@/layouts/DashboardLayout.jsx";
import Dashboard from "@/pages/Dashboard.jsx";
import Invoices from "@/pages/Invoices.jsx";
import InvoiceDetail from "@/pages/InvoiceDetail.jsx";
import Suppliers from "@/pages/Suppliers.jsx";
import SupplierDetail from "@/pages/SupplierDetail.jsx";
import NotFound from "@/pages/NotFound.jsx";

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<DashboardLayout />}>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
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
