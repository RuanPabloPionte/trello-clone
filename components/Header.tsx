import Image from "next/image";
import React from "react";
import logo from "../public/trello-logo.png";
import { MagnifyingGlassIcon, UserCircleIcon } from "@heroicons/react/20/solid";

function Header() {
  return (
    <header>
      <Image
        src={logo}
        alt="Trello logo"
        width={300}
        height={100}
        className="w-44 md:56 pb-10 md:pb-0 object-contain"
      />
      <div>
        <form action="">
          <MagnifyingGlassIcon className="h-6 w-6 text-grey-400" />
          <input type="text" />
          <button hidden>Search</button>
        </form>
      </div>
    </header>
  );
}

export default Header;
