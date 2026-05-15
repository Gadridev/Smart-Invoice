
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSupplierById } from "@/api/suppliersApi";

const SupplierDetail = () => {
  const { id } = useParams();
  const [supplier, setSupplier] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSupplier();
  }, [id]);

  const fetchSupplier = async () => {
    try {
      const res = await getSupplierById(id);
      setSupplier(res.data.supplier);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#070B1A] text-white flex items-center justify-center">
        <div className="animate-pulse text-gray-400">Chargement...</div>
      </div>
    );
  }

  if (!supplier) {
    return (
      <div className="min-h-screen bg-[#070B1A] text-white flex items-center justify-center">
        <div className="text-gray-400">Fournisseur non trouvé</div>
      </div>
    );
  }

  // Données fictives pour compléter l'affichage (à remplacer par les vraies données API)
  const stats = {
    paymentRate: 78,
    recoveryAmount: 63,
    avgPaymentDays: 27,
    lateInvoices: 1,
  };

  const recentInvoices = [
    { id: "INV-2025-046", date: "01 Avr 2025", status: "En attente", dueDate: "30 avr", amount: 48500, paid: false },
    { id: "INV-2025-041", date: "15 Mai 2025", status: "Réglée", paidDate: "20 avr", amount: 12400, paid: true },
    { id: "INV-2025-033", date: "02 Fév 2025", status: "Réglée", paidDate: "25 fév", amount: 21600, paid: true },
    { id: "INV-2025-027", date: "18 Jan 2025", status: "Réglée", amount: 15900, paid: true },
  ];

  return (
    <div className="min-h-screen bg-[#070B1A] text-white p-8">
      {/* En-tête avec identité fournisseur */}
      <div className="bg-[#151D33] border border-[#222B45] rounded-3xl p-8 mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 rounded-2xl bg-cyan-500/20 flex items-center justify-center text-cyan-400 text-3xl font-bold">
              {supplier.name?.charAt(0).toUpperCase()}
            </div>
            <div>
              <div className="flex flex-wrap gap-2 mb-2">
                <span className="bg-cyan-500/20 text-cyan-400 text-xs px-3 py-1 rounded-full">
                  Fournisseur actif
                </span>
                <span className="bg-[#1F2B4A] text-gray-300 text-xs px-3 py-1 rounded-full">
                  {supplier.category || "Électronique"}
                </span>
              </div>
              <h1 className="text-3xl font-bold">{supplier.name}</h1>
              <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-400">
                <span>ICE: {supplier.ice || "002847391000034"}</span>
                <span>RC: {supplier.rc || "145892"}</span>
                <span>IF: {supplier.if || "30128774"}</span>
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <button className="bg-[#1B2237] hover:bg-[#232C46] transition px-5 py-2.5 rounded-xl border border-[#2A3453] text-sm">
              Modifier
            </button>
            <button className="bg-cyan-500 hover:bg-cyan-600 transition px-5 py-2.5 rounded-xl text-sm font-medium">
              Nouvelle facture
            </button>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Colonne gauche - Informations de contact */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-[#151D33] border border-[#222B45] rounded-2xl p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <span className="w-1 h-6 bg-cyan-500 rounded-full"></span>
              Informations de contact
            </h3>
            <div className="space-y-4">
              <div>
                <p className="text-gray-500 text-xs uppercase tracking-wide">Adresse</p>
                <p className="text-white mt-1">{supplier.address || "Bd Zerktouni, Casablanca 20000"}</p>
              </div>
              <div>
                <p className="text-gray-500 text-xs uppercase tracking-wide">Téléphone</p>
                <p className="text-white mt-1">{supplier.phone || "+212 522 448 881"}</p>
              </div>
              <div>
                <p className="text-gray-500 text-xs uppercase tracking-wide">Email</p>
                <p className="text-white mt-1">{supplier.email || "facturation@marocelectro.com"}</p>
              </div>
              <div>
                <p className="text-gray-500 text-xs uppercase tracking-wide">Contact principal</p>
                <p className="text-white mt-1">{supplier.mainContact || "Rachid Ouali"}</p>
              </div>
              <div>
                <p className="text-gray-500 text-xs uppercase tracking-wide">Délai de paiement</p>
                <p className="text-white mt-1">{supplier.paymentTerms || "30 jours"}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Colonne droite - Statistiques et factures */}
        <div className="lg:col-span-2 space-y-6">
          {/* Statistiques */}
          <div className="bg-[#151D33] border border-[#222B45] rounded-2xl p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <span className="w-1 h-6 bg-cyan-500 rounded-full"></span>
              Statistiques de paiement
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-[#1C2740] rounded-xl p-4 text-center">
                <p className="text-2xl font-bold text-cyan-400">{stats.paymentRate}%</p>
                <p className="text-xs text-gray-400 mt-1">Paiement à temps</p>
              </div>
              <div className="bg-[#1C2740] rounded-xl p-4 text-center">
                <p className="text-2xl font-bold text-green-400">{stats.recoveryAmount}%</p>
                <p className="text-xs text-gray-400 mt-1">Montant recouvré</p>
              </div>
              <div className="bg-[#1C2740] rounded-xl p-4 text-center">
                <p className="text-2xl font-bold text-yellow-400">{stats.avgPaymentDays} j</p>
                <p className="text-xs text-gray-400 mt-1">Délai moyen paiement</p>
              </div>
              <div className="bg-[#1C2740] rounded-xl p-4 text-center">
                <p className="text-2xl font-bold text-red-400">{stats.lateInvoices}</p>
                <p className="text-xs text-gray-400 mt-1">Factures en retard</p>
              </div>
            </div>
          </div>

          {/* Dernières factures */}
          <div className="bg-[#151D33] border border-[#222B45] rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <span className="w-1 h-6 bg-cyan-500 rounded-full"></span>
                Dernières factures
              </h3>
              <button className="text-cyan-400 text-sm hover:underline">
                Toutes les factures →
              </button>
            </div>
            <div className="space-y-3">
              {recentInvoices.map((invoice) => (
                <div
                  key={invoice.id}
                  className="flex items-center justify-between p-4 bg-[#1C2740] rounded-xl hover:bg-[#22304A] transition cursor-pointer"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <p className="font-medium text-white">#{invoice.id}</p>
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full ${
                          invoice.paid
                            ? "bg-green-500/20 text-green-400"
                            : "bg-yellow-500/20 text-yellow-400"
                        }`}
                      >
                        {invoice.status || (invoice.paid ? "Réglée" : "En attente")}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">
                      {invoice.date} • {invoice.paid ? `Réglée le ${invoice.paidDate}` : `Échéance ${invoice.dueDate}`}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-white">{invoice.amount.toLocaleString()} MAD</p>
                    <button className="text-cyan-400 text-xs hover:underline mt-1">Détails →</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupplierDetail;