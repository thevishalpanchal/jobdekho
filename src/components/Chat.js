import "./Chat.css";
import { useState, useEffect, useRef } from "react";

import {
    FaSearch,
    FaPhone,
    FaVideo,
    FaEllipsisV,
    FaPaperPlane,
    FaPaperclip,
    FaCircle
} from "react-icons/fa";

function Chat() {

    const contacts = [
        {
            id: 1,
            name: "John Doe",
            initials: "JD",
            status: "Online"
        },
        {
            id: 2,
            name: "Sarah Smith",
            initials: "SS",
            status: "Online"
        },
        {
            id: 3,
            name: "Mike Johnson",
            initials: "MJ",
            status: "Away"
        },
        {
            id: 4,
            name: "Emma Wilson",
            initials: "EW",
            status: "Offline"
        },
        {
            id: 5,
            name: "David Lee",
            initials: "DL",
            status: "Online"
        }
    ];

    const [selectedContact, setSelectedContact] =
        useState(contacts[0]);

    const [newMessage, setNewMessage] =
        useState("");

    const [typing, setTyping] =
        useState(false);

    const [chatData, setChatData] = useState({

        1: [
            {
                sender: "other",
                text: "Hey! How are you?",
                time: "10:30"
            },
            {
                sender: "me",
                text: "I'm doing great! How about you?",
                time: "10:32"
            }
        ],

        2: [
            {
                sender: "other",
                text: "Your application has been shortlisted.",
                time: "09:15"
            },
            {
                sender: "me",
                text: "Thank you. What is the next step?",
                time: "09:18"
            }
        ],

        3: [
            {
                sender: "other",
                text: "Interview scheduled tomorrow at 11 AM.",
                time: "08:30"
            }
        ],

        4: [
            {
                sender: "other",
                text: "Please update your profile.",
                time: "07:45"
            }
        ],

        5: [
            {
                sender: "other",
                text: "Thanks for applying to our company.",
                time: "11:20"
            }
        ]

    });

    const messages =
        chatData[selectedContact.id] || [];

    const messagesEndRef = useRef(null);

    useEffect(() => {

        messagesEndRef.current?.scrollIntoView({
            behavior: "auto"
        });

    }, [selectedContact]);

    useEffect(() => {

  messagesEndRef.current?.scrollIntoView({
    behavior: "smooth"
  });

}, [messages]);

    const getCurrentTime = () => {

        return new Date().toLocaleTimeString(
            [],
            {
                hour: "2-digit",
                minute: "2-digit"
            }
        );

    };

    const sendMessage = () => {

        if (!newMessage.trim()) return;

        const myMessage = {

            sender: "me",
            text: newMessage,
            time: getCurrentTime()

        };

        setChatData(prev => ({

            ...prev,

            [selectedContact.id]: [
                ...(prev[selectedContact.id] || []),
                myMessage
            ]

        }));

        setNewMessage("");

        setTyping(true);

        setTimeout(() => {

            setTyping(false);

            const autoReplies = {

                1: "Can you share your latest resume?",

                2: "Your profile looks promising for this role.",

                3: "Please join the interview 10 minutes early.",

                4: "Update your skills section for better visibility.",

                5: "Our HR team will contact you shortly."

            };

            const reply = {

                sender: "other",

                text:
                    autoReplies[selectedContact.id],

                time: getCurrentTime()

            };

            setChatData(prev => ({

                ...prev,

                [selectedContact.id]: [
                    ...(prev[selectedContact.id] || []),
                    reply
                ]

            }));

        }, 1500);

    };

    const handleKeyPress = (e) => {

        if (e.key === "Enter") {
            sendMessage();
        }

    };

    return (

        <div className="chat-page">

            {/* LEFT */}

            <div className="chat-sidebar">

                <h2>
                    Messages
                </h2>

                <div className="chat-search">

                    <FaSearch />

                    <input
                        type="text"
                        placeholder="Search contacts..."
                    />

                </div>

                {contacts.map(contact => (

                    <div
                        key={contact.id}
                        className={`contact-item ${selectedContact.id === contact.id
                            ? "active-contact"
                            : ""
                            }`}
                        onClick={() =>
                            setSelectedContact(contact)
                        }
                    >

                        <div className="avatar">

                            {contact.initials}

                        </div>

                        <div>

                            <h4>
                                {contact.name}
                            </h4>

                            <p>

                                <FaCircle
                                    className={`status-dot ${contact.status.toLowerCase()
                                        }`}
                                />

                                {contact.status}

                            </p>

                        </div>

                    </div>

                ))}

            </div>

            {/* RIGHT */}

            <div className="chat-main">

                <div className="chat-header">

                    <div className="chat-user">

                        <div className="avatar">

                            {selectedContact.initials}

                        </div>

                        <div>

                            <h3>
                                {selectedContact.name}
                            </h3>

                            <p>
                                {selectedContact.status}
                            </p>

                        </div>

                    </div>

                    <div className="chat-actions">

                        <FaPhone />

                        <FaVideo />

                        <FaEllipsisV />

                    </div>

                </div>

                <div className="messages-area">

                    {messages.map((msg, index) => (

                        <div
                            key={index}
                            className={`message ${msg.sender === "me"
                                ? "my-message"
                                : "their-message"
                                }`}
                        >

                            <div>

                                {msg.text}

                            </div>

                            <small>

                                {msg.time}

                            </small>

                        </div>

                    ))}

                    {typing && (

                        <div className="typing">

                            Typing...

                        </div>

                    )}

                    <div ref={messagesEndRef} />

                </div>

                <div className="chat-input">

                    <FaPaperclip
                        className="input-icon"
                    />

                    <input
                        type="text"
                        placeholder="Type a message..."
                        value={newMessage}
                        onChange={(e) =>
                            setNewMessage(
                                e.target.value
                            )
                        }
                        onKeyDown={handleKeyPress}
                    />

                    <button
                        onClick={sendMessage}
                    >

                        <FaPaperPlane />

                    </button>

                </div>

            </div>

        </div>

    );

}

export default Chat;