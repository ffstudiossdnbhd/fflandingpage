import { useEffect, useMemo, useRef, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import {
  ArrowRight,
  BookOpen,
  BriefcaseBusiness,
  Building2,
  Camera,
  ExternalLink,
  Globe2,
  Mail,
  Menu,
  MapPin,
  Music2,
  Play,
  Rocket,
  Send,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  X,
  Zap,
  Layers3,
} from 'lucide-react';
import { getContentConfig } from './contentConfig';

const contentConfig = getContentConfig();
const navItems = contentConfig.navItems || [];
const theme = contentConfig.theme || {};
const socials = contentConfig.socials || [];
const fallbackVideos = contentConfig.fallbackVideos || [];
const officialChannelRows = contentConfig.officialChannelRows || [];
const seenAt = contentConfig.seenAt || [];
const campaignChannels = contentConfig.campaignChannels || [];
const aboutParagraphs = contentConfig.aboutParagraphs || [];
const heroWallpapers = contentConfig.heroWallpapers || ['/hero-wallpaper-1.jpg', '/hero-wallpaper-2.jpg'];
const sectionContent = contentConfig.sections || {};
const iconMap = { Music2, Camera, Globe2, Send, Play };
const socialShowcase = (contentConfig.socialShowcase || []).map((item) => ({
  ...item,
  icon: item?.icon ? iconMap[item.icon] || null : null,
}));
const heroContent = sectionContent.hero || {};
const founderContent = sectionContent.interactiveFounder || {};
const careerContent = sectionContent.career || {};
const commandContent = sectionContent.command || {};
const partnersContent = sectionContent.partners || {};
const finalCtaContent = sectionContent.finalCta || {};
const bookContent = sectionContent.book || {};
const footerContent = sectionContent.footer || {};
const videoSectionContent = sectionContent.videos || {};
const portalContent = sectionContent.portal || {};
const simulatorContent = sectionContent.simulator || {};
const mediaContent = sectionContent.media || {};
const defaultSectionLayout = [
  { id: 'hero', visible: true },
  { id: 'simulator', visible: true },
  { id: 'interactive3d', visible: true },
  { id: 'videos', visible: true },
  { id: 'portal', visible: true },
  { id: 'command', visible: true },
  { id: 'book', visible: true },
  { id: 'media', visible: true },
  { id: 'career', visible: true },
  { id: 'partners', visible: true },
  { id: 'cta', visible: true },
  { id: 'footer', visible: true },
];

const buildCampaignDefaults = () =>
  campaignChannels.reduce((acc, channel) => {
    acc[channel.key] = {
      label: channel.panelLabel,
      hook: channel.hook,
      stats: channel.stats,
    };
    return acc;
  }, {});

const formatCompactNumber = (value) => {
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) return 'N/A';
  return new Intl.NumberFormat('en', { notation: 'compact', maximumFractionDigits: 1 }).format(numeric);
};

const formatAbsoluteNumber = (value) => {
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) return 'N/A';
  return numeric.toLocaleString('en-US');
};

const sanitizeApiReason = (reason) => String(reason || '')
  .replace(/<[^>]*>/g, ' ')
  .replace(/https?:\/\/\S+/g, ' ')
  .replace(/\s+/g, ' ')
  .trim();

async function fetchYouTubeChannelStats({ apiKey, channelId }) {
  if (!apiKey || !channelId) return null;

  const params = new URLSearchParams({
    part: 'snippet,statistics',
    id: channelId,
    key: apiKey,
  });

  const response = await fetch(`https://www.googleapis.com/youtube/v3/channels?${params.toString()}`);
  if (!response.ok) {
    let reason = 'Failed YouTube analytics request';
    try {
      const errorPayload = await response.json();
      const firstReason = errorPayload?.error?.errors?.[0]?.reason;
      const firstMessage = errorPayload?.error?.message;
      reason = [firstReason, firstMessage].filter(Boolean).join(': ') || reason;
    } catch {
      reason = `YouTube request failed (${response.status})`;
    }
    throw new Error(reason);
  }

  const data = await response.json();
  const item = data?.items?.[0];
  if (!item) throw new Error(`channelNotFound: ${channelId}`);

  return {
    label: (item.snippet?.title || 'YouTube Channel').toUpperCase(),
    hook: `Live metrics for ${item.snippet?.title || 'YouTube channel'}.`,
    stats: [
      ['Subscribers', formatCompactNumber(item.statistics?.subscriberCount)],
      ['Total Views', formatCompactNumber(item.statistics?.viewCount)],
      ['Videos', formatAbsoluteNumber(item.statistics?.videoCount)],
    ],
  };
}

function FFLogo() {
  return (
    <a href="#home" className="inline-flex items-center">
      <img src="/logo.png" alt="Financial Faiz" className="h-10 w-auto object-contain sm:h-11" />
    </a>
  );
}

function Button({ children, href = '#', variant = 'blue', className = '' }) {
  const mx = useMotionValue(50);
  const my = useMotionValue(50);
  const glow = useMotionTemplate`radial-gradient(circle at ${mx}% ${my}%, rgba(255,255,255,0.35), transparent 45%)`;

  const base = 'group relative inline-flex cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-full px-8 py-3.5 text-sm font-bold transition-all duration-300 active:scale-[0.97]';
  const style = variant === 'blue'
    ? 'bg-[#0757d8] text-white shadow-[0_18px_45px_rgba(7,87,216,0.28)] hover:-translate-y-1 hover:bg-[#003fbd] hover:shadow-[0_24px_60px_rgba(7,87,216,0.42)]'
    : variant === 'light'
      ? 'border border-[#d8e4ff] bg-white !text-[#07348f] shadow-[0_14px_40px_rgba(7,87,216,0.22)] hover:-translate-y-1 hover:bg-[#eef5ff] hover:shadow-[0_22px_52px_rgba(7,87,216,0.3)]'
      : variant === 'ghost'
        ? 'border border-white/60 bg-white/10 text-white shadow-[0_14px_40px_rgba(0,31,94,0.3)] hover:-translate-y-1 hover:bg-white/20 hover:shadow-[0_22px_52px_rgba(0,31,94,0.36)]'
      : 'border border-[#111] bg-white text-[#111] hover:-translate-y-1 hover:bg-[#eef5ff] hover:shadow-[0_18px_44px_rgba(0,0,0,0.14)]';

  return (
    <motion.a
      href={href}
      className={`${base} ${style} ${className}`}
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.97, y: -1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        mx.set(((e.clientX - rect.left) / rect.width) * 100);
        my.set(((e.clientY - rect.top) / rect.height) * 100);
      }}
    >
      <motion.span style={{ background: glow }} className="absolute inset-0 opacity-70" />
      <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/35 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </motion.a>
  );
}

function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-gray-100 bg-white/90 backdrop-blur-2xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-5 sm:py-4">
        <FFLogo />

        <div className="hidden items-center gap-8 text-sm font-semibold text-[#111] lg:flex">
          {navItems.map((item, i) => (
            <a key={item.label} href={item.href} className={`transition hover:text-[#0757d8] ${i === 0 ? 'border-b border-[#111]' : ''}`}>
              {item.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-4 md:flex">
          {socials.map((s) => (
            <a key={s.label} href={s.href} className="text-lg font-black text-[#07348f] transition hover:-translate-y-1 hover:text-[#0757d8]">
              {s.label}
            </a>
          ))}
        </div>

        <button onClick={() => setOpen(!open)} className="grid h-10 w-10 place-items-center rounded-full border border-gray-200 lg:hidden">
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-gray-100 bg-white p-4 lg:hidden">
          {navItems.map((item) => (
            <a key={item.label} href={item.href} onClick={() => setOpen(false)} className="block rounded-xl px-4 py-3 font-bold text-[#111] hover:bg-[#eef5ff] hover:text-[#0757d8]">
              {item.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}

function CursorAura() {
  const [enabled, setEnabled] = useState(false);
  const [active, setActive] = useState(false);
  const [pressed, setPressed] = useState(false);

  const x = useMotionValue(-120);
  const y = useMotionValue(-120);
  const ringX = useSpring(x, { stiffness: 360, damping: 34, mass: 0.35 });
  const ringY = useSpring(y, { stiffness: 360, damping: 34, mass: 0.35 });
  const dotX = useSpring(x, { stiffness: 900, damping: 48, mass: 0.15 });
  const dotY = useSpring(y, { stiffness: 900, damping: 48, mass: 0.15 });

  useEffect(() => {
    const media = window.matchMedia('(hover: hover) and (pointer: fine)');
    const onMedia = () => setEnabled(media.matches);
    onMedia();
    if (typeof media.addEventListener === 'function') {
      media.addEventListener('change', onMedia);
    } else if (typeof media.addListener === 'function') {
      media.addListener(onMedia);
    }

    const onMove = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);

      const target = e.target;
      if (!(target instanceof Element)) return;
      setActive(Boolean(target.closest('a, button, input, textarea, [role="button"]')));
    };

    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);
    const onLeave = () => {
      x.set(-120);
      y.set(-120);
      setActive(false);
      setPressed(false);
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);
    window.addEventListener('mouseleave', onLeave);

    return () => {
      if (typeof media.removeEventListener === 'function') {
        media.removeEventListener('change', onMedia);
      } else if (typeof media.removeListener === 'function') {
        media.removeListener(onMedia);
      }
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      window.removeEventListener('mouseleave', onLeave);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <>
      <motion.div style={{ x: ringX, y: ringY }} className="pointer-events-none fixed left-0 top-0 z-[130]">
        <motion.div
          className="-translate-x-1/2 -translate-y-1/2 rounded-full border border-[#6eb0ff]/75 bg-[#0757d8]/10 shadow-[0_0_45px_rgba(7,87,216,0.45)] backdrop-blur"
          animate={{
            width: active ? 56 : 34,
            height: active ? 56 : 34,
            scale: pressed ? 0.85 : 1,
            opacity: active ? 0.95 : 0.75,
          }}
          transition={{ type: 'spring', stiffness: 320, damping: 24 }}
        />
      </motion.div>

      <motion.div style={{ x: dotX, y: dotY }} className="pointer-events-none fixed left-0 top-0 z-[131]">
        <motion.div
          className="-translate-x-1/2 -translate-y-1/2 rounded-full bg-[#86beff]"
          animate={{
            width: pressed ? 6 : active ? 8 : 10,
            height: pressed ? 6 : active ? 8 : 10,
            opacity: active ? 0.9 : 1,
          }}
          transition={{ type: 'spring', stiffness: 700, damping: 35 }}
        />
      </motion.div>
    </>
  );
}

function GlobalAmbient() {
  return (
    <div className="pointer-events-none fixed inset-0 z-[1] overflow-hidden">
      <motion.div
        className="absolute inset-0 opacity-[0.14] [background-image:linear-gradient(120deg,rgba(7,87,216,0.25)_0%,transparent_24%,rgba(7,87,216,0.22)_48%,transparent_72%,rgba(7,87,216,0.18)_100%)]"
        animate={{ backgroundPosition: ['0% 0%', '180% 0%'] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="absolute -top-32 left-[-10%] hidden h-[460px] w-[460px] rounded-full bg-[#0757d8]/20 blur-3xl sm:block"
        animate={{ x: [0, 120, -20, 0], y: [0, 90, 35, 0], scale: [1, 1.25, 0.95, 1] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-[-180px] right-[-5%] hidden h-[520px] w-[520px] rounded-full bg-cyan-300/20 blur-3xl sm:block"
        animate={{ x: [0, -100, 20, 0], y: [0, -80, -25, 0], scale: [1, 1.2, 0.92, 1] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
}

function SectionShell({ children, reduceMotion, animation }) {
  return (
    <div className="relative">
      <motion.div
        initial={reduceMotion ? { opacity: 0, y: 28 } : animation.initial}
        whileInView={reduceMotion ? { opacity: 1, y: 0 } : animation.whileInView}
        viewport={{ once: true, margin: '-120px' }}
        transition={{
          duration: reduceMotion ? 0.45 : 0.95,
          ease: [0.22, 1, 0.36, 1],
        }}
        style={{ transformPerspective: 1200 }}
        className="relative"
      >
        {children}
      </motion.div>
    </div>
  );
}

function LaunchSequence({ onDone }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setProgress((p) => {
        const next = Math.min(100, p + (p > 80 ? 2 : 4));
        if (next >= 100) {
          clearInterval(id);
          setTimeout(onDone, 380);
        }
        return next;
      });
    }, 55);

    return () => clearInterval(id);
  }, [onDone]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.45, ease: 'easeOut' } }}
      className="fixed inset-0 z-[120] overflow-hidden bg-[linear-gradient(140deg,#051f66_0%,#0757d8_52%,#032d91_100%)]"
    >
      <motion.div
        className="absolute inset-0 opacity-[0.18] [background-image:repeating-linear-gradient(-36deg,rgba(255,255,255,.9)_0px,rgba(255,255,255,.9)_2px,transparent_2px,transparent_28px)]"
        animate={{ backgroundPosition: ['0px 0px', '200px 0px'] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white/20 to-transparent" animate={{ x: ['-120%', '260%'] }} transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }} />
      <motion.div className="absolute -left-20 top-10 h-[320px] w-[320px] rounded-full bg-cyan-200/25 blur-3xl" animate={{ x: [0, 70, 0], y: [0, 30, 0] }} transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }} />
      <motion.div className="absolute bottom-[-80px] right-[-30px] h-[360px] w-[360px] rounded-full bg-white/15 blur-3xl" animate={{ x: [0, -60, 0], y: [0, -20, 0] }} transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }} />

      <div className="relative z-10 mx-auto flex h-full w-full max-w-5xl flex-col items-center justify-center px-5 text-white sm:px-8">
        <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="text-xs font-black uppercase tracking-[0.5em] text-cyan-100">
          Financial Faiz Experience
        </motion.p>
        <h2 className="mt-5 text-center text-4xl font-black tracking-[-0.06em] sm:text-5xl md:text-7xl">
          {'Financial Faiz'.split(' ').map((word, i) => (
            <motion.span
              key={word}
              initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ delay: 0.08 + i * 0.12, duration: 0.45, ease: 'easeOut' }}
              className="mr-4 inline-block"
            >
              {word}
            </motion.span>
          ))}
        </h2>

        <div className="mt-10 w-full max-w-xl overflow-hidden rounded-full border border-white/40 bg-white/10 p-1.5 backdrop-blur-xl">
          <motion.div className="h-3 rounded-full bg-white" animate={{ width: `${progress}%` }} transition={{ duration: 0.2, ease: 'easeOut' }} />
        </div>
        <motion.p key={progress} initial={{ opacity: 0.2 }} animate={{ opacity: 1 }} className="mt-3 text-sm font-bold text-cyan-100">
          {progress}%
        </motion.p>
      </div>
    </motion.div>
  );
}

function ReactiveBars({ className = '' }) {
  const bars = [20, 28, 18, 32, 24, 30, 22, 34];

  return (
    <div className={`relative inline-flex items-end gap-1 overflow-hidden rounded-2xl border border-white/25 bg-white/10 px-3 py-2 backdrop-blur-xl ${className}`}>
      <motion.div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent" animate={{ x: ['-120%', '120%'] }} transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }} />
      {bars.map((h, i) => (
        <span key={i} className="relative z-10 w-1.5 rounded-full bg-white/90" style={{ height: `${h}px`, opacity: 0.55 + i * 0.05 }} />
      ))}
    </div>
  );
}

function LiveCounterStrip() {
  const [values, setValues] = useState({
    reach: 1203400,
    watch: 57,
    leads: 28450,
  });

  useEffect(() => {
    const id = setInterval(() => {
      setValues((prev) => ({
        reach: prev.reach + 420 + Math.floor(Math.random() * 120),
        watch: Math.min(72, prev.watch + (Math.random() > 0.6 ? 1 : 0)),
        leads: prev.leads + 18 + Math.floor(Math.random() * 8),
      }));
    }, 1400);
    return () => clearInterval(id);
  }, []);

  const items = [
    ['Live Reach', values.reach.toLocaleString()],
    ['Watch Time', `${values.watch}%`],
    ['Qualified Leads', values.leads.toLocaleString()],
  ];

  return (
    <div className="mt-5 grid gap-2 sm:mt-6 sm:gap-3 sm:grid-cols-3">
      {items.map(([label, value], i) => (
        <motion.div
          key={label}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 + i * 0.08 }}
          whileHover={{ y: -6, scale: 1.02 }}
          className="relative overflow-hidden rounded-2xl border border-white/25 bg-white/10 p-3 backdrop-blur-xl sm:p-4"
        >
          <motion.div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent" animate={{ x: ['-130%', '130%'] }} transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut', delay: i * 0.2 }} />
          <p className="relative z-10 text-xs font-black uppercase tracking-[0.2em] text-blue-100">{label}</p>
          <p className="relative z-10 mt-1.5 text-xl font-black text-white sm:mt-2 sm:text-2xl">{value}</p>
        </motion.div>
      ))}
    </div>
  );
}

