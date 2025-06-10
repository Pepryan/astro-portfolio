import { useState, useEffect } from 'react';
import { FiLinkedin, FiLink, FiCheck, FiMail } from 'react-icons/fi';
import { FaXTwitter, FaWhatsapp, FaTelegram, FaReddit, FaFacebook } from 'react-icons/fa6';

interface ShareButtonsProps {
  title: string;
  slug: string;
}

export default function ShareButtons({ title, slug }: ShareButtonsProps) {
  const [isCopied, setIsCopied] = useState(false);
  const [currentUrl, setCurrentUrl] = useState('');

  useEffect(() => {
    // Construct the full URL with the post slug
    const baseUrl = window.location.origin;
    const fullUrl = `${baseUrl}/blog/${slug}`;
    setCurrentUrl(fullUrl);
  }, [slug]);

  const shareOnX = () => {
    window.open(
      `https://x.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(currentUrl)}`,
      '_blank'
    );
  };

  const shareOnLinkedIn = () => {
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`,
      '_blank'
    );
  };

  const shareOnWhatsApp = () => {
    window.open(
      `https://wa.me/?text=${encodeURIComponent(`${title} ${currentUrl}`)}`,
      '_blank'
    );
  };

  const shareOnTelegram = () => {
    window.open(
      `https://t.me/share/url?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(title)}`,
      '_blank'
    );
  };

  const shareOnReddit = () => {
    window.open(
      `https://reddit.com/submit?url=${encodeURIComponent(currentUrl)}&title=${encodeURIComponent(title)}`,
      '_blank'
    );
  };

  const shareOnFacebook = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`,
      '_blank'
    );
  };

  const shareViaEmail = () => {
    window.open(
      `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`Check out this article: ${title}\n\n${currentUrl}`)}`,
      '_blank'
    );
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const shareButtons = [
    {
      name: 'X (Twitter)',
      icon: FaXTwitter,
      onClick: shareOnX,
      color: 'hover:text-black dark:hover:text-white hover:bg-black/10 dark:hover:bg-white/10',
      primary: true
    },
    {
      name: 'LinkedIn',
      icon: FiLinkedin,
      onClick: shareOnLinkedIn,
      color: 'hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20',
      primary: true
    },
    {
      name: 'WhatsApp',
      icon: FaWhatsapp,
      onClick: shareOnWhatsApp,
      color: 'hover:text-green-600 dark:hover:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20',
      primary: false
    },
    {
      name: 'Telegram',
      icon: FaTelegram,
      onClick: shareOnTelegram,
      color: 'hover:text-blue-500 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20',
      primary: false
    },
    {
      name: 'Reddit',
      icon: FaReddit,
      onClick: shareOnReddit,
      color: 'hover:text-orange-600 dark:hover:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-900/20',
      primary: false
    },
    {
      name: 'Facebook',
      icon: FaFacebook,
      onClick: shareOnFacebook,
      color: 'hover:text-blue-700 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20',
      primary: false
    },
    {
      name: 'Email',
      icon: FiMail,
      onClick: shareViaEmail,
      color: 'hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20',
      primary: false
    }
  ];

  const [showAll, setShowAll] = useState(false);
  const primaryButtons = shareButtons.filter(btn => btn.primary);
  const secondaryButtons = shareButtons.filter(btn => !btn.primary);

  return (
    <div className="flex flex-wrap items-center gap-2">
      {/* Primary share buttons */}
      {primaryButtons.map((button) => (
        <button
          key={button.name}
          onClick={button.onClick}
          className={`group relative p-3 text-neutral-600 dark:text-neutral-400
            ${button.color} rounded-xl transition-all duration-300
            border border-neutral-200/50 dark:border-neutral-700/50
            hover:border-current hover:shadow-lg hover:scale-105 active:scale-95
            backdrop-blur-sm bg-white/50 dark:bg-neutral-800/50`}
          aria-label={`Share on ${button.name}`}
        >
          <button.icon className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
        </button>
      ))}

      {/* Copy link button */}
      <button
        onClick={copyLink}
        className={`group relative p-3 text-neutral-600 dark:text-neutral-400
          hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20
          rounded-xl transition-all duration-300 border border-neutral-200/50 dark:border-neutral-700/50
          hover:border-current hover:shadow-lg hover:scale-105 active:scale-95
          backdrop-blur-sm bg-white/50 dark:bg-neutral-800/50`}
        aria-label="Copy link"
      >
        {isCopied ? (
          <FiCheck className="w-5 h-5 text-emerald-500 transition-transform duration-300 scale-110" />
        ) : (
          <FiLink className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
        )}
      </button>

      {/* More options toggle */}
      <button
        onClick={() => setShowAll(!showAll)}
        className="group relative p-3 text-neutral-600 dark:text-neutral-400
          hover:text-neutral-900 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-700
          rounded-xl transition-all duration-300 border border-neutral-200/50 dark:border-neutral-700/50
          hover:border-current hover:shadow-lg hover:scale-105 active:scale-95
          backdrop-blur-sm bg-white/50 dark:bg-neutral-800/50"
        aria-label={showAll ? "Show fewer options" : "Show more options"}
      >
        <div className={`w-5 h-5 flex items-center justify-center transition-transform duration-300 ${showAll ? 'rotate-45' : ''}`}>
          <div className="w-1 h-1 bg-current rounded-full"></div>
          <div className="w-1 h-1 bg-current rounded-full ml-1"></div>
          <div className="w-1 h-1 bg-current rounded-full ml-1"></div>
        </div>
      </button>

      {/* Secondary share buttons */}
      {showAll && (
        <div className="flex flex-wrap items-center gap-2 w-full mt-2 animate-in slide-in-from-top-2 duration-300">
          {secondaryButtons.map((button) => (
            <button
              key={button.name}
              onClick={button.onClick}
              className={`group relative p-3 text-neutral-600 dark:text-neutral-400
                ${button.color} rounded-xl transition-all duration-300
                border border-neutral-200/50 dark:border-neutral-700/50
                hover:border-current hover:shadow-lg hover:scale-105 active:scale-95
                backdrop-blur-sm bg-white/50 dark:bg-neutral-800/50`}
              aria-label={`Share on ${button.name}`}
            >
              <button.icon className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
