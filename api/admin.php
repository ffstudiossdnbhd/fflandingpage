<!doctype html>
<html lang="ms">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>FF Admin Dashboard</title>
  <style>
    :root{--bg:#0f141c;--panel:#171f2b;--panel2:#1c2533;--line:#2a3446;--text:#e8eef8;--muted:#91a1ba;--brand:#2f7bff;--ok:#11c37a;--danger:#ff5a6f}
    *{box-sizing:border-box} body{margin:0;font-family:Segoe UI,Manrope,sans-serif;background:radial-gradient(1200px 500px at 30% -10%,#1d293b 0,#0f141c 55%);color:var(--text);position:relative;overflow-x:hidden}
    .login-scene{position:fixed;inset:0;z-index:0;overflow:hidden;background:#020817}
    .login-scene video{width:100%;height:100%;object-fit:cover;opacity:.45;filter:saturate(1.1) contrast(1.05)}
    .login-scene::before{content:"";position:absolute;inset:0;background:radial-gradient(1200px 620px at 10% 10%,rgba(59,130,246,.45),transparent 62%),radial-gradient(980px 520px at 95% 85%,rgba(14,116,144,.4),transparent 66%),linear-gradient(145deg,rgba(3,7,18,.88),rgba(8,47,73,.58));mix-blend-mode:screen}
    .login-scene::after{content:"";position:absolute;inset:-20%;background:repeating-linear-gradient(115deg,rgba(255,255,255,.08) 0 1px,transparent 1px 44px);opacity:.1;animation:drift 18s linear infinite}
    @keyframes drift{from{transform:translateX(-3%) translateY(-2%)}to{transform:translateX(3%) translateY(2%)}}
    .orb{position:absolute;border-radius:999px;filter:blur(60px);opacity:.5;animation:float 10s ease-in-out infinite}
    .orb-a{width:280px;height:280px;background:#3b82f6;left:-90px;top:8%}
    .orb-b{width:320px;height:320px;background:#22d3ee;right:-110px;bottom:6%;animation-delay:1.3s}
    @keyframes float{0%,100%{transform:translateY(0) scale(1)}50%{transform:translateY(-24px) scale(1.06)}}
    .particle{position:absolute;width:8px;height:8px;border-radius:999px;background:rgba(186,230,253,.9);box-shadow:0 0 14px rgba(125,211,252,.9);animation:particleMove 12s linear infinite}
    .particle.p1{left:16%;bottom:-20px;animation-duration:10s;animation-delay:.3s}
    .particle.p2{left:43%;bottom:-30px;animation-duration:13s;animation-delay:1.4s}
    .particle.p3{left:68%;bottom:-24px;animation-duration:11.2s;animation-delay:2.1s}
    .particle.p4{left:84%;bottom:-40px;animation-duration:14s;animation-delay:.7s}
    @keyframes particleMove{0%{transform:translateY(0) translateX(0) scale(.8);opacity:0}10%{opacity:.9}100%{transform:translateY(-110vh) translateX(34px) scale(1.2);opacity:0}}
    .streak{position:absolute;height:1px;width:180px;background:linear-gradient(90deg,transparent,rgba(191,219,254,.95),transparent);opacity:.45;transform:rotate(-18deg);animation:streak 7s linear infinite}
    .streak.s1{top:20%;left:-220px;animation-delay:.8s}
    .streak.s2{top:58%;left:-260px;animation-delay:3.1s}
    @keyframes streak{0%{transform:translateX(0) rotate(-18deg);opacity:0}20%{opacity:.5}100%{transform:translateX(140vw) rotate(-18deg);opacity:0}}
    .hidden{display:none!important}
    .shell{display:grid;grid-template-columns:280px 1fr;height:100vh;overflow:hidden;position:relative;z-index:2}
    .sidebar{background:#131a25;border-right:1px solid #232e40;padding:18px;display:flex;flex-direction:column;gap:14px}
    .brand{font-size:2rem;font-weight:900;letter-spacing:.02em}
    .menu{display:grid;gap:8px}
    .menu button{border:1px solid #2a3446;background:#1a2331;color:#d7e4f8;border-radius:12px;padding:12px 14px;text-align:left;font-weight:700;cursor:pointer}
    .menu button.active{background:linear-gradient(135deg,#2f7bff,#1f5bcb);border-color:#347eff;color:white}
    .bottom{margin-top:auto}
    .pill{display:inline-block;background:#223149;border:1px solid #34507b;color:#b9d4ff;padding:6px 10px;border-radius:999px;font-weight:700;font-size:.8rem}
    .btn{border:0;border-radius:10px;padding:10px 14px;font-weight:700;cursor:pointer;transition:.18s} .btn:hover{transform:translateY(-1px)} .btn:disabled{opacity:.65;cursor:not-allowed;transform:none}
    .btn.loading{position:relative;color:transparent!important}.btn.loading:after{content:"";position:absolute;inset:0;margin:auto;width:16px;height:16px;border:2px solid rgba(255,255,255,.35);border-top-color:#fff;border-radius:999px;animation:spin .75s linear infinite}
    .btn-soft.loading:after,.btn-ghost.loading:after{border-color:rgba(180,200,230,.25);border-top-color:#c9defe}.btn-danger.loading:after{border-color:rgba(255,90,111,.3);border-top-color:#ff5a6f}
    @keyframes spin{to{transform:rotate(360deg)}}
    .btn-primary{background:linear-gradient(135deg,#2f7bff,#215fcf);color:#fff}.btn-soft{background:#233247;color:#c8dcff}.btn-danger{background:#40242b;color:#ff98a5}.btn-ghost{background:#202b3d;color:#d0e3ff;border:1px solid #334863}.btn-mini{min-width:40px;padding:8px 10px}
    .main{padding:18px;overflow:auto}
    .top{display:flex;align-items:center;justify-content:space-between;gap:12px;background:var(--panel);border:1px solid var(--line);border-radius:16px;padding:12px 14px}
    .top input{width:min(560px,100%);background:#111925;border:1px solid #2b374b;color:#e9f0ff;border-radius:999px;padding:11px 16px}
    .content{margin-top:16px}
    .card{background:var(--panel);border:1px solid var(--line);border-radius:16px;padding:16px}
    .panel.card{max-width:1280px;margin-inline:auto}
    .panel{display:none}.panel.active{display:block}
    h2{margin:0 0 12px;font-size:2rem;letter-spacing:.01em} h3{margin:0 0 8px} .muted{color:var(--muted)}
    .stats{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:10px}.stat{background:var(--panel2);border:1px solid #2b374b;border-radius:12px;padding:12px}.stat small{display:block;color:#8da5c8}.stat strong{font-size:1.9rem}
    .analytics-grid{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:12px;margin-top:12px}.analytics-card{background:var(--panel2);border:1px solid #2b374b;border-radius:12px;padding:12px}.analytics-card small{color:#8da5c8}.analytics-card strong{font-size:1.8rem;color:#beddff}.analytics-card .delta{display:block;margin-top:4px;font-size:.78rem;font-weight:700}.delta.up{color:#23d18b}.delta.down{color:#ff8395}
    .analytics-layout{display:grid;grid-template-columns:1.35fr .65fr;gap:12px;margin-top:12px}
    .analytics-side{display:grid;gap:12px}
    .mini-list{background:var(--panel2);border:1px solid #2b374b;border-radius:12px;padding:12px}
    .mini-list h4{margin:0 0 10px;color:#d3e6ff}
    .mini-list ul{margin:0;padding:0;list-style:none;display:grid;gap:8px}
    .mini-list li{display:flex;justify-content:space-between;align-items:center;padding:8px 10px;border:1px solid #30405d;border-radius:10px;background:#162238;color:#c4daf9}
    .mini-list .tag{font-size:.75rem;padding:4px 8px;border-radius:999px;border:1px solid #395983;color:#9ec2f7}
    .progress-wrap{background:var(--panel2);border:1px solid #2b374b;border-radius:12px;padding:12px}
    .progress-track{height:10px;background:#18253a;border-radius:999px;overflow:hidden;border:1px solid #2a3e60}
    .progress-value{height:100%;width:0%;background:linear-gradient(90deg,#27d99a,#36a2ff);transition:width .4s ease}
    .progress-meta{margin-top:8px;display:flex;justify-content:space-between;color:#99b3d7;font-size:.82rem}
    .trend-chart{margin-top:12px;background:var(--panel2);border:1px solid #2b374b;border-radius:12px;padding:12px}.trend-bars{display:flex;align-items:flex-end;gap:8px;height:180px}.trend-bar{flex:1;background:linear-gradient(180deg,#3b8cff,#2566d8);border-radius:8px 8px 4px 4px;position:relative}.trend-bar span{position:absolute;bottom:100%;left:50%;transform:translateX(-50%);font-size:.7rem;color:#9eb6d8}.trend-labels{display:flex;gap:8px;margin-top:8px}.trend-labels div{flex:1;text-align:center;font-size:.68rem;color:#93abce}
    .field{margin-bottom:10px} label{display:block;margin-bottom:6px;font-weight:700;color:#cbe0ff} input[type=text],input[type=email],input[type=password],textarea{width:100%;background:#111925;border:1px solid #2c3a51;color:#e8eef8;border-radius:10px;padding:10px 12px} textarea{min-height:100px;resize:vertical}
    .grid2{display:grid;grid-template-columns:1fr 1fr;gap:10px}.ads-layout{display:grid;grid-template-columns:1.1fr .9fr;gap:12px}.ads-form-card,.ads-preview-card{background:var(--panel2);border:1px solid #2b374b;border-radius:12px;padding:12px}
    .dropzone{border:2px dashed #3f5f8e;border-radius:12px;background:#152034;padding:12px;text-align:center;color:#9eb9de;font-weight:700}.dropzone.dragover{border-color:#4f8fff;background:#1a2740}
    .drop-actions{margin-top:8px;display:flex;gap:8px;flex-wrap:wrap}.status{margin:8px 0 0;min-height:20px;color:#93a7c5}.status.ok{color:var(--ok)}.status.err{color:var(--danger)}
    .poster-list{margin-top:10px;display:grid;gap:8px;max-height:320px;overflow:auto}.poster-item{display:flex;align-items:center;gap:10px;padding:8px;border:1px solid #31405a;border-radius:10px;background:#151f31}.poster-item img{width:74px;height:52px;object-fit:cover;border-radius:8px}.poster-item code{flex:1;min-width:0;font-size:.74rem;color:#95b2db;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.poster-actions{display:flex;gap:6px}
    .ad-preview{border:1px solid #35507d;border-radius:16px;background:linear-gradient(120deg,#0a2f7e,#1654c2);padding:16px;text-align:center}.ad-preview small{color:#cde0ff;letter-spacing:.15em;text-transform:uppercase;font-weight:700}.ad-preview h3{font-size:1.8rem}.ad-preview p{color:#d8e7ff}.ad-preview .cta{display:inline-flex;margin-top:10px;background:#fff;color:#0f3c95;text-decoration:none;font-weight:800;border-radius:999px;padding:9px 16px}.ad-preview-grid{margin-top:14px;display:flex;gap:10px;overflow:auto}.ad-preview-grid img{width:170px;height:230px;object-fit:cover;border-radius:12px}.ad-preview.off{background:#1c2a41;color:#b3c7e8}.ad-preview.off .cta{display:none}
    .table-wrap{overflow:auto;border:1px solid #2d3b54;border-radius:12px;background:#121a27;max-height:calc(100vh - 280px)} table{width:100%;border-collapse:collapse;min-width:900px} th,td{padding:12px 10px;border-bottom:1px solid #243248} th{background:#182235;color:#b8d3fb;font-size:.78rem;text-transform:uppercase} .msg-cell{max-width:280px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
    .login-wrap{max-width:470px;margin:8vh auto 0;backdrop-filter:blur(12px);border:1px solid rgba(125,176,255,.34);background:linear-gradient(160deg,rgba(20,31,52,.78),rgba(19,34,56,.62));box-shadow:0 30px 80px rgba(0,0,0,.35),inset 0 1px 0 rgba(255,255,255,.15);animation:cardPop .58s cubic-bezier(.22,1,.36,1),cardFloat 6s ease-in-out infinite;position:relative;overflow:hidden;padding:14px;border-radius:14px}
    .login-wrap::before{content:"";position:absolute;inset:-120% -30%;background:linear-gradient(120deg,transparent 35%,rgba(255,255,255,.2) 50%,transparent 65%);transform:translateX(-35%);animation:cardShine 4.6s linear infinite;pointer-events:none}
    @keyframes cardFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
    @keyframes cardShine{to{transform:translateX(65%)}}
    @keyframes cardPop{from{opacity:0;transform:translateY(18px) scale(.98)}to{opacity:1;transform:translateY(0) scale(1)}}
    .login-wrap h2{margin:0 0 6px;font-size:1.75rem;letter-spacing:.02em;text-align:center}
    .login-sub{margin:0 0 14px;color:#b9d7ff;font-size:.9rem;text-align:center}
    #adminEmail,#password{height:44px;border-radius:11px;background:rgba(6,15,30,.58);border:1px solid #3b4f72;transition:border-color .2s,box-shadow .2s,transform .2s}
    #adminEmail:focus,#password:focus{outline:none;border-color:#60a5fa;box-shadow:0 0 0 4px rgba(96,165,250,.2)}
    #adminEmail:hover,#password:hover{transform:translateY(-1px)}
    #btnLogin{width:100%;height:46px;border-radius:11px;box-shadow:0 12px 28px rgba(47,123,255,.34);position:relative;overflow:hidden;animation:btnPulse 2.2s ease-in-out infinite}
    #btnLogin::before{content:"";position:absolute;inset:0;background:linear-gradient(90deg,transparent,rgba(255,255,255,.35),transparent);transform:translateX(-100%);animation:btnSweep 2.4s linear infinite}
    @keyframes btnPulse{0%,100%{box-shadow:0 12px 28px rgba(47,123,255,.34)}50%{box-shadow:0 16px 36px rgba(47,123,255,.52)}}
    @keyframes btnSweep{to{transform:translateX(100%)}}
    .login-badge{display:inline-flex;align-items:center;gap:8px;padding:6px 11px;border-radius:999px;border:1px solid rgba(147,197,253,.4);background:rgba(30,58,138,.25);color:#dbeafe;font-size:.72rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;margin:0 auto 10px;animation:badgeBlink 2.8s ease-in-out infinite}
    .login-badge-dot{width:8px;height:8px;border-radius:999px;background:#38bdf8;box-shadow:0 0 12px #38bdf8}
    @keyframes badgeBlink{0%,100%{opacity:.8}50%{opacity:1}}
    body.admin-authenticated .login-scene{display:none}
    body.admin-guest .shell{display:block;height:100vh}
    body.admin-guest .main{min-height:100vh;display:grid;place-items:center;padding:24px}
    body.admin-guest .login-wrap{margin:0;width:min(560px,100%)}
    @media (max-width:1250px){.ads-layout{grid-template-columns:1fr}.stats{grid-template-columns:repeat(2,minmax(0,1fr))}.analytics-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.analytics-layout{grid-template-columns:1fr}.table-wrap{max-height:none}}
    @media (max-width:1000px){.shell{grid-template-columns:1fr;height:auto;overflow:visible}.sidebar{position:relative}.main{overflow:visible}.top{flex-wrap:wrap}.stats,.grid2{grid-template-columns:1fr}.panel.card{max-width:none}}
  </style>
</head>
<body>
  <div class="login-scene" aria-hidden="true">
    <video autoplay muted loop playsinline poster="../public/hero-wallpaper-2-opt.jpg">
      <source src="https://cdn.coverr.co/videos/coverr-clouds-at-sunset-1579/1080p.mp4" type="video/mp4" />
    </video>
    <div class="streak s1"></div>
    <div class="streak s2"></div>
    <div class="orb orb-a"></div>
    <div class="orb orb-b"></div>
    <div class="particle p1"></div>
    <div class="particle p2"></div>
    <div class="particle p3"></div>
    <div class="particle p4"></div>
  </div>

  <div class="shell">
    <aside id="sidePanel" class="sidebar hidden">
      <div class="brand">FF Admin</div>
      <div class="muted">Control center</div>
      <nav class="menu" id="menuNav">
        <button class="active" data-panel="overviewPanel">Dashboard</button>
        <button data-panel="analyticsPanel">Analytics</button>
        <button data-panel="formPanel">Form Settings</button>
        <button data-panel="adsPanel">Ads Settings</button>
        <button data-panel="submissionsPanel">Submissions</button>
      </nav>
      <div class="bottom"><span class="pill" id="submissionCountPill">0 Rekod</span></div>
      <button id="btnLogout" class="btn btn-soft">Logout</button>
    </aside>
    <main class="main">
      <section id="loginCard" class="card login-wrap hidden">
        <span class="login-badge"><span class="login-badge-dot"></span>Secure Admin Access</span>
        <h2 style="font-size:1.8rem">Login</h2>
        <p class="login-sub">Financial Faiz - Admin</p>
        <div class="field"><label>Email</label><input id="adminEmail" type="email" placeholder="ffstudiossdnbhd@gmail.com" autocomplete="username" /></div>
        <div class="field"><label>Password</label><input id="password" type="password" placeholder="************" /></div>
        <button id="btnLogin" class="btn btn-primary">Login</button><p id="loginStatus" class="status"></p>
      </section>
      <section id="adminPanel" class="hidden">
        <div class="top">
          <input type="text" placeholder="Search panel..." />
          <div style="display:flex;gap:8px"><button id="btnRefresh" class="btn btn-soft">Refresh</button><button id="btnExport" class="btn btn-soft">Export CSV</button></div>
        </div>
        <div class="content">
          <section id="overviewPanel" class="panel active card">
            <h2>Dashboard</h2>
            <div class="stats">
              <div class="stat"><small>Total Submission</small><strong id="statTotal">0</strong></div>
              <div class="stat"><small>Submission Hari Ini</small><strong id="statToday">0</strong></div>
              <div class="stat"><small>Last Updated</small><strong id="statUpdated">-</strong></div>
              <div class="stat"><small>System</small><strong style="font-size:1.2rem;color:#8ed0ff">Online</strong></div>
            </div>
          </section>
          <section id="analyticsPanel" class="panel card">
            <h2 style="font-size:1.8rem">Website Analytics</h2>
            <div class="analytics-grid">
              <div class="analytics-card"><small>Total Visitors</small><strong id="analyticsTotal">0</strong></div>
              <div class="analytics-card"><small>Visitors Today</small><strong id="analyticsToday">0</strong></div>
              <div class="analytics-card"><small>Avg 14 Days</small><strong id="analyticsAvg">0</strong></div>
              <div class="analytics-card"><small>Submission 14 Hari</small><strong id="analyticsSub14">0</strong><span id="analyticsSubDelta" class="delta">-</span></div>
              <div class="analytics-card"><small>Conversion Rate</small><strong id="analyticsCvRate">0%</strong><span id="analyticsVisitorDelta" class="delta">-</span></div>
            </div>
            <div class="analytics-layout">
              <div class="trend-chart"><h3>Daily Visitors (14 Hari)</h3><div id="trendBars" class="trend-bars"></div><div id="trendLabels" class="trend-labels"></div></div>
              <div class="analytics-side">
                <div class="progress-wrap">
                  <h4 style="margin:0 0 8px;color:#d3e6ff">Target Harian</h4>
                  <div class="progress-track"><div id="analyticsTargetBar" class="progress-value"></div></div>
                  <div class="progress-meta"><span>Target: <b id="analyticsTargetNum">100</b></span><span id="analyticsTargetPct">0%</span></div>
                </div>
                <div class="mini-list">
                  <h4>Ringkasan Pantas</h4>
                  <ul>
                    <li><span>Peak Day</span><span class="tag" id="analyticsPeakDay">-</span></li>
                    <li><span>Peak Visitors</span><span class="tag" id="analyticsPeakValue">0</span></li>
                    <li><span>Submission Hari Ini</span><span class="tag" id="analyticsSubToday">0</span></li>
                    <li><span>Visitors Minggu Ini</span><span class="tag" id="analyticsWeekVisitors">0</span></li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
          <section id="formPanel" class="panel card">
            <h2 style="font-size:1.8rem">Form Settings</h2>
            <div class="field"><label>Email Tujuan Borang Kerjaya</label><input id="emailTo" type="email" placeholder="hr@domain.com" /></div>
            <button id="btnSaveForm" class="btn btn-primary">Simpan Settings Borang</button><p id="formStatus" class="status"></p>
          </section>
          <section id="adsPanel" class="panel card">
            <h2 style="font-size:1.8rem">Ads Settings</h2>
            <div class="ads-layout">
              <div class="ads-form-card">
                <div class="field"><label><input id="adEnabled" type="checkbox" style="width:auto;margin-right:8px;" />Enable iklan selepas main hero</label></div>
                <div class="field"><label>Label Atas Iklan</label><input id="adEyebrow" type="text" /></div>
                <div class="field"><label>Tajuk Iklan</label><input id="adTitle" type="text" /></div>
                <div class="field"><label>Isi Iklan</label><textarea id="adBody"></textarea></div>
                <div class="grid2"><div class="field"><label>Label Butang CTA</label><input id="adCtaLabel" type="text" /></div><div class="field"><label>URL CTA</label><input id="adCtaUrl" type="text" /></div></div>
                <div class="field"><label>Poster Iklan (2-8) - Drag & Drop</label><input id="adImageInput" type="file" accept="image/*" multiple class="hidden" /><div id="adDropzone" class="dropzone">Drop poster di sini atau klik untuk upload</div><div class="drop-actions"><button id="btnUploadImage" type="button" class="btn btn-soft">Pilih Poster</button><button id="btnClearPosters" type="button" class="btn btn-danger">Clear Semua</button></div><p id="adImageStatus" class="status"></p><div id="posterList" class="poster-list"></div></div>
                <button id="btnSaveAds" class="btn btn-primary">Simpan Settings Iklan</button><p id="adsStatus" class="status"></p>
              </div>
              <div class="ads-preview-card"><div id="adPreview" class="ad-preview" aria-live="polite"><small id="previewBadge">Iklan Aktif</small><h3 id="previewTitle">Iklan Tajaan</h3><p id="previewBody">Ruang iklan ini boleh diurus dari admin panel.</p><div id="previewGrid" class="ad-preview-grid"></div><a id="previewCta" class="cta" href="#" target="_blank" rel="noreferrer">Ketahui Lagi</a></div></div>
            </div>
          </section>
          <section id="submissionsPanel" class="panel card">
            <h2 style="font-size:1.8rem">Submission Kerjaya</h2>
            <div class="table-wrap"><table id="submissionsTable"><thead><tr><th>Tarikh</th><th>Nama</th><th>Email</th><th>Telefon</th><th>Mesej</th><th>Resume</th><th>Tindakan</th></tr></thead><tbody></tbody></table></div>
          </section>
        </div>
      </section>
    </main>
  </div>

  <script>
    const loginCard=document.getElementById('loginCard'),adminPanel=document.getElementById('adminPanel'),sidePanel=document.getElementById('sidePanel'),loginStatus=document.getElementById('loginStatus');
    const btnLogin=document.getElementById('btnLogin'),btnLogout=document.getElementById('btnLogout'),btnSaveForm=document.getElementById('btnSaveForm'),btnSaveAds=document.getElementById('btnSaveAds'),btnRefresh=document.getElementById('btnRefresh'),btnExport=document.getElementById('btnExport'),btnUploadImage=document.getElementById('btnUploadImage'),btnClearPosters=document.getElementById('btnClearPosters');
    const statTotal=document.getElementById('statTotal'),statToday=document.getElementById('statToday'),statUpdated=document.getElementById('statUpdated');
    const submissionCountPill=document.getElementById('submissionCountPill'),formStatus=document.getElementById('formStatus'),adsStatus=document.getElementById('adsStatus'),adImageStatus=document.getElementById('adImageStatus');
    const analyticsTotal=document.getElementById('analyticsTotal'),analyticsToday=document.getElementById('analyticsToday'),analyticsAvg=document.getElementById('analyticsAvg'),trendBars=document.getElementById('trendBars'),trendLabels=document.getElementById('trendLabels');
    const analyticsSub14=document.getElementById('analyticsSub14'),analyticsSubDelta=document.getElementById('analyticsSubDelta'),analyticsCvRate=document.getElementById('analyticsCvRate'),analyticsVisitorDelta=document.getElementById('analyticsVisitorDelta');
    const analyticsPeakDay=document.getElementById('analyticsPeakDay'),analyticsPeakValue=document.getElementById('analyticsPeakValue'),analyticsSubToday=document.getElementById('analyticsSubToday'),analyticsWeekVisitors=document.getElementById('analyticsWeekVisitors');
    const analyticsTargetBar=document.getElementById('analyticsTargetBar'),analyticsTargetNum=document.getElementById('analyticsTargetNum'),analyticsTargetPct=document.getElementById('analyticsTargetPct');
    const menuButtons=[...document.querySelectorAll('#menuNav button')],panels=[...document.querySelectorAll('.panel')];
    let latestSubmissions=[],settingsState=null,posterUrls=[]; const maxPosters=8;
    function setButtonLoading(btn,isLoading){if(!btn)return;btn.disabled=!!isLoading;btn.classList.toggle('loading',!!isLoading)}
    function setStatus(el,text,kind){el.textContent=text||'';el.classList.remove('ok','err');if(kind)el.classList.add(kind)}
    function showPanel(id){panels.forEach(p=>p.classList.toggle('active',p.id===id));menuButtons.forEach(b=>b.classList.toggle('active',b.dataset.panel===id))}
    menuButtons.forEach(btn=>btn.addEventListener('click',()=>showPanel(btn.dataset.panel)));
    async function login(){setStatus(loginStatus,'Sedang login...');const email=document.getElementById('adminEmail').value.trim();const password=document.getElementById('password').value;const res=await fetch('./admin_login.php',{method:'POST',headers:{'Content-Type':'application/json'},credentials:'same-origin',body:JSON.stringify({email,password})});const data=await res.json().catch(()=>({}));if(!res.ok||!data.ok){setStatus(loginStatus,data.message||'Login gagal','err');return;}await loadAdmin();}
    function setAuthMode(isAuthed){document.body.classList.toggle('admin-authenticated',!!isAuthed);document.body.classList.toggle('admin-guest',!isAuthed)}
    async function loadAdmin(){const res=await fetch('./admin_bootstrap.php',{credentials:'same-origin'});if(res.status===401){setAuthMode(false);loginCard.classList.remove('hidden');adminPanel.classList.add('hidden');sidePanel.classList.add('hidden');return;}const data=await res.json().catch(()=>({}));if(!res.ok||!data.ok){setStatus(loginStatus,data.message||'Gagal load data.','err');setAuthMode(false);return;}setAuthMode(true);loginCard.classList.add('hidden');adminPanel.classList.remove('hidden');sidePanel.classList.remove('hidden');settingsState=data.settings||{};applySettingsToForm();latestSubmissions=Array.isArray(data.submissions)?data.submissions:[];renderSubmissions(latestSubmissions);renderStats(latestSubmissions,settingsState.updatedAt||null);await loadAnalytics();}
    async function loadAnalytics(){const res=await fetch('./admin_analytics.php',{credentials:'same-origin'});const data=await res.json().catch(()=>({}));if(!res.ok||!data.ok||!data.analytics)return;renderAnalytics(data.analytics)}
    function renderAnalytics(analytics){const total=Number(analytics.totalVisitors||0),today=Number(analytics.todayVisitors||0),trend=Array.isArray(analytics.trend14Days)?analytics.trend14Days:[];const sum=trend.reduce((a,x)=>a+Number(x.visitors||0),0),avg=trend.length?Math.round((sum/trend.length)*10)/10:0;analyticsTotal.textContent=String(total);analyticsToday.textContent=String(today);analyticsAvg.textContent=String(avg);trendBars.innerHTML='';trendLabels.innerHTML='';const max=Math.max(1,...trend.map(x=>Number(x.visitors||0)));trend.forEach(item=>{const val=Number(item.visitors||0),h=Math.max(6,Math.round((val/max)*160));const b=document.createElement('div');b.className='trend-bar';b.style.height=`${h}px`;b.innerHTML=`<span>${val}</span>`;trendBars.appendChild(b);const l=document.createElement('div');l.textContent=String(item.day||'').slice(5);trendLabels.appendChild(l);});
      const todayStr=ymdOffset(0),last7=trend.slice(-7).reduce((a,x)=>a+Number(x.visitors||0),0),prev7=trend.slice(0,7).reduce((a,x)=>a+Number(x.visitors||0),0),visitorGrowth=calcGrowth(last7,prev7);
      const subLast14=countSubmissionsSince(13),subToday=countSubmissionsByDate(todayStr),subLast7=countSubmissionsSince(6),subPrev7=countSubmissionsRange(13,7),subGrowth=calcGrowth(subLast7,subPrev7);
      const cvRate=sum>0?((subLast14/sum)*100):0;
      const peak=trend.reduce((best,row)=>Number(row.visitors||0)>best.visitors?{day:String(row.day||''),visitors:Number(row.visitors||0)}:best,{day:'-',visitors:0});
      analyticsSub14.textContent=String(subLast14);
      analyticsCvRate.textContent=`${cvRate.toFixed(1)}%`;
      analyticsSubDelta.textContent=`${subGrowth>=0?'+':''}${subGrowth.toFixed(1)}% vs minggu lepas`;
      analyticsSubDelta.className=`delta ${subGrowth>=0?'up':'down'}`;
      analyticsVisitorDelta.textContent=`${visitorGrowth>=0?'+':''}${visitorGrowth.toFixed(1)}% visitor WoW`;
      analyticsVisitorDelta.className=`delta ${visitorGrowth>=0?'up':'down'}`;
      analyticsPeakDay.textContent=peak.day==='-'?'-':peak.day.slice(5);
      analyticsPeakValue.textContent=String(peak.visitors);
      analyticsSubToday.textContent=String(subToday);
      analyticsWeekVisitors.textContent=String(last7);
      const dynamicTarget=Math.max(20,Math.round(avg*1.2));const targetPct=Math.min(100,Math.round((today/dynamicTarget)*100));
      analyticsTargetNum.textContent=String(dynamicTarget);
      analyticsTargetPct.textContent=`${targetPct}%`;
      analyticsTargetBar.style.width=`${targetPct}%`;
    }
    function ymdOffset(days){const d=new Date();d.setDate(d.getDate()+days);return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;}
    function calcGrowth(current,previous){if(previous<=0){return current>0?100:0;}return ((current-previous)/previous)*100;}
    function countSubmissionsByDate(day){return latestSubmissions.filter(x=>String(x.created_at||'').startsWith(day)).length;}
    function countSubmissionsSince(daysBack){const cutoff=ymdOffset(-daysBack);return latestSubmissions.filter(x=>String(x.created_at||'').slice(0,10)>=cutoff).length;}
    function countSubmissionsRange(fromBack,toBack){const start=ymdOffset(-fromBack),end=ymdOffset(-toBack);return latestSubmissions.filter(x=>{const d=String(x.created_at||'').slice(0,10);return d>=start&&d<=end;}).length;}
    function applySettingsToForm(){document.getElementById('emailTo').value=settingsState?.emailTo||'';document.getElementById('adEnabled').checked=Boolean(settingsState?.ad?.enabled);document.getElementById('adEyebrow').value=settingsState?.ad?.eyebrow||'Sponsored';document.getElementById('adTitle').value=settingsState?.ad?.title||'';document.getElementById('adBody').value=settingsState?.ad?.body||'';document.getElementById('adCtaLabel').value=settingsState?.ad?.ctaLabel||'';document.getElementById('adCtaUrl').value=settingsState?.ad?.ctaUrl||'';posterUrls=Array.isArray(settingsState?.ad?.posters)?settingsState.ad.posters.slice(0,maxPosters):[];if(posterUrls.length===0&&settingsState?.ad?.imageUrl){posterUrls=[settingsState.ad.imageUrl];}renderPosterList();refreshAdPreview();}
    function renderStats(submissions,updatedAt){statTotal.textContent=String(submissions.length);submissionCountPill.textContent=`${submissions.length} Rekod`;const now=new Date();const prefix=`${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')}`;statToday.textContent=String(submissions.filter(x=>String(x.created_at||'').startsWith(prefix)).length);statUpdated.textContent=updatedAt?String(updatedAt).replace('T',' '):'-';}
    function renderSubmissions(rows){const tbody=document.querySelector('#submissionsTable tbody');tbody.innerHTML='';if(!rows.length){tbody.innerHTML='<tr><td colspan="7" style="text-align:center;color:#9cb2d4;">Tiada submission lagi.</td></tr>';return;}rows.forEach(item=>{const tr=document.createElement('tr');tr.innerHTML=`<td>${escapeHtml(item.created_at||'')}</td><td>${escapeHtml(item.name||'')}</td><td>${escapeHtml(item.email||'')}</td><td>${escapeHtml(item.phone||'-')}</td><td class="msg-cell" title="${escapeHtml(item.message||'')}">${escapeHtml(item.message||'')}</td><td><a href="./uploads/resumes/${encodeURIComponent(item.resume_stored_name||'')}" target="_blank" rel="noreferrer">${escapeHtml(item.resume_original_name||'View')}</a></td><td><button class="btn btn-danger btn-mini" data-id="${Number(item.id||0)}">Delete</button></td>`;tbody.appendChild(tr);});}
    function buildPayload(){return {emailTo:document.getElementById('emailTo').value.trim(),ad:{enabled:document.getElementById('adEnabled').checked,eyebrow:document.getElementById('adEyebrow').value,title:document.getElementById('adTitle').value,body:document.getElementById('adBody').value,ctaLabel:document.getElementById('adCtaLabel').value,ctaUrl:document.getElementById('adCtaUrl').value,imageUrl:posterUrls[0]||'',posters:posterUrls}}}
    function renderPosterList(){const box=document.getElementById('posterList');box.innerHTML='';if(!posterUrls.length){box.innerHTML='<div style="color:#8ea9cf;font-size:.85rem;">Belum ada poster.</div>';return;}posterUrls.forEach((url,i)=>{const row=document.createElement('div');row.className='poster-item';row.innerHTML=`<img src="${escapeHtml(url)}" alt="Poster ${i+1}" /><code>${escapeHtml(url)}</code><div class="poster-actions"><button title="Naik" class="btn btn-ghost btn-mini" data-act="up" data-index="${i}">&uarr;</button><button title="Turun" class="btn btn-ghost btn-mini" data-act="down" data-index="${i}">&darr;</button><button title="Buang" class="btn btn-danger btn-mini" data-act="remove" data-index="${i}">&times;</button></div>`;box.appendChild(row);});}
    function refreshAdPreview(){const enabled=document.getElementById('adEnabled').checked;const eyebrow=document.getElementById('adEyebrow').value.trim()||'Sponsored';const title=document.getElementById('adTitle').value.trim()||'Iklan Tajaan';const body=document.getElementById('adBody').value.trim()||'Ruang iklan ini boleh diurus dari admin panel.';const ctaLabel=document.getElementById('adCtaLabel').value.trim()||'Ketahui Lagi';const ctaUrl=document.getElementById('adCtaUrl').value.trim()||'#';const box=document.getElementById('adPreview');document.getElementById('previewBadge').textContent=eyebrow;document.getElementById('previewTitle').textContent=title;document.getElementById('previewBody').textContent=body;const cta=document.getElementById('previewCta');cta.textContent=ctaLabel;cta.href=ctaUrl;box.classList.toggle('off',!enabled);const grid=document.getElementById('previewGrid');grid.innerHTML='';posterUrls.forEach(url=>{const img=document.createElement('img');img.src=url;img.alt=title||'Poster';grid.appendChild(img);});}
    async function uploadAdFiles(files){const selected=[...files].slice(0,Math.max(0,maxPosters-posterUrls.length));if(!selected.length){setStatus(adImageStatus,'Maksimum 8 poster sahaja.','err');return;}setButtonLoading(btnUploadImage,true);setButtonLoading(btnClearPosters,true);setStatus(adImageStatus,'Uploading poster...');for(const file of selected){const fd=new FormData();fd.append('image',file);const res=await fetch('./admin_upload_ad_image.php',{method:'POST',credentials:'same-origin',body:fd});const data=await res.json().catch(()=>({}));if(!res.ok||!data.ok){setStatus(adImageStatus,data.message||'Upload gagal.','err');continue;}if(data.imageUrl&&posterUrls.length<maxPosters){posterUrls.push(data.imageUrl);}}renderPosterList();refreshAdPreview();setStatus(adImageStatus,'Upload poster selesai.','ok');setButtonLoading(btnUploadImage,false);setButtonLoading(btnClearPosters,false);}
    async function saveSettings(target){const statusEl=target==='form'?formStatus:adsStatus;const btn=target==='form'?btnSaveForm:btnSaveAds;setButtonLoading(btn,true);setStatus(statusEl,'Menyimpan...');const res=await fetch('./admin_update_settings.php',{method:'POST',headers:{'Content-Type':'application/json'},credentials:'same-origin',body:JSON.stringify(buildPayload())});const data=await res.json().catch(()=>({}));setStatus(statusEl,data.message||(data.ok?'Settings berjaya disimpan.':'Gagal simpan settings.'),data.ok?'ok':'err');if(data.ok)await loadAdmin();setButtonLoading(btn,false);}
    async function deleteSubmission(id,btn){if(!Number.isFinite(id)||id<=0)return;if(!window.confirm('Padam submission ini?'))return;setButtonLoading(btn,true);const res=await fetch('./admin_delete_submission.php',{method:'POST',headers:{'Content-Type':'application/json'},credentials:'same-origin',body:JSON.stringify({id})});const data=await res.json().catch(()=>({}));if(!res.ok||!data.ok){window.alert(data.message||'Gagal padam submission.');setButtonLoading(btn,false);return;}await loadAdmin();}
    async function logout(){setButtonLoading(btnLogout,true);await fetch('./admin_logout.php',{method:'POST',credentials:'same-origin'});setAuthMode(false);adminPanel.classList.add('hidden');sidePanel.classList.add('hidden');loginCard.classList.remove('hidden');setButtonLoading(btnLogout,false)}
    function exportCsv(){if(!latestSubmissions.length){window.alert('Tiada data untuk export.');return;}const headers=['id','created_at','name','email','phone','message','resume_original_name','resume_stored_name'];const lines=[headers.join(',')];latestSubmissions.forEach(row=>lines.push(headers.map(key=>`"${String(row[key]??'').replace(/"/g,'""')}"`).join(',')));const blob=new Blob([lines.join('\n')],{type:'text/csv;charset=utf-8;'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download=`ff-submissions-${new Date().toISOString().slice(0,10)}.csv`;document.body.appendChild(a);a.click();a.remove();URL.revokeObjectURL(url)}
    function escapeHtml(v){return String(v).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#039;')}
    btnLogin.addEventListener('click',async()=>{setButtonLoading(btnLogin,true);await login();setButtonLoading(btnLogin,false)});btnLogout.addEventListener('click',logout);btnSaveForm.addEventListener('click',()=>saveSettings('form'));btnSaveAds.addEventListener('click',()=>saveSettings('ads'));btnRefresh.addEventListener('click',async()=>{setButtonLoading(btnRefresh,true);await loadAdmin();setButtonLoading(btnRefresh,false)});btnExport.addEventListener('click',async()=>{setButtonLoading(btnExport,true);exportCsv();setTimeout(()=>setButtonLoading(btnExport,false),350)});
    btnUploadImage.addEventListener('click',()=>document.getElementById('adImageInput').click());btnClearPosters.addEventListener('click',()=>{posterUrls=[];renderPosterList();refreshAdPreview();setStatus(adImageStatus,'Poster dikosongkan.','ok')});
    document.getElementById('adImageInput').addEventListener('change',e=>{if(e.target.files?.length)uploadAdFiles(e.target.files);e.target.value=''});
    const dz=document.getElementById('adDropzone');dz.addEventListener('click',()=>document.getElementById('adImageInput').click());dz.addEventListener('dragover',e=>{e.preventDefault();dz.classList.add('dragover')});dz.addEventListener('dragleave',()=>dz.classList.remove('dragover'));dz.addEventListener('drop',e=>{e.preventDefault();dz.classList.remove('dragover');if(e.dataTransfer?.files?.length)uploadAdFiles(e.dataTransfer.files)});
    document.getElementById('posterList').addEventListener('click',e=>{const t=e.target;if(!(t instanceof Element)||!t.matches('button[data-act]'))return;const idx=Number(t.getAttribute('data-index')||'-1');if(idx<0||idx>=posterUrls.length)return;const act=t.getAttribute('data-act');if(act==='remove')posterUrls.splice(idx,1);if(act==='up'&&idx>0)[posterUrls[idx-1],posterUrls[idx]]=[posterUrls[idx],posterUrls[idx-1]];if(act==='down'&&idx<posterUrls.length-1)[posterUrls[idx+1],posterUrls[idx]]=[posterUrls[idx],posterUrls[idx+1]];renderPosterList();refreshAdPreview()});
    ['adEnabled','adEyebrow','adTitle','adBody','adCtaLabel','adCtaUrl'].forEach(id=>{const el=document.getElementById(id);if(el){el.addEventListener('input',refreshAdPreview);el.addEventListener('change',refreshAdPreview)}});
    document.querySelector('#submissionsTable tbody').addEventListener('click',e=>{const t=e.target;if(!(t instanceof Element)||!t.matches('button[data-id]'))return;deleteSubmission(Number(t.getAttribute('data-id')||'0'),t)});
    loadAdmin().then(()=>{if(adminPanel.classList.contains('hidden'))loginCard.classList.remove('hidden')});
  </script>
</body>
</html>
