/* ===== SKILL SWAP - ACCOUNT PAGE SCRIPT WITH FIREBASE ===== */

let currentFirebaseUser = null;
let currentUserProfile = null;

document.addEventListener('DOMContentLoaded', () => {
  SS.init('account');

  if (!window.FB) {
    console.error("Firebase is not loaded.");
    showToast("Firebase n'est pas chargé.");
    return;
  }

  FB.onAuthStateChanged(FB.auth, async (user) => {
    if (!user) {
      showToast("Veuillez vous connecter pour voir votre compte.");
      setTimeout(() => {
        SS.openRegModal();
      }, 700);
      return;
    }

    currentFirebaseUser = user;
    await loadUserProfile(user.uid);
  });
});

// ── Load user profile from Firestore ──────────────────────────
async function loadUserProfile(uid) {
  try {
    const userRef = FB.doc(FB.db, "users", uid);
    const userSnap = await FB.getDoc(userRef);

    if (!userSnap.exists()) {
      showToast("Profil introuvable dans Firestore.");
      return;
    }

    currentUserProfile = userSnap.data();

    renderProfile(currentUserProfile);
    fillEditForm(currentUserProfile);

    console.warn("Account profile loaded:", currentUserProfile);

  } catch (error) {
    console.error("Error loading profile:", error);
    showToast("Erreur lors du chargement du profil.");
  }
}

// ── Render profile in account page ────────────────────────────
function renderProfile(profile) {
  const fullName =
    profile.name ||
    [profile.fname, profile.lname].filter(Boolean).join(" ") ||
    "Utilisateur";

  setText("profile-name", fullName);
  setText("profile-city", profile.city || "غير محدد");
  setText("profile-bio", profile.bio || "لم يتم إضافة وصف بعد.");

  // Optional fields, only if these IDs exist in account.html
  setText("profile-email", profile.email || "");
  setText("profile-skill", profile.skill || profile.offersAr || "");
  setText("profile-offers", profile.offersAr || profile.skill || "لم يحدد المهارة بعد");
  setText("profile-wants", profile.wantsAr || "لم يحدد بعد ما يريد تعلمه");

  const avatar = document.getElementById("profile-avatar");
  if (avatar) {
    if (profile.photoURL || profile.img) {
      avatar.src = profile.photoURL || profile.img;
    } else {
      avatar.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(fullName)}&background=222a3d&color=6bd8cb&size=128`;
    }
  }
}

// ── Fill edit modal fields ────────────────────────────────────
function fillEditForm(profile) {
  const fullName =
    profile.name ||
    [profile.fname, profile.lname].filter(Boolean).join(" ") ||
    "";

  setValue("edit-name", fullName);
  setValue("edit-city", profile.city || "");
  setValue("edit-bio", profile.bio || "");

  // Optional fields, only if they exist in account.html
  setValue("edit-skill", profile.skill || profile.offersAr || "");
  setValue("edit-wants", profile.wantsAr || "");
}

// ── Helpers ───────────────────────────────────────────────────
function setText(id, value) {
  const el = document.getElementById(id);
  if (el) el.textContent = value;
}

function setValue(id, value) {
  const el = document.getElementById(id);
  if (el) el.value = value;
}

// ── Edit Modal ────────────────────────────────────────────────
function openEditModal() {
  if (currentUserProfile) {
    fillEditForm(currentUserProfile);
  }

  const modal = document.getElementById('edit-modal');
  if (!modal) return;

  modal.classList.remove('hidden');
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeEditModal() {
  const modal = document.getElementById('edit-modal');
  if (!modal) return;

  modal.classList.remove('open');
  modal.classList.add('hidden');
  document.body.style.overflow = '';
}

// ── Save profile to Firestore ─────────────────────────────────
async function saveProfile() {
  if (!currentFirebaseUser) {
    showToast("Veuillez vous connecter d'abord.");
    return;
  }

  const name = document.getElementById('edit-name')?.value.trim();
  const city = document.getElementById('edit-city')?.value.trim();
  const bio  = document.getElementById('edit-bio')?.value.trim();

  const skill = document.getElementById('edit-skill')?.value.trim();
  const wants = document.getElementById('edit-wants')?.value.trim();

  if (!name) {
    showToast("Le nom est obligatoire.");
    return;
  }

  const parts = name.split(" ");
  const fname = parts[0] || "";
  const lname = parts.slice(1).join(" ") || "";

  const updatedProfile = {
    ...currentUserProfile,
    uid: currentFirebaseUser.uid,
    name: name,
    fname: fname,
    lname: lname,
    city: city || "",
    bio: bio || "",
    updatedAt: FB.serverTimestamp()
  };

  if (skill !== undefined) {
    updatedProfile.skill = skill;
    updatedProfile.offersAr = skill;
    updatedProfile.offersFr = skill;
  }

  if (wants !== undefined) {
    updatedProfile.wantsAr = wants;
    updatedProfile.wantsFr = wants;
  }

  try {
    const userRef = FB.doc(FB.db, "users", currentFirebaseUser.uid);
    await FB.setDoc(userRef, updatedProfile, { merge: true });

    currentUserProfile = updatedProfile;

    SS.saveUser(updatedProfile);
    renderProfile(updatedProfile);
    fillEditForm(updatedProfile);

    closeEditModal();
    showToast('✅ تم حفظ التغييرات بنجاح!');

    console.warn("Profile updated successfully:", updatedProfile);

  } catch (error) {
    console.error("Error saving profile:", error);
    showToast("Erreur lors de l'enregistrement du profil.");
  }
}

document.getElementById('edit-modal-backdrop')?.addEventListener('click', closeEditModal);

window.openEditModal  = openEditModal;
window.closeEditModal = closeEditModal;
window.saveProfile    = saveProfile;

// ── Share Profile ─────────────────────────────────────────────
function shareProfile() {
  const name = currentUserProfile?.name || "SkillSwap Profile";
  const bio = currentUserProfile?.bio || "Profil utilisateur sur SkillSwap";

  if (navigator.share) {
    navigator.share({
      title: name + ' - SkillSwap',
      text: bio,
      url: window.location.href
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

// ── Progress Bars Animation ────────────────────────────────────
const progressObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const bar = entry.target;
      const width = bar.getAttribute('data-width');
      setTimeout(() => {
        bar.style.width = width + '%';
      }, 200);
      progressObserver.unobserve(bar);
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.progress-bar').forEach(bar => progressObserver.observe(bar));

// ── Toast ─────────────────────────────────────────────────────
function showToast(msg = 'تم بنجاح!', duration = 3500) {
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toast-msg');

  if (!toast || !toastMsg) {
    if (window.SS && SS.toast) SS.toast(msg);
    else alert(msg);
    return;
  }

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