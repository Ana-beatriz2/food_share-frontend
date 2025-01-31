import { Outlet } from "react-router-dom";
import Logo from "@/components/ui/logo";

export default function AuthLayout() {
  return (
    <div className="flex flex-col items-center pb-72 tracking-tighter text-yellow-800 bg-orange-50 max-md:pb-24">
      <header className="flex z-10 flex-wrap gap-5 justify-between items-start self-stretch pr-20 pb-8 pl-8 w-full text-amber-200 whitespace-nowrap bg-lime-500 max-md:px-5 max-md:max-w-full">
      </header>
      <Outlet />
    </div>
  );
}
