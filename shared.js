/* ============================================================
   SKILL SWAP — shared.js
   Shared across all pages: auth, language, header, modals, AI
   ============================================================ */

/* ──────────────────────────────────────────────────────────
   1.  GLOBAL STATE
   ────────────────────────────────────────────────────────── */
window.SS = window.SS || {};

SS.state = {
  lang: localStorage.getItem('ss_lang') || 'ar',
  user: JSON.parse(localStorage.getItem('ss_user') || 'null'),
};

/* ──────────────────────────────────────────────────────────
   2.  TRANSLATIONS
   ────────────────────────────────────────────────────────── */
SS.t = {
  ar: {
    nav_home: 'الرئيسية', nav_courses: 'الدورات', nav_partners: 'الشركاء',
    nav_pricing: 'الأسعار', nav_ai: 'AI Tutor',
    nav_join: 'انضم الآن', nav_account: 'حسابي',
    lang_ar: 'عر', lang_fr: 'FR',
    reg_title: 'انضم إلى Skill Swap',
    reg_subtitle: 'ابدأ رحلتك التعليمية مجاناً اليوم',
    tab_signup: 'إنشاء حساب', tab_login: 'تسجيل الدخول',
    social_google: 'المتابعة بـ Google', social_fb: 'المتابعة بـ Facebook',
    divider: 'أو بالبريد الإلكتروني',
    ph_fname: 'الاسم', ph_lname: 'اللقب', ph_email: 'البريد الإلكتروني',
    ph_password: 'كلمة المرور (8 أحرف على الأقل)', ph_password_login: 'كلمة المرور',
    lbl_skill: 'مجال اهتمامك',
    skill_dev: 'البرمجة والتطوير', skill_design: 'التصميم وUX', skill_mkt: 'التسويق الرقمي',
    skill_lang: 'اللغات', skill_biz: 'إدارة الأعمال', skill_ai: 'الذكاء الاصطناعي',
    lbl_terms: 'أوافق على شروط الاستخدام وسياسة الخصوصية',
    btn_signup: 'إنشاء الحساب مجاناً ✨', btn_login: 'تسجيل الدخول →',
    forgot: 'نسيت كلمة المرور؟',
    err_name: '⚠️ يرجى إدخال الاسم واللقب', err_email: '⚠️ بريد إلكتروني غير صالح',
    err_pass: '⚠️ كلمة المرور يجب أن تكون 8 أحرف على الأقل',
    err_terms: '⚠️ يجب الموافقة على الشروط أولاً',
    err_fields: '⚠️ يرجى ملء جميع الحقول',
    toast_welcome: (name) => `🎉 مرحباً ${name}! تم التسجيل بنجاح`,
    toast_login: (name) => `👋 أهلاً بعودتك ${name}!`,
    toast_social: (p, name) => `✅ تم تسجيل الدخول بـ ${p}: ${name}`,
    toast_forgot: '📧 تم إرسال رابط استعادة كلمة المرور إلى بريدك',
    course_enroll: '⚡ سجّل الآن',
    course_later: 'لاحقاً',
    course_instructor: 'المدرب',
    course_content: 'محتوى الدورة',
    course_sessions: 'نوع الحصص المتاحة',
  },
  fr: {
    nav_home: 'Accueil', nav_courses: 'Cours', nav_partners: 'Partenaires',
    nav_pricing: 'Tarifs', nav_ai: 'IA Tuteur',
    nav_join: 'Rejoindre', nav_account: 'Mon compte',
    lang_ar: 'عر', lang_fr: 'FR',
    reg_title: 'Rejoindre Skill Swap',
    reg_subtitle: 'Commencez votre apprentissage gratuitement aujourd\'hui',
    tab_signup: 'Créer un compte', tab_login: 'Se connecter',
    social_google: 'Continuer avec Google', social_fb: 'Continuer avec Facebook',
    divider: 'Ou avec votre email',
    ph_fname: 'Prénom', ph_lname: 'Nom', ph_email: 'Adresse e-mail',
    ph_password: 'Mot de passe (8 caractères min.)', ph_password_login: 'Mot de passe',
    lbl_skill: 'Votre domaine d\'intérêt',
    skill_dev: 'Développement', skill_design: 'Design & UX', skill_mkt: 'Marketing digital',
    skill_lang: 'Langues', skill_biz: 'Gestion d\'entreprise', skill_ai: 'Intelligence Artificielle',
    lbl_terms: 'J\'accepte les conditions d\'utilisation et la politique de confidentialité',
    btn_signup: 'Créer mon compte gratuitement ✨', btn_login: 'Se connecter →',
    forgot: 'Mot de passe oublié ?',
    err_name: '⚠️ Veuillez entrer votre prénom et nom', err_email: '⚠️ Email invalide',
    err_pass: '⚠️ Le mot de passe doit contenir au moins 8 caractères',
    err_terms: '⚠️ Vous devez accepter les conditions',
    err_fields: '⚠️ Veuillez remplir tous les champs',
    toast_welcome: (name) => `🎉 Bienvenue ${name} ! Compte créé avec succès`,
    toast_login: (name) => `👋 Content de vous revoir ${name} !`,
    toast_social: (p, name) => `✅ Connecté avec ${p} : ${name}`,
    toast_forgot: '📧 Lien de récupération envoyé à votre email',
    course_enroll: '⚡ S\'inscrire',
    course_later: 'Plus tard',
    course_instructor: 'Formateur',
    course_content: 'Contenu du cours',
    course_sessions: 'Types de sessions disponibles',
  }
};
SS.T = () => SS.t[SS.state.lang];

