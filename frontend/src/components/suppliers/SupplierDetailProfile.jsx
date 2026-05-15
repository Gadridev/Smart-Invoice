export function SupplierDetailProfile({ profile }) {
  return (
    <section className="sup-dtl-profile">
      <div className="sup-dtl-profile__main">
        <div className="sup-dtl-avatar">{profile.initials}</div>
        <div className="sup-dtl-profile__body">
          <h2 className="sup-dtl-name">{profile.name}</h2>
          <p className="sup-dtl-ids">{profile.identifiers}</p>
          <div className="sup-dtl-tags">
            {profile.tags.map((tag) => (
              <span key={tag} className="sup-dtl-tag">
                {tag}
              </span>
            ))}
            <span className="sup-dtl-tag sup-dtl-tag--active">
              <span className="sup-dtl-tag__dot" aria-hidden />
              Fournisseur actif
            </span>
          </div>
        </div>
      </div>
      <div className="sup-dtl-profile__stats">
        <div>
          <p className="sup-dtl-stat-block__label">Total facturé</p>
          <p className="sup-dtl-stat-block__value sup-dtl-stat-block__value--gold">
            {profile.totalBilled}
          </p>
        </div>
        <div>
          <p className="sup-dtl-stat-block__label">Factures</p>
          <p className="sup-dtl-stat-block__value">{profile.invoiceCount}</p>
        </div>
      </div>
    </section>
  );
}