function CampaignSimulator() {
  const dailyCacheKey = 'ff_campaign_simulator_daily_cache_v1';
  const analyticsApiUrl = import.meta.env.VITE_ANALYTICS_API_URL;
  const ytApiKey = import.meta.env.VITE_YOUTUBE_API_KEY;
  const ytFinancialFaizPodcastId = import.meta.env.VITE_YOUTUBE_CHANNEL_FINANCIAL_FAIZ_PODCAST_ID;
  const ytFinancialFaizId = import.meta.env.VITE_YOUTUBE_CHANNEL_FINANCIAL_FAIZ_ID || import.meta.env.VITE_YOUTUBE_CHANNEL_ID;
  const ytDaffPodcastId = import.meta.env.VITE_YOUTUBE_CHANNEL_DAFF_PODCAST_ID;
  const ytFinancialFaizNewsId = import.meta.env.VITE_YOUTUBE_CHANNEL_FINANCIAL_FAIZ_NEWS_ID;
  const channelIds = useMemo(
    () => ({
      ytFinancialFaizPodcast: ytFinancialFaizPodcastId,
      ytFinancialFaiz: ytFinancialFaizId,
      ytDaffPodcast: ytDaffPodcastId,
      ytFinancialFaizNews: ytFinancialFaizNewsId,
    }),
    [ytDaffPodcastId, ytFinancialFaizId, ytFinancialFaizNewsId, ytFinancialFaizPodcastId],
  );

  const [mode, setMode] = useState('ytFinancialFaiz');
  const [cards, setCards] = useState(buildCampaignDefaults);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [loading, setLoading] = useState(true);
  const [syncError, setSyncError] = useState('');

  useEffect(() => {
    let mounted = true;
    const todayKey = (() => {
      const now = new Date();
      const y = now.getFullYear();
      const m = String(now.getMonth() + 1).padStart(2, '0');
      const d = String(now.getDate()).padStart(2, '0');
      return `${y}-${m}-${d}`;
    })();

    const syncAnalytics = async () => {
      let cached = null;
      try {
        if (mounted) {
          setLoading(true);
          setSyncError('');
        }

        try {
          cached = JSON.parse(window.localStorage.getItem(dailyCacheKey) || 'null');
        } catch {
          cached = null;
        }

        if (cached?.cards && mounted) {
          setCards((prev) => ({ ...prev, ...cached.cards }));
          setLastUpdated(cached.lastUpdated || null);
        }

        if (cached?.dayKey === todayKey) {
          // Keep UI clean: use fallback/cached values silently for the rest of the day.
          setSyncError('');
          if (mounted) setLoading(false);
          return;
        }

        if (analyticsApiUrl) {
          const response = await fetch(analyticsApiUrl);
          if (!response.ok) throw new Error('External analytics endpoint failed');
          const payload = await response.json();
          if (payload?.channels && mounted) {
            setCards((prev) => ({ ...prev, ...payload.channels }));
            setLastUpdated(payload.updatedAt || new Date().toISOString());
            window.localStorage.setItem(
              dailyCacheKey,
              JSON.stringify({
                dayKey: todayKey,
                status: 'ok',
                lastUpdated: payload.updatedAt || new Date().toISOString(),
                cards: payload.channels,
              }),
            );
          }
          return;
        }

        const channelResults = await Promise.allSettled(
          campaignChannels.map(async (channel) => {
            const stats = await fetchYouTubeChannelStats({
              apiKey: ytApiKey,
              channelId: channelIds[channel.key],
            });
            return [channel.key, stats];
          }),
        );

        const nextCards = channelResults.reduce((acc, result) => {
          if (result.status !== 'fulfilled') return acc;
          const [key, stats] = result.value;
          if (stats) acc[key] = stats;
          return acc;
        }, {});

        if (!mounted) return;

        if (Object.keys(nextCards).length) {
          const nextUpdatedAt = new Date().toISOString();
          setCards((prev) => ({
            ...prev,
            ...nextCards,
          }));
          setLastUpdated(nextUpdatedAt);
          window.localStorage.setItem(
            dailyCacheKey,
            JSON.stringify({
              dayKey: todayKey,
              status: 'ok',
              lastUpdated: nextUpdatedAt,
              cards: nextCards,
            }),
          );
          return;
        }

        const rejectedReasons = channelResults
          .filter((result) => result.status === 'rejected')
          .map((result) => String(result.reason?.message || result.reason || '').trim())
          .filter(Boolean);
        const safeReason = sanitizeApiReason(rejectedReasons[0]);
        const failMessage = `Tidak dapat sync live analytics sekarang. Paparan fallback digunakan.${safeReason ? ` (${safeReason})` : ''}`;
        setSyncError('');
        window.localStorage.setItem(
          dailyCacheKey,
          JSON.stringify({
            dayKey: todayKey,
            status: 'error',
            error: failMessage,
            lastUpdated: cached?.lastUpdated || null,
            cards: cached?.cards || null,
          }),
        );
      } catch {
        if (mounted) {
          const failMessage = 'Tidak dapat sync live analytics sekarang. Paparan fallback digunakan.';
          setSyncError('');
          window.localStorage.setItem(
            dailyCacheKey,
            JSON.stringify({
              dayKey: todayKey,
              status: 'error',
              error: failMessage,
              lastUpdated: cached?.lastUpdated || null,
              cards: cached?.cards || null,
            }),
          );
        }
      } finally {
        if (mounted) setLoading(false);
      }
    };

    syncAnalytics();
    return () => {
      mounted = false;
    };
  }, [analyticsApiUrl, dailyCacheKey, ytApiKey, channelIds]);

  const active = cards[mode] || buildCampaignDefaults()[mode];
  const dataReady = Boolean(
    ytApiKey
      && channelIds.ytFinancialFaizPodcast
      && channelIds.ytFinancialFaiz
      && channelIds.ytDaffPodcast
      && channelIds.ytFinancialFaizNews,
  );
  const updatedLabel = lastUpdated
    ? new Date(lastUpdated).toLocaleTimeString('en-MY', { hour: '2-digit', minute: '2-digit' })
    : 'Live now';

  return (
    <section className="relative overflow-hidden bg-transparent px-4 py-8 sm:px-5 sm:py-10 lg:px-10">
      <SectionMotion />
      <div className="relative mx-auto max-w-7xl">
        <SectionTitle
          eyebrow={simulatorContent.eyebrow || 'Campaign Simulator'}
          title={simulatorContent.title || 'Pick channel, watch impact'}
          desc={simulatorContent.desc || 'Interactive demo untuk tunjukkan bagaimana setiap saluran beri outcome yang berbeza untuk brand.'}
        />

        <div className="mt-6 grid gap-5 lg:mt-8 lg:gap-6 lg:grid-cols-[0.42fr_0.58fr]">
          <div className="rounded-[2rem] border border-[#d8e4ff] bg-[#f7fbff] p-5">
            {campaignChannels.map((channel) => (
              <button
                key={channel.key}
                onClick={() => setMode(channel.key)}
                className={`mb-3 w-full rounded-2xl px-4 py-3 text-left font-black transition ${mode === channel.key ? 'bg-[#0757d8] text-white shadow-lg' : 'bg-white text-[#0757d8] hover:bg-[#eef5ff]'}`}
              >
                {channel.tabLabel}
              </button>
            ))}
            {!dataReady && !analyticsApiUrl && (
              <p className="mt-2 text-xs font-semibold text-[#0757d8]/80">
                Isi `.env.local` (YouTube API key + 4 channel IDs) untuk live analytics.
              </p>
            )}
            {syncError && (
              <p className="mt-2 text-xs font-semibold text-red-600">{syncError}</p>
            )}
          </div>

          <motion.div key={mode} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }} className="relative overflow-hidden rounded-[1.5rem] border border-white/20 bg-[linear-gradient(120deg,#07348f,#0757d8)] p-5 text-white shadow-[0_16px_46px_rgba(7,87,216,0.2)] sm:rounded-[2rem] sm:p-6">
            <motion.div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent" animate={{ x: ['-130%', '130%'] }} transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut' }} />
            <div className="relative z-10">
              <p className="text-sm font-black uppercase tracking-[0.24em] text-blue-100">{active.label}</p>
              <h3 className="mt-3 text-2xl font-black tracking-[-0.03em] sm:text-3xl">{active.hook}</h3>
              <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-blue-100">
                <span className={`h-2 w-2 rounded-full ${loading ? 'animate-pulse bg-yellow-300' : 'bg-emerald-300'}`} />
                 {updatedLabel}
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {active.stats.map(([label, value], i) => (
                  <div key={label} className="rounded-2xl border border-white/25 bg-white/10 p-4 backdrop-blur-xl">
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-100">{label}</p>
                    <p className="mt-2 text-2xl font-black">{value}</p>
                    <motion.div className="mt-3 h-1 rounded-full bg-white/30" initial={{ width: 0 }} animate={{ width: `${62 + i * 12}%` }} transition={{ duration: 0.6, delay: i * 0.08 }} />
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function CountdownRing() {
  const total = 12 * 24 * 60 * 60 * 1000;
  const [left, setLeft] = useState(total);

  useEffect(() => {
    const id = setInterval(() => setLeft((prev) => Math.max(0, prev - 1000)), 1000);
    return () => clearInterval(id);
  }, []);

  const progress = Math.max(0, Math.min(1, left / total));
  const r = 46;
  const c = 2 * Math.PI * r;
  const days = Math.floor(left / (1000 * 60 * 60 * 24));
  const hours = Math.floor((left / (1000 * 60 * 60)) % 24);

  return (
    <div className="mx-auto mt-6 flex w-fit items-center gap-4 rounded-2xl border border-white/25 bg-white/10 px-4 py-3 backdrop-blur-xl">
      <svg width="110" height="110" className="-rotate-90">
        <circle cx="55" cy="55" r={r} stroke="rgba(255,255,255,0.25)" strokeWidth="8" fill="none" />
        <motion.circle
          cx="55"
          cy="55"
          r={r}
          stroke="white"
          strokeWidth="8"
          strokeLinecap="round"
          fill="none"
          animate={{ strokeDashoffset: c * (1 - progress) }}
          style={{ strokeDasharray: c }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
        />
      </svg>
      <div>
        <p className="text-xs font-black uppercase tracking-[0.25em] text-blue-100">Launch Window</p>
        <p className="mt-1 text-2xl font-black">{days}d {hours}h</p>
      </div>
    </div>
  );
}

function ScrollReveal3D({ children, className = '' }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 92%', 'end 18%'] });

  const y = useTransform(scrollYProgress, [0, 0.5, 1], [90, 0, -34]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.93, 1, 0.98]);
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [12, 0, -4]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 1], [0, 1, 1]);

  return (
    <motion.div ref={ref} style={{ y, scale, rotateX, opacity, transformStyle: 'preserve-3d' }} className={`relative ${className}`}>
      {children}
    </motion.div>
  );
}

function SectionTitle({ eyebrow, title, desc, center = false, light = false }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 34, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className={`${center ? 'mx-auto text-center' : ''} max-w-3xl`}
    >
      <motion.p
        initial={{ letterSpacing: '0.6em', opacity: 0 }}
        whileInView={{ letterSpacing: '0.35em', opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className={`mb-4 text-xs font-black uppercase ${light ? 'text-blue-100' : 'text-[#0757d8]'}`}
      >
        {eyebrow}
      </motion.p>

      <motion.h2
        initial={{ opacity: 0, y: 20, rotateX: 12 }}
        whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.75 }}
        className={`text-3xl font-black leading-[0.98] tracking-[-0.05em] sm:text-4xl md:text-6xl ${light ? 'text-white' : 'text-[#111]'}`}
      >
        {title}
      </motion.h2>

      {desc && (
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.6 }}
          className={`mt-4 text-base leading-7 sm:text-lg sm:leading-8 ${light ? 'text-blue-50' : 'text-gray-600'}`}
        >
          {desc}
        </motion.p>
      )}
    </motion.div>
  );
}

