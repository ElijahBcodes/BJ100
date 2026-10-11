'use client';

import { useState } from 'react';

export default function Header({ onOpenDonate, onOpenRegister }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <header className="site-header" id="main-header">
      <div className="container header-container">
        <a href="#hero" className="brand-logo" aria-label="The Brice Jernigan 100 Homepage" onClick={closeMenu}>
          <div className="logo-mark">
            <svg className="bike-wheel-icon" viewBox="0 0 40 40" fill="none">
              <circle cx="20" cy="20" r="17" stroke="currentColor" strokeWidth="2.5" strokeDasharray="3 3"/>
              <circle cx="20" cy="20" r="6" stroke="currentColor" strokeWidth="2.5"/>
              <line x1="20" y1="3" x2="20" y2="37" stroke="currentColor" strokeWidth="1.5"/>
              <line x1="3" y1="20" x2="37" y2="20" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M20 14 C16 14 13 18 13 22 C13 26 17 29 20 29 C23 29 27 26 27 22 C27 18 24 14 20 14" fill="#f59e0b" opacity="0.35"/>
            </svg>
            <span className="ribbon-badge" title="Suicide Prevention Ribbon">🎗️</span>
          </div>
          <div className="brand-text">
            <span className="brand-title">THE BRICE JERNIGAN 100</span>
            <span className="brand-sub">SAN DIEGO • PQ CANYON • CHARITY ULTRA & MTB</span>
          </div>
        </a>

        <nav className={`main-nav ${mobileMenuOpen ? 'mobile-active' : ''}`} id="main-nav" aria-label="Main Navigation">
          <a href="#promise" className="nav-link" onClick={closeMenu}>The Promise</a>
          <a href="#showdown" className="nav-link" onClick={closeMenu}>Runners vs. Bikers</a>
          <a href="#calculator" className="nav-link" onClick={closeMenu}>Showdown Index</a>
          <a href="#course" className="nav-link" onClick={closeMenu}>PQ Course</a>
          <a href="#party" className="nav-link" onClick={closeMenu}>Brice&apos;s Race Party</a>
          <a href="#fundraiser" className="nav-link" onClick={closeMenu}>Fundraising</a>
          <a href="#tributes" className="nav-link" onClick={closeMenu}>Tributes</a>
        </nav>

        <div className="header-cta-group">
          <button type="button" className="btn btn-secondary btn-sm" onClick={onOpenDonate}>Donate</button>
          <button type="button" className="btn btn-primary btn-sm" onClick={onOpenRegister}>Register</button>
          <button
            type="button"
            className="mobile-menu-toggle"
            aria-label="Toggle navigation menu"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>
    </header>
  );
}
