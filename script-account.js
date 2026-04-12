/* ===== SKILL SWAP - ACCOUNT PAGE SCRIPT ===== */

document.addEventListener('DOMContentLoaded', () => {
    SS.init('account');
});

// ── Edit Modal ────────────────────────────────────────────────
function openEditModal() {
    const modal = document.getElementById('edit-modal');
    modal.classList.remove('hidden');
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeEditModal() {
    const modal = document.getElementById('edit-modal');
    modal.classList.remove('open');
    modal.classList.add('hidden');
    document.body.style.overflow = '';
}

function saveProfile() {
    const name = document.getElementById('edit-name')?.value;
    const city = document.getElementById('edit-city')?.value;
    const bio  = document.getElementById('edit-bio')?.value;

    if (name) document.getElementById('profile-name').textContent = name;
    if (city) document.getElementById('profile-city').textContent = city;
    if (bio)  document.getElementById('profile-bio').textContent  = bio;

    closeEditModal();
    showToast('✅ تم حفظ التغييرات بنجاح!');
}

document.getElementById('edit-modal-backdrop')?.addEventListener('click', closeEditModal);
window.openEditModal  = openEditModal;
window.closeEditModal = closeEditModal;
window.saveProfile    = saveProfile;

// ── Share Profile ─────────────────────────────────────────────
function shareProfile() {
    if (navigator.share) {
        navigator.share({
            title: 'ياسين بن علي - SkillSwap',
            text:  'مطور واجهات ومصمم تجربة مستخدم على منصة SkillSwap',
            url:   window.location.href
        }).catch(() => {});
    } else {
        navigator.clipboard?.writeText(window.location.href);
        showToast('🔗 تم نسخ رابط الملف الشخصي!');
    }
}
window.shareProfile = shareProfile;

// ── Badge Click ────────────────────────────────────────────────
function showBadge(name, emoji) {
    showToast(`${emoji} وسام "${name}" مكتسب! أنت تتقدم بشكل رائع.`);
}
window.showBadge = showBadge;

// ── Progress Bars Animation ─────────────────────────────────────
const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const bar   = entry.target;
            const width = bar.getAttribute('data-width');
            setTimeout(() => { bar.style.width = width + '%'; }, 200);
            progressObserver.unobserve(bar);
        }
    });
}, { threshold: 0.3 });

document.querySelectorAll('.progress-bar').forEach(bar => progressObserver.observe(bar));

// ── Toast ─────────────────────────────────────────────────────
function showToast(msg = 'تم بنجاح!', duration = 3500) {
    const toast    = document.getElementById('toast');
    const toastMsg = document.getElementById('toast-msg');
    if (!toast) return;
    toastMsg.textContent = msg;
    toast.classList.remove('hidden');
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.classList.add('hidden'), 300);
    }, duration);
}

// ── Escape closes modal ───────────────────────────────────────
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeEditModal();
});
