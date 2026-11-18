const cover = document.getElementById('cover');
const openButton = document.getElementById('openButton');
const mainContent = document.getElementById('mainContent');
const heroTitle = document.getElementById('hero-title');
const music = document.getElementById('backgroundMusic');
const musicToggle = document.getElementById('musicToggle');
const musicPanel = document.getElementById('musicPanel');
const musicPanelClose = document.getElementById('musicPanelClose');
const musicPlaylist = document.getElementById('musicPlaylist');
const musicTracks = document.querySelectorAll('.music-track');
const musicNowPlayingTitle = document.getElementById('musicNowPlayingTitle');
const musicNowPlayingArtist = document.getElementById('musicNowPlayingArtist');
const scrollProgress = document.getElementById('scrollProgress');
const toast = document.getElementById('toast');
const rsvpForm = document.getElementById('rsvpForm');
const countdownElements = {
  days: document.getElementById('days'),
  hours: document.getElementById('hours'),
  minutes: document.getElementById('minutes'),
  seconds: document.getElementById('seconds')
};
const countdownMessage = document.getElementById('countdownMessage');
const heroMedia = document.querySelector('[data-parallax]');
const heroParticles = document.querySelector('.hero__particles');
const eventDate = new Date('2026-12-12T09:00:00+07:00').getTime();

const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxCaption = document.getElementById('lightboxCaption');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxPrev = document.getElementById('lightboxPrev');
const lightboxNext = document.getElementById('lightboxNext');
const galleryItems = document.querySelectorAll('[data-lightbox]');

const giftCopyButtons = document.querySelectorAll('.gift-copy');
const calendarBtn = document.getElementById('calendarBtn');
const livestreamPlay = document.getElementById('livestreamPlay');

let toastTimer;
let addWishCard = () => {};
let wishesMarquee = document.getElementById('wishesMarquee');
let updateWishesMarquee = () => {};
let scrollTicking = false;
let revealObserver;
let revealInitialized = false;
let prefersReducedMotion = window.matchMedia
  ? window.matchMedia('(prefers-reduced-motion: reduce)')
  : { matches: false };
let targetVolume = 0.3;
let currentVolume = 0.3;
let volumeFrame = null;
let parallaxCurrent = 0;
let parallaxTarget = 0;
let parallaxRunning = false;
let lightboxCurrentIndex = 0;
let lightboxImages = [];
let currentTrackIndex = 0;
let isPlaylistOpen = false;
let countdownTimer;

function getGuestNameFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const guestName = params.get('kpd');
  const isExample = params.get('contoh');

  if (guestName) {
    return guestName.trim();
  }

  if (isExample === '1' || isExample === 'true') {
    return 'Bapak/Ibu/Saudara/i';
  }

  return null;
}

function applyGuestName(name) {
  if (!name) {
    return;
  }

  document.querySelectorAll('.guest-name').forEach((element) => {
    element.textContent = name;
  });

  const invitationLead = document.querySelector('.invitation-copy .section__lead');
  if (invitationLead) {
    invitationLead.textContent = `Dengan memohon rahmat dan ridho Allah Subhanahu Wa Ta'ala, kami mengundang ${name} untuk hadir dan memberikan doa restu kepada kedua mempelai.`;
  }

  const rsvpNameInput = document.getElementById('guestName');
  if (rsvpNameInput && !rsvpNameInput.value) {
    rsvpNameInput.value = name;
  }
}

function initLightbox() {
  if (!lightbox || !lightboxImage || !lightboxCaption || !lightboxClose || !lightboxPrev || !lightboxNext) {
    return;
  }

  lightboxImages = Array.from(galleryItems).map((item) => {
    const image = item.querySelector('img');
    const caption = item.querySelector('figcaption');
    return {
      src: image?.currentSrc || image?.src || '',
      alt: image?.alt || '',
      caption: caption?.textContent || ''
    };
  }).filter((item) => item.src);

  galleryItems.forEach((item, index) => {
    const caption = item.querySelector('figcaption')?.textContent || 'Gambar';
    item.style.cursor = 'zoom-in';
    item.tabIndex = 0;
    item.setAttribute('role', 'button');
    item.setAttribute('aria-label', `Buka pratinjau: ${caption}`);
    item.addEventListener('click', () => openLightbox(index));
    item.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openLightbox(index);
      }
    });
  });

  lightboxClose.addEventListener('click', closeLightbox);
  lightboxPrev.addEventListener('click', () => navigateLightbox(-1));
  lightboxNext.addEventListener('click', () => navigateLightbox(1));

  lightbox.addEventListener('click', (event) => {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (lightbox.hidden) {
      return;
    }

    if (event.key === 'Escape') {
      closeLightbox();
    } else if (event.key === 'ArrowLeft') {
      navigateLightbox(-1);
    } else if (event.key === 'ArrowRight') {
      navigateLightbox(1);
    }
  });
}

