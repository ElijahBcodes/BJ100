/**
 * THE BRICE JERNIGAN 100 - APPLICATION LOGIC
 * 100-Mile Ultra Marathon vs. Mountain Bike Charity Race
 * San Diego, CA • Los Peñasquitos Canyon Preserve
 */

document.addEventListener('DOMContentLoaded', () => {
  initCountdown();
  initCalculator();
  initCourseSegments();
  initMileGrid();
  initTributes();
  initModals();
  initFAQ();
  initMobileMenu();
  initNewsletter();
});

/* ==========================================================================
   1. Race Weekend Countdown
   ========================================================================== */
function initCountdown() {
  const targetDate = new Date('2026-10-24T06:00:00-07:00').getTime();
  const daysEl = document.getElementById('countdown-days');
  
  function updateTimer() {
    const now = new Date().getTime();
    const diff = targetDate - now;

    if (diff <= 0) {
      if (daysEl) daysEl.textContent = '0';
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    if (daysEl) daysEl.textContent = days.toString();
  }

  updateTimer();
  setInterval(updateTimer, 60000);
}

/* ==========================================================================
   2. Showdown Calculator ("The Brice Index")
   Course ratio: ~2.15x (MTB time to Ultra Run equivalent in PQ Canyon)
   ========================================================================== */
function initCalculator() {
  const mtbHoursInput = document.getElementById('mtb-hours-input');
  const mtbMinsInput = document.getElementById('mtb-mins-input');
  const mtbSlider = document.getElementById('mtb-slider');
  const mtbSpeedCalc = document.getElementById('mtb-speed-calc');

  const runnerHoursInput = document.getElementById('runner-hours-input');
  const runnerMinsInput = document.getElementById('runner-mins-input');
  const runnerSlider = document.getElementById('runner-slider');
  const runnerPaceCalc = document.getElementById('runner-pace-calc');

  const winnerTitle = document.getElementById('winner-title');
  const winnerDetail = document.getElementById('winner-detail');
  const winnerTrophy = document.getElementById('winner-trophy');
  const gapVisualBar = document.getElementById('gap-visual-bar');
  const gapDiffText = document.getElementById('gap-differential-text');
  const mtbScoreVal = document.getElementById('mtb-score-val');
  const runnerScoreVal = document.getElementById('runner-score-val');
  const syncBtn = document.getElementById('calc-sync-btn');
  const leaderboardTbody = document.getElementById('leaderboard-tbody');

  const COURSE_RATIO = 2.15; // 1 MTB hour ~ 2.15 Ultra running hours

  function getMtbMinutes() {
    const h = parseInt(mtbHoursInput.value, 10) || 0;
    const m = parseInt(mtbMinsInput.value, 10) || 0;
    return (h * 60) + m;
  }

  function getRunnerMinutes() {
    const h = parseInt(runnerHoursInput.value, 10) || 0;
    const m = parseInt(runnerMinsInput.value, 10) || 0;
    return (h * 60) + m;
  }

  function formatHoursMins(totalMins) {
    const h = Math.floor(totalMins / 60);
    const m = Math.round(totalMins % 60);
    return `${h}h ${m < 10 ? '0' : ''}${m}m`;
  }

  function recalculate() {
    const mtbMins = getMtbMinutes();
    const runnerMins = getRunnerMinutes();

    // Stats
    const mtbHours = mtbMins / 60;
    const mtbSpeed = mtbHours > 0 ? (100 / mtbHours).toFixed(1) : 0;
    if (mtbSpeedCalc) mtbSpeedCalc.textContent = `${mtbSpeed} mph`;

    const runnerPaceMinPerMile = runnerMins / 100;
    const paceM = Math.floor(runnerPaceMinPerMile);
    const paceS = Math.round((runnerPaceMinPerMile - paceM) * 60);
    if (runnerPaceCalc) runnerPaceCalc.textContent = `${paceM}:${paceS < 10 ? '0' : ''}${paceS} min/mi`;

    // Normalized comparison
    const mtbNormalizedEquivalentRunMins = mtbMins * COURSE_RATIO;
    const differenceMins = runnerMins - mtbNormalizedEquivalentRunMins;

    // Scores (Arbitrary benchmark 100 pts for 16h equivalent)
    const mtbScore = (1000 / (mtbNormalizedEquivalentRunMins / 60)).toFixed(1);
    const runScore = (1000 / (runnerMins / 60)).toFixed(1);
    if (mtbScoreVal) mtbScoreVal.textContent = `${mtbScore} pts`;
    if (runnerScoreVal) runnerScoreVal.textContent = `${runScore} pts`;

    if (Math.abs(differenceMins) < 5) {
      // Dead heat
      winnerTitle.textContent = "DEAD HEAT / TIED!";
      winnerTitle.style.color = "var(--accent-gold)";
      winnerTrophy.textContent = "🤝";
      winnerDetail.textContent = `Both athletes are dead even on normalized canyon performance!`;
      gapVisualBar.style.width = "50%";
      gapDiffText.textContent = `Dead heat within seconds!`;
    } else if (differenceMins > 0) {
      // MTB is faster than Runner after normalization
      winnerTitle.textContent = "RIDER TAKES THE CROWN";
      winnerTitle.style.color = "var(--bike-cyan)";
      winnerTrophy.textContent = "🚵‍♂️";
      winnerDetail.textContent = `A ${formatHoursMins(mtbMins)} MTB effort is equivalent to a ${formatHoursMins(mtbNormalizedEquivalentRunMins)} ultra run!`;
      
      const percent = Math.min(85, Math.max(15, 50 - (differenceMins / 15)));
      gapVisualBar.style.width = `${percent}%`;
      gapDiffText.textContent = `Mountain Biker leads by ${Math.round(differenceMins)} normalized minutes`;
    } else {
      // Runner is faster than MTB
      const lead = Math.abs(Math.round(differenceMins));
      winnerTitle.textContent = "RUNNER STEALS THE SHOW";
      winnerTitle.style.color = "var(--run-orange)";
      winnerTrophy.textContent = "🏃‍♀️";
      winnerDetail.textContent = `An ultra run of ${formatHoursMins(runnerMins)} outpaces the rider's equivalent of ${formatHoursMins(mtbNormalizedEquivalentRunMins)}!`;
      
      const percent = Math.min(85, Math.max(15, 50 + (lead / 15)));
      gapVisualBar.style.width = `${percent}%`;
      gapDiffText.textContent = `Ultra Runner leads by ${lead} normalized minutes`;
    }

    renderSampleLeaderboard(mtbMins, runnerMins, mtbScore, runScore);
  }

  function renderSampleLeaderboard(userMtbMins, userRunMins, userMtbScore, userRunScore) {
    if (!leaderboardTbody) return;

    const competitors = [
      { name: "Brice Jernigan (Honorary Legend)", type: "MTB", raw: "6h 48m", score: "68.5 pts", status: "Forever Stoked 💛" },
      { name: "Marcus Torres (You - Projected MTB)", type: "MTB", raw: formatHoursMins(userMtbMins), score: `${userMtbScore} pts`, status: "Simulation" },
      { name: "Elena Rostova (You - Projected Run)", type: "RUN", raw: formatHoursMins(userRunMins), score: `${userRunScore} pts`, status: "Simulation" },
      { name: "Sarah 'Canyon Fox' Vance", type: "RUN", raw: "15h 22m", score: "65.1 pts", status: "Confirmed Racer" },
      { name: "Cole Henderson", type: "MTB", raw: "7h 12m", score: "64.6 pts", status: "Confirmed Racer" },
      { name: "Mateo Rodriguez", type: "RUN", raw: "16h 40m", score: "60.0 pts", status: "Confirmed Racer" }
    ];

    leaderboardTbody.innerHTML = competitors.map((c, i) => `
      <tr>
        <td><strong>#${i + 1}</strong></td>
        <td><strong>${c.name}</strong></td>
        <td><span class="badge-tag ${c.type === 'MTB' ? 'badge-bike' : 'badge-run'}">${c.type === 'MTB' ? '🚵 MTB' : '🏃 Ultra'}</span></td>
        <td>${c.raw}</td>
        <td><strong>${c.score}</strong></td>
        <td style="color: #94a3b8; font-size: 0.8rem;">${c.status}</td>
      </tr>
    `).join('');
  }

  // Event Listeners for MTB
  if (mtbSlider) {
    mtbSlider.addEventListener('input', (e) => {
      const val = parseInt(e.target.value, 10);
      mtbHoursInput.value = Math.floor(val / 60);
      mtbMinsInput.value = val % 60;
      recalculate();
    });
  }

  const handleMtbNumInput = () => {
    const mins = getMtbMinutes();
    if (mtbSlider) mtbSlider.value = mins;
    recalculate();
  };
  if (mtbHoursInput) mtbHoursInput.addEventListener('input', handleMtbNumInput);
  if (mtbMinsInput) mtbMinsInput.addEventListener('input', handleMtbNumInput);

  // Event Listeners for Runner
  if (runnerSlider) {
    runnerSlider.addEventListener('input', (e) => {
      const val = parseInt(e.target.value, 10);
      runnerHoursInput.value = Math.floor(val / 60);
      runnerMinsInput.value = val % 60;
      recalculate();
    });
  }

  const handleRunNumInput = () => {
    const mins = getRunnerMinutes();
    if (runnerSlider) runnerSlider.value = mins;
    recalculate();
  };
  if (runnerHoursInput) runnerHoursInput.addEventListener('input', handleRunNumInput);
  if (runnerMinsInput) runnerMinsInput.addEventListener('input', handleRunNumInput);

  // Equalize / Sync Button
  if (syncBtn) {
    syncBtn.addEventListener('click', () => {
      const mtbMins = getMtbMinutes();
      const exactTargetRunMins = Math.round(mtbMins * COURSE_RATIO);
      runnerHoursInput.value = Math.floor(exactTargetRunMins / 60);
      runnerMinsInput.value = exactTargetRunMins % 60;
      if (runnerSlider) runnerSlider.value = exactTargetRunMins;
      recalculate();
      showToast('Showdown equalized to exact dead heat!');
    });
  }

  recalculate();
}

/* ==========================================================================
   3. Course Segments Profile Switcher
   ========================================================================== */
function initCourseSegments() {
  const tabs = document.querySelectorAll('.course-tab');
  const badgeEl = document.getElementById('segment-badge');
  const titleEl = document.getElementById('segment-title');
  const descEl = document.getElementById('segment-desc');
  const gainEl = document.getElementById('segment-gain');
  const landmarksEl = document.getElementById('segment-landmarks');
  const mtbDiffEl = document.getElementById('segment-mtb-diff');
  const runDiffEl = document.getElementById('segment-run-diff');
  const aidTagsEl = document.getElementById('segment-aid-tags');
  const elevPath = document.getElementById('elevation-path');

  const segmentsData = {
    1: {
      badge: "SEGMENT 1 OF 4 (LOOP START)",
      title: "Canyon Floor & The Sycamore Canopy",
      desc: "Starting at Canyonside Community Park, competitors dive into the cool coastal air of lower Peñasquitos Canyon. Shaded oak and sycamore canopies provide smooth flow for bikes and steady rhythm for runners alongside Peñasquitos Creek.",
      gain: "+1,850 ft / -1,850 ft",
      landmarks: "Carson's Crossing, Historic Adobe Ranch House",
      mtbDiff: "Moderate Flow (Avg 14.5 mph)",
      runDiff: "Fast banking flat trail; preserve energy",
      aid: [
        "Mile 6.2: Adobe Ranch (Full Water/Electrolytes)",
        "Mile 14.8: Carson’s Bridge (Drop Bags & Hot Broth)",
        "Mile 21.0: Wagon Wheel (Medical & Cold Sponge)"
      ],
      pathD: "M 50,165 Q 120,150 170,120 T 260,140 T 360,95 T 470,155 L 470,170 L 50,170 Z"
    },
    2: {
      badge: "SEGMENT 2 OF 4 (TECHNICAL MESAS)",
      title: "Del Mar Mesa & Cobblestone Climb",
      desc: "The course punches steeply up onto the Del Mar Mesa. Famous for technical sandstone steps, dry brush tunnels, and steep punchy climbs that test bike power and runner leg turn-over.",
      gain: "+2,920 ft / -2,400 ft",
      landmarks: "Cobblestone Ridge, Mesa Tunnels, Duck Pond Overlook",
      mtbDiff: "Technical High (Avg 10.2 mph - watch pedal strikes)",
      runDiff: "Challenging uneven rocks; watch ankle rolling",
      aid: [
        "Mile 32.5: Del Mar Mesa Overlook (Spring Water & PB&J)",
        "Mile 41.0: Powerline Fire Road (Energy Gels & Salt Pills)",
        "Mile 48.2: Camel's Back Ridge (Ice Buckets & Medical)"
      ],
      pathD: "M 50,160 Q 110,90 190,60 T 310,120 T 400,50 T 470,140 L 470,170 L 50,170 Z"
    },
    3: {
      badge: "SEGMENT 3 OF 4 (THE VERT GRIND)",
      title: "Black Mountain & Nighthawk Summit Climb",
      desc: "The true separator of the race. Climbs past Miner's Ridge to the exposed crown of Black Mountain. Sweeping 360-degree views of the Pacific Ocean and San Diego backcountry with relentless headwinds.",
      gain: "+3,650 ft / -3,400 ft",
      landmarks: "Miner's Ridge Trail, Black Mountain Summit, Glider Point",
      mtbDiff: "Severe Grade (Avg 8.8 mph - high cadence required)",
      runDiff: "Power-hike zone; trekking poles recommended",
      aid: [
        "Mile 56.4: Miner's Ridge Base (Soup, Bacon, Potatoes)",
        "Mile 63.8: Black Mountain Summit (Water only & Timing Mat)",
        "Mile 72.0: Hilltop Community Staging (Pacer Hand-off)"
      ],
      pathD: "M 50,165 Q 120,130 180,80 T 290,25 T 390,90 T 470,150 L 470,170 L 50,170 Z"
    },
    4: {
      badge: "SEGMENT 4 OF 4 (BRICE'S OVERLOOK & HOME)",
      title: "Brice's Memorial Lookout & The Finish Stretch",
      desc: "The final homeward descent sweeps right past Brice's favorite trail bench in PQ Canyon. Racers ring the memorial trail bell at Mile 92 before a flying sprint through the eucalyptus grove into the cheering festival crowd.",
      gain: "+3,060 ft / -3,780 ft",
      landmarks: "Brice's Memorial Bench, Waterfall Crossing, Canyonside Finish",
      mtbDiff: "Fast Flow & Loose Corners (Avg 13.8 mph)",
      runDiff: "Dig deep; downhill quad buster into finish",
      aid: [
        "Mile 82.5: Lopez Ridge Aid (Quesadillas, Ginger Ale)",
        "Mile 92.0: Brice's Rock Memorial Station (Trail Bell & Toast)",
        "Mile 100.0: The Finish Line Festival at Canyonside Park!"
      ],
      pathD: "M 50,140 Q 140,85 220,110 T 320,70 T 420,160 T 470,165 L 470,170 L 50,170 Z"
    }
  };

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      const segId = tab.dataset.segment;
      const data = segmentsData[segId];
      if (!data) return;

      badgeEl.textContent = data.badge;
      titleEl.textContent = data.title;
      descEl.textContent = data.desc;
      gainEl.textContent = data.gain;
      landmarksEl.textContent = data.landmarks;
      mtbDiffEl.textContent = data.mtbDiff;
      runDiffEl.textContent = data.runDiff;

      aidTagsEl.innerHTML = data.aid.map(a => `<span class="aid-tag">${a}</span>`).join('');
      if (elevPath) elevPath.setAttribute('d', data.pathD);
    });
  });
}

