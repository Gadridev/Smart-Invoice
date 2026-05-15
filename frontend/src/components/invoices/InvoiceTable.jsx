import { InvoiceRow } from "./InvoiceRow.jsx";

export function InvoiceTable({ rows }) {
  return (
    <div className="inv-table-wrap">
      <table className="inv-table">
        <thead>
          <tr>
            <th>N° facture</th>
            <th>Fournisseur</th>
            <th>Montant</th>
            <th>Payé</th>
            <th>Échéance</th>
            <th>Statut</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <InvoiceRow key={row.id} row={row} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
