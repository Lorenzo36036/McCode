import { JSX } from "react";

const QuickStat = ({
  label,
  value,
  color,
  icon,
}: {
  label: string;
  value: string;
  color: string;
  icon: JSX.Element;
}) => (
  <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
    <div
      className={`flex items-center gap-2 ${color} mb-1 uppercase font-black text-[9px] tracking-widest`}
    >
      {icon} {label}
    </div>
    <div className="text-xl font-black text-gray-800">{value}</div>
  </div>
);

export default QuickStat;
