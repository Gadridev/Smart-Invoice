export default function SupplierCardNew({setShowSupplierModal}) {
  return (
    <button type="button" className="sup-card sup-card--new" onClick={() => setShowSupplierModal(true)}>
      <span className="sup-card__plus" aria-hidden>
        +
      </span>
      <p className="sup-card__new-label">Nouveau fournisseur</p>
    </button>
  );
}
