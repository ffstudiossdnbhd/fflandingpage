export const CONTENT_STORAGE_KEY = 'ff_content_v1';
export const CONTENT_STORAGE_KEY_DRAFT = 'ff_content_draft_v1';
export const CONTENT_STORAGE_KEY_LIVE = 'ff_content_live_v1';
export const CONTENT_LANG_KEY = 'ff_content_lang_v1';

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
    { label: 'Home', href: '#home' },
    { label: 'About Us', href: '#tentang-kami' },
    { label: 'Services', href: '#services' },
    { label: 'Media Channels', href: '#berita-media' },
    { label: 'Careers', href: '#kerjaya' },
    { label: 'Contact', href: '#hubungi-kami' },
  ],
  socials: [
    { label: 'f', href: 'https://www.facebook.com/financialfaiz' },
    { label: 'IG', href: 'https://www.instagram.com/financialfaiz' },
    { label: 'X', href: 'https://x.com/financialfaiz' },
    { label: 'TT', href: 'https://www.tiktok.com/@financialfaiz' },
    { label: 'YT', href: 'https://www.youtube.com/@FinancialFaiz' },
  ],
  fallbackVideos: [
    { title: 'Can you build financial freedom while young?', tag: 'EV & Policy', accent: 'from-blue-950 via-blue-700 to-cyan-400' },
    { title: 'How to use a credit card the right way', tag: 'Digital Economy', accent: 'from-indigo-950 via-blue-700 to-sky-400' },
    { title: 'Is buying or building a house better?', tag: 'Retirement', accent: 'from-slate-950 via-blue-800 to-blue-400' },
    { title: 'A special update for working adults', tag: 'Work & Income', accent: 'from-blue-950 via-cyan-700 to-cyan-300' },
    { title: 'Salary up, lifestyle up too?', tag: 'Property', accent: 'from-[#07348f] via-[#0757d8] to-[#6bbcff]' },
    { title: '50-50 finances after marriage?', tag: 'Personal Finance', accent: 'from-[#061b5f] via-[#0757d8] to-[#4d9fff]' },
  ],
  officialChannelRows: [
    {
      title: 'Financial Faiz Podcast',
      badge: 'FF PODCAST',
      tone: 'from-[#ff972f] via-[#ff7f1f] to-[#ff5d00]',
      desc: 'Relaxed but in-depth conversations on life, career, and money.',
      href: 'https://www.youtube.com/channel/UCYkfgq8LmajU50WadNGGxtA',
      logo: '/channel-financial-faiz-podcast.png',
    },
    {
      title: 'Financial Faiz News',
      badge: 'FF NEWS',
      tone: 'from-[#8f2aff] via-[#7715db] to-[#6111bf]',
      desc: 'Timely updates and key developments from a people-first perspective.',
      href: 'https://www.youtube.com/channel/UCm2PBS9w0TorHWVcGnao71A',
      logo: '/channel-financial-faiz-news.png',
    },
    {
      title: 'DAFF Podcast',
      badge: 'DAFF PODCAST',
      tone: 'from-[#d8be10] via-[#b5a10e] to-[#9f8b07]',
      desc: 'Economic discussions between Dr Aimi and Financial Faiz.',
      href: 'https://www.youtube.com/channel/UClhkhtl2r-ZQw90Br1XYThg',
      logo: '/channel-daff-podcast.png',
    },
  ],
  seenAt: [
    '/logo-appearance/astroawani-mxBZoBoD7NfBMrPk.avif',
    '/logo-appearance/asyikfm-AMqbQq3jxPSjkWx9.avif',
    '/logo-appearance/bernama-Y4LVWLBa4NuzyMXL.avif',
    '/logo-appearance/channels4_profile-mp8qnGN5jxSKP4gv.avif',
    '/logo-appearance/gempak-mxBMr19WNbuPzXD0.avif',
    '/logo-appearance/nst-logo-home-1-YKbEJwxzo6fzlBbG.avif',
    '/logo-appearance/ntv7-YD06Q0XQ0GcBRPzl.avif',
    '/logo-appearance/okeytv-A0xwzxXGzKue92Dj.avif',
    '/logo-appearance/relevan-logo-01-smalll-YBgepMxaexhrByPm.avif',
    '/logo-appearance/rtm-A85wQ5Q8Qwu7lQEL.avif',
    '/logo-appearance/siakap_keli_logo_for_default_use-1-YD0Bpn5xDMTVpyEy.avif',
    '/logo-appearance/suketv-mePvqPKq31UjRBQr.avif',
    '/logo-appearance/tv3-mxBZoBoqOxI8PPlr.avif',
    '/logo-appearance/utusanmalaysia-mnlvglOnqGTyXNxJ.avif',
    '/logo-appearance/zayan-mxBZoBKw4rSK5Mbv.avif',
  ],
  campaignChannels: [
    {
      key: 'ytFinancialFaiz',
      tabLabel: 'Financial Faiz',
      panelLabel: 'FINANCIAL FAIZ',
      hook: 'Live metrics for Financial Faiz channel.',
      stats: [['Subscribers', '381K'], ['Total Views', '18.6M'], ['Videos', '1,248']],
    },
    {
      key: 'ytFinancialFaizPodcast',
      tabLabel: 'Financial Faiz Podcast',
      panelLabel: 'FINANCIAL FAIZ PODCAST',
      hook: 'Live metrics for Financial Faiz Podcast channel.',
      stats: [['Subscribers', '16.7K'], ['Total Views', '2.4M'], ['Videos', '326']],
    },
    {
      key: 'ytDaffPodcast',
      tabLabel: 'DAFF Podcast',
      panelLabel: 'DAFF PODCAST',
      hook: 'Live metrics for DAFF Podcast channel.',
      stats: [['Subscribers', '1.13K'], ['Total Views', '218K'], ['Videos', '84']],
    },
    {
      key: 'ytFinancialFaizNews',
      tabLabel: 'Financial Faiz News',
      panelLabel: 'FINANCIAL FAIZ NEWS',
      hook: 'Live metrics for Financial Faiz News channel.',
      stats: [['Subscribers', '978'], ['Total Views', '164K'], ['Videos', '57']],
    },
  ],
  aboutParagraphs: [
    'Faiz Azmi began his finance career in banking and built expertise through mortgage sales, financing solutions, and credit products.',
    'He understands the idea of trading time for money and speaks directly to the real financial challenges faced by young Malaysians.',
    'Through Financial Faiz, he guides audiences to make better financial and career decisions with confidence.',
    'During the COVID-19 period, he accelerated into digital platforms and scaled practical finance education through social media content.',
  ],
  socialShowcase: [
    { label: 'TikTok', href: 'https://www.tiktok.com/@financialfaiz', icon: 'Music2' },
    { label: 'Instagram', href: 'https://www.instagram.com/financialfaiz', icon: 'Camera' },
    { label: 'Facebook', href: 'https://www.facebook.com/financialfaiz', icon: 'Globe2' },
    { label: 'X', href: 'https://x.com/financialfaiz', icon: null },
    { label: 'Telegram', href: 'https://financialfaiz.com.my/telegram', icon: 'Send' },
    { label: 'YouTube', href: 'https://www.youtube.com/@FinancialFaiz', icon: 'Play' },
  ],
  heroCenterLogos: [
    '/logo-collab/aiapublictakaful-dWxy3xg328uQ58l1.avif',
    '/logo-collab/akpk_logo-YleqN1jgnWuE3lRV.avif',
    '/logo-collab/asnb-logo-vector-720x340-YanqZ4bgN1S3DO7B.avif',
    '/logo-collab/bsn-AR0y80g821iJ6qRN.avif',
    '/logo-collab/bursamalaysia-YlevgegO9Qh3GBzx.avif',
    '/logo-collab/dash-YKb6GbgGJRH1ywgd.avif',
    '/logo-collab/fimm-mnlvglKG79FOJGbp.avif',
    '/logo-collab/fundingsocieties-mePvqP2NO0uqW2Re.avif',
    '/logo-collab/fwdtakaful-AVLpZLgZBgtKqV8q.avif',
    '/logo-collab/huawei-YrDlgDGGyNcL0L5V.avif',
    '/logo-collab/iltizam-mv0Dr0zXkOulzbqe.avif',
    '/logo-collab/ipptar-YNqyQqgxxQfkoKlN.avif',
    '/logo-collab/jobstreet-YlevgeKgWWFqxvyz.avif',
    '/logo-collab/kaf-A0xwzxXz3zfLp73B.avif',
    '/logo-collab/kpdnhep-YrDlgDgE9KfWge5e.avif',
    '/logo-collab/kwsp-AzGegGglRKiyrDJe.avif',
    '/logo-collab/lembagagetahmalaysia-AR0y80g8zQtly767.png',
    '/logo-collab/lhdn-mePvqPqlR8s3BwZ3.avif',
    '/logo-collab/malaysiaaviation-dJo6Qogzoes9EXP4.avif',
    '/logo-collab/maybank-d95KQ5nQrWTk24wM.avif',
    '/logo-collab/mbsbbank-YBgr9gX9axTpDoGm.avif',
    '/logo-collab/mglobal-AoPvgPKw1jTKD68e.avif',
    '/logo-collab/miti-YX4ye4eDXvC6ye5K.avif',
    '/logo-collab/mycc-mnlvglOn63sN2lV8.avif',
    '/logo-collab/petronas-logo-black-d957PblGRVFoEzvN.avif',
    '/logo-collab/pidm-AMqbQqgZwQsq39BV.png',
    '/logo-collab/pnb-dWxy3x3197FBOrne.avif',
    '/logo-collab/png-transparent-cimb-bank-maybank-bank-cimb-niaga-bank-company-text-rectangle-Y4Lx2qy4zQUzQ2ay.avif',
    '/logo-collab/ppz-Yyv3gvKlqXc0KQB8.webp',
    '/logo-collab/prudential-AGB6QBgg4jUW8yz8.avif',
    '/logo-collab/simedarbyproperty-ALpnypgyLyI0kMBM.avif',
    '/logo-collab/sunlife-m2WpNWX0vjfqrglB.avif',
    '/logo-collab/tabunghaji-YrDlgDgvg2UVV0M2.avif',
    '/logo-collab/uitm.avif',
    '/logo-collab/ukm-mp8vg8Kxr5uq6Vng.avif',
    '/logo-collab/uum-d95KQ5nQjLHOR4PO.avif',
  ],
  heroWallpapers: ['/hero-wallpaper-1-opt.jpg', '/hero-wallpaper-2-opt.jpg'],
  sections: {
    hero: {
      badge: 'THE PLATFORM THAT MAKES YOU FINANCIALLY LITERATE',
      title: 'Financial Faiz',
      desc: 'A financial media portal that helps you become wiser in managing your money.',
      primaryButton: 'Explore More',
      secondaryButton: 'View Channels',
    },
    interactiveFounder: {
      eyebrow: 'MEET FAIZ AZMI',
      titlePrefix: 'Meet',
      titleName: 'Faiz Azmi',
      desc: 'Faiz Azmi started in banking and built Financial Faiz into a brand that simplifies finance and transforms financial education in Malaysia.',
      highlightStats: [
        { label: 'EXPERTISE', value: 'Banking & Finance' },
        { label: 'FOCUS', value: 'Financial Education' },
        { label: 'PLATFORM', value: 'Digital Media' },
        { label: 'MISSION', value: 'Transform Finance' },
      ],
      narratives: [
        { label: 'STORY', color: 'text-[#0757d8]', text: 'Raised in a practical household, Faiz learned early that financial decisions shape quality of life, not just income.' },
        { label: 'MISSION', color: 'text-cyan-600', text: 'Financial Faiz helps people make smarter money decisions through clear content and trusted guidance.' },
        { label: 'IMPACT', color: 'text-purple-600', text: 'The COVID period became a turning point as Faiz moved fully into digital and scaled relevant financial education.' },
      ],
    },
    founderStory: {
      eyebrow: 'Full Story',
      title: 'The Financial Faiz Journey',
      desc: 'Financial Faiz is committed to transforming the financial education landscape in Malaysia by delivering innovative and relevant solutions for the public.',
      items: [
        {
          title: '01 Career Beginnings',
          text: 'Faiz Azmi began his career in finance at a bank, building expertise through mortgage sales, financing solutions, and credit cards. During this period, he regularly faced real customer situations involving monthly commitments, loan planning, and long-term financial decisions. His strengths in communication and negotiation made him a strong salesperson, but more importantly, these experiences built a deep understanding of everyday financial realities faced by ordinary Malaysians.',
        },
        {
          title: '02 Life Perspective',
          text: 'Raised in an engineer\'s family, Faiz understood the concept of "trading time for money," which shaped how he viewed and explained financial topics. He saw many people work hard for years yet still struggle to build financial stability due to limited exposure to proper money management fundamentals. He also understood the challenges faced by young Malaysians, who are often constrained by social pressure, early-life commitments, and limited opportunities to confidently change their life direction.',
        },
        {
          title: '03 The Financial Faiz Mission',
          text: 'Through Financial Faiz, Faiz aims to guide and inspire younger generations to make better financial and career decisions for a stronger future. This mission is translated through easy-to-understand content, examples that are close to daily life, and a strong emphasis on practical actions people can apply immediately. His main focus is to make financial knowledge no longer exclusive, but accessible to every layer of society.',
        },
        {
          title: '04 The Digital Turning Point',
          text: 'The COVID-19 pandemic became a major turning point when Faiz shifted to digital platforms and consistently produced informative finance videos on social media. This move allowed him to reach a wider audience across Malaysia, from university students to professionals and small business owners. Through a combination of short videos, podcasts, educational explainers, and media collaborations, Financial Faiz grew into a relevant, trusted, and easy-to-understand financial education brand.',
        },
      ],
    },
    videos: {
      eyebrow: 'Featured Videos',
      title: 'Latest Videos',
      desc: 'Watch the latest Financial Faiz videos',
      unavailableTitle: 'Video unavailable for inline playback',
      unavailableSub: 'Open on YouTube',
    },
    portal: {
      bannerText: 'Financial Faiz is committed to transforming financial education in Malaysia through clear and relevant digital content.',
      eyebrow: 'About the Brand',
      title: 'A finance voice that is clear, practical, and trusted',
    },
    simulator: {
      eyebrow: 'Campaign Simulator',
      title: 'Pick channel, watch impact',
      desc: 'Interactive demo to show how each channel creates different outcomes for brands.',
    },
    media: {
      eyebrow: 'Official Media Channels',
      title: 'Explore all official channels for complete Financial Faiz content',
      seenEyebrow: 'Featured In',
      seenTitle: 'Media appearances across major platforms',
    },
    career: {
      title: 'CAREERS',
      desc: 'Join Financial Faiz to build impactful finance content while collaborating with industry professionals.',
      inviteTitle: 'We also welcome students interested in internship opportunities with us.',
      inviteSub: 'Let\'s build your career with us.',
      formTitle: 'Join Our Team',
      formNameLabel: 'Full Name*',
      formEmailLabel: 'Email*',
      formPhoneLabel: 'Phone Number',
      formMessageLabel: 'Message*',
      formSubmitLabel: 'Submit',
      reminderLabel: 'Reminder:',
      reminder: 'Please send your resume to jobs@financialfaiz.com after submitting this form.',
      teamStories: [
        { name: 'Datu Zulkarnain', role: 'Event Coordinator', quote: 'Events are never only about planning. Situations change fast, and decisions must be made quickly. This role fits people who thrive in dynamic environments.', side: 'left', tag: 'DZ', image: '/person1.png' },
        { name: 'Joegrryio Jamin', role: 'IT Manager', quote: 'K', side: 'right', tag: 'JJ', image: '/person2.png' },
        { name: 'Amirul Zulhadi', role: 'Content Coordinator', quote: 'Content must do more than look good. It should create impact by understanding the audience, relevance, and precise delivery.', side: 'left', tag: 'AZ', image: '/person3.png' },
        { name: 'Azim Yusri', role: 'Studio Manager', quote: 'The studio is where ideas become reality. Every detail matters. This role suits people who are detail-oriented and comfortable in a fast-paced setup.', side: 'right', tag: 'AY', image: '/person4.png' },
      ],
    },
    command: {
      eyebrow: 'Channel Overview',
      title: 'Financial Faiz Network Snapshot',
      desc: '',
      mapEyebrow: 'Live Summary',
      mapTitle: 'Financial Faiz Channel',
      mapMetaPrefix: 'Total Network',
      highlights: [
        ['Media Channels', 'YouTube network includes Financial Faiz, FF Podcast, DAFF Podcast, and FF News.'],
        ['Social Channels', 'Short-form and community content distributed via TikTok, Instagram, Facebook, X, Telegram, and YouTube.'],
        ['Services', 'Content production for short videos, long-form videos, podcast formats, and brand campaigns.'],
      ],
    },
    services: {
      eyebrow: 'What We Provide',
      title: 'Our Services',
      desc: 'Template section for service offerings. Update based on your current package and scope.',
      items: [
        { title: 'Event Management', desc: 'End-to-end planning, coordination, and execution for events and brand activations.', image: '/services/event.jpg' },
        { title: 'Podcast Production', desc: 'Podcast concept, recording workflow, studio handling, and post-production output.', image: '/services/podcast.jpg' },
        { title: 'TikTok / Short Video', desc: 'Short-form content strategy, scriptwriting, shooting, and edit optimized for social reach.', image: '/services/tiktok.jpg' },
        { title: 'Financial Training', desc: 'Financial literacy talks, workshops, and training sessions for teams and communities.', image: '/services/training.jpg' },
        { title: 'Website / System Development', desc: 'Website and internal system development for content operations and user experience.', image: '/services/webdevelopment.jpg' },
      ],
    },
    partners: { title: 'Follow our social channels for more finance content' },
    finalCta: {
      eyebrow: 'Next Version',
      title: 'Financial Faiz Portal',
      desc: 'Launching soon: a smarter learning portal with real tools, live modules, and guided finance action.',
      backToTop: 'Back to top',
    },
    book: {
      eyebrow: 'Duit Aku, Hidup Aku',
      title: 'Want a more secure life? Start planning your finances today.',
      desc: 'Practical financial planning guide designed for everyday Malaysians.',
      buyButton: 'Buy Now',
    },
    footer: {
      title: 'Make finance impossible to ignore',
      desc: 'Financial Faiz builds a clear and relevant digital finance ecosystem for Malaysians.',
      email: 'hi@financialfaiz.com',
      address: 'Emhub, Persiaran Surian, Kota Damansara, Petaling Jaya',
      copyright: '© 2026 Financial Faiz. All rights reserved.',
      tags: ['Media', 'Podcast', 'Portal', 'Campaign'],
    },
  },
  layout: {
    sectionOrder: [
      { id: 'hero', visible: true },
      { id: 'logoBridge', visible: true },
      { id: 'command', visible: true },
      { id: 'interactive3d', visible: true },
      { id: 'founderStory', visible: true },
      { id: 'services', visible: true },
      { id: 'media', visible: true },
      { id: 'partners', visible: true },
      { id: 'videos', visible: true },
      { id: 'simulator', visible: false },
      { id: 'portal', visible: false },
      { id: 'career', visible: true },
      { id: 'book', visible: true },
      { id: 'cta', visible: true },
      { id: 'footer', visible: true },
    ],
  },
};

