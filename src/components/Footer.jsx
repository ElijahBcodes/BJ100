'use client';

import { useState } from 'react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribedMsg, setSubscribedMsg] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribedMsg(`Thank you! Updates will be sent to ${email}.`);
      setEmail('');
    }
  };

  return (
    <footer className="site-footer">
      <div className="container footer-container">
        <div className="footer-top-grid">
          <div className="footer-brand-col">
            <div className="footer-brand">
              <span className="footer-logo-icon">🚵‍♂️ 🎗️ 🏃‍♀️</span>
              <h3>THE BRICE JERNIGAN 100</h3>
            </div>
            <p className="footer-desc">
              An annual hundred-mile mountain bike & ultramarathon celebration of life in San Diego&apos;s Los Peñasquitos Canyon. Dedicated forever to the memory and spirit of Brice Jernigan.
            </p>
            <div className="promise-tagline">
              “We promised you a party, Brice. We’re keeping our word.”
            </div>
          </div>

          <div className="footer-nav-col">
            <h4>Race Weekend</h4>
            <ul>
              <li><a href="#showdown">Runners vs. Bikers</a></li>
              <li><a href="#calculator">Showdown Index</a></li>
              <li><a href="#course">Course Map & Vert</a></li>
              <li><a href="#party">Brice&apos;s Race Party</a></li>
              <li><a href="#register">Register to Race</a></li>
            </ul>
          </div>

          <div className="footer-nav-col">
            <h4>Charity & Memory</h4>
            <ul>
              <li><a href="#promise">The Story & Promise</a></li>
              <li><a href="#fundraiser">Sponsor a Mile</a></li>
              <li><a href="#tributes">Tribute Wall</a></li>
              <li><a href="https://afsp.org" target="_blank" rel="noopener noreferrer">AFSP San Diego</a></li>
              <li><a href="https://988lifeline.org" target="_blank" rel="noopener noreferrer">988 Lifeline</a></li>
            </ul>
          </div>

          <div className="footer-cta-col">
            <h4>Stay Connected</h4>
            <p>Get race updates, volunteer opportunities, and fundraising milestones.</p>
            <form className="footer-subscribe-form" onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Enter your email"
                required
                className="subscribe-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button type="submit" className="btn btn-primary btn-sm">Subscribe</button>
            </form>
            {subscribedMsg && <div className="subscribe-msg">{subscribedMsg}</div>}
          </div>
        </div>

        <div className="footer-bottom-bar">
          <div className="copyright">
            © 2026 The Brice Jernigan 100 Memorial Foundation. A registered 501(c)(3) nonprofit event in San Diego, CA.
          </div>
          <div className="footer-legal">
            <span>In loving memory of Brice Jernigan</span> •
            <span>Ride on, Brother</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
