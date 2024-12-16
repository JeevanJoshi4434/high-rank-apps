
// Smooth Scroll for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Dynamic Background Dots
const dots = document.querySelectorAll('.dot');
const moveDots = () => {
    dots.forEach(dot => {
        const randomX = Math.random() * window.innerWidth;
        const randomY = Math.random() * window.innerHeight;
        dot.style.transform = `translate(${randomX}px, ${randomY}px)`;
    });
};
setInterval(moveDots, 3000);

// Particles.js for Background Animation
particlesJS('particles-js', {
    particles: {
        number: {
            value: 80,
            density: {
                enable: true,
                value_area: 800
            }
        },
        color: {
            value: '#ffcc00'
        },
        shape: {
            type: 'circle',
            stroke: {
                width: 0,
                color: '#000000'
            }
        },
        opacity: {
            value: 0.5,
            random: true,
            anim: {
                enable: true,
                speed: 1,
                opacity_min: 0.1
            }
        },
        size: {
            value: 3,
            random: true,
            anim: {
                enable: true,
                speed: 40,
                size_min: 0.1
            }
        },
        line_linked: {
            enable: true,
            distance: 150,
            color: '#ffcc00',
            opacity: 0.4,
            width: 1
        },
        move: {
            enable: true,
            speed: 4,
            direction: 'none',
            random: false,
            straight: false,
            out_mode: 'out'
        }
    },
    interactivity: {
        detect_on: 'window',
        events: {
            onhover: {
                enable: true,
                mode: 'repulse'
            },
            onclick: {
                enable: true,
                mode: 'push'
            }
        },
        modes: {
            repulse: {
                distance: 100,
                duration: 0.4
            },
            push: {
                particles_nb: 4
            }
        }
    },
    retina_detect: true
});

// Contact Form Submission
const form = document.querySelector('form');
if (form) {
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            message: document.getElementById('message').value,
        };

        fetch('http://localhost:3000/send-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then(response => {
                if (response.ok) {
                    alert('Message sent successfully!');
                    form.reset();
                } else {
                    alert('Error sending message.');
                }
            })
            .catch(() => {
                alert('Error sending message.');
            });
    });
}

// Header Fade-in Animation
window.addEventListener('load', () => {
    const header = document.querySelector('header');
    if (header) {
        header.style.opacity = '1';
        header.style.transform = 'translateY(0)';
    }
});

// ScrollReveal for section animations (added fade and scale effects)
ScrollReveal().reveal('.section', {
    duration: 1200,
    distance: '50px',
    origin: 'bottom',
    interval: 300,
    opacity: 0,
    scale: 0.95,
    reset: true,
});

// Parallax Effect on Hero Image
const hero = document.getElementById('hero');
if (hero) {
    window.addEventListener('scroll', () => {
        const offset = window.pageYOffset;
        hero.style.backgroundPositionY = `${offset * 0.7}px`;
    });
}

// Hover Effects for Buttons (Smooth transition)
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('mouseenter', () => {
        button.style.transform = 'scale(1.1)';
        button.style.transition = 'transform 0.3s ease-in-out';
    });
    button.addEventListener('mouseleave', () => {
        button.style.transform = 'scale(1)';
        button.style.transition = 'transform 0.3s ease-in-out';
    });
});

// Animate the Scroll Progress Bar
const scrollProgress = document.querySelector('.scroll-progress');
if (scrollProgress) {
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollPosition / windowHeight) * 100;
        scrollProgress.style.width = `${scrollPercent}%`;
    });
}

// Bounce-In Animation for Elements on Scroll
const bounceInElements = document.querySelectorAll('.bounce-in');
window.addEventListener('scroll', () => {
    bounceInElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top <= window.innerHeight - 100) {
            el.classList.add('animate-bounce');
        }
    });
});

// Initialize ScrollReveal for sections
ScrollReveal().reveal('.section', {
    duration: 1000,
    distance: '50px',
    origin: 'bottom',
    interval: 200,
});

// Initialize ScrollReveal for cards
ScrollReveal().reveal('.card', {
    duration: 1000,
    distance: '30px',
    origin: 'right',
    interval: 150,
    opacity: 0,
});

