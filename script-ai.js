/* ============================================================
   script-ai.js — Amin AI Tutor: full agent + bilingual UX
   ============================================================ */

const QUICK_PROMPTS = {
  ar: [
    { label: 'أفضل المنصات للعمل الحر',       q: 'ما هي أفضل منصات العمل الحر للمبتدئين في الجزائر؟' },
    { label: 'كيف أحصل على أول عميل؟',        q: 'كيف يمكنني الحصول على أول عميل في مجال الفريلانس من الجزائر؟' },
    { label: 'شرح State Management',           q: 'اشرح لي مفهوم الـ State Management بطريقة بسيطة مع مثال عملي.' },
    { label: 'طرق الدفع الإلكتروني المتاحة',  q: 'ما هي طرق الدفع الإلكتروني المتاحة للمستقلين الجزائريين؟' },
    { label: 'خارطة طريق الـ UI/UX',           q: 'ما هي خارطة الطريق التي أتبعها لتعلم UI/UX Design من الصفر؟' },
  ],
  fr: [
    { label: 'Meilleures plateformes freelance',q: 'Quelles sont les meilleures plateformes freelance pour les débutants en Algérie ?' },
    { label: 'Comment trouver son premier client?',q: 'Comment obtenir son premier client en freelance depuis l\'Algérie ?' },
    { label: 'Expliquer State Management',      q: 'Explique-moi le concept de State Management de façon simple avec un exemple.' },
    { label: 'Paiements électroniques disponibles',q: 'Quels moyens de paiement électronique sont disponibles pour les freelances algériens ?' },
    { label: 'Roadmap UI/UX',                   q: 'Quelle roadmap suivre pour apprendre le UI/UX Design de zéro ?' },
  ]
};

const SUGGESTED_TOPICS = {
  ar: [
    { label: 'تطوير الويب في الجزائر 2024',    q: 'ما هي أفضل فرص تطوير الويب في سوق العمل الجزائري لعام 2024؟' },
    { label: 'أساسيات التصميم الجرافيكي',      q: 'ما هي أساسيات التصميم الجرافيكي التي يجب أن يتعلمها المبتدئ؟' },
    { label: 'التجارة الإلكترونية محلياً',       q: 'كيف أبدأ مشروع تجارة إلكترونية ناجح في الجزائر؟' },
  ],
  fr: [
    { label: 'Développement web Algérie 2024',  q: 'Quelles sont les meilleures opportunités de développement web en Algérie en 2024 ?' },
    { label: 'Bases du design graphique',       q: 'Quelles sont les bases du design graphique pour un débutant ?' },
    { label: 'E-commerce en Algérie',           q: 'Comment démarrer un projet e-commerce réussi en Algérie ?' },
  ]
};

const WELCOME_MSG = {
  ar: `مرحباً بك! أنا **أمين**، مرشدك الذكي على منصة Skill Swap 🇩🇿

يمكنني مساعدتك في:
- **اختيار المسار المهني** المناسب لك
- **شرح المفاهيم التقنية** بأسلوب بسيط ومحلي
- **فهم سوق العمل** الجزائري والعمل الحر
- **اقتراح الدورات** المناسبة من منصتنا

اضغط على أحد المواضيع المقترحة أو اكتب سؤالك مباشرة 💬`,

  fr: `Bienvenue ! Je suis **Amin**, ton guide intelligent sur Skill Swap 🇩🇿

Je peux t'aider à :
- **Choisir ton parcours professionnel** adapté
- **Expliquer des concepts techniques** simplement
- **Comprendre le marché** algérien et le freelance
- **Suggérer des cours** adaptés de notre plateforme

Clique sur un sujet suggéré ou écris directement ta question 💬`
};

