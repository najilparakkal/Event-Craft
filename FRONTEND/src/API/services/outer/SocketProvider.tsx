import { useEffect, useState, createContext, useContext } from 'react';
import { io } from 'socket.io-client';

const socketContext = createContext<any>(undefined);

function SocketProvider({ children }: any) {

    const [socket, setSocket] = useState<any>(null)



    useEffect(() => {

        if (!socket) {
            const newSocket = io('http://localhost:3000')
            setSocket(newSocket);

        }

        return () => {
            if (socket) {
                socket.disconnect();
            }
        }
    }, [socket])

    
    return (
        <socketContext.Provider value={{ socket }}>
            {children}
        </socketContext.Provider>
    )
}

export default SocketProvider

export const useSocket = () => {
   const context = useContext(socketContext);
   if (context === undefined) { throw new Error('useAuth must be used within an AuthProvider');}
   return context;
};