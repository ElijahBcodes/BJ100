'use client';

import { useState } from 'react';

const faqs = [
  {
    q: "Why don't the mountain bikers and runners race on the same day?",
    a: "Safety and trail integrity in Los Peñasquitos Canyon are our highest priorities. 100 miles of mountain biking on singletrack carries high speeds and braking zones that would endanger runners, while runners traversing blind corners would create hazard for riders. Running mountain bikes on Saturday and runners on Sunday allows each athlete to push their absolute limit in clean, safe conditions—while our calibrated handicap index lets you battle for the overall weekend crown."
  },
  {
    q: "How does the 'Runners vs Mountain Bikers' handicap calculation work?",
    a: "The 'Brice Index' uses a calibrated 2.15x course factor derived from historical mountain bike vs ultra marathon splits over the same 11,480-foot elevation profile in PQ Canyon. At registration, racers can opt-in to the cross-discipline showdown. Times are normalized in our live timing system to produce a unified leaderboard."
  },
  {
    q: "Can I attend Brice's Big Race Party even if I don't run or ride?",
    a: "YES! Absolutely! That was the entire core of the promise we made to Brice. The party at Canyonside Park is free and open to everyone—friends, family, local San Diego residents, hikers, and advocates. Food trucks, beer garden, and live bands will be rocking from Saturday afternoon through Sunday night."
  },
  {
    q: "Where do the charity proceeds go?",
    a: "100% of net proceeds go directly to suicide prevention organizations. Our primary partner is the American Foundation for Suicide Prevention (San Diego Chapter), alongside local San Diego crisis response teams and the 988 Suicide & Crisis Lifeline crisis counselor training programs."
  },
  {
    q: "Are pacers and crew allowed for the 100-mile ultra runners?",
    a: "Yes. Ultra runners may have a designated safety pacer accompany them on foot from Mile 50 (start of Loop 3) until the finish line. Crew access is available at Canyonside Park main staging and Carson's Crossing aid station."
  }
];

export default function FAQSection() {
  const [openIdx, setOpenIdx] = useState(null);

  const toggle = (idx) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section className="section faq-section" id="faq">
      <div className="container">
        <div className="section-header text-center">
          <div className="section-tag">RACE DETAILS & QUESTIONS</div>
          <h2 className="section-title">Frequently Asked Questions</h2>
        </div>

        <div className="faq-accordion-grid">
          {faqs.map((f, i) => {
            const isOpen = openIdx === i;
            return (
              <div key={f.q} className={`faq-item glass-panel ${isOpen ? 'open' : ''}`}>
                <button
                  type="button"
                  className="faq-question"
                  aria-expanded={isOpen}
                  onClick={() => toggle(i)}
                >
                  <span>{f.q}</span>
                  <span className="faq-arrow">↓</span>
                </button>
                <div className="faq-answer">
                  <p>{f.a}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
