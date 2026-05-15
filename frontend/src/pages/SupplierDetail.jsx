import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "@/styles/supplier-detail.css";
import { getSupplierById } from "@/api/suppliersApi";
import { getSupplierStats } from "@/api/dashboardApi";
import { getInvoices } from "@/api/invoicesApi";
import { formatMAD } from "@/utils/currency.js";
import { formatDate } from "@/utils/formatDate.js";
import { SupplierDetailContact } from "@/components/suppliers/SupplierDetailContact.jsx";
import { SupplierDetailPaymentStats } from "@/components/suppliers/SupplierDetailPaymentStats.jsx";
import { SupplierDetailProfile } from "@/components/suppliers/SupplierDetailProfile.jsx";
import { SupplierDetailRecentInvoices } from "@/components/suppliers/SupplierDetailRecentInvoices.jsx";
import Loading from "@/components/Loading";

function isValidId(id) {
  return /^[a-f\d]{24}$/i.test(id);
}

function getInitials(name) {
  if (!name) return "?";
  const words = name.trim().split(" ");
  let letters = "";
  for (let i = 0; i < words.length && letters.length < 2; i++) {
    if (words[i][0]) letters += words[i][0];
  }
  return letters.toUpperCase();
}

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

    if (!isValidId(id)) {
      setLoading(false);
      setError("Fournisseur introuvable");
      return;
    }

    loadDetail(id);
  }, [id]);

  async function loadDetail(supplierId) {
    setLoading(true);
    setError(null);

    try {
      const supplierRes = await getSupplierById(supplierId);
      const stats = await getSupplierStats(supplierId);
      const invRes = await getInvoices({ supplierId, limit: 10 });

      const supplier = supplierRes.data.supplier;
      const invoiceList = invRes.data || [];

      // --- Profil ---
      const tags = [];
      if (supplier.contact) tags.push(supplier.contact);
      if (supplier.address) {
        const parts = supplier.address.split(",");
        const city = parts[parts.length - 1].trim();
        if (city) tags.push(city);
      }
      if (tags.length === 0) tags.push("Fournisseur");

      let identifiers = "";
      if (supplier.email) identifiers = supplier.email;
      if (supplier.phone) {
        identifiers = identifiers ? identifiers + " · " + supplier.phone : supplier.phone;
      }
      if (!identifiers) identifiers = "—";

      setProfile({
        initials: getInitials(supplier.name),
        name: supplier.name,
        identifiers,
        tags,
        totalBilled: formatMAD(stats.totalAmount || 0),
        invoiceCount: stats.totalInvoices || 0,
      });

      // --- Contact ---
      setContact([
        { label: "Adresse", value: supplier.address || "—" },
        { label: "Téléphone", value: supplier.phone || "—" },
        { label: "Email", value: supplier.email || "—" },
        { label: "Contact principal", value: supplier.contact || "—" },
      ]);

      // --- Stats paiement ---
      const total = stats.totalInvoices || 0;
      const paid = stats.invoicesByStatus?.paid || 0;
      const onTimePct = total > 0 ? Math.round((paid / total) * 100) : 0;
      const recoveredPct =
        stats.totalAmount > 0 ? Math.round((stats.totalPaid / stats.totalAmount) * 100) : 0;

      let lateCount = 0;
      const now = Date.now();
      for (const inv of invoiceList) {
        if (inv.status === "unpaid" && new Date(inv.dueDate).getTime() < now) {
          lateCount++;
        }
      }

      setMetrics([
        {
          label: "Taux de paiement à temps",
          value: onTimePct + "%",
          barPct: onTimePct,
          barTone: "green",
        },
        {
          label: "Montant recouvré",
          value: recoveredPct + "%",
          barPct: recoveredPct,
          barTone: "gold",
        },
        {
          label: "Reste à payer",
          value: formatMAD(stats.totalRemaining || 0),
          tone: "teal",
        },
        {
          label: "Factures en retard",
          value: lateCount === 1 ? "1 facture" : lateCount + " factures",
          tone: lateCount > 0 ? "danger" : undefined,
        },
      ]);

      // --- Factures récentes ---
      const rows = [];
      for (const inv of invoiceList) {
        let status = "late";
        let statusLabel = "En retard";
        let amountTone = "gold";

        if (inv.status === "paid") {
          status = "paid";
          statusLabel = "Payée";
          amountTone = "green";
        } else if (inv.status === "partially_paid") {
          status = "partial";
          statusLabel = "Partielle";
        }

        let meta = formatDate(inv.createdAt);
        if (inv.status === "paid") {
          meta = meta + " · Payée";
        } else {
          const due = formatDate(inv.dueDate);
          if (due) meta = meta + " · Échéance " + due;
        }

        rows.push({
          id: inv._id,
          number: "#INV-" + String(inv._id).slice(-6).toUpperCase(),
          status,
          statusLabel,
          meta,
          amount: formatMAD(inv.amount),
          amountTone,
        });
      }
      setInvoices(rows);
    } catch (err) {
      const message = err.response?.data?.message || "Fournisseur introuvable";
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <Loading message="Chargement du détail du fournisseur…" />;
  }

  if (error) {
    return <p className="sup-loading">{error}</p>;
  }

  if (!profile) {
    return null;
  }

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
