/* ==========================================================================
   LQM Mississauga — Main JavaScript
   Handles: smooth scroll, accordion (classes + resources), nav active state,
            mobile hamburger menu, dynamic class rendering
   ========================================================================== */

(function () {
  'use strict';

  /* -------------------------------------------------------------------------
     Hamburger / Mobile Nav
  -------------------------------------------------------------------------- */
  const hamburger = document.getElementById('nav-hamburger');
  const navLinks  = document.getElementById('nav-links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function () {
      const isOpen = navLinks.classList.toggle('open');
      hamburger.classList.toggle('open', isOpen);
      hamburger.setAttribute('aria-expanded', isOpen);
    });

    // Close nav when a link is clicked (mobile)
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', false);
      });
    });
  }

  /* -------------------------------------------------------------------------
     Contact Form — reCAPTCHA v2 + honeypot + timing spam protection
  -------------------------------------------------------------------------- */
  var contactForm = document.getElementById('contact-form');
  if (contactForm) {
    var formLoadTime = Date.now();

    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      // Honeypot check — bots fill this hidden field, humans don't see it
      var honeypot = contactForm.querySelector('#hp-website');
      if (honeypot && honeypot.value.trim() !== '') return;

      // Timing check — reject submissions under 3 seconds
      if (Date.now() - formLoadTime < 3000) return;

      // TODO: wire to Netlify Forms or email service before going live
      var btn = document.getElementById('contact-submit');
      btn.textContent = 'Message Sent!';
      btn.disabled = true;
      contactForm.reset();
      if (typeof grecaptcha !== 'undefined') grecaptcha.reset();
      document.getElementById('contact-submit').disabled = true;
    });
  }

  /* -------------------------------------------------------------------------
     Tabs — Madinah Book Resources (Book 1 / Book 2 / Book 3)
  -------------------------------------------------------------------------- */
  const tabNav = document.querySelector('.tab-nav[role="tablist"]');

  if (tabNav) {
    tabNav.addEventListener('click', function (e) {
      const btn = e.target.closest('.tab-btn');
      if (!btn) return;

      const tabId = btn.dataset.tab;

      // Update tab buttons
      tabNav.querySelectorAll('.tab-btn').forEach(function (b) {
        const isActive = b === btn;
        b.classList.toggle('active', isActive);
        b.setAttribute('aria-selected', isActive);
      });

      // Show matching panel, hide others
      document.querySelectorAll('.tab-panel').forEach(function (panel) {
        panel.classList.toggle('active', panel.id === 'tab-' + tabId);
      });
    });
  }

  /* -------------------------------------------------------------------------
     Nav Active State on Scroll
     Highlights the nav link corresponding to the section currently in view.
  -------------------------------------------------------------------------- */
  const sections   = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('#nav-links a[href^="#"]');

  function onScroll() {
    const scrollY = window.scrollY + 80; // offset for fixed nav height

    let currentId = '';
    sections.forEach(function (section) {
      if (scrollY >= section.offsetTop) {
        currentId = section.id;
      }
    });

    navAnchors.forEach(function (a) {
      a.classList.toggle('active', a.getAttribute('href') === '#' + currentId);
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run once on load

})();

/* ============================================================
   DOMContentLoaded — Classes rendering + all accordion setup
============================================================ */
document.addEventListener('DOMContentLoaded', function () {

  /* -----------------------------------------------------------------------
     Render Classes — builds cards from classes.js data array
  ----------------------------------------------------------------------- */
  var list = document.getElementById('classes-list');

  if (list && typeof classes !== 'undefined') {
    list.innerHTML = classes.map(function (cls) {

      // Build prerequisites + regulations section
      var prereqsHTML =
        '<div class="class-prereqs">' +
          '<span class="class-detail-label">Prerequisites</span>' +
          '<ul class="class-prereq-list">' +
            cls.prerequisite.map(function (p) { return '<li>' + p + '</li>'; }).join('') +
          '</ul>' +
          (cls.regulationsUrl
            ? '<a href="' + cls.regulationsUrl + '" target="_blank" rel="noopener noreferrer" class="class-regulations-link">View Class Regulations \u2192</a>'
            : '') +
        '</div>';

      // Build info row: video left + prereqs right (or prereqs full-width if no video)
      var infoRowHTML;
      if (cls.videoId) {
        infoRowHTML =
          '<div class="class-info-row">' +
            '<div class="class-video-wrap">' +
              '<div class="class-video" data-video-id="' + cls.videoId + '">' +
                '<img ' +
                  'src="https://img.youtube.com/vi/' + cls.videoId + '/maxresdefault.jpg" ' +
                  'onerror="this.src=\'https://img.youtube.com/vi/' + cls.videoId + '/hqdefault.jpg\'" ' +
                  'alt="' + cls.code + ' class introduction" ' +
                  'class="class-video-thumb" />' +
                '<button class="class-video-play" type="button" aria-label="Play video">' +
                  '<svg viewBox="0 0 68 48" width="68" height="48" aria-hidden="true">' +
                    '<path d="M66.52 7.74c-.78-2.93-2.49-5.41-5.42-6.19C55.79.13 34 0 34 0S12.21.13 6.9 1.55c-2.93.78-4.63 3.26-5.42 6.19C.06 13.05 0 24 0 24s.06 10.95 1.48 16.26c.78 2.93 2.49 5.41 5.42 6.19C12.21 47.87 34 48 34 48s21.79-.13 27.1-1.55c2.93-.78 4.64-3.26 5.42-6.19C67.94 34.95 68 24 68 24s-.06-10.95-1.48-16.26z" fill="#C0392B"/>' +
                    '<path d="M45 24 27 14v20" fill="#fff"/>' +
                  '</svg>' +
                '</button>' +
              '</div>' +
            '</div>' +
            prereqsHTML +
          '</div>';
      } else {
        infoRowHTML = prereqsHTML;
      }

      // Zoom notice — online classes with open registration only
      var zoomNoticeHTML = cls.format === 'Online' && cls.status === 'active'
        ? '<p class="class-zoom-notice">' +
            '<strong>Zoom required.</strong> You must have a Zoom account to register and attend. ' +
            '<a href="https://zoom.us/signup" target="_blank" rel="noopener noreferrer">Sign up free at zoom.us</a> if you don\u2019t have one.' +
          '</p>'
        : '';

      // Build the action button based on status
      var buttonHTML;
      if (cls.status === 'active' && cls.registrationUrl) {
        buttonHTML =
          '<a href="' + cls.registrationUrl + '" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-register">' +
          'Register for ' + cls.code + '</a>';
      } else if (cls.status === 'waitlist') {
        buttonHTML =
          '<a href="#contact" class="btn btn-status-closed btn-register">Fill Out the Contact Form to Join the Waitlist</a>';
      } else if (cls.status === 'coming-soon') {
        buttonHTML =
          '<span class="btn btn-status-coming-soon btn-register">Coming Soon</span>';
      } else {
        buttonHTML =
          '<span class="btn btn-status-closed btn-register">Registration Closed</span>';
      }

      return (
        '<div class="accordion-item" data-slug="' + cls.slug + '">' +
          '<button class="accordion-trigger" aria-expanded="false" aria-controls="cls-' + cls.slug + '-body">' +
            '<span class="class-summary">' +
              '<span class="class-code">' + cls.code + '</span>' +
              ' \u2014 ' + cls.level + ' \u2014 ' + cls.format + ' \u2014 ' + cls.schedule +
            '</span>' +
            '<span class="class-toggle-icon" aria-hidden="true">+</span>' +
          '</button>' +
          '<div class="accordion-body" id="cls-' + cls.slug + '-body" role="region" aria-label="' + cls.code + ' details">' +
            '<div class="class-detail-grid">' +
              '<div class="class-detail-item">' +
                '<span class="class-detail-label">Instructor</span>' +
                '<span class="class-detail-value">' + cls.instructor + '</span>' +
              '</div>' +
              '<div class="class-detail-item">' +
                '<span class="class-detail-label">Schedule</span>' +
                '<span class="class-detail-value">' + cls.scheduleDetail + '</span>' +
              '</div>' +
              '<div class="class-detail-item">' +
                '<span class="class-detail-label">Comments</span>' +
                '<span class="class-detail-value">' + cls.comments + '</span>' +
              '</div>' +
            '</div>' +
            infoRowHTML +
            zoomNoticeHTML +
            buttonHTML +
          '</div>' +
        '</div>'
      );
    }).join('');
  }

  /* -----------------------------------------------------------------------
     Classes Accordion — one card open at a time
  ----------------------------------------------------------------------- */
  if (list) {
    list.addEventListener('click', function (e) {
      var trigger = e.target.closest('.accordion-trigger');
      if (!trigger) return;

      var item   = trigger.closest('.accordion-item');
      var isOpen = item.classList.contains('open');

      // Close all
      list.querySelectorAll('.accordion-item').forEach(function (el) {
        el.classList.remove('open');
        el.querySelector('.accordion-trigger').setAttribute('aria-expanded', false);
        el.querySelector('.class-toggle-icon').textContent = '+';
      });

      // Open clicked (unless it was already open)
      if (!isOpen) {
        item.classList.add('open');
        trigger.setAttribute('aria-expanded', true);
        trigger.querySelector('.class-toggle-icon').textContent = '\u2212'; // minus sign
        // Scroll so the top of the newly opened card is visible below the fixed nav
        setTimeout(function () {
          var navHeight = document.getElementById('site-nav').offsetHeight || 70;
          var top = item.getBoundingClientRect().top + window.scrollY - navHeight - 12;
          window.scrollTo({ top: top, behavior: 'smooth' });
        }, 50);
      }
    });
  }

  /* -----------------------------------------------------------------------
     YouTube facade — swap thumbnail for real iframe on click
  ----------------------------------------------------------------------- */
  document.addEventListener('click', function (e) {
    var facade = e.target.closest('.class-video[data-video-id]');
    if (!facade) return;
    var videoId = facade.dataset.videoId;
    facade.removeAttribute('data-video-id'); // prevent double-fire
    facade.innerHTML =
      '<iframe src="https://www.youtube.com/embed/' + videoId + '?autoplay=1" ' +
      'title="Class introduction video" frameborder="0" ' +
      'allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" ' +
      'allowfullscreen></iframe>';
  });

  /* -----------------------------------------------------------------------
     Auto-open accordion from URL param  ?open=<slug>
     Used by Netlify redirects from old WordPress registration URLs.
     e.g. lqmississauga.com/alfalah26reg/ → /?open=al-falah-26#classes
  ----------------------------------------------------------------------- */
  if (list) {
    var params  = new URLSearchParams(window.location.search);
    var openSlug = params.get('open');
    if (openSlug) {
      var targetItem = list.querySelector('[data-slug="' + openSlug + '"]');
      if (targetItem) {
        targetItem.classList.add('open');
        var trigger = targetItem.querySelector('.accordion-trigger');
        if (trigger) trigger.setAttribute('aria-expanded', true);
        var icon = targetItem.querySelector('.class-toggle-icon');
        if (icon) icon.textContent = '\u2212';
        setTimeout(function () {
          targetItem.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 150);
      }
    }
  }

  /* -----------------------------------------------------------------------
     Resource Accordion — independent per-section collapse/expand
  ----------------------------------------------------------------------- */
  var allHeaders = document.querySelectorAll('.accordion-header');

  allHeaders.forEach(function (header, index) {
    header.addEventListener('click', function () {
      var targetId = this.getAttribute('data-target');
      var content  = document.getElementById(targetId);
      var chevron  = this.querySelector('.accordion-chevron');

      if (content.style.maxHeight && content.style.maxHeight !== '0px') {
        content.style.maxHeight = '0px';
        content.style.overflow  = 'hidden';
        if (chevron) chevron.textContent = '+';
      } else {
        content.style.maxHeight = '5000px';
        if (chevron) chevron.textContent = '\u2212'; // minus sign
      }
    });

    // Only open the first section (Madinah Book Resources) by default
    var targetId = header.getAttribute('data-target');
    var content  = document.getElementById(targetId);
    if (content) {
      if (index === 0) {
        content.style.maxHeight = '5000px';
        var chevron = header.querySelector('.accordion-chevron');
        if (chevron) chevron.textContent = '\u2212';
      } else {
        content.style.maxHeight = '0px';
        content.style.overflow  = 'hidden';
      }
    }
  });

});

/* ============================================================
   reCAPTCHA v2 callbacks (must be global, not inside IIFE)
   Called by data-callback / data-expired-callback on the widget
============================================================ */
function onRecaptchaSuccess() {
  var btn = document.getElementById('contact-submit');
  if (btn) btn.disabled = false;
}

function onRecaptchaExpired() {
  var btn = document.getElementById('contact-submit');
  if (btn) btn.disabled = true;
}
