import { MessageSquareWarning } from "lucide-react";

interface Props {
  type?: "success" | "danger" | "warning";
  message: string;
  setClose: (close: boolean) => void;
}

const Toast = ({ type = "success", message, setClose }: Props) => {
  const configs = {
    success: {
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      ),
      colors: "text-emerald-500 bg-emerald-50",
      borderColor: "border-gray-400",
      text: "¡Éxito!",
    },
    danger: {
      icon: <MessageSquareWarning />,
      colors: "text-[#e35151] bg-red-50",
      borderColor: "border-red-400",
      text: "Error",
    },
    warning: {
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
        />
      ),
      colors: "text-amber-500 bg-amber-50",
      borderColor: "border-amber-400",
      text: "Atención",
    },
  };

  const config = configs[type];

  return (
    <div
      className={`flex items-center w-full max-w-sm p-4 bg-white rounded-2xl shadow-xl border ${config.borderColor} animate-in fade-in slide-in-from-top-4`}
    >
      <div
        className={`inline-flex items-center justify-center shrink-0 w-8 h-8 rounded-xl ${config.colors}`}
      >
        <svg
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="3"
        >
          {config.icon}
        </svg>
      </div>
      <div className="ms-3">
        <p
          className={`${config.colors} text-[10px] font-bold  uppercase tracking-widest leading-none`}
        >
          {config.text}
        </p>
        <p className="text-sm font-black italic uppercase tracking-tight text-gray-800 leading-tight">
          {message}
        </p>
      </div>
      <button
        onClick={() => setClose(false)}
        className="ms-auto text-gray-400 hover:text-gray-900 p-1.5 hover:bg-gray-50 rounded-lg transition-colors"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
};

export default Toast;
