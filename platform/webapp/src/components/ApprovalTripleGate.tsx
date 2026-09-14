import type { ApprovalDecision, ApprovalRecord, ApprovalRole } from '@/api/types';

const ROLES: ApprovalRole[] = ['business', 'privacy', 'technology'];

type ApprovalTripleGateProps = {
  records: ApprovalRecord[];
  onDecide: (role: ApprovalRole, decision: ApprovalDecision) => void;
  busy?: boolean;
};

export function ApprovalTripleGate({ records, onDecide, busy }: ApprovalTripleGateProps) {
  return (
    <div className="stack">
      {ROLES.map((role) => {
        const record = records.find((r) => r.role === role);
        const state =
          record?.decision === 'approved'
            ? 'is-approved'
            : record?.decision === 'rejected'
              ? 'is-rejected'
              : '';
        return (
          <div key={role} className={`gate-step ${state}`}>
            <div className="row" style={{ justifyContent: 'space-between' }}>
              <strong style={{ textTransform: 'capitalize' }}>{role}</strong>
              <span className="badge">{record?.decision ?? 'pending'}</span>
            </div>
            {record?.rationale ? <p style={{ marginTop: '0.4rem' }}>{record.rationale}</p> : null}
            {!record || record.decision === 'change_requested' ? (
              <div className="row" style={{ marginTop: '0.65rem' }}>
                <button
                  type="button"
                  className="btn"
                  disabled={busy}
                  onClick={() => onDecide(role, 'approved')}
                >
                  Approve
                </button>
                <button
                  type="button"
                  className="btn btn-coral"
                  disabled={busy}
                  onClick={() => onDecide(role, 'rejected')}
                >
                  Reject
                </button>
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
