// Custom cursor effect
const cursorEffect = document.createElement('div');
cursorEffect.classList.add('cursor-effect');
document.body.appendChild(cursorEffect);

document.addEventListener('mousemove', (e) => {
    cursorEffect.style.left = e.clientX + 'px';
    cursorEffect.style.top = e.clientY + 'px';

    // Update custom properties for the hero background effect
    document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
    document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
});

// Expand cursor effect when hovering over interactive elements
const interactiveElements = document.querySelectorAll('a, button, .feature-card');
interactiveElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
        cursorEffect.classList.add('expand');
    });
    element.addEventListener('mouseleave', () => {
        cursorEffect.classList.remove('expand');
    });
});

// Space stars effect
const spaceBackground = document.querySelector('.space-background');
if (spaceBackground) {
    const numStars = 200;
    const stars = [];
    const maxDistance = 100;

    // Create stars
    for (let i = 0; i < numStars; i++) {
        const star = document.createElement('div');
        star.className = 'star' + (Math.random() < 0.3 ? ' primary' : '');
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        spaceBackground.appendChild(star);
        stars.push({
            element: star,
            x: parseFloat(star.style.left),
            y: parseFloat(star.style.top),
            originalX: parseFloat(star.style.left),
            originalY: parseFloat(star.style.top)
        });
    }

    // Handle mouse movement for stars
    document.addEventListener('mousemove', (e) => {
        const mouseX = (e.clientX / window.innerWidth) * 100;
        const mouseY = (e.clientY / window.innerHeight) * 100;
        
        stars.forEach(star => {
            const dx = mouseX - star.originalX;
            const dy = mouseY - star.originalY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const maxMove = 15;
            
            if (distance < maxDistance) {
                const force = (maxDistance - distance) / maxDistance;
                const moveX = (dx * force * maxMove) / distance;
                const moveY = (dy * force * maxMove) / distance;
                
                star.x = star.originalX - moveX;
                star.y = star.originalY - moveY;
            } else {
                star.x += (star.originalX - star.x) * 0.1;
                star.y += (star.originalY - star.y) * 0.1;
            }
            
            star.element.style.transform = `translate(${star.x - star.originalX}px, ${star.y - star.originalY}px)`;
        });
    });
} 