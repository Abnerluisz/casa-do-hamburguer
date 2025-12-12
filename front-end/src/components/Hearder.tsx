import { Link, useLocation, useNavigate } from "react-router";
import { UserContext } from "../context/UserContext";
import { useContext, useEffect } from "react";
import { LogOut, ShoppingCart, Box, LayoutDashboard, Plus } from "lucide-react";

const Header = () => {
  const { user } = useContext(UserContext);
  const { setUser } = useContext(UserContext);
  const location = useLocation();
  const navigate = useNavigate();

  const handleAuthUser = async () => {
    try {
      const response = await fetch("http://localhost:3000/me", {
        credentials: "include",
      });

      if (response.status !== 200) {
        navigate("/login");
        return;
      }

      const data = await response.json();

      setUser(data);
    } catch (error) {
      throw error;
    }
  };

  const handleLogoutUser = async () => {
    const response = await fetch("http://localhost:3000/logout", {
      credentials: "include",
      method: "POST",
    });

    switch (response.status) {
      case 200:
        setUser(null);
        navigate("/login");
        return;
      case 401:
        return;
      case 500:
        return;
    }
  };

  useEffect(() => {
    handleAuthUser();
  }, []);

  const getNavItemClass = (path: string) => {
    const baseClass =
      "flex h-[35px] w-[35px] cursor-pointer items-center justify-center rounded-md border";

    if (location.pathname === path) {
      return `${baseClass} bg-[#F2DAAC] text-[#161410]`;
    } else {
      return baseClass;
    }
  };

  return (
    <div className="bg-[#161410]">
      <div className="mx-auto flex w-full items-center justify-between p-3 md:w-[737px] md:p-0">
        <Link to="/">
          <img src="./logo.png" alt="" />
        </Link>

        {user ? (
          <div className="flex items-center justify-center gap-8 text-white">
            <div className="flex items-center gap-2 text-[#F2DAAC]">
              <Link to="/">
                <div className={getNavItemClass("/")}>
                  <Box size={18} />
                </div>
              </Link>

              <Link to="/pedidos">
                <div className={getNavItemClass("/pedidos")}>
                  <LayoutDashboard size={18} />
                </div>
              </Link>

              <div className="flex h-[35px] w-[35px] cursor-pointer items-center justify-center rounded-md border">
                <Plus size={18} />
              </div>
            </div>

            <div className="relative cursor-pointer">
              <ShoppingCart size={18} />
              <p className="absolute -top-3 -right-3 flex h-5 w-5 items-center justify-center rounded-full bg-[#F2DAAC] text-xs font-bold text-black">
                3
              </p>
            </div>

            <div className="flex items-center justify-center gap-2 text-white">
              <p className="text-white">{user?.name}</p>
              <LogOut
                size={18}
                className="cursor-pointer"
                onClick={() => handleLogoutUser()}
              />
            </div>
          </div>
        ) : (
          <Link to="/login">
            <div className="flex h-[35px] w-[130px] cursor-pointer items-center justify-center rounded-sm bg-[#F2DAAC] text-center hover:bg-amber-100 active:bg-[#99896b]">
              Entrar
            </div>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
