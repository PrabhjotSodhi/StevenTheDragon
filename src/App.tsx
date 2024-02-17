import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

function App() {
  return (
    <div className="flex h-full w-full overflow-hidden">
      {/* Side bar */}
      <nav className="hidden w-[260px] flex-col justify-between overflow-x-hidden bg-neutral-900 px-3 py-3.5 sm:flex" aria-history="Chat History">
        <button className="rounded-lg border-2 border-neutral-950 px-1 py-3 text-sm hover:border-neutral-950 hover:bg-neutral-950">+ New Chat</button>
        <ul className="flex h-full flex-col gap-2 overflow-y-auto py-4 text-sm text-gray-100">
          <li className="rounded-lg px-4 py-4 hover:cursor-pointer hover:bg-neutral-950">Test One</li>
        </ul>
        <div className="flex w-full flex-col items-center border-t-2 pt-4">
          <p>Made by Prabhjot Sodhi</p>
        </div>
      </nav>
      {/* Chat Window */}
      <div className="flex h-full w-full flex-col px-3 py-3.5" tabIndex={0}>
        <div className="h-full flex-1 items-center justify-center">
          <div className="mb-5 text-2xl font-medium">How can I help you today?</div>
        </div>
        <div className="w-full border-white/20 pt-2 md:w-[calc(100%-.5rem)] md:border-transparent md:pt-0">
          <form className="stretch mx-2 flex w-full flex-row items-center gap-3 rounded-lg px-3 py-2 last:mb-2 md:mx-4 md:last:mb-6 lg:mx-auto lg:max-w-2xl xl:max-w-3xl">
            <div className="relative flex h-full flex-1 items-stretch md:flex-col">
              <div className="flex w-full items-center">
                <button className="absolute bottom-1 left-1 justify-center rounded-lg p-2 text-gray-400 hover:bg-gray-600 hover:text-white md:bottom-2 md:left-2">
                  <svg className="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 18">
                    <path fill="currentColor" d="M13 5.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0ZM7.565 7.423 4.5 14h11.518l-2.516-3.71L11 13 7.565 7.423Z" />
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 1H2a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z" />
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0ZM7.565 7.423 4.5 14h11.518l-2.516-3.71L11 13 7.565 7.423Z" />
                  </svg>
                </button>
                <textarea id="prompt-textarea" data-id="root" rows={1} placeholder="Message StevenTheDragon..." className="max-h-25 m-0 w-full resize-none border-0 bg-transparent py-[10px] pl-10 pr-10 placeholder-black/50 focus:ring-0 focus-visible:ring-0 md:py-3.5 md:pl-[55px] md:pr-12 dark:bg-transparent dark:placeholder-white/50"></textarea>
                <button type="submit" className="absolute bottom-1.5 right-2 inline-flex cursor-pointer justify-center rounded-full p-2 text-gray-400 hover:bg-gray-600 hover:text-white">
                  <svg className="h-5 w-5 rotate-90 rtl:-rotate-90" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                    <path d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z" />
                  </svg>
                </button>
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
