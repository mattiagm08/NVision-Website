export default function NBold({ children }: { children: React.ReactNode }) {
  return (
    <strong className="text-slate-800 font-semibold">
      {children}
    </strong>
  );
}