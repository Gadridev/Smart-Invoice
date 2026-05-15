export function SupplierDetailPaymentStats({ metrics }) {
  return (
    <section className="sup-dtl-card">
      <h3 className="sup-dtl-card__title">Statistiques de paiement</h3>
      {metrics.map((metric) => (
        <div key={metric.label} className="sup-dtl-metric">
          <div className="sup-dtl-metric__head">
            <p className="sup-dtl-metric__label">{metric.label}</p>
            <p
              className={
                metric.tone
                  ? `sup-dtl-metric__pct sup-dtl-metric__pct--${metric.tone}`
                  : "sup-dtl-metric__pct"
              }
            >
              {metric.value}
            </p>
          </div>
          {metric.barPct != null && (
            <div className="sup-dtl-bar">
              <div
                className={`sup-dtl-bar__fill sup-dtl-bar__fill--${metric.barTone}`}
                style={{ width: `${metric.barPct}%` }}
              />
            </div>
          )}
        </div>
      ))}
    </section>
  );
}
