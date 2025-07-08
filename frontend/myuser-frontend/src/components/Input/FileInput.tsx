import React, { useRef } from "react";

interface FileInputModalProps {
  open: boolean;
  onClose: () => void;
  onFileChange: (file: File | null) => void;
}

export default function FileInputModal({ open, onClose, onFileChange }: FileInputModalProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  if (!open) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.size > 1024 * 1024) {
      alert("O arquivo deve ter no máximo 1MB.");
      e.target.value = "";
      onFileChange(null);
      return;
    }
    onFileChange(file || null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 bg-opacity-60">
      <div className="bg-neutral-900 p-6 rounded-lg shadow-lg w-full max-w-sm flex flex-col items-center">
        <h2 className="text-lg font-semibold mb-4 text-white">Selecionar foto de perfil</h2>
        <input
          ref={inputRef}
          type="file"
          name="avatar"
          accept="image/png, image/jpeg, image/jpg"
          className="hidden"
          onChange={handleChange}
        />
        <button
          type="button"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 mb-2"
          onClick={() => inputRef.current?.click()}
        >
          Selecionar imagem
        </button>
        <p className="text-xs text-neutral-400 mb-2 text-center">
          A imagem não pode ser superior a 2MB. Formatos aceitos: PNG, JPEG e JPG
        </p>
        <button
          type="button"
          className="w-full bg-neutral-700 text-white py-2 rounded hover:bg-neutral-800"
          onClick={onClose}
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}
