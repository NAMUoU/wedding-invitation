/**
 * ============================================
 * СВАДЕБНОЕ ПРИГЛАШЕНИЕ — JAVASCRIPT
 * Хакматулло и Нозияхон • 25 июля
 * ============================================
 */

(function () {
  'use strict';

  // ===== ЭЛЕМЕНТЫ DOM =====
  const envelopeContainer = document.getElementById('envelopeContainer');
  const envelopeCover = document.getElementById('envelopeCover');
  const envelopeFlap = document.getElementById('envelopeFlap');
  const invitationText = document.getElementById('invitationText');
  const scrollDownBtn = document.getElementById('scrollDownBtn');
  const hintText = document.getElementById('hintText');
  const musicToggle = document.getElementById('musicToggle');
  const musicSuggestion = document.getElementById('musicSuggestion');
  const weddingAudio = document.getElementById('weddingAudio');

  let isEnvelopeOpen = false;
  let isMusicPlaying = false;

  // ===== 1. МУЗЫКА =====
  function toggleMusic() {
    if (!isMusicPlaying) {
      const playPromise = weddingAudio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            isMusicPlaying = true;
            musicToggle.classList.add('playing');
            musicSuggestion.classList.remove('visible');
          })
          .catch(() => {
            console.warn('Музыка не запустилась. Проверьте файл: assets/music/wedding-music.mp3');
            isMusicPlaying = true;
            musicToggle.classList.add('playing');
            musicSuggestion.classList.remove('visible');
          });
      }
    } else {
      weddingAudio.pause();
      isMusicPlaying = false;
      musicToggle.classList.remove('playing');
    }
  }

  musicToggle.addEventListener('click', toggleMusic);

  setTimeout(() => {
    if (!isMusicPlaying) musicSuggestion.classList.add('visible');
  }, 2000);

  document.addEventListener('click', function (event) {
    if (
      musicSuggestion.classList.contains('visible') &&
      event.target !== musicToggle &&
      !musicToggle.contains(event.target)
    ) {
      musicSuggestion.classList.remove('visible');
    }
  });

  // ===== 2. АНИМАЦИЯ КОНВЕРТА =====
  function openEnvelope() {
    if (isEnvelopeOpen) return;
    isEnvelopeOpen = true;

    envelopeContainer.classList.add('opened');
    hintText.style.opacity = '0';

    // Шаг 1: клапан открывается
    setTimeout(() => {
      envelopeFlap.classList.add('open');
    }, 200);

    // Шаг 2: обложка исчезает
    setTimeout(() => {
      envelopeCover.classList.add('hidden');
    }, 700);

    // Шаг 3: текст появляется
    setTimeout(() => {
      invitationText.classList.add('visible');
      scrollDownBtn.classList.add('visible');
    }, 1200);
  }

  envelopeContainer.addEventListener('click', openEnvelope);

  // ===== 3. КНОПКА "ЛИСТАТЬ ДАЛЬШЕ" =====
  scrollDownBtn.addEventListener('click', function (event) {
    event.stopPropagation();
    const programSection = document.getElementById('program');
    if (programSection) {
      programSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });

  // ===== 4. АНИМАЦИЯ КАРТОЧЕК =====
  const timelineItems = document.querySelectorAll('.timeline-item[data-animate]');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2, rootMargin: '0px 0px -40px 0px' }
  );
  timelineItems.forEach((item) => observer.observe(item));

  // ===== 5. ПАРАЛЛАКС =====
  const floralElements = document.querySelectorAll('.floral-decoration');
  const petals = document.querySelectorAll('.petal');
  const rings = document.querySelectorAll('.decorative-ring');

  const allParallax = [...floralElements, ...petals, ...rings];

  window.addEventListener('mousemove', function (event) {
    if (window.innerWidth <= 480) return;
    const mouseX = (event.clientX / window.innerWidth - 0.5) * 15;
    const mouseY = (event.clientY / window.innerHeight - 0.5) * 15;
    allParallax.forEach((element, index) => {
      const speed = 0.3 + index * 0.15;
      element.style.transform = `translate(${mouseX * speed}px, ${mouseY * speed}px)`;
    });
  });

  window.addEventListener('scroll', function () {
    if (window.innerWidth > 480) return;
    const scrollY = window.pageYOffset;
    allParallax.forEach((element, index) => {
      const speed = 0.02 + index * 0.015;
      element.style.transform = `translateY(${scrollY * speed}px)`;
    });
  });

})();