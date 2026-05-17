import { createSupplier } from "@/api/suppliersApi";
import { useState, useEffect } from "react";
import "../styles/modalSupplier.css"
const EMPTY = { name: "", email: "", phone: "", address: "" };

export default function NewSupplierModal({ open, onClose, onCreated }) {
  const [form, setForm] = useState(EMPTY);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!open) { setForm(EMPTY); setError(""); }
  }, [open]);

  function set(field) {
    return (e) => setForm((f) => ({ ...f, [field]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.name)  return setError("Le nom du fournisseur est requis.");
    if (!form.email) return setError("L'email est requis.");
    if (!form.phone) return setError("Le téléphone est requis.");

    setError("");
    setLoading(true);
    try {
      const data = await createSupplier({
        name:    form.name,
        email:   form.email,
        phone:   form.phone,
        address: form.address,
      });
      onCreated?.(data.data);
      onClose();
    } catch (err) {
      setError(err.response?.data?.message ?? "Une erreur est survenue.");
    } finally {
      setLoading(false);
    }
  }

  if (!open) return null;

  return (
    <>
      <div className="fsm-backdrop" onClick={onClose} />

      <div className="fsm-panel" role="dialog" aria-modal="true">

        <div className="fsm-header">
          <div>
            <span className="fsm-eyebrow">Nouveau fournisseur</span>
            <h2 className="fsm-title">Ajouter un fournisseur</h2>
          </div>
          <button className="fsm-close" onClick={onClose} aria-label="Fermer">✕</button>
        </div>

        <form className="fsm-form" onSubmit={handleSubmit} noValidate>

          <div className="fsm-field">
            <label className="fsm-label">Nom du fournisseur</label>
            <input
              className="fsm-input"
              type="text"
              placeholder="Ex: Atlas Fournitures Pro"
              value={form.name}
              onChange={set("name")}
              required
            />
          </div>

          <div className="fsm-row">
            <div className="fsm-field">
              <label className="fsm-label">Email</label>
              <input
                className="fsm-input"
                type="email"
                placeholder="contact@fournisseur.ma"
                value={form.email}
                onChange={set("email")}
                required
              />
            </div>

            <div className="fsm-field">
              <label className="fsm-label">Téléphone</label>
              <input
                className="fsm-input"
                type="tel"
                placeholder="06 00 00 00 00"
                value={form.phone}
                onChange={set("phone")}
                required
              />
            </div>
          </div>

          {/* address */}
          <div className="fsm-field">
            <label className="fsm-label">
              Adresse <span className="fsm-optional">(optionnel)</span>
            </label>
            <input
              className="fsm-input"
              type="text"
              placeholder="Ex: 12 Rue Hassan II, Casablanca"
              value={form.address}
              onChange={set("address")}
            />
          </div>

          {error && <p className="fsm-error">⚠ {error}</p>}

          <div className="fsm-actions">
            <button type="button" className="fsm-btn-cancel" onClick={onClose}>
              Annuler
            </button>
            <button type="submit" className="fsm-btn-submit" disabled={loading}>
              {loading ? <span className="fsm-spinner" /> : null}
              {loading ? "Création…" : "+ Ajouter le fournisseur"}
            </button>
          </div>

        </form>
      </div>

    </>
  );
}