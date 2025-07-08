"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { userApi } from "@/api/router";
import type { User } from "@/api/api.types";
import { useParams, useRouter } from "next/navigation";
import Input from "@/components/Input/Input";
import FileInputModal from "@/components/Input/FileInput";
import Loading from "@/components/Loading/Loading";

export default function EditUserPage() {
  const params = useParams();
  const router = useRouter();
  const id = typeof params?.id === "string" ? params.id : Array.isArray(params?.id) ? params.id[0] : "";

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [message, setMessage] = useState("");
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  type FormDataState = {
    fullname?: string;
    age?: string | Date;
    state?: string;
    street?: string;
    city?: string;
    neighborhood?: string;
    bio?: string;
  };
  const [formData, setFormData] = useState<FormDataState | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const result = await userApi.getById(id);
        const fetchedUser = Array.isArray(result) ? result[0] : result;
        if (!fetchedUser) throw new Error("Usuário não encontrado");
        setUser(fetchedUser);
        setFormData({
          fullname: fetchedUser.fullname,
          age: fetchedUser.age,
          state: fetchedUser.state,
          street: fetchedUser.street,
          city: fetchedUser.city,
          neighborhood: fetchedUser.neighborhood,
          bio: fetchedUser.bio,
        });
      } catch (error) {
        setMessage(`Erro ao carregar usuário: ${error}`);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchUser();
  }, [id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...(prev || {}),
      [name]: value,
    }));
  };

  const clearFileInput = () => {
    setAvatarPreview(null);
    setAvatarFile(null);
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUpdating(true);
    setMessage("");

    const changed: Record<string, string> = {};
    Object.entries(formData || {}).forEach(([key, value]) => {
      const original = user?.[key as keyof User] ?? "";
      if (typeof value === "string" && value.trim() !== "" && value.trim() !== original) {
        if (key === "age") {
          changed[key] = new Date(value).toISOString();
        } else {
          changed[key] = value.trim();
        }
      }
    });

    if (Object.keys(changed).length === 0 && !avatarFile) {
      setMessage("Nenhuma alteração detectada.");
      setUpdating(false);
      return;
    }

    try {
      if (avatarFile) {
        const fd = new FormData();
        Object.entries(formData || {}).forEach(([k, v]) => {
          if (typeof v === "string" && v.trim() !== "") {
            fd.append(k, v);
          }
          if (v instanceof Date) {
            fd.append(k, v.toISOString());
          }
        });
        fd.append("avatar", avatarFile);
        await userApi.updateWithFormData(id, fd);
      } else {
        await userApi.update(id, changed);
      }
      setMessage("Usuário atualizado com sucesso!");
      setTimeout(() => router.push(`/seeuser/${id}`), 1200);
    } catch {
      setMessage("Erro ao atualizar usuário");
    } finally {
      setUpdating(false);
    }
  };

  if (loading || !formData) {
    return <Loading />;
  }

  if (!user) {
    return (
      <div className="max-w-md mx-auto mt-10 p-6 bg-red-100 text-red-800 rounded shadow text-center">
        Usuário não encontrado
      </div>
    );
  }
  return (
    <div className="w-full max-w-3xl mx-auto p-2 sm:p-4 md:p-6 text-neutral-100 rounded-lg">
      <h1 className="text-3xl sm:text-4xl font-extrabold mb-8 text-center tracking-tight text-neutral-200 drop-shadow-lg">
        Editar Usuário
      </h1>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-6 bg-gradient-to-br from-neutral-900 via-neutral-950 to-black p-4 sm:p-8 rounded-2xl shadow-2xl border border-neutral-800 relative overflow-hidden"
        encType="multipart/form-data"
      >
        <div className="flex flex-col items-center gap-2 z-10">
          <div className="flex flex-col items-center gap-2 w-full">
            <label className="block text-sm font-semibold mb-1 text-neutral-400">Foto de perfil</label>
            <button
              type="button"
              className={`w-full py-2 rounded-lg font-semibold border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-neutral-400/60 ${
                avatarPreview
                  ? "bg-neutral-700 text-white hover:bg-neutral-800 border-neutral-500"
                  : "bg-neutral-200 text-neutral-700 hover:bg-neutral-300 border-neutral-300"
              }`}
              onClick={() => setModalOpen(true)}
            >
              {avatarPreview ? "Alterar foto" : "Nenhum arquivo selecionado"}
            </button>
            <FileInputModal
              open={modalOpen}
              onClose={() => setModalOpen(false)}
              onFileChange={(file) => {
                if (file) {
                  setAvatarPreview(URL.createObjectURL(file));
                  setAvatarFile(file);
                }
              }}
            />
          </div>
          {avatarPreview && (
            <div className="flex flex-col items-center gap-2">
              <Image
                src={avatarPreview}
                width={96}
                height={96}
                alt="Preview do avatar"
                className="w-24 h-24 rounded-full object-cover border-2 border-neutral-400 mt-2 shadow-lg"
              />

              <button
                onClick={clearFileInput}
                className="bg-neutral-800 px-4 py-1 rounded-xl font-semibold text-white hover:bg-neutral-900 transition-all border border-neutral-600"
              >
                Limpar
              </button>
            </div>
          )}
        </div>
        <div className="flex flex-col gap-1 w-full">
          <div className="w-full">
            <Input
              label="Nome completo"
              type="text"
              name="fullname"
              value={formData.fullname}
              onChange={handleInputChange}
              placeholder="Informe seu nome completo."
            />
          </div>

          <div className="w-full flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input
                label="Data de Nascimento"
                type="date"
                name="age"
                value={
                  formData.age
                    ? typeof formData.age === "string"
                      ? formData.age.slice(0, 10)
                      : formData.age instanceof Date
                      ? formData.age.toISOString().slice(0, 10)
                      : ""
                    : ""
                }
                onChange={handleInputChange}
                placeholder="Data de nascimento"
              />
            </div>
            <div className="flex-1">
              <Input
                label="Estado"
                type="text"
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                placeholder="Informe o nome do estado"
              />
            </div>
          </div>

          <div className="w-full">
            <Input
              label="Rua"
              type="text"
              name="street"
              value={formData.street}
              onChange={handleInputChange}
              placeholder="Informe o nome da rua"
            />
          </div>

          <div className="w-full flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input
                label="Cidade"
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                placeholder="Informe o nome da cidade"
              />
            </div>
            <div className="flex-1">
              <Input
                label="Bairro"
                type="text"
                name="neighborhood"
                value={formData.neighborhood}
                onChange={handleInputChange}
                placeholder="Informe o nome do bairro"
              />
            </div>
          </div>

          <div className="w-full">
            <label className="block text-sm font-semibold mb-1 text-neutral-400">Biografia</label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleInputChange}
              placeholder="Conte um pouco sobre você..."
              className="w-full p-2 border border-neutral-700 rounded-lg h-24 focus:ring-2 focus:ring-neutral-400/60 bg-neutral-950 text-neutral-100"
            />
          </div>

          <div className="flex gap-4 mt-4">
            <button
              type="submit"
              disabled={updating}
              className="flex-1 bg-neutral-800 text-white py-2 px-4 rounded-lg hover:bg-neutral-900 disabled:opacity-50 font-bold shadow-lg transition-all text-lg border border-neutral-700"
            >
              {updating ? "Atualizando..." : "Atualizar Usuário"}
            </button>
            <button
              type="button"
              onClick={() => router.push(`/seeuser/${id}`)}
              className="flex-1 bg-neutral-700 text-white py-2 px-4 rounded-lg hover:bg-neutral-800 font-bold shadow-lg text-lg border border-neutral-600"
            >
              Cancelar
            </button>
          </div>
        </div>
      </form>

      {message && (
        <div
          className={`mt-4 p-3 rounded-lg font-semibold shadow-lg text-center ${
            message.includes("sucesso") ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
          }`}
        >
          {message}
        </div>
      )}
    </div>
  );
}
