(() => {
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];

  document.getElementById('year').textContent = new Date().getFullYear();


  // Gift cards: pick ONE card. It flips (once, with confetti) and the others lock.
  const colors = ['#b5191f', '#f2b8ba', '#06312e', '#ffffff', '#e8a33d'];
  const gifts = $$('.gift'), hint = document.getElementById('giftHint');
  gifts.forEach(g => g.addEventListener('click', () => {
    if (gifts.some(x => x.classList.contains('open'))) return;
    g.classList.add('open');
    g.setAttribute('aria-expanded', 'true');
    gifts.forEach(x => { if (x !== g) { x.classList.add('locked'); x.disabled = true; } });
    if (hint) hint.textContent = 'Your gift is unlocked! The other cards are now locked 🔒';
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    for (let i = 0; i < 26; i++) {
      const c = document.createElement('i'), a = Math.random() * Math.PI * 2, d = 70 + Math.random() * 110;
      c.className = 'confetti';
      c.style.cssText = `--x:${Math.cos(a) * d}px;--y:${Math.sin(a) * d - 20}px;--r:${Math.random() * 720 - 360}deg;background:${colors[i % colors.length]}`;
      g.appendChild(c);
      setTimeout(() => c.remove(), 1000);
    }
  }));

  // Proposal form pop-up: every "get proposal / discuss" button opens the form in a modal
  const FORM_URL = 'https://ainacrm.ainatech.in/f/dbf7d218573d';
  const modal = document.getElementById('formModal'), frame = document.getElementById('formFrame');
  if (modal && modal.showModal) {
    const close = () => { modal.close(); };
    modal.addEventListener('close', () => { frame.src = 'about:blank'; document.documentElement.classList.remove('modal-open'); });
    document.getElementById('formClose').addEventListener('click', close);
    modal.addEventListener('click', e => { if (e.target === modal) close(); });
    $$('a[href="#contact"], a.btn--light[href*="dbf7d218573d"]').forEach(a => a.addEventListener('click', e => {
      e.preventDefault();
      frame.src = FORM_URL;
      document.documentElement.classList.add('modal-open');
      modal.showModal();
    }));
  }

  // Sticky nav border once scrolled
  const nav = document.getElementById('nav');
  const onScroll = () => nav.classList.toggle('scrolled', scrollY > 10);
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Reveal on scroll
  const items = $$('.reveal, .rise');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    }), { threshold: 0.12, rootMargin: '0px 0px -5% 0px' });
    items.forEach(el => io.observe(el));
  } else {
    items.forEach(el => el.classList.add('in'));
  }
})();
