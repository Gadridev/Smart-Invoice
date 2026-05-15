export default function SupplierCardNew() {
  return (
    <button type="button" className="sup-card sup-card--new">
      <span className="sup-card__plus" aria-hidden>
        +
      </span>
      <p className="sup-card__new-label">Nouveau fournisseur</p>
    </button>
  );
}
