# Ínicio do projeto Back-end

## Instalação:

- Gerar o arquivo node **package.json**:

```bash
npm init -y
```

- Instalar a dependência como desenvolvimento do **Typescript**:

```bash
npm install typescript --save-dev
```

[Typescript download](https://www.typescriptlang.org/download/)

- Criar o **tsconfig.json** do typescript:

```bash
npx tsc --init
```

- Instalar o Framework **Express**:

```bash
npm i express
```

[Express download](https://www.npmjs.com/package/express)

> Instalar o manual da tipagem do Express:

```bash
npm i --save-dev @types/express
```

- Alterar o **CommumJS** para **ECMAScript** no `package.json`:

no `"type": "commonjs",` coloca para `"type": "module"` que é o ECMAScript.

```json
// ex package.json
{
  "name": "back-end",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "type": "commonjs",
  "devDependencies": {
    "@types/express": "^5.0.6",
    "typescript": "^5.9.3"
  },
  "dependencies": {
    "express": "^5.2.1"
  }
}
```

- Rodar o servidor NodeJs:

```bash
node index.ts
```

- Rodar o servidor NodeJs e escultar as alterações:

```bash
node --watch index.ts
```

ou

## Install o manual do typescript primeiro:

```bash
npm install tsx --save-dev
```

depois rode

```bash
npx tsx --watch index.ts
```

## Instalação Prisma:

- Instalação do **Prisma**:

[Docs: Prisma-PostgreSQL](https://www.prisma.io/docs/getting-started/prisma-orm/quickstart/postgresql)

### Rodar comando para instalar:

```bash
npm install prisma @types/node @types/pg --save-dev
npm install @prisma/client @prisma/adapter-pg pg dotenv
```

---

### Para enviar os ajuste do echema.prisma para o banco de dados:

> ele gera um historico do SQL command para segurança de um possível Rollback e também atualiza o banco de dados com novas tabela se caso foi criado.

```bash
npx prisma migrate dev
```

---

> Para enviar somente as alterações sem a necessedade de gerar a migration

```bash
npx prisma db push
npx prisma generate
```
