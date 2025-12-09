import { Link } from "react-router";

export const Header = () => {
  return (
    <div className="bg-[#161410]">
      <div className="mx-auto flex w-full items-center justify-between p-3 md:w-[737px] md:p-0">
        <img src="./logo.png" alt="" />

        <Link to="/login">
          <div className="flex h-[35px] w-[130px] cursor-pointer items-center justify-center rounded-sm bg-[#F2DAAC] text-center hover:bg-amber-100 active:bg-[#99896b]">
            Entrar
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Header;
