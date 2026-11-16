document.querySelectorAll('.js-whatsapp').forEach(function (link) {
  link.addEventListener('click', function () {
    var location = link.getAttribute('data-wa-track') || 'unknown';
    if (typeof gtag === 'function') {
      gtag('event', 'click_whatsapp', { link_location: location });
    }
  });
});

(function () {
  var GA_ID = 'G-LX1XKQNXHE';
  var STORAGE_KEY = 'era-cookie-consent';

  function loadAnalytics() {
    var script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', GA_ID);
  }

  var consent;
  try {
    consent = localStorage.getItem(STORAGE_KEY);
  } catch (e) {
    consent = null;
  }

  if (consent === 'accepted') {
    loadAnalytics();
    return;
  }

  if (consent === 'declined') {
    return;
  }

  var banner = document.getElementById('cookie-banner');
  if (!banner) return;
  banner.hidden = false;

  // keeps the floating WhatsApp button above the banner while it is visible
  function syncBannerHeight() {
    var h = banner.hidden ? 0 : banner.offsetHeight;
    document.documentElement.style.setProperty('--cookie-h', h + 'px');
  }
  syncBannerHeight();
  window.addEventListener('resize', syncBannerHeight);

  var acceptBtn = document.getElementById('cookie-accept');
  var declineBtn = document.getElementById('cookie-decline');

  acceptBtn.addEventListener('click', function () {
    try { localStorage.setItem(STORAGE_KEY, 'accepted'); } catch (e) {}
    banner.hidden = true;
    syncBannerHeight();
    loadAnalytics();
  });

  declineBtn.addEventListener('click', function () {
    try { localStorage.setItem(STORAGE_KEY, 'declined'); } catch (e) {}
    banner.hidden = true;
    syncBannerHeight();
  });
})();