/* ==========================================================================
   4. Interactive 100-Mile Dedication Grid
   ========================================================================== */
const sponsoredMilesData = {
  1: { sponsor: "The Jernigan Family", msg: "For Brice: You will always lead the pack. Ride in peace." },
  7: { sponsor: "San Diego Mountain Biking Assoc.", msg: "To every rider who found healing in the dirt." },
  14: { sponsor: "Del Mar Mesa Trail Crew", msg: "Honoring Brice's infectious laugh and trail grit." },
  25: { sponsor: "PQ Canyon Trail Keepers", msg: "First loop down. Brice is riding right next to you." },
  33: { sponsor: "In Memory of Tyler R.", msg: "Depression doesn't win today. Keep going." },
  42: { sponsor: "Carson & Marcus", msg: "Mile 42: The answer to everything, brother." },
  50: { sponsor: "AFSP San Diego", msg: "Halfway home. You are never alone in the dark." },
  68: { sponsor: "Black Mountain Singletrackers", msg: "Hammer the climbs, savor the descents." },
  75: { sponsor: "Sara & Leo", msg: "Running for everyone fighting quiet battles." },
  88: { sponsor: "988 Crisis Lifeline Advocates", msg: "Dial 988. There is hope on the other side." },
  92: { sponsor: "Brice's Ride Crew", msg: "Brice's Bench: Ring the bell and send it home!" },
  100: { sponsor: "All of Us", msg: "We made you a promise, Brice. We kept it." }
};

