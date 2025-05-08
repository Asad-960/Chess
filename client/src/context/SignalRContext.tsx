import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";
import { createContext, useContext, useEffect, useState } from "react";


export const SignalRContext = createContext<HubConnection | null>(null);

export const useSignalR = () => useContext(SignalRContext);
type Props = {
    children: React.ReactNode;
};

export const SignalRProvider = ({ children }: Props) => {
    const [connection, setConnection] = useState<HubConnection | null>(null);
    const id = localStorage.getItem("id");
    
    useEffect(() => {
        const conn = new HubConnectionBuilder()
            .withUrl("http://localhost:5001/online")
            .withAutomaticReconnect()
            .build();

            setConnection(conn);
            conn.start()
                .then(() => {
                    console.log("SignalR Connected");
                    const user = {
                        Name: localStorage.getItem("username"),
                        GameId: id,
                      }
                    conn.invoke("JoinGame", user);
                    setConnection(conn);
                })
                .catch(console.error);
            conn.onreconnected(() => {
                console.log("Reconnected by signalR context");
            });
    return () => {
      conn.stop();
    };
  }, [id]);

    return (
        <SignalRContext.Provider value={connection}>
            {children}
        </SignalRContext.Provider>
    );
}