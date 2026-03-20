// --- Luxury Cinematic Effects & Micro-Interactions ---

document.addEventListener('DOMContentLoaded', () => {

    // 1. Initial State Reveal
    setTimeout(() => {
        document.querySelectorAll('.cinematic-reveal, .title-reveal, .text-reveal').forEach((el, index) => {
            setTimeout(() => {
                el.classList.add('active');
            }, index * 200); // Cascading entrance delay
        });
    }, 300);

    // Music functionality removed

    // 3. Scroll Intersection Observers
    const observerOptions = { threshold: 0.15, rootMargin: "0px 0px -50px 0px" };

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('scrolled-in');

                // SVG Line draw trigger
                const svgLine = entry.target.querySelector('.draw-line');
                if (svgLine) svgLine.classList.add('active');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-up, .divider-draw').forEach(el => scrollObserver.observe(el));

    // 4. Parallax Math Calculation
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;

        // Element translations
        document.querySelectorAll('.parallax-img').forEach(parallax => {
            const speed = parallax.dataset.speed || 0.12;
            parallax.style.transform = `translateY(${scrolled * speed}px)`;
        });

        // Navigation Blur morph
        const nav = document.querySelector('.navbar');
        if (nav) {
            if (scrolled > 80) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
        }
    });

    // 5. Cinematic Slide Tracker
    let currentSlide = 0;
    const slides = document.querySelectorAll('.slide');
    if (slides.length > 0) {
        slides[0].classList.add('active-slide');

        setInterval(() => {
            slides[currentSlide].classList.remove('active-slide');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active-slide');
        }, 5000); // 5 sec per cinematic shot
    }

    // 6. Floating Golden Particles (Canvas Magic)
    const canvas = document.getElementById('luxury-particles');
    if (canvas) {
        const ctx = canvas.getContext('2d');

        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        const particlesArray = [];
        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2 + 0.5;
                // Move very slowly diagonally upwards
                this.speedX = (Math.random() * 0.3) - 0.15;
                this.speedY = (Math.random() * -0.5) - 0.1;
                this.opacity = Math.random() * 0.4 + 0.1; // Subtlety is key for luxury
            }
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                if (this.y < 0) this.y = canvas.height;
                if (this.x > canvas.width) this.x = 0;
                if (this.x < 0) this.x = canvas.width;
            }
            draw() {
                ctx.fillStyle = `rgba(200, 169, 106, ${this.opacity})`;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.closePath();
                ctx.fill();
            }
        }

        for (let i = 0; i < 80; i++) particlesArray.push(new Particle());

        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particlesArray.forEach(p => { p.update(); p.draw(); });
            requestAnimationFrame(animateParticles);
        }
        animateParticles();
    }
});
