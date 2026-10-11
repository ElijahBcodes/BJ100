'use client';

import { useState, useEffect } from 'react';
import CrisisBar from '@/components/CrisisBar';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import PromiseMemorial from '@/components/PromiseMemorial';
import ShowdownSection from '@/components/ShowdownSection';
import CalculatorSection from '@/components/CalculatorSection';
import CourseSection from '@/components/CourseSection';
import RaceParty from '@/components/RaceParty';
import FundraiserSection from '@/components/FundraiserSection';
import TributeSection from '@/components/TributeSection';
import RegistrationSection from '@/components/RegistrationSection';
import FAQSection from '@/components/FAQSection';
import CrisisCallout from '@/components/CrisisCallout';
import Footer from '@/components/Footer';
import Modals from '@/components/Modals';

const initialSponsoredMiles = {
  1: { sponsor: 'The Jernigan Family', msg: 'For Brice: You will always lead the pack. Ride in peace.' },
  7: { sponsor: 'San Diego Mountain Biking Assoc.', msg: 'To every rider who found healing in the dirt.' },
  14: { sponsor: 'Del Mar Mesa Trail Crew', msg: "Honoring Brice's infectious laugh and trail grit." },
  25: { sponsor: 'PQ Canyon Trail Keepers', msg: 'First loop down. Brice is riding right next to you.' },
  33: { sponsor: 'In Memory of Tyler R.', msg: "Depression doesn't win today. Keep going." },
  42: { sponsor: 'Carson & Marcus', msg: 'Mile 42: The answer to everything, brother.' },
  50: { sponsor: 'AFSP San Diego', msg: 'Halfway home. You are never alone in the dark.' },
  68: { sponsor: 'Black Mountain Singletrackers', msg: 'Hammer the climbs, savor the descents.' },
  75: { sponsor: 'Sara & Leo', msg: 'Running for everyone fighting quiet battles.' },
  88: { sponsor: '988 Crisis Lifeline Advocates', msg: 'Dial 988. There is hope on the other side.' },
  92: { sponsor: "Brice's Ride Crew", msg: "Brice's Bench: Ring the bell and send it home!" },
  100: { sponsor: 'All of Us', msg: 'We made you a promise, Brice. We kept it.' }
};

const defaultTributes = [
  {
    id: 1,
    category: 'brice',
    author: "Kevin 'Kev-O' Larson",
    role: 'PQ Trail Riding Buddy',
    text: 'Brice was the first guy to stop and help me when I broke my chain 8 miles out in Peñasquitos back in 2021. He shared his tube, gave me half his sandwich, and talked with me until sunset. Man had a heart as big as the canyon.',
    date: '2 days ago'
  },
  {
    id: 2,
    category: 'hope',
    author: 'Dr. Rachel Sterling',
    role: 'Suicide Prevention Counselor & Runner',
    text: 'Events like this literally save lives. When we strip away the shame and meet people in the grit and camaraderie of the trails, darkness loses its grip. To anyone hurting tonight: stay. The world needs your story.',
    date: '3 days ago'
  },
  {
    id: 3,
    category: 'brice',
    author: 'Samantha & Chris J.',
    role: 'San Diego Cycling Community',
    text: 'We promised him a party. A big, dusty, rowdy, taco-eating celebration. We are bringing 20 riders from North County to leave everything we have on that dirt for Brice.',
    date: '4 days ago'
  },
  {
    id: 4,
    category: 'hope',
    author: 'Mark C.',
    role: 'Ultra Marathoner',
    text: 'I survived my own suicide attempt in 2019. Running 100 miles taught me that pain always has a finish line if you keep putting one foot in front of the other. Running 100 for you, Brice.',
    date: '5 days ago'
  },
  {
    id: 5,
    category: 'brice',
    author: "Dave 'Shred' Miller",
    role: 'Local Trail Builder',
    text: "Every time I drop into the canyon at golden hour, I still expect to hear Brice's loud laugh echoed off the rock walls. Ride on, brother. We won't forget you.",
    date: '6 days ago'
  },
  {
    id: 6,
    category: 'hope',
    author: 'Elena G.',
    role: 'Mother & Mental Health Advocate',
    text: 'Lost my son 3 years ago. Seeing this community wrap its arms around Brice and every soul battling depression brings tears of hope to my eyes. Thank you for doing this.',
    date: '1 week ago'
  }
];

