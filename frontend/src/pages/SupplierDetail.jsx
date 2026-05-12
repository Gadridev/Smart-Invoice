import { useParams } from "react-router-dom";

export default function SupplierDetail() {
  const { id } = useParams();
  return (
    <div className="page-shell">
      <h1 className="page-shell__title">Fournisseur {id}</h1>
    </div>
  );
}
