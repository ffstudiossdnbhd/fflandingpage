export const CONTENT_STORAGE_KEY = 'ff_content_v1';
export const CONTENT_STORAGE_KEY_DRAFT = 'ff_content_draft_v1';
export const CONTENT_STORAGE_KEY_LIVE = 'ff_content_live_v1';

export const defaultContent = {
  theme: {
    primary: '#0757d8',
    primaryDark: '#07348f',
    pageBgStart: '#f4f8ff',
    pageBgMid: '#eef5ff',
    pageBgEnd: '#edf5ff',
    text: '#111111',
  },
  navItems: [
    { label: 'Laman Utama', href: '#home' },
    { label: 'Tentang Kami', href: '#tentang-kami' },
    { label: 'Berita & Media', href: '#berita-media' },
    { label: 'Peluang Kerjaya', href: '#kerjaya' },
    { label: 'Hubungi Kami', href: '#hubungi-kami' },
  ],
  socials: [
    { label: 'f', href: 'https://www.facebook.com/financialfaiz' },
    { label: 'IG', href: 'https://www.instagram.com/financialfaiz' },
    { label: 'X', href: 'https://x.com/financialfaiz' },
    { label: 'TT', href: 'https://www.tiktok.com/@financialfaiz' },
    { label: 'YT', href: 'https://www.youtube.com/@FinancialFaiz' },
  ],
  fallbackVideos: [
    { title: 'MITI sekat masuk BYD? Import kereta EV bermula RM100k', tag: 'EV & Policy', accent: 'from-blue-950 via-blue-700 to-cyan-400' },
    { title: 'Kenapa 3 syarikat ini monopoli pasaran digital Malaysia?', tag: 'Digital Economy', accent: 'from-indigo-950 via-blue-700 to-sky-400' },
    { title: 'Umur bersara 65 tahun, Malaysia negara menua?', tag: 'Retirement', accent: 'from-slate-950 via-blue-800 to-blue-400' },
    { title: 'Gig Economy: Boleh ubah hidup pekerja?', tag: 'Work & Income', accent: 'from-blue-950 via-cyan-700 to-cyan-300' },
    { title: 'Rumah pertama: beli sekarang atau tunggu?', tag: 'Property', accent: 'from-[#07348f] via-[#0757d8] to-[#6bbcff]' },
    { title: 'Gaji RM3,000 cukup ke duduk KL?', tag: 'Personal Finance', accent: 'from-[#061b5f] via-[#0757d8] to-[#4d9fff]' },
  ],
  officialChannelRows: [
    {
      title: 'Financial Faiz Podcast',
      badge: 'FF PODCAST',
      tone: 'from-[#ff972f] via-[#ff7f1f] to-[#ff5d00]',
      desc: 'Perbincangan santai dan mendalam tentang kehidupan, kerjaya dan kewangan.',
      href: 'https://www.youtube.com/channel/UCYkfgq8LmajU50WadNGGxtA',
      logo: '/channel-financial-faiz-podcast.png',
    },
    {
      title: 'Financial Faiz News',
      badge: 'FF NEWS',
      tone: 'from-[#8f2aff] via-[#7715db] to-[#6111bf]',
      desc: 'Sorotan isu semasa dan perkembangan penting dari perspektif rakyat.',
      href: 'https://www.youtube.com/channel/UCm2PBS9w0TorHWVcGnao71A',
      logo: '/channel-financial-faiz-news.png',
    },
    {
      title: 'DAFF Podcast',
      badge: 'DAFF PODCAST',
      tone: 'from-[#d8be10] via-[#b5a10e] to-[#9f8b07]',
      desc: 'Perbincangan ekonomi di antara Dr Aimi dan Financial Faiz.',
      href: 'https://www.youtube.com/channel/UClhkhtl2r-ZQw90Br1XYThg',
      logo: '/channel-daff-podcast.png',
    },
  ],
  seenAt: ['Astro Awani', 'Bernama', 'RTM', 'TV3', 'Sinar Harian', 'The Star', 'FMT', 'BFM', 'Harian Metro', 'Kosmo'],
  campaignChannels: [
    {
      key: 'ytFinancialFaiz',
      tabLabel: 'Financial Faiz',
      panelLabel: 'FINANCIAL FAIZ',
      hook: 'Live metrics daripada channel Financial Faiz.',
      stats: [
        ['Subscribers', '381K'],
        ['Total Views', '18.6M'],
        ['Videos', '1,248'],
      ],
    },
    {
      key: 'ytFinancialFaizPodcast',
      tabLabel: 'Financial Faiz Podcast',
      panelLabel: 'FINANCIAL FAIZ PODCAST',
      hook: 'Live metrics daripada channel Financial Faiz Podcast.',
      stats: [
        ['Subscribers', '16.7K'],
        ['Total Views', '2.4M'],
        ['Videos', '326'],
      ],
    },
    {
      key: 'ytDaffPodcast',
      tabLabel: 'DAFF Podcast',
      panelLabel: 'DAFF PODCAST',
      hook: 'Live metrics daripada channel DAFF Podcast.',
      stats: [
        ['Subscribers', '1.13K'],
        ['Total Views', '218K'],
        ['Videos', '84'],
      ],
    },
    {
      key: 'ytFinancialFaizNews',
      tabLabel: 'Financial Faiz News',
      panelLabel: 'FINANCIAL FAIZ NEWS',
      hook: 'Live metrics daripada channel Financial Faiz News.',
      stats: [
        ['Subscribers', '978'],
        ['Total Views', '164K'],
        ['Videos', '57'],
      ],
    },
  ],
  aboutParagraphs: [
    'Faiz Azmi memulakan kerjaya dalam bidang kewangan di sebuah bank, membina kepakaran melalui jualan gadai janji, penyelesaian pembiayaan, dan kad kredit. Kebolehan beliau dalam komunikasi dan rundingan menjadikannya seorang jurujual yang cemerlang.',
    'Dibesarkan dalam keluarga seorang jurutera, Faiz memahami konsep "trading time for money", yang membentuk cara beliau melihat dan menyampaikan topik kewangan. Beliau memahami cabaran golongan muda di Malaysia yang sering dibatasi tekanan sosial dan kekurangan peluang untuk mengubah haluan kehidupan.',
    'Melalui Financial Faiz, Faiz berusaha memberi panduan dan inspirasi kepada generasi muda, membantu mereka membuat keputusan kewangan dan kerjaya yang lebih bijak demi membina masa depan yang lebih cerah.',
    'Pandemik COVID-19 menjadi titik perubahan apabila Faiz beralih ke platform digital, menghasilkan video informatif kewangan di media sosial. Langkah ini membolehkan beliau mencapai khalayak lebih luas, memperkukuh reputasi sebagai penyampai ilmu kewangan yang relevan dan mudah difahami.',
  ],
  socialShowcase: [
    { label: 'TikTok', href: 'https://www.tiktok.com/@financialfaiz', icon: 'Music2' },
    { label: 'Instagram', href: 'https://www.instagram.com/financialfaiz', icon: 'Camera' },
    { label: 'Facebook', href: 'https://www.facebook.com/financialfaiz', icon: 'Globe2' },
    { label: 'X', href: 'https://x.com/financialfaiz', icon: null },
    { label: 'Telegram', href: 'https://financialfaiz.com.my/telegram', icon: 'Send' },
    { label: 'YouTube', href: 'https://www.youtube.com/@FinancialFaiz', icon: 'Play' },
  ],
  heroWallpapers: ['/hero-wallpaper-1.jpg', '/hero-wallpaper-2.jpg'],
  sections: {
    hero: {
      badge: 'Platform yang menjadikan anda celik kewangan',
      title: 'Financial Faiz',
      desc: 'Portal media kewangan yang boleh membantu anda menjadi seorang yang bijak mengurus wang anda',
      primaryButton: 'Lihat lagi',
      secondaryButton: 'Teroka Media',
    },
    interactiveFounder: {
      eyebrow: 'TENTANG PENGASAS',
      titlePrefix: 'Meet',
      titleName: 'Faiz Azmi',
      desc: 'Faiz Azmi memulakan kerjaya dalam bidang kewangan di sebuah bank, membina kepakaran melalui jualan gadai janji, penyelesaian pembiayaan, dan kad kredit.',
      highlightStats: [
        { label: 'KEPAKARAN', value: 'Banking & Finance' },
        { label: 'FOKUS', value: 'Financial Education' },
        { label: 'PLATFORM', value: 'Digital Media' },
        { label: 'MISI', value: 'Transform Finance' },
      ],
      narratives: [
        {
          label: 'STORY',
          color: 'text-[#0757d8]',
          text: 'Dibesarkan dalam keluarga seorang jurutera, Faiz memahami konsep trading time for money, yang membentuk cara beliau melihat dan menyampaikan topik kewangan.',
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
      ],
    },
    videos: {
      eyebrow: 'Featured Videos',
      title: 'Video Terkini',
      desc: 'Tonton video terkini dari Financial Faiz',
      unavailableTitle: 'Video unavailable for inline playback',
      unavailableSub: 'Open on YouTube',
    },
    portal: {
      bannerText: 'Financial Faiz berkomitmen untuk mentransformasikan landskap pendidikan kewangan di Malaysia dengan menyediakan solusi yang inovatif dan relevan bagi masyarakat.',
      eyebrow: 'Tentang Pengasas',
      title: 'Suara kewangan yang jelas, dekat dan praktikal',
    },
    simulator: {
      eyebrow: 'Campaign Simulator',
      title: 'Pick channel, watch impact',
      desc: 'Interactive demo untuk tunjukkan bagaimana setiap saluran beri outcome yang berbeza untuk brand.',
    },
    media: {
      eyebrow: 'Saluran Rasmi',
      title: 'Ikuti saluran rasmi kami yang lain untuk kandungan yang lebih menyeluruh',
      seenEyebrow: 'Juga dilihat di',
      seenTitle: 'Media appearance yang nampak lebih premium',
    },
    career: {
      title: 'KERJAYA',
      desc: '"Sertai Financial Faiz dalam menerokai dunia kewangan peribadi sambil berinteraksi dengan pakar industri untuk memberikan pandangan bernilai dan meningkatkan literasi kewangan anda."',
      inviteTitle: 'Kami turut mengalu-alukan pelajar yang berminat menjalani latihan industri bersama kami.',
      inviteSub: 'Marilah sertai kami!',
      formTitle: 'Sertai Kami',
      formNameLabel: 'Nama*',
      formEmailLabel: 'Emel*',
      formPhoneLabel: 'No. Telefon',
      formMessageLabel: 'Pesanan*',
      formSubmitLabel: 'Hantar',
      reminderLabel: 'Peringatan:',
      reminder: 'Sila hantar resume anda ke jobs@financialfaiz.com selepas menghantar borang di atas.',
      teamStories: [
        {
          name: 'Datu Zulkarnain',
          role: 'Event Coordinator',
          quote: 'Event bukan sekadar ikut perancangan. Situasi berubah, keputusan kena cepat. Kalau selesa bekerja dalam suasana dinamik dan penuh cabaran, peranan ini sesuai.',
          side: 'left',
          tag: 'DZ',
          image: '/person1.png',
        },
        {
          name: 'Joegrryio Jamin',
          role: 'IT Manager',
          quote: 'K',
          side: 'right',
          tag: 'JJ',
          image: '/person2.png',
        },
        {
          name: 'Amirul Zulhadi',
          role: 'Content Coordinator',
          quote: 'Content bukan sekadar menarik, tapi mesti memberi kesan. Faham audience, tahu apa yang relevan, dan mampu deliver dengan tepat, itu yang diperlukan.',
          side: 'left',
          tag: 'AZ',
          image: '/person3.png',
        },
        {
          name: 'Azim Yusri',
          role: 'Studio Manager',
          quote: 'Studio adalah tempat idea direalisasikan. Setiap detail memainkan peranan. Jika teliti dan selesa dalam persekitaran yang pantas, peranan ini akan sesuai.',
          side: 'right',
          tag: 'AY',
          image: '/person4.png',
        },
      ],
    },
    command: {
      eyebrow: 'Command Center',
      title: 'Satu dashboard feel untuk semua aset',
      desc: 'Biar landing page nampak macam real digital ecosystem, bukan sekadar website company biasa',
      mapEyebrow: 'Live Map',
      mapTitle: 'Financial Faiz Ecosystem',
      mapMetaPrefix: 'YouTube Summary',
      highlights: [
        ['Public trust', 'Clear explanation, familiar voice, real examples'],
        ['Campaign ready', 'Brand can ride content without killing authenticity'],
        ['Learning engine', 'Portal turns content into structured education'],
      ],
    },
    partners: {
      title: 'Ikuti media sosial kami untuk konten lebih menarik',
    },
    finalCta: {
      eyebrow: 'Next Version',
      title: 'Make it feel like a finance media empire',
      desc: 'Lepas ni boleh connect real YouTube API, CMS, PHP portal, booking/event, career form dan managed content',
      backToTop: 'Back to top',
    },
    book: {
      eyebrow: 'Duit Aku, Hidup Aku',
      title: 'Nak hidup selesa? Rancanglah kewangan anda sekarang!',
      desc: 'Section buku dibuat lebih premium dengan motion stack, hover animation dan conversion button yang jelas',
      buyButton: 'Beli Sekarang',
    },
    footer: {
      title: 'Make finance impossible to ignore',
      desc: 'Financial Faiz membina ekosistem media kewangan yang jelas, cepat difahami dan relevan untuk rakyat Malaysia.',
      email: 'hi@financialfaiz.com',
      address: 'Emhub, Persiaran Surian, Kota Damansara, Petaling Jaya',
      copyright: '© 2026 Financial Faiz. Hakcipta Terpelihara.',
      tags: ['Media', 'Podcast', 'Portal', 'Campaign'],
    },
  },
  layout: {
    sectionOrder: [
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
    ],
  },
};

export function getContentConfig(source = 'live') {
  if (typeof window === 'undefined') return defaultContent;
  try {
    const urlSource = new URLSearchParams(window.location.search).get('ff_source');
    const resolvedSource = urlSource === 'draft' || urlSource === 'live' || urlSource === 'legacy'
      ? urlSource
      : source;
    const scopedKeys = resolvedSource === 'draft'
      ? [CONTENT_STORAGE_KEY_DRAFT, CONTENT_STORAGE_KEY_LIVE, CONTENT_STORAGE_KEY]
      : resolvedSource === 'legacy'
        ? [CONTENT_STORAGE_KEY]
        : [CONTENT_STORAGE_KEY_LIVE, CONTENT_STORAGE_KEY_DRAFT, CONTENT_STORAGE_KEY];
    const raw = scopedKeys.map((key) => window.localStorage.getItem(key)).find(Boolean);
    if (!raw) return defaultContent;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') return defaultContent;
    return {
      ...defaultContent,
      ...parsed,
    };
  } catch {
    return defaultContent;
  }
}

export function saveContentConfig(nextContent, target = 'draft') {
  if (typeof window === 'undefined') return;
  const key = target === 'live'
    ? CONTENT_STORAGE_KEY_LIVE
    : target === 'legacy'
      ? CONTENT_STORAGE_KEY
      : CONTENT_STORAGE_KEY_DRAFT;
  window.localStorage.setItem(key, JSON.stringify(nextContent));
}



export function publishContentConfig(content) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(CONTENT_STORAGE_KEY_LIVE, JSON.stringify(content));
}



