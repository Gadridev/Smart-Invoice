import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "@/styles/supplier-detail.css";
import { getSupplierById } from "@/api/suppliersApi";
import { getSupplierStats } from "@/api/dashboardApi";
import { getInvoices } from "@/api/invoicesApi";
import {
  mapSupplierProfile,
  mapSupplierContact,
  mapPaymentMetrics,
  mapInvoiceRow,
} from "@/utils/supplierMappers.js";
import { SupplierDetailContact } from "@/components/suppliers/SupplierDetailContact.jsx";
import { SupplierDetailPaymentStats } from "@/components/suppliers/SupplierDetailPaymentStats.jsx";
import { SupplierDetailProfile } from "@/components/suppliers/SupplierDetailProfile.jsx";
import { SupplierDetailRecentInvoices } from "@/components/suppliers/SupplierDetailRecentInvoices.jsx";
import { isValidObjectId } from "@/utils/objectId.js";

export default function SupplierDetail() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [profile, setProfile] = useState(null);
  const [contact, setContact] = useState([]);
  const [metrics, setMetrics] = useState([]);
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    if (!id) return;
    if (!isValidObjectId(id)) {
      setLoading(false);
      setError("Fournisseur introuvable");
      setProfile(null);
      return;
    }
    loadDetail(id);
  }, [id]);

  async function loadDetail(supplierId) {
    setLoading(true);
    setError(null);
    try {
      const [supplierRes, stats, invRes] = await Promise.all([
        getSupplierById(supplierId),
        getSupplierStats(supplierId),
        getInvoices({ supplierId, limit: 10 }),
      ]);

      const supplier = supplierRes.data.supplier;
      const invoiceList = invRes.data ?? [];

      setProfile(mapSupplierProfile(supplier, stats));
      setContact(mapSupplierContact(supplier));
      setMetrics(mapPaymentMetrics(stats, invoiceList));
      setInvoices(invoiceList.map(mapInvoiceRow));
    } catch (err) {
      setError(err.response?.data?.message ?? "Fournisseur introuvable");
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <p className="sup-loading">Chargement…</p>;
  if (error) return <p className="sup-loading">{error}</p>;
  if (!profile) return null;

  return (
    <div className="sup-dtl">
      <SupplierDetailProfile profile={profile} />
      <div className="sup-dtl-grid">
        <div className="sup-dtl-col">
          <SupplierDetailContact rows={contact} />
          <SupplierDetailPaymentStats metrics={metrics} />
        </div>
        <div className="sup-dtl-col">
          <SupplierDetailRecentInvoices invoices={invoices} />
        </div>
      </div>
    </div>
  );
}
