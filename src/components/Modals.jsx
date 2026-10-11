'use client';

import { useState } from 'react';

export default function Modals({
  activeModal,
  onCloseModal,
  onAddDonation,
  onAddTribute,
  onSponsorMile,
  selectedMileForSponsor,
  registerCategory,
  onShowToast
}) {
  // Donation Form State
  const [donAmount, setDonAmount] = useState(100);
  const [donorName, setDonorName] = useState('');
  const [donDedication, setDonDedication] = useState('');

  // Reg Form State
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regDiscipline, setRegDiscipline] = useState(registerCategory || 'mtb-solo');
  const [optInShowdown, setOptInShowdown] = useState(true);
  const [projectedTime, setProjectedTime] = useState('');
  const [regPledge, setRegPledge] = useState(25);

  // Tribute Form State
  const [tribAuthor, setTribAuthor] = useState('');
  const [tribRelation, setTribRelation] = useState('brice');
  const [tribText, setTribText] = useState('');

  // Sponsor Mile Form State
  const [sponsorMileNum, setSponsorMileNum] = useState(selectedMileForSponsor || 42);
  const [sponsorName, setSponsorName] = useState('');
  const [sponsorMessage, setSponsorMessage] = useState('');

  // Handlers
  const handleDonationSubmit = (e) => {
    e.preventDefault();
    const amt = parseInt(donAmount, 10) || 50;
    const name = donorName.trim() || 'A Friend of Brice';
    onAddDonation(amt);
    onCloseModal();
    onShowToast(`Thank you, ${name}! Your gift of $${amt} directly supports suicide prevention.`);
  };

  const handleRegSubmit = (e) => {
    e.preventDefault();
    const pledge = parseInt(regPledge, 10) || 0;
    onAddDonation(pledge + 100); // Portion goes to charity
    onCloseModal();
    onShowToast(`Welcome to the starting line, ${regName}! You're registered for the 100!`);
  };

  const handleTributeSubmit = (e) => {
    e.preventDefault();
    if (!tribAuthor || !tribText) return;
    onAddTribute({
      id: Date.now(),
      category: tribRelation === 'hope' ? 'hope' : 'brice',
      author: tribAuthor,
      role: tribRelation === 'hope' ? 'Community Advocate' : 'Friend & Supporter',
      text: tribText,
      date: 'Just now'
    });
    setTribAuthor('');
    setTribText('');
    onCloseModal();
    onShowToast("Thank you! Your tribute has been posted to Brice's Memorial Wall.");
  };

  const handleSponsorSubmit = (e) => {
    e.preventDefault();
    const mile = parseInt(sponsorMileNum, 10);
    onSponsorMile(mile, {
      sponsor: sponsorName.trim() || 'Anonymous Friend',
      msg: sponsorMessage.trim()
    });
    onAddDonation(100);
    onCloseModal();
    onShowToast(`Mile ${mile} dedicated to Brice by ${sponsorName}! Marker will be placed on course.`);
  };

  return (
    <>
      {/* 1. Registration Modal */}
      <div
        className={`modal-backdrop ${activeModal === 'register' ? 'active' : ''}`}
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.target === e.currentTarget && onCloseModal()}
      >
        <div className="modal-box">
          <button type="button" className="modal-close-btn" onClick={onCloseModal} aria-label="Close modal">
            &times;
          </button>
          <div className="modal-header">
            <span className="modal-badge">RACE REGISTRATION</span>
            <h3>Join The Brice Jernigan 100</h3>
            <p>100 Miles. Los Peñasquitos Canyon, San Diego. Net proceeds to suicide prevention.</p>
          </div>

          <form onSubmit={handleRegSubmit} className="modal-form">
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                required
                placeholder="e.g. Alex Henderson"
                value={regName}
                onChange={(e) => setRegName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                required
                placeholder="alex@example.com"
                value={regEmail}
                onChange={(e) => setRegEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Choose Discipline</label>
              <select
                value={regDiscipline}
                onChange={(e) => setRegDiscipline(e.target.value)}
              >
                <option value="mtb-solo">Saturday: 100-Mile Mountain Bike Solo ($195)</option>
                <option value="run-solo">Sunday: 100-Mile Ultra Marathon Solo ($245)</option>
                <option value="dual-sport">Weekend: Dual-Sport Ghost Rider ($295)</option>
                <option value="mtb-relay">Saturday: MTB 2-Person Relay ($250)</option>
                <option value="run-relay">Sunday: Ultra 2-Person Relay ($280)</option>
                <option value="memorial-5k">Sunday: Brice Memorial 5K / 10K Community Hike ($45)</option>
              </select>
            </div>

            <div className="form-group checkbox-group">
              <label className="custom-checkbox-label">
                <input
                  type="checkbox"
                  checked={optInShowdown}
                  onChange={(e) => setOptInShowdown(e.target.checked)}
                />
                <span>
                  <strong>Opt-in to the Runners vs Mountain Bikers Showdown!</strong> Compete for the unified Brice Index cross-discipline trophy.
                </span>
              </label>
            </div>

            <div className="form-group">
              <label>Estimated Finish Time</label>
              <input
                type="text"
                placeholder="e.g. 8 hours (MTB) or 18 hours (Runner)"
                value={projectedTime}
                onChange={(e) => setProjectedTime(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Optional Additional Donation to Suicide Prevention</label>
              <div className="pledge-buttons">
                {[25, 50, 100, 0].map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    className={`pledge-quick-btn ${regPledge === amt ? 'active' : ''}`}
                    onClick={() => setRegPledge(amt)}
                  >
                    {amt > 0 ? `+$${amt}` : 'None'}
                  </button>
                ))}
              </div>
            </div>

            <div className="modal-submit-row">
              <button type="submit" className="btn btn-primary btn-block">
                Complete Registration & Support the Cause
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* 2. Direct Donation Modal */}
      <div
        className={`modal-backdrop ${activeModal === 'donate' ? 'active' : ''}`}
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.target === e.currentTarget && onCloseModal()}
      >
        <div className="modal-box">
          <button type="button" className="modal-close-btn" onClick={onCloseModal} aria-label="Close modal">
            &times;
          </button>
          <div className="modal-header">
            <span className="modal-badge">CHARITY DONATION</span>
            <h3>Donate in Honor of Brice Jernigan</h3>
            <p>100% of your donation funds suicide prevention hotlines and San Diego mental health programs.</p>
          </div>

          <form onSubmit={handleDonationSubmit} className="modal-form">
            <div className="donation-amount-grid">
              {[25, 50, 100, 250, 500].map((amt) => (
                <button
                  key={amt}
                  type="button"
                  className={`don-amt-btn ${donAmount === amt ? 'active' : ''}`}
                  onClick={() => setDonAmount(amt)}
                >
                  ${amt}
                </button>
              ))}
            </div>

            <div className="form-group">
              <label>Custom Amount ($)</label>
              <input
                type="number"
                min="5"
                value={donAmount}
                onChange={(e) => setDonAmount(parseInt(e.target.value, 10) || 0)}
              />
            </div>

            <div className="form-group">
              <label>Your Name (or Anonymous)</label>
              <input
                type="text"
                placeholder="e.g. Fellow PQ Rider"
                value={donorName}
                onChange={(e) => setDonorName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Dedication / Message for Brice</label>
              <textarea
                rows="3"
                placeholder="Leave a word of love or memory..."
                value={donDedication}
                onChange={(e) => setDonDedication(e.target.value)}
              />
            </div>

            <div className="modal-submit-row">
              <button type="submit" className="btn btn-primary btn-block">
                Submit Donation & Add to Memorial Total
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* 3. Tribute Modal */}
      <div
        className={`modal-backdrop ${activeModal === 'tribute' ? 'active' : ''}`}
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.target === e.currentTarget && onCloseModal()}
      >
        <div className="modal-box">
          <button type="button" className="modal-close-btn" onClick={onCloseModal} aria-label="Close modal">
            &times;
          </button>
          <div className="modal-header">
            <span className="modal-badge">MEMORIAL WALL</span>
            <h3>Leave a Tribute for Brice</h3>
            <p>Your message will appear live on the race wall and will be printed in the event booklet.</p>
          </div>

          <form onSubmit={handleTributeSubmit} className="modal-form">
            <div className="form-group">
              <label>Your Name</label>
              <input
                type="text"
                required
                placeholder="e.g. Dave Miller, Trail Runner"
                value={tribAuthor}
                onChange={(e) => setTribAuthor(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Relation / Discipline</label>
              <select
                value={tribRelation}
                onChange={(e) => setTribRelation(e.target.value)}
              >
                <option value="brice">Friend / Fellow Rider of Brice</option>
                <option value="hope">Mental Health Advocate / Fighting Depression</option>
                <option value="brice">Rider in PQ Canyon</option>
                <option value="hope">San Diego Ultra Runner</option>
              </select>
            </div>

            <div className="form-group">
              <label>Your Tribute Message</label>
              <textarea
                rows="4"
                required
                placeholder="Share a favorite memory of Brice on the trails, or an inspiring message to anyone struggling..."
                value={tribText}
                onChange={(e) => setTribText(e.target.value)}
              />
            </div>

            <div className="modal-submit-row">
              <button type="submit" className="btn btn-primary btn-block">
                Post Tribute to Wall
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* 4. Sponsor A Mile Modal */}
      <div
        className={`modal-backdrop ${activeModal === 'sponsor' ? 'active' : ''}`}
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.target === e.currentTarget && onCloseModal()}
      >
        <div className="modal-box">
          <button type="button" className="modal-close-btn" onClick={onCloseModal} aria-label="Close modal">
            &times;
          </button>
          <div className="modal-header">
            <span className="modal-badge">MILE DEDICATION</span>
            <h3>Sponsor a Mile in Brice&apos;s Honor ($100)</h3>
            <p>A wooden mile sign with your dedication will stand tall along the 100-mile loop in PQ Canyon.</p>
          </div>

          <form onSubmit={handleSponsorSubmit} className="modal-form">
            <div className="form-group">
              <label>Select Mile Number (1 - 100)</label>
              <input
                type="number"
                min="1"
                max="100"
                required
                value={sponsorMileNum}
                onChange={(e) => setSponsorMileNum(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Dedicated By / Your Name</label>
              <input
                type="text"
                required
                placeholder="e.g. The Jernigan Trail Crew"
                value={sponsorName}
                onChange={(e) => setSponsorName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Marker Inscription (Max 120 characters)</label>
              <textarea
                maxLength={120}
                rows="2"
                required
                placeholder="e.g. 'For Brice: Keep hammering the climbs brother, we carry your stoke.'"
                value={sponsorMessage}
                onChange={(e) => setSponsorMessage(e.target.value)}
              />
            </div>

            <div className="modal-submit-row">
              <button type="submit" className="btn btn-primary btn-block">
                Confirm Mile Sponsorship ($100)
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* 5. Crisis Resources Modal */}
      <div
        className={`modal-backdrop ${activeModal === 'crisis' ? 'active' : ''}`}
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.target === e.currentTarget && onCloseModal()}
      >
        <div className="modal-box">
          <button type="button" className="modal-close-btn" onClick={onCloseModal} aria-label="Close modal">
            &times;
          </button>
          <div className="modal-header">
            <span className="modal-badge">CRISIS & SUPPORT NETWORK</span>
            <h3>Mental Health & Suicide Prevention Resources</h3>
            <p>Free, confidential, judgment-free support available anytime.</p>
          </div>

          <div className="crisis-resources-list">
            <div className="cr-card">
              <h4>988 Suicide & Crisis Lifeline</h4>
              <p>National lifeline available 24/7 in English and Spanish.</p>
              <div className="cr-actions">
                <a href="tel:988" className="btn btn-sm btn-primary">Call 988</a>
                <a href="sms:988" className="btn btn-sm btn-outline">Text 988</a>
                <a href="https://988lifeline.org" target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-outline">
                  Chat Online
                </a>
              </div>
            </div>

            <div className="cr-card">
              <h4>San Diego Access & Crisis Line (SD County)</h4>
              <p>Local crisis response team, suicide prevention, and referral to immediate community mental health clinics.</p>
              <div className="cr-actions">
                <a href="tel:8887247240" className="btn btn-sm btn-primary">Call (888) 724-7240</a>
              </div>
            </div>

            <div className="cr-card">
              <h4>The Trevor Project (LGBTQ+ Youth)</h4>
              <p>24/7 crisis intervention for young LGBTQ+ individuals.</p>
              <div className="cr-actions">
                <a href="tel:8664887386" className="btn btn-sm btn-outline">Call (866) 488-7386</a>
                <a href="sms:678678?body=START" className="btn btn-sm btn-outline">Text START to 678-678</a>
              </div>
            </div>

            <div className="cr-card">
              <h4>Veterans Crisis Line</h4>
              <p>Specialized confidential support for veterans, service members, and their families.</p>
              <div className="cr-actions">
                <a href="tel:988" className="btn btn-sm btn-outline">Dial 988, then press 1</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
