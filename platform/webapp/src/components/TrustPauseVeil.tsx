import type { ReactNode } from 'react';

type TrustPauseVeilProps = {
  paused: boolean;
  label?: string;
  children: ReactNode;
};

export function TrustPauseVeil({ paused, label = 'Offer class paused', children }: TrustPauseVeilProps) {
  return (
    <div className={`pause-veil ${paused ? 'is-paused' : ''}`} aria-live="polite">
      <span className="pause-label badge badge-coral">{label}</span>
      {children}
    </div>
  );
}
