import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import butter from '../lib/butter';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, User } from 'lucide-react';

const BlogPost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      butter.post.retrieve(slug)
        .then((res) => {
          setPost(res.data.data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-law-gold"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-serif text-royal-blue dark:text-white mb-4">
            {language === 'en' ? 'Post Not Found' : 'पोस्ट फेला परेन'}
          </h2>
          <Button onClick={() => navigate('/blog')} className="bg-law-gold text-royal-blue">
            {language === 'en' ? 'Back to Blog' : 'ब्लगमा फर्कनुहोस्'}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <Link to="/blog" className="inline-flex items-center text-law-gold hover:underline mb-8">
          <ArrowLeft className="w-4 h-4 mr-1" /> {language === 'en' ? 'Back to all posts' : 'सबै पोस्टहरूमा फर्कनुहोस्'}
        </Link>

        {post.featured_image && (
          <img src={post.featured_image} alt={post.title} className="w-full h-64 md:h-96 object-cover rounded-xl mb-8" />
        )}

        <h1 className="text-3xl md:text-4xl font-serif font-bold text-royal-blue dark:text-white mb-4">
          {post.title}
        </h1>

        <div className="flex items-center gap-6 text-sm text-gray-500 dark:text-gray-400 mb-8 pb-4 border-b border-gray-200 dark:border-gray-700">
          <span className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            {new Date(post.published).toLocaleDateString(language === 'en' ? 'en-US' : 'ne-NP')}
          </span>
          <span className="flex items-center gap-2">
            <User className="w-4 h-4" />
            {post.author?.first_name || 'Bhasya Legal'}
          </span>
        </div>

        <div className="prose prose-lg dark:prose-invert max-w-none">
          {post.body && (
            <div dangerouslySetInnerHTML={{ __html: post.body }} />
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogPost;