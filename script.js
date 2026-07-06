/**
 * СВАДЕБНОЕ ПРИГЛАШЕНИЕ — JavaScript
 * Ҳикматулло и Нозияхон • 25 июля 2026
 */

(function () {
  'use strict';

  const heroNames = document.getElementById('heroNames');
  const heroSealWrapper = document.getElementById('heroSealWrapper');
  const heroSubtitle = document.getElementById('heroSubtitle');
  const invitationPaper = document.getElementById('invitationPaper');
  const scrollDownBtn = document.getElementById('scrollDownBtn');
  const musicToggle = document.getElementById('musicToggle');
  const musicSuggestion = document.getElementById('musicSuggestion');
  const weddingAudio = document.getElementById('weddingAudio');
  const countdownDays = document.getElementById('countdown-days');
  const countdownHours = document.getElementById('countdown-hours');
  const countdownMinutes = document.getElementById('countdown-minutes');
  const countdownSeconds = document.getElementById('countdown-seconds');

  let isSealClicked = false;
  let isMusicPlaying = false;

  function toggleMusic() {
    if (!isMusicPlaying) {
      weddingAudio.play().then(() => {
        isMusicPlaying = true;
        musicToggle.classList.add('playing');
        musicSuggestion.classList.remove('visible');
      }).catch(() => {
        isMusicPlaying = true;
        musicToggle.classList.add('playing');
        musicSuggestion.classList.remove('visible');
      });
    } else {
      weddingAudio.pause();
      isMusicPlaying = false;
      musicToggle.classList.remove('playing');
    }
  }
  musicToggle.addEventListener('click', toggleMusic);
  setTimeout(() => { if (!isMusicPlaying) musicSuggestion.classList.add('visible'); }, 2000);
  document.addEventListener('click', (e) => {
    if (musicSuggestion.classList.contains('visible') && e.target !== musicToggle && !musicToggle.contains(e.target))
      musicSuggestion.classList.remove('visible');
  });

  setTimeout(() => heroNames.classList.add('visible'), 300);
  setTimeout(() => heroSealWrapper.classList.add('visible'), 700);
  setTimeout(() => heroSubtitle.classList.add('visible'), 1100);

  heroSealWrapper.addEventListener('click', () => {
    if (isSealClicked) return;
    isSealClicked = true;
    heroNames.style.opacity = '0';
    heroSealWrapper.style.opacity = '0';
    heroSubtitle.style.opacity = '0';
    heroNames.style.transition = 'opacity 0.5s ease';
    heroSealWrapper.style.transition = 'opacity 0.5s ease';
    heroSubtitle.style.transition = 'opacity 0.5s ease';
    setTimeout(() => document.getElementById('invitation').scrollIntoView({ behavior: 'smooth', block: 'start' }), 400);
    setTimeout(() => invitationPaper.classList.add('visible'), 1000);
    setTimeout(() => scrollDownBtn.classList.add('visible'), 1500);
  });

  scrollDownBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    document.getElementById('photo1').scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  const weddingDate = new Date('2026-07-25T00:00:00');
  function updateCountdown() {
    const now = new Date();
    const diff = weddingDate - now;
    if (diff <= 0) {
      countdownDays.textContent = '00'; countdownHours.textContent = '00';
      countdownMinutes.textContent = '00'; countdownSeconds.textContent = '00';
      return;
    }
    countdownDays.textContent = String(Math.floor(diff / 86400000)).padStart(2, '0');
    countdownHours.textContent = String(Math.floor((diff % 86400000) / 3600000)).padStart(2, '0');
    countdownMinutes.textContent = String(Math.floor((diff % 3600000) / 60000)).padStart(2, '0');
    countdownSeconds.textContent = String(Math.floor((diff % 60000) / 1000)).padStart(2, '0');
  }
  updateCountdown();
  setInterval(updateCountdown, 1000);

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); } });
  }, { threshold: 0.2 });
  document.querySelectorAll('.timeline-item[data-animate]').forEach(item => observer.observe(item));

  const parallaxEls = document.querySelectorAll('.floral-decoration, .petal');
  window.addEventListener('mousemove', (e) => {
    if (window.innerWidth <= 480) return;
    const mx = (e.clientX / window.innerWidth - 0.5) * 10;
    const my = (e.clientY / window.innerHeight - 0.5) * 10;
    parallaxEls.forEach((el, i) => el.style.transform = `translate(${mx * (0.3 + i * 0.1)}px, ${my * (0.3 + i * 0.1)}px)`);
  });

})();