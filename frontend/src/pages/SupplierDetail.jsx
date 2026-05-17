import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "@/styles/supplier-detail.css";
import { getSupplierById } from "@/api/suppliersApi";
import { getSupplierStats } from "@/api/dashboardApi";
import { getInvoices } from "@/api/invoicesApi";

import { SupplierDetailContact } from "@/components/suppliers/SupplierDetailContact.jsx";
import { SupplierDetailPaymentStats } from "@/components/suppliers/SupplierDetailPaymentStats.jsx";
import { SupplierDetailProfile } from "@/components/suppliers/SupplierDetailProfile.jsx";
import { SupplierDetailRecentInvoices } from "@/components/suppliers/SupplierDetailRecentInvoices.jsx";
import Loading from "@/components/Loading";
import { formatSupplierDetail } from "@/utils/formatSupplier";

export default function SupplierDetail() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);
  const [profile, setProfile] = useState(null);
  const [metrics, setMetrics] = useState([]);
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    loadDetail();
  }, []);

  async function loadDetail() {
    setLoading(true);
    try {
      const [supplierRes, stats, invRes] = await Promise.all([
        getSupplierById(id),
        getSupplierStats(id),
        getInvoices({ supplierId: id, limit: 10 }),
      ]);

      const supplier    = supplierRes.data.supplier;
      const invoiceList = invRes.data || [];


      const { profile, metrics, rows } = formatSupplierDetail(supplier, stats, invoiceList);

      setProfile(profile);
      setMetrics(metrics);
      setInvoices(rows);
    } catch (err) {
      setError(err.response?.data?.message || "Fournisseur introuvable");
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <Loading message="Chargement fournisseur…" />;
  if (error)   return <p className="sup-loading">{error}</p>;
  if (!profile) return null;

  return (
    <div className="sup-dtl">
      <SupplierDetailProfile profile={profile} />
      <div className="sup-dtl-grid">
        <div className="sup-dtl-col">
          <SupplierDetailContact rows={[
            { label: "Adresse",           value: profile.address },
            { label: "Téléphone",         value: profile.phone   },
            { label: "Email",             value: profile.email   },
          ]} />
          <SupplierDetailPaymentStats metrics={metrics} />
        </div>
        <div className="sup-dtl-col">
          <SupplierDetailRecentInvoices invoices={invoices} />
        </div>
      </div>
    </div>
  );
}