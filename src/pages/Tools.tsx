import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const Tools = () => {
  const { language } = useLanguage();
  const [income, setIncome] = useState('');
  const [children, setChildren] = useState(1);
  const [result, setResult] = useState<number | null>(null);

  const calculateChildSupport = () => {
    const inc = parseFloat(income);
    if (isNaN(inc) || inc <= 0) return;
    // Simple formula: 25% for 1 child, 33% for 2, 40% for 3+
    const rate = children === 1 ? 0.25 : children === 2 ? 0.33 : 0.40;
    setResult(inc * rate);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 py-20">
      <div className="container mx-auto px-4 max-w-2xl">
        <h1 className="text-4xl font-serif font-bold text-royal-blue dark:text-white mb-6">
          {language === 'en' ? 'Legal Tools' : 'कानूनी उपकरणहरू'}
        </h1>
        <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-xl shadow-md">
          <h2 className="text-2xl font-serif font-semibold text-royal-blue dark:text-white mb-4">
            {language === 'en' ? 'Child Support Estimator' : 'बाल सहायता अनुमानक'}
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {language === 'en' ? 'Monthly Income (NPR)' : 'मासिक आम्दानी (ने.रु.)'}
              </label>
              <input
                type="number"
                value={income}
                onChange={(e) => setIncome(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                placeholder="e.g. 50000"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {language === 'en' ? 'Number of Children' : 'बालबालिकाको संख्या'}
              </label>
              <input
                type="number"
                min="1"
                max="5"
                value={children}
                onChange={(e) => setChildren(parseInt(e.target.value) || 1)}
                className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
              />
            </div>
            <button
              onClick={calculateChildSupport}
              className="w-full bg-law-gold text-royal-blue font-semibold py-3 rounded-lg hover:bg-law-gold/90 transition"
            >
              {language === 'en' ? 'Calculate' : 'गणना गर्नुहोस्'}
            </button>
            {result !== null && (
              <div className="mt-4 p-4 bg-green-100 dark:bg-green-900/30 rounded-lg">
                <p className="text-lg font-semibold text-royal-blue dark:text-white">
                  {language === 'en' ? 'Estimated monthly support: ' : 'अनुमानित मासिक सहायता: '}
                  <span className="text-law-gold">NPR {result.toFixed(2)}</span>
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                  {language === 'en'
                    ? '* This is a rough estimate. Actual amounts may vary based on court decisions.'
                    : '* यो मोटामोटी अनुमान हो। वास्तविक रकम अदालतको निर्णयमा भिन्न हुन सक्छ।'}
                </p>
              </div>
            )}
          </div>
        </div>
        <div className="mt-8 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
          <p className="text-sm text-gray-700 dark:text-gray-300">
            {language === 'en'
              ? '⚠️ Disclaimer: These tools provide general estimates and do not constitute legal advice. Consult a qualified attorney for your specific case.'
              : '⚠️ अस्वीकरण: यी उपकरणहरूले सामान्य अनुमान मात्र प्रदान गर्छन् र कानूनी सल्लाह होइनन्। आफ्नो विशिष्ट मामिलाको लागि योग्य अधिवक्तासँग परामर्श गर्नुहोस्।'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Tools;