function initMileGrid() {
  const gridEl = document.getElementById('mile-tiles-grid');
  const previewEl = document.getElementById('mile-detail-preview');
  if (!gridEl) return;

  gridEl.innerHTML = '';

  for (let m = 1; m <= 100; m++) {
    const isSponsored = !!sponsoredMilesData[m];
    const tile = document.createElement('div');
    tile.className = `mile-tile ${isSponsored ? 'sponsored' : 'available'}`;
    tile.textContent = m;
    tile.dataset.mile = m;
    tile.setAttribute('title', isSponsored ? `Mile ${m}: Sponsored by ${sponsoredMilesData[m].sponsor}` : `Mile ${m}: Available to sponsor`);

    tile.addEventListener('click', () => {
      document.querySelectorAll('.mile-tile').forEach(t => t.classList.remove('selected'));
      tile.classList.add('selected');

      if (isSponsored) {
        const item = sponsoredMilesData[m];
        previewEl.innerHTML = `
          <div class="preview-active">
            <div>
              <div class="preview-mile-title">Mile ${m} of 100 • DEDICATED</div>
              <p class="preview-mile-dedication">“${item.msg}”</p>
              <span class="preview-mile-sponsor">Dedicated by: <strong>${item.sponsor}</strong></span>
            </div>
            <button class="btn btn-secondary btn-sm" onclick="openSponsorModal(${m})">Sponsor Another Mile</button>
          </div>
        `;
      } else {
        previewEl.innerHTML = `
          <div class="preview-active">
            <div>
              <div class="preview-mile-title">Mile ${m} of 100 • AVAILABLE TO SPONSOR</div>
              <p class="preview-mile-dedication" style="color: #cbd5e1; font-style: normal;">
                Place your custom dedication sign on Mile ${m} along the race course in PQ Canyon.
              </p>
              <span class="preview-mile-sponsor">100% benefits suicide prevention programs ($100 tax-deductible).</span>
            </div>
            <button class="btn btn-primary btn-sm" onclick="openSponsorModal(${m})">Sponsor Mile ${m} for $100</button>
          </div>
        `;
      }
    });

    gridEl.appendChild(tile);
  }
}

