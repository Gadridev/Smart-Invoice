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

export default SupplierModal;