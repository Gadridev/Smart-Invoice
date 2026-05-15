import { useEffect, useState } from "react";
import { getSuppliers } from "@/api/suppliersApi";
import SupplierCard from "@/components/suppliers/SupplierCard";
import SupplierModal from "./SupplierDetail";

const Suppliers = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const fetchSuppliers = async () => {
    try {
      const res = await getSuppliers();
      setSuppliers(res.data.suppliers);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-white p-10">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#070B1A] text-white p-8">
      <div className="flex items-center justify-between mb-10">
        <div>
          <p className="uppercase tracking-[4px] text-xs text-gray-500">
            Gestion / Fournisseurs
          </p>

          <h1 className="text-3xl font-semibold mt-2">
            Fournisseurs
          </h1>
        </div>

        <button className="bg-[#1B2237] hover:bg-[#232C46] transition px-5 py-3 rounded-xl border border-[#2A3453]">
          + Nouveau fournisseur
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {suppliers.map((supplier) => (
          <SupplierCard
            key={supplier._id}
            supplier={supplier}
            onClick={() => setSelectedSupplier(supplier)}
          />
        ))}
      </div>

      {selectedSupplier && (
        <SupplierModal
          supplier={selectedSupplier}
          onClose={() => setSelectedSupplier(null)}
        />
      )}
    </div>
  );
};

export default Suppliers;