function openLightbox(index) {
  if (!lightboxImages.length || !lightboxImages[index]) {
    return;
  }

  lightboxCurrentIndex = index;
  const item = lightboxImages[index];
  lightboxImage.src = item.src;
  lightboxImage.alt = item.alt;
  lightboxCaption.textContent = item.caption;
  lightbox.hidden = false;
  document.body.style.overflow = 'hidden';
  lightboxClose?.focus();
}

function closeLightbox() {
  if (!lightbox) {
    return;
  }

  lightbox.hidden = true;
  document.body.style.overflow = '';
  lightboxImage.src = '';
}

function navigateLightbox(direction) {
  if (!lightboxImages.length) {
    return;
  }

  lightboxCurrentIndex = (lightboxCurrentIndex + direction + lightboxImages.length) % lightboxImages.length;
  openLightbox(lightboxCurrentIndex);
}

function copyText(text) {
  if (navigator.clipboard?.writeText) {
    return navigator.clipboard.writeText(text).catch(() => copyTextFallback(text));
  }

  return copyTextFallback(text);
}

function copyTextFallback(text) {
  return new Promise((resolve, reject) => {
    const input = document.createElement('textarea');
    input.value = text;
    input.setAttribute('readonly', '');
    input.style.position = 'fixed';
    input.style.opacity = '0';
    document.body.appendChild(input);
    input.select();

    try {
      document.execCommand('copy') ? resolve() : reject(new Error('Copy failed'));
    } catch (error) {
      reject(error);
    } finally {
      input.remove();
    }
  });
}

function initGiftCopy() {
  giftCopyButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const text = button.dataset.copy;
      if (!text) {
        return;
      }

      copyText(text)
        .then(() => {
          button.classList.add('copied');
          showToast(`Disalin: ${text}`);
          window.setTimeout(() => button.classList.remove('copied'), 2000);
        })
        .catch(() => showToast('Gagal menyalin. Coba lagi.'));
    });
  });
}

function escapeIcsValue(value) {
  return value
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
    .replace(/\n/g, '\\n');
}

function initCalendarSave() {
  if (!calendarBtn) {
    return;
  }

  calendarBtn.addEventListener('click', () => {
    const eventTitle = 'Pernikahan Romeo & Juliet';
    const eventLocation = 'Grand Garden Ballroom, Jl. Merpati Indah No. 12, Jakarta Selatan';
    const eventDescription = 'Akad Nikah 09.00 WIB\nResepsi 11.30 WIB';
    const startDate = '20261212T020000Z';
    const endDate = '20261212T060000Z';
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Romeo & Juliet Wedding//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      `UID:${Date.now()}@romeojuliet.wedding`,
      `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z`,
      `DTSTART:${startDate}`,
      `DTEND:${endDate}`,
      `SUMMARY:${escapeIcsValue(eventTitle)}`,
      `LOCATION:${escapeIcsValue(eventLocation)}`,
      `DESCRIPTION:${escapeIcsValue(eventDescription)}`,
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'pernikahan-romeo-juliet.ics';
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(link.href), 0);

    calendarBtn.classList.add('added');
    const buttonLabel = calendarBtn.querySelector('span');
    if (buttonLabel) {
      buttonLabel.textContent = 'Tersimpan!';
    }
    showToast('Acara disimpan ke kalender. File .ics telah diunduh.');
    window.setTimeout(() => {
      calendarBtn.classList.remove('added');
      const label = calendarBtn.querySelector('span');
      if (label) {
        label.textContent = 'Simpan ke Kalender';
      }
    }, 3000);
  });
}

function initLivestream() {
  if (!livestreamPlay) {
    return;
  }

  livestreamPlay.addEventListener('click', () => {
    showToast('Siaran langsung akan dimulai saat acara berlangsung. Silakan klik YouTube Live atau Instagram Live.');
  });
}

