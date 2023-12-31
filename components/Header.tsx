"use client";
import Image from "next/image";
import React from "react";
import logo from "../public/trello-logo.png";
import { MagnifyingGlassIcon, UserCircleIcon } from "@heroicons/react/20/solid";
import Avatar from "react-avatar";
import { useBoardStore } from "@/store/BoardStore";

function Header() {
  const [searchString, setSearchString] = useBoardStore((state) => [
    state.searchString,
    state.setSearchString,
  ]);

  return (
    <header>
      <div className="flex flex-col md:flex-row items-center p-5 bg-gray-500/10 rounded-b-2xl">
        {/* Div que faz o bg-gradient */}
        <div
          className="
        absolute 
        top-0 
        left-0 
        w-full 
        h-96 
        bg-gradient-to-br 
        from-pink-400 
        to-[#0055D1] 
        rounded-md 
        filter 
        blur-3xl 
        opacity-50
        -z-50
        "
        />

        <Image
          src={logo}
          alt="Trello logo"
          width={300}
          height={100}
          className="w-44 md:56 pb-10 md:pb-0 object-contain"
        />
        <div className="flex items-center space-x-5 flex-1 justify-end w-full">
          <form className="flex items-center space-x-5 bg-white rounded-md p-2 shadow-md flex-1 md:flex-initial">
            <MagnifyingGlassIcon className="h-6 w-6 text-grey-400" />
            <input
              type="text"
              placeholder="Pesquise"
              value={searchString}
              onChange={(e) => setSearchString(e.target.value)}
              className="flex-1 outline-none p-2"
            />
            <button type="submit" hidden>
              Search
            </button>
          </form>
          {/* Da uma olhada na biblioteca depois */}
          <Avatar name="Ruan Pablo" size="50" round color="#0055D1" />
        </div>
      </div>

      {/* <div className="flex items-center justify-center px-5 md:py-5">
        <p className="flex items-center text-sm  p-5 py-5 font-light pr-5 shadow-xl rounded-xl w-fit bg-white italic max-w-3xl text-[#0055D1]">
          <UserCircleIcon className="inline-block h-10 w-10 text-[#0055D1] mr-1" />
          O famoso chat está resumido seu dia
        </p>
      </div> */}
    </header>
  );
}

export default Header;
