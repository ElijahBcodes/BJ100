'use client';

import { useState } from 'react';

const COURSE_RATIO = 2.15;

export default function CalculatorSection({ onShowToast }) {
  const [mtbHours, setMtbHours] = useState(7);
  const [mtbMins, setMtbMins] = useState(30);

  const [runHours, setRunHours] = useState(16);
  const [runMins, setRunMins] = useState(45);

  const mtbTotalMins = mtbHours * 60 + mtbMins;
  const runTotalMins = runHours * 60 + runMins;

  const mtbSpeed = mtbTotalMins > 0 ? (100 / (mtbTotalMins / 60)).toFixed(1) : 0;

  const runPaceMinPerMile = runTotalMins / 100;
  const paceM = Math.floor(runPaceMinPerMile);
  const paceS = Math.round((runPaceMinPerMile - paceM) * 60);

  const mtbNormalizedRunMins = mtbTotalMins * COURSE_RATIO;
  const diffMins = runTotalMins - mtbNormalizedRunMins;

  const mtbScore = (1000 / (mtbNormalizedRunMins / 60)).toFixed(1);
  const runScore = (1000 / (runTotalMins / 60)).toFixed(1);

  const formatHoursMins = (total) => {
    const h = Math.floor(total / 60);
    const m = Math.round(total % 60);
    return `${h}h ${m < 10 ? '0' : ''}${m}m`;
  };

  const handleMtbSlider = (e) => {
    const val = parseInt(e.target.value, 10);
    setMtbHours(Math.floor(val / 60));
    setMtbMins(val % 60);
  };

  const handleRunSlider = (e) => {
    const val = parseInt(e.target.value, 10);
    setRunHours(Math.floor(val / 60));
    setRunMins(val % 60);
  };

  const handleEqualize = () => {
    const targetRun = Math.round(mtbTotalMins * COURSE_RATIO);
    setRunHours(Math.floor(targetRun / 60));
    setRunMins(targetRun % 60);
    if (onShowToast) onShowToast('Showdown equalized to exact dead heat!');
  };

  // Winner logic
  let winnerTitle = 'DEAD HEAT / TIED!';
  let winnerColor = 'var(--accent-gold)';
  let winnerTrophy = '🤝';
  let winnerDetail = 'Both athletes are dead even on normalized canyon performance!';
  let barWidth = 50;
  let gapText = 'Dead heat within seconds!';

  if (Math.abs(diffMins) >= 5) {
    if (diffMins > 0) {
      winnerTitle = 'RIDER TAKES THE CROWN';
      winnerColor = 'var(--bike-cyan)';
      winnerTrophy = '🚵‍♂️';
      winnerDetail = `A ${formatHoursMins(mtbTotalMins)} MTB effort is equivalent to a ${formatHoursMins(mtbNormalizedRunMins)} ultra run!`;
      barWidth = Math.min(85, Math.max(15, 50 - diffMins / 15));
      gapText = `Mountain Biker leads by ${Math.round(diffMins)} normalized minutes`;
    } else {
      const lead = Math.abs(Math.round(diffMins));
      winnerTitle = 'RUNNER STEALS THE SHOW';
      winnerColor = 'var(--run-orange)';
      winnerTrophy = '🏃‍♀️';
      winnerDetail = `An ultra run of ${formatHoursMins(runTotalMins)} outpaces the rider's equivalent of ${formatHoursMins(mtbNormalizedRunMins)}!`;
      barWidth = Math.min(85, Math.max(15, 50 + lead / 15));
      gapText = `Ultra Runner leads by ${lead} normalized minutes`;
    }
  }

  const sampleCompetitors = [
    { name: 'Brice Jernigan (Honorary Legend)', type: 'MTB', raw: '6h 48m', score: '68.5 pts', status: 'Forever Stoked 💛' },
    { name: 'Your Projected MTB Time', type: 'MTB', raw: formatHoursMins(mtbTotalMins), score: `${mtbScore} pts`, status: 'Simulation' },
    { name: 'Your Projected Run Time', type: 'RUN', raw: formatHoursMins(runTotalMins), score: `${runScore} pts`, status: 'Simulation' },
    { name: "Sarah 'Canyon Fox' Vance", type: 'RUN', raw: '15h 22m', score: '65.1 pts', status: 'Confirmed Racer' },
    { name: 'Cole Henderson', type: 'MTB', raw: '7h 12m', score: '64.6 pts', status: 'Confirmed Racer' },
    { name: 'Mateo Rodriguez', type: 'RUN', raw: '16h 40m', score: '60.0 pts', status: 'Confirmed Racer' }
  ];

  return (
    <section className="section calculator-section" id="calculator">
      <div className="container">
        <div className="glass-container calc-wrapper">
          <div className="calc-header text-center">
            <div className="section-tag">INTERACTIVE SIMULATOR</div>
            <h2 className="section-title">The &quot;Brice Index&quot; Showdown Calculator</h2>
            <p className="section-subtitle">
              How does your projected time stack up? Enter an MTB time or an Ultra Runner time to see who takes the virtual crown on the combined leaderboard.
            </p>
          </div>

          <div className="calculator-grid">
            {/* MTB Panel */}
            <div className="calc-panel panel-left">
              <div className="panel-badge bike-accent">🚵 Mountain Biker Time</div>
              <label className="calc-label">Projected MTB Finish Time:</label>

              <div className="time-inputs-row">
                <div className="input-field">
                  <input
                    type="number"
                    min="5"
                    max="14"
                    value={mtbHours}
                    onChange={(e) => setMtbHours(parseInt(e.target.value, 10) || 0)}
                    className="num-input"
                  />
                  <span className="unit">Hours</span>
                </div>
                <div className="input-field">
                  <input
                    type="number"
                    min="0"
                    max="59"
                    value={mtbMins}
                    onChange={(e) => setMtbMins(parseInt(e.target.value, 10) || 0)}
                    className="num-input"
                  />
                  <span className="unit">Mins</span>
                </div>
              </div>

              <input
                type="range"
                min="300"
                max="840"
                step="5"
                value={mtbTotalMins}
                onChange={handleMtbSlider}
                className="range-slider bike-slider"
              />

              <div className="calc-benchmark">
                <span>Course Record Target: ~6h 15m</span>
                <span>Cutoff: 14h 00m</span>
              </div>

              <div className="calc-stat-box">
                <span className="stat-caption">Average MTB Speed:</span>
                <span className="stat-metric">{mtbSpeed} mph</span>
              </div>
            </div>

            {/* Center Result */}
            <div className="calc-panel panel-center">
              <div className="showdown-result-card" id="showdown-result-box">
                <div className="trophy-display">{winnerTrophy}</div>
                <span className="virtual-leader-label">Virtual Leader</span>
                <h3 className="winner-name" style={{ color: winnerColor }}>
                  {winnerTitle}
                </h3>
                <p className="winner-desc">{winnerDetail}</p>

                <div className="gap-meter-container">
                  <div className="gap-labels">
                    <span>MTB Normalized</span>
                    <span>Runner Target</span>
                  </div>
                  <div className="gap-track">
                    <div className="gap-bar" style={{ width: `${barWidth}%` }}></div>
                  </div>
                  <div className="gap-margin-text">{gapText}</div>
                </div>

                <div className="normalized-equivalents">
                  <div className="eq-box">
                    <span className="eq-label">MTB Normalized Score</span>
                    <strong className="eq-val">{mtbScore} pts</strong>
                  </div>
                  <div className="eq-divider">↔</div>
                  <div className="eq-box">
                    <span className="eq-label">Ultra Normalized Score</span>
                    <strong className="eq-val">{runScore} pts</strong>
                  </div>
                </div>

                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  onClick={handleEqualize}
                >
                  Equalize / Find Dead Heat
                </button>
              </div>
            </div>

            {/* Runner Panel */}
            <div className="calc-panel panel-right">
              <div className="panel-badge run-accent">🏃 Ultra Runner Time</div>
              <label className="calc-label">Projected Ultra Runner Time:</label>

              <div className="time-inputs-row">
                <div className="input-field">
                  <input
                    type="number"
                    min="12"
                    max="30"
                    value={runHours}
                    onChange={(e) => setRunHours(parseInt(e.target.value, 10) || 0)}
                    className="num-input"
                  />
                  <span className="unit">Hours</span>
                </div>
                <div className="input-field">
                  <input
                    type="number"
                    min="0"
                    max="59"
                    value={runMins}
                    onChange={(e) => setRunMins(parseInt(e.target.value, 10) || 0)}
                    className="num-input"
                  />
                  <span className="unit">Mins</span>
                </div>
              </div>

              <input
                type="range"
                min="720"
                max="1800"
                step="10"
                value={runTotalMins}
                onChange={handleRunSlider}
                className="range-slider runner-slider"
              />

              <div className="calc-benchmark">
                <span>Course Record Target: ~14h 20m</span>
                <span>Cutoff: 30h 00m</span>
              </div>

              <div className="calc-stat-box">
                <span className="stat-caption">Average Runner Pace:</span>
                <span className="stat-metric">{paceM}:{paceS < 10 ? '0' : ''}{paceS} min/mi</span>
              </div>
            </div>
          </div>

          <div className="sample-leaderboard-wrap">
            <div className="leaderboard-header-row">
              <h4>Simulated &quot;Spoke vs. Tread&quot; Top Standings</h4>
              <span className="leaderboard-note">Based on 2.15x course terrain coefficient</span>
            </div>

            <div className="table-responsive">
              <table className="showdown-table">
                <thead>
                  <tr>
                    <th>Rank</th>
                    <th>Competitor</th>
                    <th>Discipline</th>
                    <th>Raw Time</th>
                    <th>Brice Index Score</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {sampleCompetitors.map((c, i) => (
                    <tr key={c.name}>
                      <td><strong>#{i + 1}</strong></td>
                      <td><strong>{c.name}</strong></td>
                      <td>
                        <span className={`badge-tag ${c.type === 'MTB' ? 'badge-bike' : 'badge-run'}`}>
                          {c.type === 'MTB' ? '🚵 MTB' : '🏃 Ultra'}
                        </span>
                      </td>
                      <td>{c.raw}</td>
                      <td><strong>{c.score}</strong></td>
                      <td style={{ color: '#94a3b8', fontSize: '0.8rem' }}>{c.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
