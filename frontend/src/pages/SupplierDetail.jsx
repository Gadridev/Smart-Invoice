const SupplierModal = ({ supplier, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-[#111827] border border-[#293145] rounded-3xl w-full max-w-2xl p-8 relative animate-fadeIn">
        
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-gray-400 hover:text-white text-2xl"
        >
          ×
        </button>

        <div className="flex items-center gap-5 mb-8">
          <div className="w-20 h-20 rounded-2xl bg-cyan-500/20 flex items-center justify-center text-cyan-400 text-3xl font-bold">
            {supplier.name?.charAt(0)}
          </div>

          <div>
            <h2 className="text-3xl font-semibold">
              {supplier.name}
            </h2>

            <p className="text-gray-400 mt-2">
              Informations du fournisseur
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-[#182133] rounded-2xl p-5">
            <p className="text-gray-500 text-sm mb-2">
              Email
            </p>

            <p className="text-white">
              {supplier.email || "Non défini"}
            </p>
          </div>

          <div className="bg-[#182133] rounded-2xl p-5">
            <p className="text-gray-500 text-sm mb-2">
              Téléphone
            </p>

            <p className="text-white">
              {supplier.phone || "Non défini"}
            </p>
          </div>

          <div className="bg-[#182133] rounded-2xl p-5 md:col-span-2">
            <p className="text-gray-500 text-sm mb-2">
              Adresse
            </p>

            <p className="text-white">
              {supplier.address || "Aucune adresse"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupplierModal;import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSupplierById } from "@/api/suppliersApi";

const SupplierDetail = () => {
  const { id } = useParams();

  const [supplier, setSupplier] = useState(null);

  useEffect(() => {
    fetchSupplier();
  }, []);

  const fetchSupplier = async () => {
    try {
      const res = await getSupplierById(id);
      setSupplier(res.data.supplier);
    } catch (err) {
      console.log(err);
    }
  };

  if (!supplier) {
    return (
      <div className="text-white p-10">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#070B1A] text-white p-8">
      <div className="bg-[#151D33] border border-[#222B45] rounded-3xl p-10">

        <div className="flex items-center gap-6 mb-10">
          <div className="w-24 h-24 rounded-2xl bg-cyan-500/20 flex items-center justify-center text-cyan-400 text-4xl font-bold">
            {supplier.name?.charAt(0)}
          </div>

          <div>
            <p className="uppercase tracking-[4px] text-xs text-gray-500 mb-2">
              Fournisseur
            </p>

            <h1 className="text-4xl font-bold">
              {supplier.name}
            </h1>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">

          <div className="bg-[#1C2740] rounded-2xl p-6">
            <p className="text-gray-400 text-sm mb-2">
              Email
            </p>

            <p className="text-lg">
              {supplier.email || "Non défini"}
            </p>
          </div>

          <div className="bg-[#1C2740] rounded-2xl p-6">
            <p className="text-gray-400 text-sm mb-2">
              Téléphone
            </p>

            <p className="text-lg">
              {supplier.phone || "Non défini"}
            </p>
          </div>

          <div className="bg-[#1C2740] rounded-2xl p-6 md:col-span-2">
            <p className="text-gray-400 text-sm mb-2">
              Adresse
            </p>

            <p className="text-lg">
              {supplier.address || "Aucune adresse"}
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default SupplierDetail;