function initMusicPlaylist() {
  if (!musicPanel || !musicPanelClose || !musicPlaylist || !music || !musicTracks.length) {
    return;
  }

  musicPanelClose.addEventListener('click', closeMusicPanel);

  document.addEventListener('click', (event) => {
    if (isPlaylistOpen && !musicPanel.contains(event.target) && !musicToggle?.contains(event.target)) {
      closeMusicPanel();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && isPlaylistOpen) {
      closeMusicPanel();
    }
  });

  musicTracks.forEach((track, index) => {
    track.addEventListener('click', () => selectTrack(index));
    track.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        selectTrack(index);
      }
    });
  });

  music.addEventListener('ended', () => {
    if (musicTracks.length) {
      selectTrack((currentTrackIndex + 1) % musicTracks.length);
    }
  });
}

function initMusicToggle() {
  if (!musicToggle) {
    return;
  }

  let pressTimer = null;
  let longPressTriggered = false;
  const longPressDelay = 500;

  const startPress = () => {
    window.clearTimeout(pressTimer);
    longPressTriggered = false;
    pressTimer = window.setTimeout(() => {
      longPressTriggered = true;
      if (!isPlaylistOpen) {
        openMusicPanel();
      }
    }, longPressDelay);
  };

  const cancelPress = () => {
    window.clearTimeout(pressTimer);
    pressTimer = null;
  };

  musicToggle.addEventListener('pointerdown', startPress);
  musicToggle.addEventListener('pointerup', cancelPress);
  musicToggle.addEventListener('pointercancel', cancelPress);
  musicToggle.addEventListener('pointerleave', cancelPress);

  musicToggle.addEventListener('click', () => {
    if (longPressTriggered) {
      longPressTriggered = false;
      return;
    }
    toggleMusic();
  });

  musicToggle.setAttribute('aria-expanded', 'false');
}

function openMusicPanel() {
  if (!musicPanel || !musicPanelClose) {
    return;
  }

  musicPanel.hidden = false;
  isPlaylistOpen = true;
  musicToggle?.setAttribute('aria-expanded', 'true');
  musicPanelClose.focus();
}

function closeMusicPanel() {
  if (!musicPanel) {
    return;
  }

  musicPanel.hidden = true;
  isPlaylistOpen = false;
  musicToggle?.setAttribute('aria-expanded', 'false');
  musicToggle?.focus();
}

function selectTrack(index) {
  const track = musicTracks[index];
  if (!music || !track) {
    return;
  }

  currentTrackIndex = index;
  const source = track.dataset.src;
  const title = track.dataset.title || 'Romantic Wedding Piano';
  const artist = track.dataset.artist || 'Wedding Collection';

  musicTracks.forEach((item, itemIndex) => {
    item.setAttribute('aria-selected', itemIndex === index ? 'true' : 'false');
  });

  if (source) {
    music.src = source;
    music.load();
  }

  music.play()
    .then(() => {
      updateMusicState();
      updateNowPlaying(title, artist);
      showToast(`Memutar: ${title}`);
    })
    .catch(() => {
      updateMusicState();
      showToast('Gagal memutar lagu. Coba lagi.');
    });
}

function updateNowPlaying(title, artist) {
  if (musicNowPlayingTitle) {
    musicNowPlayingTitle.textContent = title;
  }
  if (musicNowPlayingArtist) {
    musicNowPlayingArtist.textContent = artist;
  }
}

function updateMusicState() {
  if (!musicToggle || !music) {
    return;
  }

  const isPaused = music.paused;
  musicToggle.classList.toggle('is-paused', isPaused);
  musicToggle.setAttribute('aria-pressed', String(!isPaused));
  musicToggle.setAttribute('aria-label', isPaused ? 'Putar musik' : 'Jeda musik');
  const label = musicToggle.querySelector('.music-toggle__label');
  if (label) {
    label.textContent = isPaused ? 'Putar' : 'Musik';
  }
}

function showToast(message) {
  if (!toast) {
    return;
  }

  window.clearTimeout(toastTimer);
  toast.textContent = message;
  toast.classList.add('is-visible');
  toastTimer = window.setTimeout(() => {
    toast.classList.remove('is-visible');
  }, 3600);
}

