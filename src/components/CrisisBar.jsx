'use client';

export default function CrisisBar({ onOpenCrisisModal }) {
  return (
    <aside className="crisis-bar" role="complementary" aria-label="Crisis Support Information">
      <div className="container crisis-bar-inner">
        <div className="crisis-message">
          <span className="pulse-dot" aria-hidden="true"></span>
          <strong>You are never alone.</strong> If you or someone you love is hurting or in crisis, help is free, confidential, and available 24/7.
        </div>
        <div className="crisis-actions">
          <a href="tel:988" className="crisis-btn" id="crisis-call-btn">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
            </svg>
            Call or Text <strong>988</strong> Lifeline
          </a>
          <button type="button" className="crisis-info-link" onClick={onOpenCrisisModal}>
            Find Local Resources
          </button>
        </div>
      </div>
    </aside>
  );
}
