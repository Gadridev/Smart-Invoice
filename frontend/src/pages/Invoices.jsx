import "@/styles/invoices.css";
import { InvoiceFilters } from "@/components/invoices/InvoiceFilters.jsx";
import { InvoicePagination } from "@/components/invoices/InvoicePagination.jsx";
import { InvoiceTable } from "@/components/invoices/InvoiceTable.jsx";

const DUMMY_ROWS = [
  {
    id: "1",
    number: "#INV-2025-047",
    supplier: "Atlas Fournitures Pro",
    amount: "32 000 MAD",
    paid: "0 MAD",
    paidTone: "zero",
    dueDate: "12 Mar 2025",
    dueLate: true,
    status: "late",
  },
  {
    id: "2",
    number: "#INV-2025-046",
    supplier: "TechMaroc SARL",
    amount: "18 500 MAD",
    paid: "9 250 MAD",
    paidTone: "partial",
    dueDate: "22 Avr 2025",
    dueLate: false,
    status: "partial",
  },
  {
    id: "3",
    number: "#INV-2025-045",
    supplier: "Bureau Plus",
    amount: "4 200 MAD",
    paid: "4 200 MAD",
    paidTone: "full",
    dueDate: "05 Avr 2025",
    dueLate: false,
    status: "paid",
  },
  {
    id: "4",
    number: "#INV-2025-044",
    supplier: "Logistique Nord",
    amount: "56 000 MAD",
    paid: "0 MAD",
    paidTone: "zero",
    dueDate: "28 Fév 2025",
    dueLate: true,
    status: "late",
  },
  {
    id: "5",
    number: "#INV-2025-043",
    supplier: "Casa Office",
    amount: "12 800 MAD",
    paid: "12 800 MAD",
    paidTone: "full",
    dueDate: "15 Avr 2025",
    dueLate: false,
    status: "paid",
  },
  {
    id: "6",
    number: "#INV-2025-042",
    supplier: "Atlas Fournitures Pro",
    amount: "8 900 MAD",
    paid: "4 000 MAD",
    paidTone: "partial",
    dueDate: "30 Avr 2025",
    dueLate: false,
    status: "partial",
  },
  {
    id: "7",
    number: "#INV-2025-041",
    supplier: "PrintShop Rabat",
    amount: "2 100 MAD",
    paid: "2 100 MAD",
    paidTone: "full",
    dueDate: "01 Mar 2025",
    dueLate: false,
    status: "paid",
  },
];

export default function Invoices() {
  return (
    <div className="inv-page">
      <section className="inv-card">
        <InvoiceFilters />
        <InvoiceTable rows={DUMMY_ROWS} />
        <InvoicePagination resultsLabel="7 résultats sur 47" />
      </section>
    </div>
  );
}
