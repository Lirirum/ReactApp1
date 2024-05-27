import  { useEffect, useState } from 'react';
import { HubConnectionBuilder, HttpTransportType, LogLevel } from '@microsoft/signalr';

const SignalRComponent = () => {
    const [messages, setMessages] = useState([]);
    const [isConnected, setIsConnected] = useState(false);
    const [connection, setConnection] = useState(null);


    useEffect(() => {
        const connection = new HubConnectionBuilder()
            .withUrl("http://localhost:5172/notificationHub", {
                skipNegotiation: true,
                transport: HttpTransportType.WebSockets,
            }).configureLogging(LogLevel.Information)
            .build();
               
        setConnection(connection);
       
    }, []);


    useEffect(() => {
        if (connection) {
            connection.start()
                .then(() => {
                    setIsConnected(true);
                    console.log("Connected!");

                    connection.on("ReceiveMessage", (user, message) => {
                        setMessages(prevMessages => [...prevMessages, { user, message }]);
                    });
                })
                .catch(err => console.error("Connection failed: ", err));
        }
        return () => {
            if (connection) {
                connection.stop();
            }
        };

    }, [connection]);

    return (
        <div>
            <h1>SignalR Messages</h1>
            <ul>
                {messages.map((msg, index) => (
                    <li key={index}>
                        <strong>{msg.user}:</strong> {msg.message}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SignalRComponent;
