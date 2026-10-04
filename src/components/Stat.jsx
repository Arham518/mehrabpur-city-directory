import { SRC } from "@/data/city";
import { SourceLink } from "./Ui";

export function Stat({ label, value, sub, src }) {
  return (
    <div className="panel p-4">
      <p className="text-[12px] font-semibold uppercase tracking-wider text-muted">{label}</p>
      <p className="mt-1 text-[24px] font-extrabold leading-none tracking-tight tabular-nums">{value}</p>
      {sub && <p className="mt-1.5 text-[12.5px] text-muted">{sub}</p>}
      {src && <p className="mt-1.5 text-[11.5px]">Source: <SourceLink s={SRC[src]} /></p>}
    </div>
  );
}
