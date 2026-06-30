/* ============================================
   THE AVANT-GARDE TRANSFORMER — Atmospheric Effects
   Floating particles, cursor light, ambient motion
   ============================================ */

function initAtmosphere() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  const isMobile = window.innerWidth <= 768;
  const hero = document.querySelector('.act--threshold');
  
  if (!hero) return;

  // ============================================
  // FLOATING PARTICLES — Dust motes in darkness
  // ============================================
  const particleContainer = document.createElement('div');
  particleContainer.className = 'atmosphere-particles';
  particleContainer.style.cssText = `
    position: absolute;
    inset: 0;
    overflow: hidden;
    pointer-events: none;
    z-index: 2;
  `;
  hero.appendChild(particleContainer);

  // Create floating particles
  const particleCount = isMobile ? 15 : 30;
  const particles = [];

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    const size = Math.random() * 3 + 1;
    const opacity = Math.random() * 0.3 + 0.1;
    
    particle.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      background: rgba(232, 228, 223, ${opacity});
      border-radius: 50%;
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      pointer-events: none;
    `;
    
    particleContainer.appendChild(particle);
    particles.push({
      el: particle,
      x: parseFloat(particle.style.left),
      y: parseFloat(particle.style.top),
      speedX: (Math.random() - 0.5) * 0.3,
      speedY: (Math.random() - 0.5) * 0.2 - 0.1,
      opacity: opacity,
    });
  }

  // Animate particles with subtle drift
  function animateParticles() {
    particles.forEach(p => {
      p.x += p.speedX;
      p.y += p.speedY;
      
      // Wrap around edges
      if (p.x < -5) p.x = 105;
      if (p.x > 105) p.x = -5;
      if (p.y < -5) p.y = 105;
      if (p.y > 105) p.y = -5;
      
      p.el.style.left = p.x + '%';
      p.el.style.top = p.y + '%';
    });
    
    requestAnimationFrame(animateParticles);
  }
  
  animateParticles();

  // ============================================
  // CURSOR LIGHT — Subtle glow follows cursor
  // ============================================
  if (!isMobile) {
    const cursorLight = document.createElement('div');
    cursorLight.className = 'atmosphere-cursor-light';
    cursorLight.style.cssText = `
      position: fixed;
      width: 400px;
      height: 400px;
      background: radial-gradient(
        circle at center,
        rgba(139, 58, 98, 0.08) 0%,
        rgba(139, 58, 98, 0.03) 30%,
        transparent 70%
      );
      border-radius: 50%;
      pointer-events: none;
      z-index: 9988;
      transform: translate(-50%, -50%);
      opacity: 0;
      transition: opacity 0.5s ease;
      mix-blend-mode: screen;
    `;
    document.body.appendChild(cursorLight);

    let mouseX = 0, mouseY = 0;
    let lightX = 0, lightY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      // Show light when over hero
      const heroRect = hero.getBoundingClientRect();
      if (mouseY < heroRect.bottom) {
        cursorLight.style.opacity = '1';
      } else {
        cursorLight.style.opacity = '0';
      }
    });

    // Smooth follow with lerp
    function animateCursorLight() {
      lightX += (mouseX - lightX) * 0.08;
      lightY += (mouseY - lightY) * 0.08;
      
      cursorLight.style.left = lightX + 'px';
      cursorLight.style.top = lightY + 'px';
      
      requestAnimationFrame(animateCursorLight);
    }
    
    animateCursorLight();
  }

  // ============================================
  // SHADOW DRIFT — Ambient shadow movement
  // ============================================
  const veil = document.querySelector('.threshold__veil');
  if (veil && !isMobile) {
    // Subtle shadow drift on mouse move
    document.addEventListener('mousemove', (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      
      veil.style.boxShadow = `
        inset ${x}px ${y}px 100px rgba(0, 0, 0, 0.3),
        inset ${-x * 0.5}px ${-y * 0.5}px 80px rgba(0, 0, 0, 0.2)
      `;
    });
  }
}

// Initialize atmospheric effects after DOM load
document.addEventListener('DOMContentLoaded', () => {
  // Wait for preloader to finish
  setTimeout(() => {
    initAtmosphere();
  }, 3000);
});
