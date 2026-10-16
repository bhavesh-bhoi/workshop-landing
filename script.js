(() => {
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];

  document.getElementById('year').textContent = new Date().getFullYear();


  // Gift cards: flip on tap, with a confetti burst
  const colors = ['#b5191f', '#f2b8ba', '#06312e', '#ffffff', '#e8a33d'];
  $$('.gift').forEach(g => g.addEventListener('click', () => {
    const open = g.classList.toggle('open');
    g.setAttribute('aria-expanded', open);
    if (!open || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    for (let i = 0; i < 26; i++) {
      const c = document.createElement('i'), a = Math.random() * Math.PI * 2, d = 70 + Math.random() * 110;
      c.className = 'confetti';
      c.style.cssText = `--x:${Math.cos(a) * d}px;--y:${Math.sin(a) * d - 20}px;--r:${Math.random() * 720 - 360}deg;background:${colors[i % colors.length]}`;
      g.appendChild(c);
      setTimeout(() => c.remove(), 1000);
    }
  }));

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
