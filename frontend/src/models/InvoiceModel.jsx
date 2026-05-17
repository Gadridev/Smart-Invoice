import { useState, useEffect } from "react";
import api from "@/api/axios.js";
import "@/styles/invoice-model.css";
import { createInvoice } from "@/api/invoicesApi";


const today = () => new Date().toISOString().split("T")[0];

const EMPTY = { supplierId: "", amount: "", dueDate: "", description: "" };

export default function NewInvoiceModal({ open, onClose, onCreated }) {
    const [form, setForm] = useState(EMPTY);
    const [suppliers, setSuppliers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!open) return;
        api.get("/suppliers").then(({ data }) => setSuppliers(data.data.suppliers ?? []));
    }, [open]);

    useEffect(() => {
        if (!open) { setForm(EMPTY); setError(""); }
    }, [open]);

    function set(field) {
        return (e) => setForm((f) => ({ ...f, [field]: e.target.value }));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        if (!form.supplierId) return setError("Veuillez choisir un fournisseur.");
        if (!form.amount || Number(form.amount) <= 0) return setError("Montant invalide.");
        if (!form.dueDate) return setError("Date d'échéance requise.");

        setError("");
        setLoading(true);
        try {
            const data = await createInvoice({
                supplierId: form.supplierId,
                amount: Number(form.amount),
                dueDate: form.dueDate,
                description: form.description,
            })
            //   const { data } = await api.post("/invoices", );
            onCreated?.(data.data);
            onClose();
        } catch (err) {
            setError(err.response?.data?.message ?? "Une erreur est survenue.");
        } finally {
            setLoading(false);
        }
    }
    console.log(suppliers)
    if (!open) return null;

    return (
        <>
            <div className="fim-backdrop" onClick={onClose} />

            <div className="fim-panel" role="dialog" aria-modal="true">

                <div className="fim-header">
                    <div className="fim-header-left">
                        <span className="fim-eyebrow">Nouvelle facture</span>
                        <h2 className="fim-title">Créer une facture</h2>
                    </div>
                    <button className="fim-close" onClick={onClose} aria-label="Fermer">✕</button>
                </div>

                <form className="fim-form" onSubmit={handleSubmit} noValidate>

                    <div className="fim-field">
                        <label className="fim-label">Fournisseur</label>
                        <div className="fim-select-wrap">
                            <select
                                className="fim-select"
                                value={form.supplierId}
                                onChange={set("supplierId")}
                                required
                            >
                                <option value="">— Choisir un fournisseur —</option>
                                {suppliers.map((s) => (
                                    <option key={s._id} value={s._id}>{s.name}</option>
                                ))}
                            </select>
                            <span className="fim-select-arrow">▾</span>
                        </div>
                    </div>

                    <div className="fim-row">
                        <div className="fim-field">
                            <label className="fim-label">Montant (MAD)</label>
                            <div className="fim-input-wrap">
                                <span className="fim-prefix">MAD</span>
                                <input
                                    className="fim-input fim-input-prefixed"
                                    type="number"
                                    min="1"
                                    placeholder="0.00"
                                    value={form.amount}
                                    onChange={set("amount")}
                                    required
                                />
                            </div>
                        </div>

                        <div className="fim-field">
                            <label className="fim-label">Date d'échéance</label>
                            <input
                                className="fim-input"
                                type="date"
                                min={today()}
                                value={form.dueDate}
                                onChange={set("dueDate")}
                                required
                            />
                        </div>
                    </div>

                    <div className="fim-field">
                        <label className="fim-label">Description <span className="fim-optional">(optionnel)</span></label>
                        <textarea
                            className="fim-textarea"
                            rows={3}
                            placeholder="Détails de la facture…"
                            value={form.description}
                            onChange={set("description")}
                        />
                    </div>

                    {error && <p className="fim-error">⚠ {error}</p>}

                    <div className="fim-actions">
                        <button type="button" className="fim-btn-cancel" onClick={onClose}>
                            Annuler
                        </button>
                        <button type="submit" className="fim-btn-submit" disabled={loading}>
                            {loading ? <span className="fim-spinner" /> : null}
                            {loading ? "Création…" : "+ Créer la facture"}
                        </button>
                    </div>

                </form>
            </div>

        </>
    );
}