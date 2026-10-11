'use client';

export default function CrisisCallout() {
  return (
    <section className="section crisis-callout-section" id="crisis-support">
      <div className="container">
        <div className="crisis-card-feature">
          <div className="cc-badge">IMMEDIATE HELP • CONFIDENTIAL • 24/7</div>
          <h2>If you are struggling today, please stay.</h2>
          <p>
            Depression lies. It whispers that people would be better off without you, or that the pain will never end. Brice&apos;s passing left a hole in our hearts that can never be replaced. If you are hurting, talk to someone right now.
          </p>

          <div className="crisis-cta-buttons">
            <a href="tel:988" className="btn btn-warning btn-lg">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
              <span>Call or Text 988 (Lifeline)</span>
            </a>
            <a href="sms:741741?body=HOME" className="btn btn-outline btn-lg">
              <span>Text HOME to 741741 (Crisis Text Line)</span>
            </a>
            <a href="tel:8887247240" className="btn btn-outline btn-lg">
              <span>San Diego Access & Crisis: (888) 724-7240</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