document.addEventListener('DOMContentLoaded', () => {
  SS.init('ai');

  SS.onLangChange = (lang) => {
    applyLangAI(lang);
    renderQuickPrompts(lang);
    renderSuggestedTopics(lang);
    updateInputPlaceholder(lang);
  };

  applyLangAI(SS.state.lang);
  renderQuickPrompts(SS.state.lang);
  renderSuggestedTopics(SS.state.lang);
  updateInputPlaceholder(SS.state.lang);

  // Show welcome message
  SS.AI.appendMessage('ai', WELCOME_MSG[SS.state.lang]);

  // Send button
  const sendBtn = document.getElementById('ss-send-btn');
  const chatInput = document.getElementById('ss-chat-input');

  sendBtn?.addEventListener('click', () => sendMsg());
  chatInput?.addEventListener('keydown', e => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMsg(); }
  });
  chatInput?.addEventListener('input', function() {
    this.style.height = 'auto';
    this.style.height = Math.min(this.scrollHeight, 128) + 'px';
  });

  // New chat
  document.getElementById('new-chat-btn')?.addEventListener('click', () => {
    SS.AI.reset();
    SS.AI.appendMessage('ai', WELCOME_MSG[SS.state.lang]);
    SS.toast(SS.state.lang === 'ar' ? '🔄 تم بدء محادثة جديدة' : '🔄 Nouvelle conversation démarrée');
  });

  // Export
  document.getElementById('export-btn')?.addEventListener('click', exportChat);
});

function sendMsg() {
  const input = document.getElementById('ss-chat-input');
  const text = input?.value.trim();
  if (text) SS.AI.send(text);
}

function renderQuickPrompts(lang) {
  const row = document.getElementById('quick-prompts-row');
  if (!row) return;
  row.innerHTML = (QUICK_PROMPTS[lang] || QUICK_PROMPTS.ar).map(p => `
    <button class="quick-pill" onclick="SS.AI.send('${p.q.replace(/'/g, "\\'")}')">
      ${p.label}
    </button>
  `).join('');
}

function renderSuggestedTopics(lang) {
  const container = document.getElementById('suggested-topics');
  if (!container) return;
  container.innerHTML = (SUGGESTED_TOPICS[lang] || SUGGESTED_TOPICS.ar).map((t, i) => `
    <button class="topic-btn${i === 0 ? ' topic-active' : ''}" onclick="selectTopic(this,'${t.q.replace(/'/g, "\\'")}')">
      ${t.label}
    </button>
  `).join('');
}

function selectTopic(el, question) {
  document.querySelectorAll('.topic-btn').forEach(b => b.classList.remove('topic-active'));
  el.classList.add('topic-active');
  SS.AI.send(question);
}
window.selectTopic = selectTopic;

function updateInputPlaceholder(lang) {
  const input = document.getElementById('ss-chat-input');
  if (!input) return;
  input.placeholder = lang === 'ar'
    ? 'اسألني أي شيء عن المهارات أو سوق العمل...'
    : 'Pose-moi une question sur les compétences ou le marché...';
}

function applyLangAI(lang) {
  const isAr = lang === 'ar';
  document.querySelectorAll('[data-ar][data-fr]').forEach(el => {
    if (el.tagName !== 'INPUT' && el.tagName !== 'TEXTAREA') {
      el.textContent = isAr ? el.getAttribute('data-ar') : el.getAttribute('data-fr');
    }
  });
}

function exportChat() {
  const messages = document.querySelectorAll('#ss-chat-messages .chat-bubble');
  if (!messages.length) {
    SS.toast(SS.state.lang === 'ar' ? '⚠️ لا توجد رسائل للتصدير' : '⚠️ Aucun message à exporter');
    return;
  }
  let text = `Skill Swap — Amin Chat Export\n${'─'.repeat(40)}\n`;
  messages.forEach(b => {
    const role = b.classList.contains('chat-bubble-ai') ? 'أمين' : 'أنا';
    text += `\n[${role}]\n${b.textContent.trim()}\n`;
  });
  const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = 'amin-chat.txt'; a.click();
  URL.revokeObjectURL(url);
  SS.toast(SS.state.lang === 'ar' ? '📥 تم تصدير المحادثة' : '📥 Conversation exportée');
}