/* ──────────────────────────────────────────────────────────
   3.  TOAST
   ────────────────────────────────────────────────────────── */
SS.toast = function(msg, type = 'success', dur = 3500) {
  let el = document.getElementById('ss-toast');
  if (!el) {
    el = document.createElement('div');
    el.id = 'ss-toast';
    el.style.cssText = `
      position:fixed;bottom:2rem;left:50%;transform:translate(-50%,20px);
      z-index:9999;display:none;align-items:center;gap:.75rem;
      background:#222a3d;border:1px solid rgba(107,216,203,.3);
      color:#dae2fd;padding:.75rem 1.5rem;border-radius:9999px;
      font-family:'Cairo',sans-serif;font-size:.875rem;
      box-shadow:0 20px 40px rgba(0,0,0,.4);
      transition:opacity .3s,transform .3s;
    `;
    document.body.appendChild(el);
  }
  el.innerHTML = `<span class="material-symbols-outlined" style="font-size:1.1rem;color:#6bd8cb">check_circle</span><span>${msg}</span>`;
  el.style.display = 'flex';
  setTimeout(() => { el.style.opacity='1'; el.style.transform='translate(-50%,0)'; }, 10);
  clearTimeout(el._t);
  el._t = setTimeout(() => {
    el.style.opacity='0'; el.style.transform='translate(-50%,12px)';
    setTimeout(() => { el.style.display='none'; el.style.opacity=''; el.style.transform=''; }, 350);
  }, dur);
};

/* ──────────────────────────────────────────────────────────
   4.  AUTH HELPERS
   ────────────────────────────────────────────────────────── */
SS.saveUser = function(user) {
  SS.state.user = user;
  localStorage.setItem('ss_user', JSON.stringify(user));
  SS.updateNavAuth();
};

SS.logout = async function() {
  try {
    if (window.FB && FB.auth) {
      await FB.signOut(FB.auth);
    }
  } catch (error) {
    console.error("Logout error:", error);
  }

  SS.state.user = null;
  localStorage.removeItem('ss_user');
  SS.updateNavAuth();

  SS.toast(
    SS.state.lang === 'ar'
      ? 'تم تسجيل الخروج بنجاح'
      : 'Déconnexion réussie'
  );

  setTimeout(() => {
    window.location.href = 'index.html';
  }, 600);
};

SS.updateNavAuth = function() {
  const user = SS.state.user;
  const joinBtn = document.getElementById('ss-nav-join');
  const accountBtn = document.getElementById('ss-nav-account');
  const accountBtnText = document.getElementById('ss-nav-account-text');
  if (!joinBtn) return;
  if (user) {
    joinBtn.style.display = 'none';
    if (accountBtn) {
      accountBtn.style.display = '';
      const initials = (user.fname ? user.fname[0] : user.email[0]).toUpperCase();
      if (accountBtnText) accountBtnText.textContent = user.fname || user.email;
      const av = document.getElementById('ss-nav-avatar');
      if (av) av.textContent = initials;
    }
  } else {
    joinBtn.style.display = '';
    if (accountBtn) accountBtn.style.display = 'none';
  }
};

/* ──────────────────────────────────────────────────────────
   5.  HEADER BUILDER (call after DOM ready on every page)
   ────────────────────────────────────────────────────────── */
