import { useEffect, useState } from "react";
import "@/styles/suppliers.css";
import { getSuppliers } from "@/api/suppliersApi";
import { getSupplierStats } from "@/api/dashboardApi";
import { mapSupplierForCard } from "@/utils/supplierMappers.js";
import SupplierCard from "@/components/suppliers/SupplierCard";
import SupplierCardNew from "@/components/suppliers/SupplierCardNew";

export default function Suppliers() {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadSuppliers();
  }, []);

  async function loadSuppliers() {
    setLoading(true);
    setError(null);
    try {
      const res = await getSuppliers();
      const list = res.data?.suppliers ?? [];

      const withStats = await Promise.all(
        list.map(async (supplier) => {
          try {
            const stats = await getSupplierStats(supplier._id);
            return mapSupplierForCard(supplier, stats);
          } catch {
            return mapSupplierForCard(supplier, null);
          }
        }),
      );

      setSuppliers(withStats);
    } catch (err) {
      setError(err.response?.data?.message ?? "Impossible de charger les fournisseurs");
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <p className="sup-loading">Chargement…</p>;
  if (error) return <p className="sup-loading">{error}</p>;

  return (
    <div className="sup-page">
      <div className="sup-grid">
        {suppliers.map((supplier, index) => (
          <SupplierCard
            key={supplier._id}
            supplier={supplier}
            colorIndex={index}
          />
        ))}
        <SupplierCardNew />
      </div>
    </div>
  );
}
