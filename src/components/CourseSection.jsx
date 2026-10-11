'use client';

import { useState } from 'react';

// April 20 Aid Stations Breakdown (6 to 10 miles apart, with two 13-mile stretches)
const aprilAidStations = [
  {
    station: 'Start Line: Canyonside Park',
    mile: 0.0,
    split: 0.0,
    isEndurance: false,
    cutoffMtb: '6:00 AM Start',
    cutoffRun: '5:00 AM Start',
    crew: 'Full Access',
    supplies: 'Packet Pickup, Coffee, Electrolytes'
  },
  {
    station: 'Aid 1: Adobe Ranch House',
    mile: 8.5,
    split: 8.5,
    isEndurance: false,
    cutoffMtb: '7:15 AM',
    cutoffRun: '7:30 AM',
    crew: 'Spectators Only',
    supplies: 'Water, Skratch Labs, Oranges, Bananas'
  },
  {
    station: "Aid 2: Carson's Crossing",
    mile: 16.0,
    split: 7.5,
    isEndurance: false,
    cutoffMtb: '8:15 AM',
    cutoffRun: '9:45 AM',
    crew: 'Crew Allowed',
    supplies: 'Drop Bags #1, PB&J, Pretzels, Water Refill'
  },
  {
    station: 'Aid 3: Del Mar Mesa Ridge',
    mile: 29.0,
    split: 13.0,
    isEndurance: true,
    stretchLabel: '13-MILE WILDERNESS STRETCH #1',
    cutoffMtb: '10:05 AM',
    cutoffRun: '1:45 PM',
    crew: 'NO CREW ACCESS',
    supplies: 'Hot Broth, Quesadillas, Salt Tablets, First Aid'
  },
  {
    station: 'Aid 4: Lopez Canyon Junction',
    mile: 37.5,
    split: 8.5,
    isEndurance: false,
    cutoffMtb: '11:15 AM',
    cutoffRun: '4:15 PM',
    crew: 'Spectators Only',
    supplies: 'Ice Buckets, Cold Water, Watermelon, Gels'
  },
  {
    station: 'Aid 5: Canyonside Central Hub',
    mile: 45.0,
    split: 7.5,
    isEndurance: false,
    cutoffMtb: '12:15 PM',
    cutoffRun: '6:30 PM',
    crew: 'Major Crew & Drop Bags',
    supplies: 'Drop Bags #2, Hot Pasta, Foot Care, Pacer Prep'
  },
  {
    station: "Aid 6: Miner's Ridge Base",
    mile: 58.0,
    split: 13.0,
    isEndurance: true,
    stretchLabel: '13-MILE MOUNTAIN ASCENT STRETCH #2',
    cutoffMtb: '2:15 PM',
    cutoffRun: '10:30 PM',
    crew: 'Pacer Handoff Only',
    supplies: 'Bacon, Boiled Potatoes, Hot Soup, Coffee'
  },
  {
    station: 'Aid 7: Black Mountain East Peak',
    mile: 66.5,
    split: 8.5,
    isEndurance: false,
    cutoffMtb: '3:45 PM',
    cutoffRun: '1:00 AM (Mon)',
    crew: 'NO CREW (High Peak)',
    supplies: 'Wind Shelter, Electrolytes, Ginger Ale, Gels'
  },
  {
    station: 'Aid 8: Sycamore Canyon',
    mile: 75.0,
    split: 8.5,
    isEndurance: false,
    cutoffMtb: '4:55 PM',
    cutoffRun: '3:30 AM (Mon)',
    crew: 'Crew Allowed',
    supplies: 'Grilled Cheese, Broth, Drop Bags #3'
  },
  {
    station: 'Aid 9: Duck Pond Overlook',
    mile: 83.0,
    split: 8.0,
    isEndurance: false,
    cutoffMtb: '6:00 PM',
    cutoffRun: '6:00 AM (Mon)',
    crew: 'Spectators Only',
    supplies: 'Hot Cider, Pretzels, Electrolytes'
  },
  {
    station: "Aid 10: Brice's Memorial Lookout",
    mile: 91.5,
    split: 8.5,
    isEndurance: false,
    cutoffMtb: '7:00 PM',
    cutoffRun: '8:30 AM (Mon)',
    crew: 'Trail Bell Ceremony',
    supplies: 'Toast to Brice, Fresh Fruit, High Fives'
  },
  {
    station: 'Finish Line: Canyonside Festival',
    mile: 100.0,
    split: 8.5,
    isEndurance: false,
    cutoffMtb: '8:00 PM (14h Cutoff)',
    cutoffRun: '11:00 AM Mon (30h Cutoff)',
    crew: 'Full Party Access',
    supplies: 'Belt Buckles, Baja Tacos, Cold Craft Beers!'
  }
];