export default function Home() {
  const [totalRaised, setTotalRaised] = useState(68450);
  const [sponsoredMiles, setSponsoredMiles] = useState(initialSponsoredMiles);
  const [tributes, setTributes] = useState(defaultTributes);
  const [activeModal, setActiveModal] = useState(null);
  const [selectedMileForSponsor, setSelectedMileForSponsor] = useState(42);
  const [registerCategory, setRegisterCategory] = useState('mtb-solo');
  const [toasts, setToasts] = useState([]);

  // Load persisted tributes on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('brice_tributes_react');
      if (saved) {
        setTributes(JSON.parse(saved));
      }
    } catch {
      // Ignore localStorage errors
    }
  }, []);

  const showToast = (message) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  const handleAddDonation = (amount) => {
    setTotalRaised((prev) => prev + amount);
  };

  const handleAddTribute = (newTrib) => {
    setTributes((prev) => {
      const updated = [newTrib, ...prev];
      try {
        localStorage.setItem('brice_tributes_react', JSON.stringify(updated));
      } catch {
        // Ignore
      }
      return updated;
    });
  };

  const handleSponsorMile = (mileNum, info) => {
    setSponsoredMiles((prev) => ({
      ...prev,
      [mileNum]: info
    }));
  };

  const openRegisterModal = (cat = 'mtb-solo') => {
    setRegisterCategory(cat);
    setActiveModal('register');
  };

  const openSponsorModal = (mileNum = 42) => {
    setSelectedMileForSponsor(mileNum);
    setActiveModal('sponsor');
  };

  return (
    <>
      <CrisisBar onOpenCrisisModal={() => setActiveModal('crisis')} />
      <Header
        onOpenDonate={() => setActiveModal('donate')}
        onOpenRegister={() => openRegisterModal('mtb-solo')}
      />

      <main id="main-content">
        <Hero
          totalRaised={totalRaised}
          onOpenRegister={openRegisterModal}
          onOpenDonate={() => setActiveModal('donate')}
        />

        <PromiseMemorial
          onOpenTribute={() => setActiveModal('tribute')}
          onOpenDonate={() => setActiveModal('donate')}
        />

        <ShowdownSection onOpenRegister={openRegisterModal} />

        <CalculatorSection onShowToast={showToast} />

        <CourseSection />

        <RaceParty />

        <FundraiserSection
          totalRaised={totalRaised}
          sponsoredMiles={sponsoredMiles}
          onOpenSponsorModal={openSponsorModal}
        />

        <TributeSection
          tributes={tributes}
          onOpenNewTribute={() => setActiveModal('tribute')}
        />

        <RegistrationSection onOpenRegister={openRegisterModal} />

        <FAQSection />

        <CrisisCallout />
      </main>

      <Footer />

      <Modals
        activeModal={activeModal}
        onCloseModal={() => setActiveModal(null)}
        onAddDonation={handleAddDonation}
        onAddTribute={handleAddTribute}
        onSponsorMile={handleSponsorMile}
        selectedMileForSponsor={selectedMileForSponsor}
        registerCategory={registerCategory}
        onShowToast={showToast}
      />

      {/* Floating Toast Alerts */}
      <div className="toast-container" aria-live="polite">
        {toasts.map((t) => (
          <div key={t.id} className="toast">
            <span>🎗️</span>
            <span>{t.message}</span>
          </div>
        ))}
      </div>
    </>
  );
}
