import React from "react";

interface InputProps {
  type?: string;
  name?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  label?: string;
  required?: boolean;
}

export default function Input({ type, name, value, onChange, placeholder, label, required }: InputProps) {
  return (
    <div className="w-full">
      <label className="block text-sm font-medium mb-1">{label}</label>
      <input
        required={required}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full p-2 border border-neutral-400 rounded focus:ring-2 focus:ring-blue-400"
      />
    </div>
  );
}
