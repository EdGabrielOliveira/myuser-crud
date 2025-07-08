import React from "react";
import Loader from "@/../public/loader.svg";
import Image from "next/image";

export default function Loading() {
  return (
    <div className="flex flex-col items-center">
      <Image src={Loader} width={64} alt="loader" className="invert-100 animate-spin" />
      <p className="text-neutral-100"> Carregando... </p>
      <p className="text-neutral-400 text-sm"> Por favor aguarde! </p>
    </div>
  );
}
