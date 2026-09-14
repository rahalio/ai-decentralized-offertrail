type BrandMarkProps = {
  size?: 'sm' | 'lg';
  onDark?: boolean;
};

export function BrandMark({ size = 'sm', onDark = false }: BrandMarkProps) {
  const fontSize = size === 'lg' ? '2.4rem' : '1.15rem';
  return (
    <div
      className="brand-mark"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.55rem',
        color: onDark ? 'var(--color-panel)' : 'var(--color-brand)',
        fontFamily: 'var(--font-display)',
        fontSize,
        fontWeight: 700,
        letterSpacing: '-0.03em',
      }}
    >
      <span
        aria-hidden
        style={{
          width: size === 'lg' ? 18 : 12,
          height: size === 'lg' ? 28 : 18,
          borderRadius: 3,
          background: 'var(--color-brand)',
          boxShadow: '2px 2px 0 var(--color-foliage-dim)',
        }}
      />
      Offertrail
    </div>
  );
}
