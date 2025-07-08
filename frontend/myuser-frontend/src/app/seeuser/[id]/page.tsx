"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { userApi } from "@/api/router";
import type { User } from "@/api/api.types";
import { useParams } from "next/navigation";

export default function UserPage() {
  const params = useParams();
  const id = typeof params?.id === "string" ? params.id : Array.isArray(params?.id) ? params.id[0] : "";

  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [birthDate, setBirthDate] = useState<string>("");

  useEffect(() => {
    let isMounted = true;
    const fetchUser = async () => {
      try {
        const result = await userApi.getById(id);
        const fetchedUser = Array.isArray(result) ? result[0] : result;
        if (!fetchedUser) throw new Error("Usuário não encontrado");
        if (isMounted) setUser(fetchedUser);
      } catch {
        if (isMounted) setError("Usuário não encontrado.");
      }
    };
    if (id) fetchUser();
    return () => {
      isMounted = false;
    };
  }, [id]);

  useEffect(() => {
    if (user?.age) {
      try {
        const date = new Date(user.age);
        if (!isNaN(date.getTime())) {
          setBirthDate(date.toLocaleDateString("pt-BR"));
        } else {
          setBirthDate(String(user.age));
        }
      } catch {
        setBirthDate(String(user.age));
      }
    }
  }, [user]);

  if (error) {
    return <div className="max-w-md mx-auto mt-10 p-6 bg-red-100 text-red-800 rounded shadow text-center">{error}</div>;
  }

  if (!user) {
    return null;
  }

  return (
    <div className="w-full max-w-lg mx-auto mt-4 p-2 sm:p-8 flex justify-center bg-gradient-to-br from-neutral-900 via-neutral-950 to-black shadow-2xl shadow-neutral-950 text-neutral-100 rounded-2xl border border-neutral-800 relative overflow-hidden">
      <div className="flex flex-col items-center w-full z-10">
        <Image
          src={user.avatar.startsWith("http") ? user.avatar : `http://localhost:3001${user.avatar}`}
          width={96}
          height={96}
          alt={user.fullname}
          className="w-24 h-24 mb-4 rounded-full object-cover border-2 border-neutral-400 shadow-lg"
        />

        <h2 className="text-xl sm:text-2xl text-center font-extrabold break-words w-full text-neutral-100 drop-shadow-lg mb-1">
          {user.fullname}
        </h2>
        <p className="text-xs sm:text-sm text-neutral-400 text-center w-full break-words mb-2">
          {user.city}, {user.state}
        </p>

        <p className="text-neutral-300 text-center py-2 sm:py-4 break-words w-full italic mb-2">{user.bio}</p>

        <ul className="w-full flex flex-col gap-1 mt-4 text-xs sm:text-sm">
          <li className="break-words">
            <b>Data de nascimento:</b> {birthDate}
          </li>
          <li className="break-words">
            <b>Rua:</b> {user.street}
          </li>
          <li className="break-words">
            <b>Bairro:</b> {user.neighborhood}
          </li>
          <li className="text-neutral-500 text-center pt-4 sm:pt-6 break-words">
            <b>Criado em:</b> {user.createdAt ? new Date(user.createdAt).toLocaleDateString("pt-BR") : "N/A"} -{" "}
            <b>Atualizado em:</b> {user.updatedAt ? new Date(user.updatedAt).toLocaleDateString("pt-BR") : "N/A"}
          </li>
          <li className="text-neutral-500 text-center text-xs break-words">
            <b>User ID:</b> {user.id}
          </li>
        </ul>
        <div className="flex flex-col justify-center sm:flex-row gap-2 sm:gap-4 mt-6 w-full">
          <button
            type="button"
            className="bg-neutral-700 hover:bg-neutral-800 text-white px-4 py-2 rounded-lg font-semibold shadow text-center w-full sm:w-auto transition-all"
            onClick={() => window.history.back()}
          >
            Voltar
          </button>
          <a
            href={`/edituser/${user.id}`}
            className="bg-blue-600 hover:bg-blue-800 text-white px-4 py-2 rounded-lg font-semibold shadow text-center w-full sm:w-auto transition-all border border-neutral-600"
          >
            Editar
          </a>
          <button
            type="button"
            className="bg-red-600 hover:bg-red-800 cursor-pointer text-white px-4 py-2 rounded-lg font-semibold shadow text-center w-full sm:w-auto transition-all border border-neutral-700"
            onClick={async () => {
              if (window.confirm("Tem certeza que deseja excluir este usuário?")) {
                try {
                  await userApi.delete(user.id);
                  window.location.href = "/allusers";
                } catch {
                  alert("Erro ao excluir usuário!");
                }
              }
            }}
          >
            Excluir
          </button>
        </div>
      </div>
    </div>
  );
}
