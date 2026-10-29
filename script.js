// Année du footer
document.getElementById('year').textContent = new Date().getFullYear();

// Thème clair / sombre (mémorisé)
const root = document.documentElement;
try { const t = localStorage.getItem('theme'); if (t) root.dataset.theme = t; } catch (e) {}
document.getElementById('theme').addEventListener('click', () => {
  const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
  root.dataset.theme = next;
  try { localStorage.setItem('theme', next); } catch (e) {}
});

// Effet machine à écrire
const roles = ['étudiant en informatique', 'développeur web junior', 'futur ingénieur'];
const typed = document.getElementById('typed');
let r = 0, c = 0, del = false;
(function type() {
  const word = roles[r];
  typed.textContent = word.slice(0, c);
  if (!del && c === word.length) { del = true; return setTimeout(type, 1400); }
  if (del && c === 0) { del = false; r = (r + 1) % roles.length; }
  c += del ? -1 : 1;
  setTimeout(type, del ? 40 : 80);
})();

// Apparition des sections + barres de compétences
document.querySelectorAll('.section').forEach(s => s.classList.add('reveal'));
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.classList.add('in');
    e.target.querySelectorAll('.skill').forEach(s => {
      s.querySelector('i').style.width = s.dataset.level + '%';
    });
    io.unobserve(e.target);
  });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// Filtre des projets
document.querySelectorAll('.chip').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelector('.chip.active').classList.remove('active');
    btn.classList.add('active');
    document.querySelectorAll('.card').forEach(card => {
      card.classList.toggle('hide', btn.dataset.f !== 'all' && card.dataset.cat !== btn.dataset.f);
    });
  });
});

// Formulaire : ouvre le client mail (remplace l'adresse par la tienne)
const EMAIL = 'ton.email@exemple.com';
document.getElementById('form').addEventListener('submit', e => {
  e.preventDefault();
  const f = new FormData(e.target);
  const body = `${f.get('message')}\n\n— ${f.get('nom')} (${f.get('email')})`;
  location.href = `mailto:${EMAIL}?subject=${encodeURIComponent('Contact depuis ton portfolio')}&body=${encodeURIComponent(body)}`;
  document.getElementById('status').textContent = 'Votre application mail va s’ouvrir.';
});