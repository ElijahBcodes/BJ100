'use client';

import { useState } from 'react';

const segmentsData = {
  1: {
    badge: 'SEGMENT 1 OF 4 (LOOP START)',
    title: 'Canyon Floor & The Sycamore Canopy',
    desc: 'Starting at Canyonside Community Park, competitors dive into the cool coastal air of lower Peñasquitos Canyon. Shaded oak and sycamore canopies provide smooth flow for bikes and steady rhythm for runners alongside Peñasquitos Creek.',
    gain: '+1,850 ft / -1,850 ft',
    landmarks: "Carson's Crossing, Historic Adobe Ranch House",
    mtbDiff: 'Moderate Flow (Avg 14.5 mph)',
    runDiff: 'Fast banking flat trail; preserve energy',
    aid: [
      'Mile 6.2: Adobe Ranch (Full Water/Electrolytes)',
      'Mile 14.8: Carson’s Bridge (Drop Bags & Hot Broth)',
      'Mile 21.0: Wagon Wheel (Medical & Cold Sponge)'
    ],
    pathD: 'M 50,165 Q 120,150 170,120 T 260,140 T 360,95 T 470,155 L 470,170 L 50,170 Z',
    point1: { cx: 260, cy: 140, label: 'Peñasquitos Waterfall' },
    point2: { cx: 360, cy: 95, label: 'Lopez Ridge Climb' }
  },
  2: {
    badge: 'SEGMENT 2 OF 4 (TECHNICAL MESAS)',
    title: 'Del Mar Mesa & Cobblestone Climb',
    desc: 'The course punches steeply up onto the Del Mar Mesa. Famous for technical sandstone steps, dry brush tunnels, and steep punchy climbs that test bike power and runner leg turn-over.',
    gain: '+2,920 ft / -2,400 ft',
    landmarks: 'Cobblestone Ridge, Mesa Tunnels, Duck Pond Overlook',
    mtbDiff: 'Technical High (Avg 10.2 mph - watch pedal strikes)',
    runDiff: 'Challenging uneven rocks; watch ankle rolling',
    aid: [
      'Mile 32.5: Del Mar Mesa Overlook (Spring Water & PB&J)',
      'Mile 41.0: Powerline Fire Road (Energy Gels & Salt Pills)',
      'Mile 48.2: Camel\'s Back Ridge (Ice Buckets & Medical)'
    ],
    pathD: 'M 50,160 Q 110,90 190,60 T 310,120 T 400,50 T 470,140 L 470,170 L 50,170 Z',
    point1: { cx: 190, cy: 60, label: 'Mesa Tunnels' },
    point2: { cx: 400, cy: 50, label: 'Cobblestone Summit' }
  },
  3: {
    badge: 'SEGMENT 3 OF 4 (THE VERT GRIND)',
    title: 'Black Mountain & Nighthawk Summit Climb',
    desc: 'The true separator of the race. Climbs past Miner\'s Ridge to the exposed crown of Black Mountain. Sweeping 360-degree views of the Pacific Ocean and San Diego backcountry with relentless headwinds.',
    gain: '+3,650 ft / -3,400 ft',
    landmarks: "Miner's Ridge Trail, Black Mountain Summit, Glider Point",
    mtbDiff: 'Severe Grade (Avg 8.8 mph - high cadence required)',
    runDiff: 'Power-hike zone; trekking poles recommended',
    aid: [
      'Mile 56.4: Miner\'s Ridge Base (Soup, Bacon, Potatoes)',
      'Mile 63.8: Black Mountain Summit (Water only & Timing Mat)',
      'Mile 72.0: Hilltop Community Staging (Pacer Hand-off)'
    ],
    pathD: 'M 50,165 Q 120,130 180,80 T 290,25 T 390,90 T 470,150 L 470,170 L 50,170 Z',
    point1: { cx: 290, cy: 25, label: 'Black Mtn Summit (1,554\')' },
    point2: { cx: 390, cy: 90, label: 'Glider Drop' }
  },
  4: {
    badge: 'SEGMENT 4 OF 4 (BRICE\'S OVERLOOK & HOME)',
    title: 'Brice\'s Memorial Lookout & The Finish Stretch',
    desc: 'The final homeward descent sweeps right past Brice\'s favorite trail bench in PQ Canyon. Racers ring the memorial trail bell at Mile 92 before a flying sprint through the eucalyptus grove into the cheering festival crowd.',
    gain: '+3,060 ft / -3,780 ft',
    landmarks: 'Brice\'s Memorial Bench, Waterfall Crossing, Canyonside Finish',
    mtbDiff: 'Fast Flow & Loose Corners (Avg 13.8 mph)',
    runDiff: 'Dig deep; downhill quad buster into finish',
    aid: [
      'Mile 82.5: Lopez Ridge Aid (Quesadillas, Ginger Ale)',
      'Mile 92.0: Brice\'s Rock Memorial Station (Trail Bell & Toast)',
      'Mile 100.0: The Finish Line Festival at Canyonside Park!'
    ],
    pathD: 'M 50,140 Q 140,85 220,110 T 320,70 T 420,160 T 470,165 L 470,170 L 50,170 Z',
    point1: { cx: 320, cy: 70, label: 'Brice\'s Memorial Bench' },
    point2: { cx: 470, cy: 165, label: 'Finish Line 🎉' }
  }
};

