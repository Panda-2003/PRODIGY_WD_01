document.addEventListener('DOMContentLoaded', function () {
    const navbar = document.querySelector('.navbar');
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.menu-item a');

    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            navbar.style.backgroundColor = 'rgba(34, 34, 34, 0.9)';
            navbar.style.padding = '5px 0';
        } else {
            navbar.style.backgroundColor = 'rgba(51, 51, 51, 0.9)';
            navbar.style.padding = '10px 0';
        }

        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });
});
