window.addEventListener('load', () => {
    setTimeout(() => {
      document.querySelector('.entrance-animation').style.display = 'none';
      document.querySelector('.main-content').classList.add('visible');
    }, 2000);
  });
document.addEventListener('DOMContentLoaded', () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
});
document.querySelectorAll('.content__text, .content__image, .furniture__content').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });
});
document.addEventListener('DOMContentLoaded', () => {
    const ellipsisButton = document.querySelector('.nav__ellipsis');
    const sidebar = document.querySelector('.sidebar');

    ellipsisButton.addEventListener('click', () => {
        sidebar.classList.toggle('active');
    });

    document.addEventListener('click', (event) => {
        if (!sidebar.contains(event.target) && !ellipsisButton.contains(event.target)) {
            sidebar.classList.remove('active');
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    // Create an IntersectionObserver to detect when elements come into view
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // If element is in the viewport, add 'visible' class
                entry.target.classList.add('visible');
                entry.target.classList.remove('hidden');
            } else {
                // If element is out of the viewport, add 'hidden' class
                entry.target.classList.remove('visible');
                entry.target.classList.add('hidden');
            }
        });
    }, {
        threshold: 0.1 // Trigger when 10% of the element is in the viewport
    });

    // Target elements to animate when scrolling
    const elementsToAnimate = document.querySelectorAll('.content__text, .content__image, .furniture__content');

    // Initially hide all target elements by adding the 'hidden' class
    elementsToAnimate.forEach(el => {
        el.classList.add('hidden');
    });

    // Observe each element with the IntersectionObserver
    elementsToAnimate.forEach(el => {
        observer.observe(el);
    });
});