/* ==========================================================================
   5. Community Tribute Wall Logic & Persistence
   ========================================================================== */
const defaultTributes = [
  {
    id: 1,
    category: "brice",
    author: "Kevin 'Kev-O' Larson",
    role: "PQ Trail Riding Buddy",
    text: "Brice was the first guy to stop and help me when I broke my chain 8 miles out in Peñasquitos back in 2021. He shared his tube, gave me half his sandwich, and talked with me until sunset. Man had a heart as big as the canyon.",
    date: "2 days ago"
  },
  {
    id: 2,
    category: "hope",
    author: "Dr. Rachel Sterling",
    role: "Suicide Prevention Counselor & Runner",
    text: "Events like this literally save lives. When we strip away the shame and meet people in the grit and camaraderie of the trails, darkness loses its grip. To anyone hurting tonight: stay. The world needs your story.",
    date: "3 days ago"
  },
  {
    id: 3,
    category: "brice",
    author: "Samantha & Chris J.",
    role: "San Diego Cycling Community",
    text: "We promised him a party. A big, dusty, rowdy, taco-eating celebration. We are bringing 20 riders from North County to leave everything we have on that dirt for Brice.",
    date: "4 days ago"
  },
  {
    id: 4,
    category: "hope",
    author: "Mark C.",
    role: "Ultra Marathoner",
    text: "I survived my own suicide attempt in 2019. Running 100 miles taught me that pain always has a finish line if you keep putting one foot in front of the other. Running 100 for you, Brice.",
    date: "5 days ago"
  },
  {
    id: 5,
    category: "brice",
    author: "Dave 'Shred' Miller",
    role: "Local Trail Builder",
    text: "Every time I drop into the canyon at golden hour, I still expect to hear Brice's loud laugh echoed off the rock walls. Ride on, brother. We won't forget you.",
    date: "6 days ago"
  },
  {
    id: 6,
    category: "hope",
    author: "Elena G.",
    role: "Mother & Mental Health Advocate",
    text: "Lost my son 3 years ago. Seeing this community wrap its arms around Brice and every soul battling depression brings tears of hope to my eyes. Thank you for doing this.",
    date: "1 week ago"
  }
];

