import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Calendar, User, ArrowRight, Scale } from 'lucide-react';

const Blog = () => {
  const { language } = useLanguage();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/posts.json')
      .then(res => res.json())
      .then(data => {
        setPosts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const content = {
    en: {
      title: 'Legal Insights & Columns',
      subtitle: 'From the chambers of Bhasya Legal',
      description: 'Critical analysis, statutory updates, and modern corporate legal developments across the jurisdiction of Nepal.',
      readMore: 'Review Analysis',
      noPosts: 'No legal briefs compiled yet. Check back shortly.',
    },
    np: {
      title: 'कानूनी अन्तरदृष्टि र अपडेटहरू',
      subtitle: 'भास्य कानूनको डेस्कबाट',
      description: 'हाम्रो टोलीबाट नवीनतम कानूनी विकासको जानकारी रहनुहोस्।',
      readMore: 'थप पढ्नुहोस्',
      noPosts: 'अहिलेसम्म कुनै ब्लग पोस्ट छैन। चाँडै हेर्नुहोस्।',
    },
  };

  const c = language === 'en' ? content.en : content.np;

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#D4AF37]"></div>
        <Scale className="w-5 h-5 text-[#D4AF37]/40 animate-pulse absolute" />
      </div>
    );
  }

  return (
    <div className="py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Editorial Frame Header */}
        <div className="text-center mb-16 md:mb-20 max-w-3xl mx-auto space-y-4">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground tracking-tight">
            {c.title}
          </h1>
          <p className="text-sm md:text-base text-[#D4AF37] font-medium uppercase tracking-widest">
            {c.subtitle}
          </p>
          <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto my-4" />
          <p className="text-muted-foreground font-light leading-relaxed">
            {c.description}
          </p>
        </div>

        {/* Dynamic Card Architecture Grid */}
        {posts.length === 0 ? (
          <div className="text-center p-12 card-premium max-w-md mx-auto">
            <p className="text-muted-foreground text-sm font-light">{c.noPosts}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-10">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="card-premium overflow-hidden flex flex-col group"
              >
                {/* Embedded Illustration Shell */}
                {post.coverImage && (
                  <div className="w-full h-52 overflow-hidden relative border-b border-[#D4AF37]/10">
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      loading="lazy"
                      className="w-full h-full object-cover transform scale-101 group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}
                
                {/* Content Box */}
                <div className="p-6 md:p-8 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    
                    {/* Inline Content Metadata Row */}
                    <div className="flex items-center gap-4 text-xs text-muted-foreground font-light">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" />
                        {new Date(post.date).toLocaleDateString(
                          language === 'en' ? 'en-US' : 'ne-NP'
                        )}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-[#D4AF37]" />
                        {post.author}
                      </span>
                    </div>

                    {/* Heading Component Links */}
                    <h2 className="text-xl font-serif font-bold text-foreground leading-snug group-hover:text-[#D4AF37] transition-colors duration-200">
                      <Link to={`/blog/${post.slug}`} className="focus:outline-none">
                        {post.title}
                      </Link>
                    </h2>

                    {/* Shortened Summary Blocks */}
                    <p className="text-muted-foreground text-sm line-clamp-3 font-light leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>

                  {/* Core Interaction Anchor */}
                  <div className="pt-4 border-t border-border/40">
                    <Link
                      to={`/blog/${post.slug}`}
                      className="inline-flex items-center text-xs uppercase tracking-wider font-semibold text-[#D4AF37] hover:text-[#b89327] transition-colors group/btn"
                    >
                      <span>{c.readMore}</span> 
                      <ArrowRight className="w-3.5 h-3.5 ml-1.5 transform group-hover/btn:translate-x-1.5 transition-transform" />
                    </Link>
                  </div>
                  
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;