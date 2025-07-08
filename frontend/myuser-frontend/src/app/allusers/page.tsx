"use client";

import React, { useEffect, useState } from "react";
import { userApi } from "@/api/router";
import type { User } from "@/api/api.types";
import Image from "next/image";
import Link from "next/link";
import Loading from "@/components/Loading/Loading";

export default function AllUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await userApi.getAll();
        setUsers(data);
      } catch {
        setError("Erro ao buscar usuários");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  if (loading) return <Loading />;
  if (error) return <div className="text-center mt-8 text-red-600">{error}</div>;
  if (users.length === 0)
    return (
      <div className="text-center flex flex-col justify-center font-bold text-white items-center px-2 min-h-[60vh]">
        <span className="text-2xl mb-2 text-neutral-300">Nenhum usuário encontrado</span>
        <div className="text-gray-400 text-base mb-4">Cadastre um novo user agora mesmo!</div>
        <div className="mt-6">
          <Link
            className="bg-neutral-700 hover:bg-neutral-800 px-6 py-3 rounded-xl text-white text-base font-semibold shadow-lg transition-all border border-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-400/60"
            href={"/newuser"}
          >
            Cadastrar User
          </Link>
        </div>
      </div>
    );
  return (
    <div className="w-full pb-10 max-w-2xl mx-auto mt-8 text-white px-2">
      <h1 className="text-3xl sm:text-4xl font-extrabold mb-8 text-center tracking-tight text-neutral-200 drop-shadow-lg">
        Todos os Usuários
      </h1>
      <div className="grid gap-5 sm:gap-6">
        {users.map((user) => (
          <Link
            key={user.id}
            className="flex flex-col sm:flex-row items-center gap-4 p-4 sm:p-6 bg-gradient-to-br from-neutral-700 via-neutral-800 to-neutral-900 hover:from-neutral-800 hover:to-neutral-950 rounded-2xl shadow-xl transition-all border border-neutral-700 group"
            href={`/seeuser/${user.id}`}
          >
            <Image
              width={64}
              height={64}
              src={user.avatar.startsWith("http") ? user.avatar : `http://localhost:3001${user.avatar}`}
              alt={user.fullname}
              className="w-20 h-20 sm:w-16 sm:h-16 rounded-full object-cover border-2 border-neutral-400 group-hover:border-neutral-500 shadow"
            />
            <div className="flex-1 w-full">
              <div className="font-bold text-lg sm:text-xl text-center sm:text-left text-neutral-200 group-hover:text-neutral-300 transition-all break-words">
                {user.fullname}
              </div>
              <div className="text-xs sm:text-sm text-gray-200 flex flex-col sm:flex-row gap-1 sm:gap-4 items-center sm:items-start justify-center sm:justify-start">
                <div>
                  {user.city} - {user.state}
                </div>
                <span className="hidden sm:inline text-gray-400">|</span>
                <div>
                  {(() => {
                    const birthDate = user.age instanceof Date ? user.age : new Date(user.age);
                    const today = new Date();
                    let age = today.getFullYear() - birthDate.getFullYear();
                    const m = today.getMonth() - birthDate.getMonth();
                    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                      age--;
                    }
                    return `${age} anos`;
                  })()}
                </div>
              </div>
              <div className="text-xs text-gray-300 text-center sm:text-left break-words mt-2 italic">{user.bio}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