function initTributes() {
  const container = document.getElementById('tribute-cards-container');
  const filters = document.querySelectorAll('.t-filter');
  const countAll = document.getElementById('count-all');
  const countBrice = document.getElementById('count-brice');
  const countHope = document.getElementById('count-hope');

  let tributes = JSON.parse(localStorage.getItem('brice_tributes')) || defaultTributes;

  function renderTributes(filterCategory = 'all') {
    if (!container) return;

    const filtered = filterCategory === 'all' 
      ? tributes 
      : tributes.filter(t => t.category === filterCategory);

    container.innerHTML = filtered.map(t => `
      <div class="tribute-card animate-fade-in">
        <span class="tribute-tag ${t.category === 'brice' ? 'tag-brice' : 'tag-hope'}">
          ${t.category === 'brice' ? '💛 Story of Brice' : '🌱 Message of Hope'}
        </span>
        <p class="tribute-body">“${escapeHtml(t.text)}”</p>
        <div class="tribute-footer">
          <div>
            <div class="tribute-author">${escapeHtml(t.author)}</div>
            <div class="tribute-role">${escapeHtml(t.role)}</div>
          </div>
          <span style="font-size: 0.72rem; color: #64748b;">${t.date}</span>
        </div>
      </div>
    `).join('');

    // Update counts
    if (countAll) countAll.textContent = tributes.length;
    if (countBrice) countBrice.textContent = tributes.filter(t => t.category === 'brice').length;
    if (countHope) countHope.textContent = tributes.filter(t => t.category === 'hope').length;
  }

  filters.forEach(btn => {
    btn.addEventListener('click', () => {
      filters.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderTributes(btn.dataset.filter);
    });
  });

  renderTributes('all');

  // New tribute submission
  const tributeForm = document.getElementById('tribute-form');
  if (tributeForm) {
    tributeForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const author = document.getElementById('trib-author').value.trim();
      const relation = document.getElementById('trib-relation').value;
      const text = document.getElementById('trib-text').value.trim();

      if (!author || !text) return;

      const newTribute = {
        id: Date.now(),
        category: relation === 'hope' ? 'hope' : 'brice',
        author: author,
        role: relation === 'hope' ? 'Community Advocate' : 'Friend & Supporter',
        text: text,
        date: 'Just now'
      };

      tributes.unshift(newTribute);
      localStorage.setItem('brice_tributes', JSON.stringify(tributes));
      renderTributes('all');

      tributeForm.reset();
      closeModal('tribute-modal');
      showToast('Thank you! Your tribute has been posted to Brice\'s Memorial Wall.');
    });
  }
}