const bmOverrides = {
  navItems: [
    { label: 'Laman Utama', href: '#home' },
    { label: 'Tentang Kami', href: '#tentang-kami' },
    { label: 'Perkhidmatan', href: '#services' },
    { label: 'Saluran Media', href: '#berita-media' },
    { label: 'Kerjaya', href: '#kerjaya' },
    { label: 'Hubungi', href: '#hubungi-kami' },
  ],
  fallbackVideos: [
    { title: 'Boleh capai kebebasan kewangan semasa muda?', tag: 'EV & Policy', accent: 'from-blue-950 via-blue-700 to-cyan-400' },
    { title: 'Cara guna kad kredit dengan betul', tag: 'Digital Economy', accent: 'from-indigo-950 via-blue-700 to-sky-400' },
    { title: 'Beli rumah atau bina rumah lebih baik?', tag: 'Retirement', accent: 'from-slate-950 via-blue-800 to-blue-400' },
    { title: 'Pengumuman khas untuk golongan bekerja', tag: 'Work & Income', accent: 'from-blue-950 via-cyan-700 to-cyan-300' },
    { title: 'Gaji naik, gaya hidup pun naik?', tag: 'Property', accent: 'from-[#07348f] via-[#0757d8] to-[#6bbcff]' },
    { title: '50-50 kewangan selepas kahwin?', tag: 'Personal Finance', accent: 'from-[#061b5f] via-[#0757d8] to-[#4d9fff]' },
  ],
  officialChannelRows: [
    {
      title: 'Financial Faiz Podcast',
      badge: 'FF PODCAST',
      tone: 'from-[#ff972f] via-[#ff7f1f] to-[#ff5d00]',
      desc: 'Perbincangan santai tetapi mendalam tentang kehidupan, kerjaya, dan kewangan.',
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
      desc: 'Perbincangan ekonomi bersama Dr Aimi dan Financial Faiz.',
      href: 'https://www.youtube.com/channel/UClhkhtl2r-ZQw90Br1XYThg',
      logo: '/channel-daff-podcast.png',
    },
  ],
  sections: {
    hero: {
      badge: 'PLATFORM YANG MENJADIKAN ANDA CELIK KEWANGAN',
      desc: 'Portal media kewangan yang boleh membantu anda menjadi seorang yang bijak mengurus wang anda',
      primaryButton: 'Teroka Lagi',
      secondaryButton: 'Lihat Saluran',
    },
    interactiveFounder: {
      eyebrow: 'FINANCIAL FAIZ',
      titlePrefix: 'Kenali',
      founderLabel: '(Pengasas Financial Faiz)',
      ctaLabel: 'Ketahui Lebih Lanjut',
      desc: 'Faiz Azmi bermula dalam dunia perbankan dan membina Financial Faiz sebagai jenama yang memudahkan ilmu kewangan untuk rakyat Malaysia.',
      highlightStats: [
        { label: 'KEPAKARAN', value: 'Perbankan & Kewangan' },
        { label: 'FOKUS', value: 'Pendidikan Kewangan' },
        { label: 'PLATFORM', value: 'Media Digital' },
        { label: 'MISI', value: 'Transform Finance' },
      ],
      narratives: [
        { label: 'KISAH', color: 'text-[#0757d8]', text: 'Dibesarkan dalam suasana yang praktikal, Faiz memahami awal bahawa keputusan kewangan menentukan kualiti hidup, bukan sekadar pendapatan.' },
        { label: 'MISI', color: 'text-cyan-600', text: 'Financial Faiz membantu masyarakat membuat keputusan kewangan lebih bijak melalui kandungan yang jelas dan dipercayai.' },
        { label: 'IMPAK', color: 'text-purple-600', text: 'Fasa COVID menjadi titik perubahan apabila Faiz bergerak agresif ke digital dan memperluas pendidikan kewangan secara berskala.' },
      ],
    },
    founderStory: {
      eyebrow: 'Kisah Penuh',
      title: 'Perjalanan Financial Faiz',
      desc: 'Financial Faiz berkomitmen untuk mentransformasikan landskap pendidikan kewangan di Malaysia dengan menyediakan solusi yang inovatif dan relevan bagi masyarakat.',
      items: [
        {
          title: '01 Permulaan Kerjaya',
          text: 'Faiz Azmi memulakan kerjaya dalam bidang kewangan di sebuah bank, membina kepakaran melalui jualan gadai janji, penyelesaian pembiayaan, dan kad kredit. Dalam tempoh itu, beliau banyak berdepan situasi sebenar pelanggan yang bergelut dengan komitmen bulanan, perancangan pinjaman, dan keputusan kewangan jangka panjang. Kehebatannya dalam komunikasi dan rundingan menjadikannya seorang jurujual yang cemerlang, tetapi lebih penting, pengalaman ini membina pemahaman mendalam tentang realiti kewangan rakyat biasa.',
        },
        {
          title: '02 Perspektif Hidup',
          text: 'Dibesarkan dalam keluarga seorang jurutera, Faiz memahami konsep "trading time for money", yang membentuk cara beliau melihat dan menyampaikan topik kewangan. Beliau melihat bagaimana ramai orang bekerja keras bertahun-tahun, tetapi masih sukar membina kestabilan kewangan kerana kurang pendedahan kepada asas pengurusan wang yang betul. Beliau juga memahami cabaran golongan muda di Malaysia yang sering dibatasi tekanan sosial, komitmen awal usia, dan kekurangan peluang untuk mengubah haluan kehidupan dengan yakin.',
        },
        {
          title: '03 Misi Financial Faiz',
          text: 'Melalui Financial Faiz, Faiz berusaha memberi panduan dan inspirasi kepada generasi muda, membantu mereka membuat keputusan kewangan dan kerjaya yang lebih bijak demi membina masa depan yang lebih cerah. Misi ini diterjemahkan melalui pendekatan kandungan yang mudah difahami, contoh yang dekat dengan kehidupan harian, serta penekanan kepada tindakan praktikal yang boleh terus diamalkan. Fokus utama beliau ialah menjadikan ilmu kewangan tidak lagi bersifat eksklusif, tetapi boleh diakses oleh semua lapisan masyarakat.',
        },
        {
          title: '04 Titik Perubahan Digital',
          text: 'Pandemik COVID-19 menjadi titik perubahan apabila Faiz beralih ke platform digital, menghasilkan video informatif kewangan di media sosial secara konsisten. Langkah ini membolehkan beliau mencapai khalayak lebih luas di seluruh Malaysia, daripada pelajar universiti hingga golongan profesional dan usahawan kecil. Dengan gabungan video pendek, podcast, sesi penerangan, dan kolaborasi media, Financial Faiz berkembang menjadi jenama pendidikan kewangan yang relevan, dipercayai, dan mudah difahami.',
        },
      ],
    },
    media: {
      eyebrow: 'Saluran Media Rasmi',
      title: 'Terokai semua saluran rasmi Financial Faiz untuk kandungan menyeluruh',
      seenEyebrow: 'Pernah Dipaparkan Di',
      seenTitle: 'Penampilan media di platform utama',
    },
    command: {
      eyebrow: 'Gambaran Saluran',
      title: 'Ringkasan Rangkaian Financial Faiz',
      desc: '',
      mapEyebrow: 'Ringkasan Langsung',
      mapTitle: 'Saluran Financial Faiz',
      mapMetaPrefix: 'Jumlah Rangkaian',
      highlights: [
        ['Saluran Media', 'Rangkaian YouTube merangkumi Financial Faiz, FF Podcast, DAFF Podcast, dan FF News.'],
        ['Saluran Sosial', 'Kandungan disebarkan melalui TikTok, Instagram, Facebook, X, Telegram, dan YouTube.'],
        ['Perkhidmatan', 'Perkhidmatan merangkumi video pendek, video panjang, podcast, dan kempen jenama.'],
      ],
    },
    services: {
      eyebrow: 'Apa Kami Sediakan',
      title: 'Perkhidmatan Kami',
      desc: 'Template bahagian perkhidmatan. Boleh ubah ikut pakej dan skop semasa.',
      items: [
        { title: 'Pengurusan Event', desc: 'Perancangan, koordinasi, dan pelaksanaan event serta aktivasi jenama secara menyeluruh.', image: '/services/event.jpg' },
        { title: 'Produksi Podcast', desc: 'Idea podcast, workflow rakaman, pengurusan studio, dan post-production output.', image: '/services/podcast.jpg' },
        { title: 'TikTok / Video Pendek', desc: 'Strategi short-form, penulisan skrip, shooting, dan editing untuk capaian sosial yang lebih baik.', image: '/services/tiktok.jpg' },
        { title: 'Latihan Kewangan', desc: 'Sesi ceramah, workshop, dan latihan literasi kewangan untuk organisasi dan komuniti.', image: '/services/training.jpg' },
        { title: 'Pembangunan Website / Sistem', desc: 'Pembangunan website dan sistem dalaman untuk operasi kandungan serta pengalaman pengguna.', image: '/services/webdevelopment.jpg' },
      ],
    },
    career: {
      title: 'KERJAYA',
      desc: 'Sertai Financial Faiz untuk membina kandungan kewangan berimpak bersama profesional industri.',
      inviteTitle: 'Kami juga mengalu-alukan pelajar yang berminat untuk latihan industri.',
      inviteSub: 'Jom bina kerjaya bersama kami.',
      formTitle: 'Sertai Pasukan Kami',
      formNameLabel: 'Nama Penuh*',
      formEmailLabel: 'Emel*',
      formPhoneLabel: 'Nombor Telefon',
      formMessageLabel: 'Mesej*',
      formSubmitLabel: 'Hantar',
      reminderLabel: 'Peringatan:',
      reminder: 'Sila emel resume anda ke jobs@financialfaiz.com selepas hantar borang ini.',
      teamStories: [
        { name: 'Datu Zulkarnain', role: 'Event Coordinator', quote: 'Event bukan sekadar ikut perancangan. Situasi berubah pantas dan keputusan perlu dibuat segera. Peranan ini sesuai untuk yang selesa dalam suasana dinamik.', side: 'left', tag: 'DZ', image: '/person1.png' },
        { name: 'Joegrryio Jamin', role: 'IT Manager', quote: 'K', side: 'right', tag: 'JJ', image: '/person2.png' },
        { name: 'Amirul Zulhadi', role: 'Content Coordinator', quote: 'Content bukan sekadar nampak menarik. Ia mesti beri impak melalui pemahaman audience, relevansi, dan penyampaian yang tepat.', side: 'left', tag: 'AZ', image: '/person3.png' },
        { name: 'Azim Yusri', role: 'Studio Manager', quote: 'Studio adalah tempat idea direalisasikan. Setiap detail memainkan peranan. Peranan ini sesuai untuk individu yang teliti dan selesa dalam persekitaran pantas.', side: 'right', tag: 'AY', image: '/person4.png' },
      ],
    },
    partners: {
      title: 'Ikuti saluran sosial kami untuk lebih banyak kandungan kewangan',
    },
    book: {
      title: 'Nak hidup lebih terjamin? Mulakan perancangan kewangan sekarang.',
      desc: 'Panduan kewangan praktikal untuk rakyat Malaysia.',
      buyButton: 'Beli Sekarang',
    },
    footer: {
      desc: 'Financial Faiz membina ekosistem media kewangan digital yang jelas dan relevan untuk rakyat Malaysia.',
      copyright: '© 2026 Financial Faiz. Hak cipta terpelihara.',
    },
    finalCta: {
      eyebrow: 'Versi Seterusnya',
      title: 'Portal Financial Faiz',
      desc: 'Akan dilancarkan tidak lama lagi: portal pembelajaran lebih pintar dengan alat sebenar, modul langsung, dan panduan tindakan kewangan.',
      backToTop: 'Kembali ke atas',
    },
  },
};

