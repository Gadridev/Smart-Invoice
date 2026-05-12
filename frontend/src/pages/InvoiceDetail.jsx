import { useParams } from "react-router-dom";

export default function InvoiceDetail() {
  const { id } = useParams();
  return (
    <div className="page-shell">
      <h1 className="page-shell__title">Facture {id}</h1>
    </div>
  );
}
