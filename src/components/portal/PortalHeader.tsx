export function PortalHeader({
  name,
  fileNo,
}: {
  name: string;
  fileNo: string;
}) {
  return (
    <header className="flex items-center justify-between px-8 md:px-12 py-6 border-b border-tmc-gold/20 bg-tmc-ivory">
      <div className="text-[10px] uppercase tracking-[0.3em] text-tmc-muted">
        File ·{" "}
        <span className="text-tmc-green">{fileNo}</span>
      </div>
      <div className="text-[10px] uppercase tracking-[0.3em] text-tmc-muted">
        {name}
      </div>
    </header>
  );
}
