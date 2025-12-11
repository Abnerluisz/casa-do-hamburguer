import { Link } from "react-router";
import Input from "../components/Input";
import { useState } from "react";
import Button from "../components/Button";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setConfirmPassword] = useState("");
  const [cep, setCep] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // console.log({ name, email, password, passwordConfirm, cep });

    if (!navigator.onLine) {
      setError("Você está offline. Verifique sua conexão.");
      return;
    }

    if (
      [name, email, password, passwordConfirm, cep].some((v) => v.trim() === "")
    ) {
      setError("Todas as informações são obrigatórias.");
      return;
    }

    if (password !== passwordConfirm) {
      setError("As senhas não coincidem.");
      setPassword("");
      setConfirmPassword("");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify({ name, email, password, passwordConfirm, cep }),
      });

      switch (response.status) {
        case 201:
          setError("");
          setName("");
          setEmail("");
          setPassword("");
          setConfirmPassword("");
          setCep("");
          break;
        case 400:
          setError("Todas as informações são obrigatórias.");
          break;
        case 409:
          setError("E-mail já existe.");
          break;
        case 500:
          setError("Tente novamente mais tarde.");
          break;
      }

      // ler as informações da resposta
      // const data = await response.json();
      // console.log(data);
    } catch (error) {
      setError("Tente novamente mais tarde.");
      console.error(error);
      return;
    }
  }
  return (
    <form
      className="flex h-screen items-center justify-center bg-[#161410]"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col items-center justify-center gap-2">
        <Link to="/">
          <img src="./logo.png" alt="" className="mb-4" />
        </Link>
        <Input
          placeholder="Nome"
          type="text"
          onChange={(name) => setName(name.target.value)}
          value={name}
        />
        <Input
          placeholder="E-mail"
          type="email"
          onChange={(email) => setEmail(email.target.value)}
          value={email}
        />
        <Input
          placeholder="Senha"
          type="password"
          onChange={(password) => setPassword(password.target.value)}
          value={password}
        />
        <Input
          placeholder="Confirmar Senha"
          type="password"
          onChange={(passwordConfirm) =>
            setConfirmPassword(passwordConfirm.target.value)
          }
          value={passwordConfirm}
        />
        <Input
          placeholder="CEP"
          type="text"
          onChange={(cep) => setCep(cep.target.value)}
          value={cep}
        />
        <p className="text-sm font-bold text-red-500">{error}</p>
        <div className="mt-2 flex w-full flex-col gap-2">
          <Button title="Criar conta" type="submit" />

          <Link to="/Login" className="w-full">
            <Button title="Já tenho uma conta" variant="outline" />
          </Link>
        </div>
      </div>
    </form>
  );
};

export default Register;
