export function InvoiceDetailSupplier({ fields }) {
  return (
    <section className="inv-dtl-card">
      <h3 className="inv-dtl-card__title">Fournisseur</h3>
      <dl className="inv-dtl-kv">
        {fields.map((row) => (
          <div key={row.label}>
            <dt>{row.label}</dt>
            <dd>{row.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