function openInvitation() {
  if (!cover || !mainContent || document.body.classList.contains('is-open')) {
    return;
  }

  document.body.classList.add('is-open');
  mainContent.removeAttribute('inert');
  mainContent.setAttribute('aria-hidden', 'false');
  cover.classList.add('is-closed');
  if (musicToggle) {
    musicToggle.disabled = false;
  }

  if (music) {
    music.load();
  }

  window.setTimeout(() => {
    if (cover) {
      cover.hidden = true;
    }
    heroTitle?.focus({ preventScroll: true });
  }, 920);
}

function toggleMusic() {
  if (!music) {
    return;
  }

  if (music.paused) {
    music.play()
      .then(updateMusicState)
      .catch(() => showToast('Musik belum dapat diputar. Coba ketuk tombol Musik sekali lagi.'));
  } else {
    music.pause();
    updateMusicState();
  }
}

function updateCountdown() {
  const distance = eventDate - Date.now();

  if (distance <= 0) {
    Object.values(countdownElements).forEach((element) => {
      if (element) {
        element.textContent = '00';
      }
    });
    if (countdownMessage) {
      countdownMessage.textContent = 'Terima kasih atas doa restu untuk hari bahagia kami.';
    }
    window.clearInterval(countdownTimer);
    return;
  }

  const day = 24 * 60 * 60 * 1000;
  const hour = 60 * 60 * 1000;
  const minute = 60 * 1000;
  const values = {
    days: Math.floor(distance / day),
    hours: Math.floor((distance % day) / hour),
    minutes: Math.floor((distance % hour) / minute),
    seconds: Math.floor((distance % minute) / 1000)
  };

  Object.entries(countdownElements).forEach(([key, element]) => {
    if (element) {
      element.textContent = String(values[key]).padStart(2, '0');
    }
  });
}

function updateScrollProgress() {
  if (!scrollProgress) {
    return;
  }

  const scrollTop = window.scrollY;
  const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
  scrollProgress.style.width = `${Math.max(0, Math.min(100, progress))}%`;
}

function updateParallaxTarget() {
  if (!heroMedia || prefersReducedMotion.matches) {
    parallaxTarget = 0;
    return;
  }

  const speed = Number.parseFloat(heroMedia.dataset.parallax) || 0;
  parallaxTarget = Math.min(window.scrollY * speed, 120);
}

function runParallax() {
  if (Math.abs(parallaxTarget - parallaxCurrent) > 0.1) {
    parallaxCurrent += (parallaxTarget - parallaxCurrent) * 0.08;
    if (heroMedia) {
      heroMedia.style.transform = `translate3d(0, ${parallaxCurrent}px, 0)`;
    }
    requestAnimationFrame(runParallax);
  } else {
    parallaxCurrent = parallaxTarget;
    if (heroMedia) {
      heroMedia.style.transform = `translate3d(0, ${parallaxCurrent}px, 0)`;
    }
    parallaxRunning = false;
  }
}

function requestParallax() {
  if (prefersReducedMotion.matches || parallaxRunning) {
    return;
  }

  parallaxRunning = true;
  requestAnimationFrame(runParallax);
}

function initMusicSectionFade() {
  if (!music || !('IntersectionObserver' in window)) {
    return;
  }

  music.volume = 0.3;
  currentVolume = 0.3;
  targetVolume = 0.3;

  const sections = document.querySelectorAll('.main-content > section');
  const sectionObserver = new IntersectionObserver((entries) => {
    const maxRatio = Math.max(0, ...entries.map((entry) => entry.intersectionRatio));
    targetVolume = 0.05 + maxRatio * 0.35;
    startVolumeAnimation();
  }, { threshold: [0, 0.1, 0.25, 0.5, 0.75, 1] });

  sections.forEach((section) => sectionObserver.observe(section));

  function smoothVolume() {
    const difference = targetVolume - currentVolume;
    if (Math.abs(difference) > 0.001) {
      currentVolume += difference * 0.08;
      music.volume = Math.max(0, Math.min(1, currentVolume));
      volumeFrame = requestAnimationFrame(smoothVolume);
    } else {
      currentVolume = targetVolume;
      music.volume = currentVolume;
      volumeFrame = null;
    }
  }

  function startVolumeAnimation() {
    if (volumeFrame === null && music && !music.paused) {
      volumeFrame = requestAnimationFrame(smoothVolume);
    }
  }

  window.setInterval(startVolumeAnimation, 100);
}