function deepMerge(base, override) {
  if (!override || typeof override !== 'object') return base;
  if (Array.isArray(override)) return override;
  const out = { ...base };
  Object.keys(override).forEach((key) => {
    const next = override[key];
    const prev = out[key];
    out[key] = (next && typeof next === 'object' && !Array.isArray(next) && prev && typeof prev === 'object' && !Array.isArray(prev))
      ? deepMerge(prev, next)
      : next;
  });
  return out;
}

export function getContentConfig(source = 'live') {
  if (typeof window === 'undefined') return defaultContent;
  try {
    const params = new URLSearchParams(window.location.search);
    const urlSource = params.get('ff_source');
    const urlLang = params.get('lang');
    const storedLang = window.localStorage.getItem(CONTENT_LANG_KEY);
    const resolvedLang = (urlLang === 'bm' || urlLang === 'en')
      ? urlLang
      : ((storedLang === 'bm' || storedLang === 'en') ? storedLang : 'en');
    window.localStorage.setItem(CONTENT_LANG_KEY, resolvedLang);

    const resolvedSource = urlSource === 'draft' || urlSource === 'live' || urlSource === 'legacy'
      ? urlSource
      : source;

    const scopedKeys = resolvedSource === 'draft'
      ? [CONTENT_STORAGE_KEY_DRAFT, CONTENT_STORAGE_KEY_LIVE, CONTENT_STORAGE_KEY]
      : resolvedSource === 'legacy'
        ? [CONTENT_STORAGE_KEY]
        : [CONTENT_STORAGE_KEY_LIVE, CONTENT_STORAGE_KEY_DRAFT, CONTENT_STORAGE_KEY];

    const raw = scopedKeys.map((key) => window.localStorage.getItem(key)).find(Boolean);
    if (!raw) return resolvedLang === 'bm' ? deepMerge(defaultContent, bmOverrides) : defaultContent;

    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') return resolvedLang === 'bm' ? deepMerge(defaultContent, bmOverrides) : defaultContent;

    const merged = {
      ...defaultContent,
      ...parsed,
    };
    return resolvedLang === 'bm' ? deepMerge(merged, bmOverrides) : merged;
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
