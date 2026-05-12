import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="page-shell page-shell--center">
      <h1 className="page-shell__title">Page introuvable</h1>
      <p className="muted">La page demandée n&apos;existe pas.</p>
      <Link to="/dashboard">Retour au tableau de bord</Link>
    </div>
  );
}