function initHeroParticles() {
  if (!heroParticles || prefersReducedMotion.matches) {
    return;
  }

  heroParticles.replaceChildren();
  const particleCount = window.innerWidth < 600 ? 8 : 14;
  const fragment = document.createDocumentFragment();

  for (let index = 0; index < particleCount; index += 1) {
    const particle = document.createElement('span');
    const size = 2 + Math.random() * 4;
    particle.style.setProperty('--particle-left', `${Math.random() * 100}%`);
    particle.style.setProperty('--particle-size', `${size}px`);
    particle.style.setProperty('--particle-duration', `${8 + Math.random() * 10}s`);
    particle.style.setProperty('--particle-delay', `${-Math.random() * 18}s`);
    particle.style.setProperty('--particle-end', `${Math.random() * 80 - 40}px`);
    fragment.appendChild(particle);
  }

  heroParticles.appendChild(fragment);
}

function updateScrollEffects() {
  updateScrollProgress();
  updateParallaxTarget();
  requestParallax();
}

function handleScroll() {
  if (scrollTicking) {
    return;
  }

  scrollTicking = true;
  window.requestAnimationFrame(() => {
    updateScrollEffects();
    scrollTicking = false;
  });
}

function initWishesMarquee() {
  const marquee = document.getElementById('wishesMarquee');
  const track = document.getElementById('wishesTrack');
  const groupA = document.getElementById('wishesGroupA');
  const groupB = document.getElementById('wishesGroupB');
  const pauseButton = document.getElementById('wishesPause');

  if (!marquee || !track || !groupA || !groupB) {
    return () => {};
  }

  const maximumWishCards = 30;
  let marqueePosition = 0;
  let marqueeFrame = null;
  let marqueeInView = true;
  let marqueePageVisible = !document.hidden;
  let marqueePaused = false;

  const cloneWishCard = (card) => {
    const clone = card.cloneNode(true);
    clone.setAttribute('aria-hidden', 'true');
    return clone;
  };

  const syncWishGroups = () => {
    const cards = Array.from(groupA.children);
    groupB.replaceChildren(...cards.map(cloneWishCard));
  };

  const trimWishCards = () => {
    const cards = Array.from(groupA.children);
    while (cards.length > maximumWishCards) {
      groupA.firstElementChild?.remove();
      groupB.firstElementChild?.remove();
      cards.shift();
    }
  };

  const shouldAnimateMarquee = () => (
    !prefersReducedMotion.matches
    && !marqueePaused
    && marqueeInView
    && marqueePageVisible
  );

  const stopMarquee = () => {
    if (marqueeFrame !== null) {
      cancelAnimationFrame(marqueeFrame);
      marqueeFrame = null;
    }
  };

  const startMarquee = () => {
    if (marqueeFrame !== null || !shouldAnimateMarquee()) {
      return;
    }

    const step = () => {
      if (!shouldAnimateMarquee()) {
        marqueeFrame = null;
        return;
      }

      const groupWidth = groupA.scrollWidth;
      const containerWidth = marquee.clientWidth;
      if (groupWidth <= containerWidth || groupWidth === 0) {
        marqueePosition = 0;
        track.style.transform = 'translate3d(0, 0, 0)';
        marqueeFrame = null;
        return;
      }

      const speed = Math.max(0.45, Math.min(1.2, containerWidth / 700));
      marqueePosition -= speed;
      while (marqueePosition <= -groupWidth) {
        marqueePosition += groupWidth;
      }
      track.style.transform = `translate3d(${marqueePosition}px, 0, 0)`;
      marqueeFrame = requestAnimationFrame(step);
    };

    marqueeFrame = requestAnimationFrame(step);
  };

  const updateMarqueeState = () => {
    if (shouldAnimateMarquee()) {
      startMarquee();
    } else {
      stopMarquee();
    }
  };

  const addCard = (name, message) => {
    const card = document.createElement('article');
    const quote = document.createElement('p');
    const footer = document.createElement('footer');
    card.className = 'wish-card wish-card--moving';
    quote.textContent = `“${message}”`;
    footer.textContent = `— ${name}`;
    card.append(quote, footer);
    groupA.appendChild(card);
    groupB.appendChild(cloneWishCard(card));
    trimWishCards();
    updateMarqueeState();
  };

  syncWishGroups();

  if ('IntersectionObserver' in window) {
    const marqueeObserver = new IntersectionObserver(([entry]) => {
      marqueeInView = entry.isIntersecting;
      updateMarqueeState();
    }, { threshold: 0.05 });
    marqueeObserver.observe(marquee);
  }

  document.addEventListener('visibilitychange', () => {
    marqueePageVisible = !document.hidden;
    updateMarqueeState();
  });

  pauseButton?.addEventListener('click', () => {
    marqueePaused = !marqueePaused;
    pauseButton.setAttribute('aria-pressed', String(marqueePaused));
    pauseButton.textContent = marqueePaused ? 'Lanjutkan alur ucapan' : 'Jeda alur ucapan';
    updateMarqueeState();
  });

  updateWishesMarquee = updateMarqueeState;
  updateMarqueeState();

  return addCard;
}

