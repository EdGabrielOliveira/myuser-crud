"use client";

import Link from "next/link";
import React, { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className="w-full shadow-lg z-50">
      <header className="flex flex-col md:flex-row justify-between md:gap-32 gap-4 items-center bg-neutral-800 text-white py-4 px-4 w-full relative border-b border-neutral-700">
        <div className="flex flex-row justify-between items-center w-full md:w-auto">
          <Link href={"/#"} className="font-extrabold items-center text-xl md:text-2xl tracking-tight flex gap-2">
            <span className="inline-block text-neutral-100 drop-shadow">MyUser</span>
            <span className="hidden sm:inline text-neutral-400 font-normal text-base md:text-lg">CRUD</span>
          </Link>
          <button
            className="md:hidden flex flex-col justify-center items-center w-10 h-10 focus:outline-none group"
            aria-label="Abrir menu"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span
              className={`block w-6 h-0.5 bg-white mb-1 rounded transition-all duration-300 group-hover:bg-blue-400 ${
                menuOpen ? "rotate-45 translate-y-2" : ""
              }`}
            ></span>
            <span
              className={`block w-6 h-0.5 bg-white mb-1 rounded transition-all duration-300 group-hover:bg-blue-400 ${
                menuOpen ? "opacity-0" : ""
              }`}
            ></span>
            <span
              className={`block w-6 h-0.5 bg-white rounded transition-all duration-300 group-hover:bg-blue-400 ${
                menuOpen ? "-rotate-45 -translate-y-1" : ""
              }`}
            ></span>
          </button>
        </div>
        <ul
          className={`flex flex-col md:flex-row gap-2 md:gap-4 list-none font-medium w-full md:w-auto items-center md:items-start bg-neutral-900/95 md:bg-transparent absolute md:static left-0 top-full md:top-auto z-20 transition-all duration-300 border-t border-neutral-700 md:border-0 shadow-lg md:shadow-none ${
            menuOpen ? "block" : "hidden"
          } md:flex`}
        >
          <li className="hover:text-neutral-300 transition-colors duration-200 w-full md:w-auto text-center py-2 md:py-0 border-b border-neutral-700 md:border-0">
            <Link href="/#" onClick={() => setMenuOpen(false)}>
              Inicio
            </Link>
          </li>
          <li className="hover:text-neutral-300 transition-colors duration-200 w-full md:w-auto text-center py-2 md:py-0 border-b border-neutral-700 md:border-0">
            <Link href="/newuser" onClick={() => setMenuOpen(false)}>
              Cadastrar User
            </Link>
          </li>
          <li className="hover:text-neutral-300 transition-colors duration-200 w-full md:w-auto text-center py-2 md:py-0 border-b-0">
            <Link href="/allusers" onClick={() => setMenuOpen(false)}>
              Ver todos os Users
            </Link>
          </li>
        </ul>
      </header>
    </div>
  );
}
