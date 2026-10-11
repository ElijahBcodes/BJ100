'use client';

import { useState } from 'react';

export default function TributeSection({ tributes, onOpenNewTribute }) {
  const [filter, setFilter] = useState('all');

  const filtered = filter === 'all'
    ? tributes
    : tributes.filter((t) => t.category === filter);

  const countAll = tributes.length;
  const countBrice = tributes.filter((t) => t.category === 'brice').length;
  const countHope = tributes.filter((t) => t.category === 'hope').length;

  return (
    <section className="section tribute-section" id="tributes">
      <div className="container">
        <div className="tribute-header-flex">
          <div>
            <div className="section-tag">COMMUNITY VOICES</div>
            <h2 className="section-title">The Brice Jernigan Tribute Wall</h2>
            <p className="section-subtitle">
              Leave a memory of Brice, a message to his family, or an encouraging note to anyone who is fighting depression right now.
            </p>
          </div>
          <button type="button" className="btn btn-primary" onClick={onOpenNewTribute}>
            + Add Your Tribute
          </button>
        </div>

        <div className="tribute-filters" role="tablist">
          <button
            type="button"
            className={`t-filter ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All Messages ({countAll})
          </button>
          <button
            type="button"
            className={`t-filter ${filter === 'brice' ? 'active' : ''}`}
            onClick={() => setFilter('brice')}
          >
            Stories of Brice ({countBrice})
          </button>
          <button
            type="button"
            className={`t-filter ${filter === 'hope' ? 'active' : ''}`}
            onClick={() => setFilter('hope')}
          >
            Messages of Hope ({countHope})
          </button>
        </div>

        <div className="tribute-cards-grid">
          {filtered.map((t) => (
            <div key={t.id} className="tribute-card animate-fade-in">
              <span className={`tribute-tag ${t.category === 'brice' ? 'tag-brice' : 'tag-hope'}`}>
                {t.category === 'brice' ? '💛 Story of Brice' : '🌱 Message of Hope'}
              </span>
              <p className="tribute-body">“{t.text}”</p>
              <div className="tribute-footer">
                <div>
                  <div className="tribute-author">{t.author}</div>
                  <div className="tribute-role">{t.role}</div>
                </div>
                <span style={{ fontSize: '0.72rem', color: '#64748b' }}>{t.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
