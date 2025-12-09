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

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log({ name, email, password, passwordConfirm, cep });
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
        />
        <Input
          placeholder="E-mail"
          type="email"
          onChange={(email) => setEmail(email.target.value)}
        />
        <Input
          placeholder="Senha"
          type="password"
          onChange={(password) => setPassword(password.target.value)}
        />
        <Input
          placeholder="Confirmar Senha"
          type="password"
          onChange={(passwordConfirm) =>
            setConfirmPassword(passwordConfirm.target.value)
          }
        />
        <Input
          placeholder="CEP"
          type="text"
          onChange={(cep) => setCep(cep.target.value)}
        />
        <Button title="Criar conta" />
        <Link to="/Login" className="w-full">
          <Button title="Já tenho uma conta" variant="outline" />
        </Link>
      </div>
    </form>
  );
};

export default Register;
