import { useNavigate } from "react-router-dom";

const AVATAR_VARIANTS = ["teal", "gold", "rose", "violet", "green"];

function getInitials(name) {
  if (!name?.trim()) return "?";
  return name
    .trim()
    .split(/\s+/)
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function formatCategory(supplier) {
  const raw = supplier.category || supplier.contact || "Fournisseur";
  return String(raw).toUpperCase();
}

function formatTotal(supplier) {
  if (supplier.totalSpent != null && supplier.totalSpent !== "") {
    return supplier.totalSpent;
  }
  return "0 MAD";
}

export default function SupplierCard({ supplier, colorIndex = 0 }) {
  const navigate = useNavigate();
  const variant = AVATAR_VARIANTS[colorIndex % AVATAR_VARIANTS.length];
  const isDispute = supplier.status === "litige" || supplier.status === "dispute";

  return (
    <button
      type="button"
      className="sup-card"
      onClick={() => navigate(`/suppliers/${supplier._id}`)}
    >
      <div className="sup-card__head">
        <div className={`sup-card__avatar sup-card__avatar--${variant}`}>
          {getInitials(supplier.name)}
        </div>
        <div className="sup-card__meta">
          <h2 className="sup-card__name">{supplier.name}</h2>
          <p className="sup-card__category">{formatCategory(supplier)}</p>
        </div>
      </div>
      <div className="sup-card__stats">
        <div>
          <p className="sup-card__stat-label">Factures</p>
          <p className="sup-card__stat-value">
            {supplier.invoiceCount ?? supplier.invoicesCount ?? 0}
          </p>
        </div>
        <div>
          <p className="sup-card__stat-label">Total dépensé</p>
          <p className="sup-card__stat-value sup-card__stat-value--gold">
            {formatTotal(supplier)}
          </p>
        </div>
        <div>
          <p className="sup-card__stat-label">Statut</p>
          <span
            className={
              isDispute
                ? "sup-card__badge sup-card__badge--dispute"
                : "sup-card__badge sup-card__badge--active"
            }
          >
            <span className="sup-card__badge-dot" aria-hidden />
            {isDispute ? "Litige" : "Actif"}
          </span>
        </div>
      </div>
    </button>
  );
}