SS.buildHeader = function(activePage) {
  const nav = document.getElementById('ss-header');
  if (!nav) return;
  const T = SS.T();
  const lang = SS.state.lang;
  const isAr = lang === 'ar';

  /* ── الصفحات الست — تُعرض في الوسط ── */
  const pages = [
    { id: 'ai',       label: 'AI Tutor',  href: 'ai.html' },
    { id: 'pricing',  label: 'Pricing',   href: 'pricing.html' },
    { id: 'partners', label: 'Partners',  href: 'partners.html' },
    { id: 'courses',  label: 'Courses',   href: 'courses.html' },
    { id: 'home',     label: 'Home',      href: 'index.html' },
    { id: 'account',  label: isAr ? 'حسابي' : 'Mon compte', href: 'account.html' },
  ];

  const links = pages.map(p => `
    <a href="${p.href}" class="ss-nav-lnk${activePage === p.id ? ' ss-nav-lnk--active' : ''}">${p.label}</a>
  `).join('');

  /* زر اللغة */
  const langBtn = `
    <button class="ss-lang-btn" onclick="SS.setLang('${isAr ? 'fr' : 'ar'}')">
      ${isAr ? 'FR' : 'عربي'}
    </button>`;

  nav.innerHTML = `
    <div class="ss-nb">
      <!-- Logo يسار -->
      <a href="index.html" class="ss-nb__brand">SKILL SWAP</a>

      <!-- روابط وسط -->
      <div class="ss-nb__links" id="ss-desktop-links">${links}</div>

      <!-- يمين: زر اللغة + My Account -->
      <div class="ss-nb__right">
        ${langBtn}
        <a href="account.html" class="ss-nb__account${activePage === 'account' ? ' ss-nb__account--active' : ''}">
          ${isAr ? 'حسابي' : 'My Account'}
        </a>
        <!-- همبرغر موبايل -->
        <button class="ss-nb__burger" id="ss-hamburger" aria-label="Menu">&#9776;</button>
      </div>
    </div>

    <!-- Mobile drawer -->
    <div id="ss-mobile-menu" class="mobile-drawer hidden">
      <div class="mobile-overlay" id="ss-mobile-overlay"></div>
      <div class="mobile-panel slide-in">
        <div class="mobile-panel-header">
          <span class="ss-nb__brand" style="font-size:1.1rem">SKILL SWAP</span>
          <button class="mobile-close" id="ss-mobile-close">
            <span class="material-symbols-outlined">close</span>
          </button>
        </div>
        <!-- زر اللغة في الموبايل -->
        <button class="ss-lang-btn" style="align-self:flex-end;margin-bottom:.5rem" onclick="SS.setLang('${isAr ? 'fr' : 'ar'}');SS.closeMobileMenu()">
          ${isAr ? 'FR' : 'عربي'}
        </button>
        <nav class="mobile-nav">
          ${pages.map(p=>`<a href="${p.href}" class="mobile-nav-link${activePage===p.id?' mobile-nav-active':''}">${p.label}</a>`).join('')}
        </nav>
      </div>
    </div>
  `;

  document.getElementById('ss-hamburger')?.addEventListener('click', SS.openMobileMenu);
  document.getElementById('ss-mobile-close')?.addEventListener('click', SS.closeMobileMenu);
  document.getElementById('ss-mobile-overlay')?.addEventListener('click', SS.closeMobileMenu);
};

SS.openMobileMenu = function() {
  const m = document.getElementById('ss-mobile-menu');
  if (m) { m.classList.remove('hidden'); document.body.style.overflow = 'hidden'; }
};
SS.closeMobileMenu = function() {
  const m = document.getElementById('ss-mobile-menu');
  if (m) { m.classList.add('hidden'); document.body.style.overflow = ''; }
};

/* ──────────────────────────────────────────────────────────
   6.  LANGUAGE SWITCH
   ────────────────────────────────────────────────────────── */
SS.setLang = function(lang) {
  SS.state.lang = lang;
  localStorage.setItem('ss_lang', lang);
  document.documentElement.setAttribute('lang', lang);
  document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
  // Re-build header with current active page
  const active = document.querySelector('[data-page]')?.dataset.page || '';
  SS.buildHeader(active);
  // Re-render page-specific content if function exists
  if (typeof SS.onLangChange === 'function') SS.onLangChange(lang);
  // Rebuild reg modal if open
  if (document.getElementById('ss-reg-modal')?.classList.contains('modal-open')) {
    SS.buildRegModal();
  }
};

/* ──────────────────────────────────────────────────────────
   7.  REGISTRATION MODAL
   ────────────────────────────────────────────────────────── */
SS.openRegModal = function() {
  SS.buildRegModal();
  const modal = document.getElementById('ss-reg-modal');
  if (modal) {
    modal.classList.add('modal-open');
    document.body.style.overflow = 'hidden';
  }
};

SS.closeRegModal = function() {
  const modal = document.getElementById('ss-reg-modal');
  if (modal) {
    modal.classList.remove('modal-open');
    document.body.style.overflow = '';
  }
};

