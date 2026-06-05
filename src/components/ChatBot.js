import "./ChatBot.css";

import {
    useState
} from "react";

function ChatBot() {

    const [message, setMessage]
        = useState("");

    const [chat, setChat]
        = useState([

            {
                sender: "bot",

                text:
                    "Hello 👋 I am Ardhnarishwar AI. How can I help you?"
            }

        ]);



    const sendMessage = () => {

        if (message.trim() === "")
            return;

        

        const userMessage = {

            sender: "user",

            text: message

        };

        

        let botReply = "";

        const lower =
            message.toLowerCase();

        if (

            lower.includes("apply")
            ||

            lower.includes("application")

        ) {

            botReply =
                "Go to the Jobs section and click Apply Now to submit your application.";

        }

        else if (

            lower.includes("resume")
            ||

            lower.includes("cv")

        ) {

            botReply =
                "You can create a professional resume using the CV Maker feature.";

        }

        else if (

            lower.includes("job")
            ||

            lower.includes("vacancy")

        ) {

            botReply =
                "Use the search bar in Jobs section to find opportunities based on skills and location.";

        }

        else if (

            lower.includes("profile")

        ) {

            botReply =
                "Go to My Profile section to update your skills, education, and resume.";

        }

        else if (

            lower.includes("hello")
            ||

            lower.includes("hi")
            ||

            lower.includes("hey")

        ) {

            botReply =
                "Hello 👋 How can I help you today?";

        }

        else if (

            lower.includes("skills")

        ) {

            botReply =
                "Add technical skills like Java, Spring Boot, React, MySQL, and APIs to improve your profile.";

        }

        else if (

            lower.includes("interview")

        ) {

            botReply =
                "Practice Java, Spring Boot, SQL, and DSA basics for interviews.";

        }

        else if (

            lower.includes("salary")

        ) {

            botReply =
                "Salary depends on skills, experience, and company requirements.";

        }

        else if (

            lower.includes("fresher")

        ) {

            botReply =
                "Freshers should focus on projects, resume quality, and strong fundamentals.";

        }

        else if (

            lower.includes("backend")

        ) {

            botReply =
                "Backend development involves APIs, databases, authentication, and server-side logic.";

        }

        else if (

            lower.includes("frontend")

        ) {

            botReply =
                "Frontend development focuses on UI using React, JavaScript, HTML, and CSS.";

        }

        else {

            botReply =
                "I can help with jobs, resumes, interviews, skills, backend, frontend, and career guidance.";

        }

        const botMessage = {

            sender: "bot",

            text: botReply

        };

        setChat([
            ...chat,
            userMessage,
            botMessage
        ]);

        setMessage("");

    };

    const startListening = () => {

    const SpeechRecognition =

    window.SpeechRecognition

    ||

    window.webkitSpeechRecognition;

    if(!SpeechRecognition){

        alert(
            "Speech Recognition not supported"
        );

        return;

    }

    const recognition =
    new SpeechRecognition();

    recognition.lang = "en-US";

    recognition.start();

    recognition.onresult = (event) => {

        const transcript =

        event.results[0][0]
        .transcript;

        setMessage(transcript);

    };

};

    return (

        <div className="chatbot-container">

            <h1>
                Ardhnarishwar AI Assistant
            </h1>

            {}

            <div className="chat-area">

                {
                    chat.map((msg, index) => (

                        <div
                            key={index}
                            className={
                                msg.sender === "user"

                                    ?

                                    "user-message"

                                    :

                                    "bot-message"
                            }
                        >

                            {msg.text}

                        </div>

                    ))
                }

            </div>

            {/* INPUT */}

            <div className="chat-input-area">

                <input
                    type="text"
                    placeholder="Ask something..."
                    value={message}
                    onChange={(e) =>
                        setMessage(e.target.value)}

                    onKeyDown={(e) => {

                        if (e.key === "Enter") {

                            sendMessage();

                        }

                    }}
                />

                <button
                    onClick={startListening}
                >
                    🔴
                </button>

                <button
                    onClick={sendMessage}
                >
                    Send
                </button>

            </div>

        </div>

    );
}

export default ChatBot;