const waypoints = [
  {
    id: 'carsons',
    name: "Carson's Crossing",
    mile: 'Mile 16.0 (April) / Mile 6.2 (Oct)',
    elevation: '95 ft',
    type: 'Major Aid Station & Drop Bags',
    desc: 'Creek crossing on the canyon floor. Gateway to the first 13-mile wilderness stretch across Del Mar Mesa.'
  },
  {
    id: 'stretch1',
    name: '13-Mile Mesa Wilderness Section',
    mile: 'Mile 16.0 ➔ Mile 29.0',
    elevation: '95 ft ➔ 410 ft',
    type: 'Endurance Wilderness Stretch #1',
    desc: '13 uninterrupted miles across sandstone shelves and chaparral tunnels with zero crew access. Mandatory 2L hydration carry.'
  },
  {
    id: 'summit',
    name: 'Black Mountain Summit',
    mile: 'Mile 63.8',
    elevation: '1,554 ft',
    type: 'High Point / Vertical Challenge',
    desc: 'The defining vertical grind of the 100-mile loop. Sweeping 360-degree views stretching from Mount Baldy to the Pacific Ocean horizon.'
  },
  {
    id: 'stretch2',
    name: '13-Mile Mountain Ascent Section',
    mile: 'Mile 45.0 ➔ Mile 58.0',
    elevation: '48 ft ➔ 520 ft',
    type: 'Endurance Wilderness Stretch #2',
    desc: '13 miles climbing out of the central canyon into Black Mountain foothills. High vert, remote rocky singletrack.'
  },
  {
    id: 'memorial',
    name: "Brice's Memorial Lookout Bench",
    mile: 'Mile 91.5 (April) / Mile 92.0 (Oct)',
    elevation: '240 ft',
    type: 'Sacred Memorial Waypoint',
    desc: "Brice's favorite sunset view over PQ Canyon. Every racer stops to ring the honorary bronze trail bell before sprinting toward the finish line."
  }
];

