type JourneyKpiStripProps = {
  optIns?: number | string;
  revokes?: number | string;
  fulfilments?: number | string;
};

export function JourneyKpiStrip({
  optIns = '—',
  revokes = '—',
  fulfilments = '—',
}: JourneyKpiStripProps) {
  return (
    <div
      className="row"
      style={{
        gap: '1rem',
        marginTop: '0.75rem',
        paddingTop: '0.75rem',
        borderTop: '1px solid var(--color-border)',
      }}
    >
      <Kpi label="Opt-in" value={optIns} tone="foliage" />
      <Kpi label="Revoke" value={revokes} tone="coral" />
      <Kpi label="Fulfil" value={fulfilments} tone="amber" />
    </div>
  );
}

function Kpi({
  label,
  value,
  tone,
}: {
  label: string;
  value: number | string;
  tone: 'foliage' | 'coral' | 'amber';
}) {
  const color =
    tone === 'foliage'
      ? 'var(--color-foliage-dim)'
      : tone === 'coral'
        ? 'var(--color-coral)'
        : 'var(--color-amber)';
  return (
    <div style={{ minWidth: 64 }}>
      <div className="muted" style={{ fontSize: '0.72rem', textTransform: 'uppercase' }}>
        {label}
      </div>
      <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', color }}>{value}</div>
    </div>
  );
}
