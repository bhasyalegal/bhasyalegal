import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Calendar, User, ArrowRight } from 'lucide-react';

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
      title: 'Legal Insights & Updates',
      subtitle: 'From the desk of Bhasya Legal',
      description: 'Stay informed with the latest legal developments, case commentaries, and practical advice from our team.',
      readMore: 'Read More',
      noPosts: 'No blog posts yet. Check back soon!',
    },
    np: {
      title: 'कानूनी अन्तरदृष्टि र अपडेटहरू',
      subtitle: 'भास्य कानूनको डेस्कबाट',
      description: 'हाम्रो टोलीबाट नवीनतम कानूनी विकास, केस टिप्पणी, र व्यावहारिक सल्लाहको जानकारी रहनुहोस्।',
      readMore: 'थप पढ्नुहोस्',
      noPosts: 'अहिलेसम्म कुनै ब्लग पोस्ट छैन। चाँडै हेर्नुहोस्!',
    },
  };

  const c = language === 'en' ? content.en : content.np;

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-law-gold"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-royal-blue dark:text-white mb-4">
            {c.title}
          </h1>
          <p className="text-lg text-law-gold font-medium mb-4">{c.subtitle}</p>
          <div className="w-24 h-1 bg-law-gold mx-auto mb-8"></div>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">{c.description}</p>
        </div>

        {posts.length === 0 ? (
          <p className="text-center text-gray-500">{c.noPosts}</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <div
                key={post.slug}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all hover:-translate-y-2 border border-gray-100 dark:border-gray-700"
              >
                {post.coverImage && (
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-6">
                  <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(post.date).toLocaleDateString(language === 'en' ? 'en-US' : 'ne-NP')}
                    </span>
                    <span className="flex items-center gap-1">
                      <User className="w-3 h-3" />
                      {post.author}
                    </span>
                  </div>
                  <h2 className="text-xl font-serif font-bold text-royal-blue dark:text-white mb-2">
                    {post.title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{post.excerpt}</p>
                  <Link
                    to={`/blog/${post.slug}`}
                    className="inline-flex items-center text-law-gold font-medium hover:underline"
                  >
                    {c.readMore} <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;