SS.buildRegModal = function() {
  let modal = document.getElementById('ss-reg-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'ss-reg-modal';
    document.body.appendChild(modal);
  }
  const T = SS.T();
  const isAr = SS.state.lang === 'ar';

  modal.innerHTML = `
    <div class="modal-backdrop" id="ss-reg-backdrop"></div>
    <div class="modal-box reg-modal-box" role="dialog" aria-modal="true">
      <!-- Decorative bar -->
      <div class="modal-color-bar"></div>
      <!-- Close -->
      <button class="modal-close-btn" id="ss-reg-close" aria-label="Close">
        <span class="material-symbols-outlined">close</span>
      </button>
      <!-- Logo -->
      <div class="reg-logo">
        <div class="reg-logo-icon">SS</div>
        <h2 class="reg-title">${T.reg_title}</h2>
        <p class="reg-subtitle">${T.reg_subtitle}</p>
      </div>
      <!-- Tabs -->
      <div class="reg-tabs" role="tablist">
        <button class="reg-tab reg-tab-active" id="ss-tab-signup" role="tab" onclick="SS._switchTab('signup')">${T.tab_signup}</button>
        <button class="reg-tab" id="ss-tab-login" role="tab" onclick="SS._switchTab('login')">${T.tab_login}</button>
      </div>
      <!-- Social -->
      <div class="reg-social">
        <button class="social-btn" onclick="SS._socialAuth('Google')">
          <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
          ${T.social_google}
        </button>
        <button class="social-btn" onclick="SS._socialAuth('Facebook')">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="#1877F2" aria-hidden="true"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
          ${T.social_fb}
        </button>
      </div>
      <div class="reg-divider"><span>${T.divider}</span></div>
      <!-- SIGNUP FORM -->
      <form id="ss-form-signup" class="reg-form" novalidate>
        <div class="form-row">
          <input class="form-input" type="text" id="ss-fname" placeholder="${T.ph_fname}" autocomplete="given-name" />
          <input class="form-input" type="text" id="ss-lname" placeholder="${T.ph_lname}" autocomplete="family-name" />
        </div>
        <input class="form-input" type="email" id="ss-email" placeholder="${T.ph_email}" autocomplete="email" />
        <div class="form-input-wrap">
          <input class="form-input" type="password" id="ss-password" placeholder="${T.ph_password}" autocomplete="new-password" />
          <button type="button" class="toggle-pwd" onclick="SS._togglePwd('ss-password',this)">
            <span class="material-symbols-outlined">visibility</span>
          </button>
        </div>
        <select class="form-input form-select" id="ss-skill">
          <option value="" disabled selected>${T.lbl_skill}</option>
          <option value="dev">${T.skill_dev}</option>
          <option value="design">${T.skill_design}</option>
          <option value="mkt">${T.skill_mkt}</option>
          <option value="lang">${T.skill_lang}</option>
          <option value="biz">${T.skill_biz}</option>
          <option value="ai">${T.skill_ai}</option>
        </select>
        <label class="form-check">
          <input type="checkbox" id="ss-terms" class="form-checkbox" />
          <span>${T.lbl_terms}</span>
        </label>
        <button type="submit" class="btn-submit" id="ss-btn-signup">${T.btn_signup}</button>
      </form>
      <!-- LOGIN FORM -->
      <form id="ss-form-login" class="reg-form hidden" novalidate>
        <input class="form-input" type="email" id="ss-login-email" placeholder="${T.ph_email}" autocomplete="email" />
        <div class="form-input-wrap">
          <input class="form-input" type="password" id="ss-login-password" placeholder="${T.ph_password_login}" autocomplete="current-password" />
          <button type="button" class="toggle-pwd" onclick="SS._togglePwd('ss-login-password',this)">
            <span class="material-symbols-outlined">visibility</span>
          </button>
        </div>
        <div class="forgot-row">
          <button type="button" class="forgot-btn" onclick="SS._forgotPassword()">${T.forgot}</button>
        </div>
        <button type="submit" class="btn-submit" id="ss-btn-login">${T.btn_login}</button>
      </form>
    </div>
  `;

  // Events
  document.getElementById('ss-reg-backdrop').addEventListener('click', SS.closeRegModal);
  document.getElementById('ss-reg-close').addEventListener('click', SS.closeRegModal);
  document.getElementById('ss-form-signup').addEventListener('submit', SS._handleSignup);
  document.getElementById('ss-form-login').addEventListener('submit', SS._handleLogin);
  document.addEventListener('keydown', function esc(e) {
    if (e.key === 'Escape') { SS.closeRegModal(); document.removeEventListener('keydown', esc); }
  });
};

SS._switchTab = function(tab) {
  const signup = document.getElementById('ss-form-signup');
  const login = document.getElementById('ss-form-login');
  const tabS = document.getElementById('ss-tab-signup');
  const tabL = document.getElementById('ss-tab-login');
  if (tab === 'signup') {
    signup?.classList.remove('hidden'); login?.classList.add('hidden');
    tabS?.classList.add('reg-tab-active'); tabL?.classList.remove('reg-tab-active');
  } else {
    login?.classList.remove('hidden'); signup?.classList.add('hidden');
    tabL?.classList.add('reg-tab-active'); tabS?.classList.remove('reg-tab-active');
  }
};