function SectionMotion({ variant = 'video' }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {variant === 'dark' && (
        <>
          <motion.div className="absolute inset-0 opacity-[0.16] [background-image:radial-gradient(circle,white_1px,transparent_1px)] [background-size:26px_26px]" animate={{ backgroundPosition: ['0px 0px', '52px 52px'] }} transition={{ duration: 5, repeat: Infinity, ease: 'linear' }} />
          <motion.div className="absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/10 blur-3xl" animate={{ scale: [0.8, 1.28, 0.8] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }} />
        </>
      )}

      {variant !== 'dark' && (
        <>
          <motion.div className="absolute -left-28 top-10 h-72 w-72 rounded-full bg-[#0757d8]/10 blur-3xl" animate={{ x: [0, 90, 0], y: [0, 36, 0], scale: [1, 1.25, 1] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }} />
          <motion.div className="absolute right-10 bottom-10 h-80 w-80 rounded-full bg-cyan-300/20 blur-3xl" animate={{ x: [0, -50, 0], y: [0, -50, 0], scale: [1, 1.22, 1] }} transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }} />
          <motion.div className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-transparent via-[#0757d8]/10 to-transparent" animate={{ x: ['-120%', '220%'] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }} />
        </>
      )}
    </div>
  );
}

function Hero3D() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [liveMetrics, setLiveMetrics] = useState({
    audienceClarity: 74,
    momentum: 61,
    liveReach: 1284000,
    conversionRate: 3.9,
    activeSessions: 842,
    mentions: 94,
  });

  useEffect(() => {
    const move = (e) => {
      setMouse({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      });
    };

    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setLiveMetrics((prev) => {
        const nextClarity = Math.max(52, Math.min(96, prev.audienceClarity + (Math.random() > 0.48 ? 2 : -2)));
        const nextMomentum = Math.max(30, Math.min(92, prev.momentum + (Math.random() > 0.44 ? 3 : -2)));
        const nextReach = Math.max(1000000, prev.liveReach + 950 + Math.floor(Math.random() * 1450));
        const nextConversion = Math.max(1.8, Math.min(8.5, prev.conversionRate + (Math.random() > 0.45 ? 0.2 : -0.15)));
        const nextSessions = Math.max(380, prev.activeSessions + Math.floor(Math.random() * 36) - 12);
        const nextMentions = Math.max(30, prev.mentions + Math.floor(Math.random() * 8) - 2);

        return {
          audienceClarity: nextClarity,
          momentum: nextMomentum,
          liveReach: nextReach,
          conversionRate: Number(nextConversion.toFixed(1)),
          activeSessions: nextSessions,
          mentions: nextMentions,
        };
      });
    }, 1500);

    return () => clearInterval(id);
  }, []);

  const pulseBars = useMemo(() => {
    const seed = liveMetrics.audienceClarity;
    return Array.from({ length: 16 }, (_, i) => {
      const raw = ((seed + i * 9) % 68) + 22;
      return Math.max(16, Math.min(86, raw));
    });
  }, [liveMetrics.audienceClarity]);

  const heroStats = [
    ['Live Reach', liveMetrics.liveReach.toLocaleString('en-US'), '+ realtime'],
    ['Conversion', `${liveMetrics.conversionRate}%`, liveMetrics.conversionRate >= 4 ? 'uptrend' : 'stable'],
    ['Sessions', liveMetrics.activeSessions.toLocaleString('en-US'), '+ active'],
    ['Mentions', liveMetrics.mentions.toLocaleString('en-US'), '+ social buzz'],
  ];

  return (
    <div className="relative mx-auto hidden h-[520px] w-full max-w-[530px] [perspective:1600px] lg:block">
      <motion.div
        className="absolute left-1/2 top-1/2 h-[380px] w-[380px] -translate-x-1/2 -translate-y-1/2 rounded-[2.7rem] border border-white/25 bg-white/20 p-4 shadow-[0_34px_100px_rgba(0,0,0,0.25)] backdrop-blur-xl"
        animate={{ rotateX: mouse.y * -5, rotateY: mouse.x * 7 }}
        transition={{ type: 'spring', stiffness: 90, damping: 22 }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div className="relative h-full overflow-hidden rounded-[2.1rem] bg-white p-6 text-[#111]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_0%,rgba(7,87,216,0.18),transparent_45%)]" />

          <div className="relative z-10 flex items-center justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.3em] text-[#0757d8]">Portal</p>
              <h3 className="mt-2 text-2xl font-black">Financial Faiz</h3>
            </div>
            <span className="inline-flex items-center gap-2 rounded-full bg-[#eef5ff] px-3 py-1 text-xs font-black text-[#0757d8]">
              <motion.span className="h-2 w-2 rounded-full bg-[#0757d8]" animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }} />
              LIVE
            </span>
          </div>

          <motion.div className="relative z-10 mt-7 overflow-hidden rounded-[1.6rem] bg-[#0757d8] p-5 text-white shadow-xl">
            <motion.div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent" animate={{ x: ['-120%', '120%'] }} transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut' }} />
            <div className="flex items-center justify-between">
              <p className="font-black">Audience clarity</p>
              <TrendingUp size={20} />
            </div>
            <div className="mt-4 flex items-end justify-between">
              <p className="text-4xl font-black">{liveMetrics.audienceClarity}%</p>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-100">Momentum {liveMetrics.momentum}%</p>
            </div>
            <div className="mt-4 flex h-20 items-end gap-1 overflow-hidden rounded-2xl bg-white/15 px-3 py-2">
              {pulseBars.map((h, i) => (
                <motion.span
                  key={`bar-${i}`}
                  className="w-1.5 rounded-full bg-white/90"
                  initial={{ height: '20%' }}
                  animate={{ height: `${h}%` }}
                  transition={{ duration: 0.6, delay: i * 0.02, ease: 'easeOut' }}
                />
              ))}
            </div>
          </motion.div>

          <div className="relative z-10 mt-5 grid grid-cols-2 gap-3">
            {heroStats.map(([label, value, meta], i) => (
              <motion.div key={label} className="rounded-2xl border border-[#d8e4ff] bg-[#f7fbff] p-3" whileHover={{ y: -3 }}>
                <p className="text-[11px] font-black uppercase tracking-[0.14em] text-[#0757d8]">{label}</p>
                <p className="mt-1 text-xl font-black text-[#111]">{value}</p>
                <p className="mt-1 text-[11px] text-gray-500">{meta}</p>
                <motion.div className="mt-2 h-1 rounded-full bg-[#dce8ff]" initial={{ width: '40%' }} animate={{ width: `${56 + (i * 9) + (liveMetrics.momentum % 14)}%` }} transition={{ duration: 0.9, ease: 'easeInOut' }} />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {[
        ['left-0 top-8', BookOpen, 'Financial Faiz'],
        ['right-4 top-15', Globe2, 'DAFF Podcast'],
        ['bottom-22 left-2', Building2, 'Financial Faiz Podcast'],
        ['left-78 bottom-14', ShieldCheck, 'Financial Faiz News'],
      ].map(([cls, Icon, text], i) => (
        <motion.div
          key={text}
          className={`absolute ${cls}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: [0, -6, 0] }}
          transition={{
            opacity: { delay: 0.25 + i * 0.12 },
            y: { delay: 0.25 + i * 0.12, duration: 3 + i * 0.4, repeat: Infinity, ease: 'easeInOut' },
          }}
        >
          <div className="relative flex min-w-[180px] items-center gap-3 overflow-hidden rounded-2xl bg-white p-3 text-[#111] shadow-xl">
            <motion.div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#0757d8]/10 to-transparent" animate={{ x: ['-140%', '140%'] }} transition={{ duration: 5 + i * 0.4, repeat: Infinity, ease: 'linear' }} />
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-[#0757d8] text-white">
              <Icon size={18} />
            </div>
            <p className="relative z-10 text-sm font-black">{text}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function Hero() {
  const ref = useRef(null);
  const [wallpaperIndex, setWallpaperIndex] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });

  const titleY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const titleScale = useTransform(scrollYProgress, [0, 1], [1, 0.72]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0.2]);
  const heroBlur = useTransform(scrollYProgress, [0, 1], ['blur(0px)', 'blur(10px)']);
  const heroClip = useTransform(scrollYProgress, [0, 1], ['inset(0% 0% 0% 0% round 0px)', 'inset(10% 6% 18% 6% round 48px)']);
  const cardY = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const gridY = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const leftGlowX = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const rightGlowY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const ringRotate = useTransform(scrollYProgress, [0, 1], [0, 26]);

  useEffect(() => {
    if (heroWallpapers.length <= 1) return;
    const id = setInterval(() => {
      setWallpaperIndex((prev) => (prev + 1) % heroWallpapers.length);
    }, 6500);
    return () => clearInterval(id);
  }, []);

  return (
    <section ref={ref} id="home" className="relative min-h-[460px] overflow-hidden bg-transparent px-3 pt-16 sm:min-h-[520px] sm:h-[62vh] lg:px-5 lg:pt-20">
      <motion.div style={{ clipPath: heroClip }} className="absolute inset-0 overflow-hidden bg-[linear-gradient(120deg,#07348f_0%,#0757d8_52%,#07348f_100%)] text-white">
        <AnimatePresence mode="wait">
          <motion.img
            key={heroWallpapers[wallpaperIndex]}
            src={heroWallpapers[wallpaperIndex]}
            alt=""
            className="pointer-events-none absolute inset-0 h-full w-full object-cover"
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 0.8, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
            style={{ filter: 'grayscale(10%) saturate(70%) contrast(105%) brightness(0.55)' }}
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(7,52,143,0.6)_0%,rgba(7,87,216,0.5)_52%,rgba(7,52,143,0.6)_100%)]" />
        <motion.div style={{ y: gridY }} className="absolute inset-0 opacity-[0.10] [background-image:linear-gradient(rgba(255,255,255,.9)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.9)_1px,transparent_1px)] [background-size:86px_86px]" />
        <motion.div style={{ x: leftGlowX }} className="absolute left-20 top-24 h-72 w-72 rounded-full bg-white/15 blur-3xl" animate={{ scale: [1, 1.18, 1] }} transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }} />
        <motion.div style={{ y: rightGlowY }} className="absolute right-20 bottom-20 h-96 w-96 rounded-full bg-cyan-300/20 blur-3xl" animate={{ scale: [1, 1.12, 1] }} transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }} />
        <motion.div style={{ rotate: ringRotate }} className="absolute -left-20 top-16 hidden h-[360px] w-[360px] rounded-full border border-white/20 sm:block" />
        <motion.div style={{ rotate: ringRotate }} className="absolute right-[-120px] bottom-[-140px] hidden h-[460px] w-[460px] rounded-full border border-cyan-100/20 sm:block" />
      </motion.div>

      <motion.div style={{ opacity: heroOpacity, filter: heroBlur }} className="relative z-10 mx-auto grid h-full max-w-7xl items-center gap-6 lg:grid-cols-[0.95fr_0.8fr]">
        <motion.div style={{ y: titleY, scale: titleScale }} initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75 }} className="text-center text-white lg:text-left">
          <motion.div className="mt-2 mb-4 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/15 px-4 py-2 text-xs font-black backdrop-blur-xl sm:mt-3">
            <Sparkles size={14} /> {heroContent.badge || 'Platform yang menjadikan anda celik kewangan'}
          </motion.div>

          <h1 className="text-3xl font-black uppercase leading-[0.9] tracking-[-0.05em] sm:text-4xl md:text-6xl lg:text-7xl">
            {(heroContent.title || 'Financial Faiz').split(' ').map((word, i) => (
              <motion.span
                key={word}
                initial={{ y: 38, opacity: 0, filter: 'blur(8px)' }}
                animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                transition={{ delay: 0.2 + i * 0.12, duration: 0.55, ease: 'easeOut' }}
                className="mr-2 inline-block sm:mr-4"
              >
                {word}
              </motion.span>
            ))}
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-sm font-medium leading-6 text-blue-50 sm:mt-5 sm:text-base sm:leading-7 lg:mx-0">
            {heroContent.desc || 'Portal media kewangan yang boleh membantu anda menjadi seorang yang bijak mengurus wang anda'}
          </p>

          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
            <Button href="#videos" variant="light">
              {heroContent.primaryButton || 'Lihat lagi'} <ArrowRight size={18} />
            </Button>
            <Button href="#berita-media" variant="ghost" className="whitespace-nowrap">
              <Play size={17} /> {heroContent.secondaryButton || 'Teroka Media'}
            </Button>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.5 }}
            className="mt-5 flex justify-center lg:justify-start"
          >
            <ReactiveBars />
          </motion.div>

          <LiveCounterStrip />
        </motion.div>

        <motion.div style={{ y: cardY }}>
          <Hero3D />
        </motion.div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1, duration: 0.55 }}
        className="absolute bottom-4 left-1/2 z-20 hidden -translate-x-1/2 items-center gap-3 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-white/90 backdrop-blur-xl lg:flex"
      >
        Scroll
        <motion.span animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }} className="h-5 w-3 rounded-full border border-white/60">
          <span className="mx-auto mt-1 block h-1.5 w-1.5 rounded-full bg-white" />
        </motion.span>
      </motion.div>
    </section>
  );
}

function Interactive3DSection() {
  const containerRef = useRef(null);
  const mouseX = useMotionValue(300);
  const mouseY = useMotionValue(300);

  const rotateX = useTransform(mouseY, [0, 600], [10, -10]);
  const rotateY = useTransform(mouseX, [0, 600], [-12, 12]);
  const imageY = useTransform(mouseY, [0, 600], [-10, 10]);
  const imageX = useTransform(mouseX, [0, 600], [-10, 10]);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const handleMouseLeave = () => {
    mouseX.set(300);
    mouseY.set(300);
  };

  return (
    <section className="relative overflow-hidden px-4 py-14 sm:px-5 sm:py-16 lg:px-10">
      <div className="absolute inset-0 bg-[linear-gradient(135deg,#f7fbff_0%,#eef6ff_45%,#ecfbff_100%)]" />
      <div className="absolute inset-0 opacity-[0.35] [background-image:repeating-linear-gradient(-32deg,rgba(7,87,216,0.10)_0px,rgba(7,87,216,0.10)_1px,transparent_1px,transparent_28px)]" />
      <div className="absolute -left-24 top-24 h-80 w-80 rounded-full bg-[#0757d8]/10 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-cyan-300/20 blur-3xl" />

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[0.95fr_1.05fr]">
        <motion.div
          initial={{ opacity: 0, x: -35 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="relative"
        >
          <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative mx-auto flex min-h-[250px] max-w-[560px] items-end justify-center overflow-visible px-6 pt-10"
          >
            <div className="absolute bottom-20 left-1/2 h-[430px] w-[430px] -translate-x-1/2 rounded-full bg-[#0757d8]/10 blur-3xl" />
            <div className="absolute bottom-2 left-1/2 h-44 w-[420px] -translate-x-1/2 rounded-[100%] bg-[#0757d8]/25 blur-3xl" />

            {/* IMAGE ONLY MOVES */}
            <motion.div
              style={{
                rotateX,
                rotateY,
                x: imageX,
                y: imageY,
                transformStyle: 'preserve-3d',
              }}
              className="relative z-20 flex h-full w-full items-end justify-center"
            >
              <motion.img
                src="/faiz-azmi.png"
                alt="Faiz Azmi"
                className="relative z-10 max-h-[580px] w-auto object-contain drop-shadow-[0_34px_55px_rgba(7,52,143,0.28)]"
                animate={{
                  y: [0, -8, 0],
                  filter: [
                    'brightness(1) saturate(1.02)',
                    'brightness(1.04) saturate(1.08)',
                    'brightness(1) saturate(1.02)',
                  ],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            </motion.div>
                          {/* TEXT DOES NOT FOLLOW IMAGE MOVEMENT */}
                          {/* FOOT FADE + TEXT OVERLAY */}
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.45, duration: 0.7, ease: 'easeOut' }}
                className="absolute bottom-0 left-1/2 z-40 w-[92%] -translate-x-1/2 text-center"
              >
                <div className="relative overflow-hidden px-4 pb-6 pt-12 sm:px-6 sm:pb-8 sm:pt-16">
                  {/* fade kaki */}
                  <div className="absolute inset-x-0 bottom-0 h-36 bg-[linear-gradient(180deg,rgba(239,247,255,0)_0%,rgba(239,247,255,0.62)_35%,rgba(239,247,255,0.92)_78%,rgba(239,247,255,1)_100%)] sm:h-48" />

                  {/* blue glow */}
                  <div className="absolute inset-x-3 bottom-4 h-20 rounded-[2rem] bg-[linear-gradient(180deg,rgba(7,87,216,0)_0%,rgba(7,87,216,0.26)_55%,rgba(3,45,145,0.58)_100%)] blur-lg sm:inset-x-0 sm:bottom-5 sm:h-28 sm:blur-xl" />

                  {/* cyan light line */}
                  <motion.div
                    className="absolute left-1/2 top-[60%] h-[2px] w-[92%] -translate-x-1/2 bg-gradient-to-r from-transparent via-cyan-300 to-transparent shadow-[0_0_18px_rgba(34,211,238,0.9)] sm:top-[58%] sm:w-[110%] sm:shadow-[0_0_24px_rgba(34,211,238,1)]"
                    animate={{ opacity: [0.45, 1, 0.45], scaleX: [0.82, 1, 0.82] }}
                    transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
                  />

                  <h3
                    className="relative z-10 text-4xl font-black italic tracking-[-0.07em] text-white sm:text-6xl sm:tracking-[-0.08em]"
                    style={{
                      fontFamily: 'Poppins, Montserrat, sans-serif',
                      textShadow:
                        '0 4px 0 rgba(3,45,145,0.45), 0 12px 22px rgba(3,45,145,0.38), 0 0 20px rgba(34,211,238,0.42)',
                    }}
                  >
                    Faiz Azmi
                  </h3>

                  <p
                    className="relative z-10 mt-1 text-xs font-extrabold italic tracking-wide text-white/95 sm:text-base"
                    style={{
                      textShadow: '0 4px 12px rgba(3,45,145,0.7)',
                    }}
                  >
                    (Pengasas Financial Faiz)
                  </p>

                  <motion.div
                    className="relative z-10 mx-auto mt-3 h-[3px] w-24 rounded-full bg-cyan-300 shadow-[0_0_18px_rgba(34,211,238,0.85)] sm:w-40 sm:shadow-[0_0_22px_rgba(34,211,238,0.95)]"
                    animate={{
                      width: ['5rem', '8rem', '5rem'],
                      opacity: [0.65, 1, 0.65],
                    }}
                    transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
                  />
                </div>
              </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 35 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="space-y-6"
        >
          <div>
            <p className="mb-3 text-sm font-black uppercase tracking-[0.28em] text-cyan-500">
              {founderContent.eyebrow || 'TENTANG PENGASAS'}
            </p>

            <h2 className="text-4xl font-black leading-tight tracking-[-0.04em] text-[#111] sm:text-5xl lg:text-6xl">
              {founderContent.titlePrefix || 'Meet'} <span className="text-cyan-400">{founderContent.titleName || 'Faiz Azmi'}</span>
            </h2>

            <p className="mt-5 max-w-2xl text-base leading-8 text-gray-600">
              {founderContent.desc || 'Faiz Azmi memulakan kerjaya dalam bidang kewangan di sebuah bank, membina kepakaran melalui jualan gadai janji, penyelesaian pembiayaan, dan kad kredit.'}
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {(founderContent.highlightStats || [
              { label: 'KEPAKARAN', value: 'Banking & Finance' },
              { label: 'FOKUS', value: 'Financial Education' },
              { label: 'PLATFORM', value: 'Digital Media' },
              { label: 'MISI', value: 'Transform Finance' },
            ]).map((item) => (
              <motion.div
                key={item.label}
                className="rounded-2xl border border-[#d8e4ff] bg-white/70 p-4 shadow-[0_12px_35px_rgba(7,87,216,0.08)] backdrop-blur-xl"
                whileHover={{ y: -4, scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 260, damping: 20 }}
              >
                <p className="text-xs font-black uppercase tracking-[0.18em] text-[#0757d8]">
                  {item.label}
                </p>
                <p className="mt-1 text-sm font-bold text-[#111]">{item.value}</p>
              </motion.div>
            ))}
          </div>

          <div className="space-y-5 border-t border-[#d8e4ff] pt-5">
            {(founderContent.narratives || [
              {
                label: 'STORY',
                color: 'text-[#0757d8]',
                text: 'Dibesarkan dalam keluarga seorang jurutera, Faiz memahami konsep ‘trading time for money’, yang membentuk cara beliau melihat dan menyampaikan topik kewangan.',
              },
              {
                label: 'MISSION',
                color: 'text-cyan-600',
                text: 'Melalui Financial Faiz, Faiz berusaha memberi panduan dan inspirasi kepada generasi muda untuk membuat keputusan kewangan yang lebih bijak.',
              },
              {
                label: 'IMPACT',
                color: 'text-purple-600',
                text: 'Pandemik COVID-19 menjadi titik perubahan apabila Faiz beralih ke platform digital, mencapai khalayak lebih luas dengan solusi kewangan yang relevan.',
              },
            ]).map((item) => (
              <div key={item.label}>
                <p className={`mb-2 text-xs font-black uppercase tracking-[0.24em] ${item.color}`}>
                  {item.label}
                </p>
                <p className="text-sm leading-7 text-gray-700">{item.text}</p>
              </div>
            ))}
          </div>

          <Button href="#tentang-kami" variant="blue">
            Ketahui Lebih Lanjut <ArrowRight size={18} />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

function VideoGrid() {
  const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY;
  const channelId = import.meta.env.VITE_YOUTUBE_CHANNEL_ID;
  const uploadsPlaylistId = useMemo(
    () => (channelId?.startsWith('UC') ? `UU${channelId.slice(2)}` : ''),
    [channelId],
  );
  const apiReady = Boolean(apiKey && channelId);
  const [videos, setVideos] = useState(fallbackVideos);
  const [hasLive, setHasLive] = useState(false);
  const [loading, setLoading] = useState(apiReady);

  useEffect(() => {
    if (!apiReady) {
      return;
    }

    const accents = [
      'from-blue-950 via-blue-700 to-cyan-400',
      'from-indigo-950 via-blue-700 to-sky-400',
      'from-slate-950 via-blue-800 to-blue-400',
      'from-blue-950 via-cyan-700 to-cyan-300',
      'from-[#07348f] via-[#0757d8] to-[#6bbcff]',
      'from-[#061b5f] via-[#0757d8] to-[#4d9fff]',
    ];

    const toVideo = (item, index, forceLive = false) => ({
      id: item.id?.videoId,
      title: item.snippet?.title || 'Untitled',
      tag: forceLive
        ? 'LIVE NOW'
        : new Date(item.snippet?.publishedAt || Date.now()).toLocaleDateString('ms-MY', { day: '2-digit', month: 'short' }),
      accent: accents[index % accents.length],
      thumbnail: item.snippet?.thumbnails?.high?.url || item.snippet?.thumbnails?.medium?.url || '',
      isLive: forceLive,
    });

    const fetchFeed = async () => {
      try {
        const base = 'https://www.googleapis.com/youtube/v3/search';
        const liveParams = new URLSearchParams({
          part: 'snippet',
          channelId,
          type: 'video',
          eventType: 'live',
          maxResults: '1',
          key: apiKey,
        });
        const latestParams = new URLSearchParams({
          part: 'snippet',
          channelId,
          type: 'video',
          order: 'date',
          maxResults: '6',
          key: apiKey,
        });

        const [liveRes, latestRes] = await Promise.all([
          fetch(`${base}?${liveParams.toString()}`),
          fetch(`${base}?${latestParams.toString()}`),
        ]);

        if (!liveRes.ok || !latestRes.ok) {
          throw new Error('YouTube API request failed');
        }

        const [liveData, latestData] = await Promise.all([liveRes.json(), latestRes.json()]);
        const liveItem = liveData?.items?.[0];
        const latestItems = latestData?.items || [];

        const liveVideo = liveItem ? toVideo(liveItem, 0, true) : null;
        const latestVideos = latestItems
          .filter((item) => item.id?.videoId && item.id.videoId !== liveVideo?.id)
          .map((item, i) => toVideo(item, i + 1, false));

        const merged = (liveVideo ? [liveVideo, ...latestVideos] : latestVideos).slice(0, 6);
        setHasLive(Boolean(liveVideo));
        setVideos(merged.length ? merged : fallbackVideos);
      } catch {
        setVideos(fallbackVideos);
        setHasLive(false);
      } finally {
        setLoading(false);
      }
    };

    fetchFeed();
  }, [apiKey, channelId, apiReady]);

  const getEmbedSrc = (video, index) => {
    if (video.id) {
      return `https://www.youtube.com/embed/${video.id}?rel=0&modestbranding=1`;
    }
    if (uploadsPlaylistId) {
      return `https://www.youtube.com/embed?listType=playlist&list=${uploadsPlaylistId}&index=${index + 1}&rel=0&modestbranding=1`;
    }
    return null;
  };

  return (
    <section id="videos" className="relative overflow-hidden bg-transparent px-4 py-8 sm:px-5 sm:py-10 lg:px-10">
      <SectionMotion />
      <div className="relative">
      <ScrollReveal3D className="relative mx-auto max-w-6xl">
        <div className="mb-8 flex flex-col justify-between gap-5 sm:mb-10 sm:gap-6 md:flex-row md:items-end">
          <SectionTitle
            eyebrow={videoSectionContent.eyebrow || 'Featured Videos'}
            title={videoSectionContent.title || 'Video Terkini'}
            desc={videoSectionContent.desc || 'Tonton video terkini dari Financial Faiz'}
          />
          <div className="flex items-center gap-3">
            {!apiReady && (
              <span className="rounded-full border border-[#d8e4ff] bg-[#f7fbff] px-3 py-2 text-xs font-bold text-[#0757d8]">
                Set `VITE_YOUTUBE_*` untuk live feed
              </span>
            )}
            {loading && (
              <span className="rounded-full border border-[#d8e4ff] bg-[#f7fbff] px-3 py-2 text-xs font-bold text-[#0757d8]">
                Syncing YouTube...
              </span>
            )}
            {hasLive && (
              <span className="rounded-full bg-red-600 px-3 py-2 text-xs font-black uppercase tracking-[0.2em] text-white">
                Live Detected
              </span>
            )}
            <Button href="https://www.youtube.com/@FinancialFaiz" variant="white">Lihat semua</Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {videos.map((video, index) => (
            <motion.article
              key={`${video.title}-${index}`}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.07, duration: 0.65 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative block w-full overflow-hidden rounded-[1.5rem] bg-gray-200 text-left shadow-[0_24px_70px_rgba(0,0,0,0.14)]"
            >
              {getEmbedSrc(video, index) ? (
                <div className="relative aspect-video bg-black">
                  <iframe
                    className="h-full w-full"
                    src={getEmbedSrc(video, index)}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    loading="lazy"
                    allowFullScreen
                  />
                  <div className="pointer-events-none absolute left-3 top-3 rounded-full bg-black/55 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-white">
                    {video.isLive ? 'Live' : video.tag}
                  </div>
                </div>
              ) : (
                <a
                  href="https://www.youtube.com/@FinancialFaiz"
                  target="_blank"
                  rel="noreferrer"
                  className="relative block aspect-video"
                >
                  {video.thumbnail ? (
                    <img src={video.thumbnail} alt={video.title} className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
                  ) : (
                    <div className={`absolute inset-0 bg-gradient-to-br ${video.accent}`} />
                  )}
                  <div className="absolute inset-0 bg-black/40" />
                  <div className="absolute inset-0 grid place-items-center text-center text-white">
                    <p className="px-6 text-sm font-black">{videoSectionContent.unavailableTitle || 'Video unavailable for inline playback'}</p>
                    <p className="mt-2 text-xs font-semibold">{videoSectionContent.unavailableSub || 'Open on YouTube'}</p>
                  </div>
                </a>
              )}
              <div className="border-t border-black/10 bg-white px-4 py-3">
                <p className="line-clamp-2 text-sm font-black leading-tight text-[#111]">{video.title}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </ScrollReveal3D>
      </div>
    </section>
  );
}

function PortalSection() {
  const [intro, ...storyBlocks] = aboutParagraphs;
  return (
    <section id="tentang-kami" className="relative overflow-hidden bg-transparent px-4 py-8 sm:px-6 sm:py-12 lg:px-10">
      <motion.div
        initial={{ opacity: 0, y: 26 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        className="relative mx-auto max-w-7xl"
      >
        <div className="rounded-[1.5rem] bg-[linear-gradient(90deg,#07348f,#0757d8,#07348f)] px-5 py-6 text-center text-white shadow-[0_24px_80px_rgba(7,87,216,0.24)] sm:rounded-[2.2rem] sm:px-8 sm:py-8">
          <p className="mx-auto max-w-5xl text-sm font-bold leading-7 sm:text-xl sm:leading-9 md:text-2xl">
            {portalContent.bannerText || 'Financial Faiz berkomitmen untuk mentransformasikan landskap pendidikan kewangan di Malaysia dengan menyediakan solusi yang inovatif dan relevan bagi masyarakat.'}
          </p>
        </div>

        <div className="mt-6 grid gap-6 rounded-[1.5rem] border border-[#d5e4ff] bg-white/95 p-4 shadow-[0_24px_80px_rgba(10,56,145,0.12)] backdrop-blur sm:rounded-[2.2rem] sm:p-6 lg:grid-cols-[1fr_0.95fr] lg:gap-8 lg:p-8">
          <div className="h-full">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-[#0757d8]">{portalContent.eyebrow || 'Tentang Pengasas'}</p>
            <h3 className="mt-3 text-3xl font-black leading-[0.96] tracking-[-0.04em] text-[#111] sm:text-4xl md:text-5xl">
              {portalContent.title || 'Suara kewangan yang jelas, dekat dan praktikal'}
            </h3>
            <p className="mt-5 text-base leading-8 text-gray-700 sm:text-lg">{intro}</p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {storyBlocks.map((p, i) => (
                <motion.article
                  key={p}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className={`rounded-2xl border border-[#dbe7ff] bg-[#f7fbff] p-4 ${i === 2 ? 'sm:col-span-2' : ''}`}
                >
                  <p className="text-xs font-black uppercase tracking-[0.24em] text-[#0757d8]">Story 0{i + 2}</p>
                  <p className="mt-2 text-sm leading-7 text-gray-700 sm:text-base">{p}</p>
                </motion.article>
              ))}
            </div>
          </div>

          <div className="mx-auto flex h-full w-full max-w-[460px] flex-col gap-4">
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative overflow-hidden rounded-[2rem] border border-[#d8e4ff] bg-[linear-gradient(155deg,#f4f8ff,#e8f0ff)] p-4 shadow-[0_26px_70px_rgba(7,87,216,0.16)]"
            >
              <div className="absolute right-[-40px] top-[-40px] h-40 w-40 rounded-full bg-[#0757d8]/15 blur-2xl" />
              <div className="absolute bottom-[-30px] left-[-20px] h-36 w-36 rounded-full bg-cyan-300/25 blur-2xl" />
              <div className="relative overflow-hidden rounded-[1.5rem] bg-white">
                <img
                  src="/faiz-azmi.png"
                  alt="Faiz Azmi"
                  className="h-[340px] w-full object-contain object-bottom sm:h-[420px]"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    const placeholder = e.currentTarget.nextElementSibling;
                    if (placeholder) placeholder.classList.remove('hidden');
                  }}
                />
                <div className="hidden h-[340px] place-items-center bg-[linear-gradient(135deg,#e7eefc,#f4f7ff)] text-[#0757d8] sm:h-[420px]">
                  <div className="text-center">
                    <p className="text-6xl font-black">FA</p>
                    <p className="mt-2 text-xs font-bold uppercase tracking-[0.28em]">Founder Portrait</p>
                  </div>
                </div>
              </div>
              <div className="relative mt-4 text-center">
                <p className="text-3xl font-black text-[#111] sm:text-4xl">Faiz Azmi</p>
                <p className="text-base text-gray-700 sm:text-xl">Pengasas Financial Faiz</p>
              </div>
            </motion.div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-[#dbe7ff] bg-[#f7fbff] p-4">
                <p className="text-xs font-black uppercase tracking-[0.24em] text-[#0757d8]">Mission</p>
                <p className="mt-2 text-sm leading-7 text-gray-700">Menterjemah topik kewangan kompleks kepada panduan yang jelas, praktikal dan mudah diamalkan.</p>
              </div>
              <div className="rounded-2xl border border-[#dbe7ff] bg-[#f7fbff] p-4">
                <p className="text-xs font-black uppercase tracking-[0.24em] text-[#0757d8]">Impact</p>
                <p className="mt-2 text-sm leading-7 text-gray-700">Kandungan merentas video, podcast dan portal untuk bantu rakyat buat keputusan kewangan lebih baik.</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
function CommandCenter() {
  const dailyCacheKey = 'ff_command_center_daily_cache_v1';
  const ytApiKey = import.meta.env.VITE_YOUTUBE_API_KEY;
  const channelIds = useMemo(
    () => [
      import.meta.env.VITE_YOUTUBE_CHANNEL_FINANCIAL_FAIZ_ID || import.meta.env.VITE_YOUTUBE_CHANNEL_ID,
      import.meta.env.VITE_YOUTUBE_CHANNEL_FINANCIAL_FAIZ_PODCAST_ID,
      import.meta.env.VITE_YOUTUBE_CHANNEL_DAFF_PODCAST_ID,
      import.meta.env.VITE_YOUTUBE_CHANNEL_FINANCIAL_FAIZ_NEWS_ID,
    ].filter(Boolean),
    [],
  );

  const fallbackSummary = useMemo(
    () => ([
      { title: 'Total Subscribers', value: '399.8K', desc: '4 channels combined', progress: 58 },
      { title: 'Total Views', value: '21.4M', desc: 'All-time across network', progress: 62 },
      { title: 'Total Videos', value: '1,715', desc: 'Published content library', progress: 68 },
      { title: 'Avg Views / Video', value: '12.5K', desc: 'Network performance baseline', progress: 54 },
      { title: 'Top Channel', value: 'Financial Faiz', desc: '381K subscribers right now', progress: 78 },
      { title: 'Connected', value: `${channelIds.length}/4`, desc: 'YouTube channels linked', progress: (channelIds.length / 4) * 100 },
    ]),
    [channelIds.length],
  );

  const [summaryCards, setSummaryCards] = useState(fallbackSummary);
  const [syncError, setSyncError] = useState('');
  const [lastSync, setLastSync] = useState(null);

  useEffect(() => {
    if (!ytApiKey || !channelIds.length) return;

    let mounted = true;
    const todayKey = (() => {
      const now = new Date();
      const y = now.getFullYear();
      const m = String(now.getMonth() + 1).padStart(2, '0');
      const d = String(now.getDate()).padStart(2, '0');
      return `${y}-${m}-${d}`;
    })();

    const syncSummary = async () => {
      let cached = null;
      try {
        if (mounted) {
          setSyncError('');
        }

        try {
          cached = JSON.parse(window.localStorage.getItem(dailyCacheKey) || 'null');
        } catch {
          cached = null;
        }

        if (cached?.summaryCards && mounted) {
          setSummaryCards(cached.summaryCards);
          setLastSync(cached.lastSync || null);
        }

        if (cached?.dayKey === todayKey) {
          // Keep UI clean: use fallback/cached values silently for the rest of the day.
          setSyncError('');
          return;
        }

        const params = new URLSearchParams({
          part: 'snippet,statistics',
          id: channelIds.join(','),
          key: ytApiKey,
        });
        const response = await fetch(`https://www.googleapis.com/youtube/v3/channels?${params.toString()}`);
        if (!response.ok) {
          let reason = `YouTube summary fetch failed (${response.status})`;
          try {
            const errorPayload = await response.json();
            const firstReason = errorPayload?.error?.errors?.[0]?.reason;
            const firstMessage = errorPayload?.error?.message;
            reason = [firstReason, firstMessage].filter(Boolean).join(': ') || reason;
          } catch {
            // keep fallback reason
          }
          throw new Error(reason);
        }

        const payload = await response.json();
        const items = payload?.items || [];
        if (!items.length) throw new Error('No channel data found');

        const totals = items.reduce(
          (acc, item) => ({
            subscribers: acc.subscribers + Number(item.statistics?.subscriberCount || 0),
            views: acc.views + Number(item.statistics?.viewCount || 0),
            videos: acc.videos + Number(item.statistics?.videoCount || 0),
          }),
          { subscribers: 0, views: 0, videos: 0 },
        );

        const topChannel = items.reduce((top, item) => {
          const subs = Number(item.statistics?.subscriberCount || 0);
          if (!top || subs > top.subscribers) {
            return { name: item.snippet?.title || 'Unknown', subscribers: subs };
          }
          return top;
        }, null);

        const avgViewsPerVideo = totals.videos ? totals.views / totals.videos : 0;
        const topShare = totals.subscribers ? (topChannel?.subscribers || 0) / totals.subscribers : 0;

        const nextCards = [
          {
            title: 'Total Subscribers',
            value: formatCompactNumber(totals.subscribers),
            desc: `${items.length} channels combined`,
            progress: Math.min(100, (totals.subscribers / 700000) * 100),
          },
          {
            title: 'Total Views',
            value: formatCompactNumber(totals.views),
            desc: 'All-time across network',
            progress: Math.min(100, (totals.views / 80000000) * 100),
          },
          {
            title: 'Total Videos',
            value: formatAbsoluteNumber(totals.videos),
            desc: 'Published content library',
            progress: Math.min(100, (totals.videos / 2500) * 100),
          },
          {
            title: 'Avg Views / Video',
            value: formatCompactNumber(avgViewsPerVideo),
            desc: 'Combined engagement efficiency',
            progress: Math.min(100, (avgViewsPerVideo / 120000) * 100),
          },
          {
            title: 'Top Channel',
            value: topChannel?.name || 'N/A',
            desc: `${formatCompactNumber(topChannel?.subscribers || 0)} subscribers`,
            progress: Math.max(18, topShare * 100),
          },
          {
            title: 'Connected',
            value: `${items.length}/4`,
            desc: 'YouTube channels linked',
            progress: Math.min(100, (items.length / 4) * 100),
          },
        ];

        if (mounted) {
          const nextSync = new Date().toISOString();
          setSummaryCards(nextCards);
          setLastSync(nextSync);
          window.localStorage.setItem(
            dailyCacheKey,
            JSON.stringify({
              dayKey: todayKey,
              status: 'ok',
              lastSync: nextSync,
              summaryCards: nextCards,
            }),
          );
        }
      } catch (error) {
        if (mounted) {
          const reason = sanitizeApiReason(error?.message);
          const failMessage = `Live summary unavailable right now. Showing fallback data${reason ? ` (${reason})` : '.'}`;
          setSyncError('');
          window.localStorage.setItem(
            dailyCacheKey,
            JSON.stringify({
              dayKey: todayKey,
              status: 'error',
              error: failMessage,
              lastSync: cached?.lastSync || null,
              summaryCards: cached?.summaryCards || null,
            }),
          );
        }
      }
    };

    syncSummary();
    return () => {
      mounted = false;
    };
  }, [dailyCacheKey, channelIds, ytApiKey]);

  const syncLabel = lastSync
    ? new Date(lastSync).toLocaleTimeString('en-MY', { hour: '2-digit', minute: '2-digit' })
    : 'Live now';

  return (
    <section className="relative overflow-hidden bg-transparent px-4 py-8 sm:px-5 sm:py-10 lg:px-10">
      <SectionMotion />
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative mx-auto max-w-7xl"
      >
        <motion.div
          className="pointer-events-none absolute inset-0 opacity-[0.12] [background-image:repeating-linear-gradient(-34deg,rgba(7,87,216,.55)_0px,rgba(7,87,216,.55)_2px,transparent_2px,transparent_30px)]"
          animate={{ backgroundPosition: ['0px 0px', '140px 0px'] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
        />
        <SectionTitle
          eyebrow={commandContent.eyebrow || 'Command Center'}
          title={commandContent.title || 'Satu dashboard feel untuk semua aset'}
          desc={commandContent.desc || 'Biar landing page nampak macam real digital ecosystem, bukan sekadar website company biasa'}
        />

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="relative overflow-hidden rounded-[1.75rem] bg-white p-5 shadow-[0_30px_120px_rgba(7,87,216,0.12)] sm:rounded-[3rem] sm:p-6">
            <motion.div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-[#0757d8]/10 to-transparent" animate={{ x: ['-130%', '130%'] }} transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }} />
            <div className="relative z-10">
              <div className="flex items-center justify-between border-b border-[#d8e4ff] pb-5">
                <div>
                  <p className="text-sm font-black uppercase tracking-[0.3em] text-[#0757d8]">{commandContent.mapEyebrow || 'Live Map'}</p>
                  <h3 className="mt-2 text-3xl font-black">{commandContent.mapTitle || 'Financial Faiz Ecosystem'}</h3>
                  <p className="mt-2 text-xs font-semibold text-gray-500">
                    {commandContent.mapMetaPrefix || 'YouTube Summary'} •  {syncLabel}
                  </p>
                </div>
                <motion.div animate={{ opacity: [0.7, 1, 0.7] }} transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}>
                  <Rocket className="text-[#0757d8]" />
                </motion.div>
              </div>
              {syncError && (
                <p className="mt-4 text-xs font-semibold text-red-600">{syncError}</p>
              )}

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {summaryCards.map((item, i) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    whileHover={{ y: -10, scale: 1.02 }}
                    className="rounded-3xl border border-[#d8e4ff] bg-[#f7fbff] p-5"
                  >
                    <p className="text-sm font-black uppercase tracking-[0.14em] text-[#0757d8]">{item.title}</p>
                    <p className="mt-2 line-clamp-1 text-2xl font-black text-[#111]">{item.value}</p>
                    <p className="mt-1 text-sm text-gray-600">{item.desc}</p>
                    <div className="mt-5 h-2 overflow-hidden rounded-full bg-[#d8e4ff]">
                      <motion.div
                        className="h-full rounded-full bg-[#0757d8]"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${Math.max(8, Math.min(100, item.progress))}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.1, delay: i * 0.08 }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          <div className="grid gap-6">
            {(commandContent.highlights || [
              ['Public trust', 'Clear explanation, familiar voice, real examples'],
              ['Campaign ready', 'Brand can ride content without killing authenticity'],
              ['Learning engine', 'Portal turns content into structured education'],
            ]).map(([a, b], i) => {
              const iconMapByIndex = [ShieldCheck, Zap, Layers3];
              const Icon = iconMapByIndex[i] || Layers3;
              return (
              <motion.div
                key={a}
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ x: 8, scale: 1.02 }}
                className="relative overflow-hidden rounded-[1.5rem] bg-[#0757d8] p-5 text-white shadow-[0_24px_70px_rgba(7,87,216,0.18)] sm:rounded-[2rem] sm:p-6"
              >
                <motion.div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent" animate={{ x: ['-120%', '120%'] }} transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut', delay: i * 0.2 }} />
                <motion.div className="relative z-10">
                  <Icon className="mb-8" />
                  <h3 className="text-2xl font-black">{a}</h3>
                  <p className="mt-3 leading-7 text-blue-50">{b}</p>
                </motion.div>
              </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function BookSection() {
  return (
    <section className="relative overflow-hidden bg-transparent px-4 py-8 sm:px-5 sm:py-10 lg:px-10">
      <SectionMotion />
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative mx-auto max-w-7xl"
      >
        <div className="relative overflow-hidden rounded-[1.75rem] bg-[linear-gradient(120deg,#07348f,#0757d8)] p-5 text-white shadow-[0_45px_140px_rgba(7,87,216,0.22)] sm:rounded-[3rem] sm:p-8 md:p-14">
          <motion.div className="absolute inset-0 opacity-[0.14] [background-image:repeating-linear-gradient(-34deg,rgba(255,255,255,.75)_0px,rgba(255,255,255,.75)_2px,transparent_2px,transparent_28px)]" animate={{ backgroundPosition: ['0px 0px', '120px 0px'] }} transition={{ duration: 8, repeat: Infinity, ease: 'linear' }} />
          <motion.div className="absolute -right-14 top-10 h-52 w-52 rounded-full bg-cyan-200/30 blur-3xl" animate={{ scale: [1, 1.2, 1], x: [0, -20, 0] }} transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }} />
          <div className="relative z-10 grid items-center gap-8 lg:grid-cols-[1fr_0.9fr]">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.38em] text-blue-100">{bookContent.eyebrow || 'Duit Aku, Hidup Aku'}</p>
              <h2 className="mt-4 text-3xl font-black leading-[0.95] tracking-[-0.055em] sm:text-4xl md:text-6xl">{bookContent.title || 'Nak hidup selesa? Rancanglah kewangan anda sekarang!'}</h2>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-blue-50">{bookContent.desc || 'Section buku dibuat lebih premium dengan motion stack, hover animation dan conversion button yang jelas'}</p>
              <Button href="https://s.shopee.com.my/" variant="light" className="mt-8">
                {bookContent.buyButton || 'Beli Sekarang'} <ExternalLink size={17} />
              </Button>
            </div>

            <div className="grid gap-3 md:hidden">
              <div className="rounded-2xl bg-white p-5 text-[#0757d8] shadow-xl">
                <p className="text-xs font-black uppercase tracking-[0.3em]">Book</p>
                <h3 className="mt-4 text-3xl font-black leading-none">DUIT AKU HIDUP AKU</h3>
                <p className="mt-4 text-sm leading-6 text-gray-600">Financial planning untuk hidup yang lebih tersusun</p>
              </div>
              <div className="rounded-2xl bg-[#eef5ff] p-5 text-[#111] shadow-xl">
                <BriefcaseBusiness />
                <h3 className="mt-4 text-2xl font-black leading-tight">Rancang duit, bukan sekadar harap gaji</h3>
              </div>
              <div className="rounded-2xl bg-white px-5 py-4 text-sm font-black text-[#0757d8] shadow-xl">
                QR learning support
              </div>
            </div>

            <div className="relative mx-auto hidden h-[390px] w-full max-w-[450px] md:block">
              <motion.div
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                className="absolute left-8 top-5 h-[320px] w-[220px] rounded-[2rem] bg-white p-6 text-[#0757d8] shadow-2xl"
              >
                <p className="text-xs font-black uppercase tracking-[0.3em]">Book</p>
                <h3 className="mt-8 text-4xl font-black leading-none">DUIT AKU HIDUP AKU</h3>
                <p className="mt-6 text-sm leading-6 text-gray-600">Financial planning untuk hidup yang lebih tersusun</p>
              </motion.div>

              <motion.div
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                className="absolute right-8 top-24 h-[250px] w-[190px] rounded-[2rem] bg-[#eef5ff] p-5 text-[#111] shadow-2xl"
              >
                <BriefcaseBusiness />
                <h3 className="mt-8 text-2xl font-black leading-tight">Rancang duit, bukan sekadar harap gaji</h3>
              </motion.div>

              <motion.div
                animate={{ opacity: [0.75, 1, 0.75] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute bottom-8 left-24 rounded-2xl bg-white px-5 py-4 text-sm font-black text-[#0757d8] shadow-2xl"
              >
                QR learning support
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function LogoMarquee({ items }) {
  const doubled = useMemo(() => [...items, ...items], [items]);

  return (
    <div className="mt-8 overflow-hidden rounded-[2rem] border border-[#d8e4ff] bg-[#f7fbff] py-6">
      <motion.div className="flex gap-4 whitespace-nowrap" animate={{ x: ['0%', '-50%'] }} transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}>
        {doubled.map((name, index) => (
          <motion.div key={`${name}-${index}`} whileHover={{ y: -8, scale: 1.04 }} className="mx-2 rounded-2xl border border-[#d8e4ff] bg-white px-8 py-5 text-sm font-black text-[#07348f] shadow-sm">
            {name}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

function MediaSection() {
  return (
    <section id="berita-media" className="relative overflow-hidden bg-transparent px-4 py-8 sm:px-5 sm:py-10 lg:px-10">
      <SectionMotion />
      <ScrollReveal3D className="relative mx-auto max-w-7xl">
        <SectionTitle
          center
          eyebrow={mediaContent.eyebrow || 'Saluran Rasmi'}
          title={mediaContent.title || 'Ikuti saluran rasmi kami yang lain untuk kandungan yang lebih menyeluruh'}
        />

        <div className="mx-auto mt-10 max-w-5xl space-y-8 sm:space-y-10">
          {officialChannelRows.map((channel, i) => {
            const [badgeTop, ...badgeRest] = channel.badge.split(' ');
            return (
              <motion.a
                key={channel.title}
                href={channel.href}
                target="_blank"
                rel="noreferrer"
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                whileHover={{ y: -6, scale: 1.01 }}
                className="group grid items-center gap-5 rounded-[2rem] border border-[#d8e4ff] bg-white/70 p-5 shadow-[0_18px_60px_rgba(7,87,216,0.08)] backdrop-blur transition hover:border-[#b8ceff] sm:grid-cols-[170px_1fr] sm:p-6"
              >
                <div className="relative mx-auto h-[132px] w-[132px]">
                  <div className={`absolute inset-0 grid place-items-center rounded-full bg-[linear-gradient(145deg,var(--tw-gradient-stops))] ${channel.tone} text-center text-white shadow-[0_16px_36px_rgba(0,0,0,0.22)]`}>
                    <div>
                      <p className="text-[30px] font-black leading-none">{badgeTop}</p>
                      <p className="mt-1 text-sm font-black tracking-[0.08em]">{badgeRest.join(' ')}</p>
                    </div>
                  </div>
                  <img
                    src={channel.logo}
                    alt={`${channel.title} logo`}
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                    className="relative z-10 h-full w-full rounded-full object-cover shadow-[0_16px_36px_rgba(0,0,0,0.22)]"
                  />
                </div>

                <div>
                  <h3 className="text-2xl font-black leading-tight text-[#111] sm:text-[2rem]">{channel.title}</h3>
                  <p className="mt-3 max-w-2xl text-lg font-semibold leading-9 text-[#212832]">{channel.desc}</p>
                  <div className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#0757d8] transition group-hover:gap-3">
                    Buka channel <ArrowRight size={16} />
                  </div>
                </div>
              </motion.a>
            );
          })}
        </div>

        <div className="mt-12">
          <SectionTitle
            eyebrow={mediaContent.seenEyebrow || 'Juga dilihat di'}
            title={mediaContent.seenTitle || 'Media appearance yang nampak lebih premium'}
          />
          <LogoMarquee items={seenAt} />
        </div>
      </ScrollReveal3D>
    </section>
  );
}

function CareerSection() {
  const teamStories = careerContent.teamStories || [];
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });
  const careerFormApiUrl = import.meta.env.VITE_CAREER_FORM_API_URL || 'http://localhost/testwebsite/ff-3d-landing/api/submit_application.php';

  const handleCareerSubmit = async (event) => {
    event.preventDefault();
    if (isSubmitting) return;

    const form = event.currentTarget;
    const formData = new FormData(form);
    const resume = formData.get('resume');
    const hasResume = resume instanceof File && resume.size > 0;

    if (!hasResume) {
      setSubmitStatus({ type: 'error', message: 'Sila lampirkan resume dalam format PDF.' });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus({ type: '', message: '' });

    try {
      const response = await fetch(careerFormApiUrl, {
        method: 'POST',
        body: formData,
      });
      const payload = await response.json();
      if (!response.ok || !payload?.ok) {
        throw new Error(payload?.message || 'Permohonan gagal dihantar. Sila cuba lagi.');
      }
      setSubmitStatus({ type: 'success', message: payload.message || 'Permohonan berjaya dihantar.' });
      form.reset();
    } catch (error) {
      setSubmitStatus({ type: 'error', message: error.message || 'Ralat semasa menghantar borang.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="kerjaya" className="bg-transparent pt-0">
      <div className="bg-[linear-gradient(90deg,#07348f_0%,#0757d8_45%,#07348f_100%)] px-4 py-12 text-white sm:px-6">
        <div className="mx-auto max-w-6xl text-center">
          <h2 className="text-4xl font-black tracking-tight sm:text-6xl">{careerContent.title || 'KERJAYA'}</h2>
          <p className="mx-auto mt-4 max-w-3xl text-sm leading-7 text-blue-100 sm:text-base">
            {careerContent.desc || '"Sertai Financial Faiz dalam menerokai dunia kewangan peribadi sambil berinteraksi dengan pakar industri untuk memberikan pandangan bernilai dan meningkatkan literasi kewangan anda."'}
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
        <div className="space-y-10 sm:space-y-12">
          {teamStories.map((item, i) => (
            <motion.article
              key={item.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.45, delay: i * 0.06 }}
              className={`relative grid items-center gap-5 md:gap-8 ${
                item.side === 'left' ? 'md:grid-cols-[200px_1fr]' : 'md:grid-cols-[1fr_200px]'
              }`}
            >
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4 + i * 0.5, repeat: Infinity, ease: 'easeInOut' }}
                className={`relative mx-auto w-[165px] sm:w-[180px] ${item.side === 'left' ? 'md:order-1' : 'md:order-2'}`}
              >
                <div className="pointer-events-none absolute -inset-5 rounded-full bg-[#0757d8]/12 blur-2xl" />
                <img
                  src={item.image}
                  alt={item.name}
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                  className="relative z-10 h-[185px] w-full scale-[1.08] object-contain drop-shadow-[0_18px_28px_rgba(0,0,0,0.20)] sm:h-[200px] sm:scale-[1.1]"
                />
                <div className="absolute -bottom-2 left-1/2 z-20 -translate-x-1/2 rounded-full bg-[#0757d8] px-3 py-1 text-[11px] font-semibold tracking-[0.16em] text-white">
                  {item.tag}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: item.side === 'left' ? 24 : -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: 0.08 + i * 0.04 }}
                className={`text-center ${item.side === 'left' ? 'md:order-2 md:text-left' : 'md:order-1 md:text-right'}`}
              >
                <p className="text-[1.45rem] font-semibold leading-[1.3] text-[#1d2430] sm:text-[1.6rem] lg:text-[1.7rem]">
                  “{item.quote}”
                </p>
                <p className="mt-3 text-base font-medium text-[#2f3a4c] sm:text-[1.25rem]">
                  - {item.name} | {item.role}
                </p>
                <motion.div
                  className={`mt-5 h-[2px] w-36 rounded-full bg-[linear-gradient(90deg,#2f7cff,#8abfff)] ${
                    item.side === 'left' ? 'md:mr-auto' : 'md:ml-auto'
                  } mx-auto`}
                  initial={{ scaleX: 0, opacity: 0.5 }}
                  whileInView={{ scaleX: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.06 }}
                />
              </motion.div>
            </motion.article>
          ))}
        </div>

        <div className="mt-16 text-center">
          <h3 className="mx-auto max-w-3xl text-3xl font-black leading-tight text-[#111] sm:text-5xl">
            {careerContent.inviteTitle || 'Kami turut mengalu-alukan pelajar yang berminat menjalani latihan industri bersama kami.'}
          </h3>
          <p className="mt-3 text-xl font-black text-[#d52f2f] sm:text-2xl">{careerContent.inviteSub || 'Marilah sertai kami!'}</p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2 lg:gap-10">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="overflow-hidden rounded-3xl"
          >
            <img
              src="/faiz-azmi.png"
              alt="Studio visual"
              className="h-full min-h-[320px] w-full object-cover"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8"
          >
            <h4 className="text-4xl font-black tracking-tight text-[#111]">{careerContent.formTitle || 'Sertai Kami'}</h4>
            <form className="mt-6 space-y-4" onSubmit={handleCareerSubmit}>
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">{careerContent.formNameLabel || 'Nama*'}</label>
                <input
                  name="name"
                  required
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-[#0757d8]"
                  placeholder="Nama"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">{careerContent.formEmailLabel || 'Emel*'}</label>
                <input
                  name="email"
                  type="email"
                  required
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-[#0757d8]"
                  placeholder="justin23@gmail.com"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">{careerContent.formPhoneLabel || 'No. Telefon'}</label>
                <input
                  name="phone"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-[#0757d8]"
                  placeholder="01124626564"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">{careerContent.formMessageLabel || 'Pesanan*'}</label>
                <textarea
                  name="message"
                  rows={4}
                  required
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-[#0757d8]"
                  placeholder="Pesanan anda"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">Resume (PDF)*</label>
                <input
                  name="resume"
                  type="file"
                  accept="application/pdf,.pdf"
                  required
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition file:mr-4 file:rounded-full file:border-0 file:bg-[#0757d8] file:px-4 file:py-2 file:font-semibold file:text-white hover:file:bg-[#003fbd] focus:border-[#0757d8]"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="rounded-full bg-black px-8 py-3 text-sm font-black text-white transition hover:bg-[#222] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? 'Menghantar...' : (careerContent.formSubmitLabel || 'Hantar')}
              </button>
            </form>
            {submitStatus.message ? (
              <p className={`mt-4 text-sm font-semibold ${submitStatus.type === 'success' ? 'text-green-700' : 'text-red-600'}`}>
                {submitStatus.message}
              </p>
            ) : null}
            <p className="mt-4 text-sm leading-6 text-gray-600">
              <span className="font-bold text-[#111]">{careerContent.reminderLabel || 'Peringatan:'}</span> {careerContent.reminder || 'Sila hantar resume anda ke jobs@financialfaiz.com selepas menghantar borang di atas.'}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function PartnersSection() {
  return (
    <section className="relative overflow-hidden bg-[radial-gradient(circle_at_20%_0%,#22354d,#0f1a26_55%,#0e151d)] px-4 py-14 text-white sm:px-6 sm:py-20">
      <div className="absolute inset-0 opacity-[0.14] [background-image:radial-gradient(circle,rgba(255,255,255,.8)_1px,transparent_1px)] [background-size:24px_24px]" />
      <div className="relative mx-auto max-w-6xl text-center">
        <h2 className="mx-auto max-w-5xl text-4xl font-black leading-[1.08] tracking-[-0.03em] sm:text-6xl md:text-7xl">
          {partnersContent.title || 'Ikuti media sosial kami untuk konten lebih menarik'}
        </h2>

        <div className="mt-12 flex flex-wrap justify-center gap-4 sm:mt-16 sm:gap-6">
          {socialShowcase.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.a
                key={item.label}
                href={item.href}
                target={item.href.startsWith('http') ? '_blank' : undefined}
                rel={item.href.startsWith('http') ? 'noreferrer' : undefined}
                whileHover={{ y: -6, scale: 1.08 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="grid h-12 w-12 place-items-center rounded-full border border-[#1d8cff] bg-[#061726]/70 text-[#0f7bff] shadow-[0_10px_30px_rgba(8,123,255,0.25)] sm:h-14 sm:w-14"
                aria-label={item.label}
              >
                {Icon ? <Icon size={20} /> : <span className="text-lg font-black">X</span>}
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-transparent px-4 py-8 sm:px-5 sm:py-10 lg:px-10">
      <SectionMotion />
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative mx-auto max-w-7xl"
      >
        <div className="relative overflow-hidden rounded-[1.75rem] bg-[linear-gradient(135deg,#0757d8,#07348f)] p-6 text-center text-white shadow-[0_40px_140px_rgba(7,87,216,0.24)] sm:rounded-[3rem] sm:p-10 md:p-16">
          <motion.div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent" animate={{ x: ['-120%', '120%'] }} transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }} />
          <motion.div className="absolute inset-0 opacity-[0.12] [background-image:repeating-linear-gradient(-34deg,rgba(255,255,255,.75)_0px,rgba(255,255,255,.75)_2px,transparent_2px,transparent_30px)]" animate={{ backgroundPosition: ['0px 0px', '140px 0px'] }} transition={{ duration: 7, repeat: Infinity, ease: 'linear' }} />
          <motion.div className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-200/20 blur-3xl" animate={{ opacity: [0.4, 0.6, 0.4] }} transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }} />

          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="relative z-10">
            <p className="text-sm font-black uppercase tracking-[0.35em] text-blue-100">{finalCtaContent.eyebrow || 'Next Version'}</p>
            <h2 className="mx-auto mt-5 max-w-4xl text-3xl font-black leading-[0.95] tracking-[-0.06em] sm:text-5xl md:text-7xl">
              {(finalCtaContent.title || 'Make it feel like a finance media empire').split(' ').map((word, i) => (
                <motion.span
                  key={`${word}-${i}`}
                  initial={{ y: 26, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.08 + i * 0.035, duration: 0.42 }}
                  className="mr-3 inline-block"
                >
                  {word}
                </motion.span>
              ))}
            </h2>
            <motion.p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-blue-50" animate={{ opacity: [0.88, 1, 0.88] }} transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}>
              {finalCtaContent.desc || 'Lepas ni boleh connect real YouTube API, CMS, PHP portal, booking/event, career form dan managed content'}
            </motion.p>
            <CountdownRing />
            <div className="mt-6 flex justify-center">
              <ReactiveBars className="border-white/35 bg-white/15" />
            </div>
            <div className="mt-9 flex justify-center">
              <Button href="#home" variant="light">
                {finalCtaContent.backToTop || 'Back to top'} <ArrowRight size={18} />
              </Button>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

function Footer() {
  return (
    <footer id="hubungi-kami" className="relative overflow-hidden bg-[#07348f] px-4 py-8 text-white sm:px-5 sm:py-10 lg:px-10">
      <div className="absolute inset-0 opacity-[0.10] [background-image:linear-gradient(rgba(255,255,255,.9)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.9)_1px,transparent_1px)] [background-size:80px_80px]" />
      <motion.div className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-white/20 blur-3xl" animate={{ x: [0, 80, 0], scale: [1, 1.25, 1] }} transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }} />
      <motion.div className="absolute right-0 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-cyan-300/20 blur-3xl" animate={{ y: [0, -70, 0], scale: [1, 1.15, 1] }} transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }} />

      <div className="relative mx-auto grid max-w-7xl gap-6 rounded-[1.75rem] border border-white/15 bg-white/10 p-5 shadow-[0_40px_130px_rgba(0,0,0,0.25)] backdrop-blur-xl sm:gap-8 sm:rounded-[3rem] sm:p-8 md:p-10 lg:grid-cols-[1fr_0.95fr]">
        <div>
          <motion.div
            whileHover={{ rotate: -2, scale: 1.06, y: -3 }}
            className="relative inline-block overflow-hidden rounded-3xl border border-white/35 bg-white px-5 py-4 shadow-[0_24px_55px_rgba(0,0,0,0.35)]"
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(255,255,255,0.95),rgba(255,255,255,0.65)_45%,transparent_75%)]" />
            <div className="relative scale-[1.18]">
              <FFLogo />
            </div>
          </motion.div>

          <h2 className="mt-7 max-w-2xl text-3xl font-black uppercase leading-[0.95] tracking-[-0.06em] sm:text-5xl md:text-6xl">
            {footerContent.title || 'Make finance impossible to ignore'}
          </h2>

          <p className="mt-5 max-w-xl leading-7 text-blue-50">
            {footerContent.desc || 'Financial Faiz membina ekosistem media kewangan yang jelas, cepat difahami dan relevan untuk rakyat Malaysia.'}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            {socials.map((s) => (
              <motion.a
                key={s.label}
                href={s.href}
                target={s.href.startsWith('http') ? '_blank' : undefined}
                rel={s.href.startsWith('http') ? 'noreferrer' : undefined}
                whileHover={{ y: -8, scale: 1.08 }}
                className="grid h-11 w-11 place-items-center rounded-full bg-white text-xs font-black text-[#07348f] shadow-xl sm:h-12 sm:w-12"
              >
                {s.label}
              </motion.a>
            ))}
          </div>

          <p className="mt-8 text-sm text-blue-100">
            {footerContent.copyright || '© 2026 Financial Faiz. Hakcipta Terpelihara.'}
          </p>
        </div>

        <div className="space-y-4 sm:space-y-5">
          <motion.div whileHover={{ x: 6 }} className="flex gap-4 rounded-2xl border border-white/15 bg-white/10 p-4 sm:p-5">
            <Mail />
            <div>
              <p className="font-black">Email</p>
              <p className="text-blue-50">{footerContent.email || 'hi@financialfaiz.com'}</p>
            </div>
          </motion.div>

          <motion.div whileHover={{ x: 6 }} className="flex gap-4 rounded-2xl border border-white/15 bg-white/10 p-4 sm:p-5">
            <MapPin />
            <div>
              <p className="font-black">Alamat</p>
              <p className="text-blue-50">{footerContent.address || 'Emhub, Persiaran Surian, Kota Damansara, Petaling Jaya'}</p>
            </div>
          </motion.div>

          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {(footerContent.tags || ['Media', 'Podcast', 'Portal', 'Campaign']).map((x) => (
              <motion.div key={x} whileHover={{ y: -6 }} className="rounded-2xl bg-white/10 p-3 text-sm font-black text-blue-50 sm:p-4">
                {x}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
export default function App() {
  const [showLaunch, setShowLaunch] = useState(() => {
    if (typeof window === 'undefined') return true;
    const isTouchDevice = window.matchMedia('(hover: none), (pointer: coarse)').matches;
    const isSmallViewport = window.matchMedia('(max-width: 768px)').matches;
    return !(isTouchDevice || isSmallViewport);
  });
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  useEffect(() => {
    if (!showLaunch) return undefined;
    const failSafeId = setTimeout(() => {
      setShowLaunch(false);
    }, 1800);
    return () => clearTimeout(failSafeId);
  }, [showLaunch]);

  const sectionRegistry = {
    hero: <Hero key="hero" />,
    simulator: <CampaignSimulator key="simulator" />,
    interactive3d: <Interactive3DSection key="interactive3d" />,
    videos: <VideoGrid key="videos" />,
    portal: <PortalSection key="portal" />,
    command: <CommandCenter key="command" />,
    book: <BookSection key="book" />,
    media: <MediaSection key="media" />,
    career: <CareerSection key="career" />,
    partners: <PartnersSection key="partners" />,
    cta: <FinalCTA key="cta" />,
    footer: <Footer key="footer" />,
  };
  const configuredLayout = contentConfig.layout?.sectionOrder || defaultSectionLayout;
  const fallbackIds = defaultSectionLayout.map((x) => x.id);
  const configuredIds = configuredLayout.map((x) => x.id);
  const missingIds = fallbackIds.filter((id) => !configuredIds.includes(id));
  const mergedLayout = [
    ...configuredLayout,
    ...missingIds.map((id) => ({ id, visible: true })),
  ];
  const sectionOrder = mergedLayout
    .filter((item) => item?.visible !== false && sectionRegistry[item.id])
    .map((item) => sectionRegistry[item.id]);

  const sectionFx = [
    {
      initial: { opacity: 0, y: 70, scale: 0.96, filter: 'blur(8px)' },
      whileInView: { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' },
    },
    {
      initial: { opacity: 0, x: -90, rotate: -1.6, scale: 0.98 },
      whileInView: { opacity: 1, x: 0, rotate: 0, scale: 1 },
    },
    {
      initial: { opacity: 0, y: 100, rotateZ: 3.2, scale: 0.92 },
      whileInView: { opacity: 1, y: 0, rotateZ: 0, scale: 1 },
    },
    {
      initial: { opacity: 0, y: 100, skewY: 2.5, scale: 0.95 },
      whileInView: { opacity: 1, y: 0, skewY: 0, scale: 1 },
    },
    {
      initial: { opacity: 0, y: 90, scale: 0.95, filter: 'blur(8px)' },
      whileInView: { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' },
    },
    {
      initial: { opacity: 0, x: -100, rotate: -1.2, filter: 'blur(6px)' },
      whileInView: { opacity: 1, x: 0, rotate: 0, filter: 'blur(0px)' },
    },
    {
      initial: { opacity: 0, x: 100, rotate: 1.2, filter: 'blur(6px)' },
      whileInView: { opacity: 1, x: 0, rotate: 0, filter: 'blur(0px)' },
    },
    {
      initial: { opacity: 0, y: 110, scale: 0.93, rotateX: 8 },
      whileInView: { opacity: 1, y: 0, scale: 1, rotateX: 0 },
    },
    {
      initial: { opacity: 0, y: 90, scale: 0.95, filter: 'blur(8px)' },
      whileInView: { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' },
    },
    {
      initial: { opacity: 0, y: 80, scale: 0.96, filter: 'blur(7px)' },
      whileInView: { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' },
    },
    {
      initial: { opacity: 0, y: 70, rotateX: -10, scale: 0.94 },
      whileInView: { opacity: 1, y: 0, rotateX: 0, scale: 1 },
    },
    {
      initial: { opacity: 0, y: 90, rotate: -1, scale: 0.94 },
      whileInView: { opacity: 1, y: 0, rotate: 0, scale: 1 },
    },
    {
      initial: { opacity: 0, y: 120, scale: 0.96, filter: 'blur(9px)' },
      whileInView: { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' },
    },
  ];

  return (
    <main
      className="relative min-h-screen overflow-x-hidden selection:text-white"
      style={{
        background: `linear-gradient(180deg,${theme.pageBgStart || '#f4f8ff'} 0%,${theme.pageBgMid || '#eef5ff'} 55%,${theme.pageBgEnd || '#edf5ff'} 100%)`,
        color: theme.text || '#111111',
      }}
    >
      <div className="pointer-events-none fixed inset-0 z-0 opacity-[0.2] [background-image:repeating-linear-gradient(-32deg,rgba(7,87,216,.18)_0px,rgba(7,87,216,.18)_1px,transparent_1px,transparent_52px)]" />
      <AnimatePresence>{showLaunch && <LaunchSequence onDone={() => setShowLaunch(false)} />}</AnimatePresence>
      <CursorAura />
      <GlobalAmbient />
      <motion.div className="fixed left-0 right-0 top-0 z-[80] h-1 origin-left" style={{ scaleX, background: theme.primary || '#0757d8' }} />

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: showLaunch ? 0 : 1, y: showLaunch ? 18 : 0 }}
        transition={{ duration: 0.55, ease: 'easeOut' }}
        className="relative z-10"
      >
        <Header />
        {sectionOrder.map((node, i) => (
          <SectionShell key={node.key || i} reduceMotion={reduceMotion} animation={sectionFx[i % sectionFx.length]}>
            {node}
          </SectionShell>
        ))}
      </motion.div>
    </main>
  );
}
