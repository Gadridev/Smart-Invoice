export function formatSupplierDetail(supplier, stats, invoices) {
  // profile
  const profile = {
    initials: getInitials(supplier.name),
    name: supplier.name,
    email: supplier.email || "—",
    phone: supplier.phone || "—",
    address: supplier.address || "—",
    totalBilled: `${(stats.totalAmount || 0).toLocaleString()} MAD`,
    invoiceCount: stats.totalInvoices || 0,
  };

  // stats
  const total = stats.totalInvoices || 0;
  const paid = stats.invoicesByStatus?.paid || 0;
  const onTimePct = total > 0 ? Math.round((paid / total) * 100) : 0;
  const recoveredPct = stats.totalAmount > 0
    ? Math.round((stats.totalPaid / stats.totalAmount) * 100) : 0;
    console.log(invoices)
const now = new Date();

const lateCount = invoices.filter(
  (inv) => inv.status === "unpaid" && new Date(inv.dueDate) < now
).length;

  const metrics = [
    { label: "Taux de paiement à temps", value: `${onTimePct}%`,        barPct: onTimePct,    barTone: "green"  },
    { label: "Montant recouvré",          value: `${recoveredPct}%`,     barPct: recoveredPct, barTone: "gold"   },
    { label: "Reste à payer",             value: `${(stats.totalRemaining || 0).toLocaleString()} MAD`, tone: "teal" },
    { label: "Factures en retard",        value: `${lateCount} facture${lateCount > 1 ? "s" : ""}`, tone: lateCount > 0 ? "danger" : undefined },
  ];

  // invoices
 const rows = invoices.map((inv) => {
  const isLate = inv.status === "unpaid" && new Date(inv.dueDate) < now;

  return {
    id:          inv._id,
    number:      `#INV-${inv._id.slice(-6).toUpperCase()}`,
    status:      isLate ? "late" : formatStatus(inv.status),
    statusLabel: isLate ? "En retard" : formatStatusLabel(inv.status),
    meta:        `${formatDate(inv.createdAt)} · Échéance ${formatDate(inv.dueDate)}`,
    amount:      `${inv.amount.toLocaleString()} MAD`,
    amountTone:  inv.status === "paid" ? "green" : "gold",
  };
});

  return { profile, metrics, rows };
}

function formatStatus(status) {
    console.log(status)
  const map = {
    paid: "paid",
    partially_paid: "partial",
    unpaid: "unpaid",
    overdue: "late",
  };
  return map[status] ?? "late";
}
function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}
function getInitials(name) {
  if (!name) return "?";
  return name.trim().split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase();
}


function formatStatusLabel(status) {
  const map = {
    paid:           "Payée",
    partially_paid: "Partielle",
    unpaid:         "En attente", 
    overdue:        "En retard",
  };
  return map[status] ?? "—";
}