SS._togglePwd = function(id, btn) {
  const inp = document.getElementById(id);
  if (!inp) return;
  const isHidden = inp.type === 'password';
  inp.type = isHidden ? 'text' : 'password';
  const icon = btn.querySelector('.material-symbols-outlined');
  if (icon) icon.textContent = isHidden ? 'visibility_off' : 'visibility';
};

SS._handleSignup = async function(e) {
  e.preventDefault();

  const T = SS.T();

  const fname = document.getElementById('ss-fname')?.value.trim();
  const lname = document.getElementById('ss-lname')?.value.trim();
  const email = document.getElementById('ss-email')?.value.trim();
  const password = document.getElementById('ss-password')?.value;
  const skill = document.getElementById('ss-skill')?.value;
  const terms = document.getElementById('ss-terms')?.checked;

  if (!fname || !lname) return SS.toast(T.err_name, 'error');
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return SS.toast(T.err_email, 'error');
  if (!password || password.length < 8) return SS.toast(T.err_pass, 'error');
  if (!terms) return SS.toast(T.err_terms, 'error');

  if (!window.FB) {
    console.error("Firebase is not loaded yet.");
    return SS.toast("Firebase n'est pas encore chargé", "error");
  }

  const btn = document.getElementById('ss-btn-signup');
  btn.disabled = true;
  btn.textContent = '...';

  try {
    const cred = await FB.createUserWithEmailAndPassword(FB.auth, email, password);
    const user = cred.user;

    const userProfile = {
      uid: user.uid,
      fname: fname,
      lname: lname,
      name: fname + " " + lname,
      email: email,
      skill: skill,
      provider: "email",
      city: "",
      bio: "",
      offersAr: skill || "",
      wantsAr: "",
      rating: 0,
      createdAt: FB.serverTimestamp()
    };

    await FB.setDoc(FB.doc(FB.db, "users", user.uid), userProfile);

    SS.saveUser(userProfile);
    SS.closeRegModal();
    SS.toast(T.toast_welcome(fname));

  } catch (error) {
    console.error("Signup error:", error);

    let message = "Erreur lors de la création du compte.";

    if (error.code === "auth/email-already-in-use") {
      message = "Cet email est déjà utilisé.";
    } else if (error.code === "auth/weak-password") {
      message = "Le mot de passe est trop faible.";
    } else if (error.code === "auth/invalid-email") {
      message = "Email invalide.";
    }

    SS.toast(message, "error");

  } finally {
    btn.disabled = false;
    btn.textContent = T.btn_signup;
  }
};

SS._handleLogin = async function(e) {
  e.preventDefault();

  const T = SS.T();
  const email = document.getElementById('ss-login-email')?.value.trim();
  const password = document.getElementById('ss-login-password')?.value;

  if (!email || !password) return SS.toast(T.err_fields, 'error');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return SS.toast(T.err_email, 'error');

  if (!window.FB) {
    console.error("Firebase is not loaded yet.");
    return SS.toast("Firebase n'est pas encore chargé", "error");
  }

  const btn = document.getElementById('ss-btn-login');
  btn.disabled = true;
  btn.textContent = '...';

  try {
    const cred = await FB.signInWithEmailAndPassword(FB.auth, email, password);
    const user = cred.user;

    const userRef = FB.doc(FB.db, "users", user.uid);
    const userSnap = await FB.getDoc(userRef);

    let userProfile;

    if (userSnap.exists()) {
      userProfile = userSnap.data();
    } else {
      // Sécurité : si le compte existe dans Authentication mais pas encore dans Firestore
      const name = email.split('@')[0];

      userProfile = {
        uid: user.uid,
        fname: name,
        lname: "",
        name: name,
        email: email,
        provider: "email",
        city: "",
        bio: "",
        offersAr: "",
        wantsAr: "",
        rating: 0,
        createdAt: FB.serverTimestamp()
      };

      await FB.setDoc(userRef, userProfile);
    }

    SS.saveUser(userProfile);
    SS.closeRegModal();

    const displayName = userProfile.fname || userProfile.name || email.split('@')[0];
    SS.toast(T.toast_login(displayName));

  } catch (error) {
    console.error("Login error:", error);

    let message = "Erreur lors de la connexion.";

    if (error.code === "auth/invalid-credential") {
      message = "Email ou mot de passe incorrect.";
    } else if (error.code === "auth/user-not-found") {
      message = "Aucun compte trouvé avec cet email.";
    } else if (error.code === "auth/wrong-password") {
      message = "Mot de passe incorrect.";
    } else if (error.code === "auth/invalid-email") {
      message = "Email invalide.";
    }

    SS.toast(message, "error");

  } finally {
    btn.disabled = false;
    btn.textContent = T.btn_login;
  }
};

