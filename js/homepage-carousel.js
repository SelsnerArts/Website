(() => {
  const carousel = document.querySelector('.homepage-carousel');
  if (!carousel) return;
  const images = Array.from(carousel.querySelectorAll('.carousel-image'));
  const projects = [
    { title: 'Kitsune Forest', id: 1 },
    { title: 'Mist Creeper', id: 4 },
    { title: 'Lindon', id: 3 },
    { title: 'Modular European Facade', id: 5 }
  ];
  const pause = document.getElementById('carousel-pause');
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let index = 0;
  let paused = motion.matches;
  let timer;
  function show(next) {
    index = (next + images.length) % images.length;
    images.forEach((image, i) => {
      image.classList.toggle('is-active', i === index);
      image.setAttribute('aria-hidden', String(i !== index));
      if (i === index) image.loading = 'eager';
    });
    const project = projects[index];
    document.getElementById('carousel-title').textContent = project.title;
    document.getElementById('carousel-project').href = '/portfolio/personal%20projects/personalproject_' + project.id + '.html';
    document.getElementById('carousel-count').textContent = (index + 1) + ' / ' + images.length;
  }
  function schedule() {
    clearInterval(timer);
    if (!paused && !document.hidden && !carousel.matches(':hover') && !carousel.contains(document.activeElement)) {
      timer = setInterval(() => show(index + 1), 6000);
    }
    pause.textContent = paused ? 'Play' : 'Pause';
    pause.setAttribute('aria-label', paused ? 'Start slideshow' : 'Pause slideshow');
  }
  document.getElementById('carousel-prev').addEventListener('click', () => { show(index - 1); schedule(); });
  document.getElementById('carousel-next').addEventListener('click', () => { show(index + 1); schedule(); });
  pause.addEventListener('click', () => { paused = !paused; schedule(); });
  carousel.addEventListener('mouseenter', schedule);
  carousel.addEventListener('mouseleave', schedule);
  carousel.addEventListener('focusin', schedule);
  carousel.addEventListener('focusout', () => setTimeout(schedule, 0));
  carousel.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault(); show(index + (event.key === 'ArrowLeft' ? -1 : 1)); schedule();
    }
  });
  document.addEventListener('visibilitychange', schedule);
  motion.addEventListener('change', () => { if (motion.matches) paused = true; schedule(); });
  schedule();
})();