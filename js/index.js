const advantages = document.querySelector('.advantages');

if (advantages) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const square = entry.target.querySelector('.advantages__content');

      if (entry.isIntersecting) {
        square.classList.add('animate');
        return;
      }
    });
  });

  observer.observe(document.querySelector('.advantages'));
}
