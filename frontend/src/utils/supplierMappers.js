import { formatMAD } from "@/utils/currency.js";
import { formatDate } from "@/utils/formatDate.js";

export function mapSupplierForCard(supplier, stats = null) {
  return {
    ...supplier,
    invoiceCount: stats?.totalInvoices ?? 0,
    totalSpent: formatMAD(stats?.totalAmount ?? 0),
    status: stats?.invoicesByStatus?.unpaid > 0 ? "litige" : "active",
  };
}

export function mapSupplierProfile(supplier, stats) {
  const initials =
    supplier.name
      ?.split(/\s+/)
      .map((w) => w[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() ?? "?";

  const tags = [supplier.contact, supplier.address?.split(",").pop()?.trim()].filter(Boolean);

  return {
    initials,
    name: supplier.name,
    identifiers: [supplier.email, supplier.phone].filter(Boolean).join(" · ") || "—",
    tags: tags.length ? tags : ["Fournisseur"],
    totalBilled: formatMAD(stats?.totalAmount ?? 0),
    invoiceCount: stats?.totalInvoices ?? 0,
  };
}

export function mapSupplierContact(supplier) {
  return [
    { label: "Adresse", value: supplier.address || "—" },
    { label: "Téléphone", value: supplier.phone || "—" },
    { label: "Email", value: supplier.email || "—" },
    { label: "Contact principal", value: supplier.contact || "—" },
  ];
}

export function mapPaymentMetrics(stats, invoices = []) {
  const total = stats?.totalInvoices ?? 0;
  const paid = stats?.invoicesByStatus?.paid ?? 0;
  const onTimePct = total > 0 ? Math.round((paid / total) * 100) : 0;
  const recoveredPct =
    stats?.totalAmount > 0 ? Math.round((stats.totalPaid / stats.totalAmount) * 100) : 0;

  const now = Date.now();
  const lateCount = invoices.filter(
    (inv) => inv.status === "unpaid" && new Date(inv.dueDate).getTime() < now,
  ).length;

  return [
    { label: "Taux de paiement à temps", value: `${onTimePct}%`, barPct: onTimePct, barTone: "green" },
    { label: "Montant recouvré", value: `${recoveredPct}%`, barPct: recoveredPct, barTone: "gold" },
    { label: "Reste à payer", value: formatMAD(stats?.totalRemaining ?? 0), tone: "teal" },
    {
      label: "Factures en retard",
      value: lateCount === 1 ? "1 facture" : `${lateCount} factures`,
      tone: lateCount > 0 ? "danger" : undefined,
    },
  ];
}

const STATUS_UI = {
  unpaid: { status: "late", statusLabel: "En retard", amountTone: "gold" },
  partially_paid: { status: "partial", statusLabel: "Partielle", amountTone: "gold" },
  paid: { status: "paid", statusLabel: "Payée", amountTone: "green" },
};

export function mapInvoiceRow(invoice) {
  const ui = STATUS_UI[invoice.status] ?? STATUS_UI.unpaid;
  const created = formatDate(invoice.createdAt);
  const due = formatDate(invoice.dueDate);
  let meta = created;
  if (invoice.status === "paid") meta += " · Payée";
  else if (due) meta += ` · Échéance ${due}`;

  return {
    id: invoice._id,
    number: `#INV-${String(invoice._id).slice(-6).toUpperCase()}`,
    ...ui,
    meta,
    amount: formatMAD(invoice.amount),
  };
}
