import "@/styles/invoice-detail.css";
import { InvoiceDetailAddPayment } from "@/components/invoices/InvoiceDetailAddPayment.jsx";
import { InvoiceDetailPayments } from "@/components/invoices/InvoiceDetailPayments.jsx";
import { InvoiceDetailSummary } from "@/components/invoices/InvoiceDetailSummary.jsx";
import { InvoiceDetailSupplier } from "@/components/invoices/InvoiceDetailSupplier.jsx";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getInvoiceById, getInvoicePayments } from "@/api/invoicesApi";
import Loading from "@/components/Loading";






export default function InvoiceDetail() {
  const { id } = useParams();
  console.log(id)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [invoice, setInvoice] = useState({});
  const [payment, setPayment] = useState([]);
  const [supplier, setSupplier] = useState([]);


  async function getAlldata() {
    try {
      const [{ mapInvoice, mapSupplier }, payments] = await Promise.all([
        getInvoiceById(id),
        getInvoicePayments(id),
      ]);
      setInvoice(mapInvoice);
      setSupplier(mapSupplier);
      setPayment(payments);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getAlldata();
  }, []);

  if (error) return `Something wrong ${error}`;
  if (loading) return <Loading message="getting Details Invoice" />;

  return (
    <div className="inv-detail">
      <InvoiceDetailSummary summary={invoice} />
      <div className="inv-detail__grid">
        <div className="inv-detail__col">
          <InvoiceDetailPayments
            title={`Paiements effectués (${payment.length})`}
            items={payment}
          />
          <InvoiceDetailSupplier fields={supplier} />
        </div>
        <div className="inv-detail__col">
          <InvoiceDetailAddPayment
            balanceLabel={`Solde : ${invoice.remaining}`}
            invoiceId={id}
            onPaymentAdded={getAlldata} // ← تنادي getAlldata بعد النجاح
          />
        </div>
      </div>
    </div>
  );
}
