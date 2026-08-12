import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone } from 'lucide-react';

const StickyCTA = () => {
  const location = useLocation();

  // The Home hero already contains its primary consultation actions.
  // Keep the sticky CTA for other pages, but never show it on Home.
  if (location.pathname === '/' || location.pathname === '/home') return null;

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-royal-blue p-4 shadow-lg">
      <Link
        to="/contact"
        className="flex items-center justify-center gap-2 bg-law-gold text-royal-blue font-bold py-3 px-4 rounded-lg w-full"
      >
        <Phone className="w-5 h-5" />
        Schedule a Consultation
      </Link>
    </div>
  );
};

export default StickyCTA;