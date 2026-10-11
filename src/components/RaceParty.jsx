'use client';

export default function RaceParty() {
  return (
    <section className="section party-section" id="party">
      <div className="container">
        <div className="party-feature-grid">
          <div className="party-media">
            <div className="image-frame glow-frame">
              <img
                src="/assets/party.jpg"
                alt="Vibrant race party at dusk in San Diego canyon with festival string lights, taco truck, campfire circle, bikes on racks, runners and riders celebrating"
                className="party-img"
              />
              <div className="party-badge-banner">
                <span>WE PROMISED HIM A BIG PARTY • HERE IT IS</span>
              </div>
            </div>
          </div>

          <div className="party-info">
            <div className="section-tag">THE CELEBRATION OF LIFE</div>
            <h2 className="section-title">&quot;Brice’s Big Race Party&quot;</h2>
            <p className="party-intro">
              Brice didn&apos;t want solemn silence. He loved rowdy laughs, cold beer after a savage 40-mile ride, street tacos loaded with cilantro, and gathering around a campfire recounting near-crashes and epic trail milestones.
            </p>

            <div className="party-highlights">
              <div className="party-item">
                <span className="party-icon">🌮</span>
                <div>
                  <h4>Baja Taco Trucks & Fresh Churros</h4>
                  <p>Authentic San Diego carne asada, al pastor, birria, and fresh vegan street tacos included for all racers, volunteers, and supporters.</p>
                </div>
              </div>

              <div className="party-item">
                <span className="party-icon">🍺</span>
                <div>
                  <h4>Local Craft Beer Garden</h4>
                  <p>Proudly pouring pours from San Diego breweries with 100% of drink sales donated to suicide prevention and community mental health.</p>
                </div>
              </div>

              <div className="party-item">
                <span className="party-icon">🎸</span>
                <div>
                  <h4>Live Music & Acoustic Campfire Jam</h4>
                  <p>Local San Diego bands playing blues, rock, and bluegrass beneath the string lights until the final midnight cutoff runner crosses.</p>
                </div>
              </div>

              <div className="party-item">
                <span className="party-icon">🌅</span>
                <div>
                  <h4>The Sunset Memorial Toast & Trail Bell</h4>
                  <p>At 6:30 PM on Sunday evening, we pause to ring the canyon trail bell, toast Brice, and remind each other that nobody ever rides alone.</p>
                </div>
              </div>
            </div>

            <div className="party-notice glass-panel">
              <p>
                <strong>Everyone is welcome!</strong> Whether you run 100 miles, ride 100 miles, or just come to eat tacos, listen to music, and cheer on the athletes, admission is open to the entire San Diego community.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
