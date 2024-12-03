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



