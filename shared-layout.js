(function () {
  const pages = {
    'worldcup2022.html': 'overview',
    'groups.html': 'groups',
    'bracket.html': 'bracket',
    'teams.html': 'teams',
    'stats.html': 'stats'
  };

  const currentPage = pages[window.location.pathname.split('/').pop()] || 'overview';

  const navItems = [
    { label: 'Overview', href: 'worldcup2022.html', key: 'overview' },
    { label: 'Groups', href: 'groups.html', key: 'groups' },
    { label: 'Bracket', href: 'bracket.html', key: 'bracket' },
    { label: 'Teams', href: 'teams.html', key: 'teams' },
    { label: 'Stats & Awards', href: 'stats.html', key: 'stats' }
  ];

  const headerMarkup = `
    <div class="brand">
      <span class="brand-mark">22</span>
      <span class="brand-text">QATAR<em>2022</em></span>
    </div>
    <nav class="tabs" role="tablist" aria-label="Tournament sections">
      ${navItems.map(item => `
        <a class="tab-btn${item.key === currentPage ? ' active' : ''}" href="${item.href}">${item.label}</a>
      `).join('')}
    </nav>`;

  const footerMarkup = `
    <p>Results, standings and awards sourced from FIFA and Wikipedia &middot; flags via flagcdn.com &middot; <a href="https://www.instagram.com/sl.crusader/" target="_blank" rel="noopener noreferrer">Follow me on Instagram</a>.</p>`;

  const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function initReveal() {
    const revealEls = document.querySelectorAll('.reveal');
    if (!revealEls.length) return;

    if (prefersReducedMotion) {
      revealEls.forEach(el => el.classList.add('in-view'));
      return;
    }

    // stagger siblings within the same parent so grids ripple in rather than popping at once
    const groups = new Map();
    revealEls.forEach(el => {
      const key = el.parentElement;
      const list = groups.get(key) || [];
      list.push(el);
      groups.set(key, list);
    });
    groups.forEach(list => {
      list.forEach((el, i) => { el.style.transitionDelay = Math.min(i, 8) * 0.06 + 's'; });
    });

    if (!('IntersectionObserver' in window)) {
      revealEls.forEach(el => el.classList.add('in-view'));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(el => io.observe(el));
  }

  function initCountUp() {
    const els = document.querySelectorAll('[data-countup]');
    if (!els.length) return;

    if (prefersReducedMotion) return; // leave the static value already in the markup

    function animate(el) {
      const target = el.dataset.countup;
      const suffix = target.replace(/[0-9.]/g, '');
      const isDecimal = target.includes('.');
      const numTarget = parseFloat(target);
      const duration = 1100;
      const start = performance.now();

      function tick(now) {
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        const val = numTarget * eased;
        el.textContent = (isDecimal ? val.toFixed(2) : Math.round(val)) + suffix;
        if (p < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    }

    if (!('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animate(entry.target);
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });
    els.forEach(el => io.observe(el));
  }

  function initScorerBars() {
    const bars = document.querySelectorAll('.scorer-bar[data-width]');
    if (!bars.length) return;
    if (!('IntersectionObserver' in window) || prefersReducedMotion) {
      bars.forEach(b => { b.style.width = b.dataset.width + '%'; });
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.width = entry.target.dataset.width + '%';
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    bars.forEach(b => io.observe(b));
  }

  document.addEventListener('DOMContentLoaded', () => {
    const headerTarget = document.querySelector('[data-shared-header]');
    const footerTarget = document.querySelector('[data-shared-footer]');

    if (headerTarget) {
      headerTarget.innerHTML = headerMarkup;
    }

    if (footerTarget) {
      footerTarget.innerHTML = footerMarkup;
    }

    initReveal();
    initCountUp();
    initScorerBars();
  });
})();