export default function CourseSection() {
  const [activeSeg, setActiveSeg] = useState(1);
  const cur = segmentsData[activeSeg];

  return (
    <section className="section course-section" id="course">
      <div className="container">
        <div className="section-header text-center">
          <div className="section-tag">BRICE&apos;S BACKYARD • SAN DIEGO, CA</div>
          <h2 className="section-title">The Los Peñasquitos Canyon 100 Course</h2>
          <p className="section-subtitle">
            Four loops of 25 miles through the iconic Los Peñasquitos Canyon Preserve, Del Mar Mesa, and Black Mountain. A brutal and breathtaking tapestry of singletrack, sycamore groves, shale climbs, and ocean breeze.
          </p>
        </div>

        <div className="course-stats-grid">
          <div className="course-stat-card">
            <span className="cs-num">100.2</span>
            <span className="cs-unit">Miles</span>
            <span className="cs-label">Certified Loop Route</span>
          </div>
          <div className="course-stat-card">
            <span className="cs-num">11,480</span>
            <span className="cs-unit">Feet</span>
            <span className="cs-label">Elevation Gain</span>
          </div>
          <div className="course-stat-card">
            <span className="cs-num">8</span>
            <span className="cs-unit">Stations</span>
            <span className="cs-label">Fully Stocked Aid Stations</span>
          </div>
          <div className="course-stat-card">
            <span className="cs-num">4</span>
            <span className="cs-unit">Loops</span>
            <span className="cs-label">25-Mile Quad Circuit</span>
          </div>
        </div>

        <div className="course-interactive-container">
          <div className="course-nav-tabs" role="tablist">
            <button
              type="button"
              className={`course-tab ${activeSeg === 1 ? 'active' : ''}`}
              onClick={() => setActiveSeg(1)}
            >
              <span className="tab-mile">Mi 0 - 25</span>
              <span className="tab-title">Canyon Floor & Sycamore Canopy</span>
            </button>
            <button
              type="button"
              className={`course-tab ${activeSeg === 2 ? 'active' : ''}`}
              onClick={() => setActiveSeg(2)}
            >
              <span className="tab-mile">Mi 25 - 50</span>
              <span className="tab-title">Del Mar Mesa & Cobblestones</span>
            </button>
            <button
              type="button"
              className={`course-tab ${activeSeg === 3 ? 'active' : ''}`}
              onClick={() => setActiveSeg(3)}
            >
              <span className="tab-mile">Mi 50 - 75</span>
              <span className="tab-title">Black Mountain Ridge Climb</span>
            </button>
            <button
              type="button"
              className={`course-tab ${activeSeg === 4 ? 'active' : ''}`}
              onClick={() => setActiveSeg(4)}
            >
              <span className="tab-mile">Mi 75 - 100</span>
              <span className="tab-title">Brice&apos;s Memorial Lookout & Home</span>
            </button>
          </div>

          <div className="course-segment-card glass-panel" id="segment-display-card">
            <div className="segment-details">
              <div className="segment-badge">{cur.badge}</div>
              <h3 className="segment-heading">{cur.title}</h3>
              <p className="segment-desc">{cur.desc}</p>

              <div className="segment-highlights-grid">
                <div className="sh-item">
                  <span className="sh-label">Elevation Profile:</span>
                  <strong>{cur.gain}</strong>
                </div>
                <div className="sh-item">
                  <span className="sh-label">Key Landmarks:</span>
                  <strong>{cur.landmarks}</strong>
                </div>
                <div className="sh-item">
                  <span className="sh-label">MTB Difficulty:</span>
                  <strong>{cur.mtbDiff}</strong>
                </div>
                <div className="sh-item">
                  <span className="sh-label">Run Strategy:</span>
                  <strong>{cur.runDiff}</strong>
                </div>
              </div>

              <div className="aid-stations-list">
                <h4>Aid Stations on this Segment:</h4>
                <div className="aid-tags">
                  {cur.aid.map((a) => (
                    <span key={a} className="aid-tag">{a}</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="segment-visual">
              <div className="elevation-graphic">
                <svg viewBox="0 0 500 200" className="elevation-svg">
                  <line x1="50" y1="30" x2="470" y2="30" stroke="rgba(255,255,255,0.08)" strokeDasharray="4"/>
                  <line x1="50" y1="80" x2="470" y2="80" stroke="rgba(255,255,255,0.08)" strokeDasharray="4"/>
                  <line x1="50" y1="130" x2="470" y2="130" stroke="rgba(255,255,255,0.08)" strokeDasharray="4"/>
                  <line x1="50" y1="170" x2="470" y2="170" stroke="rgba(255,255,255,0.15)"/>

                  <defs>
                    <linearGradient id={`elevGrad-${activeSeg}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.45"/>
                      <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.02"/>
                    </linearGradient>
                  </defs>

                  <path
                    d={cur.pathD}
                    fill={`url(#elevGrad-${activeSeg})`}
                    stroke="#f59e0b"
                    strokeWidth="3"
                  />

                  <circle cx={cur.point1.cx} cy={cur.point1.cy} r="5" fill="#38bdf8"/>
                  <text x={cur.point1.cx} y={cur.point1.cy - 12} textAnchor="middle" fill="#38bdf8" fontSize="11" fontWeight="600">
                    {cur.point1.label}
                  </text>

                  <circle cx={cur.point2.cx} cy={cur.point2.cy} r="5" fill="#ef4444"/>
                  <text x={cur.point2.cx} y={cur.point2.cy - 12} textAnchor="middle" fill="#ef4444" fontSize="11" fontWeight="600">
                    {cur.point2.label}
                  </text>
                </svg>
                <div className="elevation-axis-labels">
                  <span>Start of Segment</span>
                  <span>Aid Station Check</span>
                  <span>Landmark Pass</span>
                  <span>End of Segment</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
