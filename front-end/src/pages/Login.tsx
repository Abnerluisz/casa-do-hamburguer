import Input from "../components/Input";
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router";
import Button from "../components/Button";
import { UserContext } from "../context/UserContext";

const Login = () => {
  const [email, setEmail] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const [error, setError] = useState("");

  const { setUser } = useContext(UserContext);

  console.log(document.cookie);

  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    try {
      e.preventDefault();

      if (!navigator.onLine) {
        setError("Você está offline. Verifique sua conexão.");
        return;
      }

      if (!email || !password) {
        setError("Usuário e senha são obrigatórios.");
        return;
      }

      const response = await fetch("http://localhost:3000/Login", {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      switch (response.status) {
        case 200:
          setError("");
          // ler as informações da resposta
          const data = await response.json();
          navigate("/");
          setUser(data);
          break;
        case 404:
          setError("Usuário não encontrado.");
          return;
        case 400:
          setError("Usuário e senha são obrigatórios.");
          return;
        case 401:
          setError("Usuário não encontrado.");
          return;
        case 500:
          setError("Tente novamente mais tarde.");
          return;
      }

      if (!response) {
        setError("Tente novamente mais tarde.");
        return;
      }
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
      <div className="flex flex-col justify-center gap-2">
        <Link to="/">
          <img src="./logo.png" alt="" className="mx-auto mb-4" />
        </Link>
        <div className="mb-2 flex flex-col gap-2">
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
        </div>

        <p className="text-sm font-bold text-red-500">{error}</p>
        <Button title="Login" variant="default" type="submit" />
        <Link to="/Register" className="w-full">
          <Button title="Não tem uma conta" variant="outline" />
        </Link>
      </div>
    </form>
  );
};

export default Login;