/* ==========================================================================
   6. Modals System & Fundraising Progress Management
   ========================================================================== */
let totalRaised = 68450;
const goalAmount = 100000;

function updateFundDisplay(amountAdded = 0) {
  totalRaised += amountAdded;
  const heroDisplay = document.getElementById('hero-raised-display');
  const meterDisplay = document.getElementById('current-raised-val');
  const progressFill = document.getElementById('fund-progress-fill');

  const formatted = `$${totalRaised.toLocaleString()}`;
  if (heroDisplay) heroDisplay.textContent = formatted;
  if (meterDisplay) meterDisplay.textContent = formatted;

  const pct = Math.min(100, (totalRaised / goalAmount) * 100).toFixed(1);
  if (progressFill) progressFill.style.width = `${pct}%`;
}

function initModals() {
  // Modal Triggers
  setupModalTrigger('open-crisis-modal-btn', 'crisis-modal');
  setupModalTrigger('open-tribute-modal-btn', 'tribute-modal');
  setupModalTrigger('open-new-tribute-btn', 'tribute-modal');
  setupModalTrigger('open-sponsor-modal-btn', 'sponsor-modal');
  setupModalTrigger('header-donate-btn', 'donate-modal');
  setupModalTrigger('hero-donate-btn', 'donate-modal');
  setupModalTrigger('promise-donate-btn', 'donate-modal');
  setupModalTrigger('header-register-btn', 'register-modal');
  setupModalTrigger('hero-register-btn', 'register-modal');

  // Registration category buttons across the page
  document.querySelectorAll('[data-category]').forEach(btn => {
    btn.addEventListener('click', () => {
      const cat = btn.dataset.category;
      const select = document.getElementById('reg-discipline');
      if (select) {
        if (cat.includes('mtb')) select.value = 'mtb-solo';
        else if (cat.includes('run')) select.value = 'run-solo';
        else if (cat.includes('dual')) select.value = 'dual-sport';
        else if (cat.includes('5k')) select.value = 'memorial-5k';
      }
      openModal('register-modal');
    });
  });

  // Modal Closers
  setupModalCloser('close-reg-modal', 'register-modal');
  setupModalCloser('close-donate-modal', 'donate-modal');
  setupModalCloser('close-tribute-modal', 'tribute-modal');
  setupModalCloser('close-sponsor-modal', 'sponsor-modal');
  setupModalCloser('close-crisis-modal', 'crisis-modal');

  // Backdrop click to close
  document.querySelectorAll('.modal-backdrop').forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  });

  // Donation Amount Quick Selectors
  const donBtns = document.querySelectorAll('.don-amt-btn');
  const customDonInput = document.getElementById('custom-don-amt');
  donBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      donBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      if (customDonInput) customDonInput.value = btn.dataset.amt;
    });
  });

  // Donation Form Submission
  const donForm = document.getElementById('donation-form');
  if (donForm) {
    donForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const amt = parseInt(customDonInput.value, 10) || 50;
      const name = document.getElementById('don-donor-name').value.trim() || 'A Friend of Brice';
      updateFundDisplay(amt);
      donForm.reset();
      closeModal('donate-modal');
      showToast(`Thank you, ${name}! Your gift of $${amt} directly supports suicide prevention.`);
    });
  }

  // Registration Form Submission
  const regForm = document.getElementById('registration-form');
  if (regForm) {
    regForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('reg-name').value.trim();
      const disc = document.getElementById('reg-discipline').options[document.getElementById('reg-discipline').selectedIndex].text;
      
      // Calculate donation from reg
      updateFundDisplay(100);
      regForm.reset();
      closeModal('register-modal');
      showToast(`Welcome to the starting line, ${name}! Registered for ${disc}. See you at Brice's Party!`);
    });
  }

  // Sponsor Mile Form Submission
  const sponsorForm = document.getElementById('sponsor-mile-form');
  if (sponsorForm) {
    sponsorForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const mileNum = parseInt(document.getElementById('sponsor-mile-num').value, 10);
      const sponsorName = document.getElementById('sponsor-name').value.trim();
      const msg = document.getElementById('sponsor-message').value.trim();

      sponsoredMilesData[mileNum] = {
        sponsor: sponsorName,
        msg: msg
      };

      initMileGrid();
      updateFundDisplay(100);
      sponsorForm.reset();
      closeModal('sponsor-modal');
      showToast(`Mile ${mileNum} dedicated to Brice by ${sponsorName}! Marker will be placed on course.`);
    });
  }
}

