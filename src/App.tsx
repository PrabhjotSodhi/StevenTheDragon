import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

interface CardProps {
  title: string;
  description: string;
}
type Message = {
  role: "user" | "assistant";
  content: string;
};

type Session = {
  title: string;
  conversation: Message[];
};

function Card({ title, description }: CardProps) {
  return (
    <button className="btn btn-neutral group relative w-full whitespace-nowrap rounded-xl px-4 py-3 text-left text-gray-100 md:whitespace-normal">
      <div className="flex w-full items-center justify-center gap-2">
        <div className="flex w-full items-center justify-between">
          <div className="flex flex-col overflow-hidden">
            <div className="truncate">{title}</div>
            <div className="truncate font-normal opacity-50">{description}</div>
          </div>
          <div className="absolute bottom-0 right-0 top-0 flex items-center rounded-xl bg-gradient-to-l pl-6 pr-4 opacity-0 group-hover:opacity-100">
            <span className="" data-state="closed">
              <div className="color-white shadow-xxs rounded-lg p-1 dark:shadow-none">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="icon-sm text-gray-100">
                  <path d="M7 11L12 6L17 11M12 18V7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                </svg>
              </div>
            </span>
          </div>
        </div>
      </div>
    </button>
  );
}

function App() {
  const defaultTitle = "New Chat";
  const [title, setTitle] = useState(defaultTitle);
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [conversation, setConversation] = useState<Message[]>([]);
  const [session, setSession] = useState<Session[]>([]);

  const createNewChat = () => {
    // Save current Session
    setSession((prevSession) => [...prevSession, { title: defaultTitle, conversation: conversation }]);

    console.log("Before: ", session, conversation);
    // Set New Session
    setMessage("");
    setResponse("");
    setTitle(defaultTitle);
    setConversation([]);

    // print out all sessions
    console.log("After: ", session, conversation);
  };

  useEffect(() => {
    if (response && title === defaultTitle) {
      setTitle(response);
    }
  }, [response, title]);

  useEffect(() => {
    if (title !== "New Chat") {
      setSession((prevSession) => {
        const updatedSession = [...prevSession];
        if (updatedSession.length > 0) {
          updatedSession[updatedSession.length - 1].title = title;
        }
        return updatedSession;
      });
    }
  }, [title]);

  const handleTitle = (title: string) => {
    const findSession = session.find((session) => session.title === title);
    if (findSession) {
      console.log("Changing Session to: ", title);
      setConversation(findSession.conversation);
    } else {
      console.error("Session not found for title: ", title);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newMessage: Message = { role: "user", content: message };
    setConversation([...conversation, newMessage]);
    fetch("http://localhost:3000/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ messages: [...conversation, newMessage] }),
    })
      .then((res) => res.json())
      .then((data) => {
        setResponse(data.message);
        setConversation([...conversation, newMessage, { role: "assistant", content: data.message }]);
      });
  };

  useEffect(() => {
    createNewChat();
  }, []);

  return (
    <div className="flex h-full w-full overflow-hidden">
      {/* Side bar */}
      <nav className="hidden w-[260px] flex-col justify-between overflow-x-hidden bg-neutral-900 px-3 py-3.5 sm:flex" aria-history="Chat History">
        <button onClick={createNewChat} className="btn btn-neutral group relative w-full whitespace-nowrap rounded-xl border-2 border-neutral-950 px-4 py-3 text-sm text-gray-100 md:whitespace-normal">
          + New Chat
        </button>
        <ul className="flex h-full flex-col gap-2 overflow-y-auto py-4 text-sm text-gray-100">
          {session
            .slice()
            .reverse()
            .map((conversation, index) => (
              <li key={index} onClick={() => handleTitle(conversation.title)} className="truncate rounded-lg px-4 py-4 hover:cursor-pointer hover:bg-neutral-950">
                {conversation.title}
              </li>
            ))}
        </ul>
        <div className="flex w-full flex-col items-center border-t-2 pt-4">
          <p>Made by Prabhjot Sodhi</p>
        </div>
      </nav>
      {/* Chat Window */}
      <div className="flex h-full w-full flex-col px-3 py-3.5" tabIndex={0}>
        <div className="flex h-full flex-1 flex-col p-1 md:items-center md:justify-center">
          <div className="mb-5 inline-flex bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text pb-1 text-5xl font-medium text-transparent">Hello FlightFund Founder</div>
          <div className="mb-5 text-5xl font-medium text-gray-400">How can I help you today?</div>
          <ul>
            {conversation.map((message, index) => (
              <li key={index}>
                <strong>{message.role}:</strong> {message.content}
              </li>
            ))}
          </ul>
        </div>
        <div className="w-full border-white/20 pt-2 md:w-[calc(100%-.5rem)] md:border-transparent md:pt-0">
          <form onSubmit={handleSubmit} className="stretch mx-2 flex w-full flex-row items-center gap-3 rounded-lg px-3 py-2 last:mb-2 md:mx-4 md:last:mb-6 lg:mx-auto lg:max-w-2xl xl:max-w-3xl">
            <div className="relative flex h-full flex-1 items-stretch md:flex-col">
              <div className="ml-1 flex h-full justify-center gap-0 md:m-auto md:mb-4 md:w-full md:gap-2">
                <div className="grow">
                  <div className="absolute bottom-full left-0 mb-4 flex w-full grow gap-2 px-1 pb-1 sm:px-2 sm:pb-0 md:static md:mb-0 md:max-w-none">
                    <div className="grid w-full grid-flow-row grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-2">
                      <div className="flex flex-col gap-2">
                        <span>
                          <Card title="Suggest some codenames" description="for a project introducing flexible work arrangements" />
                        </span>
                        <span>
                          <Card title="How to create a pitchdeck" description="to pitch to a group of investors" />
                        </span>
                      </div>
                      <div className="flex flex-col gap-2">
                        <span style={{ opacity: "1", transform: "none" }}>
                          <Card title="Tell me a fun fact" description="about the Roman Empire" />
                        </span>
                        <span>
                          <Card title="Create a charter" description="to start a film club" />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative flex h-full flex-1 items-stretch md:flex-col">
                <div className="flex w-full items-center">
                  <button className="absolute bottom-1 left-1 justify-center rounded-lg p-2 text-gray-400 hover:bg-gray-600 hover:text-white md:bottom-2 md:left-2">
                    <svg className="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 18">
                      <path fill="currentColor" d="M13 5.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0ZM7.565 7.423 4.5 14h11.518l-2.516-3.71L11 13 7.565 7.423Z" />
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 1H2a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z" />
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0ZM7.565 7.423 4.5 14h11.518l-2.516-3.71L11 13 7.565 7.423Z" />
                    </svg>
                  </button>
                  <textarea id="prompt-textarea" value={message} onChange={(e) => setMessage(e.target.value)} data-id="root" rows={1} placeholder="Message StevenTheDragon..." className="max-h-25 m-0 w-full resize-none rounded-lg bg-transparent py-[10px] pl-10 pr-10 placeholder-white/50 focus:ring-0 focus-visible:ring-0 md:py-3.5 md:pl-[55px] md:pr-12"></textarea>
                  <button type="submit" className="absolute bottom-1 right-1 inline-flex cursor-pointer justify-center rounded-full p-2 text-gray-400 hover:bg-gray-600 hover:text-white md:bottom-2 md:right-2">
                    <svg className="h-5 w-5 rotate-90 rtl:-rotate-90" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                      <path d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </form>
          <div className="relative px-2 py-2 text-center text-xs text-gray-300 md:px-[60px]">
            <span>Note: StevenTheDragon can make mistakes</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
