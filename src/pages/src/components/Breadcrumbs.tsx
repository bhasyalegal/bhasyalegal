import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  // Exclude certain paths
  if (pathnames.length === 0) return null;

  return (
    <nav className="text-sm text-gray-500 dark:text-gray-400 mb-4 flex items-center gap-1">
      <Link to="/" className="hover:text-law-gold">Home</Link>
      {pathnames.map((name, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;
        const displayName = name.charAt(0).toUpperCase() + name.slice(1).replace(/-/g, ' ');
        return (
          <React.Fragment key={routeTo}>
            <ChevronRight className="w-3 h-3" />
            {isLast ? (
              <span className="text-royal-blue dark:text-white font-medium">{displayName}</span>
            ) : (
              <Link to={routeTo} className="hover:text-law-gold">{displayName}</Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};

export default Breadcrumbs;