import Input from "../components/Input";
import { useState } from "react";
import { Link } from "react-router";
import Button from "../components/Button";

const Login = () => {
  const [email, setEmail] = useState("Abner@gmail.com");
  const [password, setPassword] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log({ email, password });
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
          placeholder="E-mail"
          type="text"
          onChange={(email) => setEmail(email.target.value)}
        />
        <Input
          placeholder="Senha"
          type="password"
          onChange={(password) => setPassword(password.target.value)}
        />
        <Button title="Login" variant="default" />
        <Link to="/Register" className="w-full">
          <Button title="Não tem uma conta" variant="outline" />
        </Link>
      </div>
    </form>
  );
};

export default Login;