function openModal(id) {
  const el = document.getElementById(id);
  if (el) {
    el.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeModal(id) {
  const el = document.getElementById(id);
  if (el) {
    el.classList.remove('active');
    document.body.style.overflow = '';
  }
}

function setupModalTrigger(btnId, modalId) {
  const btn = document.getElementById(btnId);
  if (btn) {
    btn.addEventListener('click', () => openModal(modalId));
  }
}

function setupModalCloser(btnId, modalId) {
  const btn = document.getElementById(btnId);
  if (btn) {
    btn.addEventListener('click', () => closeModal(modalId));
  }
}

window.openSponsorModal = function(mileNum) {
  const input = document.getElementById('sponsor-mile-num');
  if (input) input.value = mileNum;
  openModal('sponsor-modal');
};

/* ==========================================================================
   7. FAQ Accordion
   ========================================================================== */
function initFAQ() {
  const items = document.querySelectorAll('.faq-item');
  items.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (questionBtn) {
      questionBtn.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');
        items.forEach(i => {
          i.classList.remove('open');
          i.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
        });
        if (!isOpen) {
          item.classList.add('open');
          questionBtn.setAttribute('aria-expanded', 'true');
        }
      });
    }
  });
}

/* ==========================================================================
   8. Mobile Navigation Menu
   ========================================================================== */
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobile-menu-btn');
  const nav = document.getElementById('main-nav');
  if (!toggleBtn || !nav) return;

  toggleBtn.addEventListener('click', () => {
    nav.classList.toggle('mobile-active');
  });

  nav.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('mobile-active');
    });
  });
}

/* ==========================================================================
   9. Newsletter Form
   ========================================================================== */
function initNewsletter() {
  const form = document.getElementById('subscribe-form');
  const msg = document.getElementById('subscribe-msg');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('subscribe-email').value;
    if (msg) msg.textContent = `Thank you! Updates will be sent to ${email}.`;
    form.reset();
  });
}

/* ==========================================================================
   10. Toast Helper
   ========================================================================== */
function showToast(message) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <span>🎗️</span>
    <span>${escapeHtml(message)}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    setTimeout(() => toast.remove(), 300);
  }, 4200);
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}
