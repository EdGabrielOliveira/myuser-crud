export default function Home() {
  return (
    <main className=" flex items-center justify-center p-2">
      <div className="bg-gradient-to-br from-neutral-900 via-neutral-950 to-black rounded-2xl shadow-2xl p-5 sm:p-10 flex flex-col items-center gap-6 border border-neutral-700 w-full max-w-md sm:max-w-lg md:max-w-2xl relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-600/20 rounded-full blur-2xl z-0 animate-pulse" />
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-green-600/20 rounded-full blur-2xl z-0 animate-pulse" />
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white text-center z-10 drop-shadow-lg tracking-tight">
          MyUser
        </h1>
        <p className="text-neutral-200 text-center text-base sm:text-lg z-10 max-w-xl">
          Bem-vindo ao <b className="text-blue-400">MyUser</b>!<br />
          <span className="text-neutral-400">
            Um sistema simples e eficiente para cadastro, consulta e gerenciamento de usuários.
          </span>
        </p>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-4 w-full justify-center z-10">
          <a
            href="/allusers"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold shadow-lg transition text-center border border-blue-400/30 focus:outline-none focus:ring-2 focus:ring-blue-400/60"
          >
            Ver todos os usuários
          </a>
          <a
            href="/newuser"
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold shadow-lg transition text-center border border-green-400/30 focus:outline-none focus:ring-2 focus:ring-green-400/60"
          >
            Novo usuário
          </a>
        </div>
        <div className="mt-10 text-neutral-400 text-xs text-center z-10">
          <p>
            <b className="text-white">Desafio técnico para vaga da Sync360:</b>
            <br />
            criar um sistema completo de cadastro, edição, exclusão e visualização de usuários.
            <br />
            <span className="block mt-4">
              <b>Backend:</b> <span className="text-blue-300">NestJS, TypeScript, Prisma, MySQL, Docker</span>
              <br />
              <b>Frontend:</b> <span className="text-green-300">Next.js, React, TypeScript, TailwindCSS</span>
            </span>
          </p>
        </div>
      </div>
    </main>
  );
}
