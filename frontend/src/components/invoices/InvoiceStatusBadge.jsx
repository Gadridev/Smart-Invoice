const variantClass = {
  late: "inv-badge inv-badge--late",
  partial: "inv-badge inv-badge--partial",
  paid: "inv-badge inv-badge--paid",
};

const labels = {
  late: "En retard",
  partial: "Partielle",
  paid: "Payée",
};

export function InvoiceStatusBadge({ variant }) {
  return (
    <span className={variantClass[variant]}>
      <span className="inv-badge__dot" aria-hidden />
      {labels[variant]}
    </span>
  );
}
