// Call'em site: scroll reveal, mobile nav, TOC highlight, demo start. No dependencies.
(function () {
  // Reveal on scroll
  var rv = document.querySelectorAll('.rv');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    rv.forEach(function (el) { io.observe(el); });
  } else { rv.forEach(function (el) { el.classList.add('in'); }); }

  // Start the hero animation only when visible (saves battery, keeps the loop in sync with the viewer)
  var demo = document.querySelector('.demo');
  if (demo && 'IntersectionObserver' in window) {
    new IntersectionObserver(function (es, o) { es.forEach(function (e) { if (e.isIntersecting) { demo.classList.add('anim'); o.disconnect(); } }); }, { threshold: 0.3 }).observe(demo);
  } else if (demo) demo.classList.add('anim');

  // Mobile nav
  var burger = document.querySelector('.burger'), links = document.querySelector('.nav-links');
  if (burger && links) {
    burger.addEventListener('click', function () { var o = links.classList.toggle('open'); burger.classList.toggle('open', o); burger.setAttribute('aria-expanded', o); });
    links.addEventListener('click', function (e) { if (e.target.tagName === 'A') { links.classList.remove('open'); burger.classList.remove('open'); } });
  }

  // TOC highlight on doc pages
  var toc = document.querySelectorAll('.toc a[href^="#"]');
  if (toc.length && 'IntersectionObserver' in window) {
    var map = {};
    toc.forEach(function (a) { var t = document.getElementById(a.getAttribute('href').slice(1)); if (t) map[t.id] = a; });
    var current = null;
    var tio = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { if (current) current.classList.remove('active'); current = map[e.target.id]; if (current) current.classList.add('active'); } });
    }, { rootMargin: '-20% 0px -70% 0px' });
    Object.keys(map).forEach(function (id) { tio.observe(document.getElementById(id)); });
  }

  // Mark current nav link
  var here = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links > a').forEach(function (a) { if (a.getAttribute('href') === here) a.classList.add('active'); });
})();
