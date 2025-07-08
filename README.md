# CRUD de Usuários 

Este projeto é um desafio técnico para uma vaga, consistindo em um CRUD de usuários com suporte a upload de foto, desenvolvido com backend e frontend separados. O backend utiliza Docker para facilitar o setup do ambiente, incluindo a base de dados.

---

## 🛠️ Tecnologias Utilizadas

- **Backend:** Nest.js, TypeScript, Prisma ORM, MySQL e Docker
- **Frontend:** Next.js, React, TailwindCSS e TypeScript
- **Banco de Dados:** MySQL (dockerizado)
- **ORM:** Prisma

---

## 🚀 Como rodar o projeto

### Backend + Banco de Dados

1. Instale as dependências:
    ```bash
    bun install
    # ou
    npm install
    ```

2. Suba o backend e o banco de dados com o Docker:
    ```bash
    docker compose up -d --build
    ```

3. Crie um arquivo `.env` na raiz do backend e adicione:
    ```
    DATABASE_URL="mysql://root:myusersql@localhost:3306/myuser"
    ```

4. Rode as migrations do Prisma:
    ```bash
    npx prisma migrate dev --name init
    ```

- O backend estará rodando na porta **3001**
- O banco de dados estará disponível na porta **3306**

---

### Frontend

1. Instale as dependências:
    ```bash
    bun install
    # ou
    npm install
    ```

2. Crie um arquivo `.env` na raiz do frontend e adicione:
    ```
    NEXT_PUBLIC_API_URL=http://localhost:3001/
    ```

3. Rode o frontend:
    ```bash
    bun dev
    # ou
    npm run dev
    ```

- O frontend estará rodando na porta **3000**

---

## 📦 Funcionalidades

- CRUD completo de usuários (Criar, Listar, Editar, Deletar)
- Upload de foto de perfil para cada usuário
- Integração total com banco de dados MySQL via Prisma

---

## 💡 Observações

- Certifique-se de que as portas **3001** (backend) e **3306** (MySQL) estão livres para uso.
- O projeto utiliza Docker para simplificar o ambiente de desenvolvimento, não sendo necessário instalar o MySQL localmente.

---

## 👤 Autor

- [Gabriel Oliveira]

---

Sinta-se à vontade para entrar em contato caso tenha dúvidas ou sugestões!
