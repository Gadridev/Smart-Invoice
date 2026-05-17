export function formatInvoice(invoice) {
  return {
    id: invoice._id,
    number: `#INV-${invoice._id.slice(-6).toUpperCase()}`,
    supplier: invoice.supplierName,
    amount: `${invoice.amount.toLocaleString()} MAD`,
    paid: `${invoice.totalPaid.toLocaleString()} MAD`,
    paidTone: getPaidTone(invoice.status),
    dueDate: formatDate(invoice.dueDate),
    dueLate: invoice.status === "overdue",
    status: formatStatus(invoice.status),
  };
}

export function formatInvoiceDetails(invoice) {
  const percentage = (invoice.totalPaid / invoice.amount) * 100;
  return {
    number: `#INV-${invoice._id.slice(-6).toUpperCase()}`,
    title: invoice.supplierName,
    statusLabel: invoice.status,
    total: invoice.amount,
    progressPct: parseFloat(percentage.toFixed(1)),
    progressText: `${invoice.totalPaid.toLocaleString()}/${invoice.amount.toLocaleString()} (${percentage.toFixed(1)}%)`,
    created: formatDate(invoice.createdAt),
    due: formatDate(invoice.dueDate),
    remaining: `${invoice.remainingAmount.toLocaleString()} MAD`,
  };
}
export function formatPayment(payment) {
  console.log(payment)
  return {
    id: payment._id,
    method: payment.mode_paiement,
    meta: `${formatDate(payment.paymentDate)} · ${formatPaymentRef(payment.mode_paiement, payment._id)}`,
    amount: `+${payment.amount.toLocaleString()} MAD`,
  };
}
export function formatSupplier(supplier) {
  return [
    { label: "Nom", value: supplier.name },
    { label: "PHONE", value: supplier.phone },
    { label: "EMAIL", value: supplier.email },
    { label: "ADDRESS", value: supplier.address },
  ];
}
function formatPaymentRef(mode, id) {
  const prefix = {
    virement: "VT",
    especes: "ES",
    cheque: "CH",
    carte: "CB",
  };
  const code = prefix[mode] ?? "REF";
  return `REF-${code}-${id.slice(-5).toUpperCase()}`;
}
function formatStatus(status) {
  const map = {
    paid: "paid",
    partially_paid: "partial",
    unpaid: "late",
    overdue: "late",
  };
  return map[status] ?? "late";
}

function getPaidTone(status) {
  const map = {
    paid: "full",
    partially_paid: "partial",
    unpaid: "zero",
    overdue: "zero",
  };
  return map[status] ?? "zero";
}
function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}
