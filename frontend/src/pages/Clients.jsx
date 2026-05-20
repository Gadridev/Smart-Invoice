import { ClientProvider } from "@/context/ClientContext";
import ClientList from "@/components/ClientList";

export default function Clients() {
    return (
            <div>
                <>
                    <ClientProvider >  
                            <ClientList />
                    </ClientProvider> 
                </> 
        </div>
    );
}     
