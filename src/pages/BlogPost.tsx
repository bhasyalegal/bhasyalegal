import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, User, Scale } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const BlogPost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/posts.json')
      .then(res => res.json())
      .then(data => {
        const found = data.find(p => p.slug === slug);
        setPost(found || null);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#D4AF37]"></div>
        <Scale className="w-5 h-5 text-[#D4AF37]/40 animate-pulse absolute" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="text-center max-w-md p-8 card-premium">
          <h2 className="text-2xl font-serif font-bold text-foreground mb-4">
            {language === 'en' ? 'Document Not Found' : 'दस्तावेज फेला परेन'}
          </h2>
          <p className="text-sm text-muted-foreground mb-6">
            {language === 'en' 
              ? 'The publication you are seeking may have been moved or archived.' 
              : 'तपाईंले खोज्नुभएको प्रकाशन हटाएको वा स्थानान्तरण गरिएको हुन सक्छ।'}
          </p>
          <Button 
            onClick={() => navigate('/blog')} 
            className="bg-[#D4AF37] hover:bg-[#b89327] text-[#1b0738] font-semibold tracking-wide px-6"
          >
            {language === 'en' ? 'Return to Journal' : 'ब्लगमा फर्कनुहोस्'}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 md:py-20">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Back Link Row */}
        <Link 
          to="/blog" 
          className="inline-flex items-center text-sm font-medium text-[#D4AF37] hover:text-[#b89327] transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 mr-2 transform group-hover:-translate-x-1 transition-transform" /> 
          {language === 'en' ? 'Back to Publications' : 'सबै पोस्टहरूमा फर्कनुहोस्'}
        </Link>

        {/* Article Cover Frame */}
        {post.coverImage && (
          <div className="w-full rounded-2xl overflow-hidden shadow-elegant-lg border border-[#D4AF37]/10 mb-10 relative group">
            <div className="absolute inset-0 bg-gradient-to-t from-[#1b0738]/30 to-transparent z-10" />
            <img 
              src={post.coverImage} 
              alt={post.title} 
              className="w-full h-64 md:h-[420px] object-cover transform scale-101 group-hover:scale-103 transition-transform duration-700" 
            />
          </div>
        )}

        {/* Meta Header Grid */}
        <div className="space-y-4 mb-8">
          <h1 className="text-3xl md:text-5xl font-serif font-bold text-foreground leading-tight tracking-tight">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground pt-4 border-b border-border/60 pb-4">
            <span className="flex items-center gap-2 font-light">
              <Calendar className="w-4 h-4 text-[#D4AF37]" />
              {new Date(post.date).toLocaleDateString(language === 'en' ? 'en-US' : 'ne-NP')}
            </span>
            <span className="flex items-center gap-2 font-light">
              <User className="w-4 h-4 text-[#D4AF37]" />
              {post.author}
            </span>
          </div>
        </div>

        {/* Dynamic Markdown Document Parser */}
        <div className="prose prose-lg dark:prose-invert max-w-none 
          prose-headings:font-serif prose-headings:font-bold prose-headings:text-foreground
          prose-p:leading-relaxed prose-p:text-foreground/90
          prose-a:text-[#D4AF37] prose-a:no-underline hover:prose-a:underline
          prose-blockquote:border-l-4 prose-blockquote:border-[#D4AF37] prose-blockquote:bg-[#D4AF37]/5 prose-blockquote:px-6 prose-blockquote:py-2 prose-blockquote:rounded-r-xl"
        >
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
        </div>

      </div>
    </div>
  );
};

export default BlogPost;