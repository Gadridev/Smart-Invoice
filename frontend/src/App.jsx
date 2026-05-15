import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext.jsx";
import { AppRoutes } from "@/routes/AppRoutes.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
      <Route path="/suppliers" element={<Suppliers />} />

      <Route path="/suppliers/:id" element={<SupplierDetail />} />
    </BrowserRouter>
  );
}
