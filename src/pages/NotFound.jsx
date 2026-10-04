import { Link } from "react-router-dom";
import { usePageMeta } from "@/hooks/usePageMeta";

export default function NotFound() {
  usePageMeta("Page not found");
  return (
    <div className="mx-auto max-w-xl px-4 py-20 text-center">
      <p className="text-[56px] font-extrabold text-accent">404</p>
      <h1 className="text-xl font-bold">This page does not exist</h1>
      <p className="mt-2 text-muted">Check the address, or go back to the directory.</p>
      <div className="mt-5 flex justify-center gap-2"><Link to="/" className="btn btn-primary">Home</Link><Link to="/businesses" className="btn btn-outline">Directory</Link></div>
    </div>
  );
}