SS._socialAuth = async function(provider) {
  const T = SS.T();

  if (!window.FB) {
    console.error("Firebase is not loaded yet.");
    return SS.toast("Firebase n'est pas encore chargé", "error");
  }

  if (provider !== "Google") {
    return SS.toast("Facebook login n'est pas encore activé.", "error");
  }

  try {
    const googleProvider = new FB.GoogleAuthProvider();

    const cred = await FB.signInWithPopup(FB.auth, googleProvider);
    const user = cred.user;

    const userRef = FB.doc(FB.db, "users", user.uid);
    const userSnap = await FB.getDoc(userRef);

    let userProfile;

    if (userSnap.exists()) {
      userProfile = userSnap.data();
    } else {
      const displayName = user.displayName || user.email.split("@")[0];
      const parts = displayName.split(" ");

      userProfile = {
        uid: user.uid,
        fname: parts[0] || displayName,
        lname: parts.slice(1).join(" ") || "",
        name: displayName,
        email: user.email,
        photoURL: user.photoURL || "",
        provider: "google",
        city: "",
        bio: "",
        skill: "",
        offersAr: "",
        offersFr: "",
        wantsAr: "",
        wantsFr: "",
        rating: 0,
        createdAt: FB.serverTimestamp()
      };

      await FB.setDoc(userRef, userProfile);
    }

    SS.saveUser(userProfile);
    SS.closeRegModal();

    const displayName =
      userProfile.fname ||
      userProfile.name ||
      user.email.split("@")[0];

    SS.toast(T.toast_social("Google", displayName));

  } catch (error) {
    console.error("Google login error:", error);

    let message = "Erreur lors de la connexion avec Google.";

    if (error.code === "auth/popup-closed-by-user") {
      message = "Connexion Google annulée.";
    } else if (error.code === "auth/unauthorized-domain") {
      message = "Domaine non autorisé dans Firebase Authentication.";
    } else if (error.code === "auth/popup-blocked") {
      message = "Le navigateur a bloqué la fenêtre Google.";
    }

    SS.toast(message, "error");
  }
};

SS._forgotPassword = function() {
  SS.toast(SS.T().toast_forgot);
};

/* ──────────────────────────────────────────────────────────
   8.  COURSE DETAIL MODAL
   ────────────────────────────────────────────────────────── */
SS.openCourseModal = function(courseData) {
  const T = SS.T();
  let modal = document.getElementById('ss-course-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'ss-course-modal';
    document.body.appendChild(modal);
  }
  const c = courseData;
  const selectedSessions = c.sessions || [];
  modal.innerHTML = `
    <div class="modal-backdrop" id="ss-course-backdrop"></div>
    <div class="modal-box course-modal-box">
      <button class="modal-close-btn course-modal-close" id="ss-course-close">
        <span class="material-symbols-outlined">close</span>
      </button>
      <!-- Header -->
      <div class="course-modal-header" style="background:${c.headerBg || 'linear-gradient(135deg,#2b5876,#4e4376)'}">
        <span class="course-modal-emoji">${c.emoji || '💻'}</span>
      </div>
      <!-- Body -->
      <div class="course-modal-body">
        <div class="course-modal-meta-row">
          <h2 class="course-modal-title">${c.title}</h2>
          <span class="course-modal-category">${c.category || ''}</span>
        </div>
        <!-- Stats row -->
        <div class="course-modal-stats">
          <span><span class="material-symbols-outlined" style="font-size:1rem">schedule</span> ${c.hours}</span>
          <span><span class="material-symbols-outlined" style="font-size:1rem">group</span> ${c.students}</span>
          <span><span class="material-symbols-outlined" style="font-size:1rem;color:#ffb690;font-variation-settings:'FILL' 1">star</span> ${c.rating} / 5</span>
          <span class="course-level-badge">${c.level}</span>
        </div>
        <p class="course-modal-desc">${c.description}</p>
        <!-- Instructor -->
        <div class="course-instructor-box">
          <div class="course-instructor-avatar">${c.instructorInitial || 'م'}</div>
          <div class="course-instructor-info">
            <div class="course-instructor-name">${c.instructorName}</div>
            <div class="course-instructor-title" style="color:#ffb690;font-size:.75rem;font-weight:700">${c.instructorTitle}</div>
            <div class="course-instructor-bio">${c.instructorBio}</div>
          </div>
          <div class="course-instructor-icon-wrap">
            <span class="material-symbols-outlined" style="color:#6bd8cb">person</span>
          </div>
        </div>
        <!-- Curriculum -->
        <div class="course-section">
          <h3 class="course-section-title">
            <span class="material-symbols-outlined" style="color:#6bd8cb;font-size:1.1rem">format_list_bulleted</span>
            ${T.course_content}
          </h3>
          <div class="course-curriculum">
            ${(c.curriculum || []).map(item => `
              <div class="curriculum-item">
                <span class="material-symbols-outlined" style="color:#6bd8cb;font-size:1.1rem;font-variation-settings:'FILL' 1">check_circle</span>
                <span>${item}</span>
              </div>
            `).join('')}
          </div>
        </div>
        <!-- Session Types -->
        <div class="course-section">
          <h3 class="course-section-title">
            <span class="material-symbols-outlined" style="color:#6bd8cb;font-size:1.1rem">event_available</span>
            ${T.course_sessions}
          </h3>
          <div class="course-sessions-grid" id="ss-sessions-grid">
            ${selectedSessions.map((s, i) => `
              <div class="session-card ${i===0?'session-card-selected':''}" data-idx="${i}" onclick="SS._selectSession(${i})">
                <div class="session-icon">${s.icon}</div>
                <div class="session-name">${s.name}</div>
                <div class="session-price">${s.price}</div>
                <div class="session-desc">${s.desc}</div>
              </div>
            `).join('')}
          </div>
        </div>
        <!-- Actions -->
        <div class="course-modal-actions">
          <button class="course-btn-enroll" onclick="SS._enrollCourse('${c.title}')">
            <span class="material-symbols-outlined" style="font-size:1rem">bolt</span>
            ${T.course_enroll}
          </button>
          <button class="course-btn-later" id="ss-course-close-btn">${T.course_later}</button>
        </div>
      </div>
    </div>
  `;
  modal.classList.add('modal-open');
  document.body.style.overflow = 'hidden';
  document.getElementById('ss-course-backdrop').addEventListener('click', SS.closeCourseModal);
  document.getElementById('ss-course-close').addEventListener('click', SS.closeCourseModal);
  document.getElementById('ss-course-close-btn').addEventListener('click', SS.closeCourseModal);
};

