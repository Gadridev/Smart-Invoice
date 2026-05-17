import "@/styles/invoices.css";
import { InvoiceFilters } from "@/components/invoices/InvoiceFilters.jsx";
import { InvoicePagination } from "@/components/invoices/InvoicePagination.jsx";
import { InvoiceTable } from "@/components/invoices/InvoiceTable.jsx";
import { getInvoices } from "@/api/invoicesApi";
import Loading from "@/components/Loading";
import { useEffect, useState } from "react";
import NewInvoiceModal from "@/models/InvoiceModel";
import { formatInvoice } from "@/utils/formatInvoice";



export default function Invoices() {
  const [invoices, setInvoices]         = useState([]);
  const [loading, setLoading]           = useState(true);
  const [error, setError]               = useState(null);
  const [totalPages, setTotalPages]     = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [showModal, setShowModal]       = useState(false);
  const [query, setQuery]               = useState({ page: 1, status: "" });

  useEffect(() => {
    async function getAllInvoices() {
      setLoading(true);
      try {
        const { mapInvoice, totalPages, total } = await getInvoices(query.page, query.status);
        setInvoices(mapInvoice);
        setTotalPages(totalPages);
        setTotalResults(total);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    getAllInvoices();
  }, [query]);

  if (loading) return <Loading message="Chargement des factures…" />;
  if (error)   return <p>Erreur lors du chargement des factures</p>;

  return (
    <div className="inv-page">
      <section className="inv-card">
        <InvoiceFilters
          activeStatus={query.status}
          onStatusChange={(status) => setQuery({ page:1, status })} 
          setShowModal={setShowModal}
        />
        <InvoiceTable rows={invoices} />
        <InvoicePagination
          resultsLabel={`${invoices.length} résultats sur ${totalResults}`}
          totalPages={totalPages}
          currentPage={query.page}
          setCurrentPage={(page) => setQuery((q) => ({ ...q, page }))} 
        />
        <NewInvoiceModal
          open={showModal}
          onClose={() => setShowModal(false)}
          onCreated={(newInvoice) => setInvoices((prev) => [formatInvoice(newInvoice), ...prev])}
        />
      </section>
    </div>
  );
}
