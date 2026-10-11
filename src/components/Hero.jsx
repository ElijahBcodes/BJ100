'use client';

import { useState, useEffect } from 'react';

export default function Hero({ totalRaised, onOpenRegister, onOpenDonate }) {
  const [daysLeft, setDaysLeft] = useState(246);

  useEffect(() => {
    const targetDate = new Date('2026-10-24T06:00:00-07:00').getTime();
    const updateCountdown = () => {
      const now = new Date().getTime();
      const diff = targetDate - now;
      if (diff > 0) {
        setDaysLeft(Math.floor(diff / (1000 * 60 * 60 * 24)));
      } else {
        setDaysLeft(0);
      }
    };
    updateCountdown();
    const timer = setInterval(updateCountdown, 60000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="hero-section" id="hero">
      <div className="hero-bg-media">
        <img
          src="/assets/hero.jpg"
          alt="Trail runner and mountain biker riding side-by-side on golden hour dirt trails in Los Peñasquitos Canyon"
          className="hero-img"
        />
        <div className="hero-overlay"></div>
      </div>

      <div className="container hero-content">
        <div className="hero-pill-badge animate-fade-in">
          <span className="pill-dot"></span>
          <span>San Diego, California • Los Peñasquitos Canyon Preserve</span>
        </div>

        <h1 className="hero-title animate-fade-up">
          100 Miles. Two Disciplines.<br />
          <span className="gradient-text">One Promise to Brice.</span>
        </h1>

        <p className="hero-lead animate-fade-up delay-1">
          A one-of-a-kind 100-mile endurance showdown pitting <strong>Ultra Trail Runners</strong> against <strong>Mountain Bikers</strong> across separate race days in San Diego&apos;s legendary PQ Canyon. We made Brice a sacred promise: if depression ever took his life, we&apos;d throw the most relentless, joyous race party in his honor.
        </p>

        <div className="hero-disciplines-grid animate-fade-up delay-2">
          <div className="discipline-card mtb-card">
            <div className="card-icon">🚵‍♂️</div>
            <div className="card-meta">
              <span className="day-tag">SATURDAY • OCT 24, 2026</span>
              <h3>The Spokes: 100M MTB</h3>
              <p>Technical singletrack, punchy fire road grinds, and canyon flow. 14-Hour Cutoff.</p>
            </div>
          </div>
          <div className="discipline-vs">VS</div>
          <div className="discipline-card runner-card">
            <div className="card-icon">🏃‍♀️</div>
            <div className="card-meta">
              <span className="day-tag">SUNDAY • OCT 25, 2026</span>
              <h3>The Treads: 100M Ultra</h3>
              <p>Relentless foot endurance over identical canyon terrain & climbs. 30-Hour Cutoff.</p>
            </div>
          </div>
        </div>

        <div className="hero-actions animate-fade-up delay-3">
          <button type="button" className="btn btn-primary btn-lg" onClick={() => onOpenRegister('all')}>
            <span>Register for the 100</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
          <button type="button" className="btn btn-outline btn-lg" onClick={onOpenDonate}>
            <span>Donate to Suicide Prevention</span>
            <span className="heart-icon">💛</span>
          </button>
          <a href="#showdown" className="hero-explore-link">
            <span>See How We Stack Up</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M7 13l5 5 5-5M7 6l5 5 5-5"/>
            </svg>
          </a>
        </div>

        <div className="hero-stats-bar glass-panel animate-fade-up delay-4">
          <div className="stat-item">
            <span className="stat-value">{daysLeft}</span>
            <span className="stat-label">Days to Race Weekend</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <span className="stat-value">100 Mi</span>
            <span className="stat-label">11,400&apos; Total Vert</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item highlight-fund">
            <span className="stat-value">${totalRaised.toLocaleString()}</span>
            <span className="stat-label">Raised for Suicide Prevention</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <span className="stat-value">100%</span>
            <span className="stat-label">Net Proceeds to Charity</span>
          </div>
        </div>
      </div>
    </section>
  );
}
