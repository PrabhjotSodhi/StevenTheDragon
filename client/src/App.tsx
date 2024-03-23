import { useEffect, useState } from "react";

interface CardProps {
  title: string;
  description: string;
  setMessage: (message: string) => void;
  prompt: string;
}
type Message = {
  role: "user" | "assistant";
  content: React.ReactNode | string;
};

type Session = {
  id: number;
  title: string;
  conversation: Message[];
};

const lawList = [
  "Law 1: Fill your five buckets in the right order",
  "Law 2: To master it, you must create an obligation to teach it",
  "Law 3: You must never disagree",
  "Law 4: You do not get to choose what you believe",
  "Law 5: You must lean in to bizarre behaviour",
  "Law 6: Ask, don't tell - the question/behaviour effect",
  "Law 7: Never compromise your self-story",
  "Law 8: Never fight a bad habit",
  "Law 9: Always prioritise your first foundation",
  "Law 10: Useless absurdity will define you more than useful practicalities",
  "Law 11: Avoid wallpaper at all costs",
  "Law 12: You must piss people off",
  "Law 13: Shoot your psychological moonshots first",
  "Law 14: Friction can create value",
  "Law 15: The frame matters more than the picture",
  "Law 16: Use Goldilocks to your advantage",
  "Law 17: Let them try and they will buy",
  "Law 18: Fight for the first five seconds",
  "Law 19: You must sweat the small stuff",
  "Law 20: A small miss now creates a big miss later",
  "Law 21: You must out-fail the competition",
  "Law 22: You must become a Plan-A thinker",
  "Law 23: Don't be an ostrich",
  "Law 24: You must make pressure your privilege",
  "Law 25: The power of negative manifestation",
  "Law 26: Your skills are worthless, but your context is valuable",
  "Law 27: The discipline equation: death, time and discipline!",
  "Law 28: Ask who not how",
  "Law 29: Create a cult mentality",
  "Law 30: The three bars for building great teams",
  "Law 31: Leverage the power of progress",
  "Law 32: You must be an inconsistent leader",
  "Law 33: Learning never ends",
];

function getSessionStorage(defaultValue: Session[] = []) {
  const session = window.sessionStorage.getItem("session");
  return session ? JSON.parse(session) : defaultValue;
}

function Card({ title, description, setMessage, prompt }: CardProps) {
  return (
    <button onClick={() => setMessage(prompt)} className="btn btn-neutral group relative w-full whitespace-nowrap rounded-xl px-4 py-3 text-left text-gray-100 md:whitespace-normal">
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
                  <path d="M7 11L12 6L17 11M12 18V7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
              </div>
            </span>
          </div>
        </div>
      </div>
    </button>
  );
}

