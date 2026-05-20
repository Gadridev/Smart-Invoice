import { createContext, useContext, useEffect, useState } from "react";
import api from "@/api/axios";

const ClientContext = createContext(null);

export function ClientProvider({ children }) {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchClients() {
      try {
        const { data } = await api.get("/admin/clients");
        setClients(data.data);
        console.log(data);
      } catch (error) {
        console.error("Failed to fetch clients:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchClients();
  }, []);

  return (
    <ClientContext.Provider value={{ clients, loading }}>
      {children}
    </ClientContext.Provider>
  );
}