export default function CourseSection({ selectedEdition = 'april', onSelectEdition }) {
  const [courseView, setCourseView] = useState('spacing'); // 'spacing', 'topo', or 'elevation'
  const [selectedWaypoint, setSelectedWaypoint] = useState(waypoints[0]);
  const [isZoomed, setIsZoomed] = useState(false);

  return (
    <section className="section course-section" id="course">
      <div className="container">
        <div className="section-header text-center">
          <div className="section-tag">BRICE&apos;S BACKYARD • SAN DIEGO, CA</div>
          <h2 className="section-title">The Los Peñasquitos Canyon 100 Course</h2>
          <p className="section-subtitle">
            A 100-mile journey through Los Peñasquitos Canyon Preserve, Del Mar Mesa, and Black Mountain (+11,480 ft vert). We offer two official course variations to suit spring and fall race conditions.
          </p>

          {/* Master Course Edition Selector */}
          <div className="edition-toggle-bar">
            <button
              type="button"
              className={`edition-tab-btn ${selectedEdition === 'april' ? 'active' : ''}`}
              onClick={() => onSelectEdition && onSelectEdition('april')}
            >
              <span>🌸 April 20 Edition (Two 13M Stretches)</span>
            </button>
            <button
              type="button"
              className={`edition-tab-btn ${selectedEdition === 'october' ? 'active' : ''}`}
              onClick={() => onSelectEdition && onSelectEdition('october')}
            >
              <span>🍂 October Edition (Quad-Loop)</span>
            </button>
          </div>

          {/* View Mode Switcher */}
          <div className="course-view-switch-row">
            <button
              type="button"
              className={`view-switch-btn ${courseView === 'spacing' ? 'active' : ''}`}
              onClick={() => setCourseView('spacing')}
            >
              <span>📋</span>
              <span>Aid Stations Spacing & Mile Breakdown</span>
            </button>
            <button
              type="button"
              className={`view-switch-btn ${courseView === 'topo' ? 'active' : ''}`}
              onClick={() => setCourseView('topo')}
            >
              <span>🗺️</span>
              <span>Topographical Trail Map View</span>
            </button>
            <button
              type="button"
              className={`view-switch-btn ${courseView === 'elevation' ? 'active' : ''}`}
              onClick={() => setCourseView('elevation')}
            >
              <span>📈</span>
              <span>Elevation Profile (11,480&apos; Vert)</span>
            </button>
          </div>
        </div>

        {/* Quick Facts Strip */}
        <div className="course-stats-grid">
          <div className="course-stat-card">
            <span className="cs-num">100.0</span>
            <span className="cs-unit">Miles</span>
            <span className="cs-label">Certified Course Distance</span>
          </div>
          <div className="course-stat-card">
            <span className="cs-num">11,480</span>
            <span className="cs-unit">Feet</span>
            <span className="cs-label">Elevation Gain</span>
          </div>
          <div className="course-stat-card">
            <span className="cs-num">
              {selectedEdition === 'april' ? '6-10 Mi' : '6.2 Mi'}
            </span>
            <span className="cs-unit">Avg</span>
            <span className="cs-label">Standard Station Spacing</span>
          </div>
          <div className="course-stat-card">
            <span className="cs-num">
              {selectedEdition === 'april' ? '2' : '0'}
            </span>
            <span className="cs-unit">Stretches</span>
            <span className="cs-label">13-Mile Wilderness Legs</span>
          </div>
        </div>

        {/* =========================================================================
            VIEW 1: AID STATIONS SPACING & MILE BREAKDOWN (APRIL 20 FOCUS)
           ========================================================================= */}
        {courseView === 'spacing' && (
          <div className="animate-fade-in">
            {selectedEdition === 'april' ? (
              <div className="glass-panel" style={{ padding: '2.5rem' }}>
                <div className="edition-banner-notice">
                  <div className="edition-banner-text">
                    <strong>RACE DATE: APRIL 20 • AID STATION BLUEPRINT</strong>
                    <p>
                      Calibrated for optimal hydration and endurance pacing. Aid stations are spaced between <strong>6 and 10 miles apart</strong> (averaging 8.1 miles), featuring <strong>two premier 13-mile wilderness stretches</strong> that test true self-sufficiency.
                    </p>
                  </div>
                  <a
                    href="/BJ100_April20_Course.gpx"
                    download="BJ100_April20_Course.gpx"
                    className="btn btn-primary btn-sm"
                  >
                    <span>Download April 20 GPX</span>
                  </a>
                </div>

                {/* The Two 13-Mile Wilderness Stretches Callout Cards */}
                <div className="stretches-feature-grid">
                  <div className="stretch-warning-card">
                    <div className="swc-header">
                      <span className="swc-badge">ENDURANCE CRUCIBLE #1</span>
                      <span className="swc-distance">13.0 MILES</span>
                    </div>
                    <h4>Carson&apos;s Crossing (Mi 16.0) ➔ Del Mar Mesa (Mi 29.0)</h4>
                    <p>
                      The first major separation test. Takes athletes through technical sandstone cobbles and brush tunnels under direct midday sun with zero outside crew access.
                    </p>
                    <ul className="swc-reqs">
                      <li>⚠️ Mandatory minimum 2.0L fluid capacity required at Aid 2</li>
                      <li>⚠️ Minimum 4 energy gels / 500 kcal fuel carry</li>
                      <li>⚠️ No crew vehicles allowed on Del Mar Mesa trailheads</li>
                    </ul>
                  </div>

                  <div className="stretch-warning-card">
                    <div className="swc-header">
                      <span className="swc-badge">ENDURANCE CRUCIBLE #2</span>
                      <span className="swc-distance">13.0 MILES</span>
                    </div>
                    <h4>Canyonside Central (Mi 45.0) ➔ Miner&apos;s Ridge (Mi 58.0)</h4>
                    <p>
                      The climb into the Black Mountain massif. Transitioning from canyon floor into steep, exposed mountain foothills as night falls.
                    </p>
                    <ul className="swc-reqs">
                      <li>⚠️ Mandatory headlamp inspection at Aid 5 (Canyonside)</li>
                      <li>⚠️ Emergency space blanket & wind jacket required</li>
                      <li>⚠️ Pacer pickup allowed at Miner&apos;s Ridge Base</li>
                    </ul>
                  </div>
                </div>

                {/* Full Aid Station Spacing Table */}
                <div className="aid-table-wrap">
                  <h3 style={{ fontSize: '1.4rem', marginBottom: '1rem' }}>
                    April 20 Aid Stations & Mileage Schedule
                  </h3>

                  <div className="table-responsive">
                    <table className="showdown-table">
                      <thead>
                        <tr>
                          <th>Check / Station</th>
                          <th>Course Mile</th>
                          <th>Leg Distance</th>
                          <th>Spacing Type</th>
                          <th>MTB Cutoff</th>
                          <th>Runner Cutoff</th>
                          <th>Crew & Drop Bags</th>
                        </tr>
                      </thead>
                      <tbody>
                        {aprilAidStations.map((st) => (
                          <tr
                            key={st.station}
                            style={st.isEndurance ? { background: 'rgba(249, 115, 22, 0.08)' } : {}}
                          >
                            <td>
                              <strong>{st.station}</strong>
                            </td>
                            <td>
                              <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 800 }}>
                                Mile {st.mile.toFixed(1)}
                              </span>
                            </td>
                            <td>
                              {st.split === 0 ? (
                                <span style={{ color: '#64748b' }}>Start</span>
                              ) : (
                                <strong>+{st.split.toFixed(1)} mi</strong>
                              )}
                            </td>
                            <td>
                              {st.split === 0 ? (
                                <span style={{ color: '#64748b' }}>—</span>
                              ) : st.isEndurance ? (
                                <span className="spacing-pill-endurance">
                                  ⚡ 13.0 MI STRETCH
                                </span>
                              ) : (
                                <span className="spacing-pill-normal">
                                  ✓ {st.split.toFixed(1)} mi (6-10 range)
                                </span>
                              )}
                            </td>
                            <td>{st.cutoffMtb}</td>
                            <td>{st.cutoffRun}</td>
                            <td style={{ fontSize: '0.82rem', color: '#cbd5e1' }}>
                              {st.crew} • {st.supplies}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            ) : (
              /* October Edition Spacing */
              <div className="glass-panel" style={{ padding: '2.5rem' }}>
                <div className="edition-banner-notice">
                  <div className="edition-banner-text">
                    <strong>RACE DATE: OCTOBER 24-25 • STANDARD QUAD-LOOP SPACING</strong>
                    <p>
                      Four repeating 25-mile loops with 8 evenly stocked aid stations spaced approximately every 6 to 8 miles around the canyon perimeter.
                    </p>
                  </div>
                  <a
                    href="/BJ100_Official_Course.gpx"
                    download="BJ100_Official_Course.gpx"
                    className="btn btn-primary btn-sm"
                  >
                    <span>Download October GPX</span>
                  </a>
                </div>

                <div className="table-responsive">
                  <table className="showdown-table">
                    <thead>
                      <tr>
                        <th>Station</th>
                        <th>Loop Marker</th>
                        <th>Split</th>
                        <th>Support</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td><strong>Canyonside Park (Main Hub)</strong></td>
                        <td>Mile 0, 25, 50, 75, 100</td>
                        <td>Start & Lap Hub</td>
                        <td>Full Crew, Drop Bags, Hot Food, Medical</td>
                      </tr>
                      <tr>
                        <td><strong>Adobe Ranch House</strong></td>
                        <td>Mile 6.2, 31.2, 56.2, 81.2</td>
                        <td>+6.2 mi</td>
                        <td>Water, Electrolytes, Fruit, PB&J</td>
                      </tr>
                      <tr>
                        <td><strong>Carson’s Bridge Crossing</strong></td>
                        <td>Mile 14.8, 39.8, 64.8, 89.8</td>
                        <td>+8.6 mi</td>
                        <td>Drop Bags, Hot Broth, Potatoes</td>
                      </tr>
                      <tr>
                        <td><strong>Wagon Wheel / Lopez</strong></td>
                        <td>Mile 21.0, 46.0, 71.0, 96.0</td>
                        <td>+6.2 mi</td>
                        <td>Cold Sponges, Ice, Pretzels, Gels</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* =========================================================================
            VIEW 2: TOPOGRAPHICAL TRAIL MAP VIEW
           ========================================================================= */}
        {courseView === 'topo' && (
          <div className="topo-map-container animate-fade-in">
            <div className="topo-map-card glass-panel">
              <div className="topo-map-header">
                <div>
                  <span className="topo-badge">OFFICIAL CARTOGRAPHIC ROUTE</span>
                  <h3>
                    Los Peñasquitos Canyon & Black Mountain Topo Map
                    {selectedEdition === 'april' ? ' (April 20)' : ' (Oct 24-25)'}
                  </h3>
                  <p>
                    Detailed contour lines showing canyon singletrack, Del Mar Mesa, and the two 13-mile endurance stretches.
                  </p>
                </div>
                <div className="topo-header-actions">
                  <a
                    href={selectedEdition === 'april' ? '/BJ100_April20_Course.gpx' : '/BJ100_Official_Course.gpx'}
                    download={selectedEdition === 'april' ? 'BJ100_April20_Course.gpx' : 'BJ100_Official_Course.gpx'}
                    className="btn btn-primary btn-sm"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>
                    </svg>
                    <span>Download GPX Track</span>
                  </a>
                  <button
                    type="button"
                    className="btn btn-secondary btn-sm"
                    onClick={() => setIsZoomed(!isZoomed)}
                  >
                    {isZoomed ? 'Shrink Map' : 'Full Width Zoom 🔍'}
                  </button>
                </div>
              </div>

              {/* Topo Map Visual Frame */}
              <div className={`topo-frame ${isZoomed ? 'zoomed' : ''}`}>
                <img
                  src="/assets/topo_map.jpg"
                  alt="Official Topographical Trail Map of Los Peñasquitos Canyon and Black Mountain with course path and waypoints"
                  className="topo-img"
                  onClick={() => setIsZoomed(!isZoomed)}
                />
                <div className="topo-overlay-legend">
                  <div className="tol-item">
                    <span className="tol-line orange-line"></span>
                    <span>100-Mile Race Route</span>
                  </div>
                  <div className="tol-item">
                    <span className="tol-line cyan-line"></span>
                    <span>Canyon Connectors</span>
                  </div>
                  <div className="tol-item">
                    <span className="tol-dot"></span>
                    <span>10 Aid Stations (6-10 mi & Two 13M Stretches)</span>
                  </div>
                </div>
              </div>

              {/* Interactive Waypoints Explorer */}
              <div className="waypoints-explorer-grid">
                <div className="waypoints-selector-col">
                  <h4>Interactive Course Waypoints:</h4>
                  <div className="waypoints-btn-list">
                    {waypoints.map((wp) => {
                      const isSel = selectedWaypoint.id === wp.id;
                      return (
                        <button
                          key={wp.id}
                          type="button"
                          className={`waypoint-tab ${isSel ? 'active' : ''}`}
                          onClick={() => setSelectedWaypoint(wp)}
                        >
                          <div className="wp-header-row">
                            <strong>{wp.name}</strong>
                            <span className="wp-mile">{wp.mile}</span>
                          </div>
                          <span className="wp-type">{wp.type}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="waypoint-detail-col glass-panel">
                  <div className="wp-detail-badge">WAYPOINT DOSSIER</div>
                  <h3>{selectedWaypoint.name}</h3>
                  <div className="wp-metric-tags">
                    <span className="wp-tag">📍 {selectedWaypoint.mile}</span>
                    <span className="wp-tag">⛰️ Elevation: {selectedWaypoint.elevation}</span>
                    <span className="wp-tag">🏷️ {selectedWaypoint.type}</span>
                  </div>
                  <p className="wp-desc-text">{selectedWaypoint.desc}</p>

                  <div className="wp-elevation-profile-bar">
                    <div className="wpe-label">Terrain Profile at this Waypoint:</div>
                    <div className="wpe-bar-bg">
                      <div
                        className="wpe-bar-fill"
                        style={{
                          width: `${Math.min(100, Math.max(10, (parseInt(selectedWaypoint.elevation, 10) / 1554) * 100))}%`
                        }}
                      ></div>
                    </div>
                    <div className="wpe-sub">
                      <span>Creek Floor (48 ft)</span>
                      <span>Peak Summit (1,554 ft)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            VIEW 3: ELEVATION PROFILE
           ========================================================================= */}
        {courseView === 'elevation' && (
          <div className="glass-panel animate-fade-in" style={{ padding: '2.5rem' }}>
            <h3 style={{ fontSize: '1.6rem', marginBottom: '0.8rem' }}>
              Course Elevation Profile (+11,480 ft Total Vert)
            </h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.8rem' }}>
              From the coastal eucalyptus canopy of Peñasquitos Creek (48 ft) to the technical crown of Black Mountain (1,554 ft).
            </p>

            <div className="elevation-graphic">
              <svg viewBox="0 0 500 200" className="elevation-svg">
                <line x1="50" y1="30" x2="470" y2="30" stroke="rgba(255,255,255,0.08)" strokeDasharray="4"/>
                <line x1="50" y1="80" x2="470" y2="80" stroke="rgba(255,255,255,0.08)" strokeDasharray="4"/>
                <line x1="50" y1="130" x2="470" y2="130" stroke="rgba(255,255,255,0.08)" strokeDasharray="4"/>
                <line x1="50" y1="170" x2="470" y2="170" stroke="rgba(255,255,255,0.15)"/>

                <defs>
                  <linearGradient id="elevGradMaster" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.45"/>
                    <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.02"/>
                  </linearGradient>
                </defs>

                <path
                  d="M 50,165 Q 110,140 160,95 T 240,150 T 320,30 T 400,120 T 470,165 L 470,170 L 50,170 Z"
                  fill="url(#elevGradMaster)"
                  stroke="#f59e0b"
                  strokeWidth="3"
                />

                <circle cx="160" cy="95" r="5" fill="#38bdf8"/>
                <text x="160" y="80" textAnchor="middle" fill="#38bdf8" fontSize="11" fontWeight="600">
                  Del Mar Mesa (410&apos;)
                </text>

                <circle cx="320" cy="30" r="5" fill="#ef4444"/>
                <text x="320" y="18" textAnchor="middle" fill="#ef4444" fontSize="11" fontWeight="600">
                  Black Mtn Peak (1,554&apos;)
                </text>

                <circle cx="420" cy="130" r="5" fill="#f59e0b"/>
                <text x="420" y="115" textAnchor="middle" fill="#f59e0b" fontSize="11" fontWeight="600">
                  Brice&apos;s Bench (240&apos;)
                </text>
              </svg>
              <div className="elevation-axis-labels">
                <span>Start (Mile 0)</span>
                <span>13M Stretch #1 (Mi 16-29)</span>
                <span>13M Stretch #2 & Peak (Mi 45-58)</span>
                <span>Finish (Mile 100)</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