function ChatBubble({ role, content }: Message) {
  const now = new Date();
  const [audio] = useState(new Audio());

  const playAudio = () => {
    fetch("http://localhost:3000/voice", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: content }),
    })
      .then((res) => res.blob())
      .then((blob) => {
        const url = URL.createObjectURL(blob);
        audio.src = url;
        audio.play();
      });
  };

  return (
    <div className="flex-1 overflow-hidden">
      <div className="flex flex-col pb-9 text-sm">
        <div className="text w-full text-gray-100">
          <div className="m-auto justify-center px-4 py-2 text-base md:gap-6">
            <div className="mx-auto flex flex-1 gap-3 text-base md:max-w-3xl md:px-5 lg:max-w-[40rem] lg:px-1 xl:max-w-[48rem] xl:px-5">
              <img className="h-12 w-12 rounded-full object-cover" src={role == "user" ? "https://media.licdn.com/dms/image/D4E0BAQGUS0T9L2YxZg/company-logo_200_200/0/1707737879244/flightfund_logo?e=2147483647&v=beta&t=ATxoMYBFCP4R_WRtzHflPA_10ZsSylSs7nEOKIxMct4" : "https://i2-prod.walesonline.co.uk/incoming/article22597639.ece/ALTERNATES/s615/0_23954987-high_res-dragons-den-s19.jpg"} />
              <div className="relative flex w-full flex-col">
                <div className="select-none font-semibold">
                  {role == "user" ? "Flight Fund" : "Steven The Dragon"} <span className="text-sm font-normal text-gray-500 dark:text-gray-400">{((now.getHours() + 24) % 12) + ":" + ((now.getMinutes() < 10 ? "0" : "") + now.getMinutes()) + (now.getHours() > 10 ? " PM" : " AM")}</span>
                </div>
                <div className="text-message flex min-h-[20px] max-w-full flex-grow flex-col items-start gap-3 overflow-x-auto whitespace-pre-wrap break-words md:gap-3 [.text-message+&]:mt-5">{content}</div>
                <div className="mt-1 flex justify-start gap-3 empty:hidden">
                  <div className="-ml-1 mt-0 flex h-7 items-center justify-center gap-[2px] self-end text-gray-400 lg:justify-start lg:self-center">
                    <button onClick={playAudio} className="text-token-text-tertiary hover:text-token-text-primary flex items-center gap-1.5 rounded-md p-1 text-xs">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="icon-md">
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M11 4.9099C11 4.47485 10.4828 4.24734 10.1621 4.54132L6.67572 7.7372C6.49129 7.90626 6.25019 8.00005 6 8.00005H4C3.44772 8.00005 3 8.44776 3 9.00005V15C3 15.5523 3.44772 16 4 16H6C6.25019 16 6.49129 16.0938 6.67572 16.2629L10.1621 19.4588C10.4828 19.7527 11 19.5252 11 19.0902V4.9099ZM8.81069 3.06701C10.4142 1.59714 13 2.73463 13 4.9099V19.0902C13 21.2655 10.4142 22.403 8.81069 20.9331L5.61102 18H4C2.34315 18 1 16.6569 1 15V9.00005C1 7.34319 2.34315 6.00005 4 6.00005H5.61102L8.81069 3.06701ZM20.3166 6.35665C20.8019 6.09313 21.409 6.27296 21.6725 6.75833C22.5191 8.3176 22.9996 10.1042 22.9996 12.0001C22.9996 13.8507 22.5418 15.5974 21.7323 17.1302C21.4744 17.6185 20.8695 17.8054 20.3811 17.5475C19.8927 17.2896 19.7059 16.6846 19.9638 16.1962C20.6249 14.9444 20.9996 13.5175 20.9996 12.0001C20.9996 10.4458 20.6064 8.98627 19.9149 7.71262C19.6514 7.22726 19.8312 6.62017 20.3166 6.35665ZM15.7994 7.90049C16.241 7.5688 16.8679 7.65789 17.1995 8.09947C18.0156 9.18593 18.4996 10.5379 18.4996 12.0001C18.4996 13.3127 18.1094 14.5372 17.4385 15.5604C17.1357 16.0222 16.5158 16.1511 16.0539 15.8483C15.5921 15.5455 15.4632 14.9255 15.766 14.4637C16.2298 13.7564 16.4996 12.9113 16.4996 12.0001C16.4996 10.9859 16.1653 10.0526 15.6004 9.30063C15.2687 8.85905 15.3578 8.23218 15.7994 7.90049Z"
                          fill="currentColor"
                        ></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  const defaultTitle = "New Chat";
  const [currentId, setCurrentId] = useState(Number);
  const [title, setTitle] = useState(defaultTitle);
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [conversation, setConversation] = useState<Message[]>([]);
  const [session, setSession] = useState<Session[]>(getSessionStorage());
  const [isLoading, setIsLoading] = useState(false);
  const [law, setLaw] = useState(lawList[Math.floor(Math.random() * lawList.length)]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const createNewChat = async () => {
    const response = await fetch("http://localhost:3000/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    });
    if (!response.ok) {
      console.error(response.statusText);
    }
    const thread = await response.json();
    console.log(thread.threadId);

    setSession((prevSession) => {
      return [...prevSession, { id: thread.threadId, title: defaultTitle, conversation: [] }];
    });
    setMessage("");
    setResponse("");
    setTitle(defaultTitle);
    setConversation([]);
    setCurrentId(thread.threadId);
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

  useEffect(() => {
    setSession((prevSession) => {
      const findSession = prevSession.find((session) => session.id === currentId);
      if (findSession) {
        findSession.conversation = conversation;
      }
      return [...prevSession];
    });
  }, [conversation]);

  useEffect(() => {
    window.sessionStorage.setItem("session", JSON.stringify(session));
  }, [session]);

  useEffect(() => {
    if (isLoading) {
      const interval = setInterval(() => {
        setLaw(lawList[Math.floor(Math.random() * lawList.length)]);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isLoading]);

  const handleTitle = (id: number) => {
    const findSession = session.find((session) => session.id === id);
    if (findSession) {
      console.log("Changing Session to: ", title);
      setConversation(findSession.conversation);
      setMessage("");
      setResponse("");
      setCurrentId(id);
      console.log(conversation);
    } else {
      console.error("Session not found for title: ", title);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (currentId === 0) {
      createNewChat();
    }
    setConversation([...conversation, { role: "user", content: message }]);
    setIsLoading(true);

    const response = await fetch("http://localhost:3000/steven", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        threadId: currentId,
        message: { role: "user", content: message },
      }),
    });

    if (!response.ok) {
      console.error(response);
    }

    const data = await response.json();
    console.log(data.message);
    setIsLoading(false);
    setResponse(data.message);
    setConversation([...conversation, { role: "user", content: message }, { role: "assistant", content: data.message }]);
  };

  return (
    <div className="flex h-full w-full overflow-hidden">
      {/* Side bar */}
      <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="btn color-white bg-color-white absolute left-4 top-4 z-50 sm:hidden">
        {isSidebarOpen ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="icon-md">
            <path d="M6.34315 6.34338L17.6569 17.6571M17.6569 6.34338L6.34315 17.6571" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M3 8C3 7.44772 3.44772 7 4 7H20C20.5523 7 21 7.44772 21 8C21 8.55228 20.5523 9 20 9H4C3.44772 9 3 8.55228 3 8ZM3 16C3 15.4477 3.44772 15 4 15H14C14.5523 15 15 15.4477 15 16C15 16.5523 14.5523 17 14 17H4C3.44772 17 3 16.5523 3 16Z" fill="currentColor"></path>
          </svg>
        )}
      </button>
      <nav className={`${isSidebarOpen ? "visible" : "hidden"} absolute z-20 h-full w-full flex-col justify-between overflow-x-hidden bg-neutral-900 px-3 py-3.5 sm:static sm:flex sm:w-[260px]`} aria-history="Chat History">
        <button onClick={createNewChat} className="btn btn-neutral group relative mt-10 w-full whitespace-nowrap rounded-xl border-2 border-neutral-950 px-4 py-3 text-sm text-gray-100 sm:mt-0 md:whitespace-normal">
          + New Chat
        </button>
        <ul className="flex h-full flex-col gap-2 overflow-y-auto py-4 text-sm text-gray-100">
          {session
            .slice()
            .reverse()
            .map((conversation, index) => (
              <li key={index} onClick={() => handleTitle(conversation.id)} className="truncate rounded-lg px-4 py-4 hover:cursor-pointer hover:bg-neutral-950">
                {conversation.title}
              </li>
            ))}
        </ul>
        <div className="flex w-full flex-col items-center border-t-2 pt-4">
          <p>
            Made by{" "}
            <a href="https://www.linkedin.com/in/prabhjotsodhi/" target="_blank" rel="noopener noreferrer">
              Prabhjot Sodhi
            </a>
          </p>
        </div>
      </nav>
      {/* Chat Window */}
      <div className="flex h-full w-full flex-col overflow-hidden overflow-y-auto px-3 py-3.5" tabIndex={0}>
        <div className={`flex flex-1 flex-col-reverse overflow-y-auto p-1 ${conversation.length == 0 ? "mt-10 justify-end md:mt-0 md:items-center md:justify-center" : ""}`}>
          {conversation.length == 0 ? (
            <div>
              <div className="mb-5 inline-flex bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text pb-1 text-5xl font-medium text-transparent">Hello FlightFund Founder</div>
              <div className="mb-5 text-5xl font-medium text-gray-400">How can I help you today?</div>
            </div>
          ) : (
            ""
          )}
          <ul>
            {conversation.map((message, index) => (
              <li key={index}>
                <ChatBubble role={message.role} content={message.content} />
                {/*<strong>{message.role}:</strong> {message.content}*/}
              </li>
            ))}
            {isLoading ? (
              <ChatBubble
                role="assistant"
                content={
                  <div role="status" className="flex flex-row flex-nowrap justify-center gap-2 overflow-hidden align-middle">
                    <svg aria-hidden="true" className="h-8 w-8 animate-spin fill-blue-600 text-gray-200 dark:text-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                    <span className="sr-only">Loading...</span>
                    <p className="align-middle italic text-gray-300">{law}</p>
                  </div>
                }
              />
            ) : null}
          </ul>
        </div>
        <div className="w-full border-white/20 pt-2 md:w-[calc(100%-.5rem)] md:border-transparent md:pt-0">
          <form onSubmit={handleSubmit} className="stretch mx-2 flex w-full flex-row items-center gap-3 rounded-lg py-2 pr-3 last:mb-2 md:mx-4 md:last:mb-6 lg:mx-auto lg:max-w-2xl xl:max-w-3xl">
            <div className="relative flex h-full flex-1 items-stretch md:flex-col">
              <div className="ml-1 flex h-full justify-center gap-0 md:m-auto md:mb-4 md:w-full md:gap-2">
                <div className="grow">
                  <div className="absolute bottom-full left-0 mb-4 flex w-full grow gap-2 px-1 pb-1 sm:px-2 sm:pb-0 md:static md:mb-0 md:max-w-none">
                    {conversation.length === 0 ? (
                      <div className="grid w-full grid-flow-row grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-2">
                        <div className="flex flex-col gap-2">
                          <span>
                            <Card
                              title="Help me market my product"
                              description="to become a thought leader in a red ocean"
                              setMessage={setMessage}
                              prompt="Act as a seasoned marketing strategist with a specialization in differentiation and thought leadership. My product, operates in a highly competitive market, often referred to as a red ocean, where it faces intense competition and commoditization threats. Start by asking my product's name and unique value proposition is and the size of the company (startup, mid-sized, large corporation).

Given this scenario, I'm seeking comprehensive strategies to differentiate my product and position myself as a thought leader in this sector. This should involve a multi-faceted approach covering, but not limited to:

In-depth Competitive Analysis: Identify key areas where competitors are lacking and how My product can fill this void or outperform on these dimensions.
Content Strategy: Develop a content strategy that not only highlights the unique value of My product but also establishes our voice as an authority in the industry. This includes types of content (e.g., blogs, white papers, videos), potential topics that resonate with our target audience, and platforms for distribution.
Community Engagement and Thought Leadership: Suggestions on how to engage with industry communities (online forums, social media groups, professional associations) and position My product as a frontrunner through thought leadership (e.g., speaking engagements, webinars, roundtable discussions).
Innovative Marketing Tactics: Unconventional and innovative marketing tactics that can make My product stand out in a crowded market. This could involve guerrilla marketing, leveraging emerging technologies, or unique partnerships.
Metrics for Success: Key performance indicators (KPIs) and metrics to monitor the effectiveness of these strategies and adjust course as necessary.
Please provide a detailed action plan that incorporates these elements, ensuring that the advice is practical, feasible for my company size, and aligned with current market trends and consumer behavior"
                            />
                          </span>
                          <span>
                            <Card
                              title="How to create a pitch deck"
                              description="to pitch to a group of investors"
                              setMessage={setMessage}
                              prompt="Act as a seasoned entrepreneur and presentation coach with extensive experience in crafting compelling pitch decks for startups seeking investment. Begin by asking me to provide detailed information about several key aspects of my business and the vision behind it. Specifically, request the following details to tailor the pitch deck advice accurately:

Business Overview: Briefly describe the core product or service your startup offers. What problem does it solve, and why is it unique in the marketplace? [Business_Overview]

Target Market: Who are your ideal customers? Provide insights into your target market's size, demographics, and psychographics. [Target_Market]

Revenue Model: How does your business make money? Describe your primary revenue streams, including any subscription models, product sales, or services. [Revenue_Model]

Competition Analysis: Who are your main competitors, and how does your offering outperform them? Highlight your competitive edge. [Competition]

Marketing and Sales Strategy: Outline your strategies for customer acquisition and retention. Mention any partnerships, channels, or tactics you plan to use. [Marketing_Sales_Strategy]

Financial Projections: Share any available financial projections or key financial metrics that highlight your business's potential growth and profitability over the next 3-5 years. [Financial_Projections]

Funding Needs: Specify how much funding you are seeking and how you plan to allocate these funds to scale your business. [Funding_Needs]

Team: Introduce your team, highlighting key members' expertise and roles in driving the business forward. [Team]

Vision and Future Plans: What is the long-term vision for your company, and what are the key milestones you aim to achieve in the next few years? [Vision_Future_Plans]

Based on the information provided in these sections, craft a comprehensive guide to creating a pitch deck that would resonate with investors. Include tips on structuring the presentation, designing slides for maximum impact, and delivering the pitch with confidence. Additionally, suggest any tools or software that might help in creating a professional and engaging pitch deck. Finally, offer advice on handling questions and feedback from investors during the pitch session."
                            />
                          </span>
                        </div>
                        <div className="flex flex-col gap-2">
                          <span>
                            <Card
                              title="Give me entrepreneurial advice"
                              description="on how I can become successful"
                              setMessage={setMessage}
                              prompt="Act as a seasoned entrepreneur with extensive experience across multiple successful startups. Drawing from your vast knowledge and the lessons you've learned along the way, provide detailed entrepreneurial advice for someone who is eager to embark on their entrepreneurial journey and achieve success. Focus on the following areas:

Innovation and Differentiation: How can I identify unique business opportunities and differentiate my offerings in a crowded market?
Market Understanding: What strategies can I employ to gain a deep understanding of my target market and ensure that my product or service meets their needs?
Resilience and Adaptability: Share insights on developing resilience in the face of setbacks and adaptability in a rapidly changing business environment.
Strategic Planning: Offer guidance on creating a robust business plan that aligns with my long-term vision while being flexible enough to adapt to unexpected challenges.
Networking and Mentorship: Explain the importance of building a strong network and finding mentors, and how these relationships can impact my entrepreneurial journey.
Personal Development: Highlight the skills and mindsets that are crucial for an entrepreneur to develop, including leadership, time management, and continuous learning.
Please provide actionable advice, examples, and any relevant frameworks or tools that can help me navigate these areas effectively. Your insights should aim to equip me with a comprehensive understanding of what it takes to build a successful business from the ground up, ensuring that I'm well-prepared to face the challenges and opportunities of entrepreneurship."
                            />
                          </span>
                          <span>
                            <Card
                              title="Opportunities for entrepreneurs"
                              description="that I could capitalize on"
                              setMessage={setMessage}
                              prompt="Act as a forward-thinking business analyst with a deep understanding of current economic trends, technological advancements, and consumer behaviors. Considering the landscape of 2024, identify and assess recent opportunities for entrepreneurs that are ripe for innovation and growth. Focus on sectors that show high potential due to changes in technology, societal needs, or market gaps. Please provide a comprehensive overview of each opportunity, including the following elements:

Market Need: What specific need does this opportunity address, and why is it relevant now?
Technological Enablers: Are there any recent technological developments or trends that make this opportunity feasible or particularly attractive at this moment?
Target Audience: Who is the primary target audience for this opportunity, and what are their characteristics or behaviors that align with this opportunity?
Competitive Landscape: Briefly describe the current competitive landscape and why there's room for a new entrant.
First Steps for Entrepreneurs: What initial steps should entrepreneurs consider taking to best capitalize on this opportunity?
Please provide insights into at least three distinct opportunities, ensuring a diverse range of industries or sectors is covered to suit different types of entrepreneurial interests and backgrounds. Tailor your analysis to technology and AI if applicable, ensuring that the advice is personalized and directly actionable."
                            />
                          </span>
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
              <div className="relative flex h-full flex-1 items-stretch md:flex-col">
                <div className="flex w-full items-center">
                  <textarea id="prompt-textarea" value={message} onChange={(e) => setMessage(e.target.value)} data-id="root" rows={1} placeholder="Message StevenTheDragon..." className="max-h-25 m-0 w-full resize-none rounded-lg bg-transparent py-[10px] pr-10 placeholder-white/50 focus:ring-0 focus-visible:ring-0 md:py-3.5 md:pr-12"></textarea>
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
            <span>I hope nobody’s using this, but if you are, please keep this from Steven</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
