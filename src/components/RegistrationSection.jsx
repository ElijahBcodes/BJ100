'use client';

export default function RegistrationSection({ onOpenRegister }) {
  return (
    <section className="section register-section" id="register">
      <div className="container">
        <div className="section-header text-center">
          <div className="section-tag">CLAIM YOUR SPOT ON THE START LINE</div>
          <h2 className="section-title">Registration Categories</h2>
          <p className="section-subtitle">
            Every entry includes official timing, aid station nutrition, finisher belt buckle / sprocket medal, commemorative tech shirt, and entry to Brice&apos;s Big Race Party.
          </p>
        </div>

        <div className="pricing-tiers-grid">
          {/* MTB 100 */}
          <div className="price-card tier-mtb">
            <div className="price-header">
              <span className="discipline-pill bike-pill">MOUNTAIN BIKE</span>
              <h3 className="tier-title">The 100-Mile MTB</h3>
              <p className="tier-date">Saturday, Oct 24 • 6:00 AM</p>
              <div className="tier-price">
                <span className="currency">$</span>
                <span className="amount">195</span>
                <span className="period">/ rider</span>
              </div>
            </div>
            <ul className="tier-perks">
              <li>✓ Solo or 2-Person Relay Option</li>
              <li>✓ 14-Hour Cutoff & Full Course Support</li>
              <li>✓ Handcrafted MTB Sprocket Finisher Medal</li>
              <li>✓ Eligible for &quot;Spoke vs Tread&quot; Virtual Crown</li>
              <li>✓ Brice&apos;s Big Race Party Ticket & Beer Pass</li>
              <li>✓ $75 of entry goes straight to 988 charity</li>
            </ul>
            <button
              type="button"
              className="btn btn-mtb btn-block"
              onClick={() => onOpenRegister('mtb-solo')}
            >
              Register MTB 100
            </button>
          </div>

          {/* Ultra 100 */}
          <div className="price-card tier-run">
            <div className="popular-ribbon">MOST ENDURANCE</div>
            <div className="price-header">
              <span className="discipline-pill run-pill">ULTRAMARATHON</span>
              <h3 className="tier-title">The 100-Mile Ultra</h3>
              <p className="tier-date">Sunday, Oct 25 • 5:00 AM</p>
              <div className="tier-price">
                <span className="currency">$</span>
                <span className="amount">245</span>
                <span className="period">/ runner</span>
              </div>
            </div>
            <ul className="tier-perks">
              <li>✓ 100-Mile Solo Footrace (Western States Qualifier)</li>
              <li>✓ 30-Hour Cutoff with Pacer privileges from Mi 50</li>
              <li>✓ Custom Cast &quot;Brice 100&quot; Belt Buckle</li>
              <li>✓ Eligible for &quot;Spoke vs Tread&quot; Virtual Crown</li>
              <li>✓ Brice&apos;s Big Race Party Ticket & Beer Pass</li>
              <li>✓ $100 of entry goes straight to 988 charity</li>
            </ul>
            <button
              type="button"
              className="btn btn-run btn-block"
              onClick={() => onOpenRegister('run-solo')}
            >
              Register Ultra 100
            </button>
          </div>

          {/* Ghost Rider Dual-Sport */}
          <div className="price-card tier-dual">
            <div className="price-header">
              <span className="discipline-pill dual-pill">DUAL-SPORT / RELAY</span>
              <h3 className="tier-title">The &quot;Ghost Rider&quot; Challenge</h3>
              <p className="tier-date">Both Days • Oct 24 & 25</p>
              <div className="tier-price">
                <span className="currency">$</span>
                <span className="amount">295</span>
                <span className="period">/ entry</span>
              </div>
            </div>
            <ul className="tier-perks">
              <li>✓ MTB 100 Saturday + Run 50K Sunday</li>
              <li>✓ Or Pair with a friend (1 Biker + 1 Runner team)</li>
              <li>✓ Special Titanium Dual-Discipline Commemorative Award</li>
              <li>✓ Double Swag Package & VIP Party Table</li>
              <li>✓ Maximum charity impact for suicide prevention</li>
            </ul>
            <button
              type="button"
              className="btn btn-primary btn-block"
              onClick={() => onOpenRegister('dual-sport')}
            >
              Register Ghost Rider
            </button>
          </div>

          {/* Memorial 5K */}
          <div className="price-card tier-community">
            <div className="price-header">
              <span className="discipline-pill community-pill">COMMUNITY HIKE & RUN</span>
              <h3 className="tier-title">Brice&apos;s Memorial 5K / 10K</h3>
              <p className="tier-date">Sunday, Oct 25 • 9:00 AM</p>
              <div className="tier-price">
                <span className="currency">$</span>
                <span className="amount">45</span>
                <span className="period">/ person</span>
              </div>
            </div>
            <ul className="tier-perks">
              <li>✓ Accessible scenic trail walk/jog in PQ Canyon</li>
              <li>✓ Family, kids, and strollers welcome on main path</li>
              <li>✓ Memorial Pin & &quot;Fight Depression&quot; Wristband</li>
              <li>✓ Full Access to Finish Line Party & Live Bands</li>
              <li>✓ 100% of registration donated to charity</li>
            </ul>
            <button
              type="button"
              className="btn btn-secondary btn-block"
              onClick={() => onOpenRegister('memorial-5k')}
            >
              Register Memorial 5K
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
