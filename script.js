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
    ellipsisButton.addEventListener('mouseenter', () => {
        sidebar.style.transform = 'translateX(-300px)';
        sidebar.style.opacity = '1';
        sidebar.style.right = '0';
    });
    sidebar.addEventListener('mouseleave', () => {
        sidebar.style.transform = '';
        sidebar.style.opacity = '0';
        sidebar.style.right = '-300px';
    });
    ellipsisButton.addEventListener('mouseleave', () => {
        setTimeout(() => {
            if (!sidebar.matches(':hover')) {
                sidebar.style.transform = '';
                sidebar.style.opacity = '0';
                sidebar.style.right = '-300px';
            }
        }, 300); 
    });
});