SS._selectSession = function(idx) {
  document.querySelectorAll('.session-card').forEach((c, i) => {
    c.classList.toggle('session-card-selected', i === idx);
  });
};

SS._enrollCourse = function(title) {
  if (!SS.state.user) {
    SS.closeCourseModal();
    SS.openRegModal();
    return;
  }
  SS.closeCourseModal();
  const msg = SS.state.lang === 'ar'
    ? `✅ تم التسجيل في "${title}" بنجاح!`
    : `✅ Inscrit à "${title}" avec succès !`;
  SS.toast(msg);
};

SS.closeCourseModal = function() {
  const modal = document.getElementById('ss-course-modal');
  if (modal) { modal.classList.remove('modal-open'); document.body.style.overflow = ''; }
};

/* ──────────────────────────────────────────────────────────
   9.  AI AGENT — AMIN
   ────────────────────────────────────────────────────────── */
SS.AI = {
  history: [],
  loading: false,
  msgCount: 0,

  systemPrompt: () => SS.state.lang === 'ar' ? `أنت "أمين" — المساعد الذكي لمنصة Skill Swap الجزائرية.
هويتك: مرشد تعليمي ودود ومحترف، تتحدث بالعربية الفصحى مع لمسة جزائرية دافئة.
تخصصك: المسارات المهنية الجزائرية، البرمجة، التصميم، التسويق الرقمي، ريادة الأعمال، اللغات.
المنصة: Skill Swap تقدم دورات في Python، Figma/UI Design، English، Digital Marketing، Excel/PowerBI، AI Prompting، Mobile Design، French Business، Entrepreneurship.
أسلوبك: مباشر ومفيد، تنظّم الإجابات بنقاط وأمثلة من الواقع الجزائري، تشجع المتعلم دائماً.
قاعدة: أجب دائماً بالعربية، لا تتجاوز 350 كلمة لكل رد.` :
`Tu es "Amin" — l'assistant IA de la plateforme Skill Swap algérienne.
Identité: guide éducatif amical et professionnel, tu parles en français avec une touche algérienne chaleureuse.
Spécialité: parcours professionnels algériens, programmation, design, marketing digital, entrepreneuriat, langues.
Plateforme: Skill Swap propose des cours en Python, Figma/UI Design, Anglais, Marketing Digital, Excel/PowerBI, IA Prompting, Design Mobile, Français des affaires, Entrepreneuriat.
Style: direct et utile, organises les réponses avec des points et des exemples concrets du marché algérien.
Règle: réponds toujours en français, pas plus de 300 mots par réponse.`,

  send: async function(userText) {
    if (!userText.trim() || SS.AI.loading) return;
    SS.AI.loading = true;

    // Add user message to UI
    SS.AI.appendMessage('user', userText);
    SS.AI.history.push({ role: 'user', content: userText });

    // Clear input
    const inp = document.getElementById('ss-chat-input');
    if (inp) { inp.value = ''; inp.style.height = 'auto'; }

    // Disable send
    const sendBtn = document.getElementById('ss-send-btn');
    if (sendBtn) { sendBtn.disabled = true; sendBtn.style.opacity = '0.5'; }

    // Typing indicator
    SS.AI.showTyping();

    SS.AI.msgCount++;
    const counter = document.getElementById('ss-msg-count');
    if (counter) counter.textContent = SS.AI.msgCount;

    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          system: SS.AI.systemPrompt(),
          messages: SS.AI.history
        })
      });
      const data = await response.json();
      if (data.error) throw new Error(data.error.message || 'API Error');
      const text = data.content?.map(b => b.type === 'text' ? b.text : '').join('') || '...';
      SS.AI.history.push({ role: 'assistant', content: text });
      SS.AI.removeTyping();
      SS.AI.appendMessage('ai', text);
    } catch (err) {
      SS.AI.removeTyping();
      const errMsg = SS.state.lang === 'ar'
        ? `عذراً، حدث خطأ في الاتصال 😅\n\n**${err.message}**\n\nتأكد من الاتصال بالإنترنت وحاول مرة أخرى.`
        : `Désolé, une erreur s'est produite 😅\n\n**${err.message}**\n\nVérifiez votre connexion et réessayez.`;
      SS.AI.appendMessage('ai', errMsg);
    } finally {
      SS.AI.loading = false;
      if (sendBtn) { sendBtn.disabled = false; sendBtn.style.opacity = '1'; }
    }
  },

  appendMessage: function(role, text) {
    const area = document.getElementById('ss-chat-messages');
    if (!area) return;
    const time = new Date().toLocaleTimeString(SS.state.lang === 'ar' ? 'ar-DZ' : 'fr-FR', { hour: '2-digit', minute: '2-digit' });
    const formatted = SS.AI.formatText(text);
    const isAI = role === 'ai';
    const el = document.createElement('div');
    el.className = isAI ? 'chat-msg chat-msg-ai' : 'chat-msg chat-msg-user';
    el.innerHTML = isAI ? `
      <div class="chat-avatar-ai">
        <span class="material-symbols-outlined" style="font-variation-settings:'FILL' 1;font-size:1rem">smart_toy</span>
      </div>
      <div class="chat-bubble-wrap">
        <div class="chat-bubble chat-bubble-ai">${formatted}</div>
        <span class="chat-time">${time}</span>
      </div>
    ` : `
      <div class="chat-bubble-wrap chat-bubble-wrap-user">
        <div class="chat-bubble chat-bubble-user">${SS.AI.escHtml(text)}</div>
        <span class="chat-time chat-time-user">${time}</span>
      </div>
      <div class="chat-avatar-user">
        <span class="material-symbols-outlined" style="font-size:.875rem">person</span>
      </div>
    `;
    area.appendChild(el);
    area.scrollTop = area.scrollHeight;
  },

  showTyping: function() {
    const area = document.getElementById('ss-chat-messages');
    if (!area) return;
    const el = document.createElement('div');
    el.id = 'ss-typing';
    el.className = 'chat-msg chat-msg-ai';
    el.innerHTML = `
      <div class="chat-avatar-ai">
        <span class="material-symbols-outlined" style="font-variation-settings:'FILL' 1;font-size:1rem">smart_toy</span>
      </div>
      <div class="chat-bubble chat-bubble-ai chat-typing">
        <span class="typing-dot"></span><span class="typing-dot"></span><span class="typing-dot"></span>
      </div>
    `;
    area.appendChild(el);
    area.scrollTop = area.scrollHeight;
  },

  removeTyping: function() {
    document.getElementById('ss-typing')?.remove();
  },

  formatText: function(text) {
    return SS.AI.escHtml(text)
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/^[-•] (.+)/gm, '<li>$1</li>')
      .replace(/\n\n/g, '<br><br>')
      .replace(/\n/g, '<br>');
  },

  escHtml: function(t) {
    return String(t)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  },

  reset: function() {
    SS.AI.history = [];
    SS.AI.msgCount = 0;
    const area = document.getElementById('ss-chat-messages');
    if (area) area.innerHTML = '';
    const counter = document.getElementById('ss-msg-count');
    if (counter) counter.textContent = '0';
  }
};

/* ──────────────────────────────────────────────────────────
   10.  INIT (call on DOMContentLoaded)
   ────────────────────────────────────────────────────────── */
SS.init = function(activePage) {
  // Apply saved language
  document.documentElement.setAttribute('lang', SS.state.lang);
  document.documentElement.setAttribute('dir', SS.state.lang === 'ar' ? 'rtl' : 'ltr');
  SS.buildHeader(activePage);
};
