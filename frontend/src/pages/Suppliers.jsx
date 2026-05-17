import { useEffect, useState } from "react";
import "@/styles/suppliers.css";
import { getSuppliers } from "@/api/suppliersApi";
import { getSupplierStats } from "@/api/dashboardApi";
import { formatMAD } from "@/utils/currency.js";
import SupplierCard from "@/components/suppliers/SupplierCard";
import SupplierCardNew from "@/components/suppliers/SupplierCardNew";
import Loading from "@/components/Loading";
import NewSupplierModal from "@/models/SupplierModel";

export default function Suppliers() {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showSupplierModal, setShowSupplierModal] = useState(false);

  useEffect(() => {
    loadSuppliers();
  }, []);

  async function loadSuppliers() {
    setLoading(true);
    setError(null);

    try {
      const res = await getSuppliers();
      const list = res.data.suppliers || [];
      const cards = [];

      for (const supplier of list) {
        let stats = null;
        try {
          stats = await getSupplierStats(supplier._id);
        } catch {
          // pas de stats pour ce fournisseur
        }

        const unpaid = stats?.invoicesByStatus?.unpaid || 0;

        cards.push({
          ...supplier,
          invoiceCount: stats ? stats.totalInvoices : 0,
          totalSpent: formatMAD(stats ? stats.totalAmount : 0),
          status: unpaid > 0 ? "litige" : "active",
        });
      }

      setSuppliers(cards);
    } catch (err) {
      const message = err.response?.data?.message || "Impossible de charger les fournisseurs";
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <Loading message="Chargement des fournisseurs…" />;
    return <Loading message="Chargement des fournisseurs…" />;
  }

  if (error) {
    return <p className="sup-loading">{error}</p>;
  }

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
        <SupplierCardNew setShowSupplierModal={setShowSupplierModal}/>
      </div>
      <NewSupplierModal
        open={showSupplierModal}
        onClose={() => setShowSupplierModal(false)}
        onCreated={loadSuppliers}
      />
    </div>
  );
}
