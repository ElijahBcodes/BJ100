'use client';

export default function PromiseMemorial({ onOpenTribute, onOpenDonate }) {
  return (
    <section className="section promise-section" id="promise">
      <div className="container">
        <div className="promise-grid">
          <div className="promise-media-column">
            <div className="image-frame">
              <img
                src="/assets/memorial.jpg"
                alt="A mountain bike resting by a memorial bench overlooking Los Peñasquitos Canyon at sunset with a sign reading For Brice"
                className="promise-img"
              />
              <div className="image-caption-overlay">
                <span className="location-tag">Los Peñasquitos Canyon Preserve</span>
                <p>Brice&apos;s favorite lookout bench at sunset.</p>
              </div>
            </div>

            <div className="quote-card glass-panel">
              <span className="quote-mark">“</span>
              <p className="quote-text">
                I told him: if you ever leave us, we’re not going to sit around in quiet sorrow. We’re going to throw the biggest, wildest race party this canyon has ever seen. Without you—but forever in your name.
              </p>
              <div className="quote-author">
                <strong>— The Promise to Brice Jernigan</strong>
                <span>Rider, Friend, and Canyon Brother</span>
              </div>
            </div>
          </div>

          <div className="promise-content-column">
            <div className="section-tag">THE INSPIRATION & HEART</div>
            <h2 className="section-title">A Ride for Brice. A Race for Every Soul Fighting in the Dark.</h2>

            <div className="rich-text">
              <p className="lead-paragraph">
                Brice Jernigan lived for dirt, velocity, and the open sky. If you spent any morning in San Diego’s Los Peñasquitos Canyon—weaving through the sycamore groves, tackling the cobblestone tunnels, or racing the sunset across the mesa—you probably crossed tracks with Brice.
              </p>
              <p>
                Behind his radiant grin and unstoppable trail enthusiasm, Brice fought an exhausting, quiet war against clinical depression. Despite the love of family, friends, and the tight-knit San Diego cycling tribe, Brice lost his battle to suicide.
              </p>
              <p>
                When he was alive, we made him a solemn, unshakeable pact: <em>if that dark day ever came, we wouldn&apos;t let despair get the last word.</em> We would gather every runner who ever laced up a shoe, every rider who ever clipped into a pedal, and rally them together for a hundred grueling, glorious miles.
              </p>
              <p>
                This event is the fulfillment of that promise. <strong>100% of race proceeds benefit suicide prevention organizations</strong>, funding local San Diego youth mental health outreach, crisis intervention hotlines, and removing the shame of asking for help.
              </p>
            </div>

            <div className="cause-pillars-grid">
              <div className="pillar-card">
                <div className="pillar-icon">🗣️</div>
                <div>
                  <h4>Ending the Silence</h4>
                  <p>Breaking the stigma surrounding mental illness and male depression through raw honesty and community fellowship.</p>
                </div>
              </div>
              <div className="pillar-card">
                <div className="pillar-icon">📞</div>
                <div>
                  <h4>Funding 24/7 Crisis Help</h4>
                  <p>Every mile sponsors operator training and emergency mental health care through the 988 Lifeline and San Diego crisis networks.</p>
                </div>
              </div>
              <div className="pillar-card">
                <div className="pillar-icon">🤝</div>
                <div>
                  <h4>The Big Race Party</h4>
                  <p>Honoring Brice exactly how he wanted: dirt on our faces, tacos on our plates, cold beers raised to the sky, and love in our hearts.</p>
                </div>
              </div>
            </div>

            <div className="promise-cta-row">
              <button type="button" className="btn btn-primary" onClick={onOpenTribute}>
                Leave a Message for Brice
              </button>
              <button type="button" className="btn btn-outline" onClick={onOpenDonate}>
                Contribute to the Cause
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