function handleResize() {
  updateScrollEffects();
  updateWishesMarquee();
}

function initRevealAnimations() {
  const revealItems = document.querySelectorAll('[data-reveal]');

  if (prefersReducedMotion.matches) {
    revealItems.forEach((item) => item.classList.add('is-visible'));
    return;
  }

  if (revealInitialized) {
    return;
  }

  revealInitialized = true;

  if (!('IntersectionObserver' in window)) {
    revealItems.forEach((item, index) => {
      item.style.transitionDelay = `${index * 0.08}s`;
      item.classList.add('is-visible');
    });
    return;
  }

  revealObserver = new IntersectionObserver((entries, observerInstance) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      const siblings = Array.from(entry.target.parentElement?.querySelectorAll(':scope > [data-reveal]') || []);
      const siblingIndex = siblings.indexOf(entry.target);
      entry.target.style.transitionDelay = `${Math.max(0, siblingIndex) * 0.1}s`;
      entry.target.classList.add('is-visible');
      observerInstance.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -30px' });

  revealItems.forEach((item) => revealObserver.observe(item));
}

function handleReducedMotionChange() {
  if (prefersReducedMotion.matches) {
    if (heroMedia) {
      heroMedia.style.transform = '';
    }
    heroParticles?.replaceChildren();
    document.querySelectorAll('[data-reveal]').forEach((item) => item.classList.add('is-visible'));
    parallaxCurrent = 0;
    parallaxTarget = 0;
  } else {
    initHeroParticles();
    updateScrollEffects();
    initRevealAnimations();
  }

  updateWishesMarquee();
}

if (typeof prefersReducedMotion.addEventListener === 'function') {
  prefersReducedMotion.addEventListener('change', handleReducedMotionChange);
} else if (typeof prefersReducedMotion.addListener === 'function') {
  prefersReducedMotion.addListener(handleReducedMotionChange);
}

function mountSignatureTransitions() {
  const template = document.getElementById('tpl-sig');
  if (!template) {
    return;
  }

  document.querySelectorAll('[data-sig]').forEach((slot) => {
    if (slot.firstElementChild) {
      return;
    }
    const variant = slot.dataset.sig || 'center';
    const instance = template.content.cloneNode(true);
    const svg = instance.querySelector('.sig');
    if (svg) {
      svg.classList.add(`sig--${variant}`);
    }
    slot.appendChild(instance);
  });
}

mountSignatureTransitions();
addWishCard = initWishesMarquee();
initHeroParticles();
updateScrollEffects();

openButton?.addEventListener('click', openInvitation);
initMusicToggle();
window.addEventListener('scroll', handleScroll, { passive: true });
window.addEventListener('resize', handleResize, { passive: true });

rsvpForm?.addEventListener('submit', (event) => {
  event.preventDefault();

  if (!rsvpForm.reportValidity()) {
    return;
  }

  const guestName = document.getElementById('guestName').value.trim();
  const message = document.getElementById('message').value.trim();
  addWishCard(guestName, message);
  rsvpForm.reset();
  showToast(`Terima kasih, ${guestName}. Ucapan & doa Anda telah masuk ke alur kartu.`);

  window.setTimeout(() => {
    wishesMarquee?.scrollIntoView({
      behavior: prefersReducedMotion.matches ? 'auto' : 'smooth',
      block: 'center'
    });
  }, 250);
});

countdownTimer = window.setInterval(updateCountdown, 1000);
updateCountdown();
updateMusicState();
initRevealAnimations();
initMusicSectionFade();
initLightbox();
initGiftCopy();
initCalendarSave();
initLivestream();
initMusicPlaylist();

if ('serviceWorker' in navigator && window.isSecureContext) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').catch(() => {});
  });
}

const guestName = getGuestNameFromUrl();
applyGuestName(guestName);
