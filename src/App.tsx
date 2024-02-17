import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

function App() {
  return (
    <div className="flex h-full w-full overflow-hidden">
      {/* Side bar */}
      <nav className="flex w-[260px] flex-col justify-between overflow-x-hidden bg-neutral-900 px-3 py-3.5" aria-history="Chat History">
        <button className="rounded-lg border-2 border-neutral-950 px-1 py-3 text-sm hover:border-neutral-950 hover:bg-neutral-950">+ New Chat</button>
        <ul className="flex h-full flex-col gap-2 overflow-y-auto py-4 text-sm text-gray-100">
          <li className="rounded-lg px-4 py-4 hover:cursor-pointer hover:bg-neutral-950">Test One</li>
        </ul>
        <div className="flex w-full flex-col items-center border-t-2 pt-4">
          <p>Made by Prabhjot Sodhi</p>
        </div>
      </nav>
      {/* Chat Window */}
      <div className="flex h-full flex-col" tabIndex={0}>
        <div className="h-full flex-1 items-center justify-center">
          <div></div>
        </div>
      </div>
    </div>
  );
}

export default App;
