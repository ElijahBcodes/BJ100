'use client';

import { useState } from 'react';

export default function FundraiserSection({
  totalRaised,
  goalAmount = 100000,
  sponsoredMiles,
  onOpenSponsorModal
}) {
  const [selectedMile, setSelectedMile] = useState(42);

  const percentRaised = Math.min(100, (totalRaised / goalAmount) * 100).toFixed(1);
  const needed = Math.max(0, goalAmount - totalRaised);

  const selectedInfo = sponsoredMiles[selectedMile];

  return (
    <section className="section fundraiser-section" id="fundraiser">
      <div className="container">
        <div className="section-header text-center">
          <div className="section-tag">SAVING LIVES WITH EVERY MILE</div>
          <h2 className="section-title">The $100,000 Suicide Prevention Mission</h2>
          <p className="section-subtitle">
            100 miles in the dirt. $100,000 for life-saving suicide prevention programs. Here is exactly where your registration fees, donations, and pledges go.
          </p>
        </div>

        <div className="fund-meter-card glass-panel">
          <div className="meter-top-row">
            <div>
              <span className="meter-label">Total Raised To Date</span>
              <div className="meter-total">${totalRaised.toLocaleString()}</div>
            </div>
            <div className="text-right">
              <span className="meter-label">Our Memorial Goal</span>
              <div className="meter-goal">${goalAmount.toLocaleString()}</div>
            </div>
          </div>

          <div className="progress-bar-container">
            <div className="progress-bar-fill" style={{ width: `${percentRaised}%` }}>
              <span className="progress-shine"></span>
            </div>
          </div>

          <div className="meter-bottom-row">
            <span><strong>{percentRaised}%</strong> of goal achieved</span>
            <span><strong>${needed.toLocaleString()}</strong> needed to reach our milestone</span>
          </div>

          <div className="beneficiary-badges">
            <span className="beneficiary-tag">🎗️ American Foundation for Suicide Prevention (AFSP SD)</span>
            <span className="beneficiary-tag">📞 988 Suicide & Crisis Lifeline Training</span>
            <span className="beneficiary-tag">🚴 San Diego Trail Youth & Mental Health Fund</span>
          </div>
        </div>

        {/* Sponsor A Mile 100 Grid */}
        <div className="sponsor-mile-box">
          <div className="sponsor-header">
            <div>
              <h3>&quot;Sponsor a Mile for Brice&quot;</h3>
              <p>
                Dedicate one of the 100 miles to Brice or a loved one who fought with depression. Each mile is $100 and will have a custom wooden trail marker placed on course with your personal message.
              </p>
            </div>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => onOpenSponsorModal(selectedMile)}
            >
              Sponsor a Mile ($100)
            </button>
          </div>

          <div className="mile-grid-wrapper">
            <div className="mile-grid-legend">
              <span className="legend-item"><span className="legend-color sponsored"></span> Dedicated / Sponsored</span>
              <span className="legend-item"><span className="legend-color available"></span> Available to Sponsor</span>
              <span className="legend-item"><span className="legend-color selected"></span> Selected Mile</span>
            </div>

            <div className="mile-tiles-grid" aria-label="100 Mile Dedication Grid">
              {Array.from({ length: 100 }, (_, i) => i + 1).map((m) => {
                const isSponsored = !!sponsoredMiles[m];
                const isSelected = selectedMile === m;
                return (
                  <button
                    key={m}
                    type="button"
                    className={`mile-tile ${isSponsored ? 'sponsored' : 'available'} ${isSelected ? 'selected' : ''}`}
                    onClick={() => setSelectedMile(m)}
                    title={isSponsored ? `Mile ${m}: Sponsored by ${sponsoredMiles[m].sponsor}` : `Mile ${m}: Available to sponsor`}
                  >
                    {m}
                  </button>
                );
              })}
            </div>

            <div className="mile-detail-preview glass-panel">
              {selectedInfo ? (
                <div className="preview-active">
                  <div>
                    <div className="preview-mile-title">Mile {selectedMile} of 100 • DEDICATED</div>
                    <p className="preview-mile-dedication">“{selectedInfo.msg}”</p>
                    <span className="preview-mile-sponsor">
                      Dedicated by: <strong>{selectedInfo.sponsor}</strong>
                    </span>
                  </div>
                  <button
                    type="button"
                    className="btn btn-secondary btn-sm"
                    onClick={() => onOpenSponsorModal(selectedMile)}
                  >
                    Sponsor Another Mile
                  </button>
                </div>
              ) : (
                <div className="preview-active">
                  <div>
                    <div className="preview-mile-title">Mile {selectedMile} of 100 • AVAILABLE TO SPONSOR</div>
                    <p className="preview-mile-dedication" style={{ color: '#cbd5e1', fontStyle: 'normal' }}>
                      Place your custom dedication sign on Mile {selectedMile} along the race course in PQ Canyon.
                    </p>
                    <span className="preview-mile-sponsor">
                      100% benefits suicide prevention programs ($100 tax-deductible).
                    </span>
                  </div>
                  <button
                    type="button"
                    className="btn btn-primary btn-sm"
                    onClick={() => onOpenSponsorModal(selectedMile)}
                  >
                    Sponsor Mile {selectedMile} for $100
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
