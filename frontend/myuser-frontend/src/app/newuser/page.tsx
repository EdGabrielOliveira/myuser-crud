"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Image from "next/image";
import Input from "@/components/Input/Input";
import FileInputModal from "@/components/Input/FileInput";
import Loading from "@/components/Loading/Loading";

export default function NewUserPage() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const router = useRouter();

  const clearFileInput = () => {
    setAvatarPreview(null);
    setAvatarFile(null);
    const fileInput = document.querySelector('input[name="avatar"]') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const formData = new FormData(e.currentTarget);
    if (avatarFile) {
      formData.set("avatar", avatarFile);
    }

    try {
      await fetch("http://localhost:3001/user", {
        method: "POST",
        body: formData,
      });
      setMessage("Usuário criado com sucesso!");
      (e.target as HTMLFormElement).reset();
      setAvatarPreview(null);
      setAvatarFile(null);
      router.push("/allusers");
    } catch (error) {
      setMessage(`Erro ao criar usuário: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="w-full max-w-3xl mx-auto p-2 sm:p-4 md:p-6 text-neutral-100 rounded-lg">
      <h1 className="text-3xl sm:text-4xl font-extrabold mb-8 text-center tracking-tight text-neutral-200 drop-shadow-lg">
        Criar Novo Usuário
      </h1>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-6 bg-gradient-to-br from-neutral-900 via-neutral-950 to-black p-4 sm:p-8 rounded-2xl shadow-2xl border border-neutral-800 relative overflow-hidden"
        encType="multipart/form-data"
      >
        <div className="flex flex-col gap-1 z-10">
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

          <div className="w-full">
            <Input label="Nome Completo" type="text" name="fullname" placeholder="Informe seu nome completo" required />
          </div>

          <div className="w-full flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input label="Data de Nascimento" type="date" name="age" required />
            </div>
            <div className="flex-1">
              <Input label="Estado" type="text" name="state" placeholder="Informe o nome do estado" required />
            </div>
          </div>

          <div className="w-full">
            <Input label="Rua" type="text" name="street" placeholder="Informe o nome da rua" required />
          </div>

          <div className="w-full flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input label="Cidade" type="text" name="city" placeholder="Informe o nome da cidade" required />
            </div>
            <div className="flex-1">
              <Input label="Bairro" type="text" name="neighborhood" placeholder="Informe o nome do bairro" required />
            </div>
          </div>

          <div className="w-full">
            <label className="block text-sm font-semibold mb-1 text-neutral-400">Biografia</label>
            <textarea
              name="bio"
              placeholder="Conte um pouco sobre você..."
              className="w-full p-2 border border-neutral-700 rounded-lg h-24 focus:ring-2 focus:ring-neutral-400/60 bg-neutral-950 text-neutral-100"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-neutral-800 text-white py-2 px-4 rounded-lg hover:bg-neutral-900 disabled:opacity-50 font-bold shadow-lg transition-all text-lg mt-2 border border-neutral-700"
          >
            {loading ? "Criando..." : "Criar Usuário"}
          </button>
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
