export function SupplierDetailContact({ rows }) {
  return (
    <section className="sup-dtl-card">
      <h3 className="sup-dtl-card__title">Informations de contact</h3>
      <dl className="sup-dtl-kv">
        {rows.map((row) => (
          <div key={row.label} className="sup-dtl-kv__row">
            <dt>{row.label}</dt>
            <dd>{row.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
