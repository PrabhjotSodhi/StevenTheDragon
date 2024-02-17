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
      <div className="flex h-full w-full flex-col px-3 py-3.5" tabIndex={0}>
        <div className="h-full flex-1 items-center justify-center">
          <div className="mb-5 text-2xl font-medium">How can I help you today?</div>
        </div>
        <div className="w-full border-white/20 pt-2 md:w-[calc(100%-.5rem)] md:border-transparent md:pt-0">
          <form className="stretch mx-2 flex flex-row gap-3 last:mb-2 md:mx-4 md:last:mb-6 lg:mx-auto lg:max-w-2xl xl:max-w-3xl">
            <div className="relative flex h-full flex-1 items-stretch md:flex-col">
              <div></div>
              <div className="flex w-full items-center">
                <div className="flex w-full flex-grow flex-col overflow-hidden rounded-2xl border text-white">
                  <textarea name="prompt-textarea" id="prompt-textarea" className="max-h-25 w-full resize-none border-0 bg-transparent py-[10px] pl-10 pr-10 placeholder-white/50 focus:ring-0 focus-visible:ring-0 md:py-3.5 md:pl-[55px] md:pr-12" tabIndex={0} placeholder="Message StevenTheDragon..." spellCheck="false" cols={30} rows={1}></textarea>
                  <div className="absolute bottom-2 left-2 flex md:bottom-3 md:left-4">
                    <button className="btn relative p-0 text-white" aria-label="Attach files">
                      <div className="flex w-full items-center justify-center gap-2">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path fill-rule="evenodd" clip-rule="evenodd" d="M9 7C9 4.23858 11.2386 2 14 2C16.7614 2 19 4.23858 19 7V15C19 18.866 15.866 22 12 22C8.13401 22 5 18.866 5 15V9C5 8.44772 5.44772 8 6 8C6.55228 8 7 8.44772 7 9V15C7 17.7614 9.23858 20 12 20C14.7614 20 17 17.7614 17 15V7C17 5.34315 15.6569 4 14 4C12.3431 4 11 5.34315 11 7V15C11 15.5523 11.4477 16 12 16C12.5523 16 13 15.5523 13 15V9C13 8.44772 13.4477 8 14 8C14.5523 8 15 8.44772 15 9V15C15 16.6569 13.6569 18 12 18C10.3431 18 9 16.6569 9 15V7Z" fill="currentColor"></path>
                        </svg>
                      </div>
                    </button>
                    <input type="file" className="hidden" style={{ display: "none;" }} />
                  </div>
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
