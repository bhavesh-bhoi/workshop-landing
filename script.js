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

  // Count-up numbers when the portfolio scrolls into view
  const fmt = n => n.toLocaleString('en-IN');
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    io.unobserve(e.target);
    const el = e.target, end = +el.dataset.count, suf = el.dataset.suffix || '', t0 = performance.now();
    const tick = t => {
      const p = Math.min((t - t0) / 1400, 1);
      el.textContent = fmt(Math.round(end * (1 - Math.pow(1 - p, 3)))) + suf;
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }), { threshold: 0.6 });
  $$('[data-count]').forEach(el => io.observe(el));
})();
