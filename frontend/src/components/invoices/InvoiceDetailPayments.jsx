export function InvoiceDetailPayments({ title, items }) {
  return (
    <section className="inv-dtl-card">
      <h3 className="inv-dtl-card__title">{title}</h3>
      <ul className="inv-dtl-pay-list">
        {items.map((item) => (
          <li key={item.id} className="inv-dtl-pay-item">
            <span className="inv-dtl-pay-dot" aria-hidden />
            <div>
              <p>{item.method}</p>
              <p className="inv-dtl-pay-meta">{item.meta}</p>
            </div>
            <span className="inv-dtl-pay-amt">{item.amount}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
