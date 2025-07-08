import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header/Header";

export const metadata: Metadata = {
  title: "MyUser - CRUD de Usuários",
  description: "Desafio de CRUD de usuários",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen bg-gradient-to-br to- from-neutral-950 bg-neutral-800 flex flex-col flex-1 w-full">
        <div>
          <Header />
        </div>
        <div className="flex flex-1 justify-center items-center w-full flex-col">{children}</div>
      </body>
    </html>
  );
}
