import { createInvoicePayment } from "@/api/invoicesApi";
import { useState } from "react";

function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden>
      <path
        fill="currentColor"
        d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"
      />
    </svg>
  );
}
const EMPTY = { amount: "", paymentDate: "", mode_paiement: "virement", note: "" };
export function InvoiceDetailAddPayment({ balanceLabel, invoiceId, onPaymentAdded }) {
  const [form, setForm] = useState(EMPTY);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  function set(field) {
    return (e) => setForm((f) => ({ ...f, [field]: e.target.value }));
  }
  async function handleSubmit(e) {
    e.preventDefault();
    if ((!form.amount) || Number(form.amount) <= 0) return setError("Veuillez choisir un amount.");
    if (!form.paymentDate) return setError("Veuillez choisir un paymentDate.");
    if (!form.note) return setError("Veuillez choisir un amount.");

    setError("");
    setLoading(true);
    try {
      console.log(form)
      const [day, month, year] = form.paymentDate.split("/");
      const isoDate = `${year}-${month}-${day}`
      console.log(isoDate)
       await createInvoicePayment(invoiceId, {
        amount: Number(form.amount),
        paymentDate: isoDate,
        mode_paiement: form.mode_paiement,
        note: form.note
      })
      onPaymentAdded()
      setForm(EMPTY)
    } catch (err) {
      setError(err.response?.data?.message ?? "Une erreur est survenue.");
    } finally {
      setLoading(false);
    }
  }
  if (error) return `${error}`
  return (
    <section className="inv-dtl-card">
      <div className="inv-dtl-form-card__head">
        <h3 className="inv-dtl-form-card__title">Ajouter un paiement</h3>
        <span className="inv-dtl-solde">{balanceLabel}</span>
      </div>

      <form className="inv-dtl-form" onSubmit={handleSubmit} >
        <div className="inv-dtl-field">
          <label htmlFor="inv-pay-amount">Montant (MAD)</label>
          <input
            id="inv-pay-amount"
            type="text"
            placeholder="Ex: 10000"
            autoComplete="off"
            onChange={set("amount")}
          />
        </div>

        <div className="inv-dtl-field">
          <label htmlFor="inv-pay-method">Méthode de paiement</label>
          <select id="inv-pay-method" value={form.mode_paiement} onChange={set("mode_paiement")}>
            <option value="virement">Virement bancaire</option>
            <option value="chèque">Chèque</option>
            <option value="espèces">Espèces</option>
          </select>
        </div>

        <div className="inv-dtl-field inv-dtl-field--date">
          <label htmlFor="inv-pay-date">Date de paiement</label>
          <div className="inv-dtl-input-wrap">
            <input
              id="inv-pay-date"
              type="text"
              defaultValue="28/04/2025"
              onChange={set("paymentDate")}
            />
            <span className="inv-dtl-field__calendar">
              <CalendarIcon />
            </span>
          </div>
        </div>

        <div className="inv-dtl-field">
          <label htmlFor="inv-pay-ref">Référence (optionnel)</label>
          <input
            id="inv-pay-ref"
            type="text"
            placeholder="Numéro de référence"
            autoComplete="off"

          />
        </div>

        <div className="inv-dtl-field">
          <label htmlFor="inv-pay-note">Note</label>
          <textarea
            id="inv-pay-note"
            placeholder="Informations complémentaires…"
            onChange={set("note")}
          />
        </div>

        <button type="submit" className="inv-dtl-submit">
          Enregistrer le paiement
        </button>
      </form>
    </section>
  );
}
