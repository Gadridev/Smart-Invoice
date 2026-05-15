import "@/styles/invoice-detail.css";
import { InvoiceDetailAddPayment } from "@/components/invoices/InvoiceDetailAddPayment.jsx";
import { InvoiceDetailPayments } from "@/components/invoices/InvoiceDetailPayments.jsx";
import { InvoiceDetailSummary } from "@/components/invoices/InvoiceDetailSummary.jsx";
import { InvoiceDetailSupplier } from "@/components/invoices/InvoiceDetailSupplier.jsx";

const DUMMY_SUMMARY = {
  invoiceNumber: "#INV-2025-046",
  title: "Facture Maroc Électronique SARL",
  statusLabel: "Paiement partiel",
  total: "48 500 MAD",
  progressPct: 51.5,
  progressText: "25 000 / 48 500 MAD (51.5%)",
  created: "01 Avril 2025",
  due: "30 Avril 2025",
  remaining: "23 500 MAD",
};

const DUMMY_PAYMENTS = [
  {
    id: "p1",
    method: "Virement bancaire",
    meta: "15 avr 2025 · REF-VT-89231",
    amount: "+15 000 MAD",
  },
  {
    id: "p2",
    method: "Virement bancaire",
    meta: "02 avr 2025 · REF-VT-88102",
    amount: "+10 000 MAD",
  },
];

const DUMMY_SUPPLIER = [
  { label: "Nom", value: "Maroc Électronique SARL" },
  { label: "ICE", value: "002847391000034" },
  { label: "Téléphone", value: "+212 522 448 891" },
  { label: "Email", value: "facturation@marocelectro.ma" },
];

export default function InvoiceDetail() {
  return (
    <div className="inv-detail">
      <InvoiceDetailSummary summary={DUMMY_SUMMARY} />
      <div className="inv-detail__grid">
        <div className="inv-detail__col">
          <InvoiceDetailPayments
            title="Paiements effectués (2)"
            items={DUMMY_PAYMENTS}
          />
          <InvoiceDetailSupplier fields={DUMMY_SUPPLIER} />
        </div>
        <div className="inv-detail__col">
          <InvoiceDetailAddPayment balanceLabel="Solde : 23 500 MAD" />
        </div>
      </div>
    </div>
  );
}
