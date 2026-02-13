"use client";
import React, { useState } from "react";
import { LayoutDashboard, History, LogOut, Menu, X } from "lucide-react";
import Link from "next/link";
import { redirect, usePathname } from "next/navigation";

interface MenuOption {
  id: string;
  name: string;
  url: string;
  icon: React.ReactNode;
  variant?: "default" | "exit";
}

const Sidebar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const menuOptions: MenuOption[] = [
    {
      id: "principal",
      name: "Principal",
      url: "/admin/dashboard",
      icon: <LayoutDashboard size={20} />,
      variant: "default",
    },
    {
      id: "historial",
      name: "Historial",
      url: "/admin/order-history",
      icon: <History size={20} />,
      variant: "default",
    },
    {
      id: "logout",
      name: "Cerrar Sesión",
      url: "/logout",
      icon: <LogOut size={20} />,
      variant: "exit",
    },
  ];

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="xl:hidden fixed top-4 left-4 z-50 p-2 bg-[#e35151] text-white rounded-xl shadow-lg"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 xl:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`
         fixed top-0 left-0 h-screen bg-white border-r border-gray-100 flex flex-col z-40 transition-all duration-300
        ${isOpen ? "w-72 translate-x-0" : "-translate-x-full xl:translate-x-0 xl:w-72"}
      `}
      >
        <nav className="flex-1 px-4 flex flex-col justify-between py-24 lg:py-6 overflow-y-auto">
          <div className="space-y-2">
            <h3 className="px-4 text-[0.8rem] font-black uppercase text-gray-400 tracking-widest mb-4">
              Menú Administrativo
            </h3>

            {menuOptions
              .filter((opt) => opt.variant === "default")
              .map((option) => (
                <Link
                  href={option.url}
                  key={option.id}
                  onClick={() => {
                    setIsOpen(false);
                  }}
                  className={`
                    w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl font-bold transition-all whitespace-nowrap
                    ${
                      pathname === option.url
                        ? "bg-[#e35151] text-white shadow-xl shadow-red-100"
                        : "text-gray-400 hover:bg-gray-50 hover:text-gray-600"
                    }
                  `}
                >
                  <div className="shrink-0">{option.icon}</div>
                  <span className="text-sm">{option.name}</span>
                </Link>
              ))}
          </div>

          <div className="pt-6 border-t border-gray-50">
            {menuOptions
              .filter((opt) => opt.variant === "exit")
              .map((option) => (
                <button
                  onClick={() => {
                    redirect("/login");
                  }}
                  key={option.id}
                  className="flex items-center gap-4 w-full px-4 py-3.5 text-gray-400 font-bold hover:text-[#e35151] hover:bg-red-50 rounded-2xl transition-all group whitespace-nowrap"
                >
                  <div className="group-hover:-translate-x-1 transition-transform shrink-0">
                    {option.icon}
                  </div>
                  <span className="text-sm">{option.name}</span>
                </button>
              ))}
          </div>
        </nav>
      </aside>

      <div className="hidden xl:block w-72 h-screen" />
    </>
  );
};

export default Sidebar;
