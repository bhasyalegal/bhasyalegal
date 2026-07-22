import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';

const NotFound = () => {
  const { language } = useLanguage();
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex flex-col items-center justify-center px-4 py-20">
      <h1 className="text-6xl md:text-8xl font-serif font-bold text-law-gold mb-4">404</h1>
      <h2 className="text-2xl md:text-3xl font-serif text-royal-blue dark:text-white mb-4">
        {language === 'en' ? 'Page Not Found' : 'पृष्ठ फेला परेन'}
      </h2>
      <p className="text-gray-600 dark:text-gray-300 text-center max-w-md mb-8">
        {language === 'en'
          ? 'The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.'
          : 'तपाईंले खोज्नुभएको पृष्ठ हटाइएको हुन सक्छ, यसको नाम परिवर्तन भएको हुन सक्छ, वा अस्थायी रूपमा अनुपलब्ध छ।'}
      </p>
      <Button asChild className="bg-law-gold text-royal-blue hover:bg-law-gold/90">
        <Link to="/">{language === 'en' ? 'Back to Home' : 'गृह पृष्ठमा फर्कनुहोस्'}</Link>
      </Button>
    </div>
  );
};

export default NotFound;