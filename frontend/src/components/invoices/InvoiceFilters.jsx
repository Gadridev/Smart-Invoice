export function InvoiceFilters({ activeStatus, onStatusChange, setShowModal }) {
  const tabs = [
    { label: "Toutes",    value: "" },
    { label: "Payées",    value: "paid" },
    { label: "Partielles",value: "partially_paid" },
    { label: "Impayées",  value: "unpaid" },
  ];

  return (
    <div className="inv-toolbar">
      <button type="button" className="dash-topbar__cta" onClick={() => setShowModal(true)}>
        + Nouvelle facture
      </button>

      <div className="inv-tabs" role="tablist">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            type="button"
            className={`inv-tab ${activeStatus === tab.value ? "inv-tab--active" : ""}`}
            onClick={() => onStatusChange(tab.value)}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}