import { useNavigate } from "react-router-dom";

const SupplierCard = ({ supplier }) => {
  const navigate = useNavigate();

  const initials = supplier.name
    ?.split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2);

  return (
    <div
      onClick={() => navigate(`/suppliers/${supplier._id}`)}
      className="bg-[#151D33] border border-[#222B45] rounded-2xl p-6 cursor-pointer hover:border-cyan-500 transition duration-300"
    >
      <div className="w-14 h-14 rounded-xl bg-[#1F2B4A] flex items-center justify-center text-cyan-400 font-bold text-xl mb-6">
        {initials}
      </div>

      <h2 className="text-xl font-semibold mb-2">
        {supplier.name}
      </h2>

      <p className="text-gray-400 text-sm mb-6">
        {supplier.email || "Aucun email"}
      </p>

      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-gray-500 uppercase">
            Téléphone
          </p>

          <p className="text-sm mt-1">
            {supplier.phone || "Non défini"}
          </p>
        </div>

        <span className="bg-cyan-500/20 text-cyan-400 text-xs px-3 py-1 rounded-full">
          Actif
        </span>
      </div>
    </div>
  );
};

export default SupplierCard;