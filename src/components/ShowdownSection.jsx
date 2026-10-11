'use client';

export default function ShowdownSection({ onOpenRegister }) {
  return (
    <section className="section showdown-section" id="showdown">
      <div className="container">
        <div className="section-header text-center">
          <div className="section-tag">TWO DISCIPLINES • ONE HUNDRED MILES</div>
          <h2 className="section-title">The Showdown: Runners vs. Mountain Bikers</h2>
          <p className="section-subtitle">
            They race on separate days to ensure trail safety and peak conditions. But can a 100-mile ultra runner beat a mountain biker? With our official <strong>Brice Handicap Index</strong>, the showdown is on.
          </p>
        </div>

        <div className="showdown-format-grid">
          {/* MTB Card */}
          <div className="format-card card-bike">
            <div className="format-header">
              <span className="format-badge">DAY 1: SATURDAY</span>
              <div className="format-icon-title">
                <div className="big-icon">🚵‍♂️</div>
                <div>
                  <h3>The 100-Mile MTB Challenge</h3>
                  <span className="subtext">The Spokes of PQ</span>
                </div>
              </div>
            </div>
            <div className="format-specs">
              <div className="spec-row">
                <span>Start Time:</span>
                <strong>6:00 AM (Sunrise Gun)</strong>
              </div>
              <div className="spec-row">
                <span>Course:</span>
                <strong>4 x 25-Mile Loops (PQ Canyon & Mesas)</strong>
              </div>
              <div className="spec-row">
                <span>Cutoff Time:</span>
                <strong>14 Hours (8:00 PM Saturday)</strong>
              </div>
              <div className="spec-row">
                <span>Average Pro Finish:</span>
                <strong>6 hrs 45 mins - 8 hrs 15 mins</strong>
              </div>
              <div className="spec-row">
                <span>Key Advantage:</span>
                <strong>Rolling flats, fast fire roads & descents</strong>
              </div>
              <div className="spec-row">
                <span>Greatest Threat:</span>
                <strong>Mechanicals, loose shale, steep hike-a-bike</strong>
              </div>
            </div>
            <div className="format-desc">
              Mountain bikers tackle the loose cobbles, creek crossings, and technical canyon ascents first. Every pedal stroke tests endurance and bike handling under the blazing Southern California sun.
            </div>
            <button
              type="button"
              className="btn btn-mtb btn-block"
              onClick={() => onOpenRegister('mtb-solo')}
            >
              Register as Mountain Biker
            </button>
          </div>

          {/* The Handicap Bridge / VS */}
          <div className="showdown-center-bridge">
            <div className="vs-circle">VS</div>
            <div className="bridge-info">
              <h4>The &quot;Brice Index&quot;</h4>
              <p>
                Opt-in at registration to pit your time head-to-head. An algorithmic handicap calibrates terrain velocity so runners and riders compete for the coveted <strong>Dual-Crown Memorial Trophy</strong>.
              </p>
              <div className="handicap-ratio">
                <span className="ratio-number">2.15x</span>
                <span className="ratio-label">Calibrated Course Ratio</span>
              </div>
              <a href="#calculator" className="jump-calc-link">
                Test Your Time in Calculator ↓
              </a>
            </div>
          </div>

          {/* Runner Card */}
          <div className="format-card card-run">
            <div className="format-header">
              <span className="format-badge">DAY 2: SUNDAY</span>
              <div className="format-icon-title">
                <div className="big-icon">🏃‍♀️</div>
                <div>
                  <h3>The 100-Mile Ultra Marathon</h3>
                  <span className="subtext">The Treads of PQ</span>
                </div>
              </div>
            </div>
            <div className="format-specs">
              <div className="spec-row">
                <span>Start Time:</span>
                <strong>5:00 AM (Dawn Wave)</strong>
              </div>
              <div className="spec-row">
                <span>Course:</span>
                <strong>4 x 25-Mile Loops (Identical Foot Route)</strong>
              </div>
              <div className="spec-row">
                <span>Cutoff Time:</span>
                <strong>30 Hours (11:00 AM Monday)</strong>
              </div>
              <div className="spec-row">
                <span>Average Pro Finish:</span>
                <strong>15 hrs 30 mins - 18 hrs 45 mins</strong>
              </div>
              <div className="spec-row">
                <span>Key Advantage:</span>
                <strong>Zero flat tires, agile boulder hopping</strong>
              </div>
              <div className="spec-row">
                <span>Greatest Threat:</span>
                <strong>Canyon heat, blisters, night navigation</strong>
              </div>
            </div>
            <div className="format-desc">
              On Sunday dawn, the ultrarunners take the very same dust. No mechanical failures—only pure heart, steady pacing, hydration, and mental stamina over 30 grueling continuous hours.
            </div>
            <button
              type="button"
              className="btn btn-run btn-block"
              onClick={() => onOpenRegister('run-solo')}
            >
              Register as Ultra Runner
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
