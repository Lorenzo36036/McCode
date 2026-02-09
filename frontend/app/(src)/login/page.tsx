/* eslint-disable @next/next/no-img-element */
import React from "react";

const page = () => {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      <div className="order-1 flex flex-col justify-center px-10 lg:px-24 bg-white">
        <div className="max-w-md w-full mx-auto">
          <div className="mb-10 flex items-center gap-3">
            <div className="bg-[#e35151] p-2 rounded-xl flex items-center justify-center w-10 h-10">
              <svg
                viewBox="-40 60 85 135"
                className="w-6 h-6 text-white fill-current"
              >
                <path d="M-4.5,107.6c0,4-3.7,8.3-8.4,8.3v67.6c0,9.6-13.1,9.6-13.1,0v-67.6c-4.6,0-8.6-3.6-8.6-8.9V69.8c0-3.3,4.7-3.4,4.7,0.1v27.5 h3.9h4.6h-0.3V69.7c0-3.1,4.3-3.3,4.3,0.1v27.6h8.4V69.7c0-3,4.6-3.1,4.6,0.1V107.6z M36.5,78.4v105c0,9.3-13.1,9.2-13.1,0v-41.6 h-6.9V78.4C16.4,63.8,36.5,63.8,36.5,78.4" />
              </svg>
            </div>
            <span className="text-2xl font-black italic tracking-tighter text-[#e35151] uppercase">
              McLorenzo
            </span>
          </div>

          <form className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Correo electrónico
              </label>
              <input
                type="email"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#e35151] outline-none transition-all shadow-sm"
              />
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-bold text-gray-700">
                  Contraseña
                </label>
                <span className="text-sm font-bold text-[#e35151] cursor-pointer hover:underline">
                  ¿Olvidaste tu contraseña?
                </span>
              </div>
              <input
                type="password"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#e35151] outline-none transition-all shadow-sm"
              />
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-600 font-medium">
              <input
                type="checkbox"
                className="w-4 h-4 rounded border-gray-300 accent-[#e35151]"
              />
              <span>Recuérdame</span>
            </div>

            <button className="w-full bg-[#e35151] hover:bg-red-600 text-white font-black py-4 rounded-xl shadow-lg shadow-red-100 transition-all uppercase tracking-widest text-sm">
              Entrar
            </button>
          </form>
        </div>
      </div>

      <div className=" lg:order-2 hidden md:block relative  aspect-9/4 sm:aspect-square">
        <img
          src="/hamburguesa.jpg"
          alt="Login background"
          className="absolute inset-0 w-full h-full object-cover object-center sm:object  "
        />
        <div className="absolute inset-0 bg-linear-to from-black/20 to-transparent"></div>
      </div>
    </div>
  );
};

export default page;
