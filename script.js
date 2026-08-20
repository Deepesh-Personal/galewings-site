/* Galewings. Progressive enhancement only.
   The page is fully readable and navigable with JavaScript disabled. */
(function () {
  'use strict';

  /* ---------------------------------------------------------------------
     Mobile navigation
     --------------------------------------------------------------------- */
  var toggle = document.getElementById('nav-toggle');
  var nav = document.getElementById('site-nav');

  if (toggle && nav) {
    var setOpen = function (open) {
      nav.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      document.body.style.overflow = open ? 'hidden' : '';
    };

    var isOpen = function () {
      return toggle.getAttribute('aria-expanded') === 'true';
    };

    toggle.addEventListener('click', function () {
      setOpen(!isOpen());
    });

    /* Close on link activation, so anchor jumps do not leave the panel open. */
    nav.addEventListener('click', function (event) {
      if (event.target.closest('a') && isOpen()) setOpen(false);
    });

    /* Escape closes and returns focus to the control that opened it. */
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && isOpen()) {
        setOpen(false);
        toggle.focus();
      }
    });

    /* If the viewport grows past the desktop breakpoint while the panel is
       open, drop the open state and the scroll lock along with it. */
    var desktop = window.matchMedia('(min-width: 56rem)');
    var onChange = function (event) {
      if (event.matches && isOpen()) setOpen(false);
    };
    if (desktop.addEventListener) desktop.addEventListener('change', onChange);
    else if (desktop.addListener) desktop.addListener(onChange);
  }

  /* ---------------------------------------------------------------------
     Scroll reveal. Skipped entirely when the user prefers reduced motion
     or when IntersectionObserver is unavailable.
     --------------------------------------------------------------------- */
  var wantsMotion = window.matchMedia('(prefers-reduced-motion: no-preference)').matches;

  if (wantsMotion && 'IntersectionObserver' in window) {
    var targets = document.querySelectorAll(
      '.hero-copy, .hero-figure, .panel, .stack-list, .diagram-figure, ' +
      '.section-outcome, .claim, .capability, .card, .mail-link, .contact-links'
    );

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });

    targets.forEach(function (el) {
      el.classList.add('reveal');
      observer.observe(el);
    });
  